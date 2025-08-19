---
title: Crew
description: Connect KAPLAY and Crew package for loading example assets into your game
url: crew
image: "./assets/colyseus/kaplay-colyseus-guide.png"
---

# KAPLAY Crew Plugin

[KAPLAY Crew](/crew) is the collection of assets made by KAPLAY. You can easily
load them into your game using the [crew plugin](https://www.npmjs.com/package/@kaplayjs/crew).

## Setup @kaplayjs/crew

First of all you have to install `@kaplayjs/crew` package:

```sh
npm i @kaplayjs/crew
```

Now, you need to load your plugin whatever you have `kaplay`

```js
import { crew } from "@kaplayjs/crew";
import kaplay from "kaplay";

kaplay({ plugins: [crew] });
```

## `loadCrew`

With `loadCrew(kind, asset, name?)` we can load all the KAPLAY Crew available catalog.

- `kind` is the kind of the asset, `sprite`, `sound` or `font`
- `asset` is the asset to load, for example, in `sprite` kind, it would be `bean`
- `name` optional, you can load a different name for a sprite

```js
loadCrew("sprite", "bean");
loadCrew("sound", "bean_voice");
loadCrew("font", "happy");
```

This function is highly typed so you will get a great autocomplete. You can also
visit [KAPLAY Crew site](/crew) where you will find the code for loading in all
assets.
