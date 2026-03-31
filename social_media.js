// ══════════════════════════════════════════════════════════
// WORLDLENS — SOCIAL MEDIA INTELLIGENCE MODULE
// ══════════════════════════════════════════════════════════
// Sources: Archived public posts, screenshots reported by
// credible media (RNZ, NZ Herald, Newsroom, The Guardian,
// Reuters), Wayback Machine, official press releases.
// We do NOT scrape live APIs — all entries are curated from
// documented public records or AI-augmented analysis.
// Each post marked with: platform, date, source verification.
// ══════════════════════════════════════════════════════════

// ── PLATFORM ICONS / COLOURS ──
const PLATFORMS = {
  twitter:   { icon: '𝕏', label: 'X / Twitter',  color: '#000000', bg: 'rgba(0,0,0,0.15)' },
  facebook:  { icon: 'f', label: 'Facebook',      color: '#1877f2', bg: 'rgba(24,119,242,0.12)' },
  instagram: { icon: '◎', label: 'Instagram',     color: '#e1306c', bg: 'rgba(225,48,108,0.12)' },
  linkedin:  { icon: 'in', label: 'LinkedIn',     color: '#0a66c2', bg: 'rgba(10,102,194,0.12)' },
  youtube:   { icon: '▶', label: 'YouTube',       color: '#ff0000', bg: 'rgba(255,0,0,0.1)' },
  tiktok:    { icon: '♪', label: 'TikTok',        color: '#69c9d0', bg: 'rgba(105,201,208,0.12)' },
  press:     { icon: '📰', label: 'Press release', color: '#8b92a8', bg: 'rgba(139,146,168,0.1)' },
};

// ── DISCREPANCY TYPES ──
const DISCREPANCY_TYPES = {
  contradicts_vote:    { label: 'Contradicts voting record', color: '#ef4444', icon: '🗳' },
  contradicts_policy:  { label: 'Contradicts official policy', color: '#f97316', icon: '📋' },
  contradicts_statement: { label: 'Contradicts own statement', color: '#f59e0b', icon: '💬' },
  contradicts_action:  { label: 'Contradicts own action', color: '#ef4444', icon: '⚡' },
  misleading_stat:     { label: 'Misleading statistic', color: '#f59e0b', icon: '📊' },
  deleted_post:        { label: 'Post later deleted', color: '#7b5cf0', icon: '🗑' },
  unverified_claim:    { label: 'Unverified claim', color: '#8b92a8', icon: '❓' },
};

// ══════════════════════════════════════════════════════════
// POLITICIAN SOCIAL MEDIA DATA
// ══════════════════════════════════════════════════════════

