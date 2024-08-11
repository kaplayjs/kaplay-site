---
title: Basic Concepts
description: Learn about the basics of KAPLAY.
order: 2
---

# Basic Concepts

KAPLAY is a game library that makes it easy to create games in JavaScript. This
is done with three main concepts: **Scenes**, **Game Objects**, and
**Components**.

You can think of your game as a theater -- scenes are the acts, game objects are
the actors and components are the script the actors follow.

![alt text](assets/theater.png)

## Initialization

All KAPLAY games start with the `kaplay()` function. This function makes available
all methods and functions that you will use to create your game.

```js
kaplay();
```

## Game Objects

The **game object** is the basic unit of KAPLAY. The player, a butterfly, a
tree, or even a piece of text are all game objects.

Going back to our theater metaphor, the game objects are our actors -- things
that move, interact, and make the game interesting.

In KAPLAY, you create objects with the `add()` function, which takes an array of
**components** that define the object's behavior (your actor's "script").

```js
kaplay(); // remember to initialize the game

add([
    // this is a component
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

## Scenes

Scenes are what wrap the game objects -- the acts of the stageplay. Typical
scenes might include a main menu, the game itself, and a game over screen.

In KAPLAY, you create scenes with the `scene()` function:

```js
kaplay(); // remember to initialize the game

scene("game", () => {
    add([
        // a component
        rect(32, 32),
    ]);
});
```
