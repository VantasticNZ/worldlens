// ══════════════════════════════════════════════════════════
// WORLDLENS — NZ VIEW (v2)
// Photos · Collapsible · Timeline · Source Links
// Connection Explorer · Red Flags · Fact-check Score
// ══════════════════════════════════════════════════════════

let watchlist = JSON.parse(localStorage.getItem('wl_watchlist') || '[]');
let compareList = [];
let nzFilter = { party: 'all', sort: 'integrity', q: '' };

// Photo cache
const PHOTO_CACHE = {};

// Wikipedia photo fetch
async function fetchWikiPhoto(name) {
  if (PHOTO_CACHE[name] !== undefined) return PHOTO_CACHE[name];
  try {
    const encoded = encodeURIComponent(name);
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=pageimages&format=json&pithumbsize=200&origin=*`;
    const r = await fetch(url);
    const data = await r.json();
    const pages = data?.query?.pages || {};
    const page = Object.values(pages)[0];
    const src = page?.thumbnail?.source || null;
    PHOTO_CACHE[name] = src;
    return src;
  } catch (e) {
    PHOTO_CACHE[name] = null;
    return null;
  }
}

// Collapsible helper
function makeCollapsible(id, title, icon, content, defaultOpen = false) {
  return `
    <div class="collapsible-section" id="col-wrap-${id}">
      <div class="collapsible-header ${defaultOpen ? 'open' : ''}" onclick="toggleCollapsible('${id}')">
        <div class="collapsible-title">
          <span>${icon}</span>
          <span>${title}</span>
        </div>
        <span class="collapsible-chevron ${defaultOpen ? 'open' : ''}" id="col-chev-${id}">▼</span>
      </div>
      <div class="collapsible-body ${defaultOpen ? 'open' : ''}" id="col-body-${id}">
        ${content}
      </div>
    </div>
  `;
}

window.toggleCollapsible = function(id) {
  const body  = document.getElementById(`col-body-${id}`);
  const chev  = document.getElementById(`col-chev-${id}`);
  const hdr   = body?.previousElementSibling;
  if (!body) return;
  const isOpen = body.classList.toggle('open');
  chev?.classList.toggle('open', isOpen);
  hdr?.classList.toggle('open', isOpen);
};

// Score colour
function scoreCol(val) {
  if (val >= 70) return 'var(--green)';
  if (val >= 45) return 'var(--amber)';
  return 'var(--red)';
}

// Party colours
const PARTY_BG = {
  'National': '#e8f0fb', 'ACT': '#fdf8e0', 'NZFirst': '#e8eaed',
  'Labour': '#fde8e8', 'Greens': '#e8f5ee',
};
const PARTY_COL = {
  'National': '#1a4f8a', 'ACT': '#b8960c', 'NZFirst': '#2d2d2d',
  'Labour': '#c0392b', 'Greens': '#1a7a4a',
};

// ── RENDER NZ GRID ──
function renderNZGrid(politicians) {
  const grid = document.getElementById('nz-pol-grid');
  if (!grid) return;

  grid.innerHTML = politicians.map(p => {
    const cls = p.integrity >= 65 ? 'integrity-high' : p.integrity >= 45 ? 'integrity-med' : 'integrity-low';
    const watching  = watchlist.includes(p.id);
    const inCompare = compareList.includes(p.id);
    const isHistorical = ['muldoon','lange','clark'].includes(p.id);
    const partyBg  = PARTY_BG[p.party]  || '#f5f4f0';
    const partyCol = PARTY_COL[p.party] || '#6b6b6b';
    const liveBadge = typeof getLiveBadge === 'function' ? getLiveBadge(p.id, 'politician') : '';
    const factCheckPct = Math.max(0, 100 - Math.round((p.lie_count / 30) * 100));

    return `
      <div class="pol-card ${cls} ${inCompare ? 'in-compare' : ''}" onclick="openNZPolitician('${p.id}')" id="pol-card-${p.id}">
        ${isHistorical ? '<div class="historical-tag">Historical</div>' : ''}
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
          <div class="pol-avatar-wrap">
            <div class="pol-avatar-initials" style="background:${partyBg};color:${partyCol}" id="avatar-${p.id}">${p.initials}</div>
          </div>
          <div style="display:flex;gap:4px">
            <button class="icon-btn ${watching ? 'watching' : ''}" onclick="event.stopPropagation();toggleWatch('${p.id}')" title="${watching ? 'Unwatch' : 'Watch'}">${watching ? '★' : '☆'}</button>
            <button class="icon-btn ${inCompare ? 'in-compare-btn' : ''}" onclick="event.stopPropagation();toggleCompare('${p.id}')" title="Compare">⊕</button>
          </div>
        </div>
        <div class="pol-name">${p.name} ${liveBadge}</div>
        <div class="pol-role">${p.flag} ${p.role}</div>
        <div style="display:flex;gap:6px;margin-bottom:10px;align-items:center">
          <span class="pol-party-tag" style="background:${partyBg};color:${partyCol}">${p.party}</span>
          <span style="font-size:10px;color:var(--grey-2)">Since ${p.since}</span>
        </div>
        <div class="pol-metrics">
          <div class="pol-metric-chip chip-integrity" title="Integrity score">✓ ${p.integrity}</div>
          <div class="pol-metric-chip chip-lie" title="Documented lies">⚠ ${p.lie_count} lies</div>
          <div class="pol-metric-chip chip-corruption" title="Corruption risk">◈ ${p.corruption_risk}%</div>
        </div>
        <div style="margin-top:10px">
          <div style="font-size:9px;color:var(--grey-2);margin-bottom:3px;text-transform:uppercase;letter-spacing:0.5px">Fact-check score</div>
          <div style="height:4px;background:var(--border-light);border-radius:2px;overflow:hidden">
            <div style="height:100%;width:${factCheckPct}%;background:${scoreCol(factCheckPct)};border-radius:2px;transition:width 0.4s"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Load photos async
  politicians.forEach(p => {
    fetchWikiPhoto(p.name).then(src => {
      if (!src) return;
      const el = document.getElementById(`avatar-${p.id}`);
      if (el) {
        el.outerHTML = `<img class="pol-avatar-img" src="${src}" alt="${p.name}" id="avatar-${p.id}" onerror="this.style.display='none'">`;
      }
    });
  });
}

// ── OPEN POLITICIAN PROFILE ──
window.openNZPolitician = async function(id) {
  const p = NZ_POLITICIANS.find(p => p.id === id);
  if (!p) return;

  const panel = document.getElementById('nz-pol-detail');
  document.getElementById('nz-pol-detail-name').textContent = p.name;
  panel.style.display = 'block';

  const partyBg  = PARTY_BG[p.party]  || '#f5f4f0';
  const partyCol = PARTY_COL[p.party] || '#6b6b6b';
  const factCheckPct = Math.max(0, 100 - Math.round((p.lie_count / 30) * 100));

  // Red flags — top 3 concerns
  const redFlags = [];
  if (p.lie_count > 15) redFlags.push(`${p.lie_count} documented lies/contradictions on record`);
  if (p.corruption_risk > 50) redFlags.push(`Corruption risk rated at ${p.corruption_risk}% — high`);
  if (p.lies?.some(l => l.severity === 'high')) redFlags.push(`${p.lies.filter(l=>l.severity==='high').length} major documented lie(s) with sourced evidence`);
  if (p.affiliations?.includes('SFO') || p.affiliations?.includes('Foundation')) redFlags.push('Linked to organisations under official investigation');
  if (p.investments?.toLowerCase().includes('conflict')) redFlags.push('Declared investments create potential policy conflicts of interest');

  // Photo
  const photoSrc = await fetchWikiPhoto(p.name);
  const photoHtml = photoSrc
    ? `<img class="pol-detail-photo" src="${photoSrc}" alt="${p.name}" onerror="this.style.display='none'">`
    : `<div class="pol-detail-initials" style="background:${partyBg};color:${partyCol}">${p.initials}</div>`;

  // Score boxes
  const scores = [
    { label: 'Integrity',      val: p.integrity,      color: scoreCol(p.integrity) },
    { label: 'Consistency',    val: p.consistency||50, color: scoreCol(p.consistency||50) },
    { label: 'Lie Count',      val: p.lie_count,       color: p.lie_count > 20 ? 'var(--red)' : p.lie_count > 8 ? 'var(--amber)' : 'var(--green)', raw: true },
    { label: 'Corruption Risk',val: p.corruption_risk+'%', color: scoreCol(100-p.corruption_risk), raw: true },
    { label: 'Populism',       val: p.populism,        color: '#7b5cf0' },
  ];

  // Lies HTML
  const liesHtml = p.lies?.length ? p.lies.map(l => `
    <div class="lie-item">
      <div class="lie-header">
        <span class="lie-date">${l.date}</span>
        <span class="${l.severity === 'high' ? 'lie-badge-high' : 'lie-badge-med'}">${l.severity === 'high' ? '🔴 MAJOR' : '🟡 MISLEADING'}</span>
      </div>
      <div class="lie-claim">"${l.claim}"</div>
      <div class="lie-reality">Reality: ${l.reality}</div>
      ${l.source ? `<a class="source-link" href="#" onclick="return false" title="${l.source}">📎 ${l.source.slice(0,60)}${l.source.length>60?'…':''}</a>` : ''}
    </div>
  `).join('') : '<div style="color:var(--grey-2);font-size:12px;padding:8px 0">No documented lies on file.</div>';

  // Stances HTML
  const stancesHtml = p.stances?.map(s => `
    <div class="stance-item">
      <div class="stance-topic-wrap">
        <div class="stance-topic">${s.topic}</div>
        ${s.source ? `<div class="stance-source">Source: ${s.source}</div>` : ''}
      </div>
      <span class="stance-badge stance-${s.position}">${s.position.toUpperCase()}</span>
    </div>
  `).join('') || '';

  // Votes HTML
  const votesHtml = p.voting_record?.length ? p.voting_record.map(v => `
    <div class="vote-item">
      <span class="vote-badge vote-${v.vote}">${v.vote.toUpperCase()}</span>
      <div style="flex:1;min-width:0">
        <div class="vote-bill">${v.bill}</div>
        <div class="vote-note">${v.note} ${v.source ? `· <a class="source-link" href="#" onclick="return false">📎 ${v.source}</a>` : ''}</div>
      </div>
      <span class="vote-year">${v.year}</span>
    </div>
  `).join('') : '<div style="color:var(--grey-2);font-size:12px">No voting record on file.</div>';

  // Funding HTML
  const fundingHtml = p.funding?.map(f => `
    <div class="funding-item">
      <div>
        <div class="funding-source">${f.source}</div>
        ${f.note ? `<div class="funding-note">${f.note}</div>` : ''}
      </div>
      <span class="funding-amount">${f.amount}</span>
    </div>
  `).join('') || '';

  // Quotes HTML
  const quotesHtml = p.quotes?.map(q => `
    <div class="quote-item">
      <div class="quote-text">${q.text}</div>
      <div class="quote-context">${q.context}</div>
    </div>
  `).join('') || '';

  // Timeline HTML
  const timelineItems = [];
  p.lies?.forEach(l => timelineItems.push({ type: 't-lie', year: l.date, title: l.claim.slice(0,60)+'…', desc: 'Documented contradiction', color: 'var(--red)' }));
  p.voting_record?.forEach(v => timelineItems.push({ type: 't-vote', year: String(v.year), title: v.bill.slice(0,60), desc: `Voted ${v.vote}`, color: 'var(--blue)' }));
  p.timeline?.forEach(t => timelineItems.push({ type: 't-event', year: String(t.year), title: t.event.slice(0,60), desc: '', color: 'var(--grey-2)' }));
  timelineItems.sort((a,b) => String(b.year).localeCompare(String(a.year)));

  const typeLabels = { 't-lie': 'Lie', 't-vote': 'Vote', 't-social': 'Social', 't-event': 'Event' };
  const typeColors = { 't-lie': 'var(--red)', 't-vote': 'var(--blue)', 't-social': '#7b5cf0', 't-event': 'var(--grey-2)' };

  const timelineHtml = timelineItems.length ? `
    <div class="timeline-wrap" id="tl-${id}">
      <div class="timeline-track">
        <div class="timeline-axis"></div>
        ${timelineItems.map(item => `
          <div class="timeline-item ${item.type}">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <div class="tl-type" style="color:${typeColors[item.type]}">${typeLabels[item.type]}</div>
              <div class="tl-title">${item.title}</div>
              ${item.desc ? `<div class="tl-desc">${item.desc}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '<div style="color:var(--grey-2);font-size:12px;padding:8px 0">No timeline data.</div>';

  // Connection explorer
  const networkEdges = NZ_NETWORK?.edges?.filter(e => {
    const src = e.source?.id || e.source;
    const tgt = e.target?.id || e.target;
    return src === id || tgt === id;
  }) || [];

  const connColors = { funding: 'var(--red)', ideological: '#7b5cf0', employment: 'var(--amber)', coalition: 'var(--blue)', party: 'var(--green)', policy: 'var(--grey-1)' };

  const connectionsHtml = networkEdges.length ? `
    <div class="connection-list">
      ${networkEdges.map(e => {
        const src = e.source?.id || e.source;
        const tgt = e.target?.id || e.target;
        const otherId = src === id ? tgt : src;
        const otherNode = NZ_NETWORK.nodes.find(n => n.id === otherId);
        const color = connColors[e.type] || 'var(--grey-2)';
        return `
          <div class="connection-node" onclick="highlightNetworkNode('${otherId}')">
            <div class="conn-type-dot" style="background:${color}"></div>
            <div class="conn-main">
              <div class="conn-type" style="color:${color}">${e.type}</div>
              <div class="conn-label">${otherNode?.label || otherId}</div>
              <div class="conn-detail">${e.label || ''}</div>
              ${e.source_url ? `<a class="conn-source" href="${e.source_url}" target="_blank">📎 View source ↗</a>` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  ` : '<div style="color:var(--grey-2);font-size:12px">No network connections mapped yet.</div>';

  // Live events
  const liveData = window.LIVE_DATA?.[`politician_${id}`];
  const liveEventsHtml = liveData?.recent_events?.length ? `
    <div style="margin-bottom:12px;padding:8px 12px;background:var(--blue-pale);border:1px solid #c0d4ec;border-left:3px solid var(--blue);border-radius:var(--r-md)">
      <div style="font-size:10px;font-weight:700;color:var(--blue);margin-bottom:4px">🤖 AUTO-CRAWLED UPDATES</div>
    </div>
    ${liveData.recent_events.map(e => `
      <div class="event-item ${e.type}">
        <div class="event-year">${e.year} · ${e.source || 'Auto-crawled'}</div>
        <div class="event-title">${e.title}</div>
        <div class="event-desc">${e.desc}</div>
      </div>
    `).join('')}
  ` : '';

  // Social media
  const socialHtml = typeof renderSocialMediaPanel === 'function'
    ? renderSocialMediaPanel(id, 'politician')
    : '<div style="color:var(--grey-2);font-size:13px">Social media data loading…</div>';

  // ── ASSEMBLE PROFILE ──
  document.getElementById('nz-pol-detail-content').innerHTML = `

    <!-- HERO -->
    <div class="pol-detail-hero">
      <div class="pol-detail-photo-wrap">${photoHtml}</div>
      <div class="pol-detail-info">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap">
          <div class="pol-detail-name">${p.flag} ${p.name}</div>
          <span class="pol-party-tag" style="background:${partyBg};color:${partyCol}">${p.party}</span>
        </div>
        <div class="pol-detail-role">${p.role} · Since ${p.since}</div>
        <div class="pol-score-row">
          ${scores.map(s => `
            <div class="pol-score-box">
              <div class="pol-score-val" style="color:${s.color}">${s.raw ? s.val : s.val}</div>
              <div class="pol-score-label">${s.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
        <button class="icon-btn ${watchlist.includes(id)?'watching':''}" onclick="toggleWatch('${id}')" style="font-size:20px" title="Watch">${watchlist.includes(id)?'★':'☆'}</button>
        <button class="mini-btn" onclick="fetchNZPoliticianAI('${id}')">AI Brief ↗</button>
        <button class="mini-btn" onclick="copyEmbedCard('${id}')">Copy card</button>
        <button class="mini-btn" onclick="window.print()">Print</button>
      </div>
    </div>

    <!-- FACT-CHECK BAR -->
    <div class="factcheck-bar">
      <div class="factcheck-label">Fact-check score</div>
      <div class="factcheck-track">
        <div class="factcheck-fill" style="width:${factCheckPct}%;background:${scoreCol(factCheckPct)}"></div>
      </div>
      <div class="factcheck-pct" style="color:${scoreCol(factCheckPct)}">${factCheckPct}%</div>
      <div style="font-size:10px;color:var(--grey-2);margin-left:8px">based on ${p.lie_count} documented lie${p.lie_count!==1?'s':''}</div>
    </div>

    <!-- DESCRIPTION -->
    <div style="padding:16px 20px;background:var(--paper);border-bottom:1px solid var(--border-light);font-size:13px;color:var(--charcoal-2);line-height:1.7">${p.description}</div>

    ${redFlags.length ? `
    <!-- RED FLAGS -->
    <div style="padding:16px 20px;border-bottom:1px solid var(--border-light)">
      <div class="red-flags-box">
        <div class="red-flags-title">⚠ Key concerns</div>
        ${redFlags.map(f => `<div class="red-flag-item">${f}</div>`).join('')}
      </div>
    </div>
    ` : ''}

    ${liveEventsHtml ? `<div style="padding:16px 20px;border-bottom:1px solid var(--border-light)">${liveEventsHtml}</div>` : ''}

    <!-- COLLAPSIBLE SECTIONS -->
    <div class="card" style="border-radius:0;border-left:none;border-right:none;border-top:none;box-shadow:none">

      ${makeCollapsible('lies-'+id, `Documented Lies & Contradictions (${p.lies?.length||0})`, '🔴', liesHtml, true)}
      ${makeCollapsible('stances-'+id, 'Policy Stances', '📌', `<div>${stancesHtml}</div>`, true)}
      ${makeCollapsible('votes-'+id, 'Voting Record', '🗳', `<div style="display:flex;flex-direction:column;gap:0">${votesHtml}</div>`, false)}
      ${makeCollapsible('timeline-'+id, 'Career Timeline', '📅', timelineHtml, false)}
      ${makeCollapsible('connections-'+id, 'Conflict of Interest Network', '🔗', connectionsHtml, false)}
      ${makeCollapsible('funding-'+id, 'Funding & Financial Interests', '💰', `<div>${fundingHtml}</div>`, false)}
      ${makeCollapsible('investments-'+id, 'Investments & Assets', '🏦', `<div style="font-size:13px;color:var(--charcoal-2);line-height:1.6">${p.investments}</div>`, false)}
      ${makeCollapsible('affiliations-'+id, 'Affiliations & Networks', '🌐', `<div style="font-size:13px;color:var(--charcoal-2);line-height:1.6">${p.affiliations}</div>`, false)}
      ${makeCollapsible('quotes-'+id, 'Notable Quotes', '💬', `<div>${quotesHtml}</div>`, false)}
      ${makeCollapsible('social-'+id, 'Social Media Intelligence', '📱',
        `<div style="margin-bottom:12px;display:flex;justify-content:flex-end"><button class="mini-btn" onclick="fetchSocialAI('${id}','${p.name}','politician')">AI Social Analysis ↗</button></div>
        ${socialHtml}
        <div id="social-ai-panel-${id}" style="display:none;margin-top:12px;padding:16px;background:var(--blue-pale);border:1px solid #c0d4ec;border-radius:var(--r-md)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">
            AI Social Analysis
            <button class="mini-btn" onclick="document.getElementById('social-ai-panel-${id}').style.display='none'">✕</button>
          </div>
          <div id="social-ai-content" class="ai-content"></div>
        </div>`, false)}
      ${makeCollapsible('sources-'+id, 'Data Sources', '📋',
        `<div style="font-size:12px;color:var(--grey-1);line-height:1.8">${(p.sources||[]).map(s=>`<div>· ${s}</div>`).join('')}</div>`, false)}
    </div>
  `;

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Enable timeline drag scroll
  const tl = document.getElementById(`tl-${id}`);
  if (tl) enableDragScroll(tl);
};

// Drag-scroll for timeline
function enableDragScroll(el) {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
  el.addEventListener('mouseleave', () => isDown = false);
  el.addEventListener('mouseup', () => isDown = false);
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
  });
}

window.highlightNetworkNode = function(nodeId) {
  // Switch to network view and highlight
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelector('[data-view="network"]').classList.add('active');
  document.getElementById('view-network').classList.add('active');
  setTimeout(() => {
    if (typeof initNetworkGraph === 'function') initNetworkGraph();
    const input = document.getElementById('network-search');
    if (input) { input.value = nodeId; input.dispatchEvent(new Event('input')); }
  }, 150);
};

// ── WATCHLIST ──
window.toggleWatch = function(id) {
  const idx = watchlist.indexOf(id);
  if (idx >= 0) watchlist.splice(idx, 1);
  else watchlist.push(id);
  localStorage.setItem('wl_watchlist', JSON.stringify(watchlist));
  renderWatchlist();
  renderNZGrid(filteredNZPols());
  const btn = document.getElementById(`watch-btn-${id}`);
  if (btn) btn.textContent = watchlist.includes(id) ? '★ Watching' : '☆ Watch';
};

function renderWatchlist() {
  const container = document.getElementById('watchlist-items');
  if (!container) return;
  if (!watchlist.length) {
    container.innerHTML = '<div style="color:var(--grey-2);font-size:13px;padding:4px 0">No politicians on your watchlist. Click ☆ on any profile to watch.</div>';
    return;
  }
  container.innerHTML = watchlist.map(id => {
    const p = NZ_POLITICIANS.find(p => p.id === id);
    if (!p) return '';
    const partyCol = PARTY_COL[p.party] || '#6b6b6b';
    return `
      <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border-light)">
        <div style="width:28px;height:28px;border-radius:50%;background:${PARTY_BG[p.party]||'#f5f4f0'};color:${partyCol};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;font-family:var(--font-serif)">${p.initials}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;cursor:pointer;color:var(--blue)" onclick="openNZPolitician('${p.id}')">${p.name}</div>
          <div style="font-size:10px;color:var(--grey-2)">${p.party} · Integrity: ${p.integrity} · Lies: ${p.lie_count}</div>
        </div>
        <button class="icon-btn watching" onclick="toggleWatch('${p.id}')">★</button>
      </div>
    `;
  }).join('');
}

// ── COMPARE ──
window.toggleCompare = function(id) {
  const idx = compareList.indexOf(id);
  if (idx >= 0) compareList.splice(idx, 1);
  else if (compareList.length < 4) compareList.push(id);
  renderNZGrid(filteredNZPols());
  renderNZCompare();
};

function renderNZCompare() {
  const panel = document.getElementById('nz-compare-panel');
  if (!panel) return;
  if (compareList.length < 2) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';

  const pols = compareList.map(id => NZ_POLITICIANS.find(p => p.id === id)).filter(Boolean);
  const colors = ['var(--blue)','var(--green)','var(--amber)','#7b5cf0'];
  const dims = [
    { key:'integrity',       label:'Integrity' },
    { key:'consistency',     label:'Consistency' },
    { key:'populism',        label:'Populism' },
    { key:'corruption_risk', label:'Corruption Risk', invert:true },
    { key:'lie_count',       label:'Lie Count',       invert:true, scale:3 },
  ];

  document.getElementById('nz-compare-content').innerHTML = `
    <div style="padding:20px">
      <div style="display:grid;grid-template-columns:repeat(${pols.length},1fr);gap:16px;margin-bottom:20px">
        ${pols.map((p,i) => `
          <div style="text-align:center">
            <div style="font-size:24px;margin-bottom:4px">${p.flag}</div>
            <div style="font-size:13px;font-weight:700;color:${colors[i]}">${p.name}</div>
            <div style="font-size:10px;color:var(--grey-2)">${p.party}</div>
          </div>
        `).join('')}
      </div>
      ${dims.map(d => `
        <div style="margin-bottom:14px">
          <div style="font-size:11px;color:var(--grey-1);margin-bottom:6px;font-weight:600">${d.label}</div>
          <div style="display:grid;grid-template-columns:repeat(${pols.length},1fr);gap:6px">
            ${pols.map((p,i) => {
              const raw = p[d.key] || 0;
              const val = d.invert ? Math.max(0,100-(raw*(d.scale||1))) : raw;
              return `
                <div>
                  <div style="height:5px;border-radius:3px;background:var(--border-light);overflow:hidden">
                    <div style="height:100%;width:${Math.min(100,val)}%;background:${colors[i]};border-radius:3px"></div>
                  </div>
                  <div style="font-size:10px;font-family:var(--font-mono);color:${colors[i]};margin-top:2px">${raw}${d.key==='corruption_risk'?'%':''}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── FILTER ──
function filteredNZPols() {
  let result = [...NZ_POLITICIANS];
  if (nzFilter.party !== 'all') result = result.filter(p => p.party === nzFilter.party);
  if (nzFilter.q) result = result.filter(p =>
    p.name.toLowerCase().includes(nzFilter.q) ||
    p.role.toLowerCase().includes(nzFilter.q) ||
    p.party.toLowerCase().includes(nzFilter.q)
  );
  result.sort((a,b) => {
    if (nzFilter.sort === 'integrity')   return b.integrity - a.integrity;
    if (nzFilter.sort === 'lie_count')   return b.lie_count - a.lie_count;
    if (nzFilter.sort === 'corruption')  return b.corruption_risk - a.corruption_risk;
    if (nzFilter.sort === 'name')        return a.name.localeCompare(b.name);
    return 0;
  });
  return result;
}

// ── GLOBAL SEARCH ──
function initGlobalSearch() {
  const input   = document.getElementById('global-search-input');
  const results = document.getElementById('global-search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (q.length < 2) { results.innerHTML = ''; return; }

    const all = [];
    const score = (text, q) => text.toLowerCase().includes(q) ? 1 : 0;

    NZ_POLITICIANS.forEach(p => {
      const s = score(p.name,q)*10 + score(p.party,q)*6 + score(p.role,q)*4 +
        (p.lies?.some(l=>l.claim.toLowerCase().includes(q)||l.reality.toLowerCase().includes(q))?7:0);
      if (s > 0) all.push({ type:'nz_politician', label:p.name, sub:`${p.party} · ${p.role}`, s, id:p.id });
    });

    POLITICIANS?.forEach(p => {
      const s = score(p.name,q)*9 + score(p.party,q)*5;
      if (s > 0) all.push({ type:'politician', label:p.name, sub:`${p.country} · ${p.party}`, s, id:p.id });
    });

    COUNTRIES?.forEach(c => {
      const s = score(c.name,q)*8 + score(c.region,q)*4;
      if (s > 0) all.push({ type:'country', label:c.name, sub:c.region, s, id:c.code });
    });

    getAllCompanies?.()?.forEach(c => {
      const s = score(c.name,q)*8 + score(c.sector,q)*4;
      if (s > 0) all.push({ type:'company', label:c.name, sub:c.sector, s, id:c.id });
    });

    WORKPLACES?.forEach(w => {
      const s = score(w.company,q)*8 + score(w.ceo||'',q)*9;
      if (s > 0) all.push({ type:'workplace', label:w.company, sub:`${w.country} · ${w.sector}`, s, id:w.id });
    });

    const top = all.sort((a,b) => b.s - a.s).slice(0, 8);
    const icons = { nz_politician:'🇳🇿', politician:'🏛', country:'🌍', company:'🏢', workplace:'👔' };
    const labels = { nz_politician:'NZ Politician', politician:'Politician', country:'Country', company:'Company', workplace:'Workplace' };

    results.innerHTML = top.length ? top.map(r => `
      <div class="search-result-item" onclick="openSearchResult('${r.type}','${r.id}')">
        <span style="font-size:18px">${icons[r.type]||'◈'}</span>
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--charcoal)">${r.label}</div>
          <div style="font-size:11px;color:var(--grey-2)">${labels[r.type]} · ${r.sub}</div>
        </div>
      </div>
    `).join('') : '<div style="color:var(--grey-2);font-size:13px;padding:14px 16px">No results found.</div>';
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#global-search-bar')) results.innerHTML = '';
  });
}

window.openSearchResult = function(type, id) {
  document.getElementById('global-search-results').innerHTML = '';
  document.getElementById('global-search-input').value = '';

  const switchView = v => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelector(`[data-view="${v}"]`)?.classList.add('active');
    document.getElementById(`view-${v}`)?.classList.add('active');
  };

  if (type === 'nz_politician') { switchView('nz'); setTimeout(() => openNZPolitician(id), 100); }
  else if (type === 'politician') { switchView('politicians'); setTimeout(() => window.openPolitician?.(id), 100); }
  else if (type === 'country') { switchView('countries'); setTimeout(() => window.selectCountry?.(id), 100); }
  else if (type === 'company')  { switchView('companies'); setTimeout(() => window.openCompany?.(id), 100); }
  else if (type === 'workplace'){ switchView('workplace'); setTimeout(() => window.openWorkplace?.(id), 100); }
};

// ── EMBED CARD ──
window.copyEmbedCard = function(id) {
  const p = NZ_POLITICIANS.find(p => p.id === id);
  if (!p) return;
  const card = `<div style="font-family:Georgia,serif;border:1px solid #e8e6e0;border-radius:10px;padding:16px;max-width:300px;background:#fff">
  <strong style="font-size:16px">${p.flag} ${p.name}</strong><br>
  <span style="font-size:12px;color:#6b6b6b">${p.role} · ${p.party}</span><br><br>
  <span style="color:#1a7a4a">Integrity: ${p.integrity}/100</span> &nbsp;
  <span style="color:#c0392b">Lies on record: ${p.lie_count}</span><br>
  <small style="color:#8f8f8f">Source: WorldLens · vantasticnz.github.io/worldlens</small>
</div>`;
  navigator.clipboard.writeText(card).then(() => alert('Embed card HTML copied!'));
};

// ── AI BRIEF ──
window.fetchNZPoliticianAI = async function(id) {
  const p = NZ_POLITICIANS.find(p => p.id === id);
  if (!p) return;

  const panel   = document.getElementById('nz-ai-panel');
  const content = document.getElementById('nz-ai-content');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior:'smooth', block:'nearest' });
  content.innerHTML = `<div class="progress-wrap"><span>Compiling intelligence file on ${p.name}…</span><div class="progress-bar"><div class="progress-fill" style="width:70%"></div></div></div>`;

  const liesText  = p.lies?.map(l=>`- ${l.date}: "${l.claim}" → Reality: ${l.reality} (${l.source})`).join('\n') || 'None';
  const fundText  = p.funding?.map(f=>`- ${f.source}: ${f.amount}`).join('\n') || 'None';

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        messages:[{ role:'user', content:`You are a NZ political intelligence analyst for WorldLens. Write a rigorous profile of ${p.name}.

Role: ${p.role}, ${p.party}
Integrity: ${p.integrity}/100 | Lies: ${p.lie_count} | Corruption risk: ${p.corruption_risk}% | Populism: ${p.populism}%
Bio: ${p.description}
Documented lies:\n${liesText}
Funding:\n${fundText}
Investments: ${p.investments}
Affiliations: ${p.affiliations}

Write structured HTML with <h3> tags for:
1. Who They Really Are
2. The Lie Pattern (what do contradictions reveal?)
3. Who They Serve (follow the money/affiliations)
4. NZ Political Context
5. Best Case / Worst Case
6. The Verdict (3 direct sentences)

Use <div class="highlight"> for critical facts. Return only HTML.` }]
      })
    });
    const data = await res.json();
    content.innerHTML = data.content?.find(b=>b.type==='text')?.text || 'Unable to generate profile.';
  } catch(e) {
    content.innerHTML = `<p style="color:var(--red)">Failed to fetch AI analysis. Check API key is configured.</p>`;
  }
};

