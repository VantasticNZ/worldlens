#!/usr/bin/env python3
"""
WorldLens Multi-Source Automated Crawler
==========================================
Runs via GitHub Actions. Uses 7 data sources — most free with no key required.

REQUIRED GitHub Secrets (only these two need keys):
  ANTHROPIC_API_KEY   — console.anthropic.com (pay per use, ~$3-8/month)
  TAVILY_API_KEY      — tavily.com (free, 1000 searches/month)

FREE sources requiring NO key:
  • NZ Parliament API  — official Hansard, votes, member data
  • RSS feeds          — RNZ, Newsroom, The Spinoff, NZ Herald, The Guardian NZ
  • GDELT              — global news event database (unlimited)
  • CommonCrawl index  — archived web search (unlimited)
  • OpenAlex           — academic/research papers (unlimited)
  • NewsAPI            — 100 req/day free (optional, set NEWSAPI_KEY secret)

Cost per full run:
  Tavily:   ~60 searches  = free tier (1000/month budget)
  Claude:   ~40K tokens   = ~$0.12/run
  Daily run = ~$3.60/month total
"""

import os, json, time, hashlib, datetime, re, gzip
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlencode, quote_plus
import requests

# ── CONFIG ──
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
TAVILY_API_KEY    = os.environ.get("TAVILY_API_KEY", "")
NEWSAPI_KEY       = os.environ.get("NEWSAPI_KEY", "")   # optional
CLAUDE_MODEL      = "claude-sonnet-4-20250514"
DATA_DIR          = Path(__file__).parent.parent / "live_data"
DATA_DIR.mkdir(exist_ok=True)

ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"
TODAY         = datetime.date.today().isoformat()
THIS_YEAR     = datetime.date.today().year

# ── REQUEST HELPER ──
SESSION = requests.Session()
SESSION.headers.update({"User-Agent": "WorldLens/1.0 (transparency platform; github.com/VantasticNZ/worldlens)"})

def get(url, params=None, timeout=20, **kwargs):
    try:
        r = SESSION.get(url, params=params, timeout=timeout, **kwargs)
        r.raise_for_status()
        return r
    except Exception as e:
        print(f"  [GET ERROR] {url}: {e}")
        return None


# ══════════════════════════════════════════════════════════════
# SOURCE 1 — NZ PARLIAMENT API (official, unlimited, no key)
# ══════════════════════════════════════════════════════════════
PARLIAMENT_API = "https://api.parliament.govt.nz/v2"

def parliament_member_speeches(member_name: str, max_items: int = 10) -> list[dict]:
    """Fetch recent Hansard speeches for a member."""
    results = []
    try:
        # Search debates mentioning the member
        r = get(f"{PARLIAMENT_API}/hansard-v2/search", params={
            "q": f'"{member_name}"',
            "take": max_items,
            "orderBy": "Date desc",
        })
        if not r: return results
        data = r.json()
        for item in data.get("result", {}).get("documents", []):
            results.append({
                "source": "NZ Parliament Hansard",
                "title": item.get("title", ""),
                "date": item.get("date", "")[:10],
                "url": f"https://www.parliament.nz/en/pb/hansard-debates/rhr/document/{item.get('id','')}",
                "content": item.get("extract", "")[:600],
                "type": "official_speech",
            })
    except Exception as e:
        print(f"  [Parliament] Error: {e}")
    return results

def parliament_member_votes(member_name: str) -> list[dict]:
    """Fetch recent votes for a member."""
    results = []
    try:
        r = get(f"{PARLIAMENT_API}/votes", params={
            "memberName": member_name,
            "take": 10,
            "orderBy": "Date desc",
        })
        if not r: return results
        data = r.json()
        for item in data.get("result", {}).get("items", []):
            results.append({
                "source": "NZ Parliament Votes",
                "title": item.get("billTitle", "") or item.get("question", ""),
                "date": item.get("date", "")[:10],
                "vote": item.get("voteType", ""),
                "content": f"Voted {item.get('voteType','')} on: {item.get('billTitle','') or item.get('question','')}",
                "type": "vote",
            })
    except Exception as e:
        print(f"  [Parliament votes] Error: {e}")
    return results

def parliament_member_info(member_name: str) -> dict:
    """Get basic member profile from Parliament API."""
    try:
        r = get(f"{PARLIAMENT_API}/members", params={"name": member_name, "take": 1})
        if not r: return {}
        items = r.json().get("result", {}).get("items", [])
        return items[0] if items else {}
    except Exception as e:
        print(f"  [Parliament member] Error: {e}")
        return {}


