import type { Metadata } from 'next';
import { site } from '@/site.config';
import type { GlossaryTerm } from '@/data/glossary';
import type { CalculatorConfig, CalculatorVariant, Faq } from './types';

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Single source of truth for per-page metadata. Every page builds its title,
 * description, canonical, OpenGraph and Twitter tags through here so they can
 * never drift apart.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  /** Set false for thin or duplicative pages that should stay out of the index. */
  index?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const title = `${opts.title} | ${site.titleSuffix}`;
  const index = opts.index !== false;

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
      // The generated card image is 1200×630, which needs the large variant.
      card: 'summary_large_image',
      title,
      description: opts.description,
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
          },
        }
      : { index: false, follow: true },
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
    isAccessibleForFree: true,
    // The tool is genuinely free and needs no account — say so, because it is
    // an eligibility signal Google actually reads.
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': absoluteUrl('/#organization') },
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

/** Glossary entries are DefinedTerm nodes inside one site-wide glossary. */
export function definedTermSchema(term: GlossaryTerm) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': absoluteUrl(`/glossary/${term.slug}`),
    name: term.term,
    alternateName: term.abbr,
    description: term.short,
    url: absoluteUrl(`/glossary/${term.slug}`),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': absoluteUrl('/glossary'),
      name: `${site.name} business metrics glossary`,
      url: absoluteUrl('/glossary'),
    },
  };
}

/**
 * HowTo describes the steps of a worked example. Only emit it where the steps
 * are genuinely procedural — a fabricated HowTo is a structured-data penalty
 * waiting to happen.
 */
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
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
