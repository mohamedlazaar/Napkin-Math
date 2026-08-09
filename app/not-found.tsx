import Link from 'next/link';
import { getAllCalculators } from '@/lib/registry';

export default function NotFound() {
  const calcs = getAllCalculators();

  return (
    <div className="mx-auto max-w-content px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Page not found</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
        That URL doesn&apos;t exist. Here&apos;s everything that does:
      </p>
      <ul className="mt-5 space-y-2">
        {calcs.map((c) => (
          <li key={c.slug}>
            <Link href={`/${c.slug}`} className="font-medium text-brand-600 hover:underline">
              {c.name}
            </Link>
            <span className="text-ink-soft"> — {c.blurb}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link href="/" className="text-brand-600 hover:underline">
          ← Back to all calculators
        </Link>
      </p>
    </div>
  );
}
