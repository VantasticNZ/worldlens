# WorldLens — Global Intelligence Platform

A fully static website that tracks and heatmaps countries, politicians, companies, workplaces, and CEOs. Powered by public data, AI-generated deep-dives (via Claude API), and community submissions via GitHub Issues.

---

## 🚀 Deploy to GitHub Pages in 5 Steps

### Step 1 — Fork or create the repo

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository**
3. Name it `worldlens` (or anything you like)
4. Set it to **Public** (required for free GitHub Pages)
5. Click **Create repository**

### Step 2 — Upload the files

In your new repo, click **Add file → Upload files** and upload all these files:
```
index.html
style.css
data.js
workplaces.js
map.js
app.js
README.md
```

Or if you use Git:
```bash
git clone https://github.com/YOUR-USERNAME/worldlens
cd worldlens
# copy all files here
git add .
git commit -m "Initial WorldLens deploy"
git push
```

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose branch: `main`, folder: `/ (root)`
4. Click **Save**
5. Wait ~2 minutes — your site will be live at:
   `https://YOUR-USERNAME.github.io/worldlens`

### Step 4 — Set your repo name for submissions

Open `workplaces.js` and update line 7:
```javascript
const GITHUB_REPO = 'YOUR-USERNAME/worldlens'; // ← change this
```

This tells the submission system where to send GitHub Issues.

### Step 5 — Add your Claude API key (for AI deep-dives)

> ⚠️ **Important:** Never put your API key directly in source code in a public repo.

**Option A — Prompt users for their own key (current behaviour)**
The app currently calls the Claude API directly. For a public site, add an API key input:

Open `app.js` and find the `fetchCountryAI` function. Add this at the top of the file:
```javascript
function getApiKey() {
  let key = sessionStorage.getItem('wl_api_key');
  if (!key) {
    key = prompt('Enter your Claude API key (stored in session only, never sent anywhere except api.anthropic.com):');
    if (key) sessionStorage.setItem('wl_api_key', key);
  }
  return key;
}
```

Then in each fetch call replace the headers with:
```javascript
headers: {
  'Content-Type': 'application/json',
  'x-api-key': getApiKey(),
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true'
},
```

**Option B — Use a Cloudflare Worker as a proxy (recommended for production)**
Deploy a free Cloudflare Worker that holds your key server-side and proxies requests. See `CLOUDFLARE_PROXY.md` (coming in next version).

---

## 📤 Submission & Verification Workflow

When someone submits via the Submit tab:
1. They fill in the form
2. The app opens GitHub Issues with everything pre-filled (structured format)
3. The issue gets labels: `submission`, `[type]`, `pending-review`
4. You (or a moderator) review the source
5. If approved: add label `verified`, edit the relevant `data.js` or `workplaces.js` file, commit
6. If rejected: close the issue with a comment explaining why

### Setting up Issue Labels

Go to your repo → **Issues → Labels** and create:
- `submission` (blue)
- `pending-review` (yellow)
- `verified` (green)
- `rejected` (red)
- `politician_lie`, `company_misconduct`, `workplace_review` etc.

### Moderator Review Checklist
Before approving a submission:
- [ ] Source URL loads and is real
- [ ] Claim accurately represents what the source says
- [ ] Source is from an accepted type (news, court records, Hansard, regulatory, academic)
- [ ] No personal identifying information about the submitter
- [ ] No defamatory claims without solid sourcing

---

## 🔧 Customising Data

### Adding a politician
Open `data.js` and add to the `POLITICIANS` array:
```javascript
{
  id: 'unique_id',
  name: 'Full Name',
  country: 'NZ',      // 2-letter code
  flag: '🇳🇿',
  role: 'Minister of Finance',
  party: 'National',
  since: '2020',
  initials: 'XX',
  color: '#hex',
  integrity: 65,       // 0-100
  lie_count: 4,
  corruption_risk: 20, // 0-100
  populism: 40,
  description: '...',
  stances: [{ topic: 'Climate', position: 'for' }],  // for/against/mixed
  lies: [{ date: '2024', claim: '...', reality: '...', severity: 'high' }],
  funding: [{ source: '...', amount: '...' }],
  quotes: [{ text: '"..."', context: '...' }],
  investments: '...',
  affiliations: '...',
}
```

### Adding a workplace
Open `workplaces.js` and add to `WORKPLACES`:
```javascript
{
  id: 'unique_id',
  company: 'Company Name',
  sector: 'tech',      // tech/finance/healthcare/retail/government/education
  country: 'NZ',
  overall: 70,         // 0-100
  culture: 68, ceo_rating: 72, balance: 65, pay: 60, psych_safety: 70,
  review_count: 50,
  ceo: 'CEO Name',
  summary: '...',
  official_notes: '...',
  reviews: [{ rating: 4, role: 'Engineer', text: '...', verified: true, source: '...' }],
  sources: ['official', 'community'],  // which source types inform this entry
}
```

---

## 🔗 Data Sources Used

All baseline data sourced from:
- **Freedom House** — freedom and press freedom indices
- **Transparency International** — corruption perception index
- **World Bank** — GDP, healthcare, education data
- **WHO** — health system rankings
- **OECD** — quality of life, equality metrics
- **Reporters Without Borders** — press freedom index
- **NLRB.gov, OSHA.gov, FTC.gov, SEC.gov** — regulatory records
- **NZ Parliament Hansard** — voting records and statements
- **NZ Commerce Commission** — market study findings
- **European Commission** — antitrust decisions

---

## 📝 Licence

MIT — fork, modify, redistribute freely. If you build on this, consider contributing back your data improvements.

---

## 🛣 Roadmap

- [ ] Cloudflare Worker API proxy (keep Claude key private)
- [ ] Auto-import verified GitHub Issues into data files via GitHub Actions
- [ ] More NZ politicians (Shane Jones, Chlöe Swarbrick, Nicola Willis, Chris Bishop)
- [ ] More NZ companies (Fonterra deep-dive, Air NZ, Meridian, Fletcher Building)
- [ ] Mobile-responsive sidebar
- [ ] Dark/light mode toggle
- [ ] CSV export of any heatmap
- [ ] Embeddable widgets (single politician card, country score)
