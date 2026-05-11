# Project Agent Contract

<!-- brain:begin agents-contract -->
Use this file as a Brain-managed project context entrypoint for `website-redesign-planner`.

Brain is intended for AI agents operating in this repo, not as a human-operated project dashboard.

Read the linked context files before substantial work. Prefer the `brain` skill and `brain` CLI for project memory, retrieval, and durable context updates.

## Table Of Contents

- [Overview](./.brain/context/overview.md)
- [Architecture](./.brain/context/architecture.md)
- [Standards](./.brain/context/standards.md)
- [Workflows](./.brain/context/workflows.md)
- [Memory Policy](./.brain/context/memory-policy.md)
- [Current State](./.brain/context/current-state.md)
- [Policy](./.brain/policy.yaml)

## Project Docs

- [README.md](./README.md)
- [project-architecture.md](./docs/project-architecture.md)
- [project-overview.md](./docs/project-overview.md)
- [project-workflows.md](./docs/project-workflows.md)

## Required Workflow

1. If no validated session is active, run `brain prep --task "<task>"`.
2. If a session is already active, run `brain prep`.
3. Read this file and the linked context files still needed for the task.
4. Use `brain context compile --task "<task>"` only when you need the lower-level packet compiler directly.
5. Retrieve project memory with `brain find website-redesign-planner` or `brain search "website-redesign-planner <task>"` when the compiled packet is not enough.
6. Use `brain edit` for durable context updates to AGENTS.md, docs, or .brain notes.
7. Use `brain session run -- <command>` for required verification commands.
8. Finish with `brain session finish` so policy checks can enforce verification and surface promotion review when durable follow-through is still needed.

## Post-Adoption Enrichment

After `brain adopt` creates starter context, the AI agent must scan the repo before treating the templates as complete memory.

1. Treat generated context as starter context, not complete repo memory.
2. Scan repo structure, docs, manifests, entrypoints, tests, CI, config, and deployment surfaces.
3. Update AGENTS.md, docs, or .brain notes with durable project-specific findings.
4. Add focused .brain/resources notes for architecture, workflows, risks, and references that do not belong in top-level templates.
5. Keep generated managed blocks refreshable; put hand-authored findings in Local Notes or dedicated notes.
<!-- brain:end agents-contract -->

## Local Notes

- This repository is a skill/plugin-style repo, not the generated client report app itself. The core operating contract lives in `SKILL.md`, with `README.md` as install/user-facing guidance.
- The main implementation surface for product changes is `assets/sveltekit-report-app-template/`, which is the starter Bun + SvelteKit + TypeScript + Tailwind report app copied into downstream projects.
- Treat `references/research-data-rules.md` and `references/sveltekit-tailwind-typescript.md` as normative support docs. When workflow requirements change, update them alongside `SKILL.md`.
- `assets/project-design-system-skill-template.md` is part of the delivered workflow: the planner generates a project-local design-system skill from this file during Phase 4.
- Ignore repo-local runtime state while scanning: `.brain/state/`, `.brain/sessions/`, and `assets/sveltekit-report-app-template/node_modules/` are local execution artifacts, not durable source surfaces.
- When the template app behavior changes, keep `SKILL.md`, `README.md`, template files under `assets/sveltekit-report-app-template/`, and verification guidance in sync.
