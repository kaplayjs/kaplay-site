---
title: v3001 CHANGELOG
description: The new features and changes in KAPLAY v3001
---

# Changelog

As you know, KAPLAY is a fork of Kaboom.js, and the latest stable version of
Kaboom.js was v3000. We are releasing v3001 and not v4000 because we want to
highlight the **full compatibility** with Kaboom.js v3000.

To install this new version, currently in alpha, you can use the following
command:

```bash
npm install kaplay@next
```

## Input

- added input bindings, `onButtonPress`, `onButtonRelease`, `onButtonDown`, and
  it's corresponding boolean versions, `isButtonPressed`, `isButtonDown` and
  `isButtonReleased`

```js
// bind your buttons
kaplay({
    bindings: {
        jump: {
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

- added `getLastInputDeviceType()` to get what was the last pressed device

```js
onButtonPress(() => {
    console.log(getLastInputDeviceType()); // keyboard, mouse or gamepad
});
```

- now you can use arrays in all input handlers

```js
onKeyPress(["w", "up"], () => {
    player.jump();
});
```

## Components

- readded `layers()` and the `layer()` component

Before the `z()` component, there was a `layer()` component that allowed you to
control the draw order of objects. It was removed in v3000, but now it's back

```js
// define the layers
layers(
    [
        "bg",
        "game",
        "ui",
        // the default layer
    ],
    "game",
);

// use the layer component
add([sprite("bg"), layer("bg")]);
```

- added support for radius in individual corners for `rect()` component

```js
add([
    rect(100, 100, {
        radius: [10, 20, 30, 40],
    }),
]);
```

- added `getTreeRoot()` to get the game's root object, which is the parent of
  all other objects

```js
// get the root object
const root = getTreeRoot();
root.add(); // same as add()
root.get(); // same as get()
```

- setters/getters syntax in `scale()` and `sprite()` component

```js
const obj = add([
    sprite("bean"),
    scale(2),
]);

// set it with = syntax
obj.scale = vec2(3, 4);
obj.sprite = "bag";
```

## Misc

- added `loadMusic()` to load streaming audio (doesn't block in loading screen)
- added `chooseMultiple()` and `shuffle()` helpers for arrays
- added `getSceneName()` to get the current scene name
- added `camFlash()` to flash the screen
- added `SpriteComp.getCurAnim()` to get the current animation data
- added `Color.toArray()` to convert a color to an array
- added `outline()`, `shader()`, and `area()` properties to `debug.inspect` (f1)
- added `kaboomOpt.debugKey` for customizing the key used to toggle debug mode
- added `GameObjRaw.tags` to get a game object's tags
- added `GameObjRaw<SpriteComp>.sprite` property to get the name of the sprite
- added `patrol()` component to move along a list of waypoints
- added `sentry()` component to notify when certain objects are in sight
- added `particles()` component to emit and draw particles
- added `NavMesh` class for pathfinding on a mesh
- added `navigation()` component to calculate a list of waypoints on a graph
- added `animate()` component to animate the properties of an object using
  keyframes
- added global raycast function and raycast method to level
- added support for textured polygons
- added support for concave polygon drawing
- added support for arrays in uniforms
- added support for texture larger than 2048x2048
- added support for gravity direction
- added line join (bevel, miter, round) and line caps (square, round)
- added quadratic bezier and Catmull-Rom evaluation
- added evaluation of the first and second derivatives for all splines
- added higher order easing functions linear, steps and cubic-bezier
- added a text input component

## Bug fixes

- **(break)** much typescript definitions was fixed, if you use typescript now
  maybe you see new errors that make your code strict

## Deprecated

- deprecated `kaboom()` in favor of `kaplay()` (you can still use `kaboom*`)
- deprecated `SpriteComp.curAnim()` in favor of `SpriteComp.getCurAnim().name`
- deprecated `fadeIn` component in favor of `OpacityComp.fadeIn()`
- deprecated `Event`, `EventHandler` and `EventController` in favor of `KEvent`,
  `KEventHandler` and `KEventController`
