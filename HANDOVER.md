# Handover — Abdullah Al Mahmud QA Portfolio

**Date:** 22 October 2026  
**Status:** Implementation complete, locally verified and published as a public GitHub repository. **Site not deployed.**  
**Repository:** https://github.com/Mahmud9248/qa-portfolio  
**Project folder:** `qa-portfolio/` (repository root)  
**Production output:** `dist/`

---

## 1. What was delivered

A complete static portfolio for a Manual QA Engineer, built around Abdullah Al Mahmud's actual résumé and portrait.

- Premium charcoal, white and silver design with restrained steel-blue accents.
- Motion-driven page load, scroll reveals, hero portrait treatment, route transitions and interactive QA demonstrations.
- Three fictional, clearly labelled QA case dossiers with test cases, defects, decision tables and SQL evidence.
- Searchable library of ten fictional sample artifacts, with category filters, deep links, keyboard tabs, previous/next navigation, copy and Markdown download.
- Responsive home, case index, three details, artifact library, About/Experience, Contact and 404 routes.
- Self-hosted fonts, AVIF/WebP portrait variants, social card, favicon and Apple touch icon.
- Actual downloadable résumé PDF.
- Cloudflare Pages-ready static output and configuration files.
- This handover and the project `README.md`.

No testimonials, certifications, automation claims or unverifiable employer metrics were added.

---

## 2. Routes implemented

| Route | State |
| --- | --- |
| `/` | Home |
| `/case-studies` | Case study index |
| `/case-studies/financial-validation` | Tier, fee and closure rules dossier |
| `/case-studies/saas-regression-testing` | Workspace seats and roles dossier |
| `/case-studies/api-data-validation` | API and stored-data validation dossier |
| `/qa-artifacts` | Artifact library and deep-linked inspector |
| `/about` | Experience, education, approach and recognition |
| `/contact` | Contact routes, copy-email action and résumé |
| any unknown path | In-app 404 with `noindex` |

All routes are reachable directly in the production preview. Non-home routes are lazy-loaded; the home route remains in the initial bundle for a fast first paint.

---

## 3. Verification record

### Build and type safety

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | Passed |
| Production build | `npm run build` | Passed |
| Chunk warning | Vite build output | None |
| Largest JavaScript chunk | Build report | `index` 404.69 kB (128.45 kB gzip) |
| Shared chunk | Build report | 189.17 kB (63.70 kB gzip) |
| CSS | Build report | 177.06 kB (32.24 kB gzip) |

The final `dist/` was rebuilt after all application changes, including the hero annotation placement, employer marks, Redshift glyph, contrast corrections and the accessible brand name.

### Production preview

All nine route states returned successfully and loaded the expected content:

- `/`
- `/case-studies`
- `/case-studies/financial-validation`
- `/case-studies/saas-regression-testing`
- `/case-studies/api-data-validation`
- `/qa-artifacts`
- `/about`
- `/contact`
- unknown path → rendered 404 page

Additional checks:

- Zero uncaught exceptions across the production route smoke test.
- Direct artifact deep link `?artifact=ART-01` opens the inspector with the correct artifact.
- Résumé PDF returns `200 application/pdf`.
- Portrait AVIF, OG image, Apple touch icon and favicon return 200.
- WalletHub and Codemen logo assets return `200` from `/logos/` and render as monochrome CSS masks in the home summary and beside the timeline headings.
- The hero annotation is hidden at 980 px and below, and clears both the copy and portrait at 981, 1024, 1180 and 1440 px.
- `robots.txt` returns `200 text/plain`.
- `_headers` and `_redirects` are present in `dist/`.

### Interaction checks

**34/34 artifact and navigation assertions passed**, covering:

- Search filtering and result counts.
- Clear-search control.
- Category filtering and active states.
- No-results state and reset.
- Keyboard activation of artifact cards.
- Deep-link URL update.
- Dialog focus management and Escape close.
- Tab arrow-key navigation and panel updates.
- Previous/next pager and tab reset.
- Markdown clipboard copy.
- Markdown file download with valid heading.
- Focus restoration to the invoking artifact card.
- Mobile menu open, focus capture, Escape close and trigger-focus restoration.
- Menu close on route change, About route load and main-landmark focus.
- No horizontal overflow in the tested mobile route.
- No unexpected console errors and no runtime exceptions.

**15/15 demo assertions passed**, covering:

- RuleProbe default state, boundary preset, direct-deposit waiver, reset and promo changes.
- ReleaseGate initial HOLD, transition to GO and restore-sample behaviour.
- ApiConsole initial response, defect scenario, data mismatch and arrow-key view tabs.
- Lifecycle phase tab changes.
- Contact email copy.
- No runtime exceptions.

### Responsive verification

- Full route matrix at **320, 768 and 1024 px**, re-run against the final production preview:
  - 9 routes × 3 widths = **27/27 cases passed**
  - `document.scrollWidth === window.innerWidth` on every case
  - No loose horizontal overflow
  - No uncaught exceptions
