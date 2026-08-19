/**
 * SHAREABLE CALCULATIONS.
 *
 * A calculation is encoded entirely in the query string — /cac-calculator?marketingSpend=5000&newCustomers=118 —
 * so a shared link restores the exact numbers with no account, no database and
 * no short-link service.
 *
 * Two deliberate constraints:
 *   - Only known field ids are read or written. An arbitrary query string can
 *     never inject a value into a calculator that has no such field.
 *   - Only values that DIFFER from the page defaults are written, so a link to
 *     an untouched calculator stays clean and the canonical URL is unaffected.
 */

import type { CalculatorField } from './types';

/** Rejects NaN, Infinity and absurd magnitudes that would render as garbage. */
function sane(n: number): boolean {
  return Number.isFinite(n) && Math.abs(n) < 1e15;
}

/**
 * Reads calculator inputs out of a query string, keeping only fields that
 * actually exist on this calculator.
 */
export function decodeValues(
  search: string | URLSearchParams,
  fields: CalculatorField[]
): Record<string, number> {
  const params =
    typeof search === 'string' ? new URLSearchParams(search) : search;
  const out: Record<string, number> = {};

  for (const field of fields) {
    const raw = params.get(field.id);
    if (raw === null || raw.trim() === '') continue;
    const n = Number(raw);
    if (!sane(n)) continue;
    // Respect the field's own bounds so a hand-edited URL can't push a
    // calculator into a state its UI would never allow.
    if (field.min !== undefined && n < field.min) continue;
    if (field.max !== undefined && n > field.max) continue;
    out[field.id] = n;
  }
  return out;
}

/** Serialises only the values that differ from the page's defaults. */
export function encodeValues(
  values: Record<string, number>,
  defaults: Record<string, number>,
  fields: CalculatorField[]
): string {
  const params = new URLSearchParams();
  for (const field of fields) {
    const v = values[field.id];
    if (v === undefined || !sane(v)) continue;
    if (v === defaults[field.id]) continue;
    params.set(field.id, String(v));
  }
  return params.toString();
}

/** Absolute, shareable URL for the current calculation. */
export function buildShareUrl(
  origin: string,
  path: string,
  query: string
): string {
  return `${origin}${path}${query ? `?${query}` : ''}`;
}

/**
 * Plain-text summary for pasting into Slack, email or WhatsApp.
 * Deliberately plain text: it survives every client, unlike markdown or HTML.
 */
export function buildShareText(opts: {
  title: string;
  lines: { label: string; value: string }[];
  url?: string;
}): string {
  const body = opts.lines.map((l) => `${l.label}: ${l.value}`).join('\n');
  return [opts.title, body, opts.url].filter(Boolean).join('\n\n');
}

/**
 * Copies text, preferring the async Clipboard API and falling back to the
 * legacy path for older or non-secure contexts. Resolves to whether it worked
 * so the UI can show an honest confirmation.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const okResult = document.execCommand('copy');
    document.body.removeChild(ta);
    return okResult;
  } catch {
    return false;
  }
}

/** True when the browser can open a native share sheet for plain text. */
export function canWebShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}
