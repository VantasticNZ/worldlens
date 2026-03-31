// ── WORLDLENS APP ──

const API_URL = 'https://api.anthropic.com/v1/messages';
let radarChart = null;
let selectedCountry = null;
let compareMode = false;
let compareCountries = [];
let currentMetric = 'overall';

// ── NAVIGATION ──
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`view-${view}`).classList.add('active');
  });
});

// ── COUNTRIES VIEW ──
function initCountriesView() {
  renderCountryList(COUNTRIES, currentMetric);
  initMap(currentMetric);
  renderHeatmapMatrix();
  initRadarChart();

  document.getElementById('metric-select').addEventListener('change', e => {
    currentMetric = e.target.value;
    document.getElementById('map-metric-label').textContent = METRICS[currentMetric];
    renderCountryList(COUNTRIES, currentMetric);
    initMap(currentMetric);
    renderHeatmapMatrix();
    if (selectedCountry) updateRadar(selectedCountry);
  });

  document.getElementById('country-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const filtered = COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)
    );
    renderCountryList(filtered, currentMetric);
  });

  document.getElementById('compare-btn').addEventListener('click', () => {
    compareMode = !compareMode;
    compareCountries = [];
    const btn = document.getElementById('compare-btn');
    btn.classList.toggle('active', compareMode);
    btn.textContent = compareMode ? 'Exit Compare' : 'Compare Mode';
    document.getElementById('compare-panel').style.display = 'none';
  });

  document.getElementById('close-compare').addEventListener('click', () => {
    document.getElementById('compare-panel').style.display = 'none';
    compareCountries = [];
  });

  document.getElementById('deep-dive-btn').addEventListener('click', () => {
    if (selectedCountry) fetchCountryAI(selectedCountry);
  });

  document.getElementById('close-ai-country').addEventListener('click', () => {
    document.getElementById('country-ai-panel').style.display = 'none';
  });
}

function renderCountryList(countries, metric) {
  const sorted = [...countries].sort((a, b) => {
    let va = a[metric] || a.overall;
    let vb = b[metric] || b.overall;
    if (metric === 'gdp') { va = a.gdp; vb = b.gdp; }
    return vb - va;
  });

  const list = document.getElementById('country-list');
  list.innerHTML = sorted.map((c, i) => {
    let val = c[metric];
    if (metric === 'gdp') val = Math.min(100, c.gdp / 1000);
    if (val === undefined) val = c.overall;
    const color = scoreGradient(val);
    const isSelected = selectedCountry === c.code;
    return `
      <div class="country-row ${isSelected ? 'selected' : ''}" data-code="${c.code}" onclick="selectCountry('${c.code}')">
        <span class="rank-num">${i+1}</span>
        <span class="country-flag">${c.flag}</span>
        <div class="country-info">
          <div class="country-name">${c.name}</div>
          <div class="country-region">${c.region}</div>
        </div>
        <div class="score-bar-wrap">
          <div class="score-bar">
            <div class="score-bar-fill" style="width:${val}%;background:${color}"></div>
          </div>
          <div class="score-num">${Math.round(val)}</div>
        </div>
      </div>
    `;
  }).join('');
}

window.selectCountry = function(code) {
  const country = COUNTRIES.find(c => c.code === code);
  if (!country) return;

  if (compareMode) {
    const idx = compareCountries.findIndex(c => c.code === code);
    if (idx >= 0) {
      compareCountries.splice(idx, 1);
    } else if (compareCountries.length < 4) {
      compareCountries.push(country);
    }
    if (compareCountries.length >= 2) renderCompare();
    renderCountryList(COUNTRIES, currentMetric);
    return;
  }

  selectedCountry = code;
  renderCountryList(COUNTRIES, currentMetric);
  updateRadar(country);

  document.getElementById('radar-title').textContent = `${country.flag} ${country.name}`;
  document.getElementById('deep-dive-btn').style.display = 'inline-block';
};

