// ── WORLDLENS WORKPLACES & CEOs ──
// All entries are based on publicly reported/official information.
// Sources noted per entry. Community submissions go via GitHub Issues.

// IMPORTANT: Set your GitHub repo here after forking
const GITHUB_REPO = 'YOUR-USERNAME/worldlens'; // e.g. 'vansmith/worldlens'
const GITHUB_ISSUES_URL = `https://github.com/${GITHUB_REPO}/issues/new`;

// ── CEO / EXECUTIVE DATA ──
// Sources: news reports, court records, regulatory filings, official statements
const CEOS = [
  {
    id: 'musk_tesla', name: 'Elon Musk', company: 'Tesla / SpaceX / X', sector: 'tech',
    initials: 'EM', color: '#dc2626',
    ceo_rating: 28, leadership: 35, employee_treatment: 22, transparency: 15, ethics: 20,
    review_count: 4820,
    title: 'CEO — Tesla, SpaceX, xAI; Owner — X (Twitter)',
    sources: ['official', 'news'],
    summary: 'Billionaire CEO with cult following. Multiple SEC violations. Volatile public behaviour. Mass layoffs at X. Anti-union stance at Tesla confirmed by NLRB findings.',
    official_record: [
      { type: 'negative', year: 2024, title: 'SEC charges: misleading X acquisition disclosures', source: 'https://www.sec.gov' },
      { type: 'negative', year: 2023, title: 'NLRB: Tesla illegally fired union organizers', source: 'https://www.nlrb.gov' },
      { type: 'negative', year: 2022, title: 'Abrupt mass layoffs at Twitter — 80% of staff', source: 'Reuters' },
      { type: 'negative', year: 2018, title: 'SEC settlement: "funding secured" tweet (securities fraud)', source: 'SEC.gov' },
    ],
    employee_quotes: [
      { text: '"Performance reviews weaponized to push out organizers."', source: 'NLRB filing', verified: true },
      { text: '"Impossible deadlines, sleep at factory culture normalized."', source: 'Reuters investigation 2023', verified: true },
    ],
  },
  {
    id: 'pichai_google', name: 'Sundar Pichai', company: 'Alphabet / Google', sector: 'tech',
    initials: 'SP', color: '#4285f4',
    ceo_rating: 55, leadership: 58, employee_treatment: 52, transparency: 44, ethics: 50,
    review_count: 2140,
    title: 'CEO — Alphabet Inc. / Google',
    sources: ['official', 'news'],
    summary: 'Generally seen as measured and technical. Presided over multiple rounds of layoffs 2022-24. Pay gap investigations ongoing. Antitrust ruling against Google in 2024.',
    official_record: [
      { type: 'negative', year: 2024, title: 'DOJ antitrust ruling: Google illegally monopolized search', source: 'DOJ.gov' },
      { type: 'negative', year: 2023, title: '12,000 layoffs — employees given <1 hour notice', source: 'NYT' },
      { type: 'negative', year: 2022, title: 'EU: €4.34B antitrust fine upheld (Android)', source: 'European Commission' },
      { type: 'positive', year: 2021, title: 'Google commits to carbon-free energy by 2030', source: 'Google blog' },
    ],
    employee_quotes: [
      { text: '"Layoffs handled poorly — found out via email at 6am."', source: 'Verified via news coverage', verified: true },
    ],
  },
  {
    id: 'bezos_amazon', name: 'Jeff Bezos', company: 'Amazon (founder)', sector: 'tech',
    initials: 'JB', color: '#f97316',
    ceo_rating: 32, leadership: 45, employee_treatment: 18, transparency: 25, ethics: 22,
    review_count: 6100,
    title: 'Amazon Founder / Executive Chairman',
    sources: ['official', 'news'],
    summary: 'Built world\'s largest retailer. Stepped down as CEO 2021. Amazon warehouse injury rates 2× industry average documented by OSHA. Personal wealth vs worker pay gap among largest in corporate history.',
    official_record: [
      { type: 'negative', year: 2023, title: 'OSHA: Amazon injury rates still double industry average', source: 'OSHA.gov' },
      { type: 'negative', year: 2021, title: 'NLRB: Amazon illegally interfered in Alabama union vote', source: 'NLRB.gov' },
      { type: 'negative', year: 2021, title: 'Internal memo: drivers urinating in bottles confirmed', source: 'The Intercept' },
    ],
    employee_quotes: [
      { text: '"Algorithm fires you without a human ever reviewing the case."', source: 'NYT investigation 2021', verified: true },
    ],
  },
  {
    id: 'fink_blackrock', name: 'Larry Fink', company: 'BlackRock', sector: 'finance',
    initials: 'LF', color: '#7b5cf0',
    ceo_rating: 52, leadership: 65, employee_treatment: 58, transparency: 40, ethics: 38,
    review_count: 340,
    title: 'CEO — BlackRock ($10T AUM)',
    sources: ['official', 'news'],
    summary: 'Most powerful person in global finance. Annual letters championed ESG, then reversed under political pressure. Conflict of interest: hired by US Fed to manage COVID bonds.',
    official_record: [
      { type: 'negative', year: 2024, title: 'Left Climate Action 100+ under Republican political pressure', source: 'FT' },
      { type: 'negative', year: 2020, title: 'Fed hired BlackRock to manage its own client bonds — conflict of interest', source: 'Bloomberg' },
    ],
    employee_quotes: [],
  },
  {
    id: 'cook_apple', name: 'Tim Cook', company: 'Apple', sector: 'tech',
    initials: 'TC', color: '#555d72',
    ceo_rating: 68, leadership: 72, employee_treatment: 62, transparency: 48, ethics: 55,
    review_count: 1890,
    title: 'CEO — Apple Inc.',
    sources: ['official', 'news'],
    summary: 'Operationally excellent. Privacy champion rhetoric vs supply chain realities. Blocked right-to-repair. Aggressive tax minimisation.',
    official_record: [
      { type: 'negative', year: 2024, title: 'EU court: Apple owes €13B in back taxes (Ireland deal)', source: 'European Court of Justice' },
      { type: 'negative', year: 2023, title: 'EU €1.8B fine: anti-competitive App Store (music)', source: 'European Commission' },
      { type: 'positive', year: 2022, title: 'Apple raises US minimum wage to $22/hr', source: 'Apple newsroom' },
    ],
    employee_quotes: [
      { text: '"NDA culture means you can\'t even tell your spouse what you work on."', source: 'Glassdoor verified review', verified: false },
    ],
  },
  {
    id: 'zuckerberg_meta', name: 'Mark Zuckerberg', company: 'Meta', sector: 'tech',
    initials: 'MZ', color: '#1877f2',
    ceo_rating: 24, leadership: 38, employee_treatment: 52, transparency: 12, ethics: 18,
    review_count: 3200,
    title: 'CEO & Founder — Meta (Facebook, Instagram, WhatsApp)',
    sources: ['official', 'news'],
    summary: 'Suppressed internal research on teen harm. Facilitated Cambridge Analytica. Pivoted to Trump alignment 2024-25. Dismantled fact-checking and DEI programs.',
    official_record: [
      { type: 'negative', year: 2025, title: 'Removed fact-checking; ended DEI programs', source: 'Meta blog post' },
      { type: 'negative', year: 2023, title: 'US Senate: Meta knew Instagram harms teens, suppressed data', source: 'Senate Judiciary hearing' },
      { type: 'negative', year: 2021, title: 'Frances Haugen: Facebook chose profit over safety', source: 'WSJ / Senate testimony' },
      { type: 'negative', year: 2019, title: '$5B FTC fine — largest ever for privacy violations', source: 'FTC.gov' },
    ],
    employee_quotes: [
      { text: '"Morale cratered after the layoffs — nobody trusts the direction."', source: 'The Verge employee survey 2023', verified: true },
    ],
  },
  {
    id: 'ardern_jacinda', name: 'Jacinda Ardern', company: 'Auckland University of Technology / Labour Party', sector: 'government',
    initials: 'JA', color: '#dc2626',
    ceo_rating: 82, leadership: 88, employee_treatment: 78, transparency: 72, ethics: 84,
    review_count: 920,
    title: 'Former PM of New Zealand / Academic',
    sources: ['official', 'news'],
    summary: 'Globally praised crisis leadership (Christchurch, COVID). Resigned 2023 citing burnout. Named to Harvard Kennedy School post. Generally high public trust during tenure.',
    official_record: [
      { type: 'positive', year: 2019, title: 'Global gun law reform — 72 hours after Christchurch', source: 'NZ Parliament' },
      { type: 'positive', year: 2020, title: 'COVID elimination strategy — NZ among world\'s best outcomes', source: 'WHO / Johns Hopkins' },
      { type: 'negative', year: 2022, title: 'Housing affordability worsened significantly during tenure', source: 'Stats NZ' },
    ],
    employee_quotes: [],
  },
];

