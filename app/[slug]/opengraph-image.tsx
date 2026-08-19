import { ImageResponse } from 'next/og';
import { site } from '@/site.config';
import { getAllCalculators, getCalculator } from '@/lib/registry';
import { glyphFor } from '@/lib/taxonomy';

/**
 * Per-calculator social card, generated at build time.
 *
 * Also covers /[slug]/[variant], which inherits this image because it does not
 * define one of its own — so 61 pages get a real preview from one file, with
 * no runtime image generation.
 */
export const alt = 'Napkin Math calculator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllCalculators().map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = getCalculator(slug);

  const title = calc?.h1 ?? site.name;
  const blurb = calc?.blurb ?? site.description;
  const glyph = calc ? glyphFor(calc.slug) : '÷';
  // The formula is the most distinctive thing on the card and the clearest
  // signal that this is a real tool rather than a listicle.
  const formula = calc?.formulaDisplay ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          backgroundImage:
            'linear-gradient(to right, #eef0f6 1px, transparent 1px), linear-gradient(to bottom, #eef0f6 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          padding: '68px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#0b1120',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#fff' }} />
              <div style={{ width: '24px', height: '4px', borderRadius: '2px', background: '#fff' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#fff' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#0b1120' }}>{site.name}</div>
          </div>

          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              border: '1px solid #e5e8f0',
              background: '#f7f8fb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '34px',
              color: '#4740e0',
            }}
          >
            {glyph}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: title.length > 44 ? '58px' : '68px',
              fontWeight: 800,
              color: '#0b1120',
              lineHeight: 1.06,
              letterSpacing: '-2px',
              maxWidth: '1000px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: '20px',
              fontSize: '27px',
              color: '#475569',
              lineHeight: 1.4,
              maxWidth: '940px',
            }}
          >
            {blurb}
          </div>

          {formula && (
            <div
              style={{
                marginTop: '28px',
                padding: '18px 24px',
                borderRadius: '12px',
                border: '1px solid #e5e8f0',
                background: '#f7f8fb',
                fontSize: '22px',
                color: '#334155',
                maxWidth: '1000px',
              }}
            >
              {formula.length > 92 ? `${formula.slice(0, 92)}…` : formula}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #e5e8f0',
            paddingTop: '26px',
            fontSize: '23px',
          }}
        >
          <div style={{ color: '#4740e0', fontWeight: 700 }}>
            {site.url.replace(/^https?:\/\//, '')}
          </div>
          <div style={{ color: '#94a3b8' }}>Free · No signup · Runs in your browser</div>
        </div>
      </div>
    ),
    size
  );
}