# ══════════════════════════════════════════════════════════════
# SOURCE 2 — RSS FEEDS (unlimited, no key)
# ══════════════════════════════════════════════════════════════
RSS_FEEDS = {
    "RNZ News":       "https://www.rnz.co.nz/rss/political.xml",
    "RNZ NZ":         "https://www.rnz.co.nz/rss/national.xml",
    "Newsroom":       "https://newsroom.co.nz/feed/",
    "The Spinoff":    "https://thespinoff.co.nz/feed",
    "NZ Herald":      "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml",
    "Guardian NZ":    "https://www.theguardian.com/world/newzealand/rss",
    "Stuff Politics": "https://www.stuff.co.nz/rss/national/politics",
    "Reuters World":  "https://feeds.reuters.com/reuters/worldnews",
    "BBC World":      "https://feeds.bbci.co.uk/news/world/rss.xml",
}

def rss_search(name: str, max_results: int = 8) -> list[dict]:
    """Search all RSS feeds for mentions of a name. Returns recent relevant items."""
    results = []
    name_lower = name.lower()
    # Also search common short forms
    name_parts = name.lower().split()
    surname = name_parts[-1] if name_parts else name_lower

    for feed_name, url in RSS_FEEDS.items():
        r = get(url, timeout=15)
        if not r:
            continue
        try:
            root = ET.fromstring(r.content)
            ns = {"atom": "http://www.w3.org/2005/Atom"}

            # Handle both RSS and Atom
            items = root.findall(".//item") or root.findall(".//atom:entry", ns)

            for item in items:
                title_el   = item.find("title")
                desc_el    = item.find("description") or item.find("summary")
                link_el    = item.find("link")
                date_el    = item.find("pubDate") or item.find("updated") or item.find("dc:date")
                title      = (title_el.text or "") if title_el is not None else ""
                desc       = (desc_el.text   or "") if desc_el is not None else ""
                combined   = (title + " " + desc).lower()

                # Match on full name or surname
                if name_lower in combined or surname in combined:
                    link = ""
                    if link_el is not None:
                        link = link_el.text or link_el.get("href", "")
                    results.append({
                        "source": feed_name,
                        "title": title.strip(),
                        "content": re.sub(r"<[^>]+>", "", desc)[:500].strip(),
                        "url": link,
                        "date": (date_el.text or "")[:20] if date_el is not None else "",
                        "type": "rss",
                    })
                    if len(results) >= max_results:
                        return results
        except ET.ParseError:
            continue
        except Exception as e:
            print(f"  [RSS {feed_name}] Error: {e}")
            continue

    return results


# ══════════════════════════════════════════════════════════════
# SOURCE 3 — GDELT (global news events, unlimited, no key)
# ══════════════════════════════════════════════════════════════
GDELT_DOC_API = "https://api.gdeltproject.org/api/v2/doc/doc"

def gdelt_search(name: str, max_results: int = 6) -> list[dict]:
    """Search GDELT's global news database."""
    results = []
    try:
        r = get(GDELT_DOC_API, params={
            "query": f'"{name}" sourcelang:english',
            "mode": "artlist",
            "maxrecords": max_results,
            "format": "json",
            "timespan": "1month",
            "sort": "DateDesc",
        }, timeout=25)
        if not r: return results

        data = r.json()
        for art in data.get("articles", []):
            results.append({
                "source": f"GDELT — {art.get('domain','')}",
                "title": art.get("title", ""),
                "url": art.get("url", ""),
                "date": art.get("seendate", "")[:8],
                "content": art.get("title", "") + ". " + art.get("socialimage", ""),
                "type": "gdelt",
            })
    except Exception as e:
        print(f"  [GDELT] Error: {e}")
    return results


# ══════════════════════════════════════════════════════════════
# SOURCE 4 — NEWSAPI (optional, 100 req/day free)
# ══════════════════════════════════════════════════════════════
def newsapi_search(name: str, max_results: int = 5) -> list[dict]:
    """Search NewsAPI if key is available."""
    if not NEWSAPI_KEY:
        return []
    results = []
    try:
        r = get("https://newsapi.org/v2/everything", params={
            "q": f'"{name}"',
            "language": "en",
            "sortBy": "publishedAt",
            "pageSize": max_results,
            "apiKey": NEWSAPI_KEY,
        })
        if not r: return results
        for art in r.json().get("articles", []):
            results.append({
                "source": art.get("source", {}).get("name", "NewsAPI"),
                "title": art.get("title", ""),
                "url": art.get("url", ""),
                "date": art.get("publishedAt", "")[:10],
                "content": (art.get("description") or art.get("content") or "")[:500],
                "type": "newsapi",
            })
    except Exception as e:
        print(f"  [NewsAPI] Error: {e}")
    return results


