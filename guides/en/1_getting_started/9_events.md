---
title: Events
description:
    Learn how to manage events in KAPLAY, the HTML5 Game Engine for JavaScript and TypeScript.
url: events
---

# Events
Events are all the different actions that might happen in your game. If the user clicks? That's an event. Beans collided? That's an event.

These are very helpful when you want to run something strictly once when a certain condition is met, you could achieve this with some weird logic! Maybe something like this?
```js
let hasHovered = false
onUpdate(() => {
	if (bean.isHovering() && !hasHovered) {
		hasHovered = true // This prevents this scope to run more than once
		debug.log("Bean has been hovered!")
	}
})
```
This works! But it's not exactly the best way to do it, since KAPLAY provides us the [`onHover()`](/doc/ctx/onHover) event, which will take care of all the condition for you! It would look like this:

```js
bean.onHover(() => {
	debug.log("Bean has been hovered")
})
```
Much nicer isn't it? 

## What events are there?
The most important event of all is [`onUpdate()`](/doc/ctx/onUpdate), which will run infinitely every frame. If you do something like this
```js
onUpdate(() => {
	bean.move(RIGHT, 0)	
})
```
This will move your bean object infinetely to the right!

If you want to detect when the user clicks, you can use the [`onClick()`](/doc/ctx/onClick) event, you might wanna spawn something everytime the player clicks. Like this!
```js
let lastMousePos = vec2();
onClick(() => {
	lastMousePos = mousePos();
	debug.log("The user just clicked at: " + lastMousePos);
})
```

Or let's say you have a player object and you want to run something when it collides with an object tagged as an enemy! You'd have to use the [`onCollide()`](/doc/ctx/onCollide) event. You could do it like so:
```js
player.onCollide("enemy", () => {
	// hurts so much
	play("ow");
	player.hurt(5);
})
```

If you ever need to do something related to managing the certain behaviour of objects, you can work with any of these events!
* [`onAdd()`](/doc/ctx/onAdd) For running something on an object with a certain tag being added.
* [`onDestroy()`](/doc/ctx/onDestroy) For running something on an object with a certain tag being destroyed.
* [`onUpdate()`](/doc/ctx/onUpdate) For running something infinitely.
* [`onDraw()`](/doc/ctx/onDraw) For custom drawing of elements.

Or if you need to detect keyboard/mouse input from the player, you can work with any of these events!
* [`onMousePress()`](/doc/ctx/onMousePress) For more options when detecting mouse input.
* [`onKeyPress()`](/doc/ctx/onKeyPress) For detecting keyboard input on a single key.
* [`onCharInput()`](/doc/ctx/onCharInput) For detecting keyboard input of any key.
* [`onScroll()`](/doc/ctx/onScroll) For detecting mouse wheel scrolling input.

Some of them even have their [`onUpdate()`](/doc/ctx/onUpdate) equivalents! Such as [`onKeyPress()`](/doc/ctx/onKeyPress) being able to be used on an onUpdate event as conditional, for example:
```js
onUpdate(() => {
	if (isKeyPressed("w")) {
		debug.log("Player just pressed the W key")
	}
})
```

## Making your own events
You can always detect and trigger custom events in your objects using the [`on()`](/doc/ctx/on) and [`trigger()`](/doc/ctx/trigger) functions, you can do something like this:

```js
onClick(() => {
	player.trigger("happy")
})

player.on("happy", () => {
	player.smile()
})
```

You can also pass custom data in these! Like this:

```js
player.trigger("hungry", 5) // triggers hungry and passes 5 as a 'hungriness' value

player.on("hungry", (hungriness) => {
	if (hungriness < 10) {
		debug.log("I'll eat later")
	}

	else {
		debug.log("I must eat now!")
	}
})
```

## How to remove them
All the onXYZ functions (basically, all events) return a [`KEventController`](/doc/KEventController/) object, which gives you access to the `paused` and `cancel()` properties, which allow you to momentarily or permanently stop a function.