---
title: KAPLAY v4000 Alpha 22
author: lajbel
date: 10/9/2025
description: The new release of KAPLAY v4000, alpha 22 is out! Check out the latest features and improvements in this version.
image: banners/spongebobo.png
imageFocus: ["center", "100%"]
crewBadge:
    text: "v4000 Alpha 22"
    crew: github
    bgColor: red
    borderColor: lightpink
---

# KAPLAY v4000 Alpha 22

> lajbel, 10/9/2025, from sponges factory

Hey! lajbel here to introduce you the **4000.0.0-alpha.22** and this new blog format,
where we gonna talk about the specific releases in the KAPLAY repository.

To install it, you can use:

```bash
npm install kaplay@4000.0.0-alpha.22
```

There's a new super cool thing called **Advanced TypeScript features**, a new API that will let you use
TypeScript in a more powerful way, getting autocomplete in places
where before it has been impossible, until now:

![](https://i.imgur.com/5RbnIcd.gif)

In the other side, we got **contraints**, a way to restrict the movement of
game objects.

![](https://i.imgur.com/rx9PLXM.gif)

A lot of more was added, like improvements in **Animation API**, new **AI** methods
and new ways to transform objects (with skew). Thanks to all contributors helping with KAPLAY.
I'll leave you with the full changelog.

## [4000.0.0-alpha.22] - 2025-10-9

### Added

- Added `KAPLAYOpt.types`, `kaplayTypes()` and `Opt` to config specific
  TypeScript Advanced Features (TAF) - @lajbel

  ```ts
  kaplay({
      types: kaplayTypes<
          // Opt<> is optional but recommended to get autocomplete
          Opt<{
              scenes: {}; // define scenes and arguments
              strictScenes: true; // you can only use defined scenes
          }>
      >(),
  });
  ```

- Added `TypesOpt.scenes` to type scenes and parameters - @lajbel

  ```ts
  const k = kaplay({
      types: kaplayTypes<
          Opt<{
              scenes: {
                  game: [gamemode: "normal" | "hard"];
                  gameOver: [score: number, highScore: number];
              };
          }>
      >(),
  });

  // If you trigger autocomplete it shows "game" or "gameOver"
  k.scene("game", (gamemode) => {
      // gamemode is now type "normal" | "hard"

      // @ts-expect-error Argument of type 'string' is not assignable
      // to parameter of type 'number'.
      k.go("gameOver", "10", 10); //
  });
  ```

  The methods that support this are:

  - `scene`
  - `go`
  - `onSceneLeave`
  - `getSceneName`

- Added `TypesOpt.strictScenes` to make usable scenes just the ones defined -
  @lajbel

  ```ts
  const k = kaplay({
      types: kaplayTypes<
          Opt<{
              scenes: {
                  game: [gamemode: "normal" | "hard"];
                  gameOver: [score: number, highScore: number];
              };
              strictScenes: true;
          }>
      >(),
  });

  // @ts-expect-error Argument of type '"hi"' is not assignable to
  // parameter of type '"game" | "gameOver"'.
  k.scene("hi", () => {});
  ```

- Added named animations - @mflerackers

  By giving a name to an animation, you can define more than one animation

  ```js
  const anim = obj.animation.get("idle");
  anim.animate("pos", [0, 5, 0], { relative: true });
  ```

- Added `screenshotToBlob()` to get a screenshot as a `Blob` - @dragoncoder047
- Added `getButtons()` to get the input binding buttons definition - @lajbel
- Added `RuleSystem`, `DecisionTree` and `StateMachine` for enemy AI -
  @mflerackers
- Added constraint components for distance, translation, rotation, scale and
  transform constraints - @mflerackers
- Added inverse kinematics constraint components using FABRIK and CCD, the
  latter one can use bone constraints to constrain the angle - @mflerackers
- Added skew to Mat23, transformation stack, RenderProps, GameObjRaw as well as
  a component - @mflerackers
- Added texture uniforms, in order to access more than one texture at a time in
  shaders - @mflerackers

### Fixed

- Now error screen should be instantly shown - @lajbel

### Changed

- Now, you can use `color(c)` with a hexadecimal literal number (ex: 0x00ff00) -
  @lajbel
  ```js
  // blue frog
  add([
      sprite("bean"),
      color(0x0000ff),
  ]);
  ```
- **(!)** `KAPLAYCtx` doesn't use generics anymore. Now, `KAPLAYCtxT` uses
  them - @lajbel
- Now, `kaplay` will return `KAPLAYCtx` or `KAPLAYCtxT` depending if it's using
  Advanced TypeScript Features or not - @lajbel
- `loadShader()` now also checks for link errors as well as compile errors and
  reports them rather than just silently trying to use a borked shader -
  @dragoncoder047
- The debug `record()` function now records with sound enabled like it should -
  @dragoncoder047
- Now `KAPLAYOpt.spriteAtlasPadding` is set to `2` by default - @lajbel
- Transformation and drawing is split now, so the transform can be modified
  before drawing - @mflerackers
