# Project Architecture

<!-- brain:begin project-doc-architecture -->
Use this file for the structural shape of the repository.

## Architecture Notes

- Keep repo boundaries explicit and document key entrypoints in this file.
- Update this file when runtime architecture or integration boundaries change.
<!-- brain:end project-doc-architecture -->

## Local Notes

- Top-level repository boundaries:
  - `SKILL.md`: source-of-truth workflow contract for the planner
  - `README.md`: installation and usage guidance for humans/agents
  - `references/`: supporting rules for research claims and SvelteKit report-app defaults
  - `agents/openai.yaml`: display metadata and default prompt for compatible agent runtimes
  - `assets/project-design-system-skill-template.md`: template for generated project-local design-system skills
  - `assets/sveltekit-report-app-template/`: starter app copied into downstream client-report projects
- The template app architecture is a static-prerendered SvelteKit app using `@sveltejs/adapter-static` with two route groups:
  - `(report)` for Analysis, Audit, Design Systems, and Examples index
  - `(examples)` for the full-screen example demo layouts
- Shared template state lives in `src/lib/`:
  - `report-data.ts` for business/report/design-system/example content
  - `design-system-state.ts` for query-param plus localStorage system switching
  - `lighthouse-summary.ts` for typed loading/validation of normalized Lighthouse artifacts
  - `components/DesignSystemSwitcher.svelte` plus example components for reusable UI
- Template scripts live under `scripts/`:
  - `capture-screenshots.ts` runs preview + Playwright screenshots for example cards
  - `capture-lighthouse.ts` runs homepage Lighthouse, preserves the raw report under `research/lighthouse/`, and writes normalized UI JSON into `src/lib/content/`
- The template app may have local `node_modules/` during development inside this repo, but that directory is governed by the template’s own `.gitignore` and should not be treated as committed architecture.
