---
title: Components
description: All about how components works in KAPLAY
order: 3
---

# Components

As we said, components are the building blocks of game objects. They define the
behavior of the object, like how it moves, how it looks, and how it interacts
with other objects.

The components system of KAPLAY (the `C` of ECS) is powerful and flexible.

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

Usually, you want to assing a component in real time, for example, when the
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
use the `GameObjRaw.unuse()` method.

```js
player.unuse(sprite());
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

// -100 pixeles on every second with the left key pressed
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
const enemey = add([
    sprite("bee"),
    "enemy",
]);
```

There's many functions that uses tags, for example `onClick()` to detect clicks
on game objects.

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