# ══════════════════════════════════════════════════════════════
# SOURCE 5 — TAVILY (1000 searches/month free)
# ══════════════════════════════════════════════════════════════
NZ_POLITICAL_DOMAINS = [
    "rnz.co.nz", "nzherald.co.nz", "newsroom.co.nz",
    "thespinoff.co.nz", "stuff.co.nz", "parliament.nz",
    "beehive.govt.nz", "greens.org.nz", "labour.org.nz",
    "act.org.nz", "national.org.nz", "nzfirst.org.nz",
    "reuters.com", "bbc.com", "theguardian.com",
    "bloomberg.com", "ft.com", "politifact.com",
    "factcheck.org", "apnews.com",
]

def tavily_search(query: str, max_results: int = 4) -> list[dict]:
    """Search via Tavily — prioritises NZ and credible sources."""
    if not TAVILY_API_KEY:
        return []
    try:
        r = SESSION.post("https://api.tavily.com/search", json={
            "api_key": TAVILY_API_KEY,
            "query": query,
            "max_results": max_results,
            "search_depth": "advanced",
            "include_answer": False,
            "include_domains": NZ_POLITICAL_DOMAINS,
        }, timeout=25)
        r.raise_for_status()
        results = []
        for item in r.json().get("results", []):
            results.append({
                "source": item.get("url", "").split("/")[2],
                "title": item.get("title", ""),
                "url": item.get("url", ""),
                "date": item.get("published_date", ""),
                "content": item.get("content", "")[:600],
                "type": "tavily",
            })
        print(f"  [Tavily] '{query[:50]}' → {len(results)} results")
        return results
    except Exception as e:
        print(f"  [Tavily] Error: {e}")
        return []


# ══════════════════════════════════════════════════════════════
# SOURCE 6 — OPENALEX (academic papers, unlimited, no key)
# ══════════════════════════════════════════════════════════════
def openalex_search(name: str, topic: str = "politics corruption") -> list[dict]:
    """Find academic research relevant to entity — e.g. papers on their policies."""
    results = []
    try:
        r = get("https://api.openalex.org/works", params={
            "search": f"{name} {topic}",
            "filter": "language:en",
            "sort": "publication_date:desc",
            "per-page": 3,
            "mailto": "worldlens@example.com",
        })
        if not r: return results
        for work in r.json().get("results", []):
            results.append({
                "source": "OpenAlex (Academic)",
                "title": work.get("title", ""),
                "url": work.get("primary_location", {}).get("landing_page_url", ""),
                "date": work.get("publication_date", ""),
                "content": f"Academic paper: {work.get('title','')}. Cited {work.get('cited_by_count',0)} times.",
                "type": "academic",
            })
    except Exception as e:
        print(f"  [OpenAlex] Error: {e}")
    return results


# ══════════════════════════════════════════════════════════════
# SOURCE 7 — BEEHIVE / OFFICIAL NZ GOVT RSS (no key)
# ══════════════════════════════════════════════════════════════
BEEHIVE_RSS = "https://www.beehive.govt.nz/rss/feed.xml"

def beehive_search(name: str) -> list[dict]:
    """Search official NZ government press releases."""
    r = get(BEEHIVE_RSS, timeout=15)
    if not r: return []
    results = []
    name_lower = name.lower()
    surname = name.lower().split()[-1]
    try:
        root = ET.fromstring(r.content)
        for item in root.findall(".//item"):
            title = (item.findtext("title") or "").strip()
            desc  = re.sub(r"<[^>]+>", "", item.findtext("description") or "")[:400]
            link  = item.findtext("link") or ""
            date  = item.findtext("pubDate") or ""
            combined = (title + " " + desc).lower()
            if name_lower in combined or surname in combined:
                results.append({
                    "source": "Beehive (NZ Official)",
                    "title": title,
                    "content": desc,
                    "url": link,
                    "date": date[:20],
                    "type": "official_press_release",
                })
    except Exception as e:
        print(f"  [Beehive] Error: {e}")
    return results[:5]


