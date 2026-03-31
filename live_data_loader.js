// ══════════════════════════════════════════════════════════
// WORLDLENS — LIVE DATA LOADER
// ══════════════════════════════════════════════════════════
// Fetches crawled JSON from /live_data/ on page load.
// Merges new findings into static data.
// Shows 🔴 NEW badges on updated profiles.
// Works on GitHub Pages — just reads static JSON files.
// ══════════════════════════════════════════════════════════

const LIVE_DATA_BASE = './live_data';
const LIVE_CACHE_KEY = 'wl_live_cache';
const LIVE_CACHE_TTL = 30 * 60 * 1000; // 30 minutes — re-fetch if stale

// Track what's been loaded
window.LIVE_DATA = {};
window.LIVE_MANIFEST = null;

// ── LOAD MANIFEST ──
async function loadManifest() {
  try {
    const resp = await fetch(`${LIVE_DATA_BASE}/manifest.json?_=${Date.now()}`);
    if (!resp.ok) return null;
    const manifest = await resp.json();
    window.LIVE_MANIFEST = manifest;
    return manifest;
  } catch (e) {
    console.log('[LiveData] No manifest yet — crawler hasn\'t run');
    return null;
  }
}

// ── LOAD ONE ENTITY'S LIVE DATA ──
async function loadLiveEntity(entityType, entityId) {
  const key = `${entityType}_${entityId}`;
  const cacheKey = `${LIVE_CACHE_KEY}_${key}`;

  // Check memory cache first
  if (window.LIVE_DATA[key]) return window.LIVE_DATA[key];

  // Check localStorage cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < LIVE_CACHE_TTL) {
        window.LIVE_DATA[key] = data;
        return data;
      }
    }
  } catch (e) {}

  // Fetch from GitHub Pages
  try {
    const resp = await fetch(`${LIVE_DATA_BASE}/${key}.json?_=${Date.now()}`);
    if (!resp.ok) return null;
    const data = await resp.json();
    window.LIVE_DATA[key] = data;

    // Cache to localStorage
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ data, ts: Date.now() }));
    } catch (e) {}

    return data;
  } catch (e) {
    return null;
  }
}

// ── MERGE LIVE DATA INTO A POLITICIAN PROFILE ──
async function mergeLivePolitician(polId) {
  const live = await loadLiveEntity('politician', polId);
  if (!live) return null;

  const pol = NZ_POLITICIANS.find(p => p.id === polId)
           || POLITICIANS.find(p => p.id === polId);
  if (!pol) return null;

  // Merge new lies (avoiding duplicates)
  const existingClaims = new Set((pol.lies || []).map(l => l.claim?.slice(0, 50)));
  const newLies = (live.lies || []).filter(l => !existingClaims.has(l.claim?.slice(0, 50)));
  if (newLies.length) {
    pol.lies = [...(pol.lies || []), ...newLies];
    pol.lie_count = pol.lies.length;
  }

  // Apply score adjustments
  let intDelta = 0, corrDelta = 0;
  Object.values(live.score_adjustments || {}).forEach(adj => {
    intDelta  += (adj.integrity_delta || 0);
    corrDelta += (adj.corruption_risk_delta || 0);
  });
  if (intDelta)  pol.integrity      = Math.max(0, Math.min(100, pol.integrity - intDelta));
  if (corrDelta) pol.corruption_risk = Math.max(0, Math.min(100, pol.corruption_risk + corrDelta));

  // Append summary updates
  if (live.summary_updates?.length) {
    const latest = live.summary_updates.at(-1);
    pol._live_update = latest.text;
    pol._live_date   = latest.date?.slice(0, 10);
  }

  // Merge social posts
  const existingSocial = POLITICIAN_SOCIAL[polId];
  if (existingSocial && live.social_posts?.length) {
    const existingTexts = new Set((existingSocial.posts || []).map(p => p.text?.slice(0, 50)));
    const newPosts = live.social_posts.filter(p => !existingTexts.has(p.text?.slice(0, 50)));
    if (newPosts.length) {
      existingSocial.posts = [...(existingSocial.posts || []), ...newPosts];
      // Recalculate consistency score
      const total = existingSocial.posts.length;
      const discrepancies = existingSocial.posts.filter(p => p.discrepancy).length;
      existingSocial.consistency_score = Math.round(((total - discrepancies) / Math.max(1, total)) * 100);
    }
  } else if (!existingSocial && live.social_posts?.length) {
    // Create social entry from scratch
    POLITICIAN_SOCIAL[polId] = {
      handles: {},
      consistency_score: 50,
      platforms_active: [...new Set(live.social_posts.map(p => p.platform))],
      summary: pol._live_update || 'Live data sourced by automated crawler.',
      posts: live.social_posts,
    };
  }

  pol._live_events = live.recent_events || [];
  pol._has_live_data = true;
  pol._last_crawled = live.last_updated;

  return live;
}