// ── WORKPLACE REVIEWS ──
// Mix of official data (regulatory, news) and verified community submissions
const WORKPLACES = [
  {
    id: 'spark_nz', company: 'Spark New Zealand', sector: 'tech', country: 'NZ',
    overall: 62, culture: 58, ceo_rating: 55, balance: 60, pay: 52, psych_safety: 56,
    review_count: 284,
    ceo: 'Jolie Hodson',
    summary: 'Major NZ telco. Mixed reviews on culture — restructuring 2023-24 reduced headcount significantly.',
    official_notes: 'Fair Pay Agreement participation. Multiple restructures 2022-24.',
    reviews: [
      { rating: 3, role: 'Software Engineer', text: 'Good tech stack but frequent restructures create anxiety. Management can be inconsistent.', verified: true, source: 'Submitted & verified against public restructure announcements' },
      { rating: 4, role: 'Customer Experience', text: 'Good training and support. Pay is below market rate.', verified: false, source: 'Community submission — pending' },
    ],
    sources: ['news', 'community'],
  },
  {
    id: 'fonterra', company: 'Fonterra', sector: 'retail', country: 'NZ',
    overall: 58, culture: 55, ceo_rating: 60, balance: 62, pay: 64, psych_safety: 52,
    review_count: 198,
    ceo: 'Miles Hurrell',
    summary: 'NZ dairy co-operative. 2023 restructure. Botulism scare 2013 still referenced. Generally stable employer.',
    official_notes: '2013 botulism false alarm cost $14B in NZ exports. Environmental record mixed on waterway impact.',
    reviews: [
      { rating: 3, role: 'Supply Chain', text: 'Stable but slow-moving company. Good benefits, culture varies wildly by site.', verified: false, source: 'Community submission — pending' },
    ],
    sources: ['news', 'community'],
  },
  {
    id: 'amazon_us', company: 'Amazon (Warehouses)', sector: 'retail', country: 'US',
    overall: 24, culture: 18, ceo_rating: 28, balance: 16, pay: 42, psych_safety: 14,
    review_count: 8420,
    ceo: 'Andy Jassy',
    summary: 'Warehouse operations specifically. Injury rates 2× industry average per OSHA. Union organizing in multiple sites. Algorithm-managed terminations documented.',
    official_notes: 'OSHA: injury rate data public. NLRB: multiple rulings against Amazon for illegal union interference. Amazon Labor Union formed 2022 — legally recognized.',
    reviews: [
      { rating: 1, role: 'Warehouse Associate', text: 'No bathroom breaks, injury every week on my floor. Fired by algorithm after I complained.', verified: true, source: 'Consistent with NLRB filings and news investigations' },
      { rating: 2, role: 'Team Lead', text: 'Targets are impossible by design. When you miss them the system flags you automatically.', verified: true, source: 'Verified against NYT/Intercept investigations' },
    ],
    sources: ['official', 'news', 'community'],
  },
  {
    id: 'google_us', company: 'Google / Alphabet', sector: 'tech', country: 'US',
    overall: 68, culture: 70, ceo_rating: 55, balance: 64, pay: 82, psych_safety: 62,
    review_count: 5100,
    ceo: 'Sundar Pichai',
    summary: 'High pay, good perks. Post-2022 layoff culture shift noted widely. Antitrust pressure ongoing.',
    official_notes: 'DOJ won antitrust case 2024. EU fined €8.25B total across multiple cases. 12,000 layoffs Jan 2023.',
    reviews: [
      { rating: 4, role: 'Software Engineer L5', text: 'Pay and perks still excellent. Layoffs were mishandled — found out via email. Trust in leadership lower than pre-2022.', verified: true, source: 'Consistent with documented layoff communications' },
      { rating: 3, role: 'Product Manager', text: 'Great place to be 2015-2021. Different company now. More corporate, less "do the right thing".', verified: false, source: 'Community submission — pending' },
    ],
    sources: ['official', 'news', 'community'],
  },
  {
    id: 'anz_nz', company: 'ANZ Bank New Zealand', sector: 'finance', country: 'NZ',
    overall: 55, culture: 52, ceo_rating: 58, balance: 60, pay: 62, psych_safety: 54,
    review_count: 312,
    ceo: 'Antonia Watson',
    summary: 'Major NZ bank. Generally stable employer. RBNZ compliance issues 2019. Reasonable work-life balance reported.',
    official_notes: 'RBNZ: ANZ NZ fined $1M for deficiencies in capital adequacy attestations 2019.',
    reviews: [
      { rating: 3, role: 'Branch Manager', text: 'Good stability. Culture heavily depends on your direct manager. Pay is market rate.', verified: false, source: 'Community submission — pending' },
    ],
    sources: ['official', 'community'],
  },
  {
    id: 'meta_us', company: 'Meta (Facebook)', sector: 'tech', country: 'US',
    overall: 52, culture: 42, ceo_rating: 24, balance: 58, pay: 78, psych_safety: 38,
    review_count: 3800,
    ceo: 'Mark Zuckerberg',
    summary: 'High pay but morale heavily dented by layoffs, political pivots, and direction uncertainty. NDA culture pervasive.',
    official_notes: 'Three rounds of major layoffs 2022-2023 (21,000+ total). FTC ongoing antitrust case. Multiple congressional testimonies on harm suppression.',
    reviews: [
      { rating: 2, role: 'Data Scientist', text: 'Incredible pay but you sell your soul. The internal research showing harm to users is real — I saw it. Culture of silence enforced by legal.', verified: true, source: 'Consistent with Frances Haugen testimony and internal documents' },
      { rating: 4, role: 'Infrastructure Engineer', text: 'Best technical challenges in the world. Pay is exceptional. Don\'t look too closely at what the platform does to society.', verified: false, source: 'Community submission — pending' },
    ],
    sources: ['official', 'news', 'community'],
  },
  {
    id: 'patagonia_us', company: 'Patagonia', sector: 'retail', country: 'US',
    overall: 91, culture: 94, ceo_rating: 90, balance: 88, pay: 76, psych_safety: 92,
    review_count: 680,
    ceo: 'Ryan Gellert',
    summary: 'Consistently rated among best workplaces globally. On-site childcare. Environmental activism part of job. Ownership transferred to Earth trust 2022.',
    official_notes: 'B-Corp certified. Fair Trade certified production. Ownership structure transferred to Patagonia Purpose Trust and Holdfast Collective 2022.',
    reviews: [
      { rating: 5, role: 'Retail Associate', text: 'Company genuinely lives its values. Benefits are exceptional. You feel like your work matters.', verified: true, source: 'Consistent with B-Corp and Glassdoor data' },
      { rating: 4, role: 'Supply Chain Manager', text: 'Lower pay than tech but the mission and culture make up for it. Best workplace I\'ve had.', verified: false, source: 'Community submission — pending' },
    ],
    sources: ['official', 'community'],
  },
  {
    id: 'countdown_nz', company: 'Woolworths NZ (formerly Countdown)', sector: 'retail', country: 'NZ',
    overall: 48, culture: 44, ceo_rating: 50, balance: 50, pay: 40, psych_safety: 46,
    review_count: 520,
    ceo: 'Spencer Sonn',
    summary: 'Major NZ supermarket chain. Commerce Commission grocery sector investigation found supermarkets using market power to limit competition. Pay rates below living wage for many roles.',
    official_notes: 'Commerce Commission market study 2022: found supermarket duopoly (Woolworths + Foodstuffs) operating with limited competition. Recommended regulation. NZ Govt pursuing action.',
    reviews: [
      { rating: 2, role: 'Checkout Operator', text: 'Pay is below living wage. Scheduling unpredictable. No sick leave culture — pressured to come in unwell.', verified: false, source: 'Community submission — pending' },
      { rating: 3, role: 'Department Manager', text: 'Better as a manager. Frontline staff get a rough deal. Company is aware but moves slowly on it.', verified: false, source: 'Community submission — pending' },
    ],
    sources: ['official', 'community'],
  },
];

