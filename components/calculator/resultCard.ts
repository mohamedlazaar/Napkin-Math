/**
 * SHAREABLE RESULT CARD.
 *
 * Draws a 1200×630 PNG on a canvas — the standard social card ratio, so it
 * looks right when posted to X, LinkedIn or Slack rather than being cropped.
 *
 * Deliberately dependency-free: no html2canvas, no dom-to-image, no headless
 * renderer. Those libraries cost 200KB+ and produce blurry output for text.
 * Drawing directly gives crisp type at a fraction of the weight, and this
 * module is only ever imported dynamically — a visitor who never downloads a
 * card never downloads this code either.
 */

export interface ResultCardData {
  /** e.g. "CAC Calculator" */
  calculatorName: string;
  /** e.g. "Customer acquisition cost" */
  metricLabel: string;
  /** Pre-formatted, e.g. "$1,400" */
  metricValue: string;
  /** Up to three supporting figures. */
  supporting: { label: string; value: string }[];
  /** Shown bottom-right, e.g. "napkin-math.vercel.app" */
  siteUrl: string;
  siteName: string;
}

const W = 1200;
const H = 630;
const PAD = 72;

const INK = '#0b1120';
const INK_SOFT = '#475569';
const INK_MUTED = '#94a3b8';
const LINE = '#e5e8f0';
const BRAND = '#4740e0';

const SANS =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/** Shrinks the font until the text fits the available width. */
function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startPx: number,
  weight = '700',
  minPx = 28
): number {
  let size = startPx;
  ctx.font = `${weight} ${size}px ${SANS}`;
  while (ctx.measureText(text).width > maxWidth && size > minPx) {
    size -= 4;
    ctx.font = `${weight} ${size}px ${SANS}`;
  }
  return size;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** The ÷ brand mark, drawn to match components/Logo.tsx. */
function drawLogo(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = size / 28;
  ctx.fillStyle = INK;
  roundRect(ctx, x, y, size, size, 7 * s);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x + 14 * s, y + 9 * s, 1.9 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + 14 * s, y + 19 * s, 1.9 * s, 0, Math.PI * 2);
  ctx.fill();
  roundRect(ctx, x + 7 * s, y + 13.1 * s, 14 * s, 1.9 * s, 0.95 * s);
  ctx.fill();
}

export function drawResultCard(
  canvas: HTMLCanvasElement,
  data: ResultCardData
): void {
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.textBaseline = 'alphabetic';

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Faint graph paper — the same ornament as the site hero.
  ctx.strokeStyle = '#eef0f6';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(W, y + 0.5);
    ctx.stroke();
  }

  // Accent rule along the top edge.
  ctx.fillStyle = BRAND;
  ctx.fillRect(0, 0, W, 8);

  // ---- Header -------------------------------------------------------
  drawLogo(ctx, PAD, PAD, 44);
  ctx.fillStyle = INK;
  ctx.font = `700 26px ${SANS}`;
  ctx.fillText(data.siteName, PAD + 60, PAD + 31);

  ctx.fillStyle = INK_MUTED;
  ctx.font = `600 20px ${SANS}`;
  const nameWidth = ctx.measureText(data.calculatorName).width;
  ctx.fillText(data.calculatorName, W - PAD - nameWidth, PAD + 30);

  // ---- Primary metric ------------------------------------------------
  ctx.fillStyle = INK_SOFT;
  ctx.font = `600 24px ${SANS}`;
  ctx.fillText(data.metricLabel.toUpperCase(), PAD, 250);

  const valueSize = fitText(ctx, data.metricValue, W - PAD * 2, 128, '800', 56);
  ctx.fillStyle = INK;
  ctx.font = `800 ${valueSize}px ${SANS}`;
  ctx.fillText(data.metricValue, PAD, 250 + valueSize * 0.92);

  // ---- Supporting metrics -------------------------------------------
  const supporting = data.supporting.slice(0, 3);
  if (supporting.length) {
    const boxY = 430;
    const boxH = 96;
    const gap = 20;
    const boxW = (W - PAD * 2 - gap * (supporting.length - 1)) / supporting.length;

    supporting.forEach((item, i) => {
      const x = PAD + i * (boxW + gap);

      ctx.fillStyle = '#f7f8fb';
      roundRect(ctx, x, boxY, boxW, boxH, 12);
      ctx.fill();
      ctx.strokeStyle = LINE;
      ctx.lineWidth = 1;
      roundRect(ctx, x + 0.5, boxY + 0.5, boxW - 1, boxH - 1, 12);
      ctx.stroke();

      ctx.fillStyle = INK_MUTED;
      const labelSize = fitText(ctx, item.label, boxW - 32, 17, '600', 12);
      ctx.font = `600 ${labelSize}px ${SANS}`;
      ctx.fillText(item.label, x + 16, boxY + 34);

      ctx.fillStyle = INK;
      const vSize = fitText(ctx, item.value, boxW - 32, 32, '700', 18);
      ctx.font = `700 ${vSize}px ${SANS}`;
      ctx.fillText(item.value, x + 16, boxY + 34 + vSize + 8);
    });
  }

  // ---- Footer --------------------------------------------------------
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, H - 78.5);
  ctx.lineTo(W - PAD, H - 78.5);
  ctx.stroke();

  ctx.fillStyle = BRAND;
  ctx.font = `700 22px ${SANS}`;
  ctx.fillText(data.siteUrl, PAD, H - 40);

  ctx.fillStyle = INK_MUTED;
  ctx.font = `500 19px ${SANS}`;
  const note = 'Free business calculators';
  ctx.fillText(note, W - PAD - ctx.measureText(note).width, H - 40);
}

/**
 * Renders and saves the card.
 *
 * Resolves to false when the browser blocks the download so the caller can say
 * so rather than silently appearing to succeed.
 */
export async function downloadResultCard(
  data: ResultCardData,
  filename: string
): Promise<boolean> {
  try {
    const canvas = document.createElement('canvas');
    drawResultCard(canvas, data);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png')
    );
    if (!blob) return false;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Revoke on the next tick — revoking synchronously cancels the download in
    // some browsers.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch {
    return false;
  }
}
