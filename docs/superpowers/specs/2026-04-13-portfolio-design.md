# Abhishek Thakur — Portfolio Site Design Spec

**Date:** 2026-04-13
**Owner:** Abhishek Thakur
**Status:** Approved — ready for implementation plan

---

## 1. Goal & Audience

Primary goal: **land a senior/staff full-stack role (remote, global)**, with secondary value as a consulting/authority signal.

Primary readers (equal weight):

- **Non-technical recruiters** scanning for keywords, role fit, links → homepage must be skimmable in 30 seconds.
- **Engineering managers / tech leads** wanting to see how Abhishek thinks → deeper case-study pages with architecture, decisions, and lessons.

Geography: **open globally** (Remote · US / EU / India). An availability pill in the hero and contact section communicates this explicitly.

Out of goal: blog / long-form writing (Abhishek opted out), personal-brand content marketing, lead-gen funnels.

---

## 2. Visual Direction

**Hybrid — polished base with technical accents.**

- **Base aesthetic:** clean, premium, Vercel/Stripe-adjacent — big type, generous whitespace, monochrome with one accent color. Safe for recruiter skim.
- **Technical accent layer:** a monospace "terminal block" motif used in two specific places — the homepage **Stack** section and each case study's **Stack deep-dive** section. Not site-wide.
- **Availability pill:** `● Available · Open globally (Remote · US / EU / India)` in hero and near contact CTA.
- **Light + dark mode** with system-preference default, user-toggleable via `next-themes`. Both themes tested independently for contrast.

Component sourcing strategy to avoid the "AI-generated landing page" look:

1. Pull **max 3–4 components from 21st.dev** (hero, bento work grid, animated feature strip, terminal block) rather than a dozen.
2. Re-skin to one consistent palette, not 21st.dev defaults.
3. Write **all copy in Abhishek's own voice** — the biggest AI-tell is generic marketing copy.

---

## 3. Site Architecture

Fully static site. No server runtime, no database, no CMS.

```
/                     Home (single scrollable page)
/work/uplevelit       Case study — multi-tenant SaaS + Stripe
/work/penbook         Case study — NestJS + OpenAI + realtime collab
/work/rocket-rebates  Case study — PostgreSQL + ETL + full-text search
/resume.pdf           Static file
```

All case study URLs are deep-linkable so Abhishek can paste them into job applications.

**Not building:** separate `/about` page (folded into home), `/blog`, admin, CMS, comments, newsletter.

---

## 4. Homepage Sections (scroll order)

1. **Hero** (~100vh)
   - Availability pill
   - Name + role line: *"Senior Full-Stack Engineer — SaaS & Payment Systems"*
   - 2-sentence positioning line
   - CTAs: `View work →` (scrolls to work) · `Résumé` (opens `/resume.pdf`)
   - Socials row: GitHub, LinkedIn, email
   - Subtle WebGL gradient mesh background (see §7 for constraints)

2. **Selected Work** — bento grid, 3 project cards
   - Uplevelit (large) · Penbook (medium) · Rocket Rebates (medium)
   - Each card: name, 1-line pitch, stack chips, "Read case study →"

3. **What I do** — 3-column capability strip
   - *SaaS Platforms* · *Payment Systems* · *Cloud & AI Integrations*
   - Icon + short description per pillar
   - Content comes from `/content/capabilities.mdx` — editable without code changes. Goes beyond what the resume lists (e.g., Stripe Connect onboarding, webhook signature verification & replay handling, OpenAI streaming with token budgets).

4. **Stack** — terminal-accented block
   - Fake prompt: `~ abhishek $ stack --list`
   - Grouped: Languages · Frontend · Backend · Databases · Cloud/DevOps · Payments · AI

5. **Experience** — compact 3-entry timeline
   - Bizdesire (Team Lead) · Appcore Labs · Fyntune
   - Dates + 1-sentence summary + expandable details

6. **GitHub activity** — auto-pulled widget
   - Contribution graph + 3 pinned repos
   - Fetched **at build time**, cached in `/public/github-cache.json`. No runtime API calls.

7. **Contact** — simple, not a form
   - Large mailto CTA, copy-email-to-clipboard, LinkedIn link
   - Availability pill repeated

8. **Footer** — minimal
   - Built-with line, theme toggle, copyright

---

## 5. Case Study Page Template

All three case studies use the same shape so they read consistently and a fourth can be added later by copying a folder.

