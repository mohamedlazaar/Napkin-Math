import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { getAllCalculators } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `What ${site.name} is, who makes it, and how these calculators are built.`,
  path: '/about',
});

/**
 * Ad networks look for a real About page during review. It is also a genuine E-E-A-T
 * signal — fill in the "who writes this" part with something true about you.
 */
export default function AboutPage() {
  const calcs = getAllCalculators();

  return (
    <div className="mx-auto max-w-content px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-ink">About {site.name}</h1>

      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-soft">
        <p>
          {site.name} is a collection of free business and finance calculators for
          the metrics operators actually argue about — acquisition cost, lifetime
          value, churn, margin and the ratios between them.
        </p>
        <p>
          Every tool is built the same way: the calculation itself, then a plain
          explanation of what belongs in each input, a worked example with real
          numbers, and honest context about what a good result looks like. Where we
          give benchmark ranges, we say where they come from and how confident you
          should be in them.
        </p>
        <p>
          {/* ↓ Replace with something true about you. Specific beats generic. */}
          [WHO WRITES THIS — e.g. &ldquo;Written by [your name], who spent X years doing
          Y.&rdquo; A real named person with relevant experience is worth more to both
          readers and Google than any amount of generic copy.]
        </p>
        <p>
          Nothing you type into a calculator leaves your browser. There is no
          account, no upload and no logging — see the{' '}
          <Link href="/privacy" className="text-brand-600 underline">
            privacy policy
          </Link>
          .
        </p>
        <p>
          The site is supported by advertising and occasional affiliate links, which
          are always marked. That funding never changes what the calculators say.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-bold text-ink">All calculators</h2>
      <ul className="mt-3 space-y-1.5 text-[15px]">
        {calcs.map((c) => (
          <li key={c.slug}>
            <Link href={`/${c.slug}`} className="text-brand-600 hover:underline">
              {c.name}
            </Link>
            <span className="text-ink-soft"> — {c.blurb}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-xl font-bold text-ink">Contact</h2>
      <p className="mt-2 text-[15px] text-ink-soft">
        Corrections and suggestions:{' '}
        <a className="text-brand-600 underline" href={`mailto:${site.contactEmail}`}>
          {site.contactEmail}
        </a>
      </p>
    </div>
  );
}
