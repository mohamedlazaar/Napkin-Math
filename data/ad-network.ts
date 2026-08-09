/**
 * AD NETWORK CONFIG — network-agnostic.
 *
 * This file is the only place ad code lives. It works with ANY display network
 * (Media.net, Ezoic, Adsterra, Monetag, Infolinks, Mediavine, a header-bidding
 * partner, or a direct sponsor) because every placement is just the HTML snippet
 * your network gives you.
 *
 * How to switch on ads:
 *   1. Put your network's loader script in `loader` below.
 *   2. Paste each placement's snippet into `slots`.
 *   3. Set `enabled: true`.
 *
 * Until then every slot renders a labelled placeholder of exactly the same
 * height, so switching ads on cannot shift your layout or your CLS score.
 *
 * WHY SNIPPETS WORK HERE: these components are React Server Components, so the
 * snippet is baked into the static HTML at build time. Scripts present in the
 * initial document execute normally — unlike scripts injected client-side via
 * innerHTML, which browsers refuse to run. Nothing here is ever hydrated.
 */

export type AdPlacement =
  | 'header'
  | 'inContent'
  | 'inContentSecondary'
  | 'sidebar'
  | 'footer';

export interface AdSlotConfig {
  /**
   * The exact snippet from your ad network. Can contain <div>, <ins>, <script>
   * — whatever they give you. Leave empty to render a placeholder instead.
   */
  html: string;
  /** Shown on the placeholder while this slot is empty. */
  label: string;
  /**
   * Reserved height. MUST match the ad unit you configure at the network, or
   * you reintroduce the layout shift this whole design exists to prevent.
   */
  className: string;
}

export const adNetwork = {
  /** Master switch. Nothing ad-related renders while this is false. */
  enabled: false,

  /** Name of your network, shown in the privacy policy. Keep it accurate. */
  displayName: '[YOUR AD NETWORK]',

  /**
   * Origins to preconnect to, so the first ad paints faster. Use your network's
   * ad-serving domains. Example for Media.net:
   *   ['https://contextual.media.net', 'https://media.net']
   */
  preconnect: [] as string[],

  /**
   * The one-time loader your network asks you to put in <head> or before </body>.
   * Provide either a src URL or an inline snippet — not both.
   *
   * Loaded with next/script strategy="afterInteractive" so it never blocks
   * first paint. Do not change that to beforeInteractive.
   */
  loader: {
    src: '',
    inline: '',
  },

  /**
   * Per-placement snippets. Sizes are chosen to match standard IAB units, which
   * every network supports.
   */
  slots: {
    header: {
      html: '',
      label: 'Header ad — 728×90 leaderboard',
      className: 'h-[100px] sm:h-[90px]',
    },
    inContent: {
      html: '',
      label: 'In-content ad — 336×280 rectangle',
      className: 'h-[280px] sm:h-[250px]',
    },
    inContentSecondary: {
      html: '',
      label: 'In-content ad — 336×280 rectangle',
      className: 'h-[280px] sm:h-[250px]',
    },
    sidebar: {
      html: '',
      label: 'Sidebar ad — 300×600 half page',
      className: 'h-[600px]',
    },
    footer: {
      html: '',
      label: 'Footer ad — 336×280 rectangle',
      className: 'h-[280px] sm:h-[250px]',
    },
  } satisfies Record<AdPlacement, AdSlotConfig>,
};

export const isAdsEnabled = adNetwork.enabled;

export function getSlot(placement: AdPlacement): AdSlotConfig {
  return adNetwork.slots[placement];
}

/** True when this specific placement has a snippet ready to serve. */
export function isSlotFilled(placement: AdPlacement): boolean {
  return adNetwork.enabled && adNetwork.slots[placement].html.trim().length > 0;
}

/* ---------------------------------------------------------------------------
 * WORKED EXAMPLES — delete whichever you don't use.
 *
 * MEDIA.NET (Yahoo/Bing contextual — fully independent of Google)
 *   loader: { inline: 'window._mNHandle=window._mNHandle||{};window._mNHandle.queue=window._mNHandle.queue||[];medianet_versionId="3121199";' }
 *   plus their <script src="//contextual.media.net/dmedianet.js?cid=YOUR_CID">
 *   slots.header.html:
 *     '<div id="YOUR_CRID"></div><script>try{window._mNHandle.queue.push(function(){window._mNDetails.loadTag("YOUR_CRID","728x90","YOUR_CRID");});}catch(e){}</script>'
 *
 * EZOIC (needs their script in <head>; placeholders by numeric id)
 *   loader: { src: 'https://cmp.gatekeeperconsent.com/min.js' }   // plus their sa.min.js
 *   slots.header.html:
 *     '<div id="ezoic-pub-ad-placeholder-101"></div>'
 *
 * ADSTERRA / MONETAG (banner units — paste the snippet exactly as given)
 *   slots.inContent.html:
 *     '<script async src="//pl00000.profitablecpmrate.com/YOUR_KEY/invoke.js"></script><div id="container-YOUR_KEY"></div>'
 *
 * INFOLINKS (in-text; loader only, no per-slot markup)
 *   loader: { inline: 'var infolinks_pid=YOUR_PID;var infolinks_wsid=0;' }
 *   plus their <script src="//resources.infolinks.com/js/infolinks_main.js">
 *
 * DIRECT SPONSOR (no network at all — highest revenue per impression)
 *   slots.sidebar.html:
 *     '<a href="https://sponsor.example.com/?ref=you" rel="sponsored noopener"><img src="/sponsor.png" width="300" height="600" alt="Sponsor"></a>'
 * ------------------------------------------------------------------------- */
