---
title: Data between scenes
description: How to pass data between scenes in KAPLAY
order: 5
---

# Passing data between scenes

In KAPLAY, you can pass and get data between scenes, imagine you have a game
scene.

```js
scene("game", () => {
    let score = 0;

    add([
        text(score),
        pos(12, 12),
    ]);

    onKeyPress("space", () => {
        score++;
    });

    // go to the next scene on 2 seconds
    wait(2, () => {
        go("gameover");
    });
});

scene("gameover", () => {
    add([
        text(`Game Over! Your score: `),
        pos(12, 12),
    ]);
});
```

Now we need to pass the score to the `gameover` scene, we can do this with the
following code:

```js
go("gameover", score);
```

With that we are passing the score to the `gameover` scene, now we need to get
that score, for that you will use the callback parameters of the `scene()`
function.

```js
// [!code word:(score)]
scene("gameover", (score) => {
    add([
        text(`Game Over! Your score: ${score}`);
        pos(12, 12),
    ]);
});
```

Now you can use the `score` variable in the `gameover` scene.

## Other ways

You can also pass many arguments

```js
go("gameover", score, time, player);

scene("gameover", (score, time, player) => {
    // do something with the arguments
});
```

Or pass an object

```js
go("gameover", {
    score: score,
    time: time,
    player: player,
});

scene("gameover", (data) => {
    // do something with the data
    add([
        text(`Game Over! Your score: ${data.score}`);
        pos(12, 12),
    ]);
});
```
