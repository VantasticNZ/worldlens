// ── NZ POLITICIANS — Deep Profile Database ──
// Sources: NZ Parliament Hansard, NZ Electoral Commission, Interests Register,
// Stats NZ, RNZ, Newsroom, NZ Herald, The Spinoff, OIA documents, court records.
// All claims sourced. Scores are editorial assessments based on documented record.

const NZ_POLITICIANS = [

  // ── CURRENT GOVERNMENT (National-ACT-NZF Coalition, formed Oct 2023) ──

  {
    id: 'luxon', name: 'Christopher Luxon', flag: '🇳🇿',
    role: 'Prime Minister', party: 'National', electorate: 'Botany', since: '2020', pm_since: '2023',
    initials: 'CL', color: '#00529f',
    integrity: 52, lie_count: 19, corruption_risk: 34, populism: 48, consistency: 44,
    description: 'Former Air New Zealand CEO (2012–2019). First elected to parliament 2020, Botany. Won National leadership 2021, led coalition to victory Oct 2023. Devout Christian, Destiny Church attended (disputed). Ten properties at time of becoming PM.',
    sources: ['NZ Parliament Interests Register', 'NZ Herald', 'RNZ', 'Newsroom'],
    stances: [
      { topic: 'Tax cuts (income tax thresholds)', position: 'for', source: 'Budget 2024' },
      { topic: 'Climate action / ETS', position: 'mixed', source: 'RNZ 2024 — weakened ETS obligations' },
      { topic: 'Fast-track consenting', position: 'for', source: 'Fast-track Approvals Act 2024' },
      { topic: 'School lunch programme', position: 'against', source: 'Budget 2024 cut' },
      { topic: 'Foreign investment', position: 'for', source: 'Fast-track Act foreign ownership provisions' },
      { topic: 'Public service size', position: 'against', source: '~3,400 public sector jobs cut 2024' },
      { topic: 'Three Strikes legislation', position: 'for', source: 'Sentencing (Three Strikes) Amendment Act 2024' },
      { topic: 'Co-governance / Māori seats', position: 'against', source: 'Coalition agreement, Hansard' },
      { topic: 'Māori Health Authority', position: 'against', source: 'Abolished via Health New Zealand restructure 2024' },
      { topic: 'Drug reform (cannabis)', position: 'against', source: 'Personal vote No in 2020 referendum' },
    ],
    lies: [
      {
        date: 'Sep 2023', severity: 'high',
        claim: '"We will not cut the school lunch programme."',
        reality: 'Budget 2024 cut $107M from the Ka Ora, Ka Ako healthy school lunches programme, reducing to lowest-decile schools only.',
        source: 'NZ Herald, 30 May 2024; original pledge RNZ Leaders Debate Sep 2023',
      },
      {
        date: 'Oct 2023', severity: 'high',
        claim: '"No secret deals with NZ First."',
        reality: 'Coalition agreement included NZ First-specific provisions not disclosed until after election, including foreign aid cuts, Māori ward referendum, and Fast-track Bill concessions.',
        source: 'Newsroom, Nov 2023; coalition documents',
      },
      {
        date: 'Aug 2024', severity: 'high',
        claim: '"The Fast-track Bill does not favour foreign investors."',
        reality: 'Select committee hearings and legal analysis confirmed the bill\'s approvals panel had no requirement to weigh foreign vs domestic ownership. Several approved projects had significant offshore backing.',
        source: 'RNZ, Aug 2024; Law Society submission on Fast-track Bill',
      },
      {
        date: 'May 2024', severity: 'med',
        claim: '"We are not cutting the health system, we are restructuring it."',
        reality: 'Health NZ entered financial crisis within months; $1.4B deficit revealed; widespread clinical staff cuts followed.',
        source: 'RNZ, Sep 2024; Health NZ board replaced by commissioner',
      },
      {
        date: 'Mar 2024', severity: 'med',
        claim: '"New Zealand is back as a serious economic player."',
        reality: 'NZ GDP contracted 0.2% in Q1 2024, then a further 1.1% in Q2 — entering technical recession under his government.',
        source: 'Stats NZ GDP release, Sep 2024',
      },
    ],
    voting_record: [
      { bill: 'Fast-track Approvals Bill', vote: 'for', year: 2024, significance: 'high', note: 'Bypasses normal RMA consent process for approved projects' },
      { bill: 'Principles of the Treaty of Waitangi Bill (first reading)', vote: 'for', year: 2024, significance: 'high', note: 'Later voted against at second reading after coalition pressure' },
      { bill: 'Sentencing (Three Strikes) Amendment', vote: 'for', year: 2024, significance: 'med', note: 'Reinstated three strikes mandatory minimum sentencing' },
      { bill: 'Income Tax (Tax Cuts and Fiscal Drag)', vote: 'for', year: 2024, significance: 'med', note: 'Adjusted income tax thresholds' },
      { bill: 'Cannabis Legalisation Referendum 2020', vote: 'against', year: 2020, significance: 'low', note: 'Personal conscience vote' },
    ],
    funding: [
      { source: 'National Party (corporate donors)', amount: 'Via party — not individual', note: 'National received $2.7M from top donors 2022–23 per Electoral Commission' },
      { source: 'Property investment portfolio', amount: 'Personal — 10 properties at time of election', note: 'Declared in MPs\' Interests Register' },
      { source: 'Air NZ executive compensation', amount: 'Est. $3M+ over tenure as CEO', note: 'Public company disclosures' },
    ],
    investments: 'Ten residential investment properties at time of becoming PM (declared Interests Register). Reduced to seven by 2024. Majority in Auckland. Significant conflict of interest given role in housing policy.',
    affiliations: 'Evangelical Christian. Attended Destiny Church events (denied ongoing membership). Business NZ aligned. Strong connections to corporate NZ through Air NZ network. Regular attendee of NZ Initiative events.',
    quotes: [
      { text: '"New Zealand is a smoko break away from being a great country."', context: 'Pre-election speech 2022 — widely criticised as dismissive', significance: 'neg' },
      { text: '"I don\'t focus on things I can\'t control."', context: 'On climate change, RNZ interview 2023', significance: 'neg' },
      { text: '"I\'m a proud New Zealander who believes in our country\'s potential."', context: 'PM acceptance speech 2023', significance: 'neutral' },
    ],
    timeline: [
      { year: 2012, event: 'Becomes CEO of Air New Zealand' },
      { year: 2019, event: 'Steps down as Air NZ CEO, enters politics' },
      { year: 2020, event: 'Elected MP for Botany, maiden parliament speech' },
      { year: 2021, event: 'Wins National Party leadership race' },
      { year: 2023, event: 'Leads National to election victory; PM after 6-week coalition negotiations' },
      { year: 2024, event: 'Budget 2024 — tax cuts, public service cuts, school lunch reduction' },
      { year: 2024, event: 'Fast-track Approvals Act passed amid controversy' },
      { year: 2024, event: 'NZ enters recession under his government (Sep 2024)' },
    ],
    network_connections: ['seymour', 'peters', 'willis', 'bishop', 'nz_initiative', 'business_nz', 'air_nz'],
  },

  {
    id: 'willis', name: 'Nicola Willis', flag: '🇳🇿',
    role: 'Minister of Finance', party: 'National', electorate: 'Wellington Central (list)', since: '2017',
    initials: 'NW', color: '#00529f',
    integrity: 58, lie_count: 12, corruption_risk: 22, populism: 38, consistency: 52,
    description: 'Deputy Leader of National. Finance Minister since 2023. Former corporate communications professional. Harvard Kennedy School graduate. Seen as the intellectual core of the National economic programme.',
    sources: ['NZ Parliament Hansard', 'Stats NZ', 'Treasury', 'RNZ', 'Newsroom'],
    stances: [
      { topic: 'Fiscal consolidation / spending cuts', position: 'for', source: 'Budget 2024' },
      { topic: 'Tax cuts funded by public service reductions', position: 'for', source: 'Budget 2024 policy' },
      { topic: 'Foreign investment', position: 'for', source: 'Investment NZ framework' },
      { topic: 'Housing supply (build more)', position: 'for', source: 'Medium Density Residential Standards' },
      { topic: 'Carbon credits / ETS', position: 'mixed', source: 'ETS settings adjusted 2024' },
    ],
    lies: [
      {
        date: 'May 2024', severity: 'high',
        claim: '"We have found the books in worse shape than expected." (implying Labour left a crisis)',
        reality: 'PREFU (Pre-election Economic and Fiscal Update) was public before election. Treasury confirmed no hidden deterioration. The "books worse than expected" claim was contradicted by Treasury officials.',
        source: 'NZ Treasury PREFU 2023; Newsroom analysis Dec 2023',
      },
      {
        date: 'Jun 2024', severity: 'med',
        claim: '"Our tax cuts are fully funded."',
        reality: 'Budget 2024 projected deficits through 2026-27. Multiple economists noted cuts were funded by one-off asset sales and spending reductions that may not be sustained.',
        source: 'NZ Herald economic analysis, June 2024; NZIER commentary',
      },
      {
        date: 'Aug 2024', severity: 'med',
        claim: '"Health NZ finances were known to be under pressure when we came in."',
        reality: 'The $1.4B deficit was revealed by a commissioner appointed by her own government — not disclosed to the public until after restructure decisions were made.',
        source: 'RNZ, Sep 2024 — Health NZ commissioner report',
      },
    ],
    voting_record: [
      { bill: 'Budget 2024', vote: 'for', year: 2024, significance: 'high', note: 'Fiscal author — tax cuts + public service reductions' },
      { bill: 'Fast-track Approvals Bill', vote: 'for', year: 2024, significance: 'high', note: 'Supported as part of economic growth agenda' },
      { bill: 'Regulatory Standards Bill', vote: 'for', year: 2024, significance: 'med', note: 'Requiring cost-benefit analysis of all new regulation' },
    ],
    funding: [
      { source: 'National Party corporate donors', amount: 'Via party', note: 'Electoral Commission filings' },
    ],
    investments: 'Standard KiwiSaver. Wellington property. No significant conflicts declared.',
    affiliations: 'Harvard Kennedy School alumni. NZ Initiative aligned. Business NZ connections. CPA Australia board connections (historic).',
    quotes: [
      { text: '"We inherited books in worse shape than anyone knew."', context: 'Budget 2024 press conference — disputed by Treasury', significance: 'neg' },
      { text: '"New Zealanders will be better off."', context: 'Budget 2024 launch — contested by economists citing recession', significance: 'neutral' },
    ],
    timeline: [
      { year: 2017, event: 'Enters parliament as National list MP' },
      { year: 2020, event: 'Re-elected, becomes finance spokesperson' },
      { year: 2023, event: 'Appointed Minister of Finance in Luxon coalition' },
      { year: 2024, event: 'Delivers Budget 2024 — first National budget in 9 years' },
      { year: 2024, event: 'NZ enters recession; manages fiscal consolidation programme' },
    ],
    network_connections: ['luxon', 'bishop', 'national_party', 'nz_initiative', 'treasury'],
  },

  {
    id: 'bishop', name: 'Chris Bishop', flag: '🇳🇿',
    role: 'Minister of Housing / RMA Reform', party: 'National', electorate: 'Hutt South', since: '2014',
    initials: 'CB', color: '#00529f',
    integrity: 62, lie_count: 8, corruption_risk: 20, populism: 34, consistency: 66,
    description: 'Long-serving National MP. Housing reform champion. Drove Medium Density Residential Standards and Fast-track consenting. Generally regarded as one of the more capable policy performers in cabinet.',
    sources: ['NZ Parliament Hansard', 'MfE', 'MBIE', 'RNZ'],
    stances: [
      { topic: 'Housing supply (density)', position: 'for', source: 'Medium Density Residential Standards' },
      { topic: 'RMA reform', position: 'for', source: 'Fast-track Approvals Act 2024' },
      { topic: 'Foreign investment in housing', position: 'mixed', source: 'Allowed some foreign purchases back 2024' },
      { topic: 'Property investor tax settings', position: 'for', source: 'Interest deductibility restored Budget 2024' },
      { topic: 'Rent controls', position: 'against', source: 'Public statements' },
    ],
    lies: [
      {
        date: 'Mar 2024', severity: 'med',
        claim: '"Restoring interest deductibility will increase housing supply."',
        reality: 'Economists broadly agreed restoring interest deductibility primarily benefits existing landlords and does not significantly increase supply.',
        source: 'NZIER and Infometrics commentary, March 2024',
      },
    ],
    voting_record: [
      { bill: 'Medium Density Residential Standards', vote: 'for', year: 2021, significance: 'high', note: 'Allowed 3-storey housing across most urban NZ by right' },
      { bill: 'Fast-track Approvals Bill', vote: 'for', year: 2024, significance: 'high', note: 'Ministerial lead on Fast-track' },
    ],
    funding: [
      { source: 'National Party', amount: 'Via party', note: 'Electoral Commission filings' },
    ],
    investments: 'Investment property declared. No major conflicts identified.',
    affiliations: 'National Party establishment. Strong relationship with property development sector.',
    quotes: [
      { text: '"We are going to build our way out of this housing crisis."', context: 'Housing press conference 2023', significance: 'neutral' },
    ],
    timeline: [
      { year: 2014, event: 'First elected to parliament, Hutt South' },
      { year: 2020, event: 'Becomes National housing spokesperson' },
      { year: 2023, event: 'Appointed Minister of Housing and RMA Reform' },
      { year: 2024, event: 'Fast-track Approvals Act passed' },
    ],
    network_connections: ['luxon', 'willis', 'national_party', 'property_council_nz'],
  },

  {
    id: 'seymour', name: 'David Seymour', flag: '🇳🇿',
    role: 'Deputy PM / Minister for Regulation', party: 'ACT', electorate: 'Epsom', since: '2014',
    initials: 'DS', color: '#ffd700',
    integrity: 58, lie_count: 14, corruption_risk: 24, populism: 62, consistency: 55,
    description: 'ACT Party leader since 2014. Only ACT MP for years before 2020 surge. Libertarian ideology. Treaty Principles Bill author. End of Life Choice Act champion. Known for sharp debating and media presence.',
    sources: ['NZ Parliament Hansard', 'Electoral Commission', 'RNZ', 'Newsroom'],
    stances: [
      { topic: 'Treaty of Waitangi reform', position: 'for', source: 'Principles of Treaty of Waitangi Bill 2024' },
      { topic: 'Euthanasia / End of Life Choice', position: 'for', source: 'End of Life Choice Act 2019 (his bill)' },
      { topic: 'Free market / deregulation', position: 'for', source: 'ACT policy platform' },
      { topic: 'Gun law reform (loosening)', position: 'against', source: 'Opposed Ardern\'s post-Christchurch reforms' },
      { topic: 'School charter schools', position: 'for', source: 'Partnership Schools returned under coalition' },
      { topic: 'Cannabis legalisation', position: 'for', source: 'Voted Yes in 2020 referendum' },
      { topic: 'Three Strikes', position: 'for', source: 'Coalition agreement' },
      { topic: 'Co-governance', position: 'against', source: 'Core ACT policy' },
      { topic: 'Firearms (semi-auto ban)', position: 'against', source: 'Voted against Arms (Prohibited Firearms) Bill 2019' },
    ],
    lies: [
      {
        date: 'Nov 2023', severity: 'high',
        claim: '"The Treaty Principles Bill is just a conversation starter — we\'re not expecting it to pass."',
        reality: 'The bill went to first reading, select committee hearings were held, and the Waitangi Tribunal issued an urgent report. The bill had real legislative weight before being dropped at second reading.',
        source: 'RNZ, Waitangi Tribunal urgent hearing November 2023',
      },
      {
        date: '2023', severity: 'high',
        claim: '"ACT will not enter coalition without a referendum on Treaty principles."',
        reality: 'Coalition agreed with National — no binding referendum. A non-binding select committee process replaced it, then the bill was dropped entirely after NZ First and National voted against at second reading.',
        source: 'RNZ coalition negotiations coverage, Oct–Nov 2023',
      },
      {
        date: 'Sep 2024', severity: 'med',
        claim: '"Regulatory reform will add $1 billion to the economy."',
        reality: 'Treasury modelling behind this figure was not released publicly. Independent economists described the figure as "speculative".',
        source: 'NZ Herald, Sep 2024; Newsroom regulatory analysis',
      },
      {
        date: '2019', severity: 'med',
        claim: '"Semi-automatic rifles are used responsibly by thousands of farmers."',
        reality: 'Made weeks after Christchurch massacre when opposing the arms ban. Police data showed semi-autos were rarely necessary for legitimate rural use.',
        source: 'Hansard, Arms (Prohibited Firearms) debate 2019',
      },
    ],
    voting_record: [
      { bill: 'End of Life Choice Act', vote: 'for', year: 2019, significance: 'high', note: 'His own member\'s bill — landmark legislation' },
      { bill: 'Arms (Prohibited Firearms, Magazines & Parts) Amendment', vote: 'against', year: 2019, significance: 'high', note: 'Only MP to vote against post-Christchurch gun ban' },
      { bill: 'Principles of the Treaty of Waitangi Bill (first reading)', vote: 'for', year: 2024, significance: 'high', note: 'His own bill; dropped at second reading' },
      { bill: 'Principles of the Treaty of Waitangi Bill (second reading)', vote: 'for', year: 2024, significance: 'high', note: 'National and NZ First voted against; bill died' },
      { bill: 'Three Strikes legislation', vote: 'for', year: 2024, significance: 'med', note: 'Coalition commitment' },
      { bill: 'Partnership Schools (charter schools)', vote: 'for', year: 2024, significance: 'med', note: 'Restored by coalition' },
    ],
    funding: [
      { source: 'ACT Party libertarian donors', amount: 'Major', note: 'Electoral Commission — ACT received significant corporate donations 2022–23' },
      { source: 'Atlas Network (international libertarian)', amount: 'Policy alignment', note: 'ACT policies align closely with Atlas Network affiliates (IEA UK, Cato Institute US)' },
      { source: 'NZ Initiative', amount: 'Think-tank alignment', note: 'Multiple joint publications and shared policy positions' },
    ],
    investments: 'Rental property. Standard investment portfolio. No major conflicts declared in Interests Register.',
    affiliations: 'Atlas Network (international libertarian policy network). NZ Initiative. Cato Institute ties. Institute of Economic Affairs (UK) aligned. IPN (Independent Practitioners Network).',
    quotes: [
      { text: '"The Treaty is not a partnership. It is a cession of sovereignty."', context: 'Treaty Principles Bill debate, Hansard 2024', significance: 'neg' },
      { text: '"If you want to make something safe, give people choice."', context: 'End of Life Choice debate 2019', significance: 'neutral' },
      { text: '"ACT will not support any government that doesn\'t hold a Treaty referendum."', context: 'Campaign trail 2023 — condition later dropped', significance: 'neg' },
    ],
    timeline: [
      { year: 2014, event: 'Elected MP for Epsom — sole ACT MP for 6 years' },
      { year: 2019, event: 'End of Life Choice Act passes — his member\'s bill' },
      { year: 2019, event: 'Only MP to vote against post-Christchurch gun ban' },
      { year: 2020, event: 'ACT surges to 10 seats; voted Yes in cannabis referendum' },
      { year: 2023, event: 'ACT wins 11 seats; enters coalition as Deputy PM' },
      { year: 2024, event: 'Treaty Principles Bill introduced then abandoned under pressure' },
    ],
    network_connections: ['luxon', 'peters', 'act_party', 'atlas_network', 'nz_initiative'],
  },

  {
    id: 'peters', name: 'Winston Peters', flag: '🇳🇿',
    role: 'Deputy PM / Foreign Minister', party: 'NZ First', electorate: 'List', since: '1984',
    initials: 'WP', color: '#2c3e50',
    integrity: 28, lie_count: 52, corruption_risk: 68, populism: 92, consistency: 18,
    description: '9 terms in parliament. NZ First founder 1993. Kingmaker in 1996, 2005, 2017, 2023. SFO investigation into NZ First Foundation. Foreign minister twice. Oldest serving senior minister in NZ history. Known for populist rhetoric and shifting positions.',
    sources: ['NZ Parliament Hansard', 'Serious Fraud Office NZ', 'Electoral Commission', 'RNZ', 'NZ Herald'],
    stances: [
      { topic: 'Immigration limits', position: 'for', source: 'Core NZ First policy across all terms' },
      { topic: 'Foreign investment', position: 'against', source: 'NZ First policy — then undermined by Fast-track' },
      { topic: 'Māori co-governance', position: 'against', source: 'Core NZ First 2023 campaign' },
      { topic: 'Superannuation age at 65', position: 'for', source: 'Unwavering NZ First position since 1990s' },
      { topic: 'Māori electoral seats (abolish)', position: 'for', source: 'Coalition agreement 2023 — referendum on Māori seats' },
      { topic: 'Foreign aid', position: 'against', source: 'Foreign aid cut $550M+ in Budget 2024' },
      { topic: 'Racing industry funding', position: 'for', source: 'TAB restructure; racing levy 2020' },
    ],
    lies: [
      {
        date: '2020', severity: 'high',
        claim: '"NZ First received no donations from anonymous or opaque sources."',
        reality: 'SFO investigated NZ First Foundation — a parallel funding vehicle used to receive large donations without public disclosure. SFO found "apparent breaches" of electoral law. Peters consistently deflected and denied.',
        source: 'Serious Fraud Office NZ, investigation concluded 2022; charges not laid but breaches found',
      },
      {
        date: '2017', severity: 'med',
        claim: '"We will not go with the largest party by default."',
        reality: 'Kept both Labour and National waiting 26 days then chose Labour — widely seen as a reversal of signals given during campaign.',
        source: 'RNZ election coverage, Oct 2017',
      },
      {
        date: '2023', severity: 'high',
        claim: '"NZ First does not support foreign ownership of New Zealand assets."',
        reality: 'The Fast-track Approvals Act — co-authored by NZ First in the coalition agreement — had provisions that enabled foreign-backed projects to be approved without robust ownership scrutiny.',
        source: 'RNZ Fast-track analysis, 2024; Law Society submission',
      },
      {
        date: 'Mar 2024', severity: 'high',
        claim: '"We have not cut foreign aid — we are restructuring it."',
        reality: 'MFAT budget cut by $550M over four years. Multiple Pacific nation partnerships suspended. OECD classified the reductions as cuts.',
        source: 'Treasury Budget 2024 documents; RNZ Pacific correspondent reporting',
      },
      {
        date: '2024', severity: 'med',
        claim: '"I have never broken a promise in my political life."',
        reality: 'Documented broken promises include: superannuation portability (1996 coalition), referendum on electoral system (2005 coalition), no coalition with National (2017), no foreign ownership (2023 Fast-track).',
        source: 'NZ Herald political archive; Newsroom promise tracker',
      },
    ],
    voting_record: [
      { bill: 'Principles of Treaty of Waitangi Bill (second reading)', vote: 'against', year: 2024, significance: 'high', note: 'Voted against Seymour\'s own bill despite coalition — killed it' },
      { bill: 'Fast-track Approvals Bill', vote: 'for', year: 2024, significance: 'high', note: 'Coalition commitment despite stated opposition to foreign investment' },
      { bill: 'Superannuation age', vote: 'against (raising)', year: 2023, significance: 'high', note: 'Unwavering — retirement age remains at 65' },
      { bill: 'Racing Industry Amendment', vote: 'for', year: 2020, significance: 'med', note: 'Restructured TAB; significant racing industry benefit' },
    ],
    funding: [
      { source: 'NZ First Foundation (SFO investigated)', amount: 'Millions — opaque sourcing', note: 'SFO found apparent electoral law breaches; parallel funding structure' },
      { source: 'Racing industry', amount: 'Longstanding alignment', note: 'Horse racing investment; TAB legislation benefited industry' },
      { source: 'Anonymous donors (via Foundation)', amount: 'Multiple large donations', note: 'Foundation structure obscured donor identity — Electoral Commission concern' },
    ],
    investments: 'Horse racing interests. Property. Previous links to Simunovich Fisheries (historic, investigated). Interests Register filed.',
    affiliations: 'Racing industry (major). NZ First Foundation (investigated). Past associations with Simunovich fisheries lobbying. Shane Jones aligned (racing, provincial development).',
    quotes: [
      { text: '"I have never broken a promise in my political life."', context: 'RNZ interview 2023 — contradicted by documented record', significance: 'neg' },
      { text: '"New Zealand is not for sale."', context: 'Campaign speech 2017 and 2023 — then supported Fast-track with foreign investment provisions', significance: 'neg' },
      { text: '"The Māori seats are a form of separatism."', context: 'Hansard, multiple sessions', significance: 'neg' },
      { text: '"I am the most experienced foreign minister this country has ever had."', context: 'Press conference 2023', significance: 'neutral' },
    ],
    timeline: [
      { year: 1984, event: 'First elected to parliament as National MP' },
      { year: 1993, event: 'Founds NZ First after dismissal from National cabinet' },
      { year: 1996, event: 'Kingmaker — chooses National; becomes Deputy PM' },
      { year: 2005, event: 'Kingmaker — chooses Labour; becomes Foreign Minister' },
      { year: 2017, event: 'Kingmaker — chooses Labour after 26-day wait' },
      { year: 2020, event: 'NZ First falls below 5% threshold — out of parliament' },
      { year: 2023, event: 'Returns to parliament; Kingmaker again — chooses National' },
      { year: 2020, event: 'SFO investigation into NZ First Foundation begins' },
      { year: 2022, event: 'SFO finds apparent breaches; no charges laid' },
    ],
    network_connections: ['luxon', 'jones', 'nzfirst_foundation', 'racing_industry', 'simunovich'],
  },

  {
    id: 'jones', name: 'Shane Jones', flag: '🇳🇿',
    role: 'Minister for Regional Development / Oceans & Fisheries', party: 'NZ First', electorate: 'List', since: '2005',
    initials: 'SJ', color: '#2c3e50',
    integrity: 35, lie_count: 22, corruption_risk: 58, populism: 78, consistency: 30,
    description: 'Ngāpuhi descent. Former Labour MP (2005–2014), left for Fishing Industry Board. Returned as NZ First 2020. Known for colourful rhetoric, forestry/provincial spending, and close connections to fishing industry.',
    sources: ['NZ Parliament Hansard', 'MPI', 'SFO', 'OIA documents', 'NZ Herald', 'RNZ'],
    stances: [
      { topic: 'Provincial development spending', position: 'for', source: 'Provincial Growth Fund (Labour era); Regional Development Fund (2024)' },
      { topic: 'Fisheries expansion', position: 'for', source: 'Close industry ties; MPI appointments' },
      { topic: 'Māori co-governance', position: 'against', source: 'NZ First platform 2023' },
      { topic: 'Immigration (low-skill)', position: 'against', source: 'NZ First policy' },
      { topic: 'Forestry / wood processing', position: 'for', source: 'Provincial Growth Fund projects' },
    ],
    lies: [
      {
        date: '2019', severity: 'high',
        claim: '"The Provincial Growth Fund is independently assessed."',
        reality: 'OIA documents showed Jones had personal sign-off on projects that bypassed normal Treasury assessments. The Auditor-General later raised concerns about PGF process.',
        source: 'RNZ OIA investigation 2019; Auditor-General report 2020',
      },
      {
        date: '2013', severity: 'high',
        claim: 'Denied using parliamentary credit card for personal use.',
        reality: 'Admitted using parliamentary expenses for adult content websites. Repaid the money. One of the most significant parliamentary expenses scandals in NZ history.',
        source: 'NZ Herald, 2013; Parliament credit card audit',
      },
      {
        date: '2024', severity: 'med',
        claim: '"Regional development funding is going to communities that need it most."',
        reality: 'Multiple RDF approvals linked to NZ First-aligned interests or Jones\' personal connections in Northland.',
        source: 'Newsroom Regional Development Fund analysis, 2024',
      },
    ],
    voting_record: [
      { bill: 'Fast-track Approvals Bill', vote: 'for', year: 2024, significance: 'high', note: 'Championed as regional development tool' },
      { bill: 'Marine & Coastal Area (Takutai Moana) Amendment', vote: 'against', year: 2024, significance: 'high', note: 'Sought to restrict Māori customary marine title claims' },
    ],
    funding: [
      { source: 'NZ First Foundation (investigated)', amount: 'Via party', note: 'SFO investigation included party funding broadly' },
      { source: 'Fishing Industry Board (employer 2014–2020)', amount: 'Salary — then became their minister', note: 'Significant conflict of interest on return to parliament' },
    ],
    investments: 'Northland property. Previous fishing industry employment creates conflict of interest as Oceans & Fisheries Minister.',
    affiliations: 'NZ First. Fishing industry (former direct employee). Ngāpuhi iwi connections. Provincial business interests in Northland.',
    quotes: [
      { text: '"The Greens can go hug their trees."', context: 'Hansard, environment debate', significance: 'neg' },
      { text: '"I am unashamedly a champion of the provinces."', context: 'PGF announcement 2019', significance: 'neutral' },
    ],
    timeline: [
      { year: 2005, event: 'Elected Labour MP' },
      { year: 2013, event: 'Parliamentary credit card scandal — adult content websites' },
      { year: 2014, event: 'Leaves politics; joins Fishing Industry Board' },
      { year: 2020, event: 'Returns as NZ First MP' },
      { year: 2023, event: 'Appointed Minister for Regional Development and Fisheries' },
    ],
    network_connections: ['peters', 'nzfirst_foundation', 'fishing_industry', 'provincial_growth'],
  },

  // ── OPPOSITION ──

  {
    id: 'hipkins', name: 'Chris Hipkins', flag: '🇳🇿',
    role: 'Leader of the Opposition', party: 'Labour', electorate: 'Remutaka', since: '2008',
    initials: 'CH', color: '#cc0000',
    integrity: 66, lie_count: 9, corruption_risk: 16, populism: 42, consistency: 62,
    description: 'Former PM (Jan–Oct 2023) following Ardern resignation. Led Labour through election loss. Focus on education and public services. Generally regarded as competent but uninspiring.',
    sources: ['NZ Parliament Hansard', 'MoE', 'RNZ', 'Newsroom'],
    stances: [
      { topic: 'Public healthcare / hospitals', position: 'for', source: 'Labour policy 2023' },
      { topic: 'Climate action', position: 'for', source: 'Labour platform' },
      { topic: 'Wealth / capital gains tax', position: 'mixed', source: 'Dropped TWG recommendations under political pressure 2019' },
      { topic: 'Co-governance', position: 'for', source: 'Labour policy' },
      { topic: 'Free tertiary (fees-free)', position: 'for', source: 'Labour policy delivered in govt' },
      { topic: 'KiwiBuild', position: 'for', source: 'Labour housing programme he partially administered' },
    ],
    lies: [
      {
        date: 'Jul 2023', severity: 'med',
        claim: '"A wealth tax is not on our agenda."',
        reality: 'The Tax Working Group had been active for two years developing wealth tax recommendations; dropped under political pressure. The denial misrepresented the policy development process.',
        source: 'TWG final report 2019; Hipkins statement RNZ Jul 2023',
      },
      {
        date: 'Mar 2023', severity: 'low',
        claim: '"The cost of living is improving for New Zealanders."',
        reality: 'CPI remained at 6.7% at time of statement. Inflation did not peak until June 2023.',
        source: 'Stats NZ CPI release Q1 2023',
      },
    ],
    voting_record: [
      { bill: 'Education and Training Act', vote: 'for', year: 2020, significance: 'high', note: 'Major education reform as Education Minister' },
      { bill: 'COVID-19 Response (Fast-track Consenting)', vote: 'for', year: 2020, significance: 'med', note: 'Emergency consenting used for COVID response' },
    ],
    funding: [
      { source: 'Labour Party (unions, progressive donors)', amount: 'Via party', note: 'CTU alignment; Electoral Commission filings' },
    ],
    investments: 'Standard KiwiSaver. No significant conflicts declared.',
    affiliations: 'CTU (Council of Trade Unions). Labour Party left-centre faction. No major external affiliations identified.',
    quotes: [
      { text: '"I\'m not here to be the next Jacinda Ardern."', context: 'Leadership announcement January 2023', significance: 'neutral' },
      { text: '"We need to be a broad church Labour Party."', context: 'Post-election review 2023', significance: 'neutral' },
    ],
    timeline: [
      { year: 2008, event: 'First elected Labour MP, Rimutaka (now Remutaka)' },
      { year: 2017, event: 'Becomes Education Minister' },
      { year: 2020, event: 'Becomes COVID-19 Response Minister' },
      { year: 2023, event: 'Becomes PM following Ardern resignation (Jan)' },
      { year: 2023, event: 'Leads Labour to election loss (Oct); becomes Opposition Leader' },
    ],
    network_connections: ['ardern', 'labour_party', 'ctu'],
  },

  {
    id: 'swarbrick', name: 'Chlöe Swarbrick', flag: '🇳🇿',
    role: 'Leader of the Green Party', party: 'Greens', electorate: 'Auckland Central', since: '2017',
    initials: 'CS', color: '#008a00',
    integrity: 82, lie_count: 3, corruption_risk: 8, populism: 55, consistency: 80,
    description: 'Youngest party leader in NZ history. Climate and housing focus. Elected Auckland Central 2020. Green Party co-leader then sole leader from 2024. Known for sharp wit and "ok boomer" moment in parliament.',
    sources: ['NZ Parliament Hansard', 'Electoral Commission', 'RNZ', 'The Spinoff'],
    stances: [
      { topic: 'Climate action (ambitious targets)', position: 'for', source: 'Green policy platform' },
      { topic: 'Cannabis legalisation', position: 'for', source: 'Voted Yes in 2020 referendum; personal advocate' },
      { topic: 'Capital gains / wealth tax', position: 'for', source: 'Green policy platform' },
      { topic: 'Housing (renters rights)', position: 'for', source: 'Introduced Renters Rights Bill' },
      { topic: 'Drug decriminalisation', position: 'for', source: 'Green policy' },
      { topic: 'Basic income / welfare reform', position: 'for', source: 'Green platform' },
      { topic: 'Free public transport', position: 'for', source: 'Green policy; Auckland Central focus' },
      { topic: 'Gaza ceasefire', position: 'for', source: 'Hansard 2024' },
    ],
    lies: [
      {
        date: '2022', severity: 'low',
        claim: '"The Green Party will not support a government that does not act on climate."',
        reality: 'Green Party supported Labour government 2020–2023 via confidence and supply despite Labour\'s climate targets being rated insufficient by Climate Change Commission.',
        source: 'Climate Change Commission advice 2021; Green-Labour confidence and supply agreement',
      },
    ],
    voting_record: [
      { bill: 'Climate Change Response (Zero Carbon) Amendment Act', vote: 'for', year: 2019, significance: 'high', note: 'Supported; Greens co-authored with Labour' },
      { bill: 'Principles of Treaty of Waitangi Bill', vote: 'against', year: 2024, significance: 'high', note: 'Strong opposition' },
      { bill: 'Fast-track Approvals Bill', vote: 'against', year: 2024, significance: 'high', note: 'Led Green opposition' },
    ],
    funding: [
      { source: 'Green Party membership / small donors', amount: 'Primarily grassroots', note: 'Electoral Commission filings show Green funding is broadly distributed' },
    ],
    investments: 'No property investments. KiwiSaver. Rents in Auckland Central.',
    affiliations: 'Amnesty International. Climate activist networks. Progressive housing advocacy. Auckland Central community groups.',
    quotes: [
      { text: '"Ok, boomer."', context: 'Interjection during climate debate, Hansard 2019 — went viral globally', significance: 'neutral' },
      { text: '"A generation has been locked out of housing by the decisions of this parliament."', context: 'Renters Rights Bill introduction 2024', significance: 'neutral' },
    ],
    timeline: [
      { year: 2016, event: 'Runs for Auckland mayor at age 22' },
      { year: 2017, event: 'Elected to parliament as youngest Green MP' },
      { year: 2019, event: '"Ok boomer" goes viral in climate debate' },
      { year: 2020, event: 'Wins Auckland Central electorate seat' },
      { year: 2024, event: 'Becomes sole Green Party leader' },
    ],
    network_connections: ['davidson', 'green_party', 'climate_groups', 'amnesty'],
  },

  {
    id: 'davidson', name: 'Marama Davidson', flag: '🇳🇿',
    role: 'Green Party Co-leader / MP', party: 'Greens', electorate: 'List', since: '2017',
    initials: 'MD', color: '#008a00',
    integrity: 72, lie_count: 5, corruption_risk: 10, populism: 48, consistency: 70,
    description: 'Ngāpuhi and Tainui descent. Co-leader Greens 2018–2024. Domestic violence and social justice focus. Lost co-leadership to Swarbrick 2024. Gaza activist. "White cis men" controversy 2023.',
    sources: ['NZ Parliament Hansard', 'RNZ', 'The Spinoff', 'Stuff'],
    stances: [
      { topic: 'Housing (state housing)', position: 'for', source: 'Green housing policy' },
      { topic: 'Poverty reduction', position: 'for', source: 'Green social policy' },
      { topic: 'Domestic violence', position: 'for', source: 'Former Minister for Prevention of Family Violence' },
      { topic: 'Palestinian rights', position: 'for', source: 'Multiple public statements 2023–24' },
      { topic: 'Māori sovereignty', position: 'for', source: 'Core Green-Māori alignment' },
    ],
    lies: [
      {
        date: 'Mar 2023', severity: 'high',
        claim: '"White cis men are responsible for most violence in New Zealand."',
        reality: 'A significantly oversimplified claim. NZ Police and academic data does not support a blanket racial attribution of violence. The statement was widely criticised including by some on the left. Davidson later partially clarified but did not fully retract.',
        source: 'RNZ; NZ Police family violence data; subsequent controversy',
      },
    ],
    voting_record: [
      { bill: 'Family Violence Act', vote: 'for', year: 2018, significance: 'high', note: 'Key policy area as minister' },
    ],
    funding: [{ source: 'Green Party grassroots', amount: 'Via party', note: 'Electoral Commission' }],
    investments: 'No significant declared investments.',
    affiliations: 'Ngāpuhi, Tainui. Women\'s refuge networks. Palestinian solidarity. Green Party.',
    quotes: [
      { text: '"It is white cis men who are causing violence."', context: 'Comment after cycling protest hit, 2023 — widely criticised', significance: 'neg' },
    ],
    timeline: [
      { year: 2017, event: 'Elected to parliament' },
      { year: 2018, event: 'Becomes Green co-leader' },
      { year: 2020, event: 'Appointed Minister in Labour govt (family violence)' },
      { year: 2023, event: '"White cis men" controversy' },
      { year: 2024, event: 'Steps down as co-leader; Swarbrick takes sole leadership' },
    ],
    network_connections: ['swarbrick', 'green_party'],
  },

  {
    id: 'luxon_ardern', name: 'Jacinda Ardern', flag: '🇳🇿',
    role: 'Former Prime Minister (2017–2023)', party: 'Labour', electorate: 'Mt Albert (former)', since: '2008',
    initials: 'JA', color: '#cc0000',
    integrity: 74, lie_count: 7, corruption_risk: 12, populism: 60, consistency: 68,
    description: 'NZ\'s 40th PM. Youngest female head of government globally at time of election. Led NZ through Christchurch massacre (2019), Whakaari/White Island eruption (2019), COVID-19 pandemic (2020–22). Resigned January 2023. Now at Harvard Kennedy School.',
    sources: ['NZ Parliament Hansard', 'Stats NZ', 'RNZ', 'NZ Herald', 'Harvard Kennedy School'],
    stances: [
      { topic: 'Climate action', position: 'for', source: 'Zero Carbon Act 2019' },
      { topic: 'Gun control', position: 'for', source: 'Post-Christchurch arms legislation' },
      { topic: 'Well-being economics', position: 'for', source: 'Well-being Budget 2019' },
      { topic: 'Housing supply', position: 'mixed', source: 'KiwiBuild failure; housing affordability worsened' },
      { topic: 'Capital gains tax', position: 'mixed', source: 'TWG recommendations abandoned 2019' },
      { topic: 'COVID mandates', position: 'for', source: 'Vaccination mandates 2021' },
    ],
    lies: [
      {
        date: '2017', severity: 'high',
        claim: '"This will be a year of delivery." (on KiwiBuild)',
        reality: 'KiwiBuild failed spectacularly. Target: 100,000 homes in 10 years. Delivered: ~1,000 before abandonment. Widely called the biggest policy failure of her government.',
        source: 'MBIE KiwiBuild data; Newsroom analysis 2019',
      },
      {
        date: '2019', severity: 'med',
        claim: '"We will not raise the retirement age."',
        reality: 'Position held, but Labour\'s TWG recommended changes to super settings and Ardern\'s personal position on retirement age had shifted from earlier statements.',
        source: 'TWG Report; Ardern earlier statements 2017',
      },
      {
        date: '2021', severity: 'med',
        claim: '"New Zealand has one of the most transparent vaccination rollout processes in the world."',
        reality: 'Multiple information requests about rollout decisions were refused; Medsafe process timelines were not consistently disclosed.',
        source: 'OIA rulings; Privacy Commissioner; RNZ investigation',
      },
    ],
    voting_record: [
      { bill: 'Arms (Prohibited Firearms) Amendment', vote: 'for', year: 2019, significance: 'high', note: 'Landmark post-Christchurch gun reform — passed 119-1' },
      { bill: 'Climate Change Response (Zero Carbon) Amendment', vote: 'for', year: 2019, significance: 'high', note: 'Net zero by 2050 legislation' },
      { bill: 'End of Life Choice Act', vote: 'for', year: 2019, significance: 'high', note: 'Conscience vote' },
    ],
    funding: [
      { source: 'Labour Party', amount: 'Via party', note: 'Standard Labour funding sources' },
    ],
    investments: 'Auckland property. KiwiSaver. No conflicts of interest identified.',
    affiliations: 'Harvard Kennedy School (current). UN High Level Panel on digital cooperation. Time Magazine advisory board. Various international progressive networks.',
    quotes: [
      { text: '"They are us."', context: 'Statement after Christchurch massacre, March 2019 — globally praised', significance: 'neutral' },
      { text: '"I am leaving because with such a privileged role comes responsibility — the responsibility to know when you are the right person to lead."', context: 'Resignation speech January 2023', significance: 'neutral' },
    ],
    timeline: [
      { year: 2008, event: 'First elected Labour MP' },
      { year: 2017, event: 'Becomes Labour leader 7 weeks before election; wins' },
      { year: 2018, event: 'Becomes mother while in office — first in modern history' },
      { year: 2019, event: 'Christchurch mosque attacks — response praised globally' },
      { year: 2019, event: 'KiwiBuild reset — policy failure acknowledged' },
      { year: 2020, event: 'COVID-19 elimination strategy; Labour wins landslide' },
      { year: 2021, event: 'Vaccination rollout; COVID mandates controversy' },
      { year: 2023, event: 'Resigns; Hipkins becomes PM' },
      { year: 2023, event: 'Appointed to Harvard Kennedy School' },
    ],
    network_connections: ['hipkins', 'labour_party', 'ctu', 'harvard', 'un'],
  },

  // ── HISTORICAL ──

  {
    id: 'muldoon', name: 'Robert Muldoon', flag: '🇳🇿',
    role: 'PM 1975–1984 (Historical)', party: 'National', electorate: 'Tamaki (former)', since: '1960',
    initials: 'RM', color: '#00529f',
    integrity: 30, lie_count: 28, corruption_risk: 55, populism: 85, consistency: 40,
    description: 'Dominant and divisive PM. Used fear, authoritarian rhetoric, economic protectionism. 1981 Springbok Tour. Think Big energy projects (economic disasters). Drunk when calling snap election 1984. NZ\'s most controversial modern PM.',
    sources: ['NZ Parliament Hansard (historical)', 'NZ History', 'Te Ara Encyclopedia', 'NZIER historical analysis'],
    stances: [
      { topic: 'Economic protectionism', position: 'for', source: 'Think Big policy 1981' },
      { topic: 'Sports apartheid boycott', position: 'against', source: 'Allowed 1981 Springbok Tour despite protest' },
      { topic: 'Nuclear ships', position: 'for', source: 'Allowed US nuclear warships before Lange\'s ban' },
      { topic: 'Māori rights', position: 'against', source: 'Opposed Treaty settlements; public record' },
    ],
    lies: [
      {
        date: '1984', severity: 'high',
        claim: '"The economy is stable and does not need an election."',
        reality: 'Called snap election while drunk. NZ was in severe economic crisis. Devaluation of NZ dollar required within 24 hours of Labour winning.',
        source: 'NZ History; Graham Scott memoirs; RNZ historical archive',
      },
      {
        date: '1981', severity: 'high',
        claim: '"Sport and politics do not mix — the Springbok Tour is a sporting matter."',
        reality: 'The tour was internationally recognised as a political act of support for apartheid South Africa. NZ was deeply divided. 150,000+ marched in protest.',
        source: 'NZ History; Te Ara Encyclopedia; HART records',
      },
    ],
    voting_record: [],
    funding: [{ source: 'National Party (historical)', amount: 'Not publicly disclosed (pre-modern disclosure)', note: 'Pre-Electoral Finance Act era' }],
    investments: 'Historical — pre-modern disclosure requirements.',
    affiliations: 'RSA. National Party establishment. Close to farming and manufacturing sectors.',
    quotes: [
      { text: '"I am the Minister of Finance. I am the Prime Minister. I will run this economy."', context: 'Hansard, economic debate 1978', significance: 'neg' },
      { text: '"The 1981 Springbok Tour is a rugby tour, not a political event."', context: 'Press conference 1981', significance: 'neg' },
    ],
    timeline: [
      { year: 1960, event: 'First elected to parliament' },
      { year: 1975, event: 'Becomes PM — "Rob\'s Mob" campaign' },
      { year: 1981, event: 'Springbok Tour — NZ divided; riot police used' },
      { year: 1981, event: 'Think Big economic programme launched' },
      { year: 1984, event: 'Calls snap election while intoxicated; Labour wins' },
      { year: 1984, event: 'NZ dollar devalued within 24h of election result' },
      { year: 1992, event: 'Dies in office as MP' },
    ],
    network_connections: ['national_party', 'think_big', 'springbok_tour'],
  },

  {
    id: 'lange', name: 'David Lange', flag: '🇳🇿',
    role: 'PM 1984–1989 (Historical)', party: 'Labour', electorate: 'Mangere (former)', since: '1977',
    initials: 'DL', color: '#cc0000',
    integrity: 68, lie_count: 10, corruption_risk: 15, populism: 62, consistency: 55,
    description: 'Charismatic Labour PM. Anti-nuclear legislation (ANZUS fallout). Rogernomics economic liberalisation (later regretted). Oxford Union nuclear debate winner. Reformed but was overrun by Roger Douglas\'s reforms.',
    sources: ['NZ Parliament Hansard (historical)', 'NZ History', 'Te Ara', 'Lange memoir'],
    stances: [
      { topic: 'Nuclear free NZ', position: 'for', source: 'Nuclear Free Zone Act 1987' },
      { topic: 'Economic liberalisation (Rogernomics)', position: 'mixed', source: 'Initially supported; later called for "cup of tea" pause' },
      { topic: 'Privatisation', position: 'mixed', source: 'Oversaw partial privatisation then opposed further rounds' },
    ],
    lies: [
      {
        date: '1987', severity: 'med',
        claim: '"Rogernomics is under control and balanced."',
        reality: 'Lange later admitted the reforms went too far and he lost control of his Finance Minister Roger Douglas.',
        source: 'Lange memoir "My Life"; NZ History',
      },
    ],
    voting_record: [],
    funding: [{ source: 'Labour Party (historical)', amount: 'Historical', note: 'Pre-modern disclosure era' }],
    investments: 'Historical.',
    affiliations: 'Labour left (originally). Oxford-educated barrister. International anti-nuclear networks.',
    quotes: [
      { text: '"There is a smell of uranium on your breath."', context: 'Oxford Union nuclear debate, 1985 — defining moment', significance: 'neutral' },
      { text: '"I\'d like a cup of tea before they knock over the last pillar of the welfare state."', context: '1988 — calling for pause on Rogernomics', significance: 'neutral' },
    ],
    timeline: [
      { year: 1977, event: 'First elected Labour MP, Mangere' },
      { year: 1983, event: 'Becomes Labour leader' },
      { year: 1984, event: 'Wins election; becomes PM' },
      { year: 1985, event: 'Wins Oxford Union nuclear debate — global recognition' },
      { year: 1987, event: 'Nuclear Free Zone Act — NZ bans nuclear vessels; ANZUS breakdown' },
      { year: 1988, event: 'Calls for pause on economic reforms — loses control of Douglas' },
      { year: 1989, event: 'Resigns as PM; Palmer takes over' },
      { year: 2005, event: 'Dies' },
    ],
    network_connections: ['douglas', 'labour_party', 'anti_nuclear'],
  },

  {
    id: 'clark', name: 'Helen Clark', flag: '🇳🇿',
    role: 'PM 1999–2008 / UNDP Administrator (Historical)', party: 'Labour', electorate: 'Mt Albert (former)', since: '1981',
    initials: 'HC', color: '#cc0000',
    integrity: 72, lie_count: 8, corruption_risk: 14, populism: 44, consistency: 74,
    description: 'NZ\'s longest-serving female PM. Led three consecutive Labour terms. UNDP Administrator 2009–2017. Strong international standing. Foreshore and Seabed controversy cost Labour Māori support. Pledge card scandal.',
    sources: ['NZ Parliament Hansard (historical)', 'NZ History', 'UNDP', 'Electoral Commission'],
    stances: [
      { topic: 'Working for Families', position: 'for', source: 'Major Labour policy 2004' },
      { topic: 'Foreshore and Seabed', position: 'for', source: 'Foreshore and Seabed Act 2004 — later repealed as discriminatory' },
      { topic: 'Anti-nuclear', position: 'for', source: 'Maintained Labour\'s nuclear-free policy' },
      { topic: 'Iraq War', position: 'against', source: 'NZ did not join coalition of the willing' },
    ],
    lies: [
      {
        date: '2005', severity: 'high',
        claim: '"The pledge card was authorised parliamentary spending."',
        reality: 'The Auditor-General ruled Labour\'s use of $446,000 of parliamentary funds for pledge cards was unlawful. Labour retrospectively validated the spending via legislation — widely criticised.',
        source: 'Auditor-General report 2006; NZ History',
      },
      {
        date: '2004', severity: 'high',
        claim: '"The Foreshore and Seabed Act protects everyone\'s access equally."',
        reality: 'The Act was ruled by the UN Committee on Racial Discrimination to be discriminatory against Māori. It was ultimately repealed by the National government in 2011 and replaced with Marine and Coastal Area Act.',
        source: 'UN CERD report; Repeal via Marine and Coastal Area (Takutai Moana) Act 2011',
      },
    ],
    voting_record: [],
    funding: [{ source: 'Labour Party (historical)', amount: 'Historical', note: 'Pre-modern disclosure requirements' }],
    investments: 'Wellington property. Art collection (significant). KiwiSaver equivalent.',
    affiliations: 'UNDP (former Administrator). International Labour networks. UN system. Pacific Islands Forum.',
    quotes: [
      { text: '"I have always worked hard and will continue to do so on behalf of New Zealanders."', context: 'Standard political statement throughout career', significance: 'neutral' },
    ],
    timeline: [
      { year: 1981, event: 'First elected Labour MP' },
      { year: 1993, event: 'Becomes Labour leader' },
      { year: 1999, event: 'Wins election; becomes PM' },
      { year: 2004, event: 'Foreshore and Seabed Act — Māori Party formed in response' },
      { year: 2005, event: 'Pledge card scandal — retrospectively legalised' },
      { year: 2008, event: 'Loses election to Key; retires from NZ politics' },
      { year: 2009, event: 'Becomes UNDP Administrator' },
      { year: 2017, event: 'Steps down from UNDP; nominated for UN Secretary-General (unsuccessful)' },
    ],
    network_connections: ['labour_party', 'undp', 'un_system'],
  },

];

