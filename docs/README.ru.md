<p align="center">
  <img src="preview.png" alt="Semantic Constellation — генератор динамических абстрактных превью" width="100%">
</p>

# constellation-preview-generator

Генерирует аватары, обложки и баннеры как SVG из строки сида. Один и тот же сид всегда даёт одну и ту же картинку, на любой платформе.

<p align="center">
  <a href="../LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT-blue"></a>&nbsp;
  <img alt="node" src="https://img.shields.io/badge/node-%E2%89%A518.17-green">&nbsp;
  <img alt="dependencies" src="https://img.shields.io/badge/dependencies-0-success">
</p>

<p align="center">
  <a href="../README.md">English</a> · Русский
</p>

## Стили

#### identicon@1 — идентикон 5×5, зеркальная симметрия

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/identicon/aurora.svg" width="110"> | <img src="../examples/identicon/basalt.svg" width="110"> | <img src="../examples/identicon/cinder.svg" width="110"> | <img src="../examples/identicon/drift.svg" width="110"> | <img src="../examples/identicon/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/identicon/fjord.svg" width="110"> | <img src="../examples/identicon/geyser.svg" width="110"> | <img src="../examples/identicon/harbor.svg" width="110"> | <img src="../examples/identicon/iris.svg" width="110"> | <img src="../examples/identicon/juniper.svg" width="110"> |

#### cover@1 — сетка фигур 10×6 для обложек и баннеров

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/cover/aurora.svg" width="160"> | <img src="../examples/cover/basalt.svg" width="160"> | <img src="../examples/cover/cinder.svg" width="160"> | <img src="../examples/cover/drift.svg" width="160"> | <img src="../examples/cover/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/cover/fjord.svg" width="160"> | <img src="../examples/cover/geyser.svg" width="160"> | <img src="../examples/cover/harbor.svg" width="160"> | <img src="../examples/cover/iris.svg" width="160"> | <img src="../examples/cover/juniper.svg" width="160"> |

#### rings@1 — концентрические окружности, залитые или обводкой

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/rings/aurora.svg" width="110"> | <img src="../examples/rings/basalt.svg" width="110"> | <img src="../examples/rings/cinder.svg" width="110"> | <img src="../examples/rings/drift.svg" width="110"> | <img src="../examples/rings/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/rings/fjord.svg" width="110"> | <img src="../examples/rings/geyser.svg" width="110"> | <img src="../examples/rings/harbor.svg" width="110"> | <img src="../examples/rings/iris.svg" width="110"> | <img src="../examples/rings/juniper.svg" width="110"> |

#### stripes@1 — диагональные полосы

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/stripes/aurora.svg" width="110"> | <img src="../examples/stripes/basalt.svg" width="110"> | <img src="../examples/stripes/cinder.svg" width="110"> | <img src="../examples/stripes/drift.svg" width="110"> | <img src="../examples/stripes/ember.svg" width="110"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/stripes/fjord.svg" width="110"> | <img src="../examples/stripes/geyser.svg" width="110"> | <img src="../examples/stripes/harbor.svg" width="110"> | <img src="../examples/stripes/iris.svg" width="110"> | <img src="../examples/stripes/juniper.svg" width="110"> |

#### waves@1 — слоистые синусоиды

| aurora | basalt | cinder | drift | ember |
| --- | --- | --- | --- | --- |
| <img src="../examples/waves/aurora.svg" width="160"> | <img src="../examples/waves/basalt.svg" width="160"> | <img src="../examples/waves/cinder.svg" width="160"> | <img src="../examples/waves/drift.svg" width="160"> | <img src="../examples/waves/ember.svg" width="160"> |

| fjord | geyser | harbor | iris | juniper |
| --- | --- | --- | --- | --- |
| <img src="../examples/waves/fjord.svg" width="160"> | <img src="../examples/waves/geyser.svg" width="160"> | <img src="../examples/waves/harbor.svg" width="160"> | <img src="../examples/waves/iris.svg" width="160"> | <img src="../examples/waves/juniper.svg" width="160"> |

## Пакеты

| Пакет | Описание |
| --- | --- |
| [`packages/core`](../packages/core) | `constellation-preview`, библиотека |
| [`packages/cli`](../packages/cli) | `constellation-cli`, командный интерфейс |

## Установка

```bash
npm install constellation-preview
npm install -g constellation-cli
```

## Библиотека

```ts
import { generateSvg, generateDataUri, generateBatch, listStyles } from "constellation-preview";

generateSvg("identicon", "aurora");                           // SVG-строка, 320x320
generateSvg("cover", "aurora", { width: 1120, height: 700 });
generateDataUri("rings", "ember");
generateBatch("waves", ["aurora", "basalt", "cinder"]);
listStyles();
```

Опции: `width`, `height`, своя `palette` (`{ background, primary, secondary, neutral }`) или `paletteIndex`.

## CLI

```bash
constellation list
constellation generate identicon aurora -o avatar.svg
constellation generate rings ember --data-uri
constellation batch waves --seeds seeds.txt --out ./banners --width 240 --height 150
```

Файл сидов содержит один сид на строку. Строки, начинающиеся с `#`, и пустые строки пропускаются.

## Сторонние стили

Стиль — обычный объект: `name`, `version`, `label`, `description`, `size` и функция `render(context, options)`. Контекст содержит `seed`, `hash`, `random`, `palette`, `width` и `height`. `render` возвращает содержимое SVG; прямоугольник фона добавляет библиотека.

```ts
import { defineStyle, registerStyle } from "constellation-preview";

registerStyle(defineStyle({
  name: "orbits",
  version: 1,
  label: "Orbits",
  description: "Круги вокруг общего центра",
  size: { width: 320, height: 320 },
  render: ({ random, palette, width, height }) =>
    `<circle cx="${width / 2}" cy="${height / 2}" r="${40 + random() * 60}" fill="${palette.primary}"/>`
}));
```

Стили также можно грузить из директории флагом `--styles`. Каждый файл `*.js` или `*.mjs` описывает один стиль в default export:

```bash
constellation --styles ./my-styles list
constellation --styles ./my-styles generate orbits my-seed -o orbit.svg
```

## Детерминизм

- Один и тот же стиль, версия, сид и опции всегда дают один и тот же результат.
- PRNG инициализируется строкой `${name}@${version}:${seed}`. Палитра выбирается по хешу сида.
- Выпущенная версия стиля не меняется. Любое визуальное изменение получает новый номер версии.