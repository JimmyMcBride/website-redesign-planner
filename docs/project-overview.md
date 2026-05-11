# Project Overview

<!-- brain:begin project-doc-overview -->
Project: `website-redesign-planner`

Primary runtime: `unknown`

## Repo Map

- `.brain/`
- `agents/`
- `assets/`
- `docs/`
- `references/`
<!-- brain:end project-doc-overview -->

## Local Notes

- `website-redesign-planner` is a reusable agent skill for research-first marketing website redesign work. It does not build a production site by default; it orchestrates a planning workflow that ends in a client-facing report app plus handoff artifacts.
- The repo has two layers:
  - skill/orchestration layer at the root: `SKILL.md`, `README.md`, `references/`, `agents/openai.yaml`
  - generated app/template layer under `assets/sveltekit-report-app-template/`
- The generated report app’s expected review surface is stable and route-based:
  - `/` for analysis
  - `/audit` for source-site audit plus Lighthouse snapshot
  - `/design-systems` for three design directions
  - `/examples` and `/examples/1` through `/examples/4` for homepage demos
- The template app is intentionally data-driven from `src/lib/report-data.ts`, with route pages rendering shared research/design-system content rather than embedding project-specific business logic.
- Verification for downstream generated apps is centered on Bun scripts: `bun run capture:lighthouse`, `bun run check`, `bun run build`, and `bun run capture:screenshots`.
