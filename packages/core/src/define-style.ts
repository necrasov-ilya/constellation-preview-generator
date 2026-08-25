import type { StyleDefinition } from "./types.js";

export function defineStyle<Options = Record<string, never>>(style: StyleDefinition<Options>): StyleDefinition<Options> {
  return style;
}
