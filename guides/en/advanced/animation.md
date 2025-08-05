---
title: Animation
description: Learn how to animate in KAPLAY.
url: animation
---

# Basics

Every animation in KAPLAY is basically a handler attached to onUpdate, changing
values according to the elapsed time, dt(). So we could animate our position by
doing the following

```js
kaplay();

loadSprite("bean", "sprites/bean.png");

const obj = add([
    pos(50, 50),
    sprite("bean"),
    {
        time: 0,
    },
]);

obj.onUpdate(() => {
    obj.time += dt();
    const t = (obj.time % 5) / 5;
    obj.pos = lerp(vec2(50, 50), vec2(100, 50), t);
});
```

This will loop an animation with a duration of 5 seconds of the object moving
between two points. The lerp function linearly interpolates between two values.
This means that it follows the line between the two values at constant speed.
While everything can be animated using such an onUpdate handler, there are some
components which make this easier.

# Tween

Tweening is basically a linear interpolation happening during a specific time
interval. The tween function in the timer component is one of the earliest
general animation functions. It is limited to animating between two values, and
needs a function parameter which sets the value. This makes it a bit dangerous
since you can animate a value which is not on the object you call tween on. If
the object gets destroyed before the tween ends, your application may crash. It
is advised to not use the global tween function for this reason, but use the
local one on the object, and only change properties of said object.

```js
kaplay();

loadSprite("bean", "sprites/bean.png");

const obj = add([pos(50, 50), sprite("bean"), timer()]);

obj.tween(vec2(50, 50), vec2(100, 50), 5, (value) => (obj.pos = value));
```

# Animate

Animate is the newer animation function. It has more functionality, yet is more
lightweight since you can animate more than one property, and you don't need to
chain if you need more than two interpolation values. Animate works with
keyframes. A simple animation of one property similar to the tween above would
be

```js
kaplay();

loadSprite("bean", "sprites/bean.png");

const obj = add([pos(50, 50), sprite("bean"), animate()]);

obj.animate("pos", [vec2(50, 50), vec2(100, 50)], { duration: 2 });
```

This animates the position from 50,50 to 150,100 during 2 seconds. As said
before, we can also use more than two points, for example

```js
obj.animate("pos", [vec2(50, 50), vec2(100, 50), vec2(100, 150)], {
    duration: 4,
});
```

By default, the time is divided by all keyframes. Thus it takes 2 seconds
between the first and second, as well as two seconds between the second and
third keyframe. This means that the speed will be faster in the last part, since
it is doing double the distance in the same time span. We can change this by
giving it a timing parameter which gives a percentage value of where each
keyframe is situated in time (the reason why it doesn't use timestamps directly
is because it makes it easier to change the duration of the animation without
having to change all the timing values)

```js
obj.animate("pos", [vec2(50, 50), vec2(100, 50), vec2(100, 150)], {
    duration: 3,
    timing: [0, 1 / 3, 1],
});
```

Now the first part takes one third of the time, 1 second, and the second part
takes 2 thirds of the time, or 2 seconds. So the speed stays the same. Like
tween we can use easing. Either on the entire animation, or each individual
segment. We can also alter the animation direction. For example reverse or
ping-pong the animation, as well as set the maximum amount of loops.

```js
obj.animate("pos", [vec2(50, 50), vec2(100, 50), vec2(100, 150)], {
    duration: 3,
    timing: [0, 1 / 3, 1],
    direction: "ping-pong",
    loops: 4,
});
```

We can indicate how we want the values interpolated, linear or following a
spline. Or no interpolation ("none"), when we want to animate a sprite's frame
for example

```js
obj.animate("pos", [vec2(50, 50), vec2(100, 50), vec2(100, 150)], {
    duration: 3,
    timing: [0, 1 / 3, 1],
    interpolation: "spline",
});
```

We can make the object rotate according to its motion by setting the
followMotion option to true. Beware that the object requires a rotate component
for this to work. If we want to assign the same animation to different objects,
we can choose the animation to be relative. This makes the animation mix the
initial state with the animation state.

```js
const obj = add([
    sprite("bean"),
    pos(150, 0),
    anchor("center"),
    animate({ relative: true }),
]);
```

If you want to change the animation for a property that you have animated before, 
like when you're doing a fade-in/fade-out animation for example, you need to use `unanimate` or `unanimateAll`. 
You also need to reset the animation playback by calling `animation.seek(0)`.

```js
obj.animate('opacity', [0, 1], {duration: 1, loops: 1});
// then somewhere later
obj.unanimate('opacity');
obj.animation.seek(0);
obj.animate('opacity', [1, 0], {duration: 1, loops: 1});
```
