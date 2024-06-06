---
category: Getting Started
title: Basic Concepts
description: Learn about the basics of KAPLAY.
order: 2
---

# Basic Concepts

As we said, KAPLAY is a game library that makes it easy to create games in
JavaScript. For that, we have three main concepts: Scenes, Game Objects,
and Components.

We can think games as a theater, where scenes are the acts, game objects are the actors and components are the script that the actors follow.

![alt text](assets/theater.png)

## Initialization

All KAPLAY games start with the `kaplay()` function. This function also
make avaible all methods and functions that you will use to create your game.

```js
kaplay();
```

## Game Objects

An object (aka Game Object) is the basic unit of KAPLAY. The player, a
butterfly, a tree, or even a piece of text.

If a game is a theater, then objects are the actors. They are the things that
move, interact, and make the game interesting.

In KAPLAY, you can create objects with the `add()` function, it takes an array
of **components** that define the object's behavior ("the script of your actor").

```js
kaplay(); // remember to initialize the game

add([
    // this is a component
    rect(32, 32),
]);
```

## Components

Components are the building blocks of game objects. They define the behavior of
the object, like how it moves, how it looks, and how it interacts with other
objects.

In KAPLAY, there's many built-in components that you can use to create your game
objects.

- `pos(x, y)`: Set the position of the object.
- `rect(width, height)`: Draw a rectangle.
- `color(r, g, b)`: Set the color of the object.

## Scenes

Scenes are what wrap the game objects. They are the acts of the theater. For
example, normally you have a scene for the main menu, another for the game
itself, and another for the game over screen.

In KAPLAY, you can create scenes with the `scene()` function:

```js
kaplay(); // remember to initialize the game

scene("game", () => {
    add([
        // a component
        rect(32, 32),
    ]);
});
```
