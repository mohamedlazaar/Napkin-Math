import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { Breadcrumbs } from '@/components/Layout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use',
  description: `The terms covering use of ${site.name}: what the calculators are, what they are not, and the limits of what you should rely on them for.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="shell max-w-content py-8 sm:py-10">
      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Terms', path: '/terms' },
        ]}
      />

      <h1 className="mt-5 text-h1 font-extrabold tracking-tight text-ink">Terms of use</h1>
      <p className="mt-2 text-[0.8125rem] text-ink-muted">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="mt-8 space-y-8">
        <Section title="Using the site">
          <p>
            {site.name} is free to use, with no account and no registration. You may use the
            calculators for personal or commercial purposes, including inside your own
            company, at no cost.
          </p>
          <p>
            You may not scrape the site at a volume that degrades it for others, republish
            its content wholesale as your own, or present its calculators as a product you
            operate. Quoting a definition or a result with a link back is welcome and needs
            no permission.
          </p>
        </Section>

        <Section title="No professional advice">
          <p>
            The calculators, definitions, benchmarks and interpretations on this site are
            general information only. They are not financial, investment, tax, accounting or
            legal advice, and no professional relationship is created by using them.
          </p>
          <p>
            Business decisions of any consequence should be taken with a qualified adviser
            who knows your actual circumstances. Any benchmark range quoted here is a widely
            cited general reference, not a target for your business and not a standard you
            are obliged to meet.
          </p>
        </Section>

        <Section title="Accuracy and limitations">
          <p>
            Considerable care goes into the formulas, and corrections are made promptly when
            errors are reported. Even so, the site is provided &ldquo;as is&rdquo; without
            warranty of any kind, and no guarantee is given that a result is accurate,
            complete or suitable for your purpose.
          </p>
          <p>
            Every calculator is a model, and a model reflects its assumptions. Lifetime
            value projected from a churn rate assumes that churn rate holds. Payback
            calculated on gross margin assumes the margin is stated correctly. Check that
            the assumptions described on each page match your situation before relying on a
            number.
          </p>
          <p>
            To the fullest extent permitted by law, {site.publisher} accepts no liability for
            loss arising from use of, or reliance on, this site.
          </p>
        </Section>

        <Section title="Your data">
          <p>
            Calculations run in your browser and your inputs are not transmitted to us.
            Saved calculators, history and scenarios are stored in your browser&apos;s local
            storage and can be removed at any time from{' '}
            <Link href="/my-tools" className="font-medium text-brand-700 underline">
              My tools
            </Link>{' '}
            or by clearing your browser data. Full detail is in the{' '}
            <Link href="/privacy" className="font-medium text-brand-700 underline">
              privacy policy
            </Link>
            .
          </p>
        </Section>

        <Section title="Advertising and affiliate links">
          <p>
            The site is funded by advertising and by affiliate links, which are always
            labelled and carry <code className="font-mono text-[0.8125rem]">rel=&quot;sponsored&quot;</code>.
            If you buy through one, a commission may be earned at no additional cost to you.
            This funding does not influence what any calculator computes or what any page
            recommends.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            These terms may be updated as the site changes. The date at the top reflects the
            current version, and continued use after a change constitutes acceptance of it.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms:{' '}
            <a
              className="font-medium text-brand-700 underline"
              href={`mailto:${site.contactEmail}`}
            >
              {site.contactEmail}
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-h2 font-bold tracking-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3 prose-body">{children}</div>
    </section>
  );
}