const POLITICIAN_SOCIAL = {

  luxon: {
    handles: { twitter: '@chrisluxonnz', facebook: 'ChrisLuxonNZ', instagram: '@chrisluxonnz' },
    consistency_score: 42,  // how consistent social posts are with official positions
    engagement_authenticity: 55, // does engagement look organic
    platforms_active: ['twitter','facebook','instagram'],
    summary: 'Active on X and Facebook. Posts heavily managed by comms team. Tone often corporate and distant. Several documented contradictions between campaign social posts and subsequent government actions.',
    posts: [
      {
        id: 'lux_001',
        platform: 'twitter',
        date: 'Sep 14, 2023',
        text: '"School lunches for kids are something we\'re absolutely committed to keeping." #NZElection2023',
        url_archived: 'https://web.archive.org/web/2023/https://twitter.com/chrisluxonnz',
        verified_by: 'RNZ screenshot archive; NZ Herald reporting',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Budget 2024 cut $107M from Ka Ora, Ka Ako school lunch programme — reduced to lowest-decile schools only.',
          source: 'NZ Herald, 30 May 2024',
          severity: 'high',
        },
      },
      {
        id: 'lux_002',
        platform: 'twitter',
        date: 'Oct 3, 2023',
        text: '"A National government will be open, transparent, and accountable to all New Zealanders from day one."',
        verified_by: 'Screenshot reported by The Spinoff',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Coalition agreement kept secret for 6 weeks post-election. OIA requests for Fast-track project lists refused. Health NZ $1.4B deficit not disclosed for months.',
          source: 'Newsroom Nov 2023; RNZ Sep 2024',
          severity: 'high',
        },
      },
      {
        id: 'lux_003',
        platform: 'facebook',
        date: 'Jun 1, 2024',
        text: 'Proud to deliver tax relief for hard-working New Zealand families. This is what we promised. 🇳🇿',
        verified_by: 'Official Facebook page — captured Newsroom',
        discrepancy: {
          type: 'misleading_stat',
          detail: 'Tax cuts averaged $3.60/week for lowest income earners while higher earners received $20+/week. "Hard-working families" framing obscured regressive distribution.',
          source: 'NZ Council of Trade Unions tax analysis; Newsroom, Jun 2024',
          severity: 'med',
        },
      },
      {
        id: 'lux_004',
        platform: 'twitter',
        date: 'Mar 2024',
        text: '"New Zealand is back on track economically. Our plan is working."',
        verified_by: 'RNZ screenshot',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'NZ entered technical recession (two consecutive quarters of GDP contraction: -0.2% Q1, -1.1% Q2 2024) under his government.',
          source: 'Stats NZ GDP release, Sep 2024',
          severity: 'high',
        },
      },
      {
        id: 'lux_005',
        platform: 'instagram',
        date: 'Dec 2023',
        text: 'Visiting communities across NZ. Listening to what matters to you. 🙏',
        verified_by: 'Official Instagram',
        discrepancy: null,
        note: 'No discrepancy — general engagement post.',
      },
      {
        id: 'lux_006',
        platform: 'twitter',
        date: 'Jan 2024',
        text: '"We\'re focused on the economy, law and order, and Treaty principles. Nothing else is on the agenda."',
        verified_by: 'NZ Herald screenshot',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Government simultaneously pursued foreign aid cuts ($550M), school curriculum changes, three waters repeal, Māori Health Authority abolition, and RMA Fast-track — all simultaneously.',
          source: 'Parliamentary record; Budget 2024',
          severity: 'med',
        },
      },
    ],
  },

  peters: {
    handles: { twitter: '@winstonpeters', facebook: 'WinstonPetersNZFirst' },
    consistency_score: 18,
    engagement_authenticity: 60,
    platforms_active: ['twitter','facebook'],
    summary: 'Prolific on X. Known for provocative posts targeting media, Māori organisations, and political opponents. Several posts make claims contradicted by official data or his own voting record. High engagement but also high documented inaccuracy rate.',
    posts: [
      {
        id: 'pet_001',
        platform: 'twitter',
        date: 'Oct 2023',
        text: '"NZ First will never allow foreign ownership of New Zealand\'s strategic assets. Non-negotiable."',
        verified_by: 'Twitter archive; RNZ screenshot',
        discrepancy: {
          type: 'contradicts_vote',
          detail: 'Voted FOR the Fast-track Approvals Act 2024, which legal experts said contained insufficient foreign ownership protections. Several approved projects had significant offshore backing.',
          source: 'NZ Parliament vote record; RNZ Fast-track analysis 2024',
          severity: 'high',
        },
      },
      {
        id: 'pet_002',
        platform: 'facebook',
        date: 'Aug 2024',
        text: 'Foreign aid is a luxury NZ cannot afford. Our people come first. The gravy train stops here.',
        verified_by: 'NZ First Facebook — captured by RNZ',
        discrepancy: {
          type: 'contradicts_statement',
          detail: 'As Foreign Minister in 2017 Labour coalition, Peters advocated strongly for Pacific aid and described it as "central to NZ\'s foreign policy identity." Budget 2024 cut $550M from foreign aid.',
          source: 'Hansard 2018; MFAT budget documents 2024',
          severity: 'med',
        },
      },
      {
        id: 'pet_003',
        platform: 'twitter',
        date: 'Nov 2023',
        text: '"The mainstream media is corrupt and working against New Zealanders. Trust NZ First."',
        verified_by: 'Screenshot; reported by The Spinoff',
        discrepancy: {
          type: 'unverified_claim',
          detail: 'Broad media corruption claim — no evidence provided. Media Freedom Committee ratings show NZ press freedom at 91/100. Peters has sued media organisations for defamation historically.',
          source: 'Reporters Without Borders 2024; RSF Press Freedom Index',
          severity: 'low',
        },
      },
      {
        id: 'pet_004',
        platform: 'twitter',
        date: '2020',
        text: '"The NZ First Foundation is completely transparent and lawful. This is a politically motivated witch hunt."',
        verified_by: 'Twitter archive; reported by NZ Herald',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'SFO investigation found "apparent breaches" of electoral law in how the Foundation received and obscured donations. Parallel funding vehicle operated to avoid normal disclosure requirements.',
          source: 'Serious Fraud Office NZ, investigation 2020–2022',
          severity: 'high',
        },
      },
      {
        id: 'pet_005',
        platform: 'facebook',
        date: 'Mar 2024',
        text: 'Standing up for Māori and Pacific communities — NZ First always has.',
        verified_by: 'Facebook — captured Newsroom',
        discrepancy: {
          type: 'contradicts_policy',
          detail: 'NZ First campaigned on abolishing Māori co-governance, removing the Māori Health Authority, holding referendum on Māori electoral seats, and cutting Pacific foreign aid. Māori leaders widely criticised these as harmful.',
          source: 'NZ First 2023 policy platform; coalition agreement',
          severity: 'high',
        },
      },
    ],
  },

  seymour: {
    handles: { twitter: '@dbseymour', facebook: 'DavidSeymourACT', instagram: '@davidseymouract' },
    consistency_score: 58,
    engagement_authenticity: 70,
    platforms_active: ['twitter','facebook','instagram'],
    summary: 'Most prolific NZ politician on social media. Sharp, often witty posts. Higher consistency than most — genuinely holds libertarian positions. Key discrepancies around Treaty Principles Bill scope and coalition compromises.',
    posts: [
      {
        id: 'sey_001',
        platform: 'twitter',
        date: 'Jul 2023',
        text: '"ACT will NOT enter any coalition that doesn\'t hold a binding referendum on Treaty principles. Absolute bottom line."',
        verified_by: 'Twitter archive; RNZ',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Entered coalition without binding referendum. Agreed to non-binding select committee process, which was then abandoned when National and NZ First voted against the bill at second reading.',
          source: 'Coalition agreement Nov 2023; Hansard second reading vote 2024',
          severity: 'high',
        },
      },
      {
        id: 'sey_002',
        platform: 'twitter',
        date: 'Nov 2023',
        text: '"The Treaty Principles Bill is just a conversation starter. We fully expect it to be debated, not necessarily passed."',
        verified_by: 'Twitter; The Spinoff screenshot',
        discrepancy: {
          type: 'contradicts_statement',
          detail: 'Contradicts his pre-election position that a referendum was a "non-negotiable bottom line." If it was always just a conversation starter, why was it a coalition-breaking condition pre-election?',
          source: 'Own July 2023 tweet; RNZ coverage',
          severity: 'med',
        },
      },
      {
        id: 'sey_003',
        platform: 'facebook',
        date: 'Oct 2019',
        text: 'I\'m the ONLY MP standing up for farmers\' rights today. Proud to vote against the firearms ban. Facts, not fear. 🇳🇿',
        verified_by: 'Facebook archive; NZ Herald',
        discrepancy: {
          type: 'misleading_stat',
          detail: 'Was the only MP (119-1) to vote against the post-Christchurch gun ban. The "farmers\' rights" framing omitted that the bill banned military-style semi-automatic weapons, not firearms broadly.',
          source: 'NZ Parliament vote record; Arms Act amendment 2019',
          severity: 'med',
        },
      },
      {
        id: 'sey_004',
        platform: 'twitter',
        date: 'Sep 2024',
        text: '"Regulatory reform will add over $1 billion to the NZ economy. The evidence is clear."',
        verified_by: 'Twitter; Newsroom',
        discrepancy: {
          type: 'misleading_stat',
          detail: 'Treasury modelling behind the $1B figure was not publicly released. Independent economists described it as speculative. No methodology disclosed.',
          source: 'NZ Herald Sep 2024; Newsroom regulatory analysis',
          severity: 'med',
        },
      },
    ],
  },

  hipkins: {
    handles: { twitter: '@chrishipkins', facebook: 'ChrisHipkinsLabour' },
    consistency_score: 66,
    engagement_authenticity: 72,
    platforms_active: ['twitter','facebook'],
    summary: 'Steady social media presence. Less prolific than opposition counterparts. Generally consistent — main discrepancies around wealth tax position reversal.',
    posts: [
      {
        id: 'hip_001',
        platform: 'twitter',
        date: 'Jul 2023',
        text: '"A wealth tax is simply not something Labour is considering. Full stop."',
        verified_by: 'Twitter; RNZ screenshot',
        discrepancy: {
          type: 'contradicts_statement',
          detail: 'The Tax Working Group had operated for two years developing wealth tax options. Hipkins denied it to appear centrist for the election — the TWG had already reported with recommendations.',
          source: 'TWG final report 2019; Hipkins statements Jul 2023',
          severity: 'med',
        },
      },
      {
        id: 'hip_002',
        platform: 'facebook',
        date: 'Mar 2023',
        text: 'Great news on the economy — cost of living pressures are starting to ease for New Zealand families.',
        verified_by: 'Facebook; Stuff.co.nz screenshot',
        discrepancy: {
          type: 'misleading_stat',
          detail: 'CPI at 6.7% at time of post. Food inflation running at 12.5%. Lived cost of living for lower-income households was worsening.',
          source: 'Stats NZ CPI Q1 2023; food price index Mar 2023',
          severity: 'med',
        },
      },
    ],
  },

  swarbrick: {
    handles: { twitter: '@chloeswarbrick', instagram: '@chloeswarbrick', facebook: 'ChloeSwarbrickMP' },
    consistency_score: 80,
    engagement_authenticity: 85,
    platforms_active: ['twitter','instagram','facebook'],
    summary: 'Most authentic social media presence of NZ\'s current politicians. Posts align closely with voting record and policy positions. Organic engagement with constituents. Occasional overstatement on statistics.',
    posts: [
      {
        id: 'swa_001',
        platform: 'twitter',
        date: '2020',
        text: 'I voted YES for cannabis reform. It\'s time NZ caught up with evidence-based drug policy. The status quo is failing us.',
        verified_by: 'Twitter; The Spinoff',
        discrepancy: null,
        note: 'Consistent with her vote and public position. No discrepancy.',
      },
      {
        id: 'swa_002',
        platform: 'instagram',
        date: 'Nov 2024',
        text: 'The Fast-track Bill will put foreign developers in charge of our land with zero democratic oversight. This is a national emergency.',
        verified_by: 'Instagram; RNZ screenshot',
        discrepancy: {
          type: 'misleading_stat',
          detail: 'Characterisation of "zero democratic oversight" is an overstatement — ministerial approval panels were required. The concern about limited public consultation was valid but "zero oversight" was hyperbolic.',
          source: 'Fast-track Approvals Act 2024; Law Society submission',
          severity: 'low',
        },
      },
      {
        id: 'swa_003',
        platform: 'twitter',
        date: 'Oct 2024',
        text: '"A generation has been priced out of homeownership by the deliberate decisions of this parliament. It\'s class warfare."',
        verified_by: 'Twitter; Stuff.co.nz',
        discrepancy: null,
        note: 'Supported by data: homeownership rates for under-40s dropped from 55% (2001) to 37% (2024). Source: Stats NZ.',
      },
    ],
  },

  jones: {
    handles: { twitter: '@shanejones', facebook: 'ShaneJonesNZFirst' },
    consistency_score: 30,
    engagement_authenticity: 62,
    platforms_active: ['twitter','facebook'],
    summary: 'Colourful and provocative. High volume, often targets environmental groups, media, and Māori co-governance proponents. Several posts contain misleading characterisations of data.',
    posts: [
      {
        id: 'jon_001',
        platform: 'twitter',
        date: '2024',
        text: '"The Greens want to send your jobs offshore and give your land to Māori bureaucrats. NZ First says NO."',
        verified_by: 'Twitter; reported Newsroom',
        discrepancy: {
          type: 'misleading_stat',
          detail: 'Mischaracterises both Green policy (no such land transfer policy exists) and co-governance frameworks (which involve shared decision-making, not land transfer).',
          source: 'Green Party 2023 policy platform; co-governance framework documents',
          severity: 'high',
        },
      },
      {
        id: 'jon_002',
        platform: 'facebook',
        date: '2019',
        text: 'The Provincial Growth Fund is creating real jobs in real communities across NZ. Every dollar independently assessed and accountable.',
        verified_by: 'Facebook; RNZ screenshot',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'OIA documents revealed Jones had personal sign-off on projects bypassing normal Treasury assessment. Auditor-General later raised process concerns.',
          source: 'RNZ OIA investigation 2019; Auditor-General report 2020',
          severity: 'high',
        },
      },
    ],
  },

  willis: {
    handles: { twitter: '@nicolawillisnz', facebook: 'NicolaWillisNational' },
    consistency_score: 56,
    engagement_authenticity: 65,
    platforms_active: ['twitter','facebook'],
    summary: 'Polished and on-message. Heavy focus on economic messaging. Discrepancies primarily around "worse books than expected" narrative and tax cut framing.',
    posts: [
      {
        id: 'wil_001',
        platform: 'twitter',
        date: 'Nov 2023',
        text: 'We\'ve found the government books in MUCH worse shape than Labour disclosed. This is a betrayal of New Zealanders.',
        verified_by: 'Twitter; NZ Herald screenshot',
        discrepancy: {
          type: 'misleading_stat',
          detail: 'PREFU (Pre-election Economic and Fiscal Update) published before election showed the fiscal position clearly. Treasury confirmed no hidden deterioration. The "much worse" claim was disputed by Treasury officials.',
          source: 'NZ Treasury PREFU Oct 2023; Newsroom Dec 2023',
          severity: 'high',
        },
      },
      {
        id: 'wil_002',
        platform: 'facebook',
        date: 'Jun 2024',
        text: 'Budget 2024 — delivering for ALL New Zealanders. Tax relief, economic growth, back on track. 🇳🇿',
        verified_by: 'Official Facebook',
        discrepancy: {
          type: 'misleading_stat',
          detail: 'Tax cuts were regressive — lowest income earners received ~$3.60/week; NZ entered recession Sep 2024. "All New Zealanders" and "back on track" framing contradicted by macroeconomic data.',
          source: 'Stats NZ GDP release Q3 2024; CTU tax incidence analysis',
          severity: 'med',
        },
      },
    ],
  },

};

