import { ImageResponse } from 'next/og';
import { site } from '@/site.config';

/**
 * The site-wide social card.
 *
 * Applies to every route that does not define its own image, so one file gives
 * the whole site a proper link preview instead of a bare URL. Generated at
 * build time — no runtime cost.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
          // The graph-paper motif from the hero, rendered as a gradient grid.
          backgroundImage:
            'linear-gradient(to right, #eef0f6 1px, transparent 1px), linear-gradient(to bottom, #eef0f6 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '13px',
              background: '#0b1120',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
            }}
          >
            <div style={{ width: '7px', height: '7px', borderRadius: '4px', background: '#fff' }} />
            <div style={{ width: '26px', height: '4px', borderRadius: '2px', background: '#fff' }} />
            <div style={{ width: '7px', height: '7px', borderRadius: '4px', background: '#fff' }} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#0b1120' }}>{site.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '76px',
              fontWeight: 800,
              color: '#0b1120',
              lineHeight: 1.05,
              letterSpacing: '-2.5px',
              maxWidth: '900px',
            }}
          >
            Business math without the spreadsheet.
          </div>
          <div
            style={{
              marginTop: '24px',
              fontSize: '30px',
              color: '#475569',
              lineHeight: 1.4,
              maxWidth: '880px',
            }}
          >
            CAC, LTV, ROAS, margin, MRR, churn and break-even — calculated in seconds.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #e5e8f0',
            paddingTop: '28px',
            fontSize: '24px',
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
