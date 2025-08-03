---
title: Scenes
description:
    Learn how to organize your game in scenes in KAPLAY, the HTML5 Game Engine
    for JavaScript and TypeScript.
url: scenes
order: "basics-6"
---

# Scenes

Scenes are the way to organize your game. They are like the chapters of a book,
each scene is a different part of your game.

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

**IMPORTANT**: Switching the current scene to a new one will destroy all existing game objects.
That could be unexpected for some of your objects like HUD, menus or other UI elements. To prevent that and keep
required game objects you can use `stay()` component.

```js
const menuBtn = add([
    rect(50, 20, { radius: 2 }),
    pos(35, 20),
    area(),
    outline(2),
    anchor("center"),
    color(255, 255, 255),
    stay()
]);

menuBtn.add([
    pos(1, 1),
    text('Menu', { size: 12 }),
    anchor("center"),
    color(0, 0, 0),
]);
```

## Passing Data Between Scenes

Passing data between scenes is quite easy, `go()` and `scene()` functions have
parameters to pass data.

We can handle the score in the `game` scene:

```js
scene("game", (score) => {
    add([text(score), pos(12, 12)]);
});
```

Now we need to pass the score to the `game` scene. We do it with the `go()`
function:

```js
go("game", 100);
```

### Passing multiple parameters

If you have many parameters to pass, you can use an object to pass them:

```js
scene("game", ({ score, level }) => {
    add([text(`Score: ${score}`), pos(12, 12)]);

    add([text(`Level: ${level}`), pos(12, 24)]);
});
```

And pass the object to the `go()` function:

```js
go("game", { score: 100, level: 1 });
```

## Why can I use KAPLAY outside scenes?

You can use KAPLAY outside scenes. This has some advantages and disadvantages.

- **Advantage**: You can create simple games/examples without worrying about
  scenes.
- **Disadvantage**: If you add scenes later, your code outside scenes can't be
  run again. You can't do a `go()` without scenes.

```js
k.add([sprite("mark")]);

k.scene("bean", () => {
    k.add([sprite("bean")]);
});

// after this go, you can't return to mark :(
k.go("bean");
```

Fix it by putting your code inside a scene:

```js
k.scene("mark", () => {
    k.add([sprite("mark")]);
});

k.scene("bean", () => {
    k.add([sprite("bean")]);
});

k.go("bean"); // we can do go("mark") later! :D
```
