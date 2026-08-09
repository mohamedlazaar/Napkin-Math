import { affiliateOffers, type AffiliateOffer } from '@/data/affiliates';

/**
 * Affiliate call-to-action block.
 *
 * Content comes from data/affiliates.ts — you fill in the offer there once and
 * it appears across the site. `category` lets you show a different offer on
 * SaaS pages than on ecommerce pages.
 *
 * Renders nothing when no offer is configured, so unfilled placeholders never
 * ship to production.
 */
export function AffiliateCTA({ category }: { category?: string }) {
  const offer: AffiliateOffer | undefined =
    (category ? affiliateOffers[category] : undefined) ?? affiliateOffers.default;

  if (!offer || !offer.url) return null;

  return (
    <aside className="my-8 rounded-xl border border-brand-100 bg-brand-50 p-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-600">
        {offer.eyebrow || 'Recommended tool'}
      </p>
      <h3 className="mt-1.5 text-lg font-semibold text-ink">{offer.heading}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{offer.body}</p>
      <a
        href={offer.url}
        // rel="sponsored nofollow" is required by Google for paid links, and
        // is also what keeps affiliate links from leaking PageRank.
        rel="sponsored nofollow noopener"
        target="_blank"
        className="mt-4 inline-flex items-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        {offer.ctaLabel}
      </a>
      {offer.disclosure !== false && (
        <p className="mt-3 text-xs text-ink-muted">
          Affiliate link — we may earn a commission at no extra cost to you.
        </p>
      )}
    </aside>
  );
}