// ── METHODOLOGY ──
function renderMethodology() {
  const container = document.getElementById('methodology-content');
  if (!container) return;
  container.innerHTML = `
    <div class="method-section">
      <h3>Data Sources</h3>
      <p>All data is sourced from official or credible public records. Every claim is traceable to a primary source.</p>
      <div class="source-grid" style="margin-top:10px">
        ${['NZ Parliament Hansard','NZ Electoral Commission','MPs\' Interests Register','Treasury / PREFU','Stats NZ','Serious Fraud Office NZ','Commerce Commission','Auditor-General','RNZ / NZ Herald / Newsroom','OIA documents','Freedom House','Transparency International','World Bank','OSHA / NLRB (US)','European Commission'].map(s=>`<div class="source-chip">${s}</div>`).join('')}
      </div>
    </div>
    <div class="method-section">
      <h3>How Scores Are Calculated</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div><div class="pol-section-title">Politician Integrity Score</div><p style="font-size:13px;color:var(--grey-1)">Composite of: consistency between stated positions and votes (30%), documented lies on record (30%), transparency of funding (20%), conflict of interest management (20%).</p></div>
        <div><div class="pol-section-title">Lie Count</div><p style="font-size:13px;color:var(--grey-1)">Only documented, sourced contradictions qualify. Must have original claim with date + contradicting reality with source. Opinion changes are not counted as lies.</p></div>
        <div><div class="pol-section-title">Corruption Risk</div><p style="font-size:13px;color:var(--grey-1)">Assessed on: undisclosed funding, conflicts of interest between portfolio and investments, official investigations, lobbying disclosure gaps.</p></div>
        <div><div class="pol-section-title">Fact-check Score</div><p style="font-size:13px;color:var(--grey-1)">Calculated as: max(0, 100 − (lie_count × 3)). Represents editorial assessment of truthfulness based on documented record.</p></div>
      </div>
    </div>
    <div class="method-section">
      <h3>What We Don't Do</h3>
      <ul style="color:var(--grey-1);font-size:13px;line-height:2.2;padding-left:16px">
        <li>We do not accept paid placements or advertiser influence</li>
        <li>We do not score based on political ideology — all parties assessed on identical criteria</li>
        <li>We do not publish unverified community submissions</li>
        <li>We do not make legal determinations — scores are editorial assessments</li>
        <li>We do not include anonymous sources in the official record</li>
      </ul>
    </div>
    <div class="method-section">
      <h3>Dispute Process</h3>
      <p style="font-size:13px;color:var(--grey-1)">Any politician, company, or representative can contest a claim by submitting via GitHub Issues with: the specific claim disputed, why it is factually incorrect, and a verifiable source. Disputes are publicly visible alongside the original claim.</p>
    </div>
  `;
}

// ── INIT ──
function initNZView() {
  renderNZGrid(filteredNZPols());
  renderWatchlist();
  initGlobalSearch();
  renderMethodology();

  document.getElementById('nz-party-filter')?.addEventListener('change', e => { nzFilter.party = e.target.value; renderNZGrid(filteredNZPols()); });
  document.getElementById('nz-sort')?.addEventListener('change', e => { nzFilter.sort = e.target.value; renderNZGrid(filteredNZPols()); });
  document.getElementById('nz-search-filter')?.addEventListener('input', e => { nzFilter.q = e.target.value.toLowerCase(); renderNZGrid(filteredNZPols()); });

  document.getElementById('close-nz-detail')?.addEventListener('click', () => { document.getElementById('nz-pol-detail').style.display='none'; });
  document.getElementById('close-nz-compare')?.addEventListener('click', () => { compareList=[]; document.getElementById('nz-compare-panel').style.display='none'; renderNZGrid(filteredNZPols()); });
  document.getElementById('close-nz-ai')?.addEventListener('click', () => { document.getElementById('nz-ai-panel').style.display='none'; });
  document.getElementById('close-network-panel')?.addEventListener('click', () => { document.getElementById('network-node-panel').style.display='none'; });
}

window.initNZView = initNZView;
