---
title: Fake Mouse API
description:
    Learn how to make a fake mouse with support to gamepad and keyboard.
url: fake_mouse
version: "4000"
---

# Fake mouse

Sometimes you want your game using a fake mouse in game-pad devices (i.e:
Ultimate Chicken Horse), you want to use a Game Object as a cursor. There's a
special component for it, `fakeMouse`.

Using a game object as a mouse has many advantages like use shaders, transform,
rotation or even physics if you want, the possibilities are infinite.

## `fakeMouse` component

The `fakeMouse` component actives the behaviors of events like `onHover` and
`onClick` and them listen for this object too. It creates a virtual mouse that
is connected with the physical one.

The default behavior is that the fakeMouse moves when the mouse is moved. This
allow the user change between mouse and keys/gamepad cursor. The behavior can be
disabled passing `followMouse: false` to the comp options.

```js
loadSprite("cursor", "cursor.png");

const cursor = add([
    sprite("cursor"), // sprite
    fakeMouse({
        followMouse: true, // disable if you want
    }),
]);
```

Now, you need to bind `FakeCursorComp.press()` and `FakeCursorComp.release()` to
a key. It can be a keyboard click for example:

```js
cursor.onKeyPress("f", () => {
    cursor.press();
});

cursor.onKeyRelease("f", () => {
    cursor.release();
});
```

Now our mouse will also trigger `click` events.

## Moving the mouse

Now you can move the cursor as you want, usually you would use keys or a gamepad
stick. Here's an example of moving it with arrows:

```js
cursor.onKeyDown("left", () => {
    cursor.move(-MOUSE_VEL, 0);
});

cursor.onKeyDown("right", () => {
    cursor.move(MOUSE_VEL, 0);
});

cursor.onKeyDown("up", () => {
    cursor.move(0, -MOUSE_VEL);
});

cursor.onKeyDown("down", () => {
    cursor.move(0, MOUSE_VEL);
});
```

You can see an example of how it works in the
[KAPLAYGROUND](https://play.kaplayjs.com?example=fakeMouse)
