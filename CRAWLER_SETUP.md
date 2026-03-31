# WorldLens Automated Crawler — Setup Guide

Estimated setup time: **15 minutes**. No servers, no monthly fees beyond tiny Claude API costs.

---

## What You Need

| Thing | Where to get it | Cost |
|-------|----------------|------|
| GitHub account | github.com | Free |
| Claude API key | console.anthropic.com | Pay-per-use (~$2–5/month) |
| Tavily API key | tavily.com | Free (1000 searches/month) |

---

## Step 1 — Get Your API Keys

### Claude API key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in (or create account)
3. Click **API Keys → Create Key**
4. Copy the key — starts with `sk-ant-...`
5. Add $5 credit (the crawler uses ~$0.09/run, so $5 lasts months)

### Tavily API key
1. Go to [tavily.com](https://tavily.com)
2. Click **Get Started** — free account
3. Copy your API key from the dashboard
4. Free tier: 1,000 searches/month — plenty for the crawler

---

## Step 2 — Add Secrets to GitHub

**This is the most important step** — your API keys must never be in your code.

1. Go to your WorldLens repo on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each:

| Secret name | Value |
|------------|-------|
| `ANTHROPIC_API_KEY` | Your Claude key (`sk-ant-...`) |
| `TAVILY_API_KEY` | Your Tavily key |

That's it — GitHub Actions will inject these as environment variables when the crawler runs.

---

## Step 3 — Enable GitHub Actions

1. In your repo, click the **Actions** tab
2. If prompted, click **Enable Actions**
3. You should see "WorldLens Automated Crawler" in the list

### Test it manually first
1. Click **WorldLens Automated Crawler**
2. Click **Run workflow** (top right)
3. Set scope to `politicians`, dry_run to `false`
4. Click **Run workflow**
5. Watch the logs — should take 2–4 minutes

If it succeeds, you'll see new JSON files appear in your `live_data/` folder.

---

## Step 4 — Understand the Schedule

The crawler runs automatically on this rotation to minimise API costs:

| Day | Scope | Runs | Est. cost |
|-----|-------|------|-----------|
| Mon, Thu | Politicians only | 4× | ~$0.36 |
| Tue, Fri | Companies only | 4× | ~$0.16 |
| Wed, Sat | Countries only | 4× | ~$0.04 |
| Sunday | Everything | 4× | ~$0.54 |

**Monthly estimate: ~$3–8 Claude API costs**

To reduce further, edit `.github/workflows/crawl.yml` and change:
```yaml
- cron: '0 17,5,23,11 * * *'   # 4x/day
```
to:
```yaml
- cron: '0 5 * * *'            # once/day (cheapest)
```

---

## Step 5 — How the Site Updates

Once the crawler runs:

1. New JSON files appear in `/live_data/` (e.g. `politician_luxon.json`)
2. `manifest.json` is updated listing all tracked entities
3. On next page load, `live_data_loader.js` fetches the manifest
4. For each entity with live data, it loads and merges the JSON
5. Cards show 🔴 NEW / 🟡 UPDATED badges for recent changes
6. Politician profiles show auto-crawled events and social posts
7. Company scorecards show newly detected controversies

**No deploy needed** — GitHub Pages serves the JSON files directly.

---

## What the Crawler Finds

For each politician/company, Claude looks for:

- **New documented lies** — claims contradicted by official records
- **Social media posts** — with discrepancy detection against their record
- **Recent events** — controversies, fines, lawsuits, milestones
- **Score adjustments** — small changes to integrity/corruption scores based on new evidence

Claude only adds findings that are supported by the search results. It does not hallucinate sources.

---

## Monitoring

### See what's been crawled
- Go to **Actions** tab → click any run → view logs
- Each run shows exactly what was found and committed

### Per-entity crawl log
- Open any politician/company profile on the site
- Look for **"Show crawl log"** button (if live data is loaded)
- Shows last 10 crawl results with timestamps

### GitHub commit history
- Every crawl that finds new data creates a commit
- Message format: `🤖 Auto-crawl: politicians — 3 files, 12 lines updated`
- Full diff shows exactly what changed

---

## Customising What Gets Crawled

### Add a new politician
Open `crawler/crawl.py` and add to `POLITICIAN_TARGETS`:

```python
{
    "id": "bishop",          # must match the ID in nz_politicians.js
    "name": "Chris Bishop",  # used in search queries
    "country": "NZ",
    "queries": [
        "Chris Bishop housing minister statement 2025",
        "Chris Bishop contradiction fact check",
        "Chris Bishop social media post",
    ],
},
```

### Add a new company
Add to `COMPANY_TARGETS` in the same file:

```python
{
    "id": "meridian_energy",
    "name": "Meridian Energy NZ",
    "queries": [
        "Meridian Energy NZ news controversy 2025",
        "Meridian Energy worker conditions environment",
    ],
},
```

### Run a specific entity only
1. Go to Actions → WorldLens Automated Crawler → Run workflow
2. Set scope to `politicians` and use dry_run to test first

---

## Troubleshooting

**"ANTHROPIC_API_KEY not set"**
→ Check Secrets are added correctly (Settings → Secrets → Actions)

**"No search results returned"**
→ Tavily key might be missing or free tier exhausted. Check tavily.com dashboard.

**No JSON files appearing in live_data/**
→ Check the Actions log for errors. Common issue: repo doesn't have write permissions. Go to Settings → Actions → General → Workflow permissions → set to "Read and write permissions".

**Site not showing live badges**
→ GitHub Pages caches aggressively. Hard refresh (Ctrl+Shift+R) or wait 5 minutes.

**Crawler runs but Claude finds nothing**
→ Normal if nothing newsworthy happened for that entity. The crawl log will say "No significant new findings."

---

## Privacy & Data Notes

- The crawler only searches public web sources
- No private data, login-required content, or social media APIs are used
- All findings are traceable to public news sources
- Crawl logs are stored in the repo — they're public if your repo is public
- If you want a private repo, GitHub Pages requires a paid plan; alternative: use Cloudflare Pages (free, works with private repos)

---

## Cost Summary

| Service | Free tier | Expected use | Monthly cost |
|---------|-----------|-------------|-------------|
| GitHub Actions | 2000 min/month | ~120 min | Free |
| GitHub Pages | Unlimited | Static hosting | Free |
| Tavily | 1000 searches/month | ~600 searches | Free |
| Claude API | Pay per token | ~900K tokens | ~$3–8 |

**Total: ~$3–8/month** (Claude API only)
