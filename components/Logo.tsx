import Link from 'next/link';
import { site } from '@/site.config';

/**
 * The brand mark: a division sign in a rounded square.
 *
 * Chosen because division is the operation behind almost every metric on the
 * site — CAC, LTV, margin, ROAS and churn are all one number over another. It
 * is inline SVG, so it costs no request, scales cleanly and inherits colour.
 */
export function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className} focusable="false">
      <rect width="28" height="28" rx="7" className="fill-ink" />
      <circle cx="14" cy="9" r="1.9" className="fill-white" />
      <rect x="7" y="13.1" width="14" height="1.9" rx="0.95" className="fill-white" />
      <circle cx="14" cy="19" r="1.9" className="fill-white" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 rounded-lg ${className}`}
      aria-label={`${site.name} — home`}
    >
      <LogoMark />
      <span className="text-[0.9375rem] font-bold tracking-tight text-ink">{site.name}</span>
    </Link>
  );
}
