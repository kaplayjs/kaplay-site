---
title: Video
description:
  Learn how to load and play a video in KAPLAY, the HTML5 Game Library for
  JavaScript and TypeScript.
url: video
---

# Introduction

A video can be played using the video component. This can be used for intros, or cut-scenes for example.

# The video component

```ts
const intro = add([
  pos(200, 100), // Where to place the video
  video("intro.mp4"),
]);

intro.play();
```

# Play, pause, rewind

The video doesn't automatically start playing, for that `start()` needs to be called. To pause the video there is `pause()`. If you want stop functionality, you can call `pause()` and set `currentTime` to 0.

# Play position

The play position, aka `currentTime`, can be get and set. The relative position can be computed by dividing by `duration`.