# ══════════════════════════════════════════════════════════════
# CLAUDE EXTRACTION
# ══════════════════════════════════════════════════════════════
def claude_extract(context: str, entity_name: str, entity_type: str,
                   existing_data: dict, sources_used: list[str]) -> dict | None:
    if not ANTHROPIC_API_KEY:
        print("  [SKIP] No Anthropic key")
        return None

    existing_summary = json.dumps({
        "lie_count": existing_data.get("lie_count", 0),
        "recent_lies": [l.get("claim","")[:80] for l in existing_data.get("lies",[])[-3:]],
        "recent_posts": [p.get("text","")[:80] for p in existing_data.get("social_posts",[])[-3:]],
        "recent_events": [e.get("title","")[:80] for e in existing_data.get("recent_events",[])[-3:]],
    }, ensure_ascii=False)

    prompt = f"""You are a political/corporate intelligence analyst for WorldLens, a NZ transparency platform.

Entity: {entity_name} ({entity_type})
Today: {TODAY}
Sources used this crawl: {', '.join(sources_used)}

EXISTING DATA — do NOT repeat these, only add NEW findings:
{existing_summary}

SEARCH RESULTS FROM MULTIPLE SOURCES:
{context}

Extract ONLY genuinely new, verifiable, notable findings. Be strict — only include findings clearly supported by the results above. Do not hallucinate sources.

Return JSON only (no markdown fences):
{{
  "new_lies": [
    {{
      "date": "Month YYYY",
      "claim": "exact quote or close paraphrase",
      "reality": "what actually happened",
      "source": "publication and date",
      "severity": "high|med|low",
      "platform": "twitter|facebook|speech|interview|press_release|hansard"
    }}
  ],
  "new_social_posts": [
    {{
      "platform": "twitter|facebook|instagram|linkedin|youtube|press",
      "date": "Month YYYY",
      "text": "post text",
      "verified_by": "source",
      "discrepancy": {{
        "type": "contradicts_vote|contradicts_policy|contradicts_statement|contradicts_action|misleading_stat|deleted_post",
        "detail": "specific contradiction",
        "source": "source for contradiction",
        "severity": "high|med|low"
      }}
    }}
  ],
  "new_votes": [
    {{
      "bill": "Bill name",
      "vote": "for|against|abstain",
      "year": {THIS_YEAR},
      "significance": "high|med|low",
      "note": "brief note",
      "source": "NZ Parliament"
    }}
  ],
  "new_events": [
    {{
      "year": {THIS_YEAR},
      "title": "event title",
      "desc": "1-2 sentences",
      "type": "positive|negative|neutral",
      "source": "publication"
    }}
  ],
  "score_adjustments": {{
    "integrity_delta": 0,
    "corruption_risk_delta": 0,
    "reasoning": "explanation if non-zero"
  }},
  "summary_update": "1-2 sentence update, only if significant",
  "crawl_notes": "context for human reviewer"
}}

Rules:
- Only include findings supported by evidence in the results
- Do not invent sources
- If nothing notable: return {{"crawl_notes": "No significant new findings"}}
- Severity 'high' = clear documented contradiction with strong sourcing
- Small score adjustments only: -5 to +5 range"""

    try:
        r = SESSION.post(ANTHROPIC_URL, headers={
            "Content-Type": "application/json",
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
        }, json={
            "model": CLAUDE_MODEL,
            "max_tokens": 1800,
            "messages": [{"role": "user", "content": prompt}],
        }, timeout=90)
        r.raise_for_status()
        raw = r.json()["content"][0]["text"].strip()
        # Strip any accidental markdown fences
        raw = re.sub(r"^```(?:json)?\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw).strip()
        return json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"  [WARN] Claude non-JSON: {e}")
        return None
    except Exception as e:
        print(f"  [ERROR] Claude: {e}")
        return None


# ══════════════════════════════════════════════════════════════
# DATA PERSISTENCE
# ══════════════════════════════════════════════════════════════
def load_live(entity_id: str, entity_type: str) -> dict:
    path = DATA_DIR / f"{entity_type}_{entity_id}.json"
    if path.exists():
        try:
            return json.loads(path.read_text("utf-8"))
        except Exception:
            pass
    return {
        "id": entity_id, "type": entity_type,
        "lie_count": 0, "lies": [], "social_posts": [],
        "votes": [], "recent_events": [],
        "score_adjustments": {}, "summary_updates": [],
        "crawl_log": [], "sources_log": [],
        "last_updated": None,
    }

def save_live(entity_id: str, entity_type: str, data: dict):
    path = DATA_DIR / f"{entity_type}_{entity_id}.json"
    data["last_updated"] = datetime.datetime.utcnow().isoformat() + "Z"
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), "utf-8")
    print(f"  [SAVED] {path.name}")

