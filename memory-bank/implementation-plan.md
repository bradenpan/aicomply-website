# AI Hiring Compliance - Smoke Test Landing Page Implementation Plan

## Purpose
Test demand for an AI-in-employment compliance tool by driving traffic to a landing page + compliance assessment. Measure clicks, assessment completions, and email signups to validate whether employers recognize the problem and would pay for a solution.

## Architecture Overview

```
Landing Page (Next.js on Vercel)
    |
    v
Embedded Tally Form (compliance assessment - 7 questions)
    |
    v
Tally End Screen (results summary + email capture + pricing preference)
    |
    v
Data lives in Tally dashboard (export CSV for analysis)
```

Traffic sources: Google Ads, LinkedIn Ads, LinkedIn organic, Reddit organic

Analytics: Vercel Analytics (free) for page-level metrics. Tally's built-in analytics for form completion rates and drop-off.

---

## Step-by-Step Implementation

### PHASE 1: Setup (30 min)

#### Step 1: Initialize the Next.js project
- [ ] Claude Code initializes Next.js with TypeScript + Tailwind in the existing folder
- [ ] Claude Code builds the landing page and components

#### Step 2: GitHub repo
- [ ] Braden: Create a new repo on GitHub (e.g., `ai-hiring-website`)
- [ ] Connect local folder to remote:
  ```bash
  cd /c/dev/ai-hiring-website
  git init
  git remote add origin https://github.com/YOUR_USERNAME/ai-hiring-website.git
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git push -u origin main
  ```

#### Step 3: Vercel deployment
- [ ] Braden: Go to vercel.com, sign in with GitHub
- [ ] Click "Add New Project" -> Import the `ai-hiring-website` repo
- [ ] Framework preset: Next.js (auto-detected)
- [ ] Click Deploy
- [ ] Vercel auto-deploys on every push to main
- [ ] Default URL: `ai-hiring-website.vercel.app` (or similar)
- [ ] DECISION NEEDED: Buy a custom domain? (e.g., aihiringcompliance.com) or use Vercel URL for the smoke test?

#### Step 4: Analytics
- [ ] Braden: In Vercel dashboard, go to project -> Analytics -> Enable
- [ ] Free tier covers what we need for a smoke test
- [ ] OPTIONAL: Add Google Analytics if you want more granular event tracking (assessment start, completion, email submit)

---

### PHASE 2: Build the Tally Form (1 hour)

#### Step 5: Create Tally account
- [ ] Braden: Go to tally.so, create free account
- [ ] Tally is fully free with unlimited forms and submissions

#### Step 6: Build the compliance assessment form
- [ ] Create new form in Tally
- [ ] Title: "AI Hiring Compliance Assessment"

**Questions to build:**

Q1 - Multiple choice (single select):
"How many employees does your company have?"
- 1-19
- 20-49
- 50-99
- 100-199
- 200-499
- 500+

Q2 - Multiple choice (single select):
"Do you hire or interview candidates who work in Illinois?"
- Yes
- No
- Not sure
(If "No" -> skip to end screen: "Based on your answer, Illinois HB 3773 may not apply to your company. However, if you hire remote workers who could be based in Illinois, you may still be covered. Enter your email for updates as more states pass similar laws.")

Q3 - Checkboxes (multi-select):
"Which of these tools do you use in your hiring process? Select all that apply."
- Indeed (Sponsored Jobs / Indeed Resume)
- LinkedIn (Recruiter / Job Slots / Sponsored Posts)
- Greenhouse
- Workday
- iCIMS
- Lever / Ashby
- JazzHR / Breezy HR / Recruitee
- BambooHR
- HireVue / Spark Hire (video interviews)
- TestGorilla / Codility / HackerRank (skills assessments)
- Paradox (Olivia) / Phenom (chatbot screening)
- Checkr / Sterling (background checks)
- Lattice / 15Five / Culture Amp (performance management)
- PayScale / Salary.com / Payfactors (compensation)
- ChatGPT / AI to write job descriptions
- Other AI-powered hiring tool (please specify)
- None of the above

Q4 - Multiple choice (single select):
"Do any of your hiring tools automatically screen, rank, filter, or score candidates?"
- Yes
- No
- I'm not sure

Q5 - Multiple choice (single select):
"Do you currently provide written notice to job applicants that AI is being used in your hiring process?"
- Yes, for all AI tools
- Yes, for some AI tools
- No
- I didn't know this was required

Q6 - Multiple choice (single select):
"Do you have a written company policy on AI use in employment decisions?"
- Yes
- No
- We're working on one

Q7 - Multiple choice (single select):
"How concerned are you about compliance with AI hiring laws?"
- Very concerned - this is a top priority
- Somewhat concerned - it's on my radar
- Not very concerned - we'll deal with it eventually
- Not concerned at all

#### Step 7: Build the end screen / results

Use Tally's conditional logic to show different end screens:

**End Screen A** (selected 3+ tools from Q3 AND answered "No" or "I didn't know" to Q5):
"You identified multiple AI-powered tools in your hiring process. Under Illinois HB 3773 (effective January 1, 2026), you are required to:
- Provide written notice to every applicant and employee about each AI tool used
- Include specific details: tool name, purpose, data collected, decisions affected, contact info
- Post notices in job listings, employee handbook, physical workplace, and company website
- Maintain a written AI policy
- Update notices within 30 days when tools change, and regenerate annually

Non-compliance exposes your company to private lawsuits with uncapped damages.

We're building a tool that automates all of this. Enter your email for early access."

**End Screen B** (selected 1-2 tools, not currently providing notice):
Similar but lighter: "You identified AI tools that likely trigger Illinois disclosure requirements..."

**End Screen C** (already providing notice and has policy):
"You're ahead of most employers. We're building a tool to automate ongoing monitoring and notice updates as your AI tools change. Enter your email if you'd like to simplify your compliance workflow."

**All end screens include:**
- Email field (required)
- Company name (optional)
- "Which pricing range would you consider for a compliance automation tool?" (optional, single select):
  - Under $50/month
  - $50-100/month
  - $100-200/month
  - $200+/month
  - I'd prefer a one-time purchase
  - I wouldn't pay for this

