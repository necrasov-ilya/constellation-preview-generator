<p align="center">
  <img src="preview.png" alt="Semantic Constellation — генератор динамических абстрактных превью" width="100%">
</p>

**Детерминированные генеративные превью и визуальная идентичность в чистом SVG.**
Один seed — одна картинка, байт в байт, на любой платформе. Ноль зависимостей.

<p align="center">
  <a href="../LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT-blue"></a>&nbsp;
  <img alt="node" src="https://img.shields.io/badge/node-%E2%89%A518.17-green">&nbsp;
  <img alt="dependencies" src="https://img.shields.io/badge/dependencies-0-success">
</p>

<p align="center">
  <a href="../README.md">English</a> · Русский
</p>

```
seed → хеш FNV-1a → PRNG mulberry32 → SVG-строка
```

## Стили

#### identicon@1 — зеркально-симметричная сетка 5×5, классический аватар

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/identicon/aurora.svg" width="110"> | <img src="../examples/identicon/basalt.svg" width="110"> | <img src="../examples/identicon/cinder.svg" width="110"> | <img src="../examples/identicon/drift.svg" width="110"> | <img src="../examples/identicon/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/identicon/fjord.svg" width="110"> | <img src="../examples/identicon/geyser.svg" width="110"> | <img src="../examples/identicon/harbor.svg" width="110"> | <img src="../examples/identicon/iris.svg" width="110"> | <img src="../examples/identicon/juniper.svg" width="110"> |

#### cover@1 — плотное поле 10×6 для обложек проектов и баннеров

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/cover/aurora.svg" width="160"> | <img src="../examples/cover/basalt.svg" width="160"> | <img src="../examples/cover/cinder.svg" width="160"> | <img src="../examples/cover/drift.svg" width="160"> | <img src="../examples/cover/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/cover/fjord.svg" width="160"> | <img src="../examples/cover/geyser.svg" width="160"> | <img src="../examples/cover/harbor.svg" width="160"> | <img src="../examples/cover/iris.svg" width="160"> | <img src="../examples/cover/juniper.svg" width="160"> |

#### rings@1 — концентрические круги вокруг дрейфующего центра

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/rings/aurora.svg" width="110"> | <img src="../examples/rings/basalt.svg" width="110"> | <img src="../examples/rings/cinder.svg" width="110"> | <img src="../examples/rings/drift.svg" width="110"> | <img src="../examples/rings/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/rings/fjord.svg" width="110"> | <img src="../examples/rings/geyser.svg" width="110"> | <img src="../examples/rings/harbor.svg" width="110"> | <img src="../examples/rings/iris.svg" width="110"> | <img src="../examples/rings/juniper.svg" width="110"> |

#### stripes@1 — диагональные полосы разной ширины и ритма

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/stripes/aurora.svg" width="110"> | <img src="../examples/stripes/basalt.svg" width="110"> | <img src="../examples/stripes/cinder.svg" width="110"> | <img src="../examples/stripes/drift.svg" width="110"> | <img src="../examples/stripes/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/stripes/fjord.svg" width="110"> | <img src="../examples/stripes/geyser.svg" width="110"> | <img src="../examples/stripes/harbor.svg" width="110"> | <img src="../examples/stripes/iris.svg" width="110"> | <img src="../examples/stripes/juniper.svg" width="110"> |

#### waves@1 — слоистые синусоиды, накатывающие на зрителя

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/waves/aurora.svg" width="160"> | <img src="../examples/waves/basalt.svg" width="160"> | <img src="../examples/waves/cinder.svg" width="160"> | <img src="../examples/waves/drift.svg" width="160"> | <img src="../examples/waves/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/waves/fjord.svg" width="160"> | <img src="../examples/waves/geyser.svg" width="160"> | <img src="../examples/waves/harbor.svg" width="160"> | <img src="../examples/waves/iris.svg" width="160"> | <img src="../examples/waves/juniper.svg" width="160"> |

## Пакеты

| Пакет | Описание |
| --- | --- |
| [`packages/core`](../packages/core) | `constellation-preview` — библиотека: реестр стилей, генераторы |
| [`packages/cli`](../packages/cli) | `constellation-cli` — CLI: одиночная генерация, батч, сторонние стили |

## Установка

```bash
npm install constellation-preview        # библиотека
npm install -g constellation-cli         # CLI
```

## Библиотека

```ts
import { generateSvg, generateDataUri, generateBatch, listStyles } from "constellation-preview";

generateSvg("identicon", "aurora");                           // → SVG-строка, 320×320
generateSvg("cover", "aurora", { width: 1120, height: 700 }); // с изменённым размером
generateDataUri("rings", "ember");                            // → data:image/svg+xml;utf8,...
generateBatch("waves", ["aurora", "basalt", "cinder"]);       // → [{ seed, svg }, ...]
listStyles();                                                 // → все зарегистрированные стили
```

Опции: `width`, `height`, своя палитра (`{ background, primary, secondary, neutral }`) или `paletteIndex`.

## CLI

```bash
constellation list
constellation generate identicon aurora -o avatar.svg
constellation generate rings ember --data-uri
constellation batch waves --seeds seeds.txt --out ./banners --width 240 --height 150
```

Файл сидов: по одному на строку, строки с `#` и пустые пропускаются.

## Сторонние стили

Стиль — обычный объект: `name`, `version`, `label`, `description`, `size` и чистая функция `render(context, options)`, которая получает `{ seed, hash, random, palette, width, height }` и возвращает тело SVG (фон добавляется автоматически).

```ts
import { defineStyle, registerStyle } from "constellation-preview";

registerStyle(defineStyle({
  name: "orbits",
  version: 1,
  label: "Orbits",
  description: "Круги на орбите общего центра",
  size: { width: 320, height: 320 },
  render: ({ random, palette, width, height }) =>
    `<circle cx="${width / 2}" cy="${height / 2}" r="${40 + random() * 60}" fill="${palette.primary}"/>`
}));
```

Или загрузка из директории без публикации (default export в каждом `*.js`/`*.mjs` файле):

```bash
constellation --styles ./my-styles list
constellation --styles ./my-styles generate orbits my-seed -o orbit.svg
```

## Контракт детерминизма

- Тот же стиль + версия + seed + опции → идентичный результат, байт в байт, навсегда.
- PRNG засеивается строкой `` `${name}@${version}:${seed}` ``, палитра выбирается по хешу сида.
- Любое визуальное изменение стиля **обязано** поднимать его `version`. Выпущенные версии не редактируются.