def fingerprint(text: str) -> str:
    return hashlib.md5(text[:60].encode()).hexdigest()[:8]

def merge_findings(existing: dict, findings: dict) -> tuple[dict, bool]:
    changed = False
    now = datetime.datetime.utcnow().isoformat() + "Z"

    for lie in findings.get("new_lies", []):
        fp = fingerprint(lie.get("claim",""))
        if not any(fingerprint(l.get("claim","")) == fp for l in existing["lies"]):
            lie["_id"] = fp; lie["_crawled"] = now
            existing["lies"].append(lie)
            existing["lie_count"] = len(existing["lies"])
            changed = True
            print(f"  [NEW LIE] {lie.get('date','?')}: {lie.get('claim','')[:60]}…")

    for post in findings.get("new_social_posts", []):
        fp = fingerprint(post.get("text",""))
        if not any(fingerprint(p.get("text","")) == fp for p in existing["social_posts"]):
            post["_id"] = fp; post["_crawled"] = now
            existing["social_posts"].append(post)
            changed = True
            print(f"  [NEW POST] {post.get('platform','?')}: {post.get('text','')[:60]}…")

    for vote in findings.get("new_votes", []):
        fp = fingerprint(vote.get("bill",""))
        if not any(fingerprint(v.get("bill","")) == fp for v in existing.get("votes",[])):
            vote["_id"] = fp; vote["_crawled"] = now
            existing.setdefault("votes", []).append(vote)
            changed = True
            print(f"  [NEW VOTE] {vote.get('year','?')}: {vote.get('bill','')[:60]}")

    for event in findings.get("new_events", []):
        fp = fingerprint(event.get("title",""))
        if not any(fingerprint(e.get("title","")) == fp for e in existing["recent_events"]):
            event["_id"] = fp; event["_crawled"] = now
            existing["recent_events"].append(event)
            existing["recent_events"] = sorted(
                existing["recent_events"],
                key=lambda x: str(x.get("year","0")), reverse=True
            )[:20]
            changed = True
            print(f"  [NEW EVENT] {event.get('title','')[:60]}")

    adj = findings.get("score_adjustments", {})
    if adj.get("reasoning") and any(adj.get(k,0) != 0 for k in ["integrity_delta","corruption_risk_delta"]):
        existing["score_adjustments"][now] = adj
        changed = True
        print(f"  [SCORE] {adj.get('reasoning','')[:80]}")

    if findings.get("summary_update"):
        existing["summary_updates"].append({"date": now, "text": findings["summary_update"]})
        existing["summary_updates"] = existing["summary_updates"][-10:]
        changed = True

    existing["crawl_log"].append({
        "date": now, "notes": findings.get("crawl_notes",""),
        "new_items": changed,
    })
    existing["crawl_log"] = existing["crawl_log"][-50:]
    return existing, changed


# ══════════════════════════════════════════════════════════════
# ENTITY CRAWL TARGETS
# ══════════════════════════════════════════════════════════════
POLITICIAN_TARGETS = [
    # NZ — current government
    {"id": "luxon",    "name": "Christopher Luxon",  "country": "NZ", "parliament_name": "Christopher Luxon",
     "tavily_queries": ["Christopher Luxon lie contradiction {year}", "Christopher Luxon statement tweet social media {year}"]},
    {"id": "peters",   "name": "Winston Peters",      "country": "NZ", "parliament_name": "Winston Peters",
     "tavily_queries": ["Winston Peters NZ First contradiction {year}", "Winston Peters tweet statement {year}"]},
    {"id": "seymour",  "name": "David Seymour",       "country": "NZ", "parliament_name": "David Seymour",
     "tavily_queries": ["David Seymour ACT contradiction fact check {year}", "David Seymour statement {year}"]},
    {"id": "jones",    "name": "Shane Jones",          "country": "NZ", "parliament_name": "Shane Jones",
     "tavily_queries": ["Shane Jones NZ First controversy {year}", "Shane Jones statement tweet {year}"]},
    {"id": "willis",   "name": "Nicola Willis",        "country": "NZ", "parliament_name": "Nicola Willis",
     "tavily_queries": ["Nicola Willis finance minister contradiction {year}", "Nicola Willis statement {year}"]},
    {"id": "bishop",   "name": "Chris Bishop",         "country": "NZ", "parliament_name": "Chris Bishop",
     "tavily_queries": ["Chris Bishop housing minister statement {year}", "Chris Bishop housing contradiction {year}"]},
    # NZ — opposition
    {"id": "hipkins",  "name": "Chris Hipkins",        "country": "NZ", "parliament_name": "Chris Hipkins",
     "tavily_queries": ["Chris Hipkins Labour statement {year}", "Chris Hipkins contradiction {year}"]},
    {"id": "swarbrick","name": "Chloe Swarbrick",      "country": "NZ", "parliament_name": "Chlöe Swarbrick",
     "tavily_queries": ["Chloe Swarbrick Green Party statement {year}", "Chloe Swarbrick social media {year}"]},
    # Global
    {"id": "trump_us", "name": "Donald Trump",         "country": "US", "parliament_name": None,
     "tavily_queries": ["Donald Trump lie fact check {year}", "Donald Trump policy contradiction {year}"]},
    {"id": "albanese_au","name":"Anthony Albanese",    "country": "AU", "parliament_name": None,
     "tavily_queries": ["Anthony Albanese contradiction fact check {year}", "Anthony Albanese statement {year}"]},
    {"id": "starmer_uk","name":"Keir Starmer",         "country": "UK", "parliament_name": None,
     "tavily_queries": ["Keir Starmer contradiction promise broken {year}", "Keir Starmer statement {year}"]},
]

