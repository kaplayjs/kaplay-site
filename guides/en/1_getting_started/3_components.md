---
title: Components
description: Learn how to create and use components in KAPLAY, the HTML5 Game Engine for JavaScript and TypeScript.
url: components
---

# Components

As we said, components are the building blocks of game objects. They define the
behavior of the object, like how it moves, how it looks, and how it interacts
with other objects.

This guide covers:

- Component & Tags system, what they are and how they work
- The [`GameObjRaw.use()` method](/doc/GameObjRaw/#GameObjRaw-use)
- The [`GameObjRaw.c()` method](/doc/GameObjRaw/#GameObjRaw-c)
- The [`GameObjRaw.is()` method](/doc/GameObjRaw/#GameObjRaw-is)

The components system of KAPLAY (the `C` of ECS) is powerful and flexible.

## What is a Component?

A component is a piece of code that defines a specific behavior of a game
object. It can return a set of properties and methods that are attached to the
game object.

For example, the `pos()` component returns the `pos` property and the `move()`
method.

```js
const player = add([
    pos(80, 80),
]);

player.move(100, 0); // move the player 100 pixels to the right
console.log(player.pos); // { x: 180, y: 80 }
```

## Using Components

To assign a component to a game object, we usually do it on the initialization
time of the object. For example, in a **Butterfly** game object, we can assign a
`sprite()` component.

```js
loadSprite("butterfly", "sprites/butterfly.png");

const player = add([
    sprite("butterfly"),
]);
```

### Dynamic Components

Usually, you want to assign a component in real time, for example, when the
player picks up a power-up. You can use the `GameObjRaw.use()` method

```js
const player = add([
    // original sprite
    sprite("butterfly"),
    pos(80, 80),
]);

// new sprite
player.use(sprite("big-butterfly"));
```

Use is a **use**ful method, but what if you want to remove a component? You can
use the `GameObjRaw.unuse()` method, passing the component id (the name):

```js
player.unuse("sprite");
```

## Getting Components

When you assign a component, the game object will be updated with new methods
and properties that are specific to that component.

For example, when you assign a `pos()`, you can access the `pos` property of the
game object. But also the methods of `move()` and `scale()`.

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

## Tags

Tags are a special kind of component that are used to identify groups of game
objects, like the player, the enemies, the bullets, etc. In fact, all components
are tags too, for example, the `sprite()` component is a `sprite` tag.

To create a tag, you only have to pass a string to the `add()` method.

```js
const enemy = add([
    sprite("bee"),
    area(),
    "enemy",
]);
```

There's many functions that uses tags, for example `onClick()` to detect clicks
on game objects with an `area()` component.

```js
onClick("enemy", (enemy) => {
    destroy(enemy);
});
```

### Getting Tags

You can also check if a game object has a tag using the `is()` method.

```js
if (player.is("enemy")) {
    // do something
}
```

This function also works with components.

```js
if (player.is("sprite")) {
    // do something
}
```

## Making your own components

There's a guide about how to create your own components in KAPLAY. You can check
it [here](/guides/custom_components/).
