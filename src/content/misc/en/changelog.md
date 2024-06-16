---
title: v3001 CHANGELOG
description: The new features and changes in KAPLAY v3001
---

# Changelog

As you know, KAPLAY is a fork of Kaboom.js, and the latest stable version of
Kaboom.js was v3000. We are releasing v3001 and not v4000 because we want
to highlight the **full compatibility** with Kaboom.js v3000.

To install this new version, currently in alpha, you can use the following
command:

```bash
npm install kaboom@next
```

## New features

- added input bindings, `onButtonPress`, `onButtonRelease`, `onButtonDown`, and
  it's corresponding boolean versions, `isButtonPressed`, `isButtonDown` and
  `isButtonReleased`

```js
// bind your buttons
kaplay({
    bindings: {
        "jump": {
            keyboard: ["space", "up"],
            gamepad: ["south"],
        },
    },
});

onButtonPress("jump", () => {
    player.jump();
});
```

- added `getButton(btn)` and `setButton(btn)` to get and set button bindings

```js
debug.log(getButton("jump").keyboard); // ["space", "up"]

// change the jump button in keyboard to "w"
setButton("jump", {
    keyboard: ["w"],
    // gamepad binding is not changed
});
```

- now you can use array in all input handlers

```js
onKeyPress(["w", "up"], () => {
    player.jump();
});
```

- renamed `kaboom()` to `kaplay()` (you can still use `kaboom*`)
- added `getTreeRoot()` to get the game's root object
- added `loadMusic()` to load streaming audio (doesn't block in loading screen)
- added `chooseMultiple()` and `shuffle()` helper functions
- added `getSceneName()` to get the current scene name
- added `outline()`, `shader()`, and `area()` properties to debug inspect
- added global raycast function and raycast method to level
- added support for textured polygons
- added support for concave polygon drawing
- added support for arrays in uniforms
- added support for texture larger than 2048x2048
- added support for gravity direction
- added support for radius in individual corners for `rect()` component
- added line join (bevel, miter, round) and line caps (square, round)
- added quadratic bezier and Catmull-Rom evaluation
- added evaluation of the first and second derivatives for all splines
- added higher order easing functions linear, steps and cubic-bezier
- readded `layers()` function and `layer()` component to manage rendering order
- added `GameObjRaw.tags` to get a game object's tags
- added `SpriteComp.getCurAnim()` to get the current animation data
- added `SpriteComp.sprite` property to get the name of the sprite

### Deprecated

- deprecated `SpriteComp.curAnim()` in favor of `SpriteComp.getCurAnim().name`
- deprecated `fadeIn()` component in favor of `OpacityComp.fadeIn()`
