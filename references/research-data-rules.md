# Research Data Rules

Use these rules before competitor ranking, review claims, SEO claims, and report recommendations.

## Source Priority

1. User-provided exports or APIs: Search Console, Google Business Profile, SEMrush/Ahrefs, GA4, CRM, review exports.
2. Public source pages: search results, review pages, business profiles, competitor sites, schema, sitemaps, public metadata.
3. Firecrawl search/scrape/crawl outputs.
4. Inference from repeated visible patterns, clearly labeled as inference.

## Competitor Ranking

- Rank five competitors from a weighted view of visibility, reviews, relevance, service overlap, geography, and site quality.
- Prefer direct market competitors over directories, marketplaces, publications, or national brands that do not compete for the same buyer.
- Keep a `confidence` label: high, medium, or low.
- Record evidence fields separately: rating, review count, Trustpilot signal, query visibility, location fit, service fit, source URL.
- Do not fabricate numbers or normalize across platforms without saying how the comparison was made.

## SEO Landscape

- Extract visible title tags, meta descriptions, H1/H2 structure, service pages, location pages, internal links, FAQ/schema signals, and content depth.
- Identify keyword gaps from repeated competitor page themes and supplied SEO exports.
- If search volume or rankings are unavailable, label topic recommendations as market/topic opportunities, not measured search-volume claims.

## Brand and Trust Signals

- Capture colors from screenshots/assets when possible, but treat approximate values as approximate.
- Compare proof elements: reviews, certifications, guarantees, case studies, before/after work, pricing clarity, team credentials, locations, response-time promises.
- Flag missing proof by buyer risk: money risk, time risk, safety risk, quality risk, trust risk.

## Copyright and Ethics

- Competitor research is for strategy only.
- Do not copy competitor copy, page structures verbatim, logos, proprietary images, testimonials, schema payloads, or downloadable assets into the production site.
- Summarize competitor material and create original positioning, copy, and design.
- For client reports, use logos/screenshots only as comparative commentary and keep them in the report, not production marketing assets.

## Artifact Hygiene

- Keep raw research in `.firecrawl/` or `research/raw/`.
- Keep synthesized notes in `research/synthesis/` or inside the report source.
- Include source URLs in reports. Include capture dates when useful.
- Avoid pasting giant raw scrape files into chat. Inspect with `rg`, `jq`, `head`, and focused reads.
