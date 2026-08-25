import type { StyleDefinition } from "./types.js";

const registry = new Map<string, StyleDefinition<never>>();

export function registerStyle<Options>(style: StyleDefinition<Options>): StyleDefinition<Options> {
  if (registry.has(style.name)) {
    throw new Error(`Style "${style.name}" is already registered`);
  }

  if (typeof style.name !== "string" || style.name.length === 0) {
    throw new Error("Style must have a non-empty name");
  }

  if (!Number.isInteger(style.version) || style.version < 1) {
    throw new Error(`Style "${style.name}" must have an integer version >= 1`);
  }

  if (typeof style.render !== "function") {
    throw new Error(`Style "${style.name}" must have a render function`);
  }

  registry.set(style.name, style as unknown as StyleDefinition<never>);
  return style;
}

export function getStyle(name: string): StyleDefinition<never> | undefined {
  return registry.get(name);
}

export function hasStyle(name: string): boolean {
  return registry.has(name);
}

export function unregisterStyle(name: string): boolean {
  return registry.delete(name);
}

export function listStyles(): Array<StyleDefinition<never>> {
  return [...registry.values()].sort((left, right) => left.name.localeCompare(right.name));
}
