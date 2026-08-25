export interface Palette {
  background: string;
  primary: string;
  secondary: string;
  neutral: string;
}

export interface StyleSize {
  width: number;
  height: number;
}

export interface StyleContext {
  seed: string;
  hash: number;
  random: () => number;
  palette: Palette;
  paletteIndex: number;
  width: number;
  height: number;
}

export interface StyleDefinition<Options = Record<string, never>> {
  name: string;
  version: number;
  label: string;
  description: string;
  size: StyleSize;
  render: (context: StyleContext, options: Options) => string;
}

export interface GenerateOptions<Options = Record<string, never>> {
  width?: number;
  height?: number;
  palette?: Palette;
  paletteIndex?: number;
  options?: Options;
}

export interface GeneratedPreview {
  seed: string;
  svg: string;
}
