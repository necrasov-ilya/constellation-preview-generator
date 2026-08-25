import { defaultPalettes } from "./palettes.js";
import { hashString, mulberry32 } from "./random.js";
import { getStyle } from "./registry.js";
import type { GenerateOptions, GeneratedPreview, StyleContext, StyleDefinition } from "./types.js";

function resolveStyle(style: string | StyleDefinition<never>): StyleDefinition<never> {
  const definition = typeof style === "string" ? getStyle(style) : style;

  if (!definition) {
    throw new Error(`Unknown style "${String(style)}"`);
  }

  return definition;
}

function createRandomSeed(definition: StyleDefinition<never>, seed: string): number {
  return hashString(`${definition.name}@${definition.version}:${seed}`);
}

export function generateSvg<Options>(style: string | StyleDefinition<Options>, seed: string, generateOptions: GenerateOptions<Options> = {}): string {
  const definition = resolveStyle(style as string | StyleDefinition<never>);
  const width = generateOptions.width ?? definition.size.width;
  const height = generateOptions.height ?? definition.size.height;
  const palettes = generateOptions.palette ? [generateOptions.palette] : defaultPalettes;
  const hash = hashString(seed);
  const paletteIndex = Math.abs(generateOptions.paletteIndex ?? hash) % palettes.length;
  const palette = palettes[paletteIndex];
  const random = mulberry32(createRandomSeed(definition, seed));
  const context: StyleContext = { seed, hash, random, palette, paletteIndex, width, height };
  const body = definition.render(context, generateOptions.options as never);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`
    + `<rect width="${width}" height="${height}" fill="${palette.background}"/>`
    + body
    + `</svg>`;
}

export function generateDataUri<Options>(style: string | StyleDefinition<Options>, seed: string, generateOptions: GenerateOptions<Options> = {}): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(generateSvg(style, seed, generateOptions))}`;
}

export function generateBatch<Options>(style: string | StyleDefinition<Options>, seeds: readonly string[], generateOptions: GenerateOptions<Options> = {}): GeneratedPreview[] {
  return seeds.map((seed) => ({ seed, svg: generateSvg(style, seed, generateOptions) }));
}

export function generateBatchDataUris<Options>(style: string | StyleDefinition<Options>, seeds: readonly string[], generateOptions: GenerateOptions<Options> = {}): Array<{ seed: string; dataUri: string }> {
  return seeds.map((seed) => ({ seed, dataUri: generateDataUri(style, seed, generateOptions) }));
}
