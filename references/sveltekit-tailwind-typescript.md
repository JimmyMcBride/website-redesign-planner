# SvelteKit Report App Defaults

Use when website-redesign-planner creates or merges the client decision report app.

## Detection

Inspect before changing:

- `package.json` scripts and dependencies
- `svelte.config.*`, `vite.config.*`, `tsconfig.*`
- `src/routes`, `src/lib`, `src/app.css`
- existing component library or design tokens

If the existing project is not SvelteKit/Tailwind, ask before converting it.

## Fresh Report App Defaults

- Default runtime/package manager: Bun.
- Default framework: SvelteKit with TypeScript.
- Default styling: Tailwind through `@tailwindcss/vite`.
- Default output: prerendered report app with `@sveltejs/adapter-static`.
- Prefer current official Svelte and Tailwind setup commands. Check official docs before scaffolding a fresh project: `https://svelte.dev/docs` and `https://tailwindcss.com/docs/installation/framework-guides/sveltekit`.
- As of the current Tailwind SvelteKit guide, the manual setup uses `sv create`, `tailwindcss`, `@tailwindcss/vite`, Tailwind in `vite.config.ts`, and `@import "tailwindcss"` in `src/app.css`.
- With Bun, prefer Bun equivalents where supported, such as `bunx sv create <project>` and `bun add -d tailwindcss @tailwindcss/vite`; verify command support before relying on it.
- For a fresh website-redesign-planner report, copy `assets/sveltekit-report-app-template/` into the project root, then replace sample data and content.

## Default Project Structure

Use existing conventions if present. For fresh builds, prefer:

```text
src/lib/components/
src/lib/components/examples/
src/lib/components/ui/
src/lib/content/
src/routes/
src/routes/(report)/
src/routes/(examples)/
src/routes/(examples)/examples/[id]/
src/app.css
static/example-screenshots/
scripts/capture-screenshots.ts
DESIGN.md
.impeccable.md
.agents/skills/<site>-design-system/SKILL.md
```

## Route Contract

- `/` is Analysis.
- `/audit` is the source-site audit.
- `/design-systems` compares exactly three design-system directions.
- `/examples` lists exactly four homepage demo cards with screenshots.
- `/examples/1` through `/examples/4` render the four animated homepage demos.
- Demo pages must support `?system=<slug>` for every design-system slug and should persist the user's latest choice in localStorage.

## Component Standards

- Use Svelte components with typed props.
- Put reusable primitives in `src/lib/components/ui`.
- Put report and example sections in `src/lib/components`.
- Keep tokens in Tailwind theme CSS, CSS variables, or the repo's existing token system.
- Use `lucide-svelte` when icon buttons or familiar symbols are needed and the dependency is acceptable.
- Avoid one-off hard-coded colors, spacing, shadows, and radii after `DESIGN.md` exists.
- Keep example layouts distinct while reading from shared business/content data.
- Generate screenshots with Playwright after the design-system data and example routes are final.

## Verification

Run available repo commands in this order when applicable:

```bash
bun install
bun run check
bun run test
bun run build
bun run capture:screenshots
```

If a script does not exist, skip it and note that. Verify `/`, `/audit`, `/design-systems`, `/examples`, and one example route with each design-system query at mobile and desktop widths.
