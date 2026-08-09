import type { ResultFormat } from './types';

// Intl formatters are expensive to construct, so build them once at module
// scope rather than per render.
const currency0 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const currency2 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const number1 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const number2 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

export function formatResult(
  value: number | null | undefined,
  format: ResultFormat
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '—';
  }

  switch (format) {
    case 'currency':
      // Sub-$100 numbers deserve cents; a $12,480 CAC does not.
      return Math.abs(value) < 100 ? currency2.format(value) : currency0.format(value);
    case 'currency2':
      return currency2.format(value);
    case 'percent':
      return `${number1.format(value)}%`;
    case 'ratio':
      return `${number2.format(value)}:1`;
    case 'months':
      return `${number1.format(value)} ${Math.abs(value) === 1 ? 'month' : 'months'}`;
    case 'number':
    default:
      return number2.format(value);
  }
}