// ── MERGE LIVE DATA INTO A COMPANY ──
async function mergeLiveCompany(compId) {
  const live = await loadLiveEntity('company', compId);
  if (!live) return null;

  const comp = [...COMPANIES, ...(window.NZ_COMPANIES || [])].find(c => c.id === compId);
  if (!comp) return null;

  // Merge new events
  const existingTitles = new Set((comp.controversies || []).map(e => e.title?.slice(0, 40)));
  const newEvents = (live.recent_events || []).filter(e => !existingTitles.has(e.title?.slice(0, 40)));
  if (newEvents.length) {
    comp.controversies = [...(comp.controversies || []), ...newEvents];
  }

  // Apply score adjustments
  let ethicsDelta = 0;
  Object.values(live.score_adjustments || {}).forEach(adj => {
    ethicsDelta += (adj.integrity_delta || 0);
  });
  if (ethicsDelta) comp.ethics = Math.max(0, Math.min(100, comp.ethics - ethicsDelta));

  // Merge social posts
  const existingCompSocial = COMPANY_SOCIAL[compId];
  if (existingCompSocial && live.social_posts?.length) {
    const existingTexts = new Set((existingCompSocial.posts || []).map(p => p.text?.slice(0, 50)));
    const newPosts = live.social_posts.filter(p => !existingTexts.has(p.text?.slice(0, 50)));
    existingCompSocial.posts = [...(existingCompSocial.posts || []), ...newPosts];
  } else if (!existingCompSocial && live.social_posts?.length) {
    COMPANY_SOCIAL[compId] = {
      handles: {},
      consistency_score: 50,
      platforms_active: [...new Set(live.social_posts.map(p => p.platform))],
      summary: 'Live data sourced by automated crawler.',
      posts: live.social_posts,
    };
  }

  if (live.summary_updates?.length) {
    comp._live_update = live.summary_updates.at(-1).text;
  }

  comp._has_live_data = true;
  comp._last_crawled = live.last_updated;

  return live;
}

// ── INIT: LOAD ALL LIVE DATA ON PAGE LOAD ──
async function initLiveData() {
  const manifest = await loadManifest();
  if (!manifest?.files) {
    showCrawlerStatus('pending');
    return;
  }

  showCrawlerStatus('loading');

  const promises = [];

  // Load all politician live data
  for (const pol of [...NZ_POLITICIANS, ...POLITICIANS]) {
    const fileKey = `politician_${pol.id}`;
    if (manifest.files[fileKey]) {
      promises.push(mergeLivePolitician(pol.id));
    }
  }

  // Load all company live data
  const allCompanies = [...COMPANIES, ...(window.NZ_COMPANIES || [])];
  for (const comp of allCompanies) {
    const fileKey = `company_${comp.id}`;
    if (manifest.files[fileKey]) {
      promises.push(mergeLiveCompany(comp.id));
    }
  }

  await Promise.allSettled(promises);

  const totalUpdated = Object.keys(window.LIVE_DATA).length;
  showCrawlerStatus('ready', manifest.generated, totalUpdated);

  // Re-render grids to show updated scores + NEW badges
  if (typeof renderNZGrid === 'function') {
    renderNZGrid(NZ_POLITICIANS);
  }
  if (typeof renderPoliticianGrid === 'function') {
    renderPoliticianGrid(POLITICIANS);
  }
  if (typeof renderCompanyHeatmap === 'function') {
    const ALL_COMPANIES = [...COMPANIES, ...(window.NZ_COMPANIES || [])];
    renderCompanyHeatmap(ALL_COMPANIES);
  }

  console.log(`[LiveData] Loaded ${totalUpdated} live data files`);
}

// ── STATUS INDICATOR ──
function showCrawlerStatus(state, lastCrawled, count) {
  const el = document.getElementById('crawler-status');
  if (!el) return;

  const states = {
    pending: { icon: '◌', color: '#555d72', text: 'Crawler not yet configured' },
    loading: { icon: '◌', color: '#4f8ef7', text: 'Loading live updates…' },
    ready:   { icon: '●', color: '#22c55e', text: `Live — ${count} entities tracked · Last crawl: ${lastCrawled ? new Date(lastCrawled).toLocaleString('en-NZ') : 'unknown'}` },
    error:   { icon: '◌', color: '#ef4444', text: 'Live data unavailable' },
  };

  const s = states[state] || states.pending;
  el.innerHTML = `<span style="color:${s.color};font-size:10px">${s.icon} ${s.text}</span>`;
}

