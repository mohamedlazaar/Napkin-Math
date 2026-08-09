import type { Faq as FaqItem } from '@/lib/types';

/**
 * Native <details> accordion: zero JavaScript, and the answer text is present
 * in the HTML for crawlers even while collapsed. Pairs with the FAQPage
 * JSON-LD emitted by the page.
 */
export function Faq({ items, heading = 'Frequently asked questions' }: {
  items: FaqItem[];
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
        {items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink marker:hidden">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-ink-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
