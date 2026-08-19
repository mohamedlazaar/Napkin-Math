/**
 * PRIVACY-CONSCIOUS ANALYTICS.
 *
 * What is tracked: which calculator was viewed, whether someone actually used
 * it, and which features they reached for. That is enough to tell whether the
 * product works.
 *
 * What is NEVER tracked, by construction rather than by policy: the numbers
 * typed into a calculator. `track()` accepts a small, typed props object and
 * the payload is whitelist-filtered below, so a future caller cannot
 * accidentally leak an input value even if it passes one in.
 *
 * Transport: if NEXT_PUBLIC_ANALYTICS_ENDPOINT is set, events POST to that
 * Plausible-compatible endpoint via sendBeacon. If it is not set — the default
 * — events go nowhere at all. There is no third-party script, no cookie and no
 * identifier of any kind.
 */

import { site } from '@/site.config';

export type AnalyticsEvent =
  | 'calculator_view'
  | 'calculator_started'
  | 'calculator_completed'
  | 'calculator_shared'
  | 'calculator_copied'
  | 'calculator_downloaded'
  | 'related_calculator_clicked'
  | 'calculator_search'
  | 'favorite_added'
  | 'favorite_removed'
  | 'scenario_saved'
  | 'scenario_compared'
  | 'goal_selected';

/**
 * The ONLY property keys that are ever transmitted. Anything else is dropped
 * before the payload is built.
 */
const ALLOWED_PROPS = ['calculator', 'variant', 'category', 'goal', 'target', 'method'] as const;
type AllowedProp = (typeof ALLOWED_PROPS)[number];
export type EventProps = Partial<Record<AllowedProp, string>>;

/** Strips anything not on the whitelist and hard-caps value length. */
function sanitize(props?: EventProps): Record<string, string> {
  const out: Record<string, string> = {};
  if (!props) return out;
  for (const key of ALLOWED_PROPS) {
    const value = props[key];
    if (typeof value === 'string' && value) out[key] = value.slice(0, 64);
  }
  return out;
}

export function track(event: AnalyticsEvent, props?: EventProps): void {
  if (typeof window === 'undefined') return;

  const payload = {
    name: event,
    url: window.location.origin + window.location.pathname, // never the query string
    domain: window.location.hostname,
    props: sanitize(props),
  };

  // Always emit a DOM event. Zero network cost, and it gives the site owner a
  // hook for any tag manager without this module knowing about one.
  try {
    window.dispatchEvent(new CustomEvent('nm:analytics', { detail: payload }));
  } catch {
    /* ignore */
  }

  const endpoint = site.analyticsEndpoint;
  if (!endpoint) return;

  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
    } else {
      void fetch(endpoint, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* analytics must never break the page */
  }
}

/**
 * Fires a one-per-page event the first time it is called with a given key.
 * Used for `calculator_started`, which should mean "someone edited an input",
 * not "someone typed 12 characters".
 */
const fired = new Set<string>();
export function trackOnce(
  key: string,
  event: AnalyticsEvent,
  props?: EventProps
): void {
  if (fired.has(key)) return;
  fired.add(key);
  track(event, props);
}

export function resetTrackOnce(): void {
  fired.clear();
}
