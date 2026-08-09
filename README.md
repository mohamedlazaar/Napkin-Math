# Napkin Math — static calculator hub

A statically generated Next.js site for free business/finance calculators, built for
ad revenue: many indexable pages, fast Core Web Vitals, and **zero per-request
server cost**.

Every page is prerendered at build time. Nothing calls an API, nothing touches a
database, and no route runs a server function in production — Vercel serves plain
HTML from its CDN.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # set NEXT_PUBLIC_SITE_URL at minimum
npm run dev                    # http://localhost:3000
npm run build                  # prerenders every page
```

Deploy: push to GitHub, import the repo in Vercel, add the env vars from
`.env.example` in **Project Settings → Environment Variables**. Free tier is enough —
there are no serverless functions to pay for.

### Current build

| | |
|---|---|
| Pages generated | 68 — 8 calculators + 53 industry variants + home/about/privacy/404/sitemap/robots |
| Route rendering | 100% static (`○` / `●` in the build output — no `ƒ`) |
| HTML per page | 14–16 KB gzipped |
| First-load JS | ~137 KB gzipped, of which ~2 KB is this repo — the rest is React 19 + the Next runtime |
| Internal links | 2,386, zero broken |

First-load JS is flat at ~137 KB whether the site has one calculator or eight, because
page copy never crosses to the client — see "the config never ships" below.

### Calculators

| Calculator | Route | Variants |
|---|---|---|
| CAC | `/cac-calculator` | 12 |
| LTV | `/ltv-calculator` | 7 |
| LTV:CAC ratio | `/ltv-cac-ratio-calculator` | 6 |
| Churn rate | `/churn-rate-calculator` | 6 |
| MRR & ARR | `/mrr-arr-calculator` | 5 |
| SaaS break-even | `/saas-break-even-calculator` | 5 |
| ROAS | `/roas-calculator` | 6 (by ad channel) |
| Pricing & margin | `/pricing-margin-calculator` | 6 |

---

## Where everything lives

```
site.config.ts             Site name, URL, contact. Edit once.
data/
  calculators/index.ts     ← REGISTER CALCULATORS HERE (the one file that matters)
  calculators/cac.ts       ← One calculator = one file. Copy this to add a tool.
  affiliates.ts            ← Your affiliate offers.
  ad-network.ts            ← YOUR AD NETWORK GOES HERE (any provider).
lib/
  types.ts                 The shape of a calculator config.
  formulas.ts              ← Pure maths. The ONLY calculator code sent to the browser.
  registry.ts              Lookups, related links, sitemap paths.
  seo.ts                   Metadata + JSON-LD builders.
  format.ts                Number formatting.
components/
  CalculatorPageView.tsx   The whole page body, shared by calculators and variants.
  CalculatorWidget.tsx     The single client component on the site.
  ads/AdSlot.tsx           One ad placement, height-reserved. Network-agnostic.
  ads/AdNetworkScript.tsx  Loads your network's script once, after interactive.
app/
  [slug]/page.tsx          Every calculator page. One file, all tools.
  [slug]/[variant]/page.tsx  Every programmatic long-tail page.
  sitemap.ts / robots.ts   Auto-generated from the registry.
