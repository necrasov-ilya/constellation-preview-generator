import type { Palette } from "../types.js";
import { round2 } from "../svg.js";

export interface GridCell {
  color: string;
  filled: boolean;
  kind: "circle" | "point" | "square";
  rotation: number;
  scale: number;
}

export interface GridLayout {
  cellSize: number;
  columns: number;
  paddingX: number;
  paddingY: number;
  rows: number;
}

export function createGridCell(random: () => number, palette: Palette, fillProbability: number, forced: boolean): GridCell {
  const colorValue = random();
  const kindValue = random();
  const color = colorValue < 0.56 ? palette.primary : colorValue < 0.84 ? palette.secondary : palette.neutral;
  const kind = kindValue < 0.45 ? "circle" : kindValue < 0.68 ? "point" : "square";

  return {
    color,
    filled: forced || random() < fillProbability,
    kind,
    rotation: kind === "square" && random() < 0.28 ? 45 : 0,
    scale: 0.72 + random() * 0.28
  };
}

export function renderGridCell(cell: GridCell, column: number, row: number, layout: GridLayout): string {
  if (!cell.filled) return "";

  const x = round2(layout.paddingX + column * layout.cellSize + layout.cellSize / 2);
  const y = round2(layout.paddingY + row * layout.cellSize + layout.cellSize / 2);

  if (cell.kind === "point") {
    const radius = Math.round(layout.cellSize * 0.11 * cell.scale);
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${cell.color}"/>`;
  }

  if (cell.kind === "circle") {
    const radius = Math.round(layout.cellSize * 0.36 * cell.scale);
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${cell.color}"/>`;
  }

  const dimension = Math.round(layout.cellSize * 0.64 * cell.scale);
  const offset = dimension / 2;
  return `<rect x="${x - offset}" y="${y - offset}" width="${dimension}" height="${dimension}" rx="${Math.max(3, Math.round(dimension * 0.14))}" fill="${cell.color}" transform="rotate(${cell.rotation} ${x} ${y})"/>`;
}

export function createGridLayout(width: number, height: number, columns: number, rows: number, baseWidth: number, baseHeight: number, basePaddingX: number, basePaddingY: number): GridLayout {
  const paddingX = (width * basePaddingX) / baseWidth;
  const paddingY = (height * basePaddingY) / baseHeight;

  return {
    cellSize: Math.min((width - paddingX * 2) / columns, (height - paddingY * 2) / rows),
    columns,
    paddingX,
    paddingY,
    rows
  };
}
