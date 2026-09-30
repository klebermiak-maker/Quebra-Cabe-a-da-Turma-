import { PuzzlePiece } from '../types/game';

// Seeded random number generator so both clients in multiplayer generate identical edges
export function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generatePuzzlePieces(gridSize: number, seed: number = 42): PuzzlePiece[] {
  const rand = seededRandom(seed);
  const total = gridSize * gridSize;
  const pieces: PuzzlePiece[] = [];

  // 2D matrix of edges to ensure matching tabs between adjacent pieces
  // horizontalEdges[r][c]: edge between piece (r, c) bottom and (r+1, c) top
  const horizontalEdges: number[][] = [];
  for (let r = 0; r < gridSize - 1; r++) {
    horizontalEdges[r] = [];
    for (let c = 0; c < gridSize; c++) {
      horizontalEdges[r][c] = rand() > 0.5 ? 1 : -1;
    }
  }

  // verticalEdges[r][c]: edge between piece (r, c) right and (r, c+1) left
  const verticalEdges: number[][] = [];
  for (let r = 0; r < gridSize; r++) {
    verticalEdges[r] = [];
    for (let c = 0; c < gridSize - 1; c++) {
      verticalEdges[r][c] = rand() > 0.5 ? 1 : -1;
    }
  }

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const id = r * gridSize + c;

      const top = r === 0 ? 0 : -horizontalEdges[r - 1][c];
      const bottom = r === gridSize - 1 ? 0 : horizontalEdges[r][c];
      const left = c === 0 ? 0 : -verticalEdges[r][c - 1];
      const right = c === gridSize - 1 ? 0 : verticalEdges[r][c];

      pieces.push({
        id,
        correctRow: r,
        correctCol: c,
        currentSlot: null,
        isPlaced: false,
        edges: { top, right, bottom, left },
      });
    }
  }

  return pieces;
}

// Generates an SVG path data string for a puzzle piece
// Normalized to size w x h, with tabs extending outside by tabSize (approx 18%)
export function getPieceSvgPath(
  edges: { top: number; right: number; bottom: number; left: number },
  w: number,
  h: number
): string {
  // tab parameters
  const tabW = w * 0.28;
  const tabH = h * 0.22;

  // start at top-left corner
  let path = `M 0 0`;

  // Top Edge: (0,0) -> (w, 0)
  if (edges.top === 0) {
    path += ` L ${w} 0`;
  } else {
    const sign = edges.top; // +1 tab outward (negative Y), -1 tab inward (positive Y)
    const midX = w / 2;
    const p1 = midX - tabW / 2;
    const p2 = midX + tabW / 2;
    const peakY = -sign * tabH;
    path += ` L ${p1} 0 C ${p1 + 2} ${peakY * 0.2}, ${midX - tabW * 0.4} ${peakY * 1.1}, ${midX} ${peakY} C ${midX + tabW * 0.4} ${peakY * 1.1}, ${p2 - 2} ${peakY * 0.2}, ${p2} 0 L ${w} 0`;
  }

  // Right Edge: (w, 0) -> (w, h)
  if (edges.right === 0) {
    path += ` L ${w} ${h}`;
  } else {
    const sign = edges.right; // +1 tab outward (positive X), -1 tab inward (negative X)
    const midY = h / 2;
    const p1 = midY - tabW / 2;
    const p2 = midY + tabW / 2;
    const peakX = w + sign * tabH;
    path += ` L ${w} ${p1} C ${w + sign * tabH * 0.2} ${p1 + 2}, ${peakX + sign * tabH * 0.1} ${midY - tabW * 0.4}, ${peakX} ${midY} C ${peakX + sign * tabH * 0.1} ${midY + tabW * 0.4}, ${w + sign * tabH * 0.2} ${p2 - 2}, ${w} ${p2} L ${w} ${h}`;
  }

  // Bottom Edge: (w, h) -> (0, h)
  if (edges.bottom === 0) {
    path += ` L 0 ${h}`;
  } else {
    const sign = edges.bottom; // +1 tab outward (positive Y), -1 inward (negative Y)
    const midX = w / 2;
    const p1 = midX + tabW / 2;
    const p2 = midX - tabW / 2;
    const peakY = h + sign * tabH;
    path += ` L ${p1} ${h} C ${p1 - 2} ${h + sign * tabH * 0.2}, ${midX + tabW * 0.4} ${peakY + sign * tabH * 0.1}, ${midX} ${peakY} C ${midX - tabW * 0.4} ${peakY + sign * tabH * 0.1}, ${p2 + 2} ${h + sign * tabH * 0.2}, ${p2} ${h} L 0 ${h}`;
  }

  // Left Edge: (0, h) -> (0, 0)
  if (edges.left === 0) {
    path += ` L 0 0`;
  } else {
    const sign = edges.left; // +1 tab outward (negative X), -1 inward (positive X)
    const midY = h / 2;
    const p1 = midY + tabW / 2;
    const p2 = midY - tabW / 2;
    const peakX = -sign * tabH;
    path += ` L 0 ${p1} C ${-sign * tabH * 0.2} ${p1 - 2}, ${peakX - sign * tabH * 0.1} ${midY + tabW * 0.4}, ${peakX} ${midY} C ${peakX - sign * tabH * 0.1} ${midY - tabW * 0.4}, ${-sign * tabH * 0.2} ${p2 + 2}, 0 ${p2} L 0 0`;
  }

  path += ` Z`;
  return path;
}
