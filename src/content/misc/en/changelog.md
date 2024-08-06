---
title: v4000 Changelog
description: The new features and changes in KAPLAY v3001
---

# Changelog

KAPLAY is a fork of Kaboom.js, and the latest stable version of Kaboom.js was
**v3000**.

We are working on version **v4000** of KAPLAY, and we have added a lot of new
**features** and **improvements**.

We also are working on version **v3001** to make the transition from Kaboom to
KAPLAY easier. This version will be _99.9%_ compatible with Kaboom, without some
of the most recent features such as **performance** improvements.

- **v4000**: The new and next version of **KAPLAY**.
- **v3001**: The version of **KAPLAY** compatible with **Kaboom**.
- **v3000**: The last stable version of **Kaboom**.

## Input

- added input bindings, `onButtonPress`, `onButtonRelease`, `onButtonDown`, and
  it's corresponding boolean versions, `isButtonPressed`, `isButtonDown` and
  `isButtonReleased`. (**v3001/4000**)

  ```js
  kaplay({
      // bind your buttons
      buttons: {
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
  (**v3001/4000**)

  ```js
  // ["space", "up"]
  debug.log(getButton("jump").keyboard);

  // change the jump button in keyboard to "w"
  setButton("jump", {
      keyboard: ["w"],
      // gamepad binding is not changed
  });
  ```

- added `getLastInputDeviceType()` to get what was the last pressed device
  (**v3001/4000**)

  ```js
  onButtonPress(() => {
      const lastInputDevice = getLastInputDeviceType(); // keyboard, mouse or gamepad
      // change icons, etc
  });
  ```

- added the possibility of use arrays in all input handlers (**v3001/4000**)

  ```js
  onKeyPress(["w", "up"], () => {
      player.jump();
  });
  ```

## Physics

- added effector components: `areaEffector()`, `buoyancyEffector()`,
  `pointEffector()`, `surfaceEffector()`. (**v3001/4000**)
- added `constantForce()` component (**v3001/4000**)
- (**v3001/4000**) added `patrol()` component to move along a list of waypoints
- (**v3001/4000**) added `sentry()` component to notify when certain objects are
  in sight
- (**v3001/4000**) added `NavMesh` class for pathfinding on a mesh
- (**v3001/4000**) added `navigation()` component to calculate a list of
  waypoints on a graph

## Game Object

- added `getTreeRoot()` to get the game's root object, which is the parent of
  all other objects (**v3001/4000**)

  ```js
  // get the root object
  const root = getTreeRoot();
  root.add(); // same as add()
  root.get(); // same as get()
  ```

- added `GameObjRaw.tags` to get a game object's tags. (**v3001/4000**)

  ```js
  const obj = add([sprite("bean"), "enemy", "dangerous"]);

  // get the tags
  debug.log(obj.tags); // ["enemy", "dangerous"]
  ```

## Components

- added support to setters/getters syntax in `ScaleComp` and `SpriteComp`
  components (**v3001/4000**)

  ```js
  const obj = add([
      sprite("bean"),
      scale(2),
  ]);

  // set it with = syntax
  obj.scale = vec2(3, 4);
  obj.sprite = "bag";
  ```

## Rendering and Animation

- added the `animate()` component to _animate_ the properties of an object using
  keyframes. Check out
  [Animation Example](https://play.kaplayjs.com/?example=animation)
  (**v3001/4000**)

  ```js
  // prop to animate, frames, options
  rotatingBean.animate("angle", [0, 360], {
      duration: 2,
      direction: "forward",
  });
  ```

- added `particles()` component to emit and draw particles. (**v3001/4000**)

- readded `layers()` and the `layer()` component. (**v3001/4000**)

  Before the `z()` component, there was a `layer()` component that allowed you
  to control the draw order of objects. It was removed in v3000, but now it's
  back from the void.

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

- added `SpriteComp.getCurAnim()` to get the current animation data
  (**v3001/4000**)

  ```js
  const obj = add([
      sprite("bean", { anim: "walk" }),
  ]);

  // get the current animation name
  debug.log(obj.getCurAnim().name); // "walk"
  ```

- added `SpriteComp.getAnim()` for get any animation data (**v3001/4000**)

  ```js
  loadSprite("bean", "bean.png", {
      sliceX: 4,
      sliceY: 1,
      anims: {
          walk: {
              from: 0,
              to: 3,
          },
      },
  });

  const obj = add([
      sprite("bean"),
  ]);

  // get the animation data
  debug.log(obj.getAnim("walk")); // { from: 0, to: 3 }
  ```

- added `SpriteComp.hasAnim()` to check if an animation exists (**v3001/4000**)

  ```js
  const obj = add([
      sprite("bean", { anim: "walk" }),
  ]);

  // check if an animation exists
  debug.log(obj.hasAnim("walk")); // true
  ```

- added `camFlash()` to flash the screen. (**v3001/4000**)

  ```js
  camFlash(0.5, 0.5, 0.5, 0.5);
  ```

- added support for radius in individual corners for `RectComp` component.
  (**v3001/4000**)

  ```js
  add([
      rect(100, 100, {
          radius: [10, 20, 30, 40],
      }),
  ]);
  ```

- (**! break**) removed compatibilty to use two KAPLAY frames in the same page,
  due to perfomance improvements

- fix error screen not showing with not Error object

## Audio

- added `loadMusic()` to load streaming audio (doesn't block in loading screen).
  (**v3001/4000**)

  ```js
  loadMusic("bgm", "bgm.mp3");

  // play the music
  play("bgm");
  ```

## Math

- added `Vec2.fromArray()` to convert an array to a `Vec2`. (**v3001/4000**)

  ```js
  const point = Vec2.fromArray([100, 200]); // vec2(100, 200);
  ```

- added `Vec2.toArray()` to convert a `Vec2` to an array. (**v3001/4000**)

  ```js
  const point = vec2(100, 200);
  const arr = point.toArray(); // [100, 200]
  ```

- added `chooseMultiple()` to choose a random element from an array.
  (**v3001/4000**)

  ```js
  const numbers = [1, 2, 3, 4, 5];
  const random = chooseMultiple(numbers, 3); // [3, 1, 5]
  ```

- added `shuffle()` to shuffle an array. (**v3001/4000**)

  ```js
  const numbers = [1, 2, 3, 4, 5];
  shuffle(numbers); // [3, 1, 5, 2, 4]
  ```

## Debug mode

- added `outline()`, `shader()`, and `area()` properties to `debug.inspect`
  (**v3001/4000**)
- added `KAPLAYOpt.debugKey` for customizing the key used to toggle debug mode.
  (**v3001/4000**)

  ```js
  kaplay({
      debugKey: "l",
  });
  ```
- added compatibility with custom properties in debug mode

  ```js
  const obj = add([
      sprite("bean"),
      {
          health: 100, // on debug.inspect
          damage: 10, // on debug.inspect
          hp() {
              this.health -= this.damage;
          }, // not on debug.inspect
      },
  ]);

  // see the custom properties in debug mode
  debug.inspect = true;
  ```

## Helpers

- (**v3001/4000**) added `getSceneName()` to get the current scene name
- (**v3001/4000**) added `Color.toArray()` to convert a color to an array
- (**v3001/4000**) added global raycast function and raycast method to level
- (**v3001/4000**) added support for textured polygons
- (**v3001/4000**) added support for concave polygon drawing
- (**v3001/4000**) added support for arrays in uniforms
- (**v3001/4000**) added support for texture larger than 2048x2048
- (**v3001/4000**) added support for gravity direction
- (**v3001/4000**) added line join (bevel, miter, round) and line caps (square,
  round)
- (**v3001/4000**) added quadratic bezier and Catmull-Rom evaluation
- (**v3001/4000**) added evaluation of the first and second derivatives for all
  splines
- (**v3001/4000**) added higher order easing functions linear, steps and
  cubic-bezier

## Bug fixes

- **(break)** much typescript definitions was fixed, if you use typescript now
  maybe you see new errors that make your code stricNt

## Deprecations

- deprecated `kaboom()` in favor of `kaplay()` (you can still use `kaboom*`)
- deprecated `SpriteComp.curAnim()` in favor of `SpriteComp.getCurAnim().name`
- deprecated `fadeIn` component in favor of `OpacityComp.fadeIn()`
- deprecated `Event`, `EventHandler` and `EventController` in favor of `KEvent`,
  `KEventHandler` and `KEventController`
