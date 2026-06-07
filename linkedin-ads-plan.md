# LinkedIn Ads Plan — AIComply

## Why LinkedIn

LinkedIn is the only platform where you can target by exact job function, title, and company size. For reaching HR professionals and recruiters in Illinois, there's no better targeting available. The trade-off: CPCs are significantly higher than Google ($8-15+ vs $2-8), so every click needs to count.

The key difference from search ads: LinkedIn is **push**, not **pull**. People aren't searching for AI hiring compliance — you're interrupting their feed with something they didn't know they needed. The creative has to do more work to stop the scroll and create urgency.

---

## Campaign Structure

One campaign, two ad variations. Keep it simple — at this budget, splitting further just fragments data.

**Campaign objective:** Website Visits. Drive traffic to the assessment page. Don't use LinkedIn Lead Gen Forms — the assessment on your site is the conversion mechanism and captures richer data (tool usage, compliance gaps) than a LinkedIn form would.

---

## Targeting

**Location:** Illinois. Unlike search where keywords can self-filter, LinkedIn targeting is purely audience-based. No reason to go nationwide — you'd be paying $10+ per click to reach HR people who may have zero Illinois exposure.

**Job Function:** Human Resources

**Job Titles (OR targeting — match any):**
- HR Manager
- HR Director
- VP of Human Resources
- Head of HR
- Chief People Officer
- People Operations Manager
- Talent Acquisition Manager
- Talent Acquisition Director
- Head of Talent Acquisition
- Recruiting Manager
- Recruiting Director
- Staffing Manager
- HR Business Partner
- HR Generalist (include — these people often own compliance at SMBs)

**Company Size:** 11-200 employees, 201-500 employees, 501-1000 employees. Exclude 1-10 (too small to pay for compliance tools) and 5000+ (enterprise, different buying process).

**Industry exclusions:** Exclude Government, Education, and Non-Profit — they have different compliance dynamics and are less likely to convert for this product.

**Audience size:** This targeting will likely yield an audience of 30,000-80,000 members. That's small enough to be precise but large enough to get delivery.

---

## Ad Format

**Sponsored Content — Single Image.** Simplest format, shows natively in the feed, works on mobile and desktop. Don't bother with carousel, video, or message ads for a smoke test — single image gives you the fastest path to data.

---

## Ad Creative

Run 2 ads simultaneously. LinkedIn will auto-optimize toward the better performer.

### Ad A — Compliance angle

**Headline (≤70 chars):**
`Illinois AI hiring law is in effect. Is your team compliant?` (60)

**Introductory text (≤150 chars for above-the-fold visibility):**
`LinkedIn, Indeed, and Greenhouse all use AI by default. Under HB 3773, that may require written disclosure to every applicant.` (125)

**Description (≤100 chars):**
`Free 2-minute assessment. See which of your tools may trigger the law.` (70)

**CTA button:** Learn More

**Image:** See Image Guidelines below.

### Ad B — Consequence angle

**Headline (≤70 chars):**
`In Illinois, employers can be sued for using AI in hiring` (57)

**Introductory text (≤150 chars):**
`Fines up to $70K per person, per incident. Uncapped liability in private lawsuits. Most employers don't even know their tools use AI.` (134)

**Description (≤100 chars):**
`Check your exposure in 2 minutes. Free assessment — instant results.` (68)

**CTA button:** Learn More

**Image:** See Image Guidelines below.

---

## Image Guidelines

### Specs

- **Format:** PNG (holds up better than JPG for graphics with text — LinkedIn compresses on upload)
- **Max file size:** 5 MB
- **Recommended dimensions:** 720 x 900 px (4:5 vertical). This captures the most mobile screen real estate. 57-60% of LinkedIn engagement is mobile — design for mobile first.
- **Fallback option:** 1200 x 1200 px (1:1 square) if vertical feels awkward. Avoid 1.91:1 horizontal — it renders too small on mobile and text overlays become illegible.

### What to put on the image

**One stat or one statement. That's it.** The ad copy (headline + intro text) carries the message — the image's job is to stop the scroll and reinforce one idea.

**Ad A image:** Bold text on a clean, high-contrast background:
- Primary text: `HB 3773 — Are you compliant?`
- Secondary text (smaller): `Free 2-min compliance check`
- AIComply logo, small, bottom corner

**Ad B image:** Bold text, coral or dark background:
- Primary text: `Up to $70K per person, per incident`
- Secondary text (smaller): `Are you exposed?`
- AIComply logo, small, bottom corner

The penalty number should be the largest element on Ad B — numbers and data points outperform generic benefit language by a significant margin on LinkedIn.

