---
title: Components & Tags
description: Learn how to create and use components in KAPLAY, the HTML5 Game Engine for JavaScript and TypeScript.
url: components
---

# Components

Components are the building blocks of game objects. They define the behavior of
the object, like how it moves, how it looks, and how it interacts with other
objects.

This guide covers:

- Component & Tags system, what they are and how they work
- The [`GameObjRaw.use()` method](/doc/GameObjRaw/#GameObjRaw-use)
- The [`GameObjRaw.c()` method](/doc/GameObjRaw/#GameObjRaw-c)
- The [`GameObjRaw.is()` method](/doc/GameObjRaw/#GameObjRaw-is)

The components system of KAPLAY (the `C` of ECS) is powerful and flexible.

## What is a Component?

A component is a piece of code that defines a specific behavior of a game
object. It usually return a set of **properties** and **methods** that are
attached to the game object.

For example, the [`pos()`](/doc/ctx/pos) component returns the `pos` property
and the `move()` method:

```js
const player = add([
    pos(80, 80),
]);

player.move(100, 0); // move the player 100 pixels to the right, this is a method
console.log(player.pos); // { x: 180, y: 80 }, this is a property
```

There are a lot of useful components in KAPLAY like:

- [`sprite()`](/doc/ctx/sprite) for rendering images
- [`area()`](/doc/ctx/area) for collision detection, with methods like
  [`onCollide()`](/doc/AreaComp#AreaComp-onCollide)
- [`rect()`](/doc/ctx/rect) for rendering rectangles
- [`text()`](/doc/ctx/text) for rendering text
- [`scale()`](/doc/ctx/scale) for scaling the game object

You can see all the components in the [API Reference](/doc/ctx/pos).

## What is a tag?

Tags are names, labels or keywords that group game objects, such as enemies,
friends, etc.

For example, these objects could be tagged as an enemy:

```js
const ghosty = add([
    sprite("ghosty"),
    "enemy",
]);

const bobo = add([
    sprite("bobo"),
    "enemy",
]);
```

There are many functions that use tags.

For example [`get()`](/doc/ctx/get), to _get_ all game objects with a certain
tag:

```js
const enemies = get("enemy"); // ghosty and bobo
```

## Adding Components and tags

To assign a component or tag to an object, we usually do it on the object's
creation.

For example, in a **player** game object, we can assign a `sprite()` component
and the `friend` tag:

```js
loadSprite("butterfly", "sprites/butterfly.png");

const player = add([
    sprite("butterfly"),
    "friend",
]);
```

## Dynamic Components and tags

Usually, you want to assign a component in real time, for example, when the
player picks up a power-up.

You can use the [`GameObjRaw.use()`](/doc/GameObjRaw#GameObjRaw-use) method,
passing the component or tag you want to assign.

For example, to change the sprite of the player to a big butterfly and add the
`big` tag:

```js
const player = add([
    // original sprite
    sprite("butterfly"),
    pos(80, 80),
    "normal",
]);

// new sprite
player.use(sprite("big-butterfly"));
// new tag
player.use("big");
```

Use is a **use**ful method, but what if you want to remove a component/tag? You
can use the `GameObjRaw.unuse()` method, passing the component id or tag name.

```js
player.unuse("sprite"); // removes the sprite component
player.unuse("big"); // removes the big tag
```

## Getting Components

When you assign a component, the game object will be updated with new
**methods** and **properties** that are specific to that component.

For example, when you assign a `pos()`, you can access the `pos` property of the
game object. But also the methods of `move()` or `moveTo()`.

```js
const player = add([
    sprite("butterfly"),
    pos(80, 80),
]);

// -100 pixels on every second with the left key pressed
onKeyDown("left", () => {
    // move() method is available because player has a pos() component
    player.move(-100, 0);
});
```

### `c()` method

You can also access specifically to a component state using the `c()` method.

```js
const player = add([
    pos(80, 80),
    scale(2),
]);

console.log(player.c("pos")); // all related state to pos()
```

## Getting Tags

You can check if a game object has a tag using the `is()` method.

```js
if (player.is("enemy")) {
    debug.log("It is an enemy!");
}
```

This function also works with components, passing the id (the name) of the
component.

```js
// check if it has a sprite component or a rect component
if (player.is("sprite") || player.is("rect")) {
    debug.log("It is visible!");
}
```

## Making your own components

There's a guide about how to create your own components in KAPLAY. You can check
it [here](/guides/custom_components/).
