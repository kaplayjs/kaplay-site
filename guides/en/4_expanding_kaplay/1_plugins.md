---
title: Plugins
description: Learn about create your own plugins for KAPLAY.
url: plugins
---

# Plugins

KAPLAY uses a flexible plugin system that helps you extend the library's
functionality with new methods, constants, or even new components.

Let's take a look at how the default plugin `myPlugin()` is implemented.

```js
// k is the KAPLAY context, what kaplay() returns
function myPlugin(k) {
    return {
        hi() {
            k.debug.log("Hi from myPlugin!");
        },
    };
}
```

Now you can use the plugin in your game:

```js
const k = kaplay({
    plugins: [myPlugin],
});

k.hi(); // from myPlugin
```

## Creating a plugin

We recommend using our templates:

- [`kaplay-plugin-template`](https://github.com/kaplayjs/kaplay-plugin-template)
- [`kaplay-plugin-template-ts`](https://github.com/kaplayjs/kaplay-plugin-template-s)
  (for TypeScript)

Both are minimal and simple templates for create and publish plugins on NPM.

## Browse Plugins

### Community Plugins

- [kaplanck](https://kesuave.github.io/KaPlanck/) - Plank.js physics for KAPLAY
- [kaplay-rapier-physics](https://www.npmjs.com/package/kaplay-physics-rapier)
  Rapier physics for KAPLAY

You can explore all plugins made by the community in our
[Discord](https://discord.gg/kaboom-883781994583056384).