function initRadarChart() {
  const ctx = document.getElementById('radar-chart').getContext('2d');
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Quality of Life','Freedom','Safety','Healthcare','Education','Environment','Equality','Anti-Corruption','Press Freedom'],
      datasets: [{
        data: [0,0,0,0,0,0,0,0,0],
        backgroundColor: 'rgba(79,142,247,0.15)',
        borderColor: '#4f8ef7',
        borderWidth: 2,
        pointBackgroundColor: '#4f8ef7',
        pointRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: {
            display: false,
            stepSize: 25
          },
          grid: { color: 'rgba(255,255,255,0.06)' },
          angleLines: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: {
            color: '#8b92a8',
            font: { size: 10, family: 'Inter' }
          }
        }
      }
    }
  });
}

function updateRadar(country) {
  if (!radarChart) return;
  radarChart.data.datasets[0].data = [
    country.quality_of_life, country.freedom, country.safety,
    country.healthcare, country.education, country.environment,
    country.equality, country.corruption, country.press_freedom
  ];
  radarChart.update('active');
}

function renderHeatmapMatrix() {
  const container = document.getElementById('heatmap-matrix');
  const metricKeys = ['quality_of_life','freedom','safety','healthcare','education','environment','equality','corruption','press_freedom'];
  const sorted = [...COUNTRIES].sort((a,b) => b.overall - a.overall).slice(0, 20);

  container.innerHTML = sorted.map(c => {
    const metric = metricKeys[Math.floor(Math.random() * metricKeys.length)];
    const val = c.overall;
    const bg = scoreGradient(val);
    return `
      <div class="hm-cell" style="background:${bg}20;border:1px solid ${bg}40" onclick="selectCountry('${c.code}')">
        <div class="hm-country">${c.flag} ${c.code}</div>
        <div class="hm-score" style="color:${bg}">${val}</div>
        <div class="hm-metric">Overall</div>
      </div>
    `;
  }).join('');
}