```

The important property: **`app/` and `components/` never change when you add
content.** Adding a calculator is a data edit plus a formula.

---

## Adding a calculator (about 20 minutes, most of it writing copy)

**1. Add the maths** to `lib/formulas.ts`:

```ts
export const formulas: Record<string, FormulaFn> = {
  cac: (v) => { /* ... */ },

  ltv: (v) => {
    const grossProfit = v.arpaMonthly * (v.grossMarginPct / 100);
    const lifetimeMonths = div(100, v.monthlyChurnPct);   // div() guards ÷0
    return {
      ltv: lifetimeMonths === null ? null : grossProfit * lifetimeMonths,
      lifetimeMonths,
    };
  },
};
```

Return `null` for anything undefined (divide-by-zero, missing input) and the UI
renders `—` instead of `NaN`.

**2. Copy `data/calculators/cac.ts`** to `data/calculators/ltv.ts` and fill in the
config. The type in `lib/types.ts` documents every field; TypeScript will tell you
what's missing.

**3. Register it** in `data/calculators/index.ts`:

```ts
import { ltv } from './ltv';
export const calculators: CalculatorConfig[] = [cac, ltv];
```

That's it. You now have `/ltv-calculator`, one page per variant, a homepage card,
sitemap entries, JSON-LD, and internal links from every calculator that lists
`'ltv-calculator'` in its `related` array.

> `related` slugs that aren't registered yet are silently skipped — so you can list
> your entire roadmap in each config today and the links switch on as tools ship.

### The config never ships to the browser

`CalculatorWidget` receives only `formulaId` plus the serialisable field and result
specs. The config object — every paragraph, FAQ and worked example — stays on the
server. That is why first-load JS didn't move at all between 1 calculator and 8, and
it is the one rule to preserve if you refactor: **never pass a `CalculatorConfig`
into a client component.**

### Adding a long-tail page

One entry in that calculator's `variants` array → one new indexed page at
`/<calculator>/<variant-slug>`. Each variant supplies its own intro, cost checklist,
benchmark ranges, pre-filled realistic inputs, worked example and extra FAQs, so the
pages are differentiated rather than templated filler.

Scale check: the current 53 variants come from 8 data files. Taking every calculator
to 12 variants (CAC already is) would put the site at ~100 pages without a single new
component.

---

## Adding your ad network

The ad layer is **network-agnostic**. There is no AdSense code in this repo — every
placement is just the HTML snippet your network gives you, so Media.net, Ezoic,
Adsterra, Monetag, Infolinks, a header-bidding partner or a direct sponsor all drop
in the same way.

Everything lives in **`data/ad-network.ts`**:

```ts
export const adNetwork = {
  enabled: true,                      // master switch
  displayName: 'Media.net',           // shown in the privacy policy
  preconnect: ['https://contextual.media.net'],
  loader: { src: '', inline: '' },    // the one-time script they give you
  slots: {
    header: { html: '<paste their snippet>', ... },
    inContent: { html: '...', ... },
    inContentSecondary: { html: '...', ... },
    sidebar: { html: '...', ... },
    footer: { html: '...', ... },
  },
};
```

Worked examples for Media.net, Ezoic, Adsterra/Monetag, Infolinks and direct
sponsors are in the comment block at the bottom of that file.

**Until a slot has a snippet, it renders a labelled grey placeholder of exactly the
same height as the real ad.** That is deliberate: your layout — and your CLS score —
are identical before and after you switch ads on.

> **Why raw snippets work here.** `AdSlot` is a React Server Component, so the
> snippet is baked into the static HTML at build time. Scripts present in the initial
> document execute normally — unlike scripts injected client-side via `innerHTML`,
> which browsers refuse to run. Nothing in the ad path is ever hydrated.

Placements per page: header leaderboard, in-content rectangle after the calculator,
a second in-content rectangle before the FAQ, a sticky 300x600 sidebar (desktop
only), and a footer rectangle.

### Picking a network

| Network | Traffic minimum | Notes |
|---|---|---|
| **Media.net** | Quality review, no hard floor | Yahoo/Bing demand, fully independent of Google. Best fit for US/UK/CA B2B traffic. |
| **Ezoic** | None | Big lift in fill and testing, but it is a Google Certified Publishing Partner — confirm with them that a prior Google ban doesn't block you. |
| **Journey by Mediavine** | ~10k sessions/mo | Step up from Ezoic once traffic exists. |
| **Mediavine / Raptive** | 50k / 100k sessions/mo | Highest RPMs. A later goal, not a starting point. |
| **Adsterra / Monetag** | Effectively none | Will approve almost anyone, but the high-paying formats are popunders and push notifications. They will damage Core Web Vitals, bounce rate, and the affiliate conversions that are worth more than the ad impressions. |
| **Infolinks** | Low | In-text ads; runs alongside another network rather than instead of one. |

### Before you apply

- `/privacy` and `/about` exist and are linked in the footer — every network checks
  for both. **Read them and replace the bracketed placeholders**, especially
  `displayName` in `data/ad-network.ts` (which the privacy policy renders) and the
  analytics paragraph. An inaccurate ad disclosure is the specific thing that gets
  flagged in review.
- Set `contactEmail` and `publisher` in `site.config.ts`.

## Adding your affiliate offer

Edit `data/affiliates.ts`. Fill in `url` for `default`, or key an offer by a
calculator's `category` to target it. An empty `url` hides the block entirely, so it
is safe to ship unfilled. Links get `rel="sponsored nofollow noopener"` and a
disclosure line automatically.

---

## How the SEO works

- **Metadata** — every page goes through `buildMetadata()` in `lib/seo.ts`, so
  title, description, canonical, OpenGraph and Twitter tags can't drift apart.
  `metadataBase` in `app/layout.tsx` makes canonicals absolute.
- **Structured data** — `WebApplication` + `FAQPage` + `BreadcrumbList` per
  calculator page, `WebSite` sitewide, `ItemList` on the homepage. Server-rendered
  as `<script type="application/ld+json">`; costs zero client JS.
- **Sitemap & robots** — generated from the registry at build time, so they can
  never fall out of sync with the pages that exist. `robots.ts` explicitly allows
  `Mediapartners-Google` and `AdsBot-Google`; if those crawlers are blocked you get
  untargeted, low-paying ads.
- **Internal linking** — homepage links every calculator *and* every variant
  directly (variants are otherwise two clicks deep and get crawled far less), each
  calculator links to its variants and to related tools, and each variant links back
  up to its parent.
- **Speed** — system font stack (no font requests, no FOUT), no images, no CSS-in-JS,
  one small client component. The primary result is server-rendered with the default
  inputs, so the page shows a correct answer before hydration.

### After deploying

1. Set `NEXT_PUBLIC_SITE_URL` in Vercel, or every canonical will say `example.com`.
2. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
3. Optionally set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for the meta-tag
   verification method.

---

## Notes

- **Hosting elsewhere.** Uncomment `output: 'export'` in `next.config.mjs` and
  `npm run build` emits a plain `out/` directory — deployable to Cloudflare Pages,
  S3 or any static host. Everything in the repo is already compatible.
- **`dynamicParams = false`** on both dynamic routes means an unknown slug 404s
  instead of rendering on demand. That's what guarantees no function ever runs in
  production.
- **Benchmarks are directional.** The ranges in the variant data are honest
  order-of-magnitude guidance with a caveat line on each page, not survey data. If
  you later cite a real source, put it in the `benchmark.note` field.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build + prerender
npm run start      # serve the production build locally
npm run typecheck  # tsc --noEmit
```
