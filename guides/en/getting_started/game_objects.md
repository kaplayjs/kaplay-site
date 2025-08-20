---
title: Game Objects
description:
    How to create and manipulate game objects in KAPLAY, the HTML5 Game Engine
    for JavaScript and TypeScript.
url: game_objects
image: "./assets/tree.png"
order: "basics-2"
---

# Game Objects

Game objects are the entity unit of KAPLAY. They are the actors of your game,
the entities that move, interact, and make the game interesting.

## Creating Game Objects

We create game objects with the `add()` function. It creates the object and
attaches it to the scene. It receives **components** and **tags**.

```js
const dinosaur = add([
    // while components give different behaviors to the game obj
    rect(32, 32), // draw a rect
    pos(80, 80), // set a position
    // tags classify the game object
    "dangerous",
    "big",
]);
```

We will look in depth at components and tags in their respective guides.

## Parents, children, and root

A game object can have child game objects. This will give to the children the
possibility of following the parent's position, rotation and scale.

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
// Get a list with all game objects
get("*");

// Get a list of friends tagged objects and iterate over them
get("friends").forEach((friend) => {
    // do something with each friend
});
```

### How to add a child

```js
const bag = add([
    sprite("bag"),
]);

// It adds a mini-bag to bag
const miniBag = bag.add([
    sprite("minibag"),
]);

// Now our original Bag is a grandfather...
const superMiniBag = miniBag.add([
    sprite("superminibag"),
    "favorite", // ...And the favorite
]);
```

### How to remove a child

```js
// We pass the game object reference
bag.remove(miniBag); // 18, independency
```

### How to get children

```js
bag.get("*"); // all children
bag.get("favorite", { recursive: true }); // [superMiniBag] - all descendants with tag favorite
```

You can see the full list of operations in the `GameObjRaw` type definition.

## Creating game object dynamically

One way for create a game object dynamically is creating a function that returns
a list of components:

```js
function makeCakeComps() {
    return [
        rect(6, 18),
        pos(80, 80),
        color(0.5, 0.5, 1),
    ];
}

const cake = add(makeCakeComps());
```

Another option is return an object with `add()`, and then add it.

```js
function addFriend(spr) {
    const posX = rand(0, width()); // Random position between 0 and width
    const posY = rand(0, height()); // Random position between 0 and height

    const obj = add([
        pos(posX, posY),
    ]);

    // If we pass a sprite, we use it
    if (spr) {
        obj.use(sprite(spr));
    } // If not, we use a circle
    else {
        obj.use(circle(16));
    }

    return obj; // IMPORTANT: Return the object reference
}

const beanFriend = addFriend("bean"); // A Sprite
const circledFriend = addFriend(); // A Circled
```
