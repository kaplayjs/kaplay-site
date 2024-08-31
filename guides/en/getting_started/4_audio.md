---
title: Sounds
description: How to play music, audios and sounds in KAPLAY, the HTML5 Game Engine.
order: 4
url: audio
---

# Playing sounds in KAPLAY

In KAPLAY, you can easily add background music and sound effects to your game.
You can play music, audios and sounds using the `play()` function.

## Loading sounds

All audsoundio files must be loaded before they can be played. You can load
audio files using the `loadSound()` function. Supported `mp3`, `ogg`, `wav`, and
formats supported by the browser.

```js
kaplay();

loadSound("soundName", "/path/to/sound.mp3");
```

## Playing sounds

You can play sounds using the [`play()`](https://kaplayjs.com/doc/play/)
function. The `play()` function takes the name of the sound, and some options
proper of [AudioPlayOpt](https://kaplayjs.com/doc/AudioPlayOpt/) interface.

```js
play("soundName", {
    volume: 0.5, // set the volume to 50%
    speed: 1.5, // speed up the sound
    loop: true, // loop the sound
});
```

## Stopping sounds

All `play()` returns an [AudioPlay](https://kaplayjs.com/doc/AudioPlay/) object
that you can use to stop the sound.

```js
const sound = play("soundName");
sound.stop();
```