#### Step 8: Configure Tally settings
- [ ] Enable email notifications for new submissions
- [ ] Set redirect after submission (optional - can redirect back to our site's thank-you page)
- [ ] Copy the Tally embed code or share URL

---

### PHASE 3: Build the Landing Page (2-3 hours, Claude Code)

#### Step 9: Landing page content and structure

Claude Code builds a single-page site with these sections:

**Hero Section:**
- Headline: "Is Your Company Compliant with Illinois's New AI Hiring Law?"
- Subhead: "If you use Indeed, LinkedIn, Greenhouse, or any AI-powered tool in hiring, Illinois law now requires specific written disclosures to every applicant and employee."
- CTA Button: "Check My Compliance - Free 2-Min Assessment"
- Below CTA: "No signup required. See your compliance status instantly."

**Problem Section:**
- "What is HB 3773?"
- Effective January 1, 2026
- Applies to any employer hiring or interviewing in Illinois (including remote)
- Covers all AI used in employment decisions - not just hiring, but promotion, compensation, discipline, termination
- Most employers don't realize their existing tools trigger this law

**Risk Section:**
- "Why this matters"
- Private right of action: rejected applicants can personally sue
- Uncapped damages including punitive damages
- 2-year statute of limitations
- Class action potential
- Employer is liable even if they didn't know their tool used AI

**Common Tools Section:**
- "These tools likely trigger HB 3773"
- Grid/list of common HR tools with brief explanation of their AI features
- Indeed: algorithmic job ad targeting, AI resume matching
- LinkedIn: AI-powered candidate matching, AI job recommendations
- Greenhouse: AI resume screening, AI-suggested candidates
- HireVue: AI video analysis, automated scoring
- etc.
- "Not sure if your tools qualify? Take the free assessment."

**CTA Section (repeat):**
- Embedded Tally form OR prominent button linking to Tally
- DECISION NEEDED: Embed form on page vs. link out to Tally hosted form?
  - Embed: cleaner UX, user stays on our site. Requires Tally embed snippet.
  - Link out: simpler, but user leaves our domain. Tally forms look clean though.
  - Recommendation: Embed on the page for better conversion tracking.

**Footer:**
- "This tool provides compliance information, not legal advice. Consult an attorney for specific legal questions."
- Link to HB 3773 text
- Copyright

#### Step 10: Design/styling
- Clean, professional, trust-oriented design (think Vanta, Drata aesthetic)
- Dark or white background, clear typography
- No flashy animations - this is compliance, not a consumer app
- Mobile responsive (HR managers may click LinkedIn ads on phone)

---

### PHASE 4: Traffic (ongoing, starts after site is live)

#### Step 11: Google Ads setup
- [ ] Braden: Create Google Ads account if not existing (ads.google.com)
- [ ] Create a Search campaign
- [ ] Budget: $10-15/day ($150-200 for 2 weeks)
- [ ] Geo-targeting: Illinois + nationwide
- [ ] Keywords to bid on:
  - "Illinois AI hiring law"
  - "HB 3773 compliance"
  - "Illinois AI employment law"
  - "AI hiring disclosure requirements"
  - "Illinois AI discrimination law"
  - "AI hiring compliance tool"
  - "Illinois employer AI notice"
- [ ] Ad copy:
  - Headline 1: "Illinois AI Hiring Law Compliance"
  - Headline 2: "Free 2-Min Compliance Assessment"
  - Headline 3: "HB 3773 - Are You Compliant?"
  - Description: "Illinois now requires written AI disclosure to every applicant. Check if your hiring tools trigger HB 3773. Free assessment - no signup required."
- [ ] Set up conversion tracking: link click to Tally form = conversion

#### Step 12: LinkedIn Ads
- [ ] Braden: Create LinkedIn Campaign Manager account (linkedin.com/campaignmanager)
- [ ] Campaign type: Sponsored Content (single image ad)
- [ ] Budget: $100-200 total ($10-15/day for 2 weeks)
- [ ] Targeting:
  - Job titles: HR Manager, HR Director, Director of People, VP People, Talent Acquisition Manager, Head of Recruiting, People Operations Manager
  - Company size: 20-500 employees
  - Location: Illinois (or United States if budget allows)
  - Industry: All (the law applies regardless of industry)
- [ ] Ad copy:
  - "If you use Indeed, LinkedIn, or any ATS to hire in Illinois, you're now legally required to provide specific AI disclosures to every applicant. Most employers don't know this. Free 2-minute compliance check."
  - Image: simple graphic with the headline or a compliance checklist visual
- [ ] CTA button: "Learn More" -> landing page URL

#### Step 13: Organic LinkedIn post
- [ ] Braden: Post from personal LinkedIn profile
- [ ] Angle: educational, not salesy
- [ ] Draft:
  "Something most Illinois employers don't realize:

  If you use Indeed Sponsored Jobs, LinkedIn Recruiter, Greenhouse, or basically any modern ATS — you're using AI in hiring. And as of January 1, 2026, Illinois HB 3773 requires you to provide specific written notices to every applicant about every AI tool in your hiring process.

  The notice must include: the tool name, what decisions it affects, what data it collects, its purpose, which positions it applies to, and a contact for questions. And you need to post it in 4 places: job listings, employee handbook, physical workplace, and your website.

  Most employers I've talked to either don't know about this or assume their ATS vendor handles it. The vendor only covers their own tool — not the other 3-5 AI tools in your hiring stack.

  Non-compliance = private lawsuits with uncapped damages.

  I built a free 2-minute assessment to check if your hiring tools trigger this law: [LINK]"
- [ ] Post in relevant LinkedIn groups (HR professionals, Illinois business, SHRM)

#### Step 14: Reddit posts
- [ ] Post in r/humanresources, r/AskHR (educational framing, not promotional)
- [ ] Follow each subreddit's rules on self-promotion
- [ ] Angle: "PSA for employers hiring in Illinois" + link to assessment

---

### PHASE 5: Measure and Evaluate (after 2 weeks)

#### Step 15: Collect and analyze data

**From Vercel Analytics:**
- Total page views
- Unique visitors
- Traffic sources (Google Ads vs. LinkedIn vs. organic)
- Device breakdown (desktop vs. mobile)

**From Tally dashboard:**
- Total form starts
- Completion rate
- Drop-off by question
- All response data (exportable as CSV)
- Email signups count
- Pricing preference distribution

**From Google Ads:**
- Impressions (is anyone searching?)
- Clicks
- CTR
- Cost per click
- Search terms report (what are people actually typing?)

**From LinkedIn:**
- Impressions
- Clicks
- CTR
- Engagement (likes, comments, shares on organic post)

#### Step 16: Evaluate results

Decision matrix:

| Scenario | Signals | Decision |
|----------|---------|----------|
| No search volume + no LinkedIn engagement | <500 impressions across all channels, <10 assessment starts | Kill it. No demand. |
| Clicks but low completion | 50+ assessment starts but <30% completion | Problem not urgent enough. Revisit after enforcement action. |
| Completions but no emails | 30%+ completion but <10% email signup | They see the problem but won't pay. Consider free tool / law firm channel. |
| Emails + pricing data | 10%+ email signup rate + majority selecting $50-200/mo | Build the product. These emails are first customers. |
| LinkedIn >> Google | Organic/paid LinkedIn drives 5x+ more traffic than search | Market needs education, not search-based acquisition. Webinar/content strategy. |

---

## Decisions Needed From Braden

1. **Brand name / company name** for the landing page? Or keep it generic/unbranded for the smoke test?
2. **Domain**: Buy a custom domain (e.g., aihiringcompliance.com) or use Vercel's free URL?
3. **Tally embed vs. link**: Embed the form on the landing page, or link out to Tally's hosted form?
4. **Google Ads account**: Do you already have one, or need to create?
5. **LinkedIn Ads**: Do you have a LinkedIn Campaign Manager account?
6. **Budget confirmation**: ~$300-500 total across Google + LinkedIn for 2 weeks?

---

## File Structure

```
ai-hiring-website/
├── memory-bank/
│   ├── implementation-plan.md    <- this file
│   ├── copy-and-messaging.md    <- landing page copy (to be created)
│   ├── research-findings.md     <- key data points from research (to be created)
│   └── results-analysis.md     <- post-test analysis (to be created after test)
├── src/
│   ├── app/
│   │   ├── page.tsx             <- landing page
│   │   ├── layout.tsx           <- root layout
│   │   └── globals.css          <- global styles
│   ├── components/              <- reusable UI components
│   └── lib/                     <- utility functions
├── public/
│   └── images/                  <- any static images
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Timeline

- Day 1: Build landing page + set up Tally form + deploy to Vercel
- Day 2: Set up Google Ads + LinkedIn Ads + post organic content
- Days 3-16: Run ads, monitor daily
- Day 17: Pull all data, analyze, make go/no-go decision
