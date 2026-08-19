import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Layout';
import { MyTools } from '@/components/MyTools';
import { toSummaries } from '@/components/CalculatorCard';
import { getAllCalculators } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

/**
 * Deliberately noindex: the page is empty for anyone who is not the visitor
 * who filled it, so there is nothing here for a crawler to rank. It is still
 * linked from the header and footer because it is for returning humans.
 */
export const metadata: Metadata = buildMetadata({
  title: 'My Tools',
  description:
    'Your saved and recently used calculators, stored in this browser only. No account required.',
  path: '/my-tools',
  index: false,
});

export default function MyToolsPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: 'My tools', path: '/my-tools' },
        ]}
      />

      <header className="mt-5 max-w-3xl">
        <h1 className="text-h1 font-extrabold tracking-tight text-ink">My tools</h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
          Your saved calculators and recent history. This lives in your browser&apos;s local
          storage — it is never uploaded, it is not tied to an account, and clearing your
          browser data removes it.
        </p>
      </header>

      <MyTools all={toSummaries(getAllCalculators())} />
    </div>
  );
}