function renderCompare() {
  const panel = document.getElementById('compare-panel');
  const content = document.getElementById('compare-content');
  panel.style.display = 'block';

  const metricKeys = Object.keys(METRICS).filter(k => k !== 'gdp');
  const colors = ['#4f8ef7','#22c55e','#f59e0b','#7b5cf0'];

  content.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(${compareCountries.length},1fr);gap:16px;margin-bottom:16px">
      ${compareCountries.map((c,i) => `
        <div style="text-align:center">
          <div style="font-size:24px">${c.flag}</div>
          <div style="font-size:13px;font-weight:600;color:${colors[i]}">${c.name}</div>
          <div style="font-size:22px;font-weight:700;font-family:Space Mono;color:${scoreGradient(c.overall)}">${c.overall}</div>
        </div>
      `).join('')}
    </div>
    <div class="compare-grid">
      ${metricKeys.map(mk => `
        <div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
          <div style="font-size:11px;color:#8b92a8;margin-bottom:4px">${METRICS[mk]}</div>
          <div style="display:grid;grid-template-columns:repeat(${compareCountries.length},1fr);gap:6px">
            ${compareCountries.map((c,i) => {
              const val = c[mk] || 0;
              return `
                <div>
                  <div style="height:4px;border-radius:2px;background:#1e222c;overflow:hidden">
                    <div style="height:100%;width:${val}%;background:${colors[i]};border-radius:2px"></div>
                  </div>
                  <div style="font-size:10px;font-family:Space Mono;color:${colors[i]};margin-top:2px">${val}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

async function fetchCountryAI(code) {
  const country = COUNTRIES.find(c => c.code === code);
  if (!country) return;

  const panel = document.getElementById('country-ai-panel');
  const content = document.getElementById('country-ai-content');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  content.innerHTML = `
    <div class="progress-wrap">
      <span>Generating intelligence report for ${country.flag} ${country.name}…</span>
      <div class="progress-bar"><div class="progress-fill" style="width:60%"></div></div>
    </div>
  `;

  const scores = Object.entries(METRICS)
    .filter(([k]) => k !== 'gdp' && k !== 'overall')
    .map(([k, label]) => `${label}: ${country[k]}/100`)
    .join(', ');

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a geopolitical intelligence analyst. Provide a sharp, concise intelligence brief for ${country.name} (${country.code}).

Scores: ${scores}
GDP per capita: $${country.gdp.toLocaleString()}
Overall score: ${country.overall}/100
Region: ${country.region}

Write a structured HTML intelligence report with these sections using <h3> tags:
1. Overview (2-3 sentences on national character/standing)
2. Strengths (bullet points as <p> tags with ✓ prefix)
3. Critical Weaknesses (bullet points with ✗ prefix)  
4. Corruption & Governance Watch (specific issues if any)
5. Geopolitical Context (role in world affairs, alliances, tensions)
6. Outlook (1-2 sentences)

Use <div class="highlight"> for especially notable facts. Be direct, factual, and analytical. No fluff. Return only the HTML content, no outer tags.`
        }]
      })
    });
    const data = await res.json();
    const text = data.content?.find(b => b.type === 'text')?.text || 'Unable to generate report.';
    content.innerHTML = text;
  } catch (e) {
    content.innerHTML = `<p style="color:#ef4444">Failed to fetch AI analysis. Check API connectivity.</p>`;
  }
}

// ── POLITICIANS VIEW ──
function initPoliticiansView() {
  renderPoliticianGrid(POLITICIANS);

  document.getElementById('pol-country-filter').addEventListener('change', e => {
    filterPoliticians();
  });
  document.getElementById('pol-sort').addEventListener('change', e => {
    filterPoliticians();
  });
  document.getElementById('pol-search').addEventListener('input', e => {
    filterPoliticians();
  });
  document.getElementById('close-pol-detail').addEventListener('click', () => {
    document.getElementById('pol-detail').style.display = 'none';
  });
  document.getElementById('close-pol-ai').addEventListener('click', () => {
    document.getElementById('pol-ai-panel').style.display = 'none';
  });
}

function filterPoliticians() {
  const country = document.getElementById('pol-country-filter').value;
  const sort = document.getElementById('pol-sort').value;
  const q = document.getElementById('pol-search').value.toLowerCase();

  let filtered = POLITICIANS.filter(p => {
    const matchCountry = country === 'all' || p.country === country;
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.party.toLowerCase().includes(q) || p.role.toLowerCase().includes(q);
    return matchCountry && matchSearch;
  });

  filtered.sort((a, b) => {
    if (sort === 'integrity') return b.integrity - a.integrity;
    if (sort === 'lie_count') return b.lie_count - a.lie_count;
    if (sort === 'corruption') return b.corruption_risk - a.corruption_risk;
    return 0;
  });

  renderPoliticianGrid(filtered);
}

function renderPoliticianGrid(politicians) {
  const grid = document.getElementById('pol-grid');
  grid.innerHTML = politicians.map(p => {
    const cls = integrityClass(p.integrity);
    return `
      <div class="pol-card ${cls}" onclick="openPolitician('${p.id}')">
        <div class="pol-avatar" style="background:${p.color}22;color:${p.color}">${p.initials}</div>
        <div class="pol-name">${p.name}</div>
        <div class="pol-role">${p.flag} ${p.role} · ${p.party}</div>
        <div class="pol-metrics">
          <div class="pol-metric-chip chip-integrity">✓ ${p.integrity}</div>
          <div class="pol-metric-chip chip-lie">⚠ ${p.lie_count} lies</div>
          <div class="pol-metric-chip chip-corruption">◈ ${p.corruption_risk}%</div>
        </div>
      </div>
    `;
  }).join('');
}

window.openPolitician = function(id) {
  const p = POLITICIANS.find(p => p.id === id);
  if (!p) return;

  document.getElementById('pol-detail-name').textContent = `${p.flag} ${p.name} — ${p.role}`;
  document.getElementById('pol-detail').style.display = 'block';

  const stancesHtml = p.stances.map(s => `
    <div class="stance-item">
      <span class="stance-topic">${s.topic}</span>
      <span class="stance-badge stance-${s.position}">${s.position.toUpperCase()}</span>
    </div>
  `).join('');

  const liesHtml = p.lies.map(l => `
    <div class="lie-item">
      <div class="lie-date">${l.date}</div>
      <div class="lie-claim">"${l.claim}"</div>
      <div class="lie-reality">Reality: ${l.reality}</div>
      <div class="lie-label">${l.severity === 'high' ? '🔴 MAJOR LIE' : '🟡 MISLEADING'}</div>
    </div>
  `).join('');

  const fundingHtml = p.funding.map(f => `
    <div class="funding-item">
      <span class="funding-source">${f.source}</span>
      <span class="funding-amount">${f.amount}</span>
    </div>
  `).join('');

  const quotesHtml = p.quotes.map(q => `
    <div class="quote-item">
      <div class="quote-text">${q.text}</div>
      <div class="quote-context">${q.context}</div>
    </div>
  `).join('');

  // Score rings
  const scoreHtml = (label, val, color) => `
    <div style="text-align:center;padding:8px 12px;background:#111318;border-radius:10px">
      <div style="font-size:24px;font-weight:700;font-family:Space Mono;color:${color}">${val}</div>
      <div style="font-size:10px;color:#8b92a8;margin-top:2px">${label}</div>
    </div>
  `;

  document.getElementById('pol-detail-content').innerHTML = `
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px">
      ${scoreHtml('Integrity', p.integrity, scoreGradient(p.integrity))}
      ${scoreHtml('Lie Count', p.lie_count, p.lie_count > 20 ? '#ef4444' : p.lie_count > 8 ? '#f59e0b' : '#22c55e')}
      ${scoreHtml('Corruption Risk', p.corruption_risk+'%', scoreGradient(100 - p.corruption_risk))}
      ${scoreHtml('Populism', p.populism, '#7b5cf0')}
    </div>
    <div style="margin-bottom:16px;padding:12px;background:#111318;border-radius:10px;font-size:13px;color:#8b92a8;line-height:1.6">${p.description}</div>

    <div class="pol-detail-grid">
      <div>
        <div class="pol-section-title">📌 Policy Stances</div>
        <div class="stance-list">${stancesHtml}</div>
      </div>
      <div>
        <div class="pol-section-title">🔴 Documented Lies & Contradictions</div>
        <div class="lies-list">${liesHtml || '<div style="color:#555d72;font-size:12px">No documented lies on file.</div>'}</div>
      </div>
      <div>
        <div class="pol-section-title">💰 Funding Sources</div>
        <div class="funding-list">${fundingHtml}</div>
      </div>
      <div>
        <div class="pol-section-title">💬 Notable Quotes</div>
        <div class="quote-list">${quotesHtml}</div>
      </div>
      <div>
        <div class="pol-section-title">🏦 Investments & Assets</div>
        <div style="font-size:12px;color:#8b92a8;padding:10px;background:#111318;border-radius:8px">${p.investments}</div>
      </div>
      <div>
        <div class="pol-section-title">🔗 Affiliations & Networks</div>
        <div style="font-size:12px;color:#8b92a8;padding:10px;background:#111318;border-radius:8px">${p.affiliations}</div>
      </div>
    </div>

    <div style="margin-top:16px;display:flex;gap:10px">
      <button class="ctrl-btn" onclick="fetchPoliticianAI('${p.id}')" style="font-size:13px;padding:8px 16px">AI Full Intelligence Brief ↗</button>
    </div>
  `;

  document.getElementById('pol-detail').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

async function fetchPoliticianAI(id) {
  const p = POLITICIANS.find(p => p.id === id);
  if (!p) return;

  const panel = document.getElementById('pol-ai-panel');
  const content = document.getElementById('pol-ai-content');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  content.innerHTML = `
    <div class="progress-wrap">
      <span>Compiling intelligence file on ${p.name}…</span>
      <div class="progress-bar"><div class="progress-fill" style="width:70%"></div></div>
    </div>
  `;

  const liesText = p.lies.map(l => `- ${l.date}: Claimed "${l.claim}" — Reality: ${l.reality}`).join('\n');
  const fundingText = p.funding.map(f => `- ${f.source}: ${f.amount}`).join('\n');

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a political intelligence analyst. Write a comprehensive, no-holds-barred profile of ${p.name}, ${p.role} (${p.party}, ${p.country}).

Known data:
- Integrity score: ${p.integrity}/100
- Documented lies on file: ${p.lie_count} total
- Corruption risk: ${p.corruption_risk}%
- Populism index: ${p.populism}%
- Description: ${p.description}
- Documented lies/contradictions:
${liesText}
- Known funding sources:
${fundingText}
- Investments: ${p.investments}
- Affiliations: ${p.affiliations}
- Quotes: ${p.quotes.map(q => q.text).join('; ')}

Write structured HTML using <h3> tags for these sections:
1. Intelligence Summary (2-3 sentences, honest assessment)
2. Track Record of Honesty (analyze the documented lies, patterns)
3. Follow the Money (analyze funding and conflict of interest)
4. Network & Influence Map (who they really serve based on affiliations)
5. Red Flags & Corruption Indicators (specific concerns)
6. What They Say vs What They Do (specific contradictions)
7. Verdict (honest 3-sentence summary of who this person really is)

Use <div class="highlight"> for the most important facts. Be analytical and honest. Do not sanitize. Return only the HTML content.`
        }]
      })
    });
    const data = await res.json();
    const text = data.content?.find(b => b.type === 'text')?.text || 'Unable to generate profile.';
    content.innerHTML = text;
  } catch (e) {
    content.innerHTML = `<p style="color:#ef4444">Failed to fetch AI analysis.</p>`;
  }
}

