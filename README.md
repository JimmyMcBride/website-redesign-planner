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

## Requirements

- Codex with local skills enabled.
- Bun for the generated redesign report app.
- Firecrawl CLI/API setup for website and competitor research.
- Supporting Codex skills listed below.

Install Bun:

```bash
curl -fsSL https://bun.com/install | bash
bun --version
```

Windows:

```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

See the official Bun install docs at <https://bun.sh/docs/installation>.

After this skill creates or updates a report app, run it with:

```bash
bun install
bun run dev
```

Useful verification commands:

```bash
bun run check
bun run build
bun run capture:screenshots
```

## Required Skills

This skill coordinates other skills instead of doing every job itself. Install these before using it for a full redesign plan:

- `firecrawl`: checks Firecrawl setup and supports web capture.
- `firecrawl-search`: finds public competitors and market evidence.
- `firecrawl-crawl`: crawls source and competitor websites.
- `firecrawl-download`: saves website pages, screenshots, and assets when needed.
- `firecrawl-scrape`: extracts clean page content from individual URLs.
- `frontend-design`: builds polished report and example UI.
- `impeccable`: applies higher-quality frontend design standards.
- `teach-impeccable`: records project design context for later UI work.
- `extract`: turns repeated UI patterns into reusable components and tokens.
- `normalize`: keeps generated design systems consistent.
- `polish`: performs final visual and interaction cleanup.

### Install Skills

Preferred Codex flow:

```text
Install these Codex skills: firecrawl, firecrawl-search, firecrawl-crawl, firecrawl-download, firecrawl-scrape, frontend-design, impeccable, teach-impeccable, extract, normalize, and polish.
```

Restart Codex after installing new skills.

Manual flow:

```bash
mkdir -p ~/.codex/skills
cp -R /path/to/firecrawl ~/.codex/skills/
cp -R /path/to/firecrawl-search ~/.codex/skills/
cp -R /path/to/firecrawl-crawl ~/.codex/skills/
cp -R /path/to/firecrawl-download ~/.codex/skills/
cp -R /path/to/firecrawl-scrape ~/.codex/skills/
cp -R /path/to/frontend-design ~/.codex/skills/
cp -R /path/to/impeccable ~/.codex/skills/
cp -R /path/to/teach-impeccable ~/.codex/skills/
cp -R /path/to/extract ~/.codex/skills/
cp -R /path/to/normalize ~/.codex/skills/
cp -R /path/to/polish ~/.codex/skills/
```

Each copied folder must contain its own `SKILL.md`. If your `CODEX_HOME` is not `~/.codex`, copy skills into `$CODEX_HOME/skills` instead.

Check Firecrawl after installing the Firecrawl skills:

```bash
firecrawl --status
```

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