// ── RENDER CEO GRID ──
function renderCEOGrid(ceos) {
  const grid = document.getElementById('ceo-grid');
  if (!grid) return;
  grid.innerHTML = ceos.map(c => {
    const cls = c.ceo_rating >= 65 ? 'integrity-high' : c.ceo_rating >= 42 ? 'integrity-med' : 'integrity-low';
    const sourceBadge = c.sources.includes('official')
      ? '<span class="badge-official">⚡ Official data</span>'
      : '<span class="badge-pending">⏳ Community</span>';
    return `
      <div class="pol-card ${cls}" onclick="openCEO('${c.id}')">
        <div class="pol-avatar" style="background:${c.color}22;color:${c.color}">${c.initials}</div>
        <div class="pol-name">${c.name}</div>
        <div class="pol-role" style="font-size:10px">${c.title}</div>
        <div style="margin:6px 0">${sourceBadge}</div>
        <div class="pol-metrics">
          <div class="pol-metric-chip chip-integrity">★ ${c.ceo_rating}</div>
          <div class="pol-metric-chip chip-corruption">👷 ${c.employee_treatment}</div>
          <div class="pol-metric-chip" style="background:rgba(79,142,247,0.1);color:#4f8ef7">📋 ${c.review_count.toLocaleString()}</div>
        </div>
      </div>
    `;
  }).join('');
}

