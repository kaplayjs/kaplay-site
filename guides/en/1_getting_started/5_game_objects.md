---
title: Game Objects
description:
    How to create and manipulate game objects in KAPLAY, the HTML5 Game Engine
    for JavaScript and TypeScript.
url: game_objects
image: "./assets/tree.png"
---

# Game Objects

Game objects are the entity unit of KAPLAY. They are the actors of your game,
the entities that move, interact, and make the game interesting.

## Creating Game Objects

We create game objects with the `add()` function. It creates the object and
attach it to the scene.

```js
const player = add([
    rect(32, 32),
    pos(80, 80),
]);
```

## Parents, childs and root

A game object can have child game objects. This will give to the children the
possibility of follow parent's position, rotation and scale.

```js
const player = add([
    rect(32, 32),
    pos(80, 80),
]);

const head = player.add([
    circle(16),
    pos(0, -16), // relative to player position
]);
```

**Every game object** is a child of the **root game object**. The root game
object is the game object that contains all the game objects in the scene.

![Game Object tree](./assets/tree.png)

That's why the `add()` function is, in fact, a `GameObjRaw.add()` method.

## Game Objects operations

### How to create a game object

```js
const bag = add([
    sprite("bag"),
]);
```

### How to remove a game object

```js
// you can use .destroy() method or the destroy() function
bag.destroy();
destroy(bag);
```

### How to get all game objects

```js
// get a list with all game objects
get("*");
// get a list of friends objects
get("friends");
```

### How to add a child

```js
// It adds a mini-bag to bag
const miniBag = bag.add([
    sprite("minibag"),
]);

const superMiniBag = bag.add([
    sprite("superminibag"),
    "favorite", // is the favorite
]);
```

### How to remove a child

```js
// We pass the game object reference
bag.remove(miniBag); // 18, independency
```

### How to get childs

```js
bag.get("*"); // all children
bag.get("favorite"); // [superMiniBag] - all children with tag favorite
```

You can see the full list of operations in the [`GameObjRaw`](/doc/GameObjRaw)
documentation.

## The `make()` function

`make()` is used for creating a game object without adding it to the scene.

```js
// Same syntax as add()
const bean = make([
    sprite("bean"),
    rotate(0),
]);

// No bean appears, but we can modify it
bean.angle = 270;

// Now make bean appears!
add(bean); // ohhi
```

## Creating game object dynamically

One way for create a game object is create a function that returns a list of
components:

```js
function createBullet() {
    return [
        rect(6, 18),
        pos(80, 80),
        color(0.5, 0.5, 1),
    ];
}

const bullet1 = add(createBullet());
```

Another option is return an object with `make()`, and then add it.

```js
function createBullet(spr) {
    const obj = make([
        pos(80, 80),
        color(0.5, 0.5, 1),
    ]);

    // we use a sprite if passed, if not a rect
    if (spr) {
        obj.use(sprite(spr));
    }
    else {
        obj.use(rect(6, 18));
    }

    return obj; // IMPORTANT: return the object reference
}

const bullet2 = add(createBullet("bullet")); // sprite
const bullet3 = add(createBullet()); // a rect
```
