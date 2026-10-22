# Abdullah Al Mahmud — Manual QA Portfolio

A dark, editorial portfolio for a manual software quality assurance engineer. The site pairs a detailed professional record with three interactive QA case dossiers and a searchable library of sample artifacts.

Source: https://github.com/Mahmud9248/qa-portfolio  
Live: https://mahmudqa.pages.dev/

Built with React, TypeScript, Vite, React Router and Motion. All fonts and images are self-hosted. The build is a static bundle intended for Cloudflare Pages.

> **Demonstration policy:** the three case studies and all ten artifacts are fictional portfolio demonstrations. They do not describe employer systems, real customers or production data. Every interactive scenario is labelled accordingly. Employment history, education and the SAIL AI recognition are taken from the supplied résumé.

---

## Stack

| Area | Choice |
| --- | --- |
| UI | React 19, TypeScript 7 |
| Build | Vite 8 |
| Routing | React Router 7 (SPA) |
| Animation | Motion 14 with reduced-motion support |
| Icons | Lucide React |
| Fonts | Instrument Sans, Instrument Serif and JetBrains Mono via Fontsource |
| Images | Sharp pipeline for AVIF/WebP portrait variants and the social card |

---

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: positioning, selected case work, artifact preview, lifecycle and experience |
| `/case-studies` | Index of the three interactive QA dossiers |
| `/case-studies/financial-validation` | Tier, fee and closure rules |
| `/case-studies/saas-regression-testing` | Workspace seats and roles regression/release gate |
| `/case-studies/api-data-validation` | API response and stored-data validation |
| `/qa-artifacts` | Searchable/filterable artifact library with deep-linked inspector |
| `/about` | Experience, education, working style and recognition |
| `/contact` | Contact details, copy-email action and conversation guidance |
| any other path | In-app 404 with `noindex` metadata |

All non-home routes are lazy-loaded. Unknown paths are handled by the SPA fallback and render the 404 route.

---

## Local development

Requirements: **Node.js 22 LTS** or newer (Vite 8 requires a current Node release), npm 10+. An `.nvmrc` pins Node 22 for local use.

```bash
cd qa-portfolio
npm ci
npm run dev
```

The development server defaults to `http://127.0.0.1:5173/`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run build` | Type-check and create the production bundle in `dist/` |
| `npm run preview` | Serve the built `dist/` locally on port 4173 |
| `npm run optimize:images` | Regenerate responsive portrait files, social card and Apple touch icon |

To check the production output:

```bash
npm run build
npm run preview
```

Then open `http://127.0.0.1:4173/`.

---

## Content source of truth

Content is data-driven. Edit the relevant file under `src/data/` rather than duplicating copy in components.

| File | Contents |
| --- | --- |
| `src/data/site.ts` | Name, role, location, email, LinkedIn, résumé path, navigation and demo disclaimer |
| `src/data/experience.ts` | Employment, education, skills, working preferences and recognition |
| `src/data/caseStudies.ts` | Three fictional dossiers, requirements, risks, test cases, defects, SQL and interactive data |
| `src/data/artifacts.ts` | Ten sample artifacts, categories, tags, tabs, deep-link IDs and download names |
| `src/data/tools.ts` | Résumé-supported tools only |
| `src/data/lifecycle.ts` | QA lifecycle phases on the home page |
| `src/data/execution.ts` | Sample execution evidence |
| `src/types/index.ts` | Shared content types |

### Professional facts and claim boundaries

- Employment history, education, tools and contact details come from the supplied résumé.
- SAIL AI is credited only as a platform to which Abdullah contributed QA. It won the **Realcomm Digie Award 2023 (Best Tech Innovation)**. The site does not claim that he personally won the award.
- No employer project, metric, testimonial, certification, award or automation skill has been invented.
- Phone is stored in `siteConfig.phone` but is hidden by default. Set `display: true` only when the number should be public.
- If case-study or artifact copy is replaced, keep the demonstration disclaimer accurate. Do not present fictional scenarios as client work.

### Replacing the portrait

1. Replace `public/images/profile.jpg` with the new portrait (portrait orientation recommended).
2. Run `npm run optimize:images`.
3. The script regenerates:
   - `profile-480`, `profile-768`, `profile-1080` and `profile-1536` in AVIF and WebP
   - `og-image.png` (1200×630 social card)
   - `icons/apple-touch-icon.png`
   - `images/portrait-manifest.json`

The portrait is intentionally prominent in the home hero and About page. Keep the subject centred enough for the social-card crop.

