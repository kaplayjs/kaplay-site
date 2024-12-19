---
title: Debug Mode
description: The Debug Mode is a tool that helps you to debug your game.
url: debug_mode
---

# Debug Mode

The debug mode is a KAPLAY integrated tool that helps you to debug your game.
Now, we will see how to use it.

## Inspect Mode

You can enable inspect mode by pressing `F1` key. This will open the debug
panel.

![](./assets/inspect2.png)

You will see

- The current FPS
- Object areas (blue rectangle)
- Object anchor points (red dot)
- Object components properties

## Logging

You can use (with or without the inspect mode) the `debug.log()` function to log
messages in the game screen.

```js
debug.log("Hello, world!");
```

With <kbd class="kbd kbd-sm">F2</kbd>, you can clear the log.

## Controlling time

With the keys <kbd>F7</kbd>,
<kbd>F8</kbd>,
<kbd>F9</kbd> you can control the time of the game.

<kbd>F7</kbd> and
<kbd>F9</kbd> will decrease and increase the time speed, respectively.
<kbd>F8</kbd> will pause the game.

This is useful to test features in slow motion or to pause the game to inspect
the objects.

## Changing the default key for activate the debug mode

You can set the property
[`KAPLAYOpt.debugKey`](/doc/KAPLAYOpt/#KAPLAYOpt-debugKey) to change the default
key for activate the debug mode.

```js
kaplay({
    debugKey: "r",
});
```

## Disabling the debug mode

If your game is ready to be published, you can disable the debug mode by setting
the property [`KAPLAYOpt.debug`](/doc/KAPLAYOpt/#KAPLAYOpt-debug) to `false`.

```js
kaplay({
    debug: false,
});
```
