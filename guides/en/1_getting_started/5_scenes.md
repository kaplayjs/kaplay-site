---
title: Scenes
description: Learn how to organize your game in scenes in KAPLAY, the HTML5 Game Engine for JavaScript and TypeScript.
url: scenes
---

# Scenes

Scenes are the way to organize your game. They are like the chapters of a book,
each scene is a different part of your game. On this guide:

- [`scene()`](/doc/ctx/scene) function to create scenes
- [`go()`](/doc/ctx/go) function to change the current scene
- Passing data between scenes

## Creating Scenes

To create a scene, we use the `scene()` function. This function receives a name
and a callback function. The callback function is executed when the scene is
activated.

```js
scene("game", () => {
    // your game code here
});
```

## Changing Scenes

When you want to change the current scene, you use the `go()` function. This
function receives the name of the scene you want to go.

```js
go("game");
```

## Passing Data Between Scenes

Passing data between scenes is quite easy, `go()` and `scene()` functions have
parameters to pass data.

We can handle the score in the `game` scene:

```js
scene("game", (score) => {
    add([
        text(score),
        pos(12, 12),
    ]);
});
```

Now we need to pass the score to the `game` scene, we do it with the `go()`
function:

```js
go("game", 100);
```

### I have many parameters to pass

If you have many parameters to pass, you can use an object to pass them:

```js
scene("game", ({ score, level }) => {
    add([
        text(`Score: ${score}`),
        pos(12, 12),
    ]);

    add([
        text(`Level: ${level}`),
        pos(12, 24),
    ]);
});
```

And pass the object to the `go()` function:

```js
go("game", { score: 100, level: 1 });
```
