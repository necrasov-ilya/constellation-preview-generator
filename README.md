<p align="center">
  <img src="docs/preview.png" alt="Semantic Constellation — dynamic abstract preview generator" width="100%">
</p>

# constellation-preview-generator

Generates avatars, covers and banners as SVG from a seed string. The same seed always produces the same image, on any platform.

<p align="center">
  <a href="LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT-blue"></a>&nbsp;
  <img alt="node" src="https://img.shields.io/badge/node-%E2%89%A518.17-green">&nbsp;
  <img alt="dependencies" src="https://img.shields.io/badge/dependencies-0-success">
</p>

<p align="center">
  English · <a href="docs/README.ru.md">Русский</a>
</p>

## Styles

#### identicon@1 — mirror-symmetric 5×5 identicon

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/identicon/aurora.svg" width="110"> | <img src="examples/identicon/basalt.svg" width="110"> | <img src="examples/identicon/cinder.svg" width="110"> | <img src="examples/identicon/drift.svg" width="110"> | <img src="examples/identicon/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/identicon/fjord.svg" width="110"> | <img src="examples/identicon/geyser.svg" width="110"> | <img src="examples/identicon/harbor.svg" width="110"> | <img src="examples/identicon/iris.svg" width="110"> | <img src="examples/identicon/juniper.svg" width="110"> |

#### cover@1 — 10×6 shape grid for covers and banners

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/cover/aurora.svg" width="160"> | <img src="examples/cover/basalt.svg" width="160"> | <img src="examples/cover/cinder.svg" width="160"> | <img src="examples/cover/drift.svg" width="160"> | <img src="examples/cover/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/cover/fjord.svg" width="160"> | <img src="examples/cover/geyser.svg" width="160"> | <img src="examples/cover/harbor.svg" width="160"> | <img src="examples/cover/iris.svg" width="160"> | <img src="examples/cover/juniper.svg" width="160"> |

#### rings@1 — concentric circles, filled or stroked

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/rings/aurora.svg" width="110"> | <img src="examples/rings/basalt.svg" width="110"> | <img src="examples/rings/cinder.svg" width="110"> | <img src="examples/rings/drift.svg" width="110"> | <img src="examples/rings/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/rings/fjord.svg" width="110"> | <img src="examples/rings/geyser.svg" width="110"> | <img src="examples/rings/harbor.svg" width="110"> | <img src="examples/rings/iris.svg" width="110"> | <img src="examples/rings/juniper.svg" width="110"> |

#### stripes@1 — diagonal bars

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/stripes/aurora.svg" width="110"> | <img src="examples/stripes/basalt.svg" width="110"> | <img src="examples/stripes/cinder.svg" width="110"> | <img src="examples/stripes/drift.svg" width="110"> | <img src="examples/stripes/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/stripes/fjord.svg" width="110"> | <img src="examples/stripes/geyser.svg" width="110"> | <img src="examples/stripes/harbor.svg" width="110"> | <img src="examples/stripes/iris.svg" width="110"> | <img src="examples/stripes/juniper.svg" width="110"> |

#### waves@1 — stacked sine waves

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/waves/aurora.svg" width="160"> | <img src="examples/waves/basalt.svg" width="160"> | <img src="examples/waves/cinder.svg" width="160"> | <img src="examples/waves/drift.svg" width="160"> | <img src="examples/waves/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/waves/fjord.svg" width="160"> | <img src="examples/waves/geyser.svg" width="160"> | <img src="examples/waves/harbor.svg" width="160"> | <img src="examples/waves/iris.svg" width="160"> | <img src="examples/waves/juniper.svg" width="160"> |

## Packages

| Package | Description |
| --- | --- |
| [`packages/core`](packages/core) | `constellation-preview`, the library |
| [`packages/cli`](packages/cli) | `constellation-cli`, the command line interface |

## Install

```bash
npm install constellation-preview
npm install -g constellation-cli
```

## Library

```ts
import { generateSvg, generateDataUri, generateBatch, listStyles } from "constellation-preview";

generateSvg("identicon", "aurora");                           // SVG string, 320x320
generateSvg("cover", "aurora", { width: 1120, height: 700 });
generateDataUri("rings", "ember");
generateBatch("waves", ["aurora", "basalt", "cinder"]);
listStyles();
```

Options: `width`, `height`, a custom `palette` (`{ background, primary, secondary, neutral }`) or a `paletteIndex`.

## CLI

```bash
constellation list
constellation generate identicon aurora -o avatar.svg
constellation generate rings ember --data-uri
constellation batch waves --seeds seeds.txt --out ./banners --width 240 --height 150
```

The seeds file contains one seed per line. Lines starting with `#` and empty lines are skipped.

## Third-party styles

A style is a plain object: `name`, `version`, `label`, `description`, `size` and a `render(context, options)` function. The context provides `seed`, `hash`, `random`, `palette`, `width` and `height`. `render` returns the inner SVG markup; the background rect is added by the library.

```ts
import { defineStyle, registerStyle } from "constellation-preview";

registerStyle(defineStyle({
  name: "orbits",
  version: 1,
  label: "Orbits",
  description: "Circles around a shared center",
  size: { width: 320, height: 320 },
  render: ({ random, palette, width, height }) =>
    `<circle cx="${width / 2}" cy="${height / 2}" r="${40 + random() * 60}" fill="${palette.primary}"/>`
}));
```

You can also load style modules from a directory with `--styles`. Each `*.js` or `*.mjs` file defines one style as the default export:

```bash
constellation --styles ./my-styles list
constellation --styles ./my-styles generate orbits my-seed -o orbit.svg
```

## Determinism

- The same style, version, seed and options always produce the same output.
- The PRNG is initialized with `${name}@${version}:${seed}`. The palette is selected from the seed hash.
- A released style version is never changed. Any visual change gets a new version number.