### Replacing the résumé

Replace `public/documents/resume.pdf` with the updated PDF. The download filename shown to visitors is configured as `siteConfig.resumeFileName` in `src/data/site.ts`; it does not need to match the on-disk filename.

### Employer and tool marks

- **WalletHub:** `public/logos/wallethub.svg`, from WalletHub's official wordmark asset at `https://cdn.wallethub.com/images/wh2015/wallethub-logo-rt_V58ab049_.svg.gz` (downloaded and saved uncompressed).
- **Codemen Solutions Ltd.:** `public/logos/codemen-solutions.png`, from `https://codemen.com/wp-content/uploads/2026/02/codemen-logo.png`.
- **Amazon Redshift:** a single-path glyph from the official AWS Architecture Icons set (Q1 2024; `https://aws.amazon.com/architecture/icons/`), rendered with `fillRule="evenodd"` in `src/data/tools.ts`.

Employer marks are applied as CSS masks by `src/components/ui/CompanyLogo.tsx`. They inherit `currentColor`, so the home experience summary and the timeline headings render both in the same muted ink shade. They identify prior employment only and do not imply endorsement; trademarks remain with their owners.

---

## Interaction and accessibility

- **Artifact library:** text search across titles, summaries, formats and tags; category filters with counts; animated results; empty-state reset; keyboard-activatable cards.
- **Artifact inspector:** deep link via `?artifact=ART-01`; tabbed document/context views; ARIA tab keyboard support; previous/next navigation; copy Markdown; download Markdown; Escape to close; focus restored to the invoking card.
- **QA demonstrations:** `RuleProbe` boundary calculations, `ReleaseGate` release decisions, `ApiConsole` scenario/response/data comparison, lifecycle tabs and an execution lab. Each is labelled fictional.
- **Route changes:** scroll to top, focus the main landmark and support hash targets. The mobile menu traps focus in a native dialog, closes on route change and restores focus to its trigger.
- **Motion:** MotionConfig follows the user's reduced-motion preference; CSS also disables non-essential animation and scanning effects under `prefers-reduced-motion`.
- **Semantics:** skip link, landmarks, labelled controls, visible focus, native dialog semantics and table captions/regions.

Manual QA is the subject of the site. No automated-testing expertise is implied by the demos.

---

## SEO and metadata

- The static HTML includes absolute canonical, Open Graph and Twitter URLs for `https://mahmudqa.pages.dev/`, so link-preview crawlers that do not run JavaScript can resolve the 1200×630 social card.
- Per-route `<title>`, description, canonical URL, Open Graph and Twitter metadata are also updated at runtime. The canonical path omits query parameters.
- The home page includes valid `Person` JSON-LD built from the résumé facts.
- The 404 route sets `robots` to `noindex, nofollow`.
- `public/robots.txt` is valid and intentionally contains no `Sitemap:` entry until the final custom domain is confirmed.
- `public/_headers` adds security headers plus long-lived cache headers for `/images/*` and `/assets/*`.
- `public/_redirects` is retained as a compatibility fallback. The live Pages project also serves `index.html` for unknown paths, which keeps direct deep links working.

After the final custom domain is known, update the absolute baseline URLs in `index.html`, add a sitemap, and add its absolute URL to `robots.txt`. Runtime metadata uses `window.location.origin` for client-side route changes.

---

## Cloudflare Pages

The site is live at **https://mahmudqa.pages.dev/**. It deploys from the `main` branch of the GitHub repository through Cloudflare Pages.

| Setting | Value |
| --- | --- |
| Project name | `mahmudqa` |
| Root directory | repository root (leave blank) |
| Framework preset | Vite / React Router (detected) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 22 (build image selected 22.22.0) |

The production deployment `7bf482a7-19e5-457d-90f1-fb62a010fe48` completed successfully on 22 October 2026. The build log confirmed Node 22.22.0, `npm ci`, `npm run build`, a successful Vite build and the upload of `dist/`.

The files in `public/` are copied into `dist/` by Vite:

- `_redirects` is retained as a compatibility fallback. Cloudflare Pages also serves `index.html` for unknown paths, so direct links to case studies and artifacts work on refresh.
- `_headers` applies security and cache policy at the Pages edge.
- `robots.txt`, favicon, portrait variants and the résumé PDF are included.

If reconnecting or replacing the project, connect the repository and use the settings above. If using Wrangler, run this only after deployment is explicitly approved:

```bash
npx wrangler pages deploy dist --project-name mahmudqa
```

Add a custom domain and DNS records only with the owner's approval. Preview deployments are suitable for review before any production DNS change.

### Live deployment checks

Verified against `https://mahmudqa.pages.dev/` after the successful production deployment:

- `/` serves the built bundle, not the source `/src/main.tsx` entry.
- `/`, `/about`, `/qa-artifacts`, `/case-studies` and `/case-studies/financial-validation` return HTML and render the expected route.
- Unknown paths fall through to the SPA and render the in-app 404.
- `/assets/index-DT_RvWjB.js` returns `application/javascript`.
- `/images/profile-768.avif` returns `image/avif`.
- `/documents/resume.pdf` returns `application/pdf`.
- `/robots.txt` returns `text/plain`.
- `_headers` is applied at the edge: security headers are present, `/assets/*` and `/images/*` are immutable for one year, and the résumé is served inline for one hour.
- Link-preview metadata is absolute in the static HTML: `og:image` and `twitter:image` point to `https://mahmudqa.pages.dev/images/og-image.png`; the 1200×630 PNG returns `image/png`.
- Home, About, Case Studies, Case Study 01 and QA Artifacts were loaded in a browser with no console errors; the 404 was also verified through the fallback.

### SPA 404 note

Because the SPA fallback returns `index.html`, an unknown URL responds with HTTP 200 and then displays the in-app "No matching record" page with `noindex`. Direct deep links work. A true HTTP 404 response would require route-aware rewrites, pre-rendering or a Pages Function, and was not introduced because it would complicate static deep links.

---

## Project structure

```text
qa-portfolio/
├─ public/
│  ├─ documents/resume.pdf
│  ├─ icons/
│  ├─ images/                 # portrait source, generated variants, OG card
│  ├─ _headers
│  ├─ _redirects
│  ├─ favicon.svg
│  └─ robots.txt
├─ scripts/optimize-images.mjs
├─ src/
│  ├─ components/             # layout, home, case-study, artifact, QA and UI components
│  ├─ data/                   # all editable content
│  ├─ hooks/                  # metadata, media queries, scroll spy
│  ├─ lib/                    # formatting, downloads, motion, class helpers
│  ├─ pages/                  # route components
│  ├─ styles/global.css
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

---

## Verification

The current build was verified with:

- `npm run typecheck` — passed
- `npm run build` - passed; entry JS ~404 kB (~128 kB gzip) plus a shared ~189 kB (~64 kB gzip) chunk, with route pages split out; no Vite chunk-size warning
- Local production preview — all nine route states load directly, including deep links and the 404 state
- Responsive route matrix — nine routes at 320/768/1024 px with no horizontal document overflow or runtime exceptions
- Interaction checks — artifact search, filters, empty state, keyboard/dialog focus, tabs, pager, copy, Markdown download, mobile menu and route focus
- Demonstration checks — 15/15 assertions for rule, gate, API, lifecycle and contact-copy behaviour
- Lighthouse on the local production build — Accessibility 100, Best Practices 100, SEO 100
- Latest post-fix audit (21 October 2026) — interaction 34/34, demos 15/15, responsive 27/27; Lighthouse Accessibility 100, Best Practices 100, SEO 100 on both home and the artifact library.
- Final layout and asset check — hero annotation hidden at 980 px and below, clear of the portrait and copy at 981/1024/1180/1440 px; WalletHub and Codemen masks return 200 and render in both the experience summary and timeline headings; the Redshift glyph uses the AWS path with `evenodd` fill.
- Live Cloudflare Pages deployment (22 October 2026) — production build `npm run build` succeeded on Node 22.22.0; home, About, Case Studies, Case Study 01, QA Artifacts, résumé PDF, portrait AVIF, built JavaScript and `robots.txt` returned the expected content types; no console errors were recorded on the rendered routes.

See `HANDOVER.md` for the detailed verification record and known limitations.

---

## Known limitations

- The three case studies and ten artifacts are fictional demonstrations, not employer case studies.
- Data tables inside some narrow-screen case-study and artifact panels scroll horizontally by design.
- The unknown-route HTTP response status is 200 because of the SPA fallback, while the rendered page is an in-app 404 with `noindex`.
- No sitemap is included while the final custom domain is pending; the Pages URL is live.
- Social metadata is applied by the client after hydration. The static HTML includes baseline metadata for crawlers and link previews, but a fully static per-route social preview would require pre-rendering.
