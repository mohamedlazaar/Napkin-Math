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
    <aside className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-5">
      <p className="eyebrow text-brand-700">{offer.eyebrow || 'Recommended tool'}</p>
      <h3 className="mt-1.5 text-h3 font-bold text-ink">{offer.heading}</h3>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{offer.body}</p>
      <a
        href={offer.url}
        // rel="sponsored nofollow" is required by Google for paid links, and
        // is also what keeps affiliate links from leaking PageRank.
        rel="sponsored nofollow noopener"
        target="_blank"
        className="btn-primary mt-4"
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
