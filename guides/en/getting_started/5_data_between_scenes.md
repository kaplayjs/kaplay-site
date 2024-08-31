---
title: Data between scenes
description: How to pass data between scenes in KAPLAY
order: 5
url: passing_data_in_scenes
---

# Passing data between scenes

In KAPLAY, you can pass and get data between scenes. Imagine you have a game
scene:

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

Now we need to pass the score to the `gameover` scene. We can do that with the
following code:

```js
go("gameover", score);
```

Now that we've passed the score to the `gameover` scene, we need to access it.
To do that, use the callback parameters of the `scene()` function:

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

You can also pass multiple arguments:

```js
go("gameover", score, time, player);

scene("gameover", (score, time, player) => {
    // do something with the arguments
});
```

Or pass an object:

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
