# Website Redesign Planner

Website Redesign Planner is an agent skill for planning marketing website redesigns with research, competitor analysis, and client-ready design options before production build work begins.

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
- `agents/openai.yaml`: optional OpenAI/Codex display metadata and default prompt.
- `references/`: supporting rules for research and SvelteKit setup.
- `assets/project-design-system-skill-template.md`: template for generated project design-system skills.
- `assets/sveltekit-report-app-template/`: starter SvelteKit report app.

## Requirements

- An AI agent that can use local `SKILL.md`-style skills.
- Bun for the generated redesign report app.
- Firecrawl CLI/API setup and Firecrawl agent skills for website and competitor research.
- Impeccable design skills for frontend design review and polish.

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

This skill coordinates other skills instead of doing every job itself. Install this skill and its supporting skills into the same global skills directory before running a full redesign plan.

Use `~/.agents/skills` as the default global skills directory. It works well for shared agent skills across tools that support `.agents`-style skills.

### Install Skills

Create the global skills directory:

```bash
export AGENT_SKILLS_DIR="$HOME/.agents/skills"
mkdir -p "$AGENT_SKILLS_DIR"
```

Clone this skill into the global skills directory:

```bash
git clone https://github.com/JimmyMcBride/website-redesign-planner.git "$AGENT_SKILLS_DIR/website-redesign-planner"
```

Install Firecrawl CLI and its agent skills from <https://github.com/firecrawl/cli/>.

The Firecrawl install provides the web research skills this planner expects, including search, scrape, crawl, map, download, and browser-style web work.

Common Firecrawl setup:

```bash
npm install -g firecrawl-cli
firecrawl setup skills
firecrawl --status
```

Or use Firecrawl's one-command setup from its README:

```bash
npx -y firecrawl-cli init -y --browser
```

Install Impeccable from <https://github.com/pbakaus/impeccable>.

Impeccable provides the design-quality skill set this planner uses for frontend direction, audits, normalization, extraction, and polish. Follow its README for your agent. For `.agents`-style global installs, copy its skills into `~/.agents/skills`.

Common Impeccable setup:

```bash
git clone https://github.com/pbakaus/impeccable.git /tmp/impeccable
cp -R /tmp/impeccable/dist/agents/.agents/skills/* "$AGENT_SKILLS_DIR/"
```

After setup, your global skills directory should include this planner plus Firecrawl and Impeccable skills:

```text
~/.agents/skills/
  website-redesign-planner/
    SKILL.md
  firecrawl*/
    SKILL.md
  impeccable/
    SKILL.md
```

Depending on your Impeccable install, related commands or skills may appear as separate folders such as `audit`, `extract`, `normalize`, or `polish`. That is fine as long as your agent can discover them.

Before running the planner, confirm your agent can see these capabilities or close equivalents:

- Firecrawl web research: setup check, search, scrape, crawl, download, map, and browser-style interaction.
- Impeccable design workflow: frontend direction, design context, audit, extraction, normalization, and polish.

Restart or reload your agent after adding new skills so it can discover them.

## Usage

Install this folder in your agent's global skills directory, make sure the supporting skills are installed beside it, then ask your agent to use `website-redesign-planner` for a redesign planning task.

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
