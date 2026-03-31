// ── NZ FOCUS VIEW ──
// Politician profiles, timeline, search, compare, watchlist, embed cards

let watchlist = JSON.parse(localStorage.getItem('wl_watchlist') || '[]');
let compareList = [];
let nzFilter = { party: 'all', sort: 'integrity', q: '' };

// ── RENDER POLITICIAN GRID ──
function renderNZGrid(politicians) {
  const grid = document.getElementById('nz-pol-grid');
  if (!grid) return;

  grid.innerHTML = politicians.map(p => {
    const cls = p.integrity >= 65 ? 'integrity-high' : p.integrity >= 45 ? 'integrity-med' : 'integrity-low';
    const watching = watchlist.includes(p.id);
    const inCompare = compareList.includes(p.id);
    const isHistorical = p.timeline && p.timeline[0]?.year < 2010 && !p.role.includes('PM') && !p.role.includes('Leader') && !p.role.includes('Minister') ? false : p.id === 'muldoon' || p.id === 'lange' || p.id === 'clark';

    return `
      <div class="pol-card ${cls} ${inCompare ? 'in-compare' : ''}" onclick="openNZPolitician('${p.id}')">
        ${isHistorical ? '<div class="historical-tag">Historical</div>' : ''}
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
          <div class="pol-avatar" style="background:${p.color}22;color:${p.color}">${p.initials}</div>
          <div style="display:flex;gap:4px">
            <button class="icon-btn ${watching ? 'watching' : ''}" onclick="event.stopPropagation();toggleWatch('${p.id}')" title="${watching ? 'Unwatch' : 'Watch'}">
              ${watching ? '★' : '☆'}
            </button>
            <button class="icon-btn ${inCompare ? 'in-compare-btn' : ''}" onclick="event.stopPropagation();toggleCompare('${p.id}')" title="Compare">⊕</button>
          </div>
        </div>
        <div class="pol-name">${p.name}</div>
        <div class="pol-role">${p.flag} ${p.role} · ${p.party}</div>
        <div style="font-size:10px;color:#555d72;margin:4px 0 8px">Since ${p.since}</div>
        <div class="pol-metrics">
          <div class="pol-metric-chip chip-integrity" title="Integrity score">✓ ${p.integrity}</div>
          <div class="pol-metric-chip chip-lie" title="Documented lies">⚠ ${p.lie_count}</div>
          <div class="pol-metric-chip chip-corruption" title="Corruption risk">◈ ${p.corruption_risk}%</div>
        </div>
        <div style="margin-top:8px">
          <div style="height:3px;border-radius:2px;background:#1e222c;overflow:hidden">
            <div style="height:100%;width:${p.integrity}%;background:${scoreGradient(p.integrity)};border-radius:2px"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── OPEN FULL POLITICIAN PROFILE ──
window.openNZPolitician = function(id) {
  const p = NZ_POLITICIANS.find(p => p.id === id);
  if (!p) return;

  const panel = document.getElementById('nz-pol-detail');
  document.getElementById('nz-pol-detail-name').textContent = `${p.flag} ${p.name}`;
  panel.style.display = 'block';

  // Lies
  const liesHtml = p.lies.length ? p.lies.map(l => `
    <div class="lie-item">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <div class="lie-date">${l.date}</div>
        <div class="lie-label">${l.severity === 'high' ? '🔴 MAJOR' : '🟡 MISLEADING'}</div>
      </div>
      <div class="lie-claim">"${l.claim}"</div>
      <div class="lie-reality">Reality: ${l.reality}</div>
      ${l.source ? `<div style="font-size:10px;color:#555d72;margin-top:4px">Source: ${l.source}</div>` : ''}
    </div>
  `).join('') : '<div style="color:#555d72;font-size:12px;padding:8px">No documented lies on file.</div>';

  // Voting record
  const votingHtml = p.voting_record?.length ? p.voting_record.map(v => `
    <div style="display:flex;gap:8px;align-items:center;padding:6px 10px;background:#111318;border-radius:8px;border-left:3px solid ${v.vote === 'for' ? '#22c55e' : '#ef4444'}">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600">${v.bill}</div>
        <div style="font-size:10px;color:#8b92a8">${v.year} · ${v.note}</div>
        <div style="font-size:10px;color:#555d72">Source: ${v.source || 'NZ Parliament Hansard'}</div>
      </div>
      <div style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;flex-shrink:0;background:${v.vote === 'for' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'};color:${v.vote === 'for' ? '#22c55e' : '#ef4444'}">${v.vote.toUpperCase()}</div>
    </div>
  `).join('') : '<div style="color:#555d72;font-size:12px">No voting record on file.</div>';

  // Stances
  const stancesHtml = p.stances?.map(s => `
    <div class="stance-item">
      <div style="flex:1">
        <span class="stance-topic">${s.topic}</span>
        ${s.source ? `<div style="font-size:10px;color:#555d72">Source: ${s.source}</div>` : ''}
      </div>
      <span class="stance-badge stance-${s.position}">${s.position.toUpperCase()}</span>
    </div>
  `).join('') || '';

  // Funding
  const fundingHtml = p.funding?.map(f => `
    <div class="funding-item">
      <div>
        <div class="funding-source">${f.source}</div>
        ${f.note ? `<div style="font-size:10px;color:#555d72">${f.note}</div>` : ''}
      </div>
      <span class="funding-amount">${f.amount}</span>
    </div>
  `).join('') || '';

  // Quotes
  const quotesHtml = p.quotes?.map(q => `
    <div class="quote-item" style="border-left-color:${q.significance === 'neg' ? '#ef4444' : q.significance === 'pos' ? '#22c55e' : '#7b5cf0'}">
      <div class="quote-text">${q.text}</div>
      <div class="quote-context">${q.context}</div>
    </div>
  `).join('') || '';

  // Timeline
  const timelineHtml = p.timeline?.map((t, i) => `
    <div style="display:flex;gap:12px;align-items:flex-start;position:relative;padding-bottom:12px">
      <div style="width:32px;text-align:center;flex-shrink:0">
        <div style="font-size:10px;font-family:Space Mono;color:#4f8ef7;font-weight:700">${t.year}</div>
      </div>
      <div style="width:8px;height:8px;border-radius:50%;background:#4f8ef7;flex-shrink:0;margin-top:2px"></div>
      ${i < p.timeline.length - 1 ? `<div style="position:absolute;left:35px;top:10px;bottom:0;width:1px;background:rgba(79,142,247,0.2)"></div>` : ''}
      <div style="font-size:12px;color:#c8cad0;padding-top:0">${t.event}</div>
    </div>
  `).join('') || '';

  // Score cards
  const dims = [
    { label: 'Integrity', val: p.integrity },
    { label: 'Consistency', val: p.consistency || 50 },
    { label: 'Documented Lies', val: 100 - Math.min(100, p.lie_count * 3), raw: p.lie_count, rawLabel: 'lies' },
    { label: 'Corruption Risk', val: 100 - p.corruption_risk, raw: p.corruption_risk, rawLabel: '%' },
    { label: 'Populism Index', val: p.populism },
  ];

  document.getElementById('nz-pol-detail-content').innerHTML = `
    <div style="padding:12px 14px;background:#111318;border-radius:10px;font-size:13px;color:#8b92a8;margin-bottom:16px;line-height:1.6">${p.description}</div>

    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
      ${dims.map(d => `
        <div style="text-align:center;padding:10px 14px;background:#111318;border-radius:10px;min-width:90px">
          <div style="font-size:22px;font-weight:700;font-family:Space Mono;color:${scoreGradient(d.val)}">${d.raw !== undefined ? d.raw + d.rawLabel : d.val}</div>
          <div style="font-size:10px;color:#8b92a8;margin-top:2px">${d.label}</div>
          <div style="height:2px;background:#1e222c;border-radius:1px;margin-top:6px;overflow:hidden">
            <div style="height:100%;width:${d.val}%;background:${scoreGradient(d.val)}"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">

      <div>
        <div class="pol-section-title">🔴 Documented Lies & Contradictions</div>
        <div class="lies-list" style="margin-bottom:16px">${liesHtml}</div>

        <div class="pol-section-title">🗳 Voting Record</div>
        <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">${votingHtml}</div>

        <div class="pol-section-title">📅 Career Timeline</div>
        <div style="padding:8px 0">${timelineHtml}</div>
      </div>

      <div>
        <div class="pol-section-title">📌 Policy Stances</div>
        <div class="stance-list" style="margin-bottom:16px">${stancesHtml}</div>

        <div class="pol-section-title">💰 Funding & Financial Interests</div>
        <div class="funding-list" style="margin-bottom:16px">${fundingHtml}</div>

        <div class="pol-section-title">🏦 Investments & Assets</div>
        <div style="font-size:12px;color:#8b92a8;padding:10px;background:#111318;border-radius:8px;margin-bottom:12px">${p.investments}</div>

        <div class="pol-section-title">🔗 Affiliations & Networks</div>
        <div style="font-size:12px;color:#8b92a8;padding:10px;background:#111318;border-radius:8px;margin-bottom:12px">${p.affiliations}</div>

        <div class="pol-section-title">💬 Notable Quotes</div>
        <div class="quote-list" style="margin-bottom:12px">${quotesHtml}</div>

        <div class="pol-section-title">📋 Sources</div>
        <div style="font-size:11px;color:#555d72;padding:8px 10px;background:#111318;border-radius:8px">${(p.sources || []).join(' · ')}</div>
      </div>
    </div>

    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="ctrl-btn" onclick="fetchNZPoliticianAI('${p.id}')" style="font-size:13px;padding:8px 16px">AI Intelligence Brief ↗</button>
      <button class="mini-btn" onclick="copyEmbedCard('${p.id}')" style="padding:8px 14px">Copy Embed Card</button>
      <button class="mini-btn" onclick="toggleWatch('${p.id}')" id="watch-btn-${p.id}" style="padding:8px 14px">${watchlist.includes(p.id) ? '★ Watching' : '☆ Watch'}</button>
    </div>

    <!-- Social Media Tab -->
    <div style="margin-top:24px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div class="pol-section-title" style="margin:0">📱 Social Media Intelligence</div>
        <button class="mini-btn" onclick="fetchSocialAI('${p.id}','${p.name}','politician')">AI Social Analysis ↗</button>
      </div>
      ${renderSocialMediaPanel(p.id, 'politician')}
    </div>

    <div id="social-ai-panel" class="card ai-panel" style="display:none;margin-top:12px">
      <div class="card-header">
        <span>AI Social Media Analysis</span>
        <button class="mini-btn" onclick="document.getElementById('social-ai-panel').style.display='none'">✕</button>
      </div>
      <div id="social-ai-content" class="ai-content"></div>
    </div>
  `;

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ── WATCHLIST ──
window.toggleWatch = function(id) {
  const idx = watchlist.indexOf(id);
  if (idx >= 0) {
    watchlist.splice(idx, 1);
  } else {
    watchlist.push(id);
  }
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
    container.innerHTML = '<div style="color:#555d72;font-size:13px;padding:8px 0">No politicians on your watchlist yet. Click ☆ on any profile to watch them.</div>';
    return;
  }
  container.innerHTML = watchlist.map(id => {
    const p = NZ_POLITICIANS.find(p => p.id === id);
    if (!p) return '';
    return `
      <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
        <div style="width:28px;height:28px;border-radius:50%;background:${p.color}22;color:${p.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">${p.initials}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;cursor:pointer;color:#4f8ef7" onclick="openNZPolitician('${p.id}')">${p.name}</div>
          <div style="font-size:10px;color:#8b92a8">${p.party} · Integrity: ${p.integrity} · Lies: ${p.lie_count}</div>
        </div>
        <button class="icon-btn watching" onclick="toggleWatch('${p.id}')">★</button>
      </div>
    `;
  }).join('');
}

// ── COMPARE ──
window.toggleCompare = function(id) {
  const idx = compareList.indexOf(id);
  if (idx >= 0) {
    compareList.splice(idx, 1);
  } else if (compareList.length < 4) {
    compareList.push(id);
  }
  renderNZGrid(filteredNZPols());
  renderNZCompare();
};

function renderNZCompare() {
  const panel = document.getElementById('nz-compare-panel');
  if (!panel) return;
  if (compareList.length < 2) {
    panel.style.display = 'none';
    return;
  }
  panel.style.display = 'block';

  const pols = compareList.map(id => NZ_POLITICIANS.find(p => p.id === id)).filter(Boolean);
  const colors = ['#4f8ef7', '#22c55e', '#f59e0b', '#7b5cf0'];
  const dims = [
    { key: 'integrity', label: 'Integrity' },
    { key: 'consistency', label: 'Consistency' },
    { key: 'populism', label: 'Populism' },
    { key: 'corruption_risk', label: 'Corruption Risk', invert: true },
  ];

  document.getElementById('nz-compare-content').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(${pols.length},1fr);gap:16px;margin-bottom:20px">
      ${pols.map((p, i) => `
        <div style="text-align:center">
          <div style="width:40px;height:40px;border-radius:50%;background:${p.color}22;color:${p.color};display:flex;align-items:center;justify-content:center;font-weight:700;margin:0 auto 6px">${p.initials}</div>
          <div style="font-size:13px;font-weight:600;color:${colors[i]}">${p.name}</div>
          <div style="font-size:10px;color:#8b92a8">${p.party}</div>
        </div>
      `).join('')}
    </div>
    ${dims.map(d => `
      <div style="margin-bottom:14px">
        <div style="font-size:11px;color:#8b92a8;margin-bottom:6px">${d.label}</div>
        <div style="display:grid;grid-template-columns:repeat(${pols.length},1fr);gap:6px">
          ${pols.map((p, i) => {
            const val = d.invert ? (100 - p[d.key]) : (p[d.key] || 0);
            const rawVal = p[d.key] || 0;
            return `
              <div>
                <div style="height:6px;border-radius:3px;background:#111318;overflow:hidden">
                  <div style="height:100%;width:${val}%;background:${colors[i]};border-radius:3px"></div>
                </div>
                <div style="font-size:10px;font-family:Space Mono;color:${colors[i]};margin-top:2px">${rawVal}${d.invert ? '%' : ''}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('')}
    <div style="margin-top:8px">
      <div style="font-size:11px;color:#8b92a8;margin-bottom:8px">Documented Lies</div>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        ${pols.map((p, i) => `
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:8px;height:8px;border-radius:50%;background:${colors[i]}"></div>
            <span style="font-size:12px;color:#c8cad0">${p.name.split(' ')[1]}: <strong style="color:${colors[i]}">${p.lie_count}</strong> lies</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ── FILTER HELPERS ──
function filteredNZPols() {
  let result = [...NZ_POLITICIANS];
  if (nzFilter.party !== 'all') result = result.filter(p => p.party === nzFilter.party);
  if (nzFilter.q) result = result.filter(p =>
    p.name.toLowerCase().includes(nzFilter.q) ||
    p.role.toLowerCase().includes(nzFilter.q) ||
    p.party.toLowerCase().includes(nzFilter.q)
  );
  result.sort((a, b) => {
    if (nzFilter.sort === 'integrity') return b.integrity - a.integrity;
    if (nzFilter.sort === 'lie_count') return b.lie_count - a.lie_count;
    if (nzFilter.sort === 'corruption') return b.corruption_risk - a.corruption_risk;
    if (nzFilter.sort === 'name') return a.name.localeCompare(b.name);
    return 0;
  });
  return result;
}

// ── GLOBAL SEARCH ──
function initGlobalSearch() {
  const input = document.getElementById('global-search-input');
  const results = document.getElementById('global-search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (q.length < 2) { results.innerHTML = ''; return; }

    const all = [];

    NZ_POLITICIANS.forEach(p => {
      const score = p.name.toLowerCase().includes(q) ? 10 :
        p.party.toLowerCase().includes(q) ? 8 :
        p.role.toLowerCase().includes(q) ? 6 :
        p.lies?.some(l => l.claim.toLowerCase().includes(q) || l.reality.toLowerCase().includes(q)) ? 7 :
        p.stances?.some(s => s.topic.toLowerCase().includes(q)) ? 5 : 0;
      if (score > 0) all.push({ type: 'nz_politician', label: p.name, sub: `${p.party} · ${p.role}`, score, id: p.id });
    });

    POLITICIANS.forEach(p => {
      const score = p.name.toLowerCase().includes(q) ? 9 :
        p.party.toLowerCase().includes(q) ? 6 : 0;
      if (score > 0) all.push({ type: 'politician', label: p.name, sub: `${p.country} · ${p.party}`, score, id: p.id });
    });

    COUNTRIES.forEach(c => {
      const score = c.name.toLowerCase().includes(q) ? 8 :
        c.region.toLowerCase().includes(q) ? 5 : 0;
      if (score > 0) all.push({ type: 'country', label: c.name, sub: c.region, score, id: c.code });
    });

    COMPANIES.forEach(c => {
      const score = c.name.toLowerCase().includes(q) ? 8 :
        c.sector.toLowerCase().includes(q) ? 5 : 0;
      if (score > 0) all.push({ type: 'company', label: c.name, sub: c.sector, score, id: c.id });
    });

    NZ_COMPANIES.forEach(c => {
      const score = c.name.toLowerCase().includes(q) ? 9 :
        c.sector.toLowerCase().includes(q) ? 5 : 0;
      if (score > 0) all.push({ type: 'nz_company', label: c.name, sub: `NZ · ${c.sector}`, score, id: c.id });
    });

    WORKPLACES.forEach(w => {
      const score = w.company.toLowerCase().includes(q) ? 8 :
        (w.ceo || '').toLowerCase().includes(q) ? 9 : 0;
      if (score > 0) all.push({ type: 'workplace', label: w.company, sub: `${w.country} · ${w.sector}`, score, id: w.id });
    });

    const top = all.sort((a, b) => b.score - a.score).slice(0, 10);

    const typeIcon = { nz_politician: '🇳🇿', politician: '🏛', country: '🌍', company: '🏢', nz_company: '🇳🇿🏢', workplace: '👔' };
    const typeLabel = { nz_politician: 'NZ Politician', politician: 'Politician', country: 'Country', company: 'Company', nz_company: 'NZ Company', workplace: 'Workplace' };

    results.innerHTML = top.length ? top.map(r => `
      <div class="search-result-item" onclick="openSearchResult('${r.type}','${r.id}')">
        <span style="font-size:16px">${typeIcon[r.type] || '◈'}</span>
        <div>
          <div style="font-size:13px;font-weight:600">${r.label}</div>
          <div style="font-size:11px;color:#8b92a8">${typeLabel[r.type]} · ${r.sub}</div>
        </div>
      </div>
    `).join('') : '<div style="color:#555d72;font-size:13px;padding:12px">No results found.</div>';
  });
}

window.openSearchResult = function(type, id) {
  document.getElementById('global-search-results').innerHTML = '';
  document.getElementById('global-search-input').value = '';

  if (type === 'nz_politician') {
    switchToView('nz');
    setTimeout(() => openNZPolitician(id), 100);
  } else if (type === 'politician') {
    switchToView('politicians');
    setTimeout(() => openPolitician(id), 100);
  } else if (type === 'country') {
    switchToView('countries');
    setTimeout(() => selectCountry(id), 100);
  } else if (type === 'company' || type === 'nz_company') {
    switchToView('companies');
    setTimeout(() => openCompany(id), 100);
  } else if (type === 'workplace') {
    switchToView('workplace');
    setTimeout(() => openWorkplace(id), 100);
  }
};

function switchToView(view) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const btn = document.querySelector(`[data-view="${view}"]`);
  const viewEl = document.getElementById(`view-${view}`);
  if (btn) btn.classList.add('active');
  if (viewEl) viewEl.classList.add('active');
}
window.switchToView = switchToView;

// ── EMBED CARD ──
window.copyEmbedCard = function(id) {
  const p = NZ_POLITICIANS.find(p => p.id === id);
  if (!p) return;
  const card = `<div style="font-family:sans-serif;border:1px solid #ccc;border-radius:10px;padding:16px;max-width:280px">
  <strong>${p.flag} ${p.name}</strong> — ${p.role}<br>
  <small>${p.party} · Since ${p.since}</small><br><br>
  Integrity: ${p.integrity}/100 · Lies on record: ${p.lie_count}<br>
  <small>Source: WorldLens · worldlens.app</small>
</div>`;
  navigator.clipboard.writeText(card).then(() => {
    alert('Embed card HTML copied to clipboard!');
  });
};

// ── AI DEEP DIVE ──
window.fetchNZPoliticianAI = async function(id) {
  const p = NZ_POLITICIANS.find(p => p.id === id);
  if (!p) return;

  const panel = document.getElementById('nz-ai-panel');
  const content = document.getElementById('nz-ai-content');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  content.innerHTML = `<div class="progress-wrap"><span>Compiling NZ intelligence file on ${p.name}…</span><div class="progress-bar"><div class="progress-fill" style="width:70%"></div></div></div>`;

  const liesText = p.lies.map(l => `- ${l.date}: Claimed "${l.claim}" — Reality: ${l.reality} (Source: ${l.source})`).join('\n');
  const votingText = p.voting_record?.map(v => `- ${v.year}: ${v.bill} — voted ${v.vote}. ${v.note}`).join('\n') || 'Not available';
  const fundingText = p.funding?.map(f => `- ${f.source}: ${f.amount}. ${f.note || ''}`).join('\n') || 'Not available';

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        messages: [{
          role: 'user',
          content: `You are a New Zealand political analyst writing for a transparency platform. Write a rigorous, no-holds-barred intelligence profile of ${p.name}.

Role: ${p.role}, ${p.party}, since ${p.since}
Integrity score: ${p.integrity}/100 | Documented lies: ${p.lie_count} | Corruption risk: ${p.corruption_risk}% | Populism: ${p.populism}%
Description: ${p.description}

Documented lies/contradictions:
${liesText || 'None on file'}

Voting record:
${votingText}

Funding sources:
${fundingText}

Investments: ${p.investments}
Affiliations: ${p.affiliations}
Sources: ${(p.sources || []).join(', ')}

Write structured HTML with <h3> tags for:
1. Who They Really Are (honest 3-sentence assessment)
2. The Lie Pattern (what do their documented contradictions reveal about their character?)
3. Who They Serve (based on funding, investments, affiliations — who do their policies actually benefit?)
4. NZ Context (how do they fit into NZ political landscape and power structures?)
5. Best Case / Worst Case (steelman both their defenders and critics)
6. The Verdict (3 direct sentences — what should NZ voters know?)

Use <div class="highlight"> for the most critical facts. Cite sources where possible. Be analytical, direct, NZ-context-aware. Return only the HTML content.`
        }]
      })
    });
    const data = await res.json();
    content.innerHTML = data.content?.find(b => b.type === 'text')?.text || 'Unable to generate profile.';
  } catch (e) {
    content.innerHTML = `<p style="color:#ef4444">Failed to fetch AI analysis. Ensure API key is configured.</p>`;
  }
};

// ── METHODOLOGY ──
function renderMethodology() {
  const container = document.getElementById('methodology-content');
  if (!container) return;
  container.innerHTML = `
    <div class="method-section">
      <h3>Data Sources</h3>
      <p>All data on this platform is sourced from official or credible public records. No anonymous sources. No unverified claims. Each data point is traceable to a primary source.</p>
      <div class="source-grid" style="margin-top:10px">
        <div class="source-chip">NZ Parliament Hansard</div>
        <div class="source-chip">NZ Electoral Commission</div>
        <div class="source-chip">MPs' Interests Register</div>
        <div class="source-chip">Treasury / PREFU</div>
        <div class="source-chip">Stats NZ</div>
        <div class="source-chip">Serious Fraud Office NZ</div>
        <div class="source-chip">Commerce Commission</div>
        <div class="source-chip">Auditor-General reports</div>
        <div class="source-chip">RNZ / NZ Herald / Newsroom</div>
        <div class="source-chip">OIA documents</div>
        <div class="source-chip">Freedom House</div>
        <div class="source-chip">Transparency International</div>
        <div class="source-chip">World Bank</div>
        <div class="source-chip">OSHA / NLRB (US)</div>
        <div class="source-chip">European Commission</div>
      </div>
    </div>

    <div class="method-section">
      <h3>How Scores Are Calculated</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div>
          <div class="pol-section-title">Politician Integrity Score</div>
          <p>Composite of: consistency between stated positions and votes (30%), documented lies on record (30%), transparency of funding (20%), conflict of interest management (20%). Scale: 0 = completely untrustworthy, 100 = exemplary.</p>
        </div>
        <div>
          <div class="pol-section-title">Lie Count</div>
          <p>Only documented, sourced contradictions qualify. Must have: (1) original claim with date and source, (2) contradicting reality with source, (3) clear factual discrepancy — not just a change of opinion. Opinion changes are not counted as lies.</p>
        </div>
        <div>
          <div class="pol-section-title">Corruption Risk</div>
          <p>Assessed on: undisclosed funding sources, conflicts of interest between portfolio and investments, SFO/police investigations, international anti-corruption indicators, lobbying disclosure gaps.</p>
        </div>
        <div>
          <div class="pol-section-title">Country Scores</div>
          <p>Sourced from: Freedom House (freedom, press freedom), Transparency International (corruption), World Bank (GDP, healthcare, education), WHO (health system), OECD (quality of life, equality). Scores normalised to 0–100 scale.</p>
        </div>
      </div>
    </div>

    <div class="method-section">
      <h3>What We Don't Do</h3>
      <ul style="color:#8b92a8;font-size:13px;line-height:2;padding-left:16px">
        <li>We do not accept paid placements or advertiser influence</li>
        <li>We do not score based on political ideology — National and Labour politicians are assessed on identical criteria</li>
        <li>We do not publish unverified community submissions</li>
        <li>We do not make legal determinations — scores are editorial assessments, not legal findings</li>
        <li>We do not include anonymous sources in the official record</li>
      </ul>
    </div>

    <div class="method-section">
      <h3>Dispute Process</h3>
      <p>Any politician, company, or their representatives can formally contest a claim by submitting a dispute via GitHub Issues with:</p>
      <ol style="color:#8b92a8;font-size:13px;line-height:2;padding-left:16px;margin-top:8px">
        <li>The specific claim being disputed</li>
        <li>Why it is factually incorrect</li>
        <li>A verifiable source supporting the dispute</li>
      </ol>
      <p style="margin-top:8px">Disputes are publicly visible alongside the original claim. If a dispute is upheld, the original claim is removed or corrected with a note.</p>
    </div>
  `;
}

// ── INIT ──
function initNZView() {
  renderNZGrid(filteredNZPols());
  renderWatchlist();
  initGlobalSearch();
  renderMethodology();

  document.getElementById('nz-party-filter')?.addEventListener('change', e => {
    nzFilter.party = e.target.value;
    renderNZGrid(filteredNZPols());
  });
  document.getElementById('nz-sort')?.addEventListener('change', e => {
    nzFilter.sort = e.target.value;
    renderNZGrid(filteredNZPols());
  });
  document.getElementById('nz-search-filter')?.addEventListener('input', e => {
    nzFilter.q = e.target.value.toLowerCase();
    renderNZGrid(filteredNZPols());
  });
  document.getElementById('close-nz-detail')?.addEventListener('click', () => {
    document.getElementById('nz-pol-detail').style.display = 'none';
  });
  document.getElementById('close-nz-compare')?.addEventListener('click', () => {
    compareList = [];
    document.getElementById('nz-compare-panel').style.display = 'none';
    renderNZGrid(filteredNZPols());
  });
  document.getElementById('close-nz-ai')?.addEventListener('click', () => {
    document.getElementById('nz-ai-panel').style.display = 'none';
  });
  document.getElementById('close-network-panel')?.addEventListener('click', () => {
    document.getElementById('network-node-panel').style.display = 'none';
  });
}

window.initNZView = initNZView;
