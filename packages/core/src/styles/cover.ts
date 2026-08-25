import type { StyleContext, StyleDefinition } from "../types.js";
import { createGridLayout, createGridCell, renderGridCell, type GridCell, type GridLayout } from "./grid.js";

const COLUMNS = 10;
const ROWS = 6;
const FILL_PROBABILITY = 0.64;

function renderCover(context: StyleContext): string {
  const layout: GridLayout = createGridLayout(context.width, context.height, COLUMNS, ROWS, 560, 350, 20, 19);
  const cells: GridCell[][] = Array.from({ length: ROWS }, (_, row) =>
    Array.from({ length: COLUMNS }, (_, column) =>
      createGridCell(context.random, context.palette, FILL_PROBABILITY, row === 2 && column === 4)
    )
  );

  return cells
    .flatMap((row, rowIndex) => row.map((cell, columnIndex) => renderGridCell(cell, columnIndex, rowIndex, layout)))
    .join("");
}

export const cover: StyleDefinition = {
  name: "cover",
  version: 1,
  label: "Cover",
  description: "10x6 shape grid for project covers and banners",
  size: { width: 560, height: 350 },
  render: renderCover
};