COMPANY_TARGETS = [
    {"id": "amazon",           "name": "Amazon",                    "country": "US",
     "tavily_queries": ["Amazon worker injury lawsuit {year}", "Amazon greenwashing controversy {year}"]},
    {"id": "meta",             "name": "Meta Facebook",             "country": "US",
     "tavily_queries": ["Meta Facebook fine lawsuit {year}", "Zuckerberg contradiction statement {year}"]},
    {"id": "shell",            "name": "Shell oil energy",          "country": "NL",
     "tavily_queries": ["Shell greenwashing net zero contradiction {year}", "Shell climate controversy {year}"]},
    {"id": "tesla",            "name": "Tesla Elon Musk",           "country": "US",
     "tavily_queries": ["Tesla safety autopilot investigation {year}", "Tesla worker discrimination lawsuit {year}"]},
    {"id": "spark_nz",         "name": "Spark New Zealand",         "country": "NZ",
     "tavily_queries": ["Spark NZ controversy news {year}", "Spark NZ worker data breach {year}"]},
    {"id": "skycity",          "name": "SkyCity Entertainment NZ",  "country": "NZ",
     "tavily_queries": ["SkyCity NZ AML fine controversy {year}", "SkyCity gambling harm {year}"]},
    {"id": "fonterra",         "name": "Fonterra NZ",               "country": "NZ",
     "tavily_queries": ["Fonterra NZ controversy news {year}", "Fonterra environment worker {year}"]},
    {"id": "fletcher_building","name": "Fletcher Building NZ",      "country": "NZ",
     "tavily_queries": ["Fletcher Building NZ controversy news {year}"]},
    {"id": "warehouse_group",  "name": "The Warehouse Group NZ",    "country": "NZ",
     "tavily_queries": ["Warehouse Group NZ worker controversy {year}"]},
    {"id": "air_nz",           "name": "Air New Zealand",           "country": "NZ",
     "tavily_queries": ["Air New Zealand controversy news {year}", "Air NZ worker environment {year}"]},
    {"id": "blackrock",        "name": "BlackRock Larry Fink",      "country": "US",
     "tavily_queries": ["BlackRock ESG reversal controversy {year}", "Larry Fink contradiction {year}"]},
]

COUNTRY_TARGETS = [
    {"id": "NZ",  "name": "New Zealand", "queries": ["New Zealand democracy freedom corruption index {year}"]},
    {"id": "AU",  "name": "Australia",   "queries": ["Australia freedom press corruption {year}"]},
    {"id": "US",  "name": "United States","queries": ["United States democracy freedom press {year}"]},
    {"id": "CN",  "name": "China",       "queries": ["China human rights press freedom {year}"]},
    {"id": "RU",  "name": "Russia",      "queries": ["Russia press freedom corruption {year}"]},
    {"id": "HU",  "name": "Hungary",     "queries": ["Hungary democracy backsliding {year}"]},
]