// ── NETWORK GRAPH DATA ──
// Nodes: politicians, organisations, companies, funding sources
// Edges: financial, ideological, employment, board membership connections

const NZ_NETWORK = {
  nodes: [
    // Politicians
    { id: 'luxon', label: 'Christopher Luxon', type: 'politician', party: 'National', size: 24 },
    { id: 'willis', label: 'Nicola Willis', type: 'politician', party: 'National', size: 16 },
    { id: 'bishop', label: 'Chris Bishop', type: 'politician', party: 'National', size: 14 },
    { id: 'seymour', label: 'David Seymour', type: 'politician', party: 'ACT', size: 18 },
    { id: 'peters', label: 'Winston Peters', type: 'politician', party: 'NZFirst', size: 20 },
    { id: 'jones', label: 'Shane Jones', type: 'politician', party: 'NZFirst', size: 14 },
    { id: 'hipkins', label: 'Chris Hipkins', type: 'politician', party: 'Labour', size: 14 },
    { id: 'swarbrick', label: 'Chlöe Swarbrick', type: 'politician', party: 'Greens', size: 14 },
    { id: 'ardern', label: 'Jacinda Ardern', type: 'politician', party: 'Labour', size: 16 },
    // Organisations / Donors
    { id: 'nz_initiative', label: 'NZ Initiative', type: 'org', size: 16 },
    { id: 'business_nz', label: 'Business NZ', type: 'org', size: 14 },
    { id: 'atlas_network', label: 'Atlas Network', type: 'org', size: 16 },
    { id: 'act_party', label: 'ACT Party Donors', type: 'funding', size: 14 },
    { id: 'national_party', label: 'National Party Donors', type: 'funding', size: 16 },
    { id: 'nzfirst_foundation', label: 'NZ First Foundation', type: 'funding', size: 14 },
    { id: 'ctu', label: 'CTU (Unions)', type: 'org', size: 14 },
    { id: 'racing_industry', label: 'Racing Industry', type: 'org', size: 12 },
    { id: 'fishing_industry', label: 'Fishing Industry', type: 'org', size: 12 },
    { id: 'property_council_nz', label: 'Property Council NZ', type: 'org', size: 12 },
    { id: 'air_nz', label: 'Air New Zealand', type: 'company', size: 14 },
    { id: 'green_party', label: 'Green Party', type: 'org', size: 12 },
    { id: 'labour_party', label: 'Labour Party', type: 'org', size: 14 },
    { id: 'treasury', label: 'NZ Treasury', type: 'org', size: 10 },
  ],
  edges: [
    // Luxon connections
    { from: 'luxon', to: 'air_nz', type: 'employment', label: 'CEO 2012–2019', weight: 3 },
    { from: 'luxon', to: 'nz_initiative', type: 'ideological', label: 'Policy alignment', weight: 2 },
    { from: 'luxon', to: 'business_nz', type: 'ideological', label: 'Regular attendee', weight: 2 },
    { from: 'luxon', to: 'national_party', type: 'party', label: 'Party leader', weight: 3 },
    { from: 'luxon', to: 'property_council_nz', type: 'policy', label: '10 investment properties', weight: 2 },
    { from: 'luxon', to: 'willis', type: 'coalition', label: 'Coalition partners', weight: 3 },
    { from: 'luxon', to: 'bishop', type: 'coalition', label: 'Cabinet', weight: 2 },
    { from: 'luxon', to: 'seymour', type: 'coalition', label: 'Coalition agreement', weight: 3 },
    { from: 'luxon', to: 'peters', type: 'coalition', label: 'Coalition agreement', weight: 3 },
    // Seymour connections
    { from: 'seymour', to: 'atlas_network', type: 'ideological', label: 'Policy alignment', weight: 3 },
    { from: 'seymour', to: 'nz_initiative', type: 'ideological', label: 'Shared publications', weight: 2 },
    { from: 'seymour', to: 'act_party', type: 'party', label: 'Party leader', weight: 3 },
    // Peters connections
    { from: 'peters', to: 'nzfirst_foundation', type: 'funding', label: 'SFO investigated', weight: 3 },
    { from: 'peters', to: 'racing_industry', type: 'policy', label: 'TAB reform; horse racing', weight: 3 },
    { from: 'peters', to: 'jones', type: 'party', label: 'NZ First colleagues', weight: 2 },
    // Jones connections
    { from: 'jones', to: 'fishing_industry', type: 'employment', label: 'Employed 2014–2020', weight: 3 },
    { from: 'jones', to: 'nzfirst_foundation', type: 'funding', label: 'Via party', weight: 2 },
    // Opposition
    { from: 'hipkins', to: 'ctu', type: 'ideological', label: 'Union alignment', weight: 2 },
    { from: 'hipkins', to: 'labour_party', type: 'party', label: 'Party leader', weight: 3 },
    { from: 'swarbrick', to: 'green_party', type: 'party', label: 'Party leader', weight: 3 },
    { from: 'ardern', to: 'labour_party', type: 'party', label: 'Former leader', weight: 3 },
    { from: 'ardern', to: 'ctu', type: 'ideological', label: 'Union alignment', weight: 2 },
    // National party donor flow
    { from: 'national_party', to: 'luxon', type: 'funding', label: '$2.7M top donors 2022–23', weight: 2 },
    { from: 'national_party', to: 'willis', type: 'funding', label: 'Via party', weight: 1 },
    { from: 'national_party', to: 'bishop', type: 'funding', label: 'Via party', weight: 1 },
    // Think-tank flows
    { from: 'atlas_network', to: 'nz_initiative', type: 'ideological', label: 'Affiliated', weight: 2 },
    { from: 'nz_initiative', to: 'business_nz', type: 'ideological', label: 'Shared membership', weight: 2 },
  ],
};

