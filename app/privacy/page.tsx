import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { Breadcrumbs } from '@/components/Layout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `How ${site.name} handles data: calculations run in your browser, inputs are never uploaded, and local storage never leaves your device. Full detail on cookies and advertising.`,
  path: '/privacy',
});

/**
 * Every claim in here must stay true of the code. If a future change adds a
 * server-side calculation, an analytics call carrying input values, or an
 * account system, this page has to change in the same commit.
 */
export default function PrivacyPage() {
  return (
    <div className="shell max-w-content py-8 sm:py-10">
      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Privacy', path: '/privacy' },
        ]}
      />

      <h1 className="mt-5 text-h1 font-extrabold tracking-tight text-ink">Privacy policy</h1>
      <p className="mt-2 text-[0.8125rem] text-ink-muted">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="card mt-6 border-healthy-line bg-healthy-soft p-5">
        <p className="text-[0.9375rem] font-semibold text-healthy">
          The short version: the numbers you type into a calculator never leave your device.
        </p>
        <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">
          There is no account, no upload and no server-side calculation. Everything below is
          detail on the parts that do involve third parties — chiefly advertising.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        <Section title="Calculator data">
          <p>
            Every calculator on {site.name} runs entirely in your browser using JavaScript.
            The numbers you enter are processed on your own device and are never transmitted
            to our servers, never logged and never stored by us. Closing the tab discards
            them.
          </p>
          <p>
            When you share a calculation, the values are placed in the URL you choose to
            share. That link contains your numbers, so treat it with the same care as the
            numbers themselves — anyone you send it to can see them.
          </p>
        </Section>

        <Section title="Local storage">
          <p>
            Saved calculators, recently-used history and saved scenarios are stored in your
            browser&apos;s local storage. This data stays on your device, is not synced, is
            not readable by us, and is not shared with any third party.
          </p>
          <p>
            You can delete all of it at any time from{' '}
            <Link href="/my-tools" className="font-medium text-brand-700 underline">
              My tools
            </Link>{' '}
            using &ldquo;Clear all local data&rdquo;, or by clearing site data in your
            browser settings.
          </p>
        </Section>

        <Section title="Advertising">
          <p>
            This site is supported by advertising. We use Google AdSense to serve ads.
            Google and its partners use cookies and similar technologies to serve ads based
            on your prior visits to this and other websites, and may collect data such as
            your IP address, device type and browsing activity for that purpose. This is
            done by Google, not by us, and we do not receive your personal data from it.
          </p>
          <p>
            Ads are never placed alongside calculator inputs, and ad networks have no access
            to the values you enter — those values exist only in your browser&apos;s memory
            and are never written to the page in a form an advertising script reads.
          </p>
          <p>
            You can review how Google uses data from sites that use its services in{' '}
            <a
              className="font-medium text-brand-700 underline"
              href="https://policies.google.com/technologies/partner-sites"
              rel="noopener nofollow"
              target="_blank"
            >
              Google&apos;s privacy &amp; terms
            </a>
            , manage or disable personalised advertising in{' '}
            <a
              className="font-medium text-brand-700 underline"
              href="https://myadcenter.google.com/"
              rel="noopener nofollow"
              target="_blank"
            >
              Google Ad Center
            </a>
            , and opt out of third-party vendors&apos; cookies at{' '}
            <a
              className="font-medium text-brand-700 underline"
              href="https://www.aboutads.info/choices/"
              rel="noopener nofollow"
              target="_blank"
            >
              aboutads.info
            </a>{' '}
            or{' '}
            <a
              className="font-medium text-brand-700 underline"
              href="https://www.youronlinechoices.com/"
              rel="noopener nofollow"
              target="_blank"
            >
              youronlinechoices.com
            </a>{' '}
            in the EU.
          </p>
        </Section>

        <Section title="Analytics">
          <p>
            If analytics is enabled, it records anonymous, aggregate usage only: which page
            was viewed, and which features were used — for example that a calculator was
            opened, shared or added to favourites. It does not use cookies, does not assign
            you an identifier, and does not follow you across websites.
          </p>
          <p>
            The values you enter into a calculator are never included in any analytics
            event. This is enforced in the code rather than by policy: the analytics module
            transmits only a fixed whitelist of property names, none of which can carry an
            input value.
          </p>
        </Section>

        <Section title="Affiliate links">
          <p>
            Some pages contain affiliate links, always visibly marked and tagged with{' '}
            <code className="font-mono text-[0.8125rem]">rel=&quot;sponsored&quot;</code>. If
            you click one and make a purchase, a commission may be earned at no additional
            cost to you. Clicking is entirely optional, the destination site&apos;s own
            privacy policy then applies, and these links never affect what a calculator
            computes.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            If you are in the EEA, the UK or California you have rights over personal data
            held about you, including access, deletion and objection to personalised
            advertising. Because we do not collect or store personal data ourselves,
            requests relating to advertising cookies should be directed to the relevant ad
            vendor using the opt-out links above; data held in your browser&apos;s local
            storage can be deleted by you directly at any time.
          </p>
        </Section>

        <Section title="Children">
          <p>
            This site is intended for business use by adults and is not directed at children
            under 13. We do not knowingly collect any information from children.
          </p>
        </Section>

        <Section title="Changes and contact">
          <p>
            If this policy changes, the date at the top is updated. Questions:{' '}
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
