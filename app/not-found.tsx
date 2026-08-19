import Link from 'next/link';
import { CalculatorCard, toSummaries } from '@/components/CalculatorCard';
import { getCategories, getPopular } from '@/lib/registry';

/**
 * A 404 that recovers the visit instead of ending it. Someone who lands here
 * from a stale link is still looking for a calculator — so show them the ones
 * most people want, and the way to search for the rest.
 */
export default function NotFound() {
  const popular = toSummaries(getPopular(3));
  const categories = getCategories();

  return (
    <div className="shell py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.8125rem] font-bold text-ink-faint">404</p>
        <h1 className="mt-2 text-h1 font-extrabold tracking-tight text-ink">
          That page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
          The link may be out of date, or the calculator may have moved. Press{' '}
          <span className="kbd">⌘</span> <span className="kbd">K</span> to search everything,
          or start from one of these.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/calculators" className="btn-primary">
            All calculators
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/" className="btn-secondary">
            Home
          </Link>
        </div>
      </div>

      <section className="mt-12" aria-labelledby="popular-404">
        <h2 id="popular-404" className="text-h2 font-bold tracking-tight text-ink">
          Popular calculators
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {popular.map((calc) => (
            <li key={calc.slug}>
              <CalculatorCard calc={calc} />
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Categories" className="mt-10">
        <p className="eyebrow">Or browse by category</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link href={`/calculators/${cat.id}`} className="tag-interactive">
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