### Design principles (research-backed)

- **Bold, contrasting colors.** LinkedIn's feed is visually muted (white/grey/blue). Coral, dark teal, or other bold colors break the scroll pattern.
- **No stock photos.** Generic stock imagery blends into the feed. Bold text-on-color graphics stand out because they look different from typical LinkedIn content.
- **Keep text under ~20% of image area.** LinkedIn doesn't enforce a hard rule like Facebook's old 20% rule, but cluttered images reduce engagement and can increase CPC through quality scoring.
- **High contrast for dark mode.** Don't use white or transparent backgrounds — they render awkwardly in dark mode. Use solid color backgrounds with strong contrast.
- **Legibility at mobile size.** If text isn't readable on a phone screen without zooming, it's too small or there's too much of it.
- **Upload at exact recommended dimensions** (720 x 900 or 1200 x 1200). Wrong-size images get upscaled/compressed and look pixelated, especially text. Properly sized images get up to 38% higher CTR per LinkedIn's own data.
- **Keep important elements away from edges.** Mobile cropping can clip content near borders.

---

## Budget & Bidding

**Daily budget:** $15-20/day. At $8-15 CPC (typical for HR targeting on LinkedIn), this gets you 1-3 clicks per day. That's fine for a smoke test — you're looking for directional signal over 2-3 weeks, not statistical significance.

**Bidding:** Maximum delivery (LinkedIn's default). This lets LinkedIn optimize for the most clicks within your budget. Don't set manual CPC bids for a smoke test — you don't have enough data to know what the right bid is yet.

**Expected performance:**
- CPCs: $8-15 (HR professionals in a specific geo = premium audience)
- CTR: 0.4-0.8% (typical for Sponsored Content to a targeted B2B audience)
- At $15/day: ~1-2 clicks/day, ~30-45 clicks over 3 weeks
- If 20-30% of clicks complete the assessment: 6-14 leads over 3 weeks

That's enough to tell you whether this audience cares.

---

## Conversion Tracking

Install the **LinkedIn Insight Tag** on the site. This is LinkedIn's equivalent of the Google gtag.

**How to get it:**
1. LinkedIn Campaign Manager → Account Assets → Insight Tag
2. Copy the JavaScript snippet
3. Add it to `layout.tsx` the same way we added the Google gtag — `next/script` in `<body>` with `strategy="afterInteractive"`

**Conversion event:** Set up a conversion action in Campaign Manager:
- Type: Website conversion
- Trigger: Event-specific (fire when the user submits email / sees results)
- You can use the same pattern as the Google conversion — call a function on email submit

Alternatively, use URL-based tracking if the results page has a distinct URL. Since it doesn't (it's a state change in the same component), event-based is the way to go.

---

## What to Watch

- **CTR by ad** — which angle works better, compliance or consequences? This tells you what motivates this audience. If both are below 0.3%, the messaging isn't landing and you need to rethink the creative.
- **CPC** — if CPCs are above $15, the audience may be too competitive. Consider loosening company size or expanding job titles.
- **Assessment completion rate** — what % of LinkedIn clicks actually finish the assessment? Compare to Google. If LinkedIn clicks have lower completion rates, the audience may be less motivated (they were interrupted, not searching).
- **Lead quality** — check the assessment responses. Are LinkedIn leads selecting tools and showing real compliance gaps? Or are they clicking out of curiosity and bouncing? This matters more than click volume.
- **Audience size vs. frequency** — LinkedIn will show your estimated audience size and frequency. If frequency climbs above 3-4 in the first week, your audience is too small and people are seeing the ad too many times. Expand targeting.

---

## What NOT to Do

- **Don't use Lead Gen Forms.** They capture email without the assessment context. You want people to go through the tool audit — that's where the value is, both for them and for your data.
- **Don't target nationwide.** At $10+ per click, every non-Illinois click is wasted budget.
- **Don't run InMail/Message Ads.** They feel spammy for a cold audience and cost more. Save them for retargeting if you get to that stage.
- **Don't over-segment.** One campaign, two ads. You don't have the budget to run 5 campaigns with different audience slices. Get signal first, optimize later.
- **Don't set it and forget it.** Check the ads after 3 days. If one ad has zero clicks, pause it and try a new variation. LinkedIn's auto-optimization needs some volume to work.

---

## Timing

Run for **3 weeks minimum** before making a go/no-go decision. At 1-2 clicks per day, you need time to accumulate enough data. If after 3 weeks you have fewer than 5 assessment completions, LinkedIn may not be the right channel at this budget — shift spend to Google where intent is higher.
