import type { StyleContext, StyleDefinition } from "../types.js";
import { round2 } from "../svg.js";

function renderStripes(context: StyleContext): string {
  const { width, height, random, palette } = context;
  const angle = (random() < 0.5 ? -1 : 1) * (18 + random() * 42);
  const diagonal = Math.sqrt(width * width + height * height);
  const count = 6 + Math.floor(random() * 8);
  const slot = diagonal / count;
  const colors = [palette.primary, palette.secondary, palette.neutral];
  const parts: string[] = [];

  for (let index = 0; index < count; index += 1) {
    const barWidth = slot * (0.35 + random() * 0.55);
    const offset = (slot - barWidth) * random();
    const x = width / 2 - diagonal / 2 + index * slot + offset;

    parts.push(`<rect x="${round2(x)}" y="${round2(height / 2 - diagonal / 2)}" width="${round2(barWidth)}" height="${round2(diagonal)}" fill="${colors[index % colors.length]}"/>`);
  }

  return `<g transform="rotate(${round2(angle)} ${round2(width / 2)} ${round2(height / 2)})">${parts.join("")}</g>`;
}

export const stripes: StyleDefinition = {
  name: "stripes",
  version: 1,
  label: "Stripes",
  description: "Diagonal bars of varying width and rhythm",
  size: { width: 320, height: 320 },
  render: renderStripes
};
