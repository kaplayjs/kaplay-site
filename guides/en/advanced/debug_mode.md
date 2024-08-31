---
title: Debug Mode
description: The Debug Mode is a tool that helps you to debug your game.
order: 3
---

# Debug Mode

The debug mode is a KAPLAY integrated tool that helps you to debug your game.
Now, we will see how to use it.

## Inspect Mode

You can enable inpsect mode by pressing `F1` key. This will open the debug
panel.

![](assets/2024-06-03-21-42-06.png)

You will see

- The current FPS
- Object areas (blue rectangle)
- Object anchor points (red dot)
- Object components properties

## Logging

You can use (with or without the inpsect mode) the `debug.log()` function to log
messages in the game screen.

```js
debug.log("Hello, world!");
```

With <kbd class="kbd kbd-sm text-current">F2</kbd>, you can clear the log.

## Controlling time

With the keys <kbd class="kbd kbd-sm text-current">F7</kbd>,
<kbd class="kbd kbd-sm text-current">F8</kbd>,
<kbd class="kbd kbd-sm text-current">F9</kbd> you can control the time of the
game.

<kbd class="kbd kbd-sm text-current">F7</kbd> and
<kbd class="kbd kbd-sm text-current">F9</kbd> will decrease and increase the
time speed, respectively.
<kbd class="kbd kbd-sm text-current">F8</kbd> will pause the game.

This is useful to test features in slow motion or to pause the game to inspect
the objects.

## Changing the default key for activate the debug mode

You can set the property
[`KAPLAYOpt.debugKey`](https://kaplayjs.com/doc/KAPLAYOpt/#KAPLAYOpt-debugKey)
to change the default key for activate the debug mode.

```js
kaplay({
    debugKey: "r",
});
```

## Disabling the debug mode

If your game is ready to be published, you can disable the debug mode by setting
the property
[`KAPLAYOpt.debug`](https://kaplayjs.com/doc/KAPLAYOpt/#KAPLAYOpt-debug) to
`false`.

```js
kaplay({
    debug: false,
});
```
