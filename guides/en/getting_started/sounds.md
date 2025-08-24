---
title: Sounds
description:
    How to play music, audio, and sounds in KAPLAY, the HTML5 game library for
    JavaScript and Typescript.
url: audio
order: "basics-8"
---

# Sounds

In KAPLAY, you can easily add sound effects and background music to your game.

## Loading sounds

For load audio files, you can use the `loadSound()` function. This function
takes two parameters, the sound name and the sound path.

```js
kaplay();

loadSound("soundName", "/path/to/sound.mp3");
```

## Playing sounds

Use `play(sound, opt?)` to play an audio. It takes the name
of the sound and, optionally, an `AudioPlayOpt` options object. It will return an `AudioPlay`.

```js
const burpSnd = play("burp", {
    volume: 0.5, // set the volume to 50%
    speed: 1.5, // speed up the sound
    loop: true, // loop the sound
});
```

## Controlling audio

To stop, seek or modify playing sounds you can use the `AudioPlay` object, returned
by `play()`.

```js
const sound = play("soundName");

// pause the song
sound.pause();
```
