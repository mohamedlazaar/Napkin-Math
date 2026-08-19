import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Layout';
import { absoluteUrl, breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: `Get in touch with ${site.name} — corrections, calculator requests, advertising and privacy questions.`,
  path: '/contact',
});

/**
 * A real contact page with a real address and no form.
 *
 * A form would need a backend, which would mean collecting and storing
 * personal data — precisely what the rest of the site is built to avoid. An
 * email address does the same job and keeps the privacy claim intact.
 */
export default function ContactPage() {
  const reasons = [
    {
      title: 'A calculator gives the wrong answer',
      body: 'The most useful message you can send. Include the numbers you entered and what you expected — formula corrections are made quickly and credited if you want.',
    },
    {
      title: 'A benchmark is overstated',
      body: 'If a range here is quoted more confidently than the evidence supports, say so. Benchmarks are the easiest thing on a site like this to get lazily wrong.',
    },
    {
      title: 'Request a calculator',
      body: 'Tell us the metric and, more importantly, the decision you are trying to make with it. That context is what determines whether a tool is worth building.',
    },
    {
      title: 'Privacy questions',
      body: 'Anything about cookies, advertising partners or data handling. The short version is on the privacy policy; ask if it does not cover your case.',
    },
  ];

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: `Contact ${site.name}`,
            url: absoluteUrl('/contact'),
            mainEntity: { '@id': absoluteUrl('/#organization') },
          },
        ]}
      />

      <div className="shell max-w-content py-8 sm:py-10">
        <Breadcrumbs trail={trail} />

        <h1 className="mt-5 text-h1 font-extrabold tracking-tight text-ink">Contact</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
          {site.name} is maintained by {site.author}. Email is the only channel — there is no
          contact form here on purpose, because a form would mean a backend collecting
          personal data, which is exactly what the rest of the site avoids.
        </p>

        <div className="card mt-8 p-6">
          <p className="eyebrow">Email</p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="mt-2 block break-all text-lg font-bold text-brand-700 hover:underline"
          >
            {site.contactEmail}
          </a>
          <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">
            Expect a reply within a few days. Corrections to a formula jump the queue.
          </p>
        </div>

        <section className="mt-10" aria-labelledby="reasons-heading">
          <h2 id="reasons-heading" className="text-h2 font-bold tracking-tight text-ink">
            What to write about
          </h2>
          <ul className="mt-4 space-y-4">
            {reasons.map((reason) => (
              <li key={reason.title} className="card p-5">
                <h3 className="text-[0.9375rem] font-bold text-ink">{reason.title}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">
                  {reason.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="not-heading">
          <h2 id="not-heading" className="text-h2 font-bold tracking-tight text-ink">
            What this is not
          </h2>
          <p className="mt-3 prose-body">
            {site.name} cannot give financial, tax, accounting or legal advice, and cannot
            review your company&apos;s numbers for you. The calculators are general-purpose
            tools; decisions made with them are yours, and material ones deserve a qualified
            professional who knows your situation. See the{' '}
            <Link href="/terms" className="font-medium text-brand-700 underline">
              terms
            </Link>{' '}
            for the full position.
          </p>
        </section>
      </div>
    </>
  );
}