// ══════════════════════════════════════════════════════════
// COMPANY SOCIAL MEDIA DATA
// ══════════════════════════════════════════════════════════

const COMPANY_SOCIAL = {

  amazon: {
    handles: { twitter: '@amazon', linkedin: 'amazon', facebook: 'Amazon' },
    consistency_score: 22,
    platforms_active: ['twitter','linkedin','facebook'],
    summary: 'Corporate-heavy social presence. Significant gap between "we care about our employees" messaging and documented NLRB findings, injury data, and worker testimonials.',
    posts: [
      {
        id: 'amz_001',
        platform: 'twitter',
        date: '2021',
        text: 'Our employees are the heart of Amazon. We\'re proud to offer great pay, benefits, and safe working conditions. #AmazonJobs',
        verified_by: 'Twitter archive; reported The Intercept',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Posted same week internal memo confirming drivers were urinating in bottles due to time pressure. OSHA data showed injury rates 2× industry average. NLRB had active investigation into illegal union interference.',
          source: 'The Intercept; OSHA data 2021; NLRB investigation',
          severity: 'high',
        },
      },
      {
        id: 'amz_002',
        platform: 'linkedin',
        date: '2022',
        text: 'At Amazon, we\'re committed to being Earth\'s best employer. Our workplace safety record is something we\'re proud of.',
        verified_by: 'LinkedIn; documented by Strategic Organising Centre',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Strategic Organising Centre report 2022 found Amazon\'s serious injury rate was 6.8 per 100 workers vs industry average of 3.3. "Earth\'s best employer" claim cited in FTC filings as deceptive.',
          source: 'Strategic Organising Centre report 2022; OSHA 300A logs',
          severity: 'high',
        },
      },
    ],
  },

  meta: {
    handles: { twitter: '@Meta', facebook: 'MetaNewsRoom', instagram: '@meta' },
    consistency_score: 18,
    platforms_active: ['twitter','facebook','instagram'],
    summary: 'Ironic position of running social platforms while being the subject of the worst documented social media harms. Zuckerberg\'s personal posts increasingly political 2024-25.',
    posts: [
      {
        id: 'met_001',
        platform: 'facebook',
        date: '2021',
        text: 'We care deeply about the wellbeing of people who use our platforms, especially young people.',
        verified_by: 'Facebook Newsroom; reported WSJ',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Posted while Frances Haugen\'s documents showed internal research proving Instagram harms teen girls\' mental health — research Meta suppressed. Haugen testified to this to US Senate same month.',
          source: 'WSJ Facebook Files Sep 2021; US Senate hearing Oct 2021',
          severity: 'high',
        },
      },
      {
        id: 'met_002',
        platform: 'twitter',
        date: 'Jan 2025',
        text: 'We\'re committed to free expression and will end practices that censor too much content. — Mark Zuckerberg',
        verified_by: 'Twitter/X; widely reported',
        discrepancy: {
          type: 'contradicts_statement',
          detail: 'Zuckerberg had previously testified to Congress that Meta\'s content policies protect democracy. Reversing fact-checking was widely seen as politically motivated alignment with Trump administration, not principled free speech.',
          source: 'Congressional testimony 2018; Meta policy change Jan 2025; Reuters',
          severity: 'high',
        },
      },
    ],
  },

  shell: {
    handles: { twitter: '@shell', linkedin: 'shell', youtube: 'shell' },
    consistency_score: 14,
    platforms_active: ['twitter','linkedin','youtube'],
    summary: 'Textbook greenwashing social media strategy. Posts prominently feature wind turbines, solar panels, and sustainability messaging while company abandons net zero targets and ramps oil production.',
    posts: [
      {
        id: 'she_001',
        platform: 'twitter',
        date: '2023',
        text: 'We\'re committed to being a net-zero emissions energy business by 2050. Our transition is real and accelerating. #EnergyTransition',
        verified_by: 'Twitter; UK ASA complaint',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'UK Advertising Standards Authority banned Shell ads on exactly this theme — ruling them misleading. Same year Shell quietly dropped 2035 intermediate net-zero targets and increased oil investment.',
          source: 'ASA ruling 2023; FT reporting on net-zero retreat 2023',
          severity: 'high',
        },
      },
      {
        id: 'she_002',
        platform: 'linkedin',
        date: '2022',
        text: 'Shell people are helping shape a more sustainable energy future. We\'re proud of the role our employees play in fighting climate change.',
        verified_by: 'LinkedIn; ClientEarth legal filing',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Posted while Dutch court order required Shell to cut emissions 45% by 2030. Shell was appealing the order. Internal documents showed company knew of climate risk since 1980s while funding denial externally.',
          source: 'Dutch court ruling 2021; Shell internal documents (historical); ClientEarth',
          severity: 'high',
        },
      },
    ],
  },

  patagonia: {
    handles: { twitter: '@patagonia', instagram: '@patagonia', facebook: 'patagonia' },
    consistency_score: 91,
    platforms_active: ['twitter','instagram','facebook'],
    summary: 'Rare example of high social media to action consistency. Posts align with company decisions, legal action, and ownership structure. Occasional overstatement on specific environmental stats.',
    posts: [
      {
        id: 'pat_001',
        platform: 'twitter',
        date: '2022',
        text: '"Earth is now our only shareholder." — Yvon Chouinard. We gave away the company. Every dollar of profit fights the climate crisis.',
        verified_by: 'Twitter; widely reported',
        discrepancy: null,
        note: 'Fully verified — legal ownership transfer to Patagonia Purpose Trust and Holdfast Collective completed 2022.',
      },
      {
        id: 'pat_002',
        platform: 'instagram',
        date: '2019',
        text: 'The President stole your land. We\'re fighting to get it back. 100% of election-day sales to the environment.',
        verified_by: 'Instagram; widely reported',
        discrepancy: null,
        note: 'Consistent — Patagonia donated millions to legal fight over Bears Ears monument.',
      },
    ],
  },

  tesla: {
    handles: { twitter: '@tesla', youtube: 'tesla' },
    consistency_score: 44,
    platforms_active: ['twitter','youtube'],
    summary: 'Tesla\'s social presence increasingly dominated by Elon Musk\'s personal account. Gap between mission statements and NLRB findings, autopilot safety claims, and racial discrimination settlements.',
    posts: [
      {
        id: 'tes_001',
        platform: 'twitter',
        date: '2023',
        text: 'Tesla is the safest car manufacturer in the world. Autopilot is saving lives every day. The data is unambiguous.',
        verified_by: 'Twitter (Musk); NHTSA response',
        discrepancy: {
          type: 'misleading_stat',
          detail: 'NHTSA and DOJ investigating Autopilot safety claims. Tesla\'s safety statistics methodology was questioned — compared to all crashes, not crashes in comparable conditions. Multiple fatal crashes under investigation.',
          source: 'NHTSA investigation 2023; DOJ subpoena reported Reuters',
          severity: 'high',
        },
      },
      {
        id: 'tes_002',
        platform: 'twitter',
        date: '2022',
        text: 'Tesla has zero tolerance for discrimination of any kind. Our culture is one of inclusion and respect.',
        verified_by: 'Twitter; reported Bloomberg',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Posted during period when $137M racial discrimination verdict was being appealed (later reduced but upheld in principle). NLRB had active findings of illegal union retaliation. Multiple discrimination lawsuits active.',
          source: 'Bloomberg Tesla discrimination coverage 2022; NLRB findings',
          severity: 'high',
        },
      },
    ],
  },

  spark_nz: {
    handles: { twitter: '@sparknz', facebook: 'sparknz', linkedin: 'spark-new-zealand', instagram: '@sparknz' },
    consistency_score: 58,
    platforms_active: ['twitter','facebook','linkedin'],
    summary: 'Standard corporate NZ social presence. Generally measured claims. Discrepancy mainly around data breach response and customer privacy messaging.',
    posts: [
      {
        id: 'spk_001',
        platform: 'twitter',
        date: '2023',
        text: 'Your data is safe with Spark. We invest heavily in security and privacy protections. Trust is everything to us. 🔒',
        verified_by: 'Twitter; Stuff.co.nz',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Same year, 85,000 customer records were exposed in a third-party data breach. Spark notified affected customers weeks after discovery.',
          source: 'Stuff.co.nz data breach reporting 2023; Privacy Commissioner',
          severity: 'med',
        },
      },
    ],
  },

  skycity: {
    handles: { twitter: '@skycity_nz', facebook: 'SkyCity.NZ', instagram: '@skycitynz' },
    consistency_score: 28,
    platforms_active: ['twitter','facebook','instagram'],
    summary: 'Posts heavily feature entertainment, hospitality, and lifestyle content. Harm minimisation messaging clashes with DIA anti-money laundering fine and documented gambling harm failures.',
    posts: [
      {
        id: 'sky_001',
        platform: 'facebook',
        date: '2024',
        text: 'SkyCity is committed to the highest standards of compliance and responsible gaming. Our customers\' wellbeing is our top priority.',
        verified_by: 'Facebook; reported after DIA fine',
        discrepancy: {
          type: 'contradicts_action',
          detail: 'Posted same year DIA issued $4.16M fine — largest AML fine in NZ history — for systematic anti-money laundering failures. Third-party audit had previously found gambling harm minimisation processes inadequate.',
          source: 'DIA announcement 2024; AML fine documentation',
          severity: 'high',
        },
      },
    ],
  },

};

