import type { Metadata } from 'next';
import { site } from '@/site.config';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy policy',
  description: `How ${site.name} handles data, cookies and advertising.`,
  path: '/privacy',
});

/**
 * Effectively every ad network requires an accessible privacy policy that
 * discloses third-party cookie use before they will approve you. This covers
 * the required ground — read it and adjust the bracketed parts to your
 * situation and jurisdiction before you apply.
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Privacy policy</h1>
      <p className="mt-2 text-sm text-ink-muted">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="text-xl font-bold text-ink">Calculator data</h2>
          <p className="mt-2">
            Every calculator on {site.name} runs entirely in your browser using
            JavaScript. The numbers you type are never transmitted to our servers,
            never logged and never stored. Closing the tab discards them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink">Advertising</h2>
          <p className="mt-2">
            This site is supported by advertising. We use Google AdSense to serve
            ads. Google and its partners use cookies and similar technologies to
            serve ads based on your prior visits to this and other websites.
          </p>
          <p className="mt-2">
            You can review how Google uses data from sites that use its services
            in the{' '}
            <a
              className="text-brand-600 underline"
              href="https://policies.google.com/technologies/partner-sites"
              rel="noopener nofollow"
              target="_blank"
            >
              Google privacy &amp; terms
            </a>
            , opt out of personalised advertising in{' '}
            <a
              className="text-brand-600 underline"
              href="https://myadcenter.google.com/"
              rel="noopener nofollow"
              target="_blank"
            >
              Google Ad Center
            </a>
            , and opt out of third-party vendors&apos; use of cookies for
            personalised advertising at{' '}
            <a
              className="text-brand-600 underline"
              href="https://www.aboutads.info/choices/"
              rel="noopener nofollow"
              target="_blank"
            >
              aboutads.info
            </a>{' '}
            or{' '}
            <a
              className="text-brand-600 underline"
              href="https://www.youronlinechoices.com/"
              rel="noopener nofollow"
              target="_blank"
            >
              youronlinechoices.com
            </a>{' '}
            (EU).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink">Analytics</h2>
          <p className="mt-2">
            {/* If you add analytics, name the provider here. Leaving this
                accurate matters for both AdSense review and GDPR. */}
            We use [ANALYTICS PROVIDER, e.g. Google Analytics / Plausible / none] to
            understand aggregate traffic patterns. Replace this paragraph with an
            accurate description of what you actually run, or delete it if you run
            nothing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink">Affiliate links</h2>
          <p className="mt-2">
            Some pages contain affiliate links. If you click one and make a
            purchase, we may earn a commission at no additional cost to you. These
            links are marked and do not affect the calculators or the guidance on
            the page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink">Your rights</h2>
          <p className="mt-2">
            If you are in the EEA, UK or California, you have rights over personal
            data held about you, including access, deletion and objecting to
            personalised advertising. Because we do not collect or store personal
            data ourselves, requests relating to advertising cookies should be
            directed to the relevant ad vendor using the opt-out links above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink">Contact</h2>
          <p className="mt-2">
            Questions about this policy: <a className="text-brand-600 underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </section>
      </div>
    </div>
  );
}