// ── NZ COMPANIES ──
const NZ_COMPANIES = [
  {
    id: 'air_nz', name: 'Air New Zealand', sector: 'transport', country: 'NZ',
    logo: '✈️',
    tagline: 'National carrier — 52% government-owned',
    ethics: 62, worker: 64, environmental: 48, transparency: 58, tax: 65, data_privacy: 60,
    overall: 0,
    description: 'NZ\'s national airline. 52% Crown-owned. Recovered strongly post-COVID. CEO Greg Foran. ETS participant. Safety record strong.',
    controversies: [
      { year: 2023, title: 'Environmental target reversal', desc: 'Abandoned 2030 sustainable fuel targets citing cost and supply constraints.', type: 'negative' },
      { year: 2022, title: 'COVID recovery — government support $2.25B', desc: 'Received largest single corporate rescue in NZ history.', type: 'neutral' },
      { year: 2019, title: 'Luxon exits — becomes National Party politician', desc: 'Former CEO Christopher Luxon enters politics — creates ongoing governance questions.', type: 'neutral' },
    ],
    statements: ['"Our purpose is to supercharge New Zealand\'s success." — Air NZ'],
    worker_notes: 'Generally good union relationships. PSA-negotiated agreements. COVID restructure affected 4,000 roles.',
    tax_notes: 'Pays NZ corporate tax. No significant offshore structures identified.',
  },
  {
    id: 'fletcher_building', name: 'Fletcher Building', sector: 'construction', country: 'NZ',
    logo: '🏗',
    tagline: 'NZ\'s largest construction and building materials company',
    ethics: 40, worker: 46, environmental: 42, transparency: 44, tax: 52, data_privacy: 58,
    overall: 0,
    description: 'Major NZ/Australian construction group. Justice Precinct and SkyCity cost blowouts. Significant governance failures 2017–2019.',
    controversies: [
      { year: 2019, title: '$660M loss — Auckland construction projects', desc: 'Major cost overruns on NZ International Convention Centre and Skypath caused near-collapse.', type: 'negative' },
      { year: 2018, title: 'CEO Mark Adamson exits amid losses', desc: 'Abrupt departure after financial position revealed to be worse than disclosed.', type: 'negative' },
      { year: 2024, title: 'Ongoing asbestos liability issues', desc: 'Legacy building materials exposure creates ongoing liability across NZ building stock.', type: 'negative' },
    ],
    statements: ['"Building a better New Zealand." — Fletcher Building tagline'],
    worker_notes: 'Construction industry union (BCITU) relationships. Safety record mixed — multiple serious incidents.',
    tax_notes: 'NZ-based corporate tax payer. Some Australian operations create complexity.',
  },
  {
    id: 'warehouse_group', name: 'The Warehouse Group', sector: 'retail', country: 'NZ',
    logo: '🔴',
    tagline: 'NZ\'s largest retailer — Red Sheds, Warehouse Stationery, Noel Leeming',
    ethics: 56, worker: 50, environmental: 44, transparency: 52, tax: 60, data_privacy: 52,
    overall: 0,
    description: 'NZ retail icon. Owned by Tindall Family interests. 2023–24 restructure. Worker pay and conditions under scrutiny.',
    controversies: [
      { year: 2024, title: 'Major restructure — hundreds of jobs cut', desc: 'Closed Torpedo7, cut corporate staff significantly amid rising costs.', type: 'negative' },
      { year: 2023, title: 'Wage theft findings', desc: 'Labour Inspectorate found wage underpayments across multiple stores.', type: 'negative' },
      { year: 2022, title: 'Tindall Foundation\'s positive community record', desc: 'Stephen Tindall\'s philanthropy and sustainability commitments broadly positive.', type: 'positive' },
    ],
    statements: ['"Helping Kiwi families get more out of life." — The Warehouse'],
    worker_notes: 'First Union membership in stores. Pay rates around minimum wage for many roles. Wage theft finding 2023.',
    tax_notes: 'NZ-based. Standard corporate tax. No significant offshore avoidance identified.',
  },
  {
    id: 'spark_nz', name: 'Spark NZ', sector: 'tech', country: 'NZ',
    logo: '📡',
    tagline: 'NZ\'s largest telco',
    ethics: 58, worker: 55, environmental: 52, transparency: 54, tax: 62, data_privacy: 50,
    overall: 0,
    description: 'Formerly Telecom NZ. Major infrastructure and mobile operator. GCSB-linked security concerns on Huawei. Data breach incidents.',
    controversies: [
      { year: 2023, title: 'Customer data breach', desc: '85,000 customer records exposed in third-party breach.', type: 'negative' },
      { year: 2019, title: 'Huawei 5G ban compliance', desc: 'Government directed Spark not to use Huawei in 5G network on security grounds.', type: 'neutral' },
      { year: 2024, title: 'Significant workforce restructure', desc: '~200 roles cut in technology division.', type: 'negative' },
    ],
    statements: ['"Helping New Zealanders win big in a digital world." — Spark NZ'],
    worker_notes: 'Restructures 2022–24. E tū union representation. Pay generally above industry average.',
    tax_notes: 'NZ corporate tax payer. Some overseas operations.',
  },
  {
    id: 'skycity', name: 'SkyCity Entertainment', sector: 'hospitality', country: 'NZ',
    logo: '🎰',
    tagline: 'Casino and hospitality operator — Auckland, Hamilton',
    ethics: 24, worker: 52, environmental: 45, transparency: 36, tax: 48, data_privacy: 44,
    overall: 0,
    description: 'NZ\'s dominant casino operator. Anti-money laundering failures. New Zealand International Convention Centre fire. Gambling harm concerns systemic.',
    controversies: [
      { year: 2024, title: 'AML fine: $4.16M — largest in NZ history', desc: 'DIA fined SkyCity for systematic anti-money laundering failures over years.', type: 'negative' },
      { year: 2022, title: 'NZICC fire — $500M+ rebuild', desc: 'Convention centre fire during construction caused massive losses and delays.', type: 'negative' },
      { year: 2021, title: 'Australia AML failures — Adelaide casino', desc: 'Australian operations also found to have serious AML compliance failures.', type: 'negative' },
      { year: 2019, title: 'Gambling harm — third-party audit findings', desc: 'Audits found inadequate harm minimisation processes for problem gamblers.', type: 'negative' },
    ],
    statements: ['"World-class entertainment experiences." — SkyCity'],
    worker_notes: 'UNITE Union. Hospitality rates. Seasonal and part-time heavy workforce.',
    tax_notes: 'NZ corporate tax. DIA-regulated. Some Australian operations.',
  },
];

NZ_COMPANIES.forEach(c => {
  c.overall = Math.round((c.ethics + c.worker + c.environmental + c.transparency + c.tax + c.data_privacy) / 6);
});

// Make available globally
window.NZ_POLITICIANS = NZ_POLITICIANS;
window.NZ_NETWORK = NZ_NETWORK;
window.NZ_COMPANIES = NZ_COMPANIES;
