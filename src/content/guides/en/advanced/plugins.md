---
title: Plugins
description: Learn about create your own plugins for KAPLAY.
order: 6
---

# Plugins

KAPLAY uses a flexible plugin system that helps you extend
the engine's functionality with new methods,
constants, or even new components.

Let's take a look at how the default plugin `myplugin()` is implemented.

```js
// k is the KAPLAY context
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
```

Also there's exist an alternative way to use plugins:

```js
const k = kaplay();

k.plug(myPlugin);
```

You can explore plugins made by the community in our [Discord](https://discord.gg/kaboom-883781994583056384).
