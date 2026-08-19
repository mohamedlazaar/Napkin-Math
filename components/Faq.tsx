import type { Faq as FaqItem } from '@/lib/types';

/**
 * Native <details> accordion: zero JavaScript, keyboard-operable for free, and
 * the answer text is present in the HTML for crawlers even while collapsed.
 * Pairs with the FAQPage JSON-LD emitted by the page.
 */
export function Faq({
  items,
  heading = 'Frequently asked questions',
}: {
  items: FaqItem[];
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-h2 font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[0.9375rem] font-semibold text-ink marker:hidden hover:text-brand-700">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-transform duration-150 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-4 pr-8 prose-body">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
