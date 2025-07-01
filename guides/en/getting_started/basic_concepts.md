---
title: Basic Concepts
description:
    Learn about the basics of KAPLAY, the HTML5 Game Engine for JavaScript and
    TypeScript.
url: starting
image: "./assets/theater.png"
order: "basics-1"
---

# Basic Concepts

To get started with KAPLAY, you must know 4 main concepts: **Scenes**, **Game
Objects**, **Components** and **Events**.

You can think of your game as a _theater_: scenes are the acts, game objects are
the actors, and components are the script the actors follow:

![alt text](./assets/theater.png)

## Initialization

All KAPLAY games start with the `kaplay()` function. This function makes
available all methods and functions that you will use to create your game.

```js
kaplay();
```

You can also pass an object with options:

```js
kaplay({
    width: 640,
    height: 480,
    background: "#00ff00",
    scale: 2,
    canvas: document.getElementById("canvas"),
    // other options...
});
```

You can find all options in the [**KAPLAYOpt**](/doc/KAPLAYOpt) type definition.

## Game Objects

The **game object** is the basic unit of KAPLAY. The player, a butterfly, a
tree, or even a piece of text are all game objects. They are our actors. They
move, interact, and make the game interesting.

You can create objects with the `add()` function, which takes an array of
**components** that define the object's behavior (your actor's "script").

```js
kaplay(); // remember to initialize the game

const obj = add([
    // this is a component that draws a rectangle
    rect(32, 32),
]);
```

## Components

Components are the building blocks of game objects. They define the behavior of
the object, like how it moves, looks, and interacts with other objects.

In KAPLAY, there are many built-in components that you can use to create your
game objects. For example:

- `pos(x, y)` sets the position of the object.
- `rect(width, height)` draws a rectangle.
- `color(r, g, b)` sets the color of the object.

We will go in depth on components in the [**Components**](/guides/components)
guide.

## Scenes

Scenes are what wrap the game objects -- the acts of the stageplay. Typical
scenes might include a main menu, the game itself, and a game over screen.

In KAPLAY, you create scenes with the `scene()` function:

```js
kaplay(); // remember to initialize the game

scene("game", () => {
    const rect = add([
        // a component
        rect(32, 32),
    ]);
});
```

## Events

Events are specific moments of your game execution that you can handle and
execute code when that happens.

```js
onUpdate(() => {
    // this code is executed every frame (normally 60 times per second)
});

onKeyPress("space", () => {
    // this code is executed only when the space key is pressed
});
```

We go in depth with events on the [**Events guide**](/guides/events) guide.
