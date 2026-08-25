#!/usr/bin/env node
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { generateBatch, generateDataUri, generateSvg, getStyle, listStyles, registerStyle } from "constellation-preview";
import type { StyleDefinition } from "constellation-preview";

const usage = `constellation — deterministic SVG previews and identities

Usage:
  constellation list
  constellation generate <style> <seed> [-o <file>] [--width <n>] [--height <n>] [--data-uri]
  constellation batch <style> --seeds <file> [--out <dir>] [--width <n>] [--height <n>]

Options:
  -o, --out <path>     Output file (generate) or directory (batch, default: <style>)
  -w, --width <n>      Override width
  -h, --height <n>     Override height
  -s, --seeds <file>   Seeds file for batch mode (one seed per line, '#' comments)
  --data-uri           Print a data URI instead of SVG markup
  --styles <dir>       Load third-party style modules (*.js/*.mjs, style as default export)
`;

function isStyleDefinition(value: unknown): value is StyleDefinition<Record<string, unknown>> {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<StyleDefinition>;
  return typeof candidate.name === "string"
    && typeof candidate.version === "number"
    && typeof candidate.label === "string"
    && typeof candidate.render === "function";
}

async function loadStylesDir(dir: string): Promise<void> {
  const absolute = resolve(dir);
  const entries = (await readdir(absolute)).filter((entry) => /\.m?[jt]s$/.test(entry)).sort();

  for (const entry of entries) {
    const module = await import(pathToFileURL(join(absolute, entry)).href);
    const candidate = module.default ?? Object.values(module).find((value) => isStyleDefinition(value));

    if (isStyleDefinition(candidate)) {
      registerStyle(candidate);
      console.error(`Loaded style "${candidate.name}@${candidate.version}" from ${entry}`);
    } else {
      console.error(`Skipped ${entry}: no style definition found`);
    }
  }
}

function numberOrUndefined(value: string | undefined): number | undefined {
  if (value === undefined) return undefined;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid size value "${value}"`);
  }

  return parsed;
}

async function runGenerate(styleName: string, seed: string, values: { out?: string; "data-uri"?: boolean; width?: string; height?: string }): Promise<void> {
  if (!getStyle(styleName)) {
    throw new Error(`Unknown style "${styleName}". Run "constellation list" to see available styles.`);
  }

  const options = { width: numberOrUndefined(values.width), height: numberOrUndefined(values.height) };

  if (values["data-uri"]) {
    console.log(generateDataUri(styleName, seed, options));
    return;
  }

  const svg = generateSvg(styleName, seed, options);

  if (values.out) {
    await writeFile(values.out, `${svg}\n`, "utf8");
    console.log(`Wrote ${values.out}`);
  } else {
    console.log(svg);
  }
}

async function runBatch(styleName: string, values: { seeds?: string; out?: string; width?: string; height?: string }): Promise<void> {
  if (!getStyle(styleName)) {
    throw new Error(`Unknown style "${styleName}". Run "constellation list" to see available styles.`);
  }

  if (!values.seeds) {
    throw new Error("Usage: constellation batch <style> --seeds <file> [--out <dir>]");
  }

  const outDir = values.out ?? styleName;
  const seeds = (await readFile(values.seeds, "utf8"))
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  if (seeds.length === 0) {
    throw new Error(`No seeds found in ${values.seeds}`);
  }

  const previews = generateBatch(styleName, seeds, { width: numberOrUndefined(values.width), height: numberOrUndefined(values.height) });
  await mkdir(outDir, { recursive: true });

  for (const preview of previews) {
    const fileName = `${preview.seed.replace(/[^\w.-]+/g, "_")}.svg`;
    await writeFile(join(outDir, fileName), `${preview.svg}\n`, "utf8");
  }

  console.log(`Wrote ${previews.length} file(s) to ${outDir}`);
}

function runList(): void {
  for (const style of listStyles()) {
    console.log(`${style.name}@${style.version}  ${style.size.width}x${style.size.height}  ${style.description}`);
  }
}

async function main(): Promise<void> {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      out: { type: "string", short: "o" },
      width: { type: "string", short: "w" },
      height: { type: "string", short: "h" },
      seeds: { type: "string", short: "s" },
      "data-uri": { type: "boolean" },
      styles: { type: "string" }
    }
  });

  if (values.styles) {
    await loadStylesDir(values.styles);
  }

  const [command, styleName, seed] = positionals;

  if (command === "list") {
    runList();
    return;
  }

  if (command === "generate") {
    if (!styleName || !seed) throw new Error("Usage: constellation generate <style> <seed> [options]");
    await runGenerate(styleName, seed, values);
    return;
  }

  if (command === "batch") {
    if (!styleName) throw new Error("Usage: constellation batch <style> --seeds <file> [--out <dir>]");
    await runBatch(styleName, values);
    return;
  }

  console.log(usage);

  if (command !== undefined) {
    throw new Error(`Unknown command "${command}"`);
  }
}

main().catch((error) => {
  console.error(`constellation: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