| Section          | Content                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Hero strip       | Project name, tagline, stack chips, live URL. Role, team size, timeframe, Abhishek's contribution.             |
| Problem          | 2–3 short paragraphs. What was the business problem and what made it non-trivial?                              |
| Architecture     | Original SVG diagram (drawn by us, not leaked internal docs). 3–4 bullets below explaining the flow.           |
| Key decisions    | Three expandable cards: "We chose X over Y because Z." (e.g., Uplevelit: idempotent keys over distributed locks for Stripe webhooks.) |
| Stack deep-dive  | Terminal-accent block listing the exact tech used, annotated where non-obvious.                                |
| Outcome          | Engineering outcome preferred (e.g., "zero duplicate charges in 9 months post-launch"). Metrics only if NDA-safe. |
| Lessons          | 2–3 bullets in Abhishek's voice — what he'd do differently. High-value section for EMs.                        |
| Prev / Next      | Link to adjacent case study + back to home.                                                                    |

Target length: ~400 words per case study. Drafted from resume bullets plus a 15-minute conversation per project.

### NDA Safety Rules

- **Safe to show:** project name + public URL (already on résumé/LinkedIn), problem shape, our own architecture diagrams, technical patterns (idempotent transactions, wildcard subdomain RBAC, ETL for rebate data), stack + decisions + outcome in words.
- **Not safe:** screenshots of actual product UI, specific customer names, revenue/pricing, internal code, proprietary algorithms or business logic.

---

## 6. Content Pipeline

All long-form content lives in MDX, co-located with the code. No runtime CMS.

```
/content/work/uplevelit.mdx           Case study body + frontmatter
/content/work/penbook.mdx
/content/work/rocket-rebates.mdx
/content/capabilities.mdx             "What I do" list
/public/resume.pdf                    Static file (manually updated)
/public/github-cache.json             Build-time fetched GitHub data
```

Frontmatter per case study: `title`, `tagline`, `stack[]`, `liveUrl`, `role`, `teamSize`, `timeframe`, `order`.

Editing copy is a git commit — no deploy gymnastics, Vercel auto-deploys on push.

---

## 7. Technical Plan

### Stack

- **Next.js 15** App Router with `output: 'export'` (static export; no server runtime)
- **TypeScript** with strict mode
- **Tailwind CSS v4** + **shadcn/ui** base
- **21st.dev** components, selectively (hero, bento work grid, animated feature strip, terminal block — max 4)
- **Framer Motion** for scroll reveals and section transitions
- **React Three Fiber + three** — hero gradient mesh only
- **MDX** via `@next/mdx` for all content
- **Lucide** icons
- **next/font** for Inter (body) + JetBrains Mono (code/terminal)
- **next-themes** for light/dark with system-preference default

### Hosting

Vercel free tier, custom domain (suggested: `abhishekthakur.dev` or `abhithakur.dev` — final choice pending).

### WebGL Hero Mesh Constraints

- Lazy-loaded (dynamic import) so three.js is not in the initial bundle.
- Paused when the hero is off-screen via `IntersectionObserver`.
- Fully disabled under `prefers-reduced-motion: reduce` — static fallback background shown instead.
- Must not regress LCP or CLS targets below.

### GitHub Widget

- Fetches pinned repos + contribution graph at build time.
- Writes result to `/public/github-cache.json` consumed by a plain client component.
- No runtime API calls → no rate limits, no loading spinners, no failure states visible to visitors.

---

## 8. Quality Bar (non-negotiable)

Enforced in CI where possible.

- **Lighthouse (mobile) ≥ 95** on Performance, Accessibility, Best Practices, SEO.
- **LCP < 1.5s**, **CLS < 0.05** on a simulated 4G throttle.
- **WCAG 2.1 AA contrast** in both themes. Automated axe scan runs in CI; PRs fail on new violations.
- **`prefers-reduced-motion` respected everywhere** — WebGL mesh, scroll reveals, Framer transitions.
- **Keyboard navigation** works end-to-end with visible focus rings on every interactive element.
- **No horizontal scroll at 320px viewport.**
- **SEO basics:** per-route OG image, JSON-LD `Person` schema on home, `sitemap.xml`, `robots.txt`.
- **Both themes tested independently** — don't assume light values work in dark.

---

## 9. Out of Scope (explicit)

- Analytics beyond Vercel's built-in (keeps privacy surface clean)
- CMS (MDX files fill this role)
- Internationalisation — English only
- Comments, guestbook, newsletter signup
- Blog / long-form articles
- Contact form with backend — mailto link only
- Testimonials section — skipped unless 2–3 real LinkedIn recommendations are confirmed

---

## 10. Open Items (resolve before implementation plan starts)

- **Domain name**: `abhishekthakur.dev` vs `abhithakur.dev` — Abhishek to pick or confirm one he already owns.
- **Hero copy**: 2-sentence positioning line to be drafted from the résumé summary and reviewed.
- **Case-study content**: 15-minute conversation per project to gather NDA-safe details before drafting MDX.
