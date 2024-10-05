---
title: Input Bindings
description: How to use the Input Bindings in KAPLAY, to use the same event for mouse, keyboard and gamepad.
url: input
---

# Input Bindings

The input bindings is a feature that allows you to use the same event for mouse,
keyboard and gamepad. Also you can set a generic name like `jump` and bind it to
the keys or buttons you want.

## Defining bindings

You can define the bindings in the `buttons` object in `kaplay()`

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

## Getting and setting bindings

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
