// ── WORLDLENS DATA ──
// Static base data + AI deep-dive support

const COUNTRIES = [
  { code:'NZ', name:'New Zealand', flag:'🇳🇿', region:'Oceania',
    gdp:48000, quality_of_life:88, freedom:93, safety:82, cost_of_living:62, healthcare:85, education:89, environment:80, equality:84, corruption:88, press_freedom:91, overall:0 },
  { code:'AU', name:'Australia', flag:'🇦🇺', region:'Oceania',
    gdp:55000, quality_of_life:86, freedom:88, safety:76, cost_of_living:58, healthcare:83, education:88, environment:72, equality:81, corruption:85, press_freedom:85, overall:0 },
  { code:'NO', name:'Norway', flag:'🇳🇴', region:'Europe',
    gdp:82000, quality_of_life:97, freedom:97, safety:90, cost_of_living:38, healthcare:96, education:97, environment:90, equality:95, corruption:95, press_freedom:98, overall:0 },
  { code:'FI', name:'Finland', flag:'🇫🇮', region:'Europe',
    gdp:52000, quality_of_life:96, freedom:96, safety:92, cost_of_living:52, healthcare:95, education:99, environment:88, equality:94, corruption:94, press_freedom:99, overall:0 },
  { code:'IS', name:'Iceland', flag:'🇮🇸', region:'Europe',
    gdp:68000, quality_of_life:95, freedom:98, safety:96, cost_of_living:40, healthcare:94, education:96, environment:93, equality:97, corruption:93, press_freedom:97, overall:0 },
  { code:'SE', name:'Sweden', flag:'🇸🇪', region:'Europe',
    gdp:56000, quality_of_life:94, freedom:95, safety:79, cost_of_living:50, healthcare:94, education:98, environment:87, equality:93, corruption:92, press_freedom:98, overall:0 },
  { code:'DK', name:'Denmark', flag:'🇩🇰', region:'Europe',
    gdp:62000, quality_of_life:93, freedom:96, safety:88, cost_of_living:46, healthcare:92, education:97, environment:85, equality:92, corruption:96, press_freedom:97, overall:0 },
  { code:'CH', name:'Switzerland', flag:'🇨🇭', region:'Europe',
    gdp:88000, quality_of_life:92, freedom:94, safety:88, cost_of_living:30, healthcare:97, education:95, environment:82, equality:85, corruption:90, press_freedom:92, overall:0 },
  { code:'NL', name:'Netherlands', flag:'🇳🇱', region:'Europe',
    gdp:58000, quality_of_life:90, freedom:93, safety:80, cost_of_living:52, healthcare:91, education:94, environment:78, equality:87, corruption:88, press_freedom:94, overall:0 },
  { code:'CA', name:'Canada', flag:'🇨🇦', region:'Americas',
    gdp:52000, quality_of_life:88, freedom:90, safety:75, cost_of_living:55, healthcare:82, education:90, environment:72, equality:85, corruption:82, press_freedom:88, overall:0 },
  { code:'DE', name:'Germany', flag:'🇩🇪', region:'Europe',
    gdp:54000, quality_of_life:86, freedom:88, safety:82, cost_of_living:54, healthcare:90, education:92, environment:76, equality:82, corruption:84, press_freedom:87, overall:0 },
  { code:'JP', name:'Japan', flag:'🇯🇵', region:'Asia',
    gdp:42000, quality_of_life:85, freedom:82, safety:94, cost_of_living:55, healthcare:92, education:91, environment:74, equality:68, corruption:76, press_freedom:70, overall:0 },
  { code:'GB', name:'United Kingdom', flag:'🇬🇧', region:'Europe',
    gdp:48000, quality_of_life:83, freedom:87, safety:74, cost_of_living:50, healthcare:80, education:90, environment:72, equality:80, corruption:78, press_freedom:82, overall:0 },
  { code:'IE', name:'Ireland', flag:'🇮🇪', region:'Europe',
    gdp:84000, quality_of_life:87, freedom:92, safety:80, cost_of_living:46, healthcare:86, education:93, environment:72, equality:86, corruption:86, press_freedom:93, overall:0 },
  { code:'US', name:'United States', flag:'🇺🇸', region:'Americas',
    gdp:72000, quality_of_life:72, freedom:78, safety:52, cost_of_living:48, healthcare:66, education:82, environment:55, equality:62, corruption:68, press_freedom:72, overall:0 },
  { code:'FR', name:'France', flag:'🇫🇷', region:'Europe',
    gdp:46000, quality_of_life:84, freedom:85, safety:72, cost_of_living:54, healthcare:88, education:88, environment:72, equality:79, corruption:72, press_freedom:80, overall:0 },
  { code:'KR', name:'South Korea', flag:'🇰🇷', region:'Asia',
    gdp:34000, quality_of_life:78, freedom:76, safety:84, cost_of_living:60, healthcare:88, education:92, environment:65, equality:64, corruption:62, press_freedom:68, overall:0 },
  { code:'SG', name:'Singapore', flag:'🇸🇬', region:'Asia',
    gdp:68000, quality_of_life:82, freedom:54, safety:95, cost_of_living:40, healthcare:90, education:94, environment:68, equality:62, corruption:86, press_freedom:42, overall:0 },
  { code:'ES', name:'Spain', flag:'🇪🇸', region:'Europe',
    gdp:32000, quality_of_life:82, freedom:84, safety:75, cost_of_living:62, healthcare:86, education:82, environment:70, equality:76, corruption:60, press_freedom:74, overall:0 },
  { code:'IT', name:'Italy', flag:'🇮🇹', region:'Europe',
    gdp:36000, quality_of_life:78, freedom:80, safety:72, cost_of_living:60, healthcare:84, education:80, environment:66, equality:70, corruption:50, press_freedom:70, overall:0 },
  { code:'PT', name:'Portugal', flag:'🇵🇹', region:'Europe',
    gdp:26000, quality_of_life:80, freedom:85, safety:84, cost_of_living:68, healthcare:82, education:80, environment:72, equality:74, corruption:68, press_freedom:82, overall:0 },
  { code:'EE', name:'Estonia', flag:'🇪🇪', region:'Europe',
    gdp:26000, quality_of_life:78, freedom:90, safety:82, cost_of_living:70, healthcare:78, education:86, environment:80, equality:76, corruption:76, press_freedom:90, overall:0 },
  { code:'BR', name:'Brazil', flag:'🇧🇷', region:'Americas',
    gdp:12000, quality_of_life:56, freedom:68, safety:28, cost_of_living:75, healthcare:62, education:60, environment:55, equality:42, corruption:34, press_freedom:56, overall:0 },
  { code:'MX', name:'Mexico', flag:'🇲🇽', region:'Americas',
    gdp:12000, quality_of_life:54, freedom:60, safety:22, cost_of_living:78, healthcare:58, education:58, environment:48, equality:45, corruption:28, press_freedom:42, overall:0 },
  { code:'ZA', name:'South Africa', flag:'🇿🇦', region:'Africa',
    gdp:8000, quality_of_life:44, freedom:62, safety:14, cost_of_living:82, healthcare:52, education:50, environment:50, equality:28, corruption:36, press_freedom:64, overall:0 },
  { code:'CN', name:'China', flag:'🇨🇳', region:'Asia',
    gdp:16000, quality_of_life:54, freedom:10, safety:72, cost_of_living:72, healthcare:70, education:74, environment:40, equality:44, corruption:32, press_freedom:6, overall:0 },
  { code:'RU', name:'Russia', flag:'🇷🇺', region:'Europe/Asia',
    gdp:14000, quality_of_life:42, freedom:12, safety:46, cost_of_living:78, healthcare:58, education:68, environment:38, equality:40, corruption:22, press_freedom:8, overall:0 },
  { code:'IN', name:'India', flag:'🇮🇳', region:'Asia',
    gdp:8000, quality_of_life:52, freedom:62, safety:48, cost_of_living:85, healthcare:54, education:62, environment:38, equality:42, corruption:38, press_freedom:54, overall:0 },
  { code:'PH', name:'Philippines', flag:'🇵🇭', region:'Asia',
    gdp:4000, quality_of_life:48, freedom:52, safety:36, cost_of_living:86, healthcare:50, education:56, environment:42, equality:50, corruption:30, press_freedom:40, overall:0 },
  { code:'NG', name:'Nigeria', flag:'🇳🇬', region:'Africa',
    gdp:2200, quality_of_life:34, freedom:42, safety:22, cost_of_living:88, healthcare:32, education:40, environment:32, equality:32, corruption:18, press_freedom:38, overall:0 },
  { code:'HU', name:'Hungary', flag:'🇭🇺', region:'Europe',
    gdp:20000, quality_of_life:64, freedom:48, safety:76, cost_of_living:68, healthcare:70, education:72, environment:62, equality:54, corruption:42, press_freedom:34, overall:0 },
  { code:'PL', name:'Poland', flag:'🇵🇱', region:'Europe',
    gdp:22000, quality_of_life:70, freedom:64, safety:80, cost_of_living:70, healthcare:72, education:82, environment:58, equality:60, corruption:56, press_freedom:52, overall:0 },
  { code:'AR', name:'Argentina', flag:'🇦🇷', region:'Americas',
    gdp:14000, quality_of_life:60, freedom:70, safety:40, cost_of_living:80, healthcare:66, education:68, environment:52, equality:52, corruption:34, press_freedom:64, overall:0 },
  { code:'IL', name:'Israel', flag:'🇮🇱', region:'Middle East',
    gdp:46000, quality_of_life:74, freedom:70, safety:62, cost_of_living:40, healthcare:84, education:84, environment:60, equality:62, corruption:62, press_freedom:68, overall:0 },
  { code:'SA', name:'Saudi Arabia', flag:'🇸🇦', region:'Middle East',
    gdp:32000, quality_of_life:56, freedom:14, safety:70, cost_of_living:62, healthcare:72, education:64, environment:30, equality:26, corruption:38, press_freedom:10, overall:0 },
];