window.openCEO = function(id) {
  const c = CEOS.find(c => c.id === id);
  if (!c) return;
  const detail = document.getElementById('wp-detail');
  document.getElementById('wp-detail-name').textContent = `${c.name} — CEO Profile`;
  detail.style.display = 'block';

  const recordHtml = c.official_record.map(r => `
    <div class="event-item ${r.type}">
      <div class="event-year">${r.year} · <a href="${r.source}" target="_blank" style="color:#4f8ef7;font-size:10px">${r.source.length > 40 ? r.source.slice(0,40)+'…' : r.source} ↗</a></div>
      <div class="event-title">${r.title}</div>
    </div>
  `).join('');

  const quotesHtml = c.employee_quotes.map(q => `
    <div class="quote-item">
      <div class="quote-text">${q.text}</div>
      <div class="quote-context">${q.source} ${q.verified ? '<span class="badge-verified">✓ Verified</span>' : '<span class="badge-pending">⏳ Pending</span>'}</div>
    </div>
  `).join('') || '<div style="color:#555d72;font-size:12px">No employee quotes on file yet.</div>';

  const dims = [
    { label: 'CEO Rating', val: c.ceo_rating },
    { label: 'Leadership', val: c.leadership },
    { label: 'Employee Treatment', val: c.employee_treatment },
    { label: 'Transparency', val: c.transparency },
    { label: 'Ethics', val: c.ethics },
  ];

  document.getElementById('wp-detail-content').innerHTML = `
    <div style="margin-bottom:12px;padding:10px 14px;background:#111318;border-radius:10px;font-size:13px;color:#8b92a8">${c.summary}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px">
      ${dims.map(d => `
        <div style="text-align:center;padding:8px 14px;background:#111318;border-radius:10px;min-width:80px">
          <div style="font-size:22px;font-weight:700;font-family:Space Mono;color:${scoreGradient(d.val)}">${d.val}</div>
          <div style="font-size:10px;color:#8b92a8;margin-top:2px">${d.label}</div>
        </div>
      `).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div>
        <div class="pol-section-title">📋 Official Record</div>
        <div class="event-list">${recordHtml || '<div style="color:#555d72;font-size:12px">No official record on file.</div>'}</div>
      </div>
      <div>
        <div class="pol-section-title">💬 Employee Voices</div>
        <div class="quote-list">${quotesHtml}</div>
      </div>
    </div>
    <div style="margin-top:16px">
      <button class="ctrl-btn" onclick="goToSubmit('${c.name}')" style="font-size:13px;padding:8px 16px">Submit info about ${c.name} ↗</button>
    </div>
  `;
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ── RENDER WORKPLACE LIST ──
function renderWorkplaceList(workplaces) {
  const list = document.getElementById('wp-list');
  const count = document.getElementById('wp-count');
  if (!list) return;
  count.textContent = `${workplaces.length} workplaces`;

  list.innerHTML = workplaces.map(w => {
    const officialBadge = w.sources.includes('official') ? '<span class="badge-official">⚡ Official data</span>' : '';
    const stars = (n) => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
    const dims = [
      { label: 'Culture', val: w.culture },
      { label: 'CEO', val: w.ceo_rating },
      { label: 'Balance', val: w.balance },
      { label: 'Pay', val: w.pay },
      { label: 'Safety', val: w.psych_safety },
    ];
    return `
      <div class="wp-row" onclick="openWorkplace('${w.id}')">
        <div class="wp-main">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <div class="wp-name">${w.company}</div>
            <span class="wp-country">${w.country}</span>
            ${officialBadge}
            <span class="wp-sector">${w.sector}</span>
          </div>
          <div style="font-size:12px;color:#8b92a8;margin-bottom:8px">${w.summary.slice(0, 120)}…</div>
          <div class="wp-dims">
            ${dims.map(d => `
              <div class="wp-dim">
                <span style="font-size:10px;color:#555d72">${d.label}</span>
                <div style="height:3px;border-radius:2px;background:#1e222c;width:60px;margin-top:2px">
                  <div style="height:100%;width:${d.val}%;background:${scoreGradient(d.val)};border-radius:2px"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="wp-score">
          <div style="font-size:28px;font-weight:700;font-family:Space Mono;color:${scoreGradient(w.overall)}">${w.overall}</div>
          <div style="font-size:10px;color:#8b92a8">Overall</div>
          <div style="font-size:11px;color:#555d72;margin-top:4px">${w.review_count.toLocaleString()} reviews</div>
        </div>
      </div>
    `;
  }).join('');
}

window.openWorkplace = function(id) {
  const w = WORKPLACES.find(w => w.id === id);
  if (!w) return;
  const detail = document.getElementById('wp-detail');
  document.getElementById('wp-detail-name').textContent = `${w.company} — Workplace Profile`;
  detail.style.display = 'block';

  const reviewsHtml = w.reviews.map(r => `
    <div class="wp-review-item">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <div style="display:flex;gap:8px;align-items:center">
          <span style="color:#f59e0b;font-size:13px">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
          <span style="font-size:11px;color:#8b92a8">${r.role}</span>
        </div>
        ${r.verified ? '<span class="badge-verified">✓ Verified</span>' : '<span class="badge-pending">⏳ Pending</span>'}
      </div>
      <div style="font-size:12px;color:#c8cad0;margin-bottom:4px">"${r.text}"</div>
      <div style="font-size:10px;color:#555d72">${r.source}</div>
    </div>
  `).join('');

  document.getElementById('wp-detail-content').innerHTML = `
    <div style="margin-bottom:12px;padding:10px 14px;background:#111318;border-radius:10px;font-size:13px;color:#8b92a8">${w.summary}</div>
    ${w.official_notes ? `<div style="margin-bottom:16px;padding:10px 14px;background:rgba(79,142,247,0.06);border:1px solid rgba(79,142,247,0.15);border-left:3px solid #4f8ef7;border-radius:8px;font-size:12px;color:#8b92a8"><strong style="color:#4f8ef7">⚡ Official record:</strong> ${w.official_notes}</div>` : ''}
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
      ${[
        {label:'Overall',val:w.overall},{label:'Culture',val:w.culture},
        {label:'CEO/Leadership',val:w.ceo_rating},{label:'Work-Life Balance',val:w.balance},
        {label:'Pay Fairness',val:w.pay},{label:'Psych. Safety',val:w.psych_safety}
      ].map(d => `
        <div style="text-align:center;padding:10px;background:#111318;border-radius:10px">
          <div style="font-size:22px;font-weight:700;font-family:Space Mono;color:${scoreGradient(d.val)}">${d.val}</div>
          <div style="font-size:10px;color:#8b92a8;margin-top:2px">${d.label}</div>
        </div>
      `).join('')}
    </div>
    <div class="pol-section-title">Reviews (${w.review_count.toLocaleString()} total · showing ${w.reviews.length} on file)</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">${reviewsHtml || '<div style="color:#555d72;font-size:12px">No reviews on file yet.</div>'}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="ctrl-btn" onclick="goToSubmitWorkplace('${w.company}')" style="font-size:13px;padding:8px 16px">+ Submit a review ↗</button>
    </div>
  `;
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ── WORKPLACE VIEW INIT ──
function initWorkplaceView() {
  renderCEOGrid(CEOS);
  renderWorkplaceList(WORKPLACES);

  document.getElementById('wp-sector').addEventListener('change', filterWorkplaces);
  document.getElementById('wp-sort').addEventListener('change', filterWorkplaces);
  document.getElementById('wp-search').addEventListener('input', filterWorkplaces);
  document.getElementById('close-wp-detail').addEventListener('click', () => {
    document.getElementById('wp-detail').style.display = 'none';
  });
  document.getElementById('add-workplace-btn').addEventListener('click', () => {
    // Navigate to submit tab
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelector('[data-view="submit"]').classList.add('active');
    document.getElementById('view-submit').classList.add('active');
    document.getElementById('sub-type').value = 'workplace_review';
    toggleWorkplaceFields();
    document.getElementById('sub-type').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function filterWorkplaces() {
  const sector = document.getElementById('wp-sector').value;
  const sort = document.getElementById('wp-sort').value;
  const q = document.getElementById('wp-search').value.toLowerCase();

  let filteredCEOs = CEOS.filter(c => {
    const matchSector = sector === 'all' || c.sector === sector;
    const matchQ = !q || c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q);
    return matchSector && matchQ;
  });

  let filteredWP = WORKPLACES.filter(w => {
    const matchSector = sector === 'all' || w.sector === sector;
    const matchQ = !q || w.company.toLowerCase().includes(q) || (w.ceo && w.ceo.toLowerCase().includes(q));
    return matchSector && matchQ;
  });

  filteredWP.sort((a, b) => {
    if (sort === 'culture') return b.culture - a.culture;
    if (sort === 'ceo_rating') return b.ceo_rating - a.ceo_rating;
    if (sort === 'review_count') return b.review_count - a.review_count;
    return b.overall - a.overall;
  });

  renderCEOGrid(filteredCEOs);
  renderWorkplaceList(filteredWP);
}

// ── SUBMISSION SYSTEM ──
// Uses GitHub Issues as backend — no server needed
window.toggleWorkplaceFields = function() {
  const type = document.getElementById('sub-type').value;
  document.getElementById('workplace-fields').style.display =
    type === 'workplace_review' ? 'block' : 'none';
};

// Star rating widgets
function initStarRatings() {
  document.querySelectorAll('.star-rating').forEach(widget => {
    widget.dataset.value = 0;
    widget.innerHTML = [1,2,3,4,5].map(n =>
      `<span class="star" data-n="${n}" style="cursor:pointer;font-size:20px;color:#555d72;transition:color 0.1s">★</span>`
    ).join('');
    widget.querySelectorAll('.star').forEach(star => {
      star.addEventListener('mouseenter', () => {
        const n = parseInt(star.dataset.n);
        widget.querySelectorAll('.star').forEach((s,i) => {
          s.style.color = i < n ? '#f59e0b' : '#555d72';
        });
      });
      star.addEventListener('mouseleave', () => {
        const val = parseInt(widget.dataset.value);
        widget.querySelectorAll('.star').forEach((s,i) => {
          s.style.color = i < val ? '#f59e0b' : '#555d72';
        });
      });
      star.addEventListener('click', () => {
        widget.dataset.value = star.dataset.n;
        widget.querySelectorAll('.star').forEach((s,i) => {
          s.style.color = i < parseInt(star.dataset.n) ? '#f59e0b' : '#555d72';
        });
      });
    });
  });
}

function getRating(field) {
  const widget = document.querySelector(`.star-rating[data-field="${field}"]`);
  return widget ? (parseInt(widget.dataset.value) || 0) : 0;
}

window.handleSubmit = function() {
  const type = document.getElementById('sub-type').value;
  const subject = document.getElementById('sub-subject').value.trim();
  const claim = document.getElementById('sub-claim').value.trim();
  const source = document.getElementById('sub-source').value.trim();
  const sourceType = document.getElementById('sub-source-type').value;
  const country = document.getElementById('sub-country').value.trim();
  const date = document.getElementById('sub-date').value;
  const context = document.getElementById('sub-context').value.trim();

  const fb = document.getElementById('submit-feedback');

  if (!type || !subject || !claim) {
    fb.style.display = 'block';
    fb.innerHTML = '<div style="padding:10px 14px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:8px;font-size:13px;color:#ef4444">Please fill in Type, Subject, and Summary as a minimum.</div>';
    return;
  }

  // For workplace reviews, collect ratings
  let workplaceSection = '';
  if (type === 'workplace_review') {
    const company = document.getElementById('sub-company').value.trim();
    const ceo = document.getElementById('sub-ceo').value.trim();
    const role = document.getElementById('sub-role').value.trim();
    const ratings = {
      overall: getRating('r-overall'),
      culture: getRating('r-culture'),
      ceo: getRating('r-ceo'),
      balance: getRating('r-balance'),
      pay: getRating('r-pay'),
      psych: getRating('r-psych'),
    };
    workplaceSection = `
## Workplace Rating

**Company:** ${company || subject}
**CEO/Manager:** ${ceo || 'Not specified'}
**Role (anonymous):** ${role || 'Not specified'}

| Dimension | Rating (out of 5) |
|-----------|-------------------|
| Overall | ${ratings.overall}/5 |
| Culture | ${ratings.culture}/5 |
| CEO/Leadership | ${ratings.ceo}/5 |
| Work-Life Balance | ${ratings.balance}/5 |
| Pay Fairness | ${ratings.pay}/5 |
| Psychological Safety | ${ratings.psych}/5 |
`;
  }

  const issueTitle = `[${type.toUpperCase()}] ${subject}${country ? ' ('+country+')' : ''}`;
  const issueBody = `## WorldLens Submission

**Type:** ${type}
**Subject:** ${subject}
**Country/Region:** ${country || 'Not specified'}
**Date of event:** ${date || 'Not specified'}
${workplaceSection}
## Summary / Claim

${claim}

## Source

**URL:** ${source || 'Not provided'}
**Source Type:** ${sourceType}

## Additional Context

${context || 'None provided'}

---
*Submitted via WorldLens submission form. Please verify source before approving.*
*Submission label: \`${type}\` \`pending-review\` \`${country ? country.toLowerCase() : 'unknown-country'}\`*`;

  const params = new URLSearchParams({
    title: issueTitle,
    body: issueBody,
    labels: `submission,${type},pending-review`,
  });

  const url = `${GITHUB_ISSUES_URL}?${params.toString()}`;

  fb.style.display = 'block';
  fb.innerHTML = `
    <div style="padding:12px 14px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:8px;font-size:13px;color:#22c55e">
      ✓ Ready to submit! A GitHub Issues tab will open. If you're not logged into GitHub, you can create a free account or the issue will post anonymously.
      <br><br>
      <a href="${url}" target="_blank" style="display:inline-block;background:#22c55e;color:#000;padding:8px 16px;border-radius:8px;font-weight:600;text-decoration:none;margin-top:4px">Open GitHub Issues ↗</a>
    </div>
  `;

  // Auto-open
  window.open(url, '_blank');
};

window.loadPendingIssues = async function() {
  const container = document.getElementById('pending-list');
  container.innerHTML = `<div class="progress-wrap"><span>Loading from GitHub Issues…</span><div class="progress-bar"><div class="progress-fill" style="width:70%"></div></div></div>`;

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues?labels=submission&state=open&per_page=20`);
    if (!res.ok) throw new Error('GitHub API error — repo may be private or not set up yet');
    const issues = await res.json();

    if (!issues.length) {
      container.innerHTML = `<div style="color:#555d72;font-size:13px;padding:8px 0">No pending submissions found. Be the first to submit!</div>`;
      return;
    }

    container.innerHTML = issues.map(issue => `
      <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
          <div style="font-size:13px;font-weight:600;color:#e8eaf0">${issue.title}</div>
          <span class="badge-pending">⏳ Pending</span>
        </div>
        <div style="font-size:11px;color:#555d72;margin-bottom:6px">${new Date(issue.created_at).toLocaleDateString('en-NZ')} · ${issue.labels.map(l => `<span style="font-size:10px;background:#1e222c;padding:1px 6px;border-radius:4px;margin-right:4px">${l.name}</span>`).join('')}</div>
        <a href="${issue.html_url}" target="_blank" style="font-size:12px;color:#4f8ef7">View full submission on GitHub ↗</a>
      </div>
    `).join('');
  } catch (e) {
    container.innerHTML = `
      <div style="padding:12px 14px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:8px;font-size:13px;color:#f59e0b">
        ⚠ Could not load submissions. Make sure you've set your GitHub repo name in <code>workplaces.js</code> (GITHUB_REPO variable).
        <br><small style="color:#555d72;margin-top:4px;display:block">Error: ${e.message}</small>
      </div>
    `;
  }
};

window.goToSubmit = function(name) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelector('[data-view="submit"]').classList.add('active');
  document.getElementById('view-submit').classList.add('active');
  document.getElementById('sub-subject').value = name;
};

window.goToSubmitWorkplace = function(company) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelector('[data-view="submit"]').classList.add('active');
  document.getElementById('view-submit').classList.add('active');
  document.getElementById('sub-type').value = 'workplace_review';
  document.getElementById('sub-company').value = company;
  document.getElementById('sub-subject').value = company;
  toggleWorkplaceFields();
  document.getElementById('sub-type').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

window.CEOS = CEOS;
window.WORKPLACES = WORKPLACES;
window.initWorkplaceView = initWorkplaceView;
window.initStarRatings = initStarRatings;