// ── NEW BADGE HELPER ──
// Call this when rendering a card to show 🔴 NEW if live data exists
function getLiveBadge(entityId, entityType) {
  const key = `${entityType}_${entityId}`;
  const live = window.LIVE_DATA[key];
  if (!live?.last_updated) return '';

  const updatedAt = new Date(live.last_updated);
  const ageHours = (Date.now() - updatedAt.getTime()) / 3600000;

  if (ageHours < 24) {
    return `<span class="live-badge live-badge-new">🔴 NEW</span>`;
  } else if (ageHours < 72) {
    return `<span class="live-badge live-badge-recent">🟡 UPDATED</span>`;
  }
  return `<span class="live-badge live-badge-tracked">● TRACKED</span>`;
}

// ── LIVE UPDATE BANNER ──
// Shown inside a profile if there's a live summary update
function getLiveUpdateBanner(polOrComp) {
  if (!polOrComp?._live_update) return '';
  return `
    <div class="live-update-banner">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
        <span style="color:#4f8ef7;font-size:12px;font-weight:700">🤖 Auto-crawled update</span>
        <span style="font-size:10px;color:#555d72">${polOrComp._live_date || ''}</span>
      </div>
      <div style="font-size:13px;color:#c8cad0">${polOrComp._live_update}</div>
    </div>
  `;
}

// ── LIVE EVENTS SECTION ──
function getLiveEventsHtml(polOrComp) {
  const events = polOrComp?._live_events;
  if (!events?.length) return '';

  return `
    <div style="margin-top:16px">
      <div class="pol-section-title" style="display:flex;align-items:center;gap:8px">
        🤖 Auto-detected recent events
        <span style="font-size:9px;font-family:Space Mono;color:#4f8ef7;background:rgba(79,142,247,0.1);padding:2px 6px;border-radius:4px">LIVE</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
        ${events.map(e => `
          <div class="event-item ${e.type || 'neutral'}">
            <div class="event-year">${e.year} · ${e.source || 'Auto-crawled'}</div>
            <div class="event-title">${e.title}</div>
            <div class="event-desc">${e.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ── CRAWL LOG VIEWER ──
window.showCrawlLog = async function(entityType, entityId) {
  const live = await loadLiveEntity(entityType, entityId);
  if (!live) {
    alert('No crawl log available yet. Run the crawler first.');
    return;
  }

  const log = (live.crawl_log || []).slice(-10).reverse();
  const panel = document.getElementById('crawl-log-panel');
  const content = document.getElementById('crawl-log-content');
  if (!panel || !content) return;

  content.innerHTML = `
    <div style="margin-bottom:12px;font-size:13px;color:#8b92a8">
      Last crawled: ${live.last_updated ? new Date(live.last_updated).toLocaleString('en-NZ') : 'Never'}
      · Lie count: ${live.lie_count || 0}
      · Events: ${(live.recent_events || []).length}
      · Posts: ${(live.social_posts || []).length}
    </div>
    ${log.map(entry => `
      <div style="padding:8px 10px;background:#111318;border-radius:8px;margin-bottom:6px;border-left:3px solid ${entry.new_items ? '#22c55e' : '#555d72'}">
        <div style="font-size:10px;font-family:Space Mono;color:#555d72;margin-bottom:3px">${new Date(entry.date).toLocaleString('en-NZ')}</div>
        <div style="font-size:12px;color:${entry.new_items ? '#22c55e' : '#8b92a8'}">${entry.new_items ? '✓ New findings' : '○ No changes'}</div>
        ${entry.notes ? `<div style="font-size:11px;color:#555d72;margin-top:3px">${entry.notes}</div>` : ''}
      </div>
    `).join('') || '<div style="color:#555d72;font-size:13px">No log entries yet.</div>'}
  `;
  panel.style.display = 'block';
};

// Make helpers globally accessible
window.getLiveBadge = getLiveBadge;
window.getLiveUpdateBanner = getLiveUpdateBanner;
window.getLiveEventsHtml = getLiveEventsHtml;
window.loadLiveEntity = loadLiveEntity;
window.mergeLivePolitician = mergeLivePolitician;
window.mergeLiveCompany = mergeLiveCompany;

// ── AUTO-INIT on DOM ready ──
document.addEventListener('DOMContentLoaded', () => {
  // Small delay so all static data loads first
  setTimeout(initLiveData, 500);
});
