import type { Config } from 'tailwindcss';

/**
 * The design system lives here and in app/globals.css — nowhere else.
 *
 * Palette rationale: one near-black ink for text, one confident indigo for
 * action, and three semantic colours reserved EXCLUSIVELY for data status
 * (healthy / warning / critical). Because status colours are never used
 * decoratively, a coloured result always means something.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Every ink shade clears 4.5:1 against both white and the sunken
        // surface, so muted text stays readable wherever it lands. `faint` is
        // the lightest that still passes — do not lighten it further; use
        // `line` for anything genuinely decorative.
        ink: {
          DEFAULT: '#0b1120', // 18.8:1 on white
          soft: '#334155', //   10.3:1
          muted: '#5f6d82', //   5.3:1  (4.9:1 on sunken)
          faint: '#667284', //   4.9:1  (4.6:1 on sunken)
        },
        surface: {
          DEFAULT: '#ffffff',
          sunken: '#f7f8fb',
          raised: '#ffffff',
          inverse: '#0b1120',
        },
        line: {
          DEFAULT: '#e5e8f0',
          strong: '#cbd5e1',
        },
        brand: {
          50: '#eef1ff',
          100: '#dfe4ff',
          200: '#c3ccff',
          300: '#9da9fd',
          400: '#7b83f8',
          500: '#5b5cf0',
          600: '#4740e0',
          700: '#3a31c4',
          800: '#302b9e',
          900: '#2b287d',
        },
        // Semantic — data status only.
        healthy: { DEFAULT: '#047857', soft: '#ecfdf5', line: '#a7f3d0' },
        warning: { DEFAULT: '#b45309', soft: '#fffbeb', line: '#fde68a' },
        critical: { DEFAULT: '#be123c', soft: '#fff1f2', line: '#fecdd3' },
      },
      fontFamily: {
        // System stack only: zero font requests, zero FOUT, zero CLS.
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      fontSize: {
        // Display sizes carry negative tracking; body sizes do not.
        display: ['clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)', { lineHeight: '1.04', letterSpacing: '-0.033em' }],
        h1: ['clamp(1.75rem, 1.35rem + 1.5vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        h2: ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.017em' }],
        h3: ['1.0625rem', { lineHeight: '1.35', letterSpacing: '-0.011em' }],
        metric: ['clamp(2.5rem, 1.9rem + 2.4vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      maxWidth: {
        content: '44rem',
        shell: '76rem',
      },
      borderRadius: {
        // Restrained: cards 10px, controls 8px. Nothing pill-shaped except tags.
        lg: '0.625rem',
        xl: '0.75rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(11 17 32 / 0.04), 0 1px 3px 0 rgb(11 17 32 / 0.03)',
        raised: '0 4px 16px -4px rgb(11 17 32 / 0.10), 0 1px 3px 0 rgb(11 17 32 / 0.04)',
        pop: '0 16px 48px -12px rgb(11 17 32 / 0.24)',
      },
      backgroundImage: {
        // The one piece of brand ornament: faint graph paper behind the hero.
        grid: `linear-gradient(to right, #e9ecf5 1px, transparent 1px),
               linear-gradient(to bottom, #e9ecf5 1px, transparent 1px)`,
      },
      backgroundSize: { grid: '32px 32px' },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: { 'fade-up': 'fade-up 140ms ease-out' },
    },
  },
  plugins: [],
};

export default config;