- Additional visual spot checks at **390 px and 1440 px**, including the artifact library, artifact inspector, home hero, case index and 404.
- Mobile artifact dialog remains usable at 320 px; wide data tables scroll inside labelled regions by design.
- The hero scroll indicator was aligned to the content gutter at all widths.

### Lighthouse

Audited against the local production preview at `http://127.0.0.1:4173/`. Both the home page and the artifact library returned the same scores:

| Category | Score |
| --- | --- |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

SEO initially failed because `/robots.txt` fell through the SPA fallback. A valid static `robots.txt` was added, and the SEO score returned to 100. The audit was rerun against the rebuilt production output after the final fixes. Two remaining accessibility issues were corrected in the process: low-contrast small metadata in the execution and lifecycle panels, and a brand link whose accessible name omitted its visible role text. The home and artifact-library audits now return 100 across all three categories.

---

## 4. Content and attribution

- Employment history, education, tools and contact details were transcribed from the supplied résumé:
  - WalletHub — Manual QA Engineer, Jan 2026–Sep 2026
  - Codemen Solutions — SQA Engineer, Associate SQA Engineer and SQA Intern, Dec 2021–Jan 2026
  - BSc in CSE, AIUB, 2017–2021, CGPA 3.16/4.00
- Tools are limited to résumé-supported examples: Jira, TestRail, Qase, Postman, Apache JMeter, BrowserStack, MySQL, Amazon Redshift, Stripe test environment and Sentry.io.
- Employer marks: WalletHub uses the official wordmark asset saved at `public/logos/wallethub.svg`; Codemen Solutions Ltd. uses the official asset saved at `public/logos/codemen-solutions.png`. Both are rendered as CSS masks in `currentColor` at 0.82 opacity, so they share the surrounding muted ink shade. They appear in the home experience summary and beside the employer names in the timeline. They identify prior employers only and do not imply endorsement; trademarks remain with their owners.
- Amazon Redshift uses the official AWS Architecture Icons glyph (Q1 2024) as a single path with `fillRule="evenodd"`, rendered in the same monochrome treatment as the other tool marks.
- **SAIL AI award attribution is accurate:** Abdullah contributed to QA of SAIL AI, which received the Realcomm Digie Award 2023 (Best Tech Innovation). The site does not claim he personally received the award.
- The three case studies and ten artifacts are explicitly described as fictional portfolio demonstrations. No employer project, customer data, endpoint or production metric is claimed.
- Phone number is stored in site configuration but hidden (`display: false`).
- The site correctly represents his discipline as manual QA; no automation expertise is implied.

---

## 5. Cloudflare Pages handoff

The source is published in the public GitHub repository. No site deployment, DNS change or Cloudflare setting change has been performed.

Recommended configuration when deployment is approved:

| Setting | Value |
| --- | --- |
| Root directory | repository root (leave blank) |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` via `NODE_VERSION` |

Included deployment files:

- `public/_redirects` → `/* /index.html 200` (copied to `dist/`)
- `public/_headers`:
  - Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`
  - Immutable caching for `/images/*` and `/assets/*`
  - One-hour cache and inline disposition for `/documents/*`
- `public/robots.txt`
- Résumé PDF, portrait variants, social image, icons and favicon

Wrangler deployment command, **to be used only after explicit approval**:

```bash
npx wrangler pages deploy dist --project-name <project-name>
```

### Post-deployment checks (after approval)

1. Confirm every direct route in the table above loads on the Pages URL.
2. Confirm `_headers` is applied at the edge.
3. Confirm `robots.txt` is served as text/plain, not HTML.
4. Check the OG image and canonical URL on the deployed origin.
5. Confirm the résumé PDF downloads.
6. Add the final custom domain and DNS records only with owner approval.
7. Generate and add a sitemap using the final domain, then add its absolute URL to `robots.txt`.
8. Re-run Lighthouse and social-preview debugging against the deployed domain.

---

## 6. Known limitations and notes

- **SPA 404 status:** unknown paths return HTTP 200 from the static host while rendering the in-app 404 with `noindex`. A true HTTP 404 would require route-aware rewrites, pre-rendering or a Pages Function.
- **No sitemap:** intentionally deferred because no production domain has been confirmed. A valid `robots.txt` is present without a `Sitemap:` line.
- **Social metadata:** per-route meta tags are applied client-side after hydration. The static HTML contains baseline metadata; social image URLs become absolute at runtime. Fully static per-route previews would require pre-rendering.
- **Wide tables:** some case-study and artifact data tables scroll horizontally inside focusable regions on narrow screens instead of collapsing every column.
- **Generated assets:** `dist/` and `node_modules/` are ignored by `.gitignore`. The build can be recreated with `npm ci && npm run build`.
- **Working tree:** source is committed and pushed to the public GitHub repository. The site itself is not deployed.

---

## 7. Recommended next steps

1. Review the copy, résumé facts and portrait with Abdullah.
2. Review the mobile artifact interaction and the three fictional dossiers.
3. Review the published repository and keep source changes committed there.
4. Connect the repository to Cloudflare Pages with the settings above and review the preview deployment.
5. After explicit approval, attach the production domain, update DNS, add the sitemap and run final post-deployment checks.
