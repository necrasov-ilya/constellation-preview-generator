import type { StyleContext, StyleDefinition } from "../types.js";
import { createGridLayout, createGridCell, renderGridCell, type GridCell, type GridLayout } from "./grid.js";

const COLUMNS = 5;
const ROWS = 5;
const FILL_PROBABILITY = 0.58;

function renderIdenticon(context: StyleContext): string {
  const layout: GridLayout = createGridLayout(context.width, context.height, COLUMNS, ROWS, 320, 320, 30, 30);
  const cells: GridCell[][] = Array.from({ length: ROWS }, () => Array<GridCell>(COLUMNS));

  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const cell = createGridCell(context.random, context.palette, FILL_PROBABILITY, row === 2 && column === 2);
      cells[row][column] = cell;
      cells[row][COLUMNS - 1 - column] = cell;
    }
  }

  return cells
    .flatMap((row, rowIndex) => row.map((cell, columnIndex) => renderGridCell(cell, columnIndex, rowIndex, layout)))
    .join("");
}

export const identicon: StyleDefinition = {
  name: "identicon",
  version: 1,
  label: "Identicon",
  description: "Mirror-symmetric 5x5 grid of shapes, classic deterministic avatar",
  size: { width: 320, height: 320 },
  render: renderIdenticon
};
