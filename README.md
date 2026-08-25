# constellation-preview-generator

[English](#english) · [Русский](#русский)

---

<a id="english"></a>

## English

Deterministic generative previews and visual identities as pure SVG: avatars, project covers, patterns. Zero dependencies, no canvas, no fonts — the same seed always produces the same picture, byte for byte, on any platform.

```
seed → FNV-1a hash → mulberry32 PRNG → SVG string
```

### Styles

#### identicon@1 — mirror-symmetric 5×5 grid, classic avatar

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/identicon/aurora.svg" width="110"> | <img src="examples/identicon/basalt.svg" width="110"> | <img src="examples/identicon/cinder.svg" width="110"> | <img src="examples/identicon/drift.svg" width="110"> | <img src="examples/identicon/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/identicon/fjord.svg" width="110"> | <img src="examples/identicon/geyser.svg" width="110"> | <img src="examples/identicon/harbor.svg" width="110"> | <img src="examples/identicon/iris.svg" width="110"> | <img src="examples/identicon/juniper.svg" width="110"> |

#### cover@1 — dense 10×6 field for project covers and banners

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/cover/aurora.svg" width="160"> | <img src="examples/cover/basalt.svg" width="160"> | <img src="examples/cover/cinder.svg" width="160"> | <img src="examples/cover/drift.svg" width="160"> | <img src="examples/cover/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/cover/fjord.svg" width="160"> | <img src="examples/cover/geyser.svg" width="160"> | <img src="examples/cover/harbor.svg" width="160"> | <img src="examples/cover/iris.svg" width="160"> | <img src="examples/cover/juniper.svg" width="160"> |

#### rings@1 — concentric circles around a drifting center

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/rings/aurora.svg" width="110"> | <img src="examples/rings/basalt.svg" width="110"> | <img src="examples/rings/cinder.svg" width="110"> | <img src="examples/rings/drift.svg" width="110"> | <img src="examples/rings/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/rings/fjord.svg" width="110"> | <img src="examples/rings/geyser.svg" width="110"> | <img src="examples/rings/harbor.svg" width="110"> | <img src="examples/rings/iris.svg" width="110"> | <img src="examples/rings/juniper.svg" width="110"> |

#### stripes@1 — diagonal bars of varying width and rhythm

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/stripes/aurora.svg" width="110"> | <img src="examples/stripes/basalt.svg" width="110"> | <img src="examples/stripes/cinder.svg" width="110"> | <img src="examples/stripes/drift.svg" width="110"> | <img src="examples/stripes/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/stripes/fjord.svg" width="110"> | <img src="examples/stripes/geyser.svg" width="110"> | <img src="examples/stripes/harbor.svg" width="110"> | <img src="examples/stripes/iris.svg" width="110"> | <img src="examples/stripes/juniper.svg" width="110"> |

#### waves@1 — layered sine waves rolling toward the viewer

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/waves/aurora.svg" width="160"> | <img src="examples/waves/basalt.svg" width="160"> | <img src="examples/waves/cinder.svg" width="160"> | <img src="examples/waves/drift.svg" width="160"> | <img src="examples/waves/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/waves/fjord.svg" width="160"> | <img src="examples/waves/geyser.svg" width="160"> | <img src="examples/waves/harbor.svg" width="160"> | <img src="examples/waves/iris.svg" width="160"> | <img src="examples/waves/juniper.svg" width="160"> |

### Packages

| Package | Description |
| --- | --- |
| [`packages/core`](packages/core) | `constellation-preview` — the library: styles registry, generators, zero dependencies |
| [`packages/cli`](packages/cli) | `constellation-cli` — command line interface: single files, batch mode, third-party style loading |

### Install

```bash
npm install constellation-preview
# or globally for the CLI
npm install -g constellation-cli
```

### Library

```ts
import { generateSvg, generateDataUri, generateBatch, listStyles } from "constellation-preview";

generateSvg("identicon", "aurora");                          // → SVG string, 320×320
generateSvg("cover", "aurora", { width: 1120, height: 700 }); // resized
generateDataUri("rings", "ember");                            // → data:image/svg+xml;utf8,...
generateBatch("waves", ["aurora", "basalt", "cinder"]);       // → [{ seed, svg }, ...]
listStyles();                                                 // → all registered styles
```

Options: `width`, `height`, custom `palette` (`{ background, primary, secondary, neutral }`) or `paletteIndex`.

### CLI

```bash
constellation list
constellation generate identicon aurora -o avatar.svg
constellation generate rings ember --data-uri
constellation batch waves --seeds seeds.txt --out ./banners --width 240 --height 150
```

Seeds file: one seed per line, `#` comments and empty lines are skipped.

### Third-party styles

A style is a plain object: `name`, `version`, `label`, `description`, `size` and a pure `render(context, options)` function that receives `{ seed, hash, random, palette, width, height }` and returns the SVG body (everything inside `<svg>`, the background rect is added for you).

Register programmatically:

```ts
import { defineStyle, registerStyle } from "constellation-preview";

registerStyle(defineStyle({
  name: "orbits",
  version: 1,
  label: "Orbits",
  description: "Circles orbiting a shared center",
  size: { width: 320, height: 320 },
  render: ({ random, palette, width, height }) => {
    // use random() as much as you like — it is seeded and deterministic
    return `<circle cx="${width / 2}" cy="${height / 2}" r="${40 + random() * 60}" fill="${palette.primary}"/>`;
  }
}));
```

Or load from a directory without publishing (each `*.js`/`*.mjs` file with a style as default export):

```bash
constellation --styles ./my-styles list
constellation --styles ./my-styles generate orbits my-seed -o orbit.svg
```

### Determinism contract

- Same style version + seed + options → identical output, byte for byte, forever.
- The PRNG is seeded with `` `${name}@${version}:${seed}` ``, the palette is picked from the seed hash.
- Any visual change to a style **must** bump its `version`. Never edit a released version — existing identities depend on it.

### Roadmap

- [ ] TUI (Bubble Tea, Go): interactive style/seed explorer, distributed as single cross-platform binaries
- [ ] PNG export (optional peer dependency)
- [ ] HTTP wrapper for remote generation

## License

[MIT](LICENSE)

---

<a id="русский"></a>

## Русский

Детерминированные генеративные превью и визуальная идентичность в чистом SVG: аватары, обложки проектов, паттерны. Ноль зависимостей, ни canvas, ни шрифтов — один и тот же seed всегда даёт одну и ту же картинку, байт в байт, на любой платформе.

```
seed → хеш FNV-1a → PRNG mulberry32 → SVG-строка
```

### Стили

#### identicon@1 — зеркально-симметричная сетка 5×5, классический аватар

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/identicon/aurora.svg" width="110"> | <img src="examples/identicon/basalt.svg" width="110"> | <img src="examples/identicon/cinder.svg" width="110"> | <img src="examples/identicon/drift.svg" width="110"> | <img src="examples/identicon/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/identicon/fjord.svg" width="110"> | <img src="examples/identicon/geyser.svg" width="110"> | <img src="examples/identicon/harbor.svg" width="110"> | <img src="examples/identicon/iris.svg" width="110"> | <img src="examples/identicon/juniper.svg" width="110"> |

#### cover@1 — плотное поле 10×6 для обложек проектов и баннеров

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/cover/aurora.svg" width="160"> | <img src="examples/cover/basalt.svg" width="160"> | <img src="examples/cover/cinder.svg" width="160"> | <img src="examples/cover/drift.svg" width="160"> | <img src="examples/cover/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/cover/fjord.svg" width="160"> | <img src="examples/cover/geyser.svg" width="160"> | <img src="examples/cover/harbor.svg" width="160"> | <img src="examples/cover/iris.svg" width="160"> | <img src="examples/cover/juniper.svg" width="160"> |

#### rings@1 — концентрические круги вокруг дрейфующего центра

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/rings/aurora.svg" width="110"> | <img src="examples/rings/basalt.svg" width="110"> | <img src="examples/rings/cinder.svg" width="110"> | <img src="examples/rings/drift.svg" width="110"> | <img src="examples/rings/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/rings/fjord.svg" width="110"> | <img src="examples/rings/geyser.svg" width="110"> | <img src="examples/rings/harbor.svg" width="110"> | <img src="examples/rings/iris.svg" width="110"> | <img src="examples/rings/juniper.svg" width="110"> |

#### stripes@1 — диагональные полосы разной ширины и ритма

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/stripes/aurora.svg" width="110"> | <img src="examples/stripes/basalt.svg" width="110"> | <img src="examples/stripes/cinder.svg" width="110"> | <img src="examples/stripes/drift.svg" width="110"> | <img src="examples/stripes/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/stripes/fjord.svg" width="110"> | <img src="examples/stripes/geyser.svg" width="110"> | <img src="examples/stripes/harbor.svg" width="110"> | <img src="examples/stripes/iris.svg" width="110"> | <img src="examples/stripes/juniper.svg" width="110"> |

#### waves@1 — слоистые синусоиды, накатывающие на зрителя

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="examples/waves/aurora.svg" width="160"> | <img src="examples/waves/basalt.svg" width="160"> | <img src="examples/waves/cinder.svg" width="160"> | <img src="examples/waves/drift.svg" width="160"> | <img src="examples/waves/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="examples/waves/fjord.svg" width="160"> | <img src="examples/waves/geyser.svg" width="160"> | <img src="examples/waves/harbor.svg" width="160"> | <img src="examples/waves/iris.svg" width="160"> | <img src="examples/waves/juniper.svg" width="160"> |

### Пакеты

| Пакет | Описание |
| --- | --- |
| [`packages/core`](packages/core) | `constellation-preview` — библиотека: реестр стилей, генераторы, ноль зависимостей |
| [`packages/cli`](packages/cli) | `constellation-cli` — консольный интерфейс: одиночная генерация, батч, загрузка сторонних стилей |

### Установка

```bash
npm install constellation-preview
# или глобально для CLI
npm install -g constellation-cli
```

### Библиотека

```ts
import { generateSvg, generateDataUri, generateBatch, listStyles } from "constellation-preview";

generateSvg("identicon", "aurora");                          // → SVG-строка, 320×320
generateSvg("cover", "aurora", { width: 1120, height: 700 }); // с изменённым размером
generateDataUri("rings", "ember");                            // → data:image/svg+xml;utf8,...
generateBatch("waves", ["aurora", "basalt", "cinder"]);       // → [{ seed, svg }, ...]
listStyles();                                                 // → все зарегистрированные стили
```

Опции: `width`, `height`, своя палитра (`{ background, primary, secondary, neutral }`) или `paletteIndex`.

### CLI

```bash
constellation list
constellation generate identicon aurora -o avatar.svg
constellation generate rings ember --data-uri
constellation batch waves --seeds seeds.txt --out ./banners --width 240 --height 150
```

Файл сидов: по одному на строку, строки с `#` и пустые пропускаются.

### Сторонние стили

Стиль — обычный объект: `name`, `version`, `label`, `description`, `size` и чистая функция `render(context, options)`, которая получает `{ seed, hash, random, palette, width, height }` и возвращает тело SVG (всё внутри `<svg>`, фон добавляется автоматически).

Регистрация в коде:

```ts
import { defineStyle, registerStyle } from "constellation-preview";

registerStyle(defineStyle({
  name: "orbits",
  version: 1,
  label: "Orbits",
  description: "Круги на орбите общего центра",
  size: { width: 320, height: 320 },
  render: ({ random, palette, width, height }) => {
    // random() можно звать сколько угодно — он засеян и детерминирован
    return `<circle cx="${width / 2}" cy="${height / 2}" r="${40 + random() * 60}" fill="${palette.primary}"/>`;
  }
}));
```

Или загрузка из директории без публикации в npm (каждый `*.js`/`*.mjs` файл со стилем в default export):

```bash
constellation --styles ./my-styles list
constellation --styles ./my-styles generate orbits my-seed -o orbit.svg
```

### Контракт детерминизма

- Тот же стиль + версия + seed + опции → идентичный результат, байт в байт, навсегда.
- PRNG засеивается строкой `` `${name}@${version}:${seed}` ``, палитра выбирается по хешу сида.
- Любое визуальное изменение стиля **обязано** поднимать его `version`. Выпущенные версии не редактируются — на них завязаны уже существующие идентичности.

### Планы

- [ ] TUI (Bubble Tea, Go): интерактивный обозреватель стилей и сидов, одиночные кроссплатформенные бинарники
- [ ] Экспорт в PNG (опциональный peer dependency)
- [ ] HTTP-обёртка для удалённой генерации

## Лицензия

[MIT](LICENSE)
