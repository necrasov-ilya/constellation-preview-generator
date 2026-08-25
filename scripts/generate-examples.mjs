import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { generateSvg, listStyles } from "../packages/core/dist/index.js";

const SEEDS = ["aurora", "basalt", "cinder", "drift", "ember", "fjord", "geyser", "harbor", "iris", "juniper"];

const previewSizes = {
  identicon: { width: 128, height: 128 },
  cover: { width: 240, height: 150 },
  rings: { width: 128, height: 128 },
  waves: { width: 240, height: 150 },
  stripes: { width: 128, height: 128 }
};

await rm("examples", { recursive: true, force: true });

for (const style of listStyles()) {
  const dir = join("examples", style.name);
  await mkdir(dir, { recursive: true });
  const size = previewSizes[style.name] ?? { width: style.size.width / 2, height: style.size.height / 2 };

  for (const seed of SEEDS) {
    await writeFile(join(dir, `${seed}.svg`), `${generateSvg(style, seed, size)}\n`, "utf8");
  }

  console.log(`examples/${style.name}: ${SEEDS.length} files`);
}