// ── COMPANIES VIEW ──
function getAllCompanies() {
  return [...COMPANIES, ...(window.NZ_COMPANIES || [])];
}

function initCompaniesView() {
  renderCompanyHeatmap(getAllCompanies());
  document.getElementById('comp-sector').addEventListener('change', filterCompanies);
  document.getElementById('comp-sort').addEventListener('change', filterCompanies);
  document.getElementById('comp-search').addEventListener('input', filterCompanies);
  document.getElementById('close-comp-detail').addEventListener('click', () => {
    document.getElementById('comp-detail').style.display = 'none';
  });
  document.getElementById('close-comp-ai').addEventListener('click', () => {
    document.getElementById('comp-ai-panel').style.display = 'none';
  });
}

function filterCompanies() {
  const sector = document.getElementById('comp-sector').value;
  const sort = document.getElementById('comp-sort').value;
  const q = document.getElementById('comp-search').value.toLowerCase();

  let filtered = getAllCompanies().filter(c => {
    const matchSector = sector === 'all' || c.sector === sector;
    const matchSearch = !q || c.name.toLowerCase().includes(q);
    return matchSector && matchSearch;
  });

  filtered.sort((a, b) => {
    if (sort === 'ethics') return b.ethics - a.ethics;
    if (sort === 'worker') return b.worker - a.worker;
    if (sort === 'env') return b.environmental - a.environmental;
    if (sort === 'transparency') return b.transparency - a.transparency;
    return b.overall - a.overall;
  });

  renderCompanyHeatmap(filtered);
}

