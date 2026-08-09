import { getSlot, isSlotFilled, type AdPlacement } from '@/data/ad-network';

/**
 * A single ad placement, network-agnostic.
 *
 * Every slot reserves a fixed height at every breakpoint. That is the whole
 * point: the box occupies identical space whether it is a placeholder, an
 * unfilled ad, or a filled ad — so switching networks on cannot move your
 * content and cannot cost you CLS.
 *
 * This is a Server Component. The snippet is baked into the static HTML at
 * build time, which is why <script> tags inside it actually execute.
 */
export function AdSlot({
  placement,
  className = '',
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const slot = getSlot(placement);
  const wrapper = `w-full overflow-hidden ${slot.className} ${className}`;

  // PLACEHOLDER MODE — no network configured, or this slot has no snippet yet.
  if (!isSlotFilled(placement)) {
    return (
      <div
        className={`${wrapper} flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-center`}
        aria-hidden="true"
        data-ad-placeholder={placement}
      >
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {slot.label}
        </span>
      </div>
    );
  }

  // LIVE MODE — your network's snippet, verbatim.
  return (
    <div className={wrapper} data-ad-slot={placement}>
      {/* Most networks' terms — and most jurisdictions' advertising rules —
          require ads be distinguishable from content. */}
      <span className="sr-only">Advertisement</span>
      <div
        className="h-full w-full"
        // Safe: this is your own config file, not user input. It is rendered
        // server-side into static HTML, never injected at runtime.
        dangerouslySetInnerHTML={{ __html: slot.html }}
      />
    </div>
  );
}
