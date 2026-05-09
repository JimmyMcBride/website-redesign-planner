# Website Redesign Planner

Website Redesign Planner is a Codex skill for planning marketing website redesigns with research, competitor analysis, and client-ready design options before production build work begins.

It guides a five-phase workflow that produces a Bun, SvelteKit, TypeScript, and Tailwind report app with analysis, audit findings, design-system options, homepage examples, screenshots, and a production-build brief.

## What It Does

- Reviews the existing website or builds a business brief from fresh inputs.
- Researches competitors and market patterns using captured evidence.
- Creates a client-facing SvelteKit report app.
- Defines three tailored design-system directions.
- Builds four homepage demo directions for review.
- Keeps final production-site implementation separate until a direction is chosen.

## Workflow

1. Gather source-site or business context.
2. Research and rank relevant competitors.
3. Build the analysis and audit report.
4. Plan sitemap, page structure, and design-system options.
5. Create homepage examples, screenshots, and handoff notes.

## Repository Contents

- `SKILL.md`: main skill instructions and workflow.
- `agents/openai.yaml`: agent display metadata and default prompt.
- `references/`: supporting rules for research and SvelteKit setup.
- `assets/project-design-system-skill-template.md`: template for generated project design-system skills.
- `assets/sveltekit-report-app-template/`: starter SvelteKit report app.

## Usage

Install or copy this folder into a Codex skills directory, then ask Codex to use `website-redesign-planner` for a redesign planning task.

Example:

```text
Use website-redesign-planner to plan a redesign for https://example.com and produce the client-ready report app.
```

## Notes

- The skill is evidence-first: public claims should cite captured sources or be marked as inference.
- Competitor material is used for analysis only, not copied into final designs.
- The default output is a planning/report app, not a finished production website.

## License

MIT License. See `LICENSE`.
