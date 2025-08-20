---
title: Buttons API
description:
    How to use the Input Bindings in KAPLAY, to use the same event for mouse,
    keyboard and gamepad.
url: input
---

# Buttons API

Buttons API (aka Input bindings) allows you to use the same event for mouse, keyboard, and gamepad.
Also you can set a generic name like `jump` and bind it to the keys or buttons
you want.

## Creating input bindings

You can define the bindings in the `KAPLAYOpt.buttons` option in `kaplay()`

```js
// bind your buttons
kaplay({
    buttons: {
        jump: {
            keyboard: ["space", "up"],
            gamepad: ["south"],
        },
    },
});
```

Now you can use the different input handlers to listen to the `jump` event

```js
onButtonPress("jump", () => {
    player.jump();
});

onButtonDown("jump", () => {
    player.jump();
});

onButtonRelease("jump", () => {
    player.jump();
});
```

## Getting and setting buttons

Maybe you can dynamically change the bindings in your game. Depending for
example of a configuration or a level.

You can use the `getButton(btn)` and `setButton(btn)` functions to get and set

```js
// for example, get the keyboard bindings of the jump button then draw ui
getButton("jump").keyboard;
```

```js
// change the jump button in keyboard to "w"
setButton("jump", {
    keyboard: ["w"],
    // gamepad binding is not changed
});
```

## Trigger buttons virtually

Sometimes there's a need to trigger a button virtually, for example when you
want to simulate a button press in mobile or in a cutscene.

You can use `pressButton(btn)` and `releaseButton(btn)` to trigger the button:

```js
pressButton("jump"); // triggers onButtonPress and starts onButtonDown
releaseButton("jump"); // triggers onButtonRelease and stops onButtonDown
```
