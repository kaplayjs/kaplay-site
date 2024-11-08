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
object. It usually returns a set of **properties** and **methods** that are
attached to the game object.

For example, the [`pos()`](/doc/ctx/pos) component gives the object the `pos` property
and the `move()` method:

```js
const player = add([
    pos(80, 80),
]);

player.move(100, 0); // move the player 100 pixels to the right, this is a method
console.log(player.pos); // { x: 180, y: 80 }, this is a property
```

There are a lot of useful components in KAPLAY like:

- [`sprite()`](/doc/ctx/sprite) to make the object draw an image, and play animations
- [`area()`](/doc/ctx/area) to make the object do collision detection, with methods like
  [`onCollide()`](/doc/AreaComp#AreaComp-onCollide)
- [`rect()`](/doc/ctx/rect) to make the object draw a simple rectangle shape
- [`text()`](/doc/ctx/text) to make the object draw text
- [`scale()`](/doc/ctx/scale) to make the game object bigger or smaller or to stretch it

You can see all the components in the [API Reference](/doc/ctx/pos).

## What is a tag?

Tags are names, labels or keywords that group game objects, such as enemies,
friends, trees, etc. They are useful for classifying different types of objects,
or adding transient states that make other objects respond differently.

If you pass a string in the array to `add()`, KAPLAY will automatically
convert it into a component with the name of the tag but no properties and no
methods, which is how tags are implemented internally.

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

There are many functions that look at tags.

The simplest one is [`get()`](/doc/ctx/get), which *get*s all the game objects with a certain tag:

```js
const enemies = get("enemy"); // ghosty and bobo
```

## Adding Components and tags

In most cases components and tags are just added once, when the object is created, by
passing them to `add()`.

For example, when creating the `player` game object, we can give it a `sprite()` component
and the `friend` tag:

```js
loadSprite("butterfly", "sprites/butterfly.png");

const player = add([
    sprite("butterfly"),
    "friend",
]);
```

## Dynamic Components and tags

You might need to give an existing object a new component or tag in
real time while the game is running.
For example, when the player picks up a power-up, add a "super" tag,
and then remove it some time later.

To add a component or tag to an existing object, use the [`GameObjRaw.use()`](/doc/GameObjRaw#GameObjRaw-use)
method, passing the component or tag you want to assign.

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

<!-- *(Aside: the `.use()` method is actually how `add()` creates the object internally. It initializes an empty `GameObj` and then calls `.use()` on all of the components and tags passed in. Don't just take my word for it, [look at the code!](https://github.com/kaplayjs/kaplay/blob/b57385be0f33b89db79ced6a4967d219d240f523/src/game/make.ts#L624-L626))* 

XXX: there's probably a better place for this note

-->


`use()` is a **use**ful method, but what if you want to remove a component or tag? You
can use the `GameObjRaw.unuse()` method, passing the component id or tag name. <!-- Do note that you can't pass the component itself to `unuse()`, you have to pass the component *name*! -->

```js
player.unuse("sprite"); // removes the sprite component
player.unuse("big"); // removes the big tag
```

## Getting Components

When you add a component to a game object, the object will be updated in-place with the new
**methods** and **properties** that are provided by that component.

For example, when you add a `pos()`, you can access the `pos` property of the
game object, as well as the methods `move()` or `moveTo()`.

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

You can also access a specific component's state properties using the `c()` method.

```js
const player = add([
    pos(80, 80),
    scale(2),
]);

console.log(player.c("pos")); // all the state exclusive to the pos() component
```

<!-- Note that if a component stores state in a function closure and doesn't expose it as a property or method,
you still won't be able to access it this way. ¯\\\_(ツ)\_/¯
(It's a limitation of Javascript, unfortunately. KAPLAY will never be able to get around this.)

XXX: where does this note belong?

-->

## Getting Tags

You can check if a game object has a tag using the `is()` method.

```js
if (player.is("enemy")) {
    debug.log("EXTERMINATE! EXTERMINATE!");
}
```

This function also works with components, passing the id (the name) of the
component.

```js
// check if it has a sprite component or a rect component
if (player.is("sprite") || player.is("rect")) {
    debug.log("I can see you!");
}
```

## Making your own components

If you are creating a larger game (more than one file), it's probably a good idea to
bundle some of your game's functionality into custom components. You can check
out how to do that in [this guide](/guides/custom_components/).
