import Link from 'next/link';
import { site } from '@/site.config';
import { getAllCalculators } from '@/lib/registry';

export function Header() {
  const calcs = getAllCalculators();
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-[15px] font-bold tracking-tight text-ink">
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-5 text-sm text-ink-soft">
            {calcs.slice(0, 4).map((c) => (
              <li key={c.slug} className="hidden sm:block">
                <Link href={`/${c.slug}`} className="hover:text-brand-600">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/" className="font-medium hover:text-brand-600">
                All calculators
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const calcs = getAllCalculators();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-bold text-ink">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
              {site.tagline}. Free, instant, and everything runs in your browser.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Calculators</p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
              {calcs.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="hover:text-brand-600">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Site</p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
              <li>
                <Link href="/about" className="hover:text-brand-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-600">
                  Privacy policy
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.contactEmail}`} className="hover:text-brand-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-200 pt-6 text-xs leading-relaxed text-ink-muted">
          © {new Date().getFullYear()} {site.publisher}. These calculators are provided for
          general information and do not constitute financial, tax or legal advice.
        </p>
      </div>
    </footer>
  );
}

/** Breadcrumb trail. Matches the BreadcrumbList JSON-LD on the same page. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
        {trail.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === trail.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-brand-600">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