# ══════════════════════════════════════════════════════════════
# MAIN CRAWL FUNCTION
# ══════════════════════════════════════════════════════════════
def crawl_politician(target: dict):
    eid  = target["id"]
    name = target["name"]
    country = target.get("country","?")
    parliament_name = target.get("parliament_name")

    print(f"\n{'='*55}")
    print(f"Politician: {name} ({country})")
    print(f"{'='*55}")

    existing = load_live(eid, "politician")
    all_results = []
    sources_used = []

    # 1. NZ Parliament API (NZ politicians only, free, official)
    if parliament_name and country == "NZ":
        print(f"  [Parliament API] Fetching speeches…")
        speeches = parliament_member_speeches(parliament_name, max_items=8)
        votes    = parliament_member_votes(parliament_name)
        all_results.extend(speeches + votes)
        if speeches or votes:
            sources_used.append("NZ Parliament Hansard (official)")
        time.sleep(0.5)

    # 2. Beehive official press releases (free)
    beehive = beehive_search(name)
    all_results.extend(beehive)
    if beehive: sources_used.append("Beehive.govt.nz (official)")

    # 3. RSS feeds (free, unlimited)
    print(f"  [RSS] Searching {len(RSS_FEEDS)} feeds…")
    rss = rss_search(name, max_results=10)
    all_results.extend(rss)
    if rss: sources_used.append(f"RSS ({len(rss)} articles from NZ/intl media)")
    time.sleep(0.3)

    # 4. GDELT global news (free, unlimited)
    gdelt = gdelt_search(name, max_results=5)
    all_results.extend(gdelt)
    if gdelt: sources_used.append("GDELT global news database")
    time.sleep(0.5)

    # 5. NewsAPI (optional, 100/day free)
    newsapi = newsapi_search(name, max_results=4)
    all_results.extend(newsapi)
    if newsapi: sources_used.append("NewsAPI")

    # 6. Tavily targeted searches (1000/month free)
    for q_template in target.get("tavily_queries", []):
        query = q_template.format(year=THIS_YEAR)
        results = tavily_search(query, max_results=4)
        all_results.extend(results)
        if results: sources_used.append(f"Tavily: {query[:40]}")
        time.sleep(0.4)

    print(f"  [TOTAL] {len(all_results)} results from {len(sources_used)} sources")

    if not all_results:
        print(f"  [SKIP] No results found")
        existing["crawl_log"].append({"date": datetime.datetime.utcnow().isoformat()+"Z", "notes": "No results", "new_items": False})
        save_live(eid, "politician", existing)
        return

    # Format for Claude
    context = _format_context(all_results)

    print(f"  [Claude] Extracting findings…")
    findings = claude_extract(context, name, "politician", existing, sources_used)

    if not findings:
        save_live(eid, "politician", existing)
        return

    updated, changed = merge_findings(existing, findings)
    updated["sources_log"] = updated.get("sources_log",[])
    updated["sources_log"].append({"date": datetime.datetime.utcnow().isoformat()+"Z", "sources": sources_used})
    updated["sources_log"] = updated["sources_log"][-20:]
    save_live(eid, "politician", updated)

    print(f"  {'[UPDATED]' if changed else '[NO CHANGE]'} {name}")


def crawl_company(target: dict):
    eid  = target["id"]
    name = target["name"]

    print(f"\n{'='*55}")
    print(f"Company: {name}")
    print(f"{'='*55}")

    existing = load_live(eid, "company")
    all_results = []
    sources_used = []

    # RSS search
    rss = rss_search(name, max_results=8)
    all_results.extend(rss)
    if rss: sources_used.append(f"RSS ({len(rss)} articles)")

    # GDELT
    gdelt = gdelt_search(name, max_results=4)
    all_results.extend(gdelt)
    if gdelt: sources_used.append("GDELT")
    time.sleep(0.4)

    # NewsAPI
    newsapi = newsapi_search(name.split()[0], max_results=3)
    all_results.extend(newsapi)
    if newsapi: sources_used.append("NewsAPI")

    # Tavily targeted
    for q_template in target.get("tavily_queries", []):
        query = q_template.format(year=THIS_YEAR)
        results = tavily_search(query, max_results=3)
        all_results.extend(results)
        if results: sources_used.append(f"Tavily: {query[:40]}")
        time.sleep(0.4)

    print(f"  [TOTAL] {len(all_results)} results")

    if not all_results:
        existing["crawl_log"].append({"date": datetime.datetime.utcnow().isoformat()+"Z", "notes": "No results", "new_items": False})
        save_live(eid, "company", existing)
        return

    context = _format_context(all_results)
    findings = claude_extract(context, name, "company", existing, sources_used)

    if not findings:
        save_live(eid, "company", existing)
        return

    updated, changed = merge_findings(existing, findings)
    save_live(eid, "company", updated)
    print(f"  {'[UPDATED]' if changed else '[NO CHANGE]'} {name}")


