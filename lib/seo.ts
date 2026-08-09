import type { Metadata } from 'next';
import { site } from '@/site.config';
import type { CalculatorConfig, CalculatorVariant, Faq } from './types';

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Single source of truth for per-page metadata. Every page builds its title,
 * description, canonical and OpenGraph tags through here so they can never
 * drift apart.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
}): Metadata {
  const url = absoluteUrl(opts.path);
  const title = `${opts.title} | ${site.titleSuffix}`;

  return {
    title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: opts.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: opts.type || 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description: opts.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
  };
}

/* ------------------------------------------------------------------ *
 * JSON-LD builders. Each returns a plain object; <JsonLd> renders it. *
 * ------------------------------------------------------------------ */

export function webApplicationSchema(opts: {
  name: string;
  description: string;
  path: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    keywords: opts.keywords?.join(', '),
    // The tool is genuinely free and needs no account — say so, because it is
    // an eligibility signal Google actually reads.
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: site.publisher,
      url: site.url,
    },
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/* ---------------------------------------------- *
 * Copy generators for programmatic variant pages. *
 * ---------------------------------------------- */

export function variantTitle(calc: CalculatorConfig, v: CalculatorVariant): string {
  return `${calc.name} for ${v.label}`;
}

export function variantH1(calc: CalculatorConfig, v: CalculatorVariant): string {
  return `${calc.h1} for ${v.label}`;
}

export function variantDescription(
  calc: CalculatorConfig,
  v: CalculatorVariant
): string {
  return `Free ${calc.name.toLowerCase()} built for ${v.audience}: which costs to include, realistic benchmarks and a worked ${v.label} example. Runs in your browser.`;
}

/** Combined FAQ list for a variant page — calculator FAQs plus vertical ones. */
export function variantFaqs(calc: CalculatorConfig, v: CalculatorVariant): Faq[] {
  return [...(v.faqs || []), ...calc.faqs];
}
