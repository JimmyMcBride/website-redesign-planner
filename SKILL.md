---
name: website-redesign-planner
description: Research, analyze, and plan marketing website redesigns through a 5-phase competitive-intelligence workflow that produces a client-ready Bun, SvelteKit, TypeScript, and Tailwind decision app. Use when the user asks to redesign, rebuild, replace, refresh, or plan a marketing website from market research; create a client-ready website analysis report; compare competitors before building; generate project-specific design system options; or create animated homepage examples for client review before final-site build.
---

# Website Redesign Planner

Run a disciplined website redesign planning process grounded in source material and competitive intelligence. Reuse Firecrawl and frontend design skills; this skill coordinates the workflow and defines the client decision app.

## Operating Rules

- Treat competitor and market research output as evidence, not source copy. Never reuse competitor copy, layouts, logos, or protected assets in the built site.
- Keep client-review examples familiar and source-grounded by default: preserve the source site's real copy, media, section intent, CTA intent, and brand recognition unless the user explicitly asks for a dramatic rebrand or repositioning.
- Do not build the production website during the default workflow. Stop at a SvelteKit report app, client-review examples, and production-build brief.
- Default stack: Bun, SvelteKit, TypeScript, Tailwind, `@tailwindcss/vite`, and `@sveltejs/adapter-static`.
- Generate the report app at the project root for fresh projects. For existing projects, inspect first and ask before converting a non-SvelteKit stack.
- Keep all research artifacts in `.firecrawl/` or `research/`. Add `.firecrawl/` to `.gitignore` if creating files in a repo.
- Produce `DESIGN.md`, `.impeccable.md`, and a project-local design-system skill before creating high-fidelity examples or final-site UI.
- Use project-specific design-system rules for every report page, design-system option, and homepage example after Phase 4.
- Cite or link evidence in reports and summarize confidence when public data is incomplete.
- Generate real Playwright screenshots for example cards before handoff.

## Required Inputs

Proceed with reasonable defaults when possible. Ask only when missing information blocks the next phase.

- Existing website URL, or fresh-project business details.
- Business location or service area when local SEO or reviews matter.
- Optional competitor list, brand constraints, SEO exports, analytics, CRM/customer insights, or client preferences.
- App context: existing repo, base project, or fresh report app.
- Manual client feedback when producing revised directions after the initial report app.

## Resource Map

- Copy `assets/sveltekit-report-app-template/` when creating a fresh report app.
- Copy `assets/project-design-system-skill-template.md` when creating `./.agents/skills/<site>-design-system/SKILL.md`.
- Read `references/research-data-rules.md` before ranking competitors or making SEO/review claims.
- Read `references/sveltekit-tailwind-typescript.md` before scaffolding, merging, or verifying the SvelteKit report app.

## Skill Composition

- Use `firecrawl`, `firecrawl-search`, `firecrawl-crawl`, `firecrawl-download`, and `firecrawl-scrape` for web discovery and capture.
- Use `frontend-design`, `teach-impeccable`, `extract`, `normalize`, and `polish` when shaping, systematizing, or verifying UI.
- Use this skill as the orchestrator: it owns phase order, artifacts, quality gates, and handoff.

## Phase 1: Gather & Understand

1. Verify Firecrawl setup with `firecrawl --status`. If not configured, use the installed Firecrawl onboarding/install skill.
2. If an existing URL is provided, crawl or download the site:
   - Use Firecrawl crawl/download skills.
   - Capture page content, headings, metadata, images/alt text, links, navigation, CTAs, forms, trust signals, service pages, footer data, and visible SEO structure.
   - Save outputs under `.firecrawl/source-site/` or equivalent.
3. If starting fresh, build the business profile from user input and public sources.
4. Produce a compact business brief:
   - offer, audience, service area, conversion goal
   - current messaging strengths and gaps
   - brand and visual signals
   - content inventory and likely page model

## Phase 2: Competitive Research

1. Read `references/research-data-rules.md`.
2. Identify top competitors using hybrid evidence:
   - user-provided competitors first
   - local/organic search visibility
   - visible Google review signals where available
   - Trustpilot or relevant review platforms where available
   - supplied API exports or SEO data when provided
3. Rank five competitors with confidence notes. Do not invent unavailable review counts, ratings, search volume, or rankings.
4. Scrape each competitor for design, content, branding, logos, color cues, SEO signals, CTAs, offers, social proof, and trust signals.
5. Synthesize shared winner patterns and market-specific opportunities.

## Phase 3: Analysis Report

Create or update the SvelteKit report app. For fresh projects, copy `assets/sveltekit-report-app-template/` into the project root, then replace the sample data in `src/lib/report-data.ts` with research-backed content.

The Analysis section at `/` must include:

- executive summary and recommended positioning
- five competitor profiles with logos/screenshots when legally and technically obtainable
- side-by-side brand colors, typography notes, CTAs, offers, proof, and SEO signals
- SEO landscape, keyword/topic gaps, trust gaps, and content recommendations
- prioritized rebuild strategy backed by captured evidence
- limitations section for missing or low-confidence data

The Audit section at `/audit` must include source-site findings, UX issues, conversion gaps, content gaps, technical/SEO observations, accessibility notes, and prioritized fixes.

Do not export a PDF by default. Keep the report client-ready in the SvelteKit app unless the user explicitly asks for another format.

## Phase 4: Wireframes + Design Systems

1. Produce planning artifacts before any production UI:
   - sitemap and navigation model
   - homepage/page section plan
   - conversion strategy and trust proof plan
   - content hierarchy and SEO page targets
   - visual direction derived from the business and competitor synthesis
2. Create exactly three distinct design-system directions in app data and show them at `/design-systems`:
   - positioning rationale
   - color palette and accessible contrast notes
   - typography scale
   - spacing, radii, shadows, motion, and interaction tone
   - component examples for navigation, hero, proof, cards, forms, CTAs, and footer
   - best-fit use cases and tradeoffs
3. Create or update `DESIGN.md`:
   - market context
   - brand strategy
   - page system
   - component inventory
   - design-system options and recommended direction
   - tokens: color, typography, spacing, radii, shadows, motion
   - accessibility and responsive rules
4. Create or update `.impeccable.md` with a `## Design Context` section compatible with frontend design skills.
5. Create `./.agents/skills/<site>-design-system/SKILL.md` from `assets/project-design-system-skill-template.md`.
6. Ensure app navigation links to `/`, `/audit`, `/design-systems`, and `/examples`.

## Phase 5: Examples + Client Decision App

1. Build `/examples` as an index of exactly four homepage demos. Each card needs a real screenshot, layout name, strategy label, and CTA to the demo route.
2. Build four detail routes at `/examples/1` through `/examples/4`. Replace the blank example scaffold components; do not merely fill or theme the bundled placeholders. Each route must be designed from scratch as a distinct layout style using the source homepage's real media, copy, section intent, CTA intent, and brand signals by default.
3. Add a shared design-system switcher. It must support all three design-system directions on every example route using `?system=<slug>` plus localStorage fallback.
4. Render examples from shared source-site/business content data that you create for the project. Vary layout, rhythm, media treatment, section order, motion, proof placement, CTA grouping, hierarchy, and small clarity improvements; do not invent new campaign language, renamed concepts, heavily rewritten copy, or dramatic repositioning unless the user explicitly asks for that.
5. Keep examples as client-review prototypes, not production code. Use source-site/business assets or generated/licensed assets where useful, and never use competitor assets as final production assets.
6. Generate Playwright screenshots for all 12 combinations: 4 examples x 3 design systems. Save them under `static/example-screenshots/`.
7. Add a production-build brief to `DESIGN.md`:
   - recommended direction and rationale
   - selected design-system option or hybrid
   - content and SEO priorities
   - implementation notes for the final production site
8. When manual client feedback revises a direction, update shared app data, `DESIGN.md`, `.impeccable.md`, the project-local design-system skill, screenshots, and handoff notes together so documentation and demos stay aligned.
9. Run app checks:
   - `bun install`
   - `bun run check`
   - `bun run build`
   - `bun run capture:screenshots`
   - browser-check `/`, `/audit`, `/design-systems`, `/examples`, and `/examples/1?system=<slug>` at mobile and desktop widths
10. Final handoff must include:
   - changed files
   - report app path and static build notes
   - Analysis, Audit, Design Systems, and Examples status
   - screenshot generation status
   - selected or recommended design direction
   - production-build brief path
   - verification commands/results
   - known data limits or unresolved decisions

## Report App vs Production Project

- Fresh report app: use the bundled SvelteKit template at repo root.
- Existing SvelteKit project: inspect `package.json`, routes, components, styles, tests, and docs. Merge report routes/components without disrupting working production code.
- Existing non-SvelteKit project: do not convert automatically. Ask before stack migration or create a separate report app only if requested.
- Static publishing: use `@sveltejs/adapter-static`; configure `BASE_PATH` for repository-subpath hosting when needed.
- Final-site build: after the client chooses a direction, use the selected direction and production-build brief to build the final site.
- Existing non-default production stack: do not convert automatically. Ask for confirmation before stack migration.

## Quality Gates

- No phase can rely only on guesses when public data or provided files can be inspected.
- Report claims must map to captured sources or be labeled as inference.
- Design system must be tailored to the specific market and business, not generic Tailwind defaults.
- Report pages and examples must be accessible, responsive, visually consistent, and easy for non-technical clients to review.
- Example screenshots must be real captures of the rendered routes, not hand-drawn placeholders.
- The final report app must be shareable as one linked website with prerendered routes.
- The workflow must not build the production website unless the user explicitly starts a final-site build task.