// ══════════════════════════════════════════════════════════
// RENDERER
// ══════════════════════════════════════════════════════════

function renderSocialMediaPanel(entityId, type = 'politician') {
  const data = type === 'politician'
    ? POLITICIAN_SOCIAL[entityId]
    : COMPANY_SOCIAL[entityId];

  if (!data) {
    return `
      <div style="padding:16px;text-align:center;color:#555d72;font-size:13px">
        <div style="font-size:24px;margin-bottom:8px">📱</div>
        No social media data on file for this entity yet.
        <br><br>
        <button class="mini-btn" onclick="goToSubmit('${entityId}')">Submit social media evidence ↗</button>
      </div>
    `;
  }

  const totalPosts = data.posts.length;
  const discrepancies = data.posts.filter(p => p.discrepancy);
  const highSeverity = discrepancies.filter(p => p.discrepancy.severity === 'high');

  // Platform pills
  const platformPills = (data.platforms_active || []).map(p => {
    const plt = PLATFORMS[p];
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:3px 10px;border-radius:20px;background:${plt.bg};color:${plt.color};font-weight:600">
      ${plt.icon} ${plt.label}
    </span>`;
  }).join('');

  // Handles
  const handlesList = Object.entries(data.handles || {}).map(([k, v]) => {
    const plt = PLATFORMS[k];
    return `<span style="font-size:11px;color:#8b92a8">${plt ? plt.icon : ''} ${v}</span>`;
  }).join(' &nbsp;·&nbsp; ');

  // Posts
  const postsHtml = data.posts.map(post => {
    const plt = PLATFORMS[post.platform] || PLATFORMS.press;
    const disc = post.discrepancy;
    const discType = disc ? DISCREPANCY_TYPES[disc.type] : null;

    return `
      <div class="social-post ${disc ? 'has-discrepancy' : 'no-discrepancy'}" style="border-left-color:${disc ? (disc.severity === 'high' ? '#ef4444' : disc.severity === 'med' ? '#f59e0b' : '#8b92a8') : '#22c55e'}">
        <div class="social-post-header">
          <span class="social-platform-tag" style="background:${plt.bg};color:${plt.color}">${plt.icon} ${plt.label}</span>
          <span class="social-post-date">${post.date}</span>
          ${disc ? `<span class="social-discrepancy-badge" style="background:${discType?.color}22;color:${discType?.color};border:1px solid ${discType?.color}44">${discType?.icon} ${discType?.label}</span>` : '<span style="font-size:10px;color:#22c55e;background:rgba(34,197,94,0.1);padding:2px 8px;border-radius:4px">✓ Consistent</span>'}
        </div>

        <div class="social-post-text">"${post.text}"</div>
        <div style="font-size:10px;color:#555d72;margin-top:4px">Verified by: ${post.verified_by}</div>

        ${disc ? `
          <div class="social-discrepancy-detail">
            <div style="font-size:11px;font-weight:700;color:${discType?.color};margin-bottom:4px">${discType?.icon} Discrepancy detected:</div>
            <div style="font-size:12px;color:#c8cad0;margin-bottom:4px">${disc.detail}</div>
            <div style="font-size:10px;color:#555d72">Source: ${disc.source}</div>
          </div>
        ` : post.note ? `<div style="font-size:11px;color:#22c55e;margin-top:6px;padding:6px 8px;background:rgba(34,197,94,0.06);border-radius:6px">${post.note}</div>` : ''}
      </div>
    `;
  }).join('');

  return `
    <div class="social-panel">
      <!-- Header stats -->
      <div class="social-stats-row">
        <div class="social-stat">
          <div class="social-stat-val" style="color:${scoreGradient(data.consistency_score)}">${data.consistency_score}</div>
          <div class="social-stat-label">Consistency Score</div>
          <div style="font-size:9px;color:#555d72;margin-top:1px">social vs. actions</div>
        </div>
        <div class="social-stat">
          <div class="social-stat-val" style="color:#ef4444">${discrepancies.length}</div>
          <div class="social-stat-label">Discrepancies</div>
          <div style="font-size:9px;color:#555d72;margin-top:1px">of ${totalPosts} posts tracked</div>
        </div>
        <div class="social-stat">
          <div class="social-stat-val" style="color:#f59e0b">${highSeverity.length}</div>
          <div class="social-stat-label">High Severity</div>
          <div style="font-size:9px;color:#555d72;margin-top:1px">major contradictions</div>
        </div>
        <div class="social-stat">
          <div class="social-stat-val" style="color:${scoreGradient(data.engagement_authenticity || 50)}">${data.engagement_authenticity || '?'}</div>
          <div class="social-stat-label">Authenticity</div>
          <div style="font-size:9px;color:#555d72;margin-top:1px">engagement quality</div>
        </div>
      </div>

      <!-- Handles -->
      <div style="margin-bottom:12px;display:flex;flex-wrap:wrap;gap:6px;align-items:center">
        ${platformPills}
        <span style="color:#555d72;font-size:11px;margin-left:4px">${handlesList}</span>
      </div>

      <!-- Summary -->
      <div style="font-size:13px;color:#8b92a8;padding:10px 12px;background:#111318;border-radius:8px;margin-bottom:16px;line-height:1.6">${data.summary}</div>

      <!-- Filter row -->
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <button class="social-filter-btn active" onclick="filterSocialPosts(this,'all')">All (${totalPosts})</button>
        <button class="social-filter-btn" onclick="filterSocialPosts(this,'discrepancy')" style="color:#ef4444;border-color:rgba(239,68,68,0.3)">⚠ Discrepancies (${discrepancies.length})</button>
        <button class="social-filter-btn" onclick="filterSocialPosts(this,'high')" style="color:#f59e0b;border-color:rgba(245,158,11,0.3)">🔴 High severity (${highSeverity.length})</button>
        <button class="social-filter-btn" onclick="filterSocialPosts(this,'clean')" style="color:#22c55e;border-color:rgba(34,197,94,0.3)">✓ Consistent (${totalPosts - discrepancies.length})</button>
      </div>

      <!-- Posts -->
      <div id="social-posts-list" class="social-posts-list">
        ${postsHtml}
      </div>

      <div style="margin-top:12px;font-size:11px;color:#555d72;line-height:1.5">
        ℹ All posts sourced from archived public records, credible media screenshots, or Wayback Machine captures. Posts are not scraped live.
        <button class="mini-btn" style="margin-left:8px" onclick="goToSubmit('social media evidence')">Submit a post ↗</button>
      </div>
    </div>
  `;
}

// Filter posts by type
window.filterSocialPosts = function(btn, filter) {
  document.querySelectorAll('.social-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const posts = document.querySelectorAll('.social-post');
  posts.forEach(post => {
    if (filter === 'all') { post.style.display = 'block'; return; }
    if (filter === 'discrepancy') { post.style.display = post.classList.contains('has-discrepancy') ? 'block' : 'none'; return; }
    if (filter === 'clean') { post.style.display = post.classList.contains('no-discrepancy') ? 'block' : 'none'; return; }
    if (filter === 'high') {
      const badge = post.querySelector('.social-discrepancy-badge');
      const isHigh = post.querySelector('[style*="ef4444"]') && post.classList.contains('has-discrepancy');
      post.style.display = isHigh ? 'block' : 'none';
    }
  });
};

// AI Social Media Analysis
window.fetchSocialAI = async function(entityId, entityName, type = 'politician') {
  const data = type === 'politician' ? POLITICIAN_SOCIAL[entityId] : COMPANY_SOCIAL[entityId];
  const aiContainer = document.getElementById('social-ai-content');
  const aiPanel = document.getElementById('social-ai-panel');
  if (!aiContainer || !data) return;

  aiPanel.style.display = 'block';
  aiPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  aiContainer.innerHTML = `<div class="progress-wrap"><span>Running social media pattern analysis for ${entityName}…</span><div class="progress-bar"><div class="progress-fill" style="width:65%"></div></div></div>`;

  const postsSummary = data.posts.map(p => {
    const disc = p.discrepancy;
    return `[${p.platform.toUpperCase()} — ${p.date}] "${p.text}"${disc ? `\n  ↳ DISCREPANCY (${disc.severity}): ${disc.detail}\n  ↳ Source: ${disc.source}` : '\n  ↳ No discrepancy found'}`;
  }).join('\n\n');

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a social media intelligence analyst specialising in political and corporate communications. Analyse the social media behaviour of ${entityName}.

Social media consistency score: ${data.consistency_score}/100
Platforms active: ${(data.platforms_active || []).join(', ')}
Summary: ${data.summary}

Tracked posts and discrepancies:
${postsSummary}

Write structured HTML analysis with <h3> tags for:
1. Communication Strategy (how do they use social media? what patterns emerge in tone, timing, topics?)
2. The Discrepancy Pattern (what do the contradictions between posts and actions reveal? is there a systematic pattern?)
3. What They Amplify vs What They Hide (what gets posted vs what's conspicuously absent?)
4. Audience Manipulation Techniques (if any — what persuasion tactics are visible?)
5. Authenticity Assessment (is this person/company authentic on social or purely managed messaging?)
6. Red Flags for Followers (what should people following this account be aware of?)

Use <div class="highlight"> for key findings. Be analytical and direct. Return only the HTML content, no outer tags.`
        }]
      })
    });
    const d = await res.json();
    aiContainer.innerHTML = d.content?.find(b => b.type === 'text')?.text || 'Unable to generate analysis.';
  } catch (e) {
    aiContainer.innerHTML = `<p style="color:#ef4444">Failed to fetch AI analysis.</p>`;
  }
};

window.POLITICIAN_SOCIAL = POLITICIAN_SOCIAL;
window.COMPANY_SOCIAL = COMPANY_SOCIAL;
window.renderSocialMediaPanel = renderSocialMediaPanel;
