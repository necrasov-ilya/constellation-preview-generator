import { registerStyle } from "../registry.js";
import { cover } from "./cover.js";
import { identicon } from "./identicon.js";
import { rings } from "./rings.js";
import { stripes } from "./stripes.js";
import { waves } from "./waves.js";

export function registerBuiltinStyles(): void {
  registerStyle(cover);
  registerStyle(identicon);
  registerStyle(rings);
  registerStyle(stripes);
  registerStyle(waves);
}

registerBuiltinStyles();
