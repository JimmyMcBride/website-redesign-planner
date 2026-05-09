---
name: {{site-slug}}-design-system
description: Project-local design system for {{site-name}}. Use when creating, editing, polishing, or reviewing this website's SvelteKit report app, design-system options, homepage examples, copy hierarchy, tokens, accessibility, responsive behavior, or future production UI patterns.
---

# {{site-name}} Design System

Use this project-specific skill after the website-redesign-planner Phase 4 design system exists. Read `DESIGN.md` and `.impeccable.md` before changing report routes, components, examples, or final-site UI.

## Required Context

- `DESIGN.md`: source of truth for market strategy, page system, tokens, components, and accessibility rules.
- `.impeccable.md`: design context for audience, brand personality, aesthetic direction, and principles.
- SvelteKit report app routes under `src/routes/`, shared components under `src/lib/`, and project-specific paths documented in `DESIGN.md`.

## Rules

- Build with the documented tokens, components, spacing, typography, color, radii, shadows, and motion rules.
- Keep the report app as a client decision artifact unless the user explicitly starts final-site implementation.
- Prefer shared Svelte components and typed report data before creating new one-offs.
- Add new reusable report or example patterns to the documented system and record them in `DESIGN.md`.
- Keep sections aligned with the site's positioning, conversion strategy, SEO page plan, and proof strategy.
- Do not import competitor copy, layouts, logos, or assets into client-facing examples or production UI.
- Preserve accessibility: semantic headings, useful labels, keyboard support, visible focus, contrast, and reduced-motion support.
- Verify responsive behavior at mobile and desktop widths before handoff.

## Component Additions

When adding a new report pattern or final-site component:

1. Confirm no existing component already covers it.
2. Define the purpose, variants, and content rules.
3. Use semantic tokens instead of unexplained raw values.
4. Support expected responsive states.
5. Add usage notes to `DESIGN.md` if the pattern becomes part of the system.

## Handoff

Summarize changed files, design-system updates, report/example status, screenshot status, verification commands, and any deviations from `DESIGN.md`.
