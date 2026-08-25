import type { StyleContext, StyleDefinition } from "../types.js";
import { round2 } from "../svg.js";

const STEPS = 24;

function renderWaves(context: StyleContext): string {
  const { width, height, random, palette } = context;
  const layers = 3 + Math.floor(random() * 3);
  const colors = [palette.primary, palette.secondary, palette.neutral];
  const parts: string[] = [];

  for (let index = 0; index < layers; index += 1) {
    const baseline = height * (0.35 + 0.65 * ((index + 1) / layers));
    const amplitude = height * (0.05 + random() * 0.12);
    const cycles = 1.5 + random() * 2.5;
    const phase = random() * Math.PI * 2;
    const color = colors[index % colors.length];

    let path = `M0 ${round2(baseline + Math.sin(phase) * amplitude)}`;

    for (let step = 1; step <= STEPS; step += 1) {
      const x = (width * step) / STEPS;
      const y = baseline + Math.sin((step / STEPS) * cycles * Math.PI * 2 + phase) * amplitude;
      path += ` L${round2(x)} ${round2(y)}`;
    }

    path += ` L${round2(width)} ${round2(height)} L0 ${round2(height)} Z`;
    parts.push(`<path d="${path}" fill="${color}"/>`);
  }

  return parts.join("");
}

export const waves: StyleDefinition = {
  name: "waves",
  version: 1,
  label: "Waves",
  description: "Layered sine waves rolling toward the viewer",
  size: { width: 560, height: 350 },
  render: renderWaves
};