def crawl_country(target: dict):
    eid  = target["id"]
    name = target["name"]
    print(f"\n{'='*55}")
    print(f"Country: {name}")
    print(f"{'='*55}")

    existing = load_live(eid, "country")
    all_results = []
    sources_used = []

    rss = rss_search(name, max_results=5)
    all_results.extend(rss)
    if rss: sources_used.append("RSS")

    for q_template in target.get("queries", []):
        query = q_template.format(year=THIS_YEAR)
        results = tavily_search(query, max_results=3)
        all_results.extend(results)
        if results: sources_used.append(f"Tavily: {query[:40]}")
        time.sleep(0.4)

    if not all_results:
        save_live(eid, "country", existing)
        return

    context = _format_context(all_results)
    findings = claude_extract(context, name, "country", existing, sources_used)
    if not findings:
        save_live(eid, "country", existing)
        return

    updated, changed = merge_findings(existing, findings)
    save_live(eid, "country", updated)
    print(f"  {'[UPDATED]' if changed else '[NO CHANGE]'} {name}")


def _format_context(results: list[dict]) -> str:
    """Format search results for Claude, deduplicated, capped at 12K chars."""
    seen = set()
    parts = []
    for r in results:
        key = (r.get("title","") + r.get("url",""))[:80]
        if key in seen: continue
        seen.add(key)
        parts.append(
            f"SOURCE: {r.get('source','')}\n"
            f"TYPE: {r.get('type','')}\n"
            f"TITLE: {r.get('title','')}\n"
            f"DATE: {r.get('date','')}\n"
            f"URL: {r.get('url','')}\n"
            f"CONTENT: {r.get('content','')[:500]}\n"
            f"---"
        )
    context = "\n".join(parts)
    return context[:14000]   # Hard cap — fits Claude's context well


# ══════════════════════════════════════════════════════════════
# MANIFEST
# ══════════════════════════════════════════════════════════════
def generate_manifest():
    manifest = {"generated": datetime.datetime.utcnow().isoformat()+"Z", "files": {}}
    for f in DATA_DIR.glob("*.json"):
        if f.name == "manifest.json": continue
        try:
            data = json.loads(f.read_text("utf-8"))
            manifest["files"][f.stem] = {
                "last_updated":  data.get("last_updated"),
                "lie_count":     data.get("lie_count", 0),
                "event_count":   len(data.get("recent_events", [])),
                "post_count":    len(data.get("social_posts", [])),
                "vote_count":    len(data.get("votes", [])),
                "sources":       [s["sources"] for s in data.get("sources_log",[])[-1:]][:1],
            }
        except Exception:
            pass
    (DATA_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), "utf-8")
    print(f"\n[MANIFEST] {len(manifest['files'])} entities tracked")


# ══════════════════════════════════════════════════════════════
# ENTRY POINT
# ══════════════════════════════════════════════════════════════
def main():
    print(f"\n{'#'*60}")
    print(f"WorldLens Multi-Source Crawler — {datetime.datetime.utcnow().isoformat()}Z")
    print(f"{'#'*60}")

    if not ANTHROPIC_API_KEY:
        print("\n[FATAL] ANTHROPIC_API_KEY not set — add as GitHub Secret")
        return

    sources_available = ["NZ Parliament API (free)", "Beehive RSS (free)",
                         "RSS feeds x7 (free)", "GDELT (free)"]
    if TAVILY_API_KEY: sources_available.append("Tavily (free tier)")
    if NEWSAPI_KEY:    sources_available.append("NewsAPI (free tier)")
    print(f"Sources available: {', '.join(sources_available)}")

    scope = os.environ.get("CRAWL_SCOPE", "all")
    print(f"Scope: {scope}\n")

    if scope in ("all", "politicians"):
        print(f"── Politicians ({len(POLITICIAN_TARGETS)}) ──")
        for t in POLITICIAN_TARGETS:
            crawl_politician(t)
            time.sleep(1)

    if scope in ("all", "companies"):
        print(f"\n── Companies ({len(COMPANY_TARGETS)}) ──")
        for t in COMPANY_TARGETS:
            crawl_company(t)
            time.sleep(1)

    if scope in ("all", "countries"):
        print(f"\n── Countries ({len(COUNTRY_TARGETS)}) ──")
        for t in COUNTRY_TARGETS:
            crawl_country(t)
            time.sleep(0.5)

    generate_manifest()
    print(f"\n{'#'*60}")
    print(f"Done — {datetime.datetime.utcnow().isoformat()}Z")
    print(f"{'#'*60}\n")


if __name__ == "__main__":
    main()
