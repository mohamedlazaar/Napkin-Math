import Link from 'next/link';
import { site } from '@/site.config';
import { getCategories, getPopular } from '@/lib/registry';
import { buildQuickIndex } from '@/lib/search-index';
import { getGlossaryAlphabetical } from '@/data/glossary';
import { Logo } from './Logo';
import { SearchTrigger } from './CommandPalette';
import { MobileMenu, type NavLink } from './MobileMenu';

/**
 * Site chrome. Deliberately light: two rows of navigation would compete with
 * the calculator for attention, and the calculator has to win.
 *
 * "Calculators" is the primary item because it is the only one that leads
 * somewhere a first-time visitor actually wants to go.
 */

const primaryNav: NavLink[] = [
  { href: '/calculators', label: 'Calculators' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/my-tools', label: 'My tools' },
  { href: '/about', label: 'About' },
];

export function Header() {
  // Only the small inline index ships in the HTML; the palette fetches the
  // full one from /search-index.json when someone actually opens search.
  const index = buildQuickIndex();
  const categories = getCategories();

  const mobileGroups = [
    { title: 'Browse', links: primaryNav },
    {
      title: 'Categories',
      links: categories.map((c) => ({
        href: `/calculators/${c.id}`,
        label: c.label,
        hint: c.short,
      })),
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="shell relative flex h-14 items-center gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-surface-sunken hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchTrigger index={index} />
          <MobileMenu groups={mobileGroups} />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const categories = getCategories();
  const popular = getPopular(5);
  const terms = getGlossaryAlphabetical().slice(0, 5);

  return (
    <footer className="mt-20 border-t border-line bg-surface-sunken">
      <div className="shell py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-[0.8125rem] leading-relaxed text-ink-muted">
              {site.tagline}. Free, instant, and every calculation runs in your browser.
            </p>
          </div>

          <FooterColumn title="Popular">
            {popular.map((c) => (
              <FooterLink key={c.slug} href={`/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
            <FooterLink href="/calculators">All calculators →</FooterLink>
          </FooterColumn>

          <FooterColumn title="Categories">
            {categories.map((c) => (
              <FooterLink key={c.id} href={`/calculators/${c.id}`}>
                {c.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Resources">
            {terms.map((t) => (
              <FooterLink key={t.slug} href={`/glossary/${t.slug}`}>
                {t.abbr ?? t.term}
              </FooterLink>
            ))}
            <FooterLink href="/glossary">Full glossary →</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/my-tools">My tools</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs leading-relaxed text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.publisher}. Calculators are provided for general
            information and are not financial, tax or legal advice.
          </p>
          <p className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-healthy" />
            No account. No tracking of your numbers.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.8125rem] text-ink-soft transition hover:text-brand-700"
      >
        {children}
      </Link>
    </li>
  );
}

/** Breadcrumb trail. Matches the BreadcrumbList JSON-LD on the same page. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8125rem] text-ink-muted">
        {trail.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-ink-faint">
                /
              </span>
            )}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="font-medium text-ink-soft">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="transition hover:text-brand-700">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