const SECTOR_COLORS = {
  tech: { bg: 'rgba(79,142,247,0.1)', text: '#4f8ef7' },
  energy: { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b' },
  finance: { bg: 'rgba(123,92,240,0.1)', text: '#7b5cf0' },
  pharma: { bg: 'rgba(34,197,94,0.1)', text: '#22c55e' },
  retail: { bg: 'rgba(249,115,22,0.1)', text: '#f97316' },
  media: { bg: 'rgba(20,184,166,0.1)', text: '#14b8a6' },
};

function renderCompanyHeatmap(companies) {
  const container = document.getElementById('comp-heatmap');
  container.innerHTML = companies.map(c => {
    const sc = SECTOR_COLORS[c.sector] || SECTOR_COLORS.tech;
    const dims = [
      { label: 'Ethics', val: c.ethics },
      { label: 'Workers', val: c.worker },
      { label: 'Environment', val: c.environmental },
      { label: 'Transparency', val: c.transparency },
      { label: 'Tax fairness', val: c.tax },
      { label: 'Data privacy', val: c.data_privacy },
    ];
    return `
      <div class="comp-card" onclick="openCompany('${c.id}')">
        <div class="comp-sector-tag" style="background:${sc.bg};color:${sc.text}">${c.logo} ${c.sector.toUpperCase()}</div>
        <div class="comp-name">${c.name}</div>
        <div class="comp-tagline">${c.tagline}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <div style="font-size:26px;font-weight:700;font-family:Space Mono;color:${scoreGradient(c.overall)}">${c.overall}</div>
          <div style="font-size:10px;color:#8b92a8">Overall<br>Ethics Score</div>
        </div>
        <div class="comp-scores">
          ${dims.map(d => `
            <div class="comp-score-item">
              <div class="comp-score-label">${d.label}</div>
              <div class="comp-score-bar">
                <div class="comp-score-fill" style="width:${d.val}%;background:${scoreGradient(d.val)}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

window.openCompany = function(id) {
  const c = COMPANIES.find(c => c.id === id);
  if (!c) return;

  document.getElementById('comp-detail-name').textContent = `${c.logo} ${c.name} — Ethics Scorecard`;
  document.getElementById('comp-detail').style.display = 'block';

  const eventsHtml = c.controversies.map(e => `
    <div class="event-item ${e.type}">
      <div class="event-year">${e.year}</div>
      <div class="event-title">${e.title}</div>
      <div class="event-desc">${e.desc}</div>
    </div>
  `).join('');

  const statementsHtml = c.statements.map(s => `
    <div class="quote-item">
      <div class="quote-text">${s}</div>
    </div>
  `).join('');

  const dims = [
    { label: 'Ethics & Morality', val: c.ethics, key: 'ethics' },
    { label: 'Worker Treatment', val: c.worker, key: 'worker' },
    { label: 'Environmental Impact', val: c.environmental, key: 'environmental' },
    { label: 'Transparency', val: c.transparency, key: 'transparency' },
    { label: 'Tax Fairness', val: c.tax, key: 'tax' },
    { label: 'Data Privacy', val: c.data_privacy, key: 'data_privacy' },
  ];

  document.getElementById('comp-detail-content').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
      ${dims.map(d => `
        <div style="background:#111318;border-radius:10px;padding:12px;text-align:center">
          <div style="font-size:24px;font-weight:700;font-family:Space Mono;color:${scoreGradient(d.val)}">${d.val}</div>
          <div style="font-size:10px;color:#8b92a8;margin-top:2px">${d.label}</div>
          <div style="height:3px;border-radius:2px;background:#1e222c;margin-top:6px;overflow:hidden">
            <div style="height:100%;width:${d.val}%;background:${scoreGradient(d.val)}"></div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="comp-detail-grid">
      <div>
        <div class="pol-section-title">📋 Timeline of Events</div>
        <div class="event-list">${eventsHtml}</div>
      </div>
      <div>
        <div>
          <div class="pol-section-title">💬 Public Statements</div>
          <div class="quote-list" style="margin-bottom:16px">${statementsHtml}</div>
        </div>
        <div>
          <div class="pol-section-title">👷 Worker Notes</div>
          <div style="font-size:12px;color:#8b92a8;padding:10px;background:#111318;border-radius:8px;margin-bottom:12px">${c.worker_notes}</div>
        </div>
        <div>
          <div class="pol-section-title">💰 Tax & Finance</div>
          <div style="font-size:12px;color:#8b92a8;padding:10px;background:#111318;border-radius:8px">${c.tax_notes}</div>
        </div>
      </div>
    </div>
    <div style="margin-top:16px">
      <button class="ctrl-btn" onclick="fetchCompanyAI('${c.id}')" style="font-size:13px;padding:8px 16px">AI Company Analysis ↗</button>
    </div>
  `;

  document.getElementById('comp-detail').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

async function fetchCompanyAI(id) {
  const c = COMPANIES.find(c => c.id === id);
  if (!c) return;

  const panel = document.getElementById('comp-ai-panel');
  const content = document.getElementById('comp-ai-content');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  content.innerHTML = `
    <div class="progress-wrap">
      <span>Analyzing ${c.name} corporate intelligence…</span>
      <div class="progress-bar"><div class="progress-fill" style="width:65%"></div></div>
    </div>
  `;

  const controversiesText = c.controversies.map(e => `${e.year}: ${e.title} — ${e.desc}`).join('\n');

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a corporate ethics and ESG analyst. Provide a rigorous, unbiased analysis of ${c.name} (${c.sector} sector).

Scores (0-100): Ethics ${c.ethics}, Worker Treatment ${c.worker}, Environmental ${c.environmental}, Transparency ${c.transparency}, Tax Fairness ${c.tax}, Data Privacy ${c.data_privacy}
Overall: ${c.overall}/100
Description: ${c.description}
Timeline of events:
${controversiesText}
Worker notes: ${c.worker_notes}
Tax notes: ${c.tax_notes}
Public statements: ${c.statements.join('; ')}

Write structured HTML using <h3> tags for:
1. Corporate Character (honest assessment of who they are)
2. What They Say vs What They Do (greenwashing, PR vs reality)
3. Worker & Human Rights Record (specific findings)
4. Environmental Reality (actual impact vs claims)
5. Financial Ethics (tax, pricing, monopoly behavior)
6. Who Benefits (shareholders, workers, society — who actually benefits from this company)
7. Should You Buy From / Invest In Them? (honest recommendation)

Use <div class="highlight"> for critical facts. Be factual, direct, cite specifics from the data. Return only the HTML content.`
        }]
      })
    });
    const data = await res.json();
    const text = data.content?.find(b => b.type === 'text')?.text || 'Unable to generate analysis.';
    content.innerHTML = text;
  } catch (e) {
    content.innerHTML = `<p style="color:#ef4444">Failed to fetch AI analysis.</p>`;
  }
}

// ALL_COMPANIES available via getAllCompanies() above

window.openCompany = function(id) {
  const c = getAllCompanies().find(c => c.id === id);
  if (!c) return;
  document.getElementById('comp-detail-name').textContent = `${c.logo} ${c.name} — Ethics Scorecard`;
  document.getElementById('comp-detail').style.display = 'block';
  const eventsHtml = (c.controversies || []).map(e => `
    <div class="event-item ${e.type}">
      <div class="event-year">${e.year}</div>
      <div class="event-title">${e.title}</div>
      <div class="event-desc">${e.desc}</div>
    </div>
  `).join('');
  const dims = [
    {label:'Ethics',val:c.ethics},{label:'Workers',val:c.worker},
    {label:'Environment',val:c.environmental},{label:'Transparency',val:c.transparency},
    {label:'Tax Fairness',val:c.tax},{label:'Data Privacy',val:c.data_privacy},
  ];
  document.getElementById('comp-detail-content').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
      ${dims.map(d => `<div style="text-align:center;padding:10px;background:#111318;border-radius:10px">
        <div style="font-size:22px;font-weight:700;font-family:Space Mono;color:${scoreGradient(d.val)}">${d.val}</div>
        <div style="font-size:10px;color:#8b92a8;margin-top:2px">${d.label}</div>
        <div style="height:3px;border-radius:2px;background:#1e222c;margin-top:6px;overflow:hidden">
          <div style="height:100%;width:${d.val}%;background:${scoreGradient(d.val)}"></div>
        </div></div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div>
        <div class="pol-section-title">📋 Timeline</div>
        <div class="event-list">${eventsHtml}</div>
      </div>
      <div>
        <div class="pol-section-title">💬 Statements</div>
        <div class="quote-list" style="margin-bottom:12px">${(c.statements||[]).map(s=>`<div class="quote-item"><div class="quote-text">${s}</div></div>`).join('')}</div>
        <div class="pol-section-title">👷 Worker Notes</div>
        <div style="font-size:12px;color:#8b92a8;padding:10px;background:#111318;border-radius:8px;margin-bottom:12px">${c.worker_notes||'N/A'}</div>
        <div class="pol-section-title">💰 Tax Notes</div>
        <div style="font-size:12px;color:#8b92a8;padding:10px;background:#111318;border-radius:8px">${c.tax_notes||'N/A'}</div>
      </div>
    </div>
    <div style="margin-top:16px">
      <button class="ctrl-btn" onclick="fetchCompanyAI('${c.id}')" style="font-size:13px;padding:8px 16px">AI Analysis ↗</button>
    </div>

    <div style="margin-top:24px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div class="pol-section-title" style="margin:0">📱 Social Media Intelligence</div>
        <button class="mini-btn" onclick="fetchSocialAI('${c.id}','${c.name}','company')">AI Social Analysis ↗</button>
      </div>
      ${typeof renderSocialMediaPanel === 'function' ? renderSocialMediaPanel(c.id, 'company') : '<div style="color:#555d72;font-size:13px">Social module loading…</div>'}
    </div>

    <div id="social-ai-panel" class="card ai-panel" style="display:none;margin-top:12px">
      <div class="card-header">
        <span>AI Social Media Analysis</span>
        <button class="mini-btn" onclick="document.getElementById('social-ai-panel').style.display='none'">✕</button>
      </div>
      <div id="social-ai-content" class="ai-content"></div>
    </div>
  `;
  document.getElementById('comp-detail').scrollIntoView({behavior:'smooth',block:'nearest'});
};
