# abhithakur.dev

Source for [abhithakur.dev](https://abhithakur.dev) — a personal portfolio and
case-study site for Abhishek Thakur, senior full-stack engineer (SaaS &
payments, Node / NestJS / React, based in Chandigarh, India).

## Stack

- **Next.js 16** (App Router, static export via `output: 'export'`)
- **TypeScript** strict + `noUncheckedIndexedAccess`
- **Tailwind CSS v4** with `@theme` tokens in `oklch`
- **MDX** case studies via `next-mdx-remote` + `gray-matter`, frontmatter
  validated with **Zod**
- **Framer Motion** for scroll reveals, letter staggers, and the § splash
- **next-themes** for dark / light, matched to a pre-paint inline `<style>` so
  there is no FOUC
- **Fraunces** (variable, SOFT + WONK axes) as the display face; **Inter** for
  body; **JetBrains Mono** for eyebrows and diagrams
- **Playwright** + `@axe-core/playwright` for end-to-end and WCAG 2 AA checks;
  **Vitest** + RTL for unit tests

## Repo layout

```
app/                  App Router routes (home, case studies, sitemap, robots, OG images)
components/           Reusable UI — hero, nav, splash, diagrams, JSON-LD, magnetic link
components/diagrams/  Inline-SVG pipeline diagrams per case study
content/work/         MDX case studies with Zod-validated frontmatter
lib/                  Content loading, schema, prev/next helpers
public/               Static assets — resume.pdf, llms.txt, favicons
```

## Running locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export to /out
pnpm test       # vitest
pnpm test:e2e   # playwright (starts the dev server automatically)
```

## Case studies

- **[Uplevelit](https://abhithakur.dev/work/uplevelit)** — Experience-as-a-Service
  marketplace. 1:1s, group sessions, livecourses, Q&A. Led engineering.
- **[Penbook](https://abhithakur.dev/work/penbook)** — AI-powered reading and
  writing platform. Solo-built modular NestJS monolith on MongoDB.
- **[Rocket Rebates](https://abhithakur.dev/work/rocket-rebates)** — Rebate
  discovery + AI reports + admin-reviewed submission packages. Solo build.

## Deployment

Static export hosted on Vercel. `robots.ts`, `sitemap.ts`, per-route
`opengraph-image.tsx`, and `Article` JSON-LD (see `components/json-ld.tsx`)
are all pre-rendered at build time. `public/llms.txt` provides a curated
index for LLM citations.
