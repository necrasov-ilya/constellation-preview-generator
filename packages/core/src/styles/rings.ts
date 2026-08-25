import type { StyleContext, StyleDefinition } from "../types.js";
import { round2 } from "../svg.js";

function renderRings(context: StyleContext): string {
  const { width, height, random, palette } = context;
  const centerX = width / 2 + (random() - 0.5) * width * 0.2;
  const centerY = height / 2 + (random() - 0.5) * height * 0.2;
  const maxRadius = (Math.min(width, height) / 2) * (0.82 + random() * 0.14);
  const count = 4 + Math.floor(random() * 4);
  const colors = [palette.primary, palette.secondary, palette.neutral];
  const parts: string[] = [];

  if (random() < 0.5) {
    for (let index = count - 1; index >= 0; index -= 1) {
      const radius = (maxRadius * (index + 1)) / count;
      parts.push(`<circle cx="${round2(centerX)}" cy="${round2(centerY)}" r="${round2(radius)}" fill="${colors[index % colors.length]}"/>`);
    }
    parts.push(`<circle cx="${round2(centerX)}" cy="${round2(centerY)}" r="${round2((maxRadius / count) * 0.35)}" fill="${palette.background}"/>`);
  } else {
    const step = maxRadius / count;
    const strokeWidth = step * 0.45;
    for (let index = 0; index < count; index += 1) {
      parts.push(`<circle cx="${round2(centerX)}" cy="${round2(centerY)}" r="${round2(step * (index + 0.5))}" fill="none" stroke="${colors[index % colors.length]}" stroke-width="${round2(strokeWidth)}"/>`);
    }
  }

  return parts.join("");
}

export const rings: StyleDefinition = {
  name: "rings",
  version: 1,
  label: "Rings",
  description: "Concentric circles, filled or stroked",
  size: { width: 320, height: 320 },
  render: renderRings
};
