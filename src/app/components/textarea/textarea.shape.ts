/**
 * Logical width/height used to build the clip path. The path is emitted in
 * objectBoundingBox units (0–1), so any element aspect ratio gets a consistent
 * “waist” silhouette; adjust these and the numbers below to taste.
 *
 * The outline is symmetric about the vertical line x = width/2 and the
 * horizontal line y = endHeight/2: the right cap and waist are built only as
 * the mirror of the left (mX(x) = width − x).
 */
export const WAIST_SHAPE = {
  /** Reference width — cancel out when normalizing to 0–1 */
  width: 400,
  /** Full height at the rounded ends */
  endHeight: 80,
  /** Narrower height through the middle (smaller = deeper pinch) */
  centerHeight: 48,
  /**
   * How aggressively the top/bottom pull toward `centerHeight` between the caps.
   * 0 = almost straight; ~0.35–0.5 reads like a smooth hourglass.
   */
  tension: 0.38,
} as const;

/** Single closed path for SVG clipPath with clipPathUnits="objectBoundingBox". */
export function waistPathObjectBoundingBox(
  s: typeof WAIST_SHAPE = WAIST_SHAPE,
): string {
  const { width: w, endHeight: h, centerHeight: hc, tension } = s;
  const r = h / 2;
  const yTop = (h - hc) / 2;
  const yBot = h - yTop;
  const mid = w / 2;
  const span = mid - r;
  const c = tension * span;

  const fmtX = (px: number) => {
    if (px <= 0) return "0";
    if (px >= w) return "1";
    return String(Math.round((px / w) * 1e6) / 1e6);
  };
  const fmtY = (py: number) => {
    if (py <= 0) return "0";
    if (py >= h) return "1";
    return String(Math.round((py / h) * 1e6) / 1e6);
  };
  /** Mirror x about the vertical center so left/right edges always match. */
  const mX = (x: number) => fmtX(w - x);

  const X = (x: number) => fmtX(x);
  const Y = (y: number) => fmtY(y);
  const rx = String(Math.round((r / w) * 1e6) / 1e6);
  const ry = String(Math.round((r / h) * 1e6) / 1e6);

  return [
    `M ${X(0)} ${Y(r)}`,
    `A ${rx} ${ry} 0 0 1 ${X(r)} ${Y(0)}`,
    `C ${X(r + c)} ${Y(0)} ${X(mid - c)} ${Y(yTop)} ${X(mid)} ${Y(yTop)}`,
    `C ${mX(mid - c)} ${Y(yTop)} ${mX(r + c)} ${Y(0)} ${mX(r)} ${Y(0)}`,
    `A ${rx} ${ry} 0 0 1 ${X(w)} ${Y(r)}`,
    `A ${rx} ${ry} 0 0 1 ${mX(r)} ${Y(h)}`,
    `C ${mX(r + c)} ${Y(h)} ${mX(mid - c)} ${Y(yBot)} ${X(mid)} ${Y(yBot)}`,
    `C ${X(mid - c)} ${Y(yBot)} ${X(r + c)} ${Y(h)} ${X(r)} ${Y(h)}`,
    `A ${rx} ${ry} 0 0 1 ${X(0)} ${Y(r)}`,
    "Z",
  ].join(" ");
}
