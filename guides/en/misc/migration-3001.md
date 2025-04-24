---
title: Migrating from Kaboom.js to KAPLAY
description: Migrate your codebase from Kaboom v3000 to KAPLAY v3001.
url: migration-kaplay
order: "misc-1"
---

# Migrating from Kaboom.js to KAPLAY

KAPLAY is the fork of Kaboom.js, with the goal of continuing the development of
the library.

This guide is in general, how to pass from Kaboom to KAPLAY.

## Updating the package

As KAPLAY is a fork of Kaboom, you can update the package in your project to
`kaplay` and everything should work as before.

```sh
npm install kaplay@3001
```

```js
// before:
import kaboom from "kaboom";

// after:
import kaboom from "kaplay";
```

### CDN

```js
// before:
import kaboom from "https://unpkg.com/kaboom@3000.1.17/dist/kaboom.mjs";

// after:
import kaboom from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs";
```

## Trying out new features

To try out new features, you have to install the `@next` version of KAPLAY.

Check the [Installation Guide](/guides/install) for more information about
installing KAPLAY.

Check the
[Changelog](https://github.com/kaplayjs/kaplay/blob/master/CHANGELOG.md#v30010)
for the new features and changes.