// Compute overall score
COUNTRIES.forEach(c => {
  const metrics = ['gdp','quality_of_life','freedom','safety','cost_of_living','healthcare','education','environment','equality','corruption','press_freedom'];
  let sum = 0;
  metrics.forEach(m => {
    let val = c[m];
    if (m === 'gdp') val = Math.min(100, val / 1000); // normalize gdp
    sum += val;
  });
  c.overall = Math.round(sum / metrics.length);
});

const METRICS = {
  overall: 'Overall Score',
  gdp: 'GDP per Capita',
  quality_of_life: 'Quality of Life',
  freedom: 'Freedom Index',
  safety: 'Safety / Low Crime',
  cost_of_living: 'Cost of Living',
  healthcare: 'Healthcare',
  education: 'Education',
  environment: 'Environment',
  equality: 'Equality',
  corruption: 'Low Corruption',
  press_freedom: 'Press Freedom'
};

// ── POLITICIANS ──
const POLITICIANS = [
  {
    id: 'luxon_nz', name: 'Christopher Luxon', country: 'NZ', flag: '🇳🇿',
    role: 'Prime Minister', party: 'National Party', since: '2023',
    initials: 'CL', color: '#1e40af',
    integrity: 52, lie_count: 18, corruption_risk: 35, populism: 62,
    description: 'Former Air NZ CEO turned politician. Led National to victory in 2023 coalition government.',
    stances: [
      { topic: 'Tax cuts', position: 'for' },
      { topic: 'Climate action', position: 'mixed' },
      { topic: 'Housing reform', position: 'for' },
      { topic: 'Free speech', position: 'for' },
      { topic: 'Public service cuts', position: 'for' },
      { topic: 'Three strikes crime', position: 'for' },
    ],
    lies: [
      { date: 'Oct 2023', claim: 'We will not cut school lunch programmes', reality: 'Government cut school lunch funding in 2024', severity: 'high' },
      { date: 'Sep 2023', claim: 'No plans to change RMA before election', reality: 'Major RMA fast-track legislation passed within months', severity: 'med' },
      { date: 'Aug 2024', claim: 'No foreign ownership concerns in Fast Track Bill', reality: 'Legislation contained provisions favoring offshore investors', severity: 'high' },
    ],
    funding: [
      { source: 'Business Roundtable donors', amount: 'Undisclosed' },
      { source: 'NZ Initiative', amount: 'Policy aligned' },
      { source: 'Property investors', amount: 'Major donations' },
    ],
    quotes: [
      { text: '"New Zealand is a smoko break away from being a great country."', context: 'Pre-election speech, 2022' },
      { text: '"I don\'t focus on things I can\'t control."', context: 'On climate change, RNZ interview 2023' },
    ],
    investments: 'Property portfolio, shares in multiple NZ companies. Divested Air NZ shares before PM role.',
    affiliations: 'Brethren church member (contested). Close ties to Business NZ, property developer lobby.',
  },
  {
    id: 'hipkins_nz', name: 'Chris Hipkins', country: 'NZ', flag: '🇳🇿',
    role: 'Leader of Opposition', party: 'Labour', since: '2023',
    initials: 'CH', color: '#dc2626',
    integrity: 68, lie_count: 8, corruption_risk: 18, populism: 45,
    description: 'Former PM following Ardern resignation. Led Labour through 2023 election loss.',
    stances: [
      { topic: 'Public healthcare', position: 'for' },
      { topic: 'Climate action', position: 'for' },
      { topic: 'Tax on wealth', position: 'mixed' },
      { topic: 'Co-governance', position: 'for' },
      { topic: 'Free tertiary', position: 'for' },
    ],
    lies: [
      { date: 'Jul 2023', claim: 'No wealth tax being considered', reality: 'TWG had been active; dropped under pressure from NZF', severity: 'med' },
      { date: 'Mar 2023', claim: 'Cost of living crisis is improving', reality: 'Inflation continued to rise month after statement', severity: 'med' },
    ],
    funding: [
      { source: 'Unions (CTU)', amount: 'Significant' },
      { source: 'Progressive donors', amount: 'Moderate' },
    ],
    quotes: [
      { text: '"I\'m not here to be the next Jacinda Ardern."', context: 'Leadership announcement, Jan 2023' },
    ],
    investments: 'Standard Kiwisaver. No significant conflicts disclosed.',
    affiliations: 'CTU (Council of Trade Unions). Close relationship with public sector unions.',
  },
  {
    id: 'seymour_nz', name: 'David Seymour', country: 'NZ', flag: '🇳🇿',
    role: 'ACT Party Leader / Minister', party: 'ACT', since: '2014',
    initials: 'DS', color: '#f59e0b',
    integrity: 60, lie_count: 12, corruption_risk: 22, populism: 58,
    description: 'Libertarian ACT leader. Treaty Principles Bill author. Key coalition partner.',
    stances: [
      { topic: 'Treaty of Waitangi reform', position: 'for' },
      { topic: 'Euthanasia', position: 'for' },
      { topic: 'Gun law reform', position: 'against' },
      { topic: 'Free market', position: 'for' },
      { topic: 'Deregulation', position: 'for' },
    ],
    lies: [
      { date: 'Nov 2023', claim: 'Treaty Principles Bill is just a debate starter', reality: 'Bill went to select committee as serious legislation before being pulled', severity: 'high' },
      { date: '2022', claim: 'ACT will not support government without Treaty referendum', reality: 'Dropped condition in coalition negotiations', severity: 'med' },
    ],
    funding: [
      { source: 'Libertarian donors', amount: 'Major' },
      { source: 'Business sector', amount: 'Significant' },
    ],
    quotes: [
      { text: '"The Treaty is not a partnership, it\'s a cession of sovereignty."', context: 'Treaty Principles Bill debate, 2024' },
    ],
    investments: 'Rental property. Standard investment portfolio.',
    affiliations: 'Atlas Network (international libertarian org). IEA (UK). Cato Institute ties.',
  },
  {
    id: 'peters_nz', name: 'Winston Peters', country: 'NZ', flag: '🇳🇿',
    role: 'Deputy PM / Foreign Minister', party: 'NZ First', since: '1984',
    initials: 'WP', color: '#4f46e5',
    integrity: 34, lie_count: 47, corruption_risk: 62, populism: 88,
    description: 'Perennial kingmaker. 9 terms in parliament. NZ First founder. Known for shifting positions.',
    stances: [
      { topic: 'Immigration limits', position: 'for' },
      { topic: 'Foreign investment', position: 'against' },
      { topic: 'Māori co-governance', position: 'against' },
      { topic: 'Superannuation age', position: 'against' },
    ],
    lies: [
      { date: '2017', claim: 'Will not enter coalition with National', reality: 'Announced NZ First going with Labour after keeping both parties waiting 26 days', severity: 'med' },
      { date: '2020', claim: 'NZ First received no donations from controversial sources', reality: 'SFO investigation into NZ First Foundation revealed major undisclosed donations', severity: 'high' },
      { date: '2023', claim: 'NZ First Foundation scandal was politically motivated', reality: 'SFO found donations were obscured; Peters deflected throughout', severity: 'high' },
      { date: '2024', claim: '"We have not cut foreign aid"', reality: 'Foreign aid budget cut by $550M+ in 2024 budget', severity: 'high' },
    ],
    funding: [
      { source: 'NZ First Foundation (SFO investigated)', amount: 'Undisclosed millions' },
      { source: 'Racing industry', amount: 'Long-standing' },
      { source: 'Anonymous donors', amount: 'Multiple large' },
    ],
    quotes: [
      { text: '"I\'ve never broken a promise in my life."', context: 'Interview, 2023 (contested by multiple journalists)' },
      { text: '"New Zealand is not for sale."', context: 'Campaign speech, 2017 and 2023' },
    ],
    investments: 'Horse racing. Property interests.',
    affiliations: 'Racing industry. Controversial links to Simunovich Fisheries (historic). NZ First Foundation.',
  },
  {
    id: 'albanese_au', name: 'Anthony Albanese', country: 'AU', flag: '🇦🇺',
    role: 'Prime Minister', party: 'ALP', since: '2022',
    initials: 'AA', color: '#dc2626',
    integrity: 65, lie_count: 14, corruption_risk: 28, populism: 50,
    description: 'Labor PM since 2022. Working class background. Oversaw Voice referendum defeat.',
    stances: [
      { topic: 'Climate action', position: 'for' },
      { topic: 'Indigenous Voice', position: 'for' },
      { topic: 'AUKUS', position: 'for' },
      { topic: 'Wages growth', position: 'for' },
      { topic: 'Housing affordability', position: 'mixed' },
    ],
    lies: [
      { date: 'May 2022', claim: '"Nothing will change about my lifestyle"', reality: 'Took multiple overseas holidays, updated wardrobe, separated from partner', severity: 'low' },
      { date: '2023', claim: '"Voice will not affect property rights"', reality: 'Legal experts disputed this; scope remained genuinely contested', severity: 'med' },
      { date: '2024', claim: '"We have delivered on our climate commitments"', reality: 'Australia still approving major fossil fuel projects', severity: 'med' },
    ],
    funding: [
      { source: 'CFMEU (construction union)', amount: 'Significant' },
      { source: 'ALP corporate donors', amount: 'Moderate' },
    ],
    quotes: [
      { text: '"I grew up in public housing. I understand what struggle looks like."', context: 'Campaign launch, 2022' },
    ],
    investments: 'Investment property in Sydney (sold). Super. No major conflicts.',
    affiliations: 'ACTU. Left faction ALP. AUKUS defence alignment.',
  },
  {
    id: 'trump_us', name: 'Donald Trump', country: 'US', flag: '🇺🇸',
    role: 'President (47th)', party: 'Republican', since: '2025',
    initials: 'DT', color: '#dc2626',
    integrity: 12, lie_count: 312, corruption_risk: 88, populism: 96,
    description: 'Former and current US President. Business empire, 4 indictments, Jan 6 involvement.',
    stances: [
      { topic: 'Immigration', position: 'against' },
      { topic: 'NATO', position: 'mixed' },
      { topic: 'Climate change', position: 'against' },
      { topic: 'Tariffs', position: 'for' },
      { topic: 'Press freedom', position: 'against' },
    ],
    lies: [
      { date: 'Jan 2021', claim: '2020 election was stolen', reality: 'Proven false in 60+ court cases, own AG confirmed no fraud', severity: 'high' },
      { date: '2020', claim: 'COVID will "disappear like a miracle"', reality: 'COVID killed 1.2M Americans; White House knew severity from Feb 2020', severity: 'high' },
      { date: '2024', claim: 'Mexico is sending criminals across the border', reality: 'Most undocumented entrants are asylum seekers; data does not support claim', severity: 'high' },
      { date: 'Sep 2024', claim: 'Immigrants are eating cats and dogs in Springfield OH', reality: 'Debunked immediately by Springfield officials; no evidence', severity: 'high' },
    ],
    funding: [
      { source: 'Elon Musk / X', amount: '$250M+ (2024 cycle)' },
      { source: 'Fossil fuel industry', amount: '$75M+' },
      { source: 'Saudi/UAE sovereign wealth (via LIV/deals)', amount: 'Indirect' },
      { source: 'Small donor MAGA base', amount: '$1.2B (2024)' },
    ],
    quotes: [
      { text: '"I could stand in the middle of 5th Ave and shoot somebody and not lose any voters."', context: 'Iowa rally, 2016' },
      { text: '"What you\'re seeing and what you\'re reading is not what\'s happening."', context: 'VFW speech, 2018' },
    ],
    investments: 'Trump Organization. Truth Social (DJT stock). Mar-a-Lago. Multiple golf courses.',
    affiliations: 'Heritage Foundation (Project 2025). MAGA movement. Relationships with Orbán, Putin, MBS.',
  },
  {
    id: 'modi_in', name: 'Narendra Modi', country: 'IN', flag: '🇮🇳',
    role: 'Prime Minister', party: 'BJP', since: '2014',
    initials: 'NM', color: '#f97316',
    integrity: 35, lie_count: 68, corruption_risk: 58, populism: 90,
    description: 'Hindu nationalist PM. 2002 Gujarat riots controversy. Press freedom collapse under tenure.',
    stances: [
      { topic: 'Hindu nationalism', position: 'for' },
      { topic: 'Press freedom', position: 'against' },
      { topic: 'Muslim rights', position: 'against' },
      { topic: 'Economic development', position: 'for' },
    ],
    lies: [
      { date: '2014', claim: 'Will eliminate corruption entirely in 100 days', reality: 'India's corruption perception index worsened under BJP tenure', severity: 'high' },
      { date: '2016', claim: 'Demonetisation will end black money', reality: '99.3% of all notes returned; no significant black money recovery', severity: 'high' },
    ],
    funding: [
      { source: 'Electoral bonds (Adani, Ambani)', amount: 'Billions (scheme abolished by court)' },
      { source: 'RSS/VHP', amount: 'Ideological support' },
    ],
    quotes: [
      { text: '"India has become a vishwaguru — teacher to the world."', context: 'Independence Day speech, 2022' },
    ],
    investments: 'No disclosed personal assets of significance. Family members have various business interests.',
    affiliations: 'RSS (Hindu nationalist org). BJP. Close ties to Adani Group, Reliance Industries.',
  },
  {
    id: 'starmer_uk', name: 'Keir Starmer', country: 'UK', flag: '🇬🇧',
    role: 'Prime Minister', party: 'Labour', since: '2024',
    initials: 'KS', color: '#dc2626',
    integrity: 62, lie_count: 16, corruption_risk: 24, populism: 40,
    description: 'Former DPP, Labour leader since 2020, PM since 2024. Centrist repositioning from Corbyn era.',
    stances: [
      { topic: 'NHS funding', position: 'for' },
      { topic: 'Brexit review', position: 'mixed' },
      { topic: 'Gaza ceasefire', position: 'mixed' },
      { topic: 'Nationalization', position: 'mixed' },
    ],
    lies: [
      { date: '2020', claim: 'Will maintain free movement with EU', reality: 'Dropped policy before becoming PM', severity: 'med' },
      { date: '2020', claim: 'Will increase corporation tax', reality: 'Dropped policy', severity: 'med' },
      { date: '2024', claim: 'No cuts to winter fuel payments planned', reality: 'Winter fuel payment means-tested within weeks of taking office', severity: 'high' },
    ],
    funding: [
      { source: 'Labour major donors', amount: 'Moderate' },
      { source: 'Lord Alli (gifts/clothing)', amount: '~£100k gifts disclosed' },
    ],
    quotes: [
      { text: '"We will not raise taxes on working people."', context: 'General election campaign, 2024 (contested after budget)' },
    ],
    investments: 'Standard pension/savings. KCs typically well-compensated before politics.',
    affiliations: 'Fabian Society. Trilateral Commission links. Progress (Labour moderate faction).',
  },
  {
    id: 'trudeau_ca', name: 'Justin Trudeau', country: 'CA', flag: '🇨🇦',
    role: 'Former Prime Minister', party: 'Liberal', since: '2015',
    initials: 'JT', color: '#dc2626',
    integrity: 55, lie_count: 22, corruption_risk: 45, populism: 62,
    description: 'Longest-serving recent Canadian PM. Multiple ethics violations. Resigned Jan 2025.',
    stances: [
      { topic: 'Carbon tax', position: 'for' },
      { topic: 'Gun control', position: 'for' },
      { topic: 'Indigenous reconciliation', position: 'for' },
      { topic: 'COVID mandates', position: 'for' },
    ],
    lies: [
      { date: '2021', claim: 'Invoking Emergencies Act was a last resort', reality: 'Commissioner found measures not justified in law', severity: 'high' },
      { date: '2019', claim: '"I did not direct anyone to interfere in the SNC-Lavalin case"', reality: 'Two cabinet ministers resigned over political interference', severity: 'high' },
    ],
    funding: [
      { source: 'Liberal Party corporate donors', amount: 'Major' },
      { source: 'WE Charity connections (investigated)', amount: 'Conflict of interest finding' },
    ],
    quotes: [
      { text: '"The world needs more Canada."', context: 'UN General Assembly, 2016' },
    ],
    investments: 'Family Trudeau Foundation (ethics investigation). House in Ottawa.',
    affiliations: 'Bilderberg Group attendee. WEF Young Global Leader (former). NATO.',
  },
  {
    id: 'macron_fr', name: 'Emmanuel Macron', country: 'FR', flag: '🇫🇷',
    role: 'President', party: 'Renaissance', since: '2017',
    initials: 'EM', color: '#2563eb',
    integrity: 56, lie_count: 24, corruption_risk: 38, populism: 52,
    description: 'Centrist ex-banker. Pension reform by decree. Youth protest crackdowns.',
    stances: [
      { topic: 'European integration', position: 'for' },
      { topic: 'Pension reform', position: 'for' },
      { topic: 'Ukraine support', position: 'for' },
      { topic: 'Immigration restriction', position: 'mixed' },
    ],
    lies: [
      { date: '2023', claim: '"Pension reform has broad support"', reality: 'Passed via Article 49.3 bypassing parliamentary vote; 70% public opposition', severity: 'high' },
      { date: '2020', claim: '"We will not raise retirement age"', reality: 'Raised retirement age to 64 in 2023', severity: 'high' },
    ],
    funding: [
      { source: 'Rothschild & Co. (former employer)', amount: 'Extensive network' },
      { source: 'Corporate France (MEDEF)', amount: 'Major alignment' },
    ],
    quotes: [
      { text: '"I\'m neither left nor right. I\'m at the centre."', context: 'Campaign launch, 2017' },
    ],
    investments: 'Standard disclosures. Considerable wealth from banking career.',
    affiliations: 'Bilderberg. WEF. Rothschild & Co. (former). ENA alumni.',
  },
];

// ── COMPANIES ──
const COMPANIES = [
  {
    id: 'apple', name: 'Apple', sector: 'tech', country: 'US',
    logo: '🍎',
    tagline: 'Consumer electronics, software, services',
    ethics: 58, worker: 52, environmental: 62, transparency: 45, tax: 28, data_privacy: 50,
    overall: 0,
    description: 'World\'s most valuable company. Known for design excellence, closed ecosystem, and aggressive tax minimization.',
    controversies: [
      { year: 2024, title: 'Epic court confirms anti-competitive App Store', desc: 'Court ruled Apple deliberately violated injunction on competition rules.', type: 'negative' },
      { year: 2023, title: 'EU antitrust fine: €1.8B', desc: 'Fined for anticompetitive practices in music streaming market.', type: 'negative' },
      { year: 2022, title: 'Foxconn labor conditions', desc: 'Reports of forced labor, suicide nets, and 12+ hour shifts in Apple supply chain.', type: 'negative' },
      { year: 2022, title: 'Repair right blocking', desc: 'Lobbied against right-to-repair legislation globally.', type: 'negative' },
      { year: 2020, title: 'Carbon neutral pledge', desc: 'Committed to carbon neutrality across supply chain by 2030.', type: 'positive' },
    ],
    statements: ['"We believe privacy is a fundamental human right." — Tim Cook', '"We\'re committed to being 100% carbon neutral." — Apple ESG report'],
    worker_notes: 'NDA culture. Anti-union campaigns. Retail workers organize in some markets. Supply chain: Foxconn conditions remain poor.',
    tax_notes: 'Largest corporate tax haven user. Irish "Double Irish" structure. EU found €13B in illegal state aid.',
  },
  {
    id: 'amazon', name: 'Amazon', sector: 'tech', country: 'US',
    logo: '📦',
    tagline: 'E-commerce, cloud, logistics, media',
    ethics: 32, worker: 24, environmental: 44, transparency: 35, tax: 22, data_privacy: 38,
    overall: 0,
    description: 'Dominant in cloud (AWS) and logistics. Repeatedly cited for warehouse worker conditions and aggressive union-busting.',
    controversies: [
      { year: 2024, title: 'FTC antitrust suit filed', desc: 'FTC alleges Amazon uses anticompetitive tactics to maintain monopoly in e-commerce.', type: 'negative' },
      { year: 2023, title: 'Warehouse injury rates 2× industry average', desc: 'OSHA data showed Amazon injury rates consistently above industry standard.', type: 'negative' },
      { year: 2022, title: 'Union busting at Staten Island warehouse', desc: 'NLRB cited Amazon for illegal union interference. Workers still formed union.', type: 'negative' },
      { year: 2021, title: 'Drivers urinating in bottles', desc: 'Denied initially, then admitted drivers face impossible delivery targets.', type: 'negative' },
      { year: 2019, title: '$15 minimum wage introduced', desc: 'Raised minimum wage to $15/hr in US after public pressure.', type: 'positive' },
    ],
    statements: ['"Earth\'s most customer-centric company." — Amazon mission', '"We care deeply about our employees." — (Contested by worker testimonials)'],
    worker_notes: 'High injury rates. Algorithmically managed. Bathroom break monitoring. Termination by algorithm. Amazon Labor Union formed 2022.',
    tax_notes: 'Paid $0 federal income tax in 2018 on $11.2B profit. Uses extensive offshore structures.',
  },
  {
    id: 'tesla', name: 'Tesla', sector: 'tech', country: 'US',
    logo: '⚡',
    tagline: 'Electric vehicles, energy, AI',
    ethics: 44, worker: 38, environmental: 72, transparency: 32, tax: 48, data_privacy: 42,
    overall: 0,
    description: 'EV pioneer with clean energy mission. CEO Elon Musk controversies increasingly entangled with brand.',
    controversies: [
      { year: 2024, title: 'Musk political activity affects brand', desc: 'Tesla sales drop in Europe following Musk\'s far-right political endorsements.', type: 'negative' },
      { year: 2023, title: 'Autopilot investigations', desc: 'NHTSA and DOJ investigating Autopilot safety claims and crashes.', type: 'negative' },
      { year: 2022, title: 'Union busting and racial discrimination', desc: 'NLRB found Tesla illegally fired union organizers. $137M racial discrimination verdict.', type: 'negative' },
      { year: 2021, title: 'Bitcoin reversal on environmental grounds', desc: 'Announced then reversed Bitcoin payment citing environmental concerns.', type: 'neutral' },
      { year: 2020, title: 'Leading EV adoption globally', desc: 'Accelerated global shift to electric vehicles across industry.', type: 'positive' },
    ],
    statements: ['"Tesla\'s mission is to accelerate the world\'s transition to sustainable energy."', '"We\'re completely transparent." — Elon Musk (disputed by SEC)'],
    worker_notes: 'Anti-union. Long hours culture. High turnover. Multiple discrimination lawsuits.',
    tax_notes: 'Received billions in government subsidies. IRS audit ongoing on Musk personal taxes.',
  },
  {
    id: 'meta', name: 'Meta', sector: 'tech', country: 'US',
    logo: '◈',
    tagline: 'Social media, VR, advertising',
    ethics: 22, worker: 52, environmental: 46, transparency: 18, tax: 28, data_privacy: 14,
    overall: 0,
    description: 'Facebook parent. Cambridge Analytica, election interference, teen mental health harms. Zuckerberg pivoting to pro-Trump stance.',
    controversies: [
      { year: 2024, title: 'Fact-checking removed, DEI ended', desc: 'Zuckerberg dismantled fact-checking and diversity programs in apparent political alignment with Trump.', type: 'negative' },
      { year: 2023, title: 'Congressional testimony: teen harm acknowledged', desc: 'Internal research showed Instagram harms teen girls; suppressed.', type: 'negative' },
      { year: 2021, title: 'Frances Haugen whistleblower', desc: 'Revealed Facebook knew about harms to democracy and teen mental health and hid findings.', type: 'negative' },
      { year: 2019, title: '$5B FTC fine (privacy violations)', desc: 'Largest FTC privacy fine in history for Cambridge Analytica scandal.', type: 'negative' },
      { year: 2016, title: 'Election interference facilitation', desc: 'Allowed Cambridge Analytica to harvest 87M user profiles for political targeting.', type: 'negative' },
    ],
    statements: ['"We connect people." — Meta', '"I\'ve always been clear about my commitment to free expression." — Zuckerberg'],
    worker_notes: 'High pay but high burnout. Mass layoffs 2022-23. Strong pay equity data.',
    tax_notes: 'Complex Ireland/Luxembourg structure. Multi-billion offshore profits.',
  },
  {
    id: 'blackrock', name: 'BlackRock', sector: 'finance', country: 'US',
    logo: '◆',
    tagline: 'World\'s largest asset manager',
    ethics: 38, worker: 55, environmental: 34, transparency: 44, tax: 52, data_privacy: 60,
    overall: 0,
    description: '$10T AUM. Largest shareholder in most major companies. ESG pivot then retreat. Housing market impact.',
    controversies: [
      { year: 2024, title: 'ESG retreat under political pressure', desc: 'Left Climate Action 100+ after Republican states threatened divestment.', type: 'negative' },
      { year: 2023, title: 'Single-family home purchases', desc: 'Accused of driving up housing prices by purchasing homes at scale.', type: 'negative' },
      { year: 2022, title: 'Ukraine/Russia exposure', desc: 'Held Russian assets through invasion; slow divestment pace criticized.', type: 'negative' },
      { year: 2020, title: 'Fed hired BlackRock to manage COVID bonds', desc: 'Hired own client; significant conflict of interest; self-dealing on fees.', type: 'negative' },
    ],
    statements: ['"We help people build better financial futures." — BlackRock', '"Sustainability is in our clients\' long-term financial interest." — Larry Fink (2022 letter, walked back 2024)'],
    worker_notes: 'High pay. Investment banking culture. Strong diversity metrics relative to peers.',
    tax_notes: 'Standard financial sector structures. Some offshore.',
  },
  {
    id: 'shell', name: 'Shell', sector: 'energy', country: 'NL',
    logo: '🐚',
    tagline: 'Oil, gas, energy transition',
    ethics: 20, worker: 52, environmental: 14, transparency: 38, tax: 24, data_privacy: 60,
    overall: 0,
    description: 'Major oil supermajor. Internal documents show decades of climate knowledge and denial. Court-ordered to cut emissions.',
    controversies: [
      { year: 2024, title: 'Abandoned net zero targets', desc: 'Quietly dropped 2035 net zero targets under CEO Wael Sawan.', type: 'negative' },
      { year: 2023, title: 'Dutch court appeal on emissions', desc: 'Court ordered 45% emissions cut by 2030; Shell appealing.', type: 'negative' },
      { year: 2023, title: 'Greenwashing advertising banned', desc: 'ASA banned Shell ads falsely implying it\'s a clean energy company.', type: 'negative' },
      { year: 2019, title: 'Internal docs: knew of climate risk since 1980s', desc: 'Documented internal awareness of climate risk; funded denial externally.', type: 'negative' },
    ],
    statements: ['"We want to be a net-zero emissions energy business by 2050." — Shell website (targets since reduced)', '"Powering progress — respecting nature." — Shell tagline'],
    worker_notes: 'High pay. Good safety culture in owned operations. Supply chain issues in Nigeria, Nigeria Delta contamination.',
    tax_notes: 'Extensive Netherlands/UK structures. Multiple jurisdictions with minimal tax.',
  },
  {
    id: 'nestle', name: 'Nestlé', sector: 'retail', country: 'CH',
    logo: '🌾',
    tagline: 'Food, beverages, nutrition',
    ethics: 24, worker: 48, environmental: 30, transparency: 36, tax: 42, data_privacy: 55,
    overall: 0,
    description: 'World\'s largest food company. Baby formula, water privatization, child labor controversies spanning decades.',
    controversies: [
      { year: 2024, title: 'Infant formula in developing nations', desc: 'Ongoing WHO code violations for marketing infant formula in developing nations.', type: 'negative' },
      { year: 2023, title: 'Forced child/slave labor in cocoa supply', desc: 'US courts ruled Nestlé can be held liable for child slave labor in cocoa supply chain.', type: 'negative' },
      { year: 2022, title: '70% of products unhealthy', desc: 'Internal review found 70% of portfolio fails to meet recognized nutrition standards.', type: 'negative' },
      { year: 2008, title: 'Water privatization advocacy', desc: 'Former CEO Peter Brabeck stated water is not a human right; sparked global boycott.', type: 'negative' },
    ],
    statements: ['"Good food, good life." — Nestlé tagline', '"Water is not a public right... it should have a market value." — Former CEO Brabeck, 2005'],
    worker_notes: 'Fair wages in owned facilities. Supply chain: extensive child labor in cocoa, coffee, palm oil.',
    tax_notes: 'Swiss holding structure. Effective tax rate historically well below nominal.',
  },
  {
    id: 'patagonia', name: 'Patagonia', sector: 'retail', country: 'US',
    logo: '🏔',
    tagline: 'Outdoor clothing, environmental activism',
    ethics: 92, worker: 86, environmental: 94, transparency: 88, tax: 72, data_privacy: 80,
    overall: 0,
    description: 'Privately held. Transferred ownership to environmental trust in 2022. Consistently rated top for ethics.',
    controversies: [
      { year: 2022, title: 'Yvon Chouinard transfers company to Earth Trust', desc: 'Gave away $3B company so all profits go to climate fight. Called "the anti-Silicon Valley move."', type: 'positive' },
      { year: 2020, title: 'Rated #1 for supply chain transparency', desc: 'Supply chain transparency and fair trade certification across majority of products.', type: 'positive' },
      { year: 2019, title: 'Refused to attend White House meeting', desc: 'Refused White House invitation to protest rollback of Bears Ears monument protection.', type: 'positive' },
      { year: 2017, title: '"The President stole your land" ad', desc: 'Full-page ads against Trump\'s monument reductions. Revenue donated to grassroots groups.', type: 'positive' },
    ],
    statements: ['"We\'re in business to save our home planet." — Patagonia mission', '"Earth is now our only shareholder." — Yvon Chouinard, 2022'],
    worker_notes: 'Living wage. On-site childcare. Flexible hours. Fair trade certified production. Regularly cited as top employer.',
    tax_notes: 'Pays full taxes. Some charitable deductions via environmental trust structure.',
  },
  {
    id: 'pfizer', name: 'Pfizer', sector: 'pharma', country: 'US',
    logo: '💊',
    tagline: 'Pharmaceuticals, vaccines',
    ethics: 42, worker: 58, environmental: 52, transparency: 38, tax: 32, data_privacy: 55,
    overall: 0,
    description: 'COVID vaccine maker. Record profits. Price gouging history. Criminal conviction for off-label marketing.',
    controversies: [
      { year: 2023, title: 'Project Veritas sting (contested)', desc: 'Video claims of gain-of-function research; company denied; context disputed.', type: 'neutral' },
      { year: 2022, title: 'COVID vaccine pricing in developing nations', desc: 'Charged developing nations far above cost; MSF documented excessive pricing.', type: 'negative' },
      { year: 2019, title: 'Opioid settlement $75M', desc: 'Settled claims related to subsidiary Purdue and opioid marketing.', type: 'negative' },
      { year: 2009, title: 'Largest criminal fine in history at time: $2.3B', desc: 'Convicted for illegal off-label drug promotion and kickbacks to doctors.', type: 'negative' },
      { year: 2021, title: 'COVID-19 vaccine development', desc: 'Partnered with BioNTech to develop first approved mRNA COVID-19 vaccine.', type: 'positive' },
    ],
    statements: ['"Breakthroughs that change patients\' lives." — Pfizer mission', '"We will price our COVID vaccine at low cost in all lower income nations." — (Disputed by MSF data)'],
    worker_notes: 'Good pay. High turnover in manufacturing. Research staff well-compensated.',
    tax_notes: 'Ireland inversion. Effective tax rate consistently below 15% through offshore structures.',
  },
  {
    id: 'bp', name: 'BP', sector: 'energy', country: 'GB',
    logo: '🌿',
    tagline: 'Oil, gas, renewables',
    ethics: 22, worker: 50, environmental: 16, transparency: 34, tax: 28, data_privacy: 58,
    overall: 0,
    description: 'Deepwater Horizon. Net zero reversal. Known for greenwashing advertising. Coined "carbon footprint" to shift blame to consumers.',
    controversies: [
      { year: 2023, title: 'Net zero strategy gutted', desc: 'Scrapped oil reduction targets; tripled oil investment. Stock market applauded.', type: 'negative' },
      { year: 2022, title: 'Greenwashing ruling', desc: 'UK Advertising Standards Authority banned BP ads misrepresenting clean energy scale.', type: 'negative' },
      { year: 2010, title: 'Deepwater Horizon: largest accidental oil spill in history', desc: '4.9M barrels spilled. 11 workers killed. Gulf ecosystem devastation.', type: 'negative' },
      { year: 2004, title: 'Invented "personal carbon footprint" concept', desc: 'Created carbon footprint calculator to shift climate responsibility from corporations to individuals.', type: 'negative' },
    ],
    statements: ['"Beyond petroleum." — Former tagline', '"We aim to be a net zero company by 2050." — (Targets later scaled back significantly)'],
    worker_notes: 'Generally fair wages. Safety culture improved after Deepwater Horizon. Contracting model used extensively.',
    tax_notes: 'Extensive UK/Netherlands/Singapore structures. Billions in low-tax jurisdictions.',
  },
];

// Compute company overall scores
COMPANIES.forEach(c => {
  c.overall = Math.round((c.ethics + c.worker + c.environmental + c.transparency + c.tax + c.data_privacy) / 6);
});

// ── HELPERS ──
function scoreColor(score) {
  if (score >= 75) return '#22c55e';
  if (score >= 55) return '#84cc16';
  if (score >= 40) return '#f59e0b';
  if (score >= 25) return '#f97316';
  return '#ef4444';
}

function scoreGradient(score) {
  const r1 = [231,76,60], g1 = [243,156,18], g2 = [46,204,113];
  const t = Math.min(1, score / 100);
  if (t < 0.5) {
    const tt = t * 2;
    return `rgb(${Math.round(r1[0]+(g1[0]-r1[0])*tt)},${Math.round(r1[1]+(g1[1]-r1[1])*tt)},${Math.round(r1[2]+(g1[2]-r1[2])*tt)})`;
  } else {
    const tt = (t - 0.5) * 2;
    return `rgb(${Math.round(g1[0]+(g2[0]-g1[0])*tt)},${Math.round(g1[1]+(g2[1]-g1[1])*tt)},${Math.round(g1[2]+(g2[2]-g1[2])*tt)})`;
  }
}

function integrityClass(score) {
  if (score >= 65) return 'integrity-high';
  if (score >= 40) return 'integrity-med';
  return 'integrity-low';
}

window.COUNTRIES = COUNTRIES;
window.POLITICIANS = POLITICIANS;
window.COMPANIES = COMPANIES;
window.METRICS = METRICS;
window.scoreColor = scoreColor;
window.scoreGradient = scoreGradient;
window.integrityClass = integrityClass;
