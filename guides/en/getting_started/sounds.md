---
title: Sounds
description:
    How to play music, audio, and sounds in KAPLAY, the HTML5 game library for
    JavaScript and Typescript.
url: audio
order: "basics-8"
---

# Playing sounds

In KAPLAY, you can easily add background music and sound effects to your game.
You can play music, audios and sounds using the `play()` function.

## Loading sounds

For load audio files, you can use the `loadSound()` function. This function
takes two parameters, the sound name and the sound path.

```js
kaplay();

loadSound("soundName", "/path/to/sound.mp3");
```

## Playing sounds

You can play sounds using the [`play()`](. The `play()` function takes the name
of the sound, and some options proper of the [AudioPlayOpt](/doc/AudioPlayOpt/)
interface.

```js
play("soundName", {
    volume: 0.5, // set the volume to 50%
    speed: 1.5, // speed up the sound
    loop: true, // loop the sound
});
```

## Stopping sounds

All `play()` returns an [AudioPlay](/doc/AudioPlay/) object that you can use to
stop the sound.

```js
const sound = play("soundName");
sound.stop();
```
