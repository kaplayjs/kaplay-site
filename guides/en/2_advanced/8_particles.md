---
title: Particles
description: Learn how to create particles in KAPLAY.
url: particles
---

# Introduction

In this guide we will learn how to use the [`particles()` component](/doc/ctx/particles)

The particles component is a very efficient way of display tons of visual feedback,
due to its optimized nature internally on KAPLAY.

## Creating a Particle Emitter

There are two parts to particles in KAPLAY, the particle emitter and the particles themselves. 
Both the particles and the particle emitter have options for us to modify, and come with important
features to affect how our particles will appear.

```js
let particleEmitter = add([
    pos(center()),
    particles({
        max: 20,
        speed: [50,50],
        lifeTime: [1, 2],
    }, {
        direction: 0,
        spread: 45,
    })
])
```

Above is what the general setup of a particle emitter should look like.. The first set of options is the 
`ParticlesOpt`, and the second set is the `EmitterOpt`. The `ParticlesOpt` is composed of options 
related  to what the particle will be doing after it is emitted, while the `EmitterOpt` is composed 
of options related to where, when, and what direction each particle will be emitted.

## Particle Textures in a Particle Emitter

Using a particle emitter requires us to use the texture and frames data of a sprite. There are multiple options
for how to access this, but the easiest is using the built-in `getSprite().data` function to generate our particles.
Below is an example on how to use textures for a particle emitter. *Don't forget to wait for your sprites to load!*

```js
// load the sprite, and wait for the sprite to fully load before making the particle emitter
// NOTE: this is the easiest way to ensure your a sprite has been loaded, but not the best
loadSprite("bean", "./sprites/bean.png").then((data) => {
    let loadedSpriteData = getSprite("bean").data;
    // Fun fact: the data parameter passed from the promise is the same as getSprite().data

    let particleEmitter = add([
        pos(center()),
        particles({
            max: 20,
            lifeTime: [1, 3],
            texture: loadedSpriteData.tex,  // texture of the sprite
            quads: loadedSpriteData.frames, // to tell whe emitter what frames of the sprite to use
        }, {
            direction: 0,
            spread: 45,
        })
    ])
})

```

## Using a Complete Particle Emitter

To spawn particles from the emitter, we can just use `particleEmitter.emit(n)`, where n is
the amount of particles we want to spawn.

```js
// Emit at runtime
particleEmitter.emit(5)

// Emit once a frame, good for prolonged effects
onUpdate(() => {
    particleEmitter.emit(1)
})

// Emit on event call, good for bursts of projectiles. (like an explosion)
on("randomEvent", () => {
    particleEmitter.emit(25)
})
```

Below is a complete example of how we should use the `particles()` component, 
along with explanations on each option in the options for `particles()`

```js
// load the sprite, and wait for the sprite to fully load before making the particle emitter
// NOTE: this is the easiest way to ensure your sprites have been loaded, but not the best
loadSprite("bean", "./sprites/bean.png").then((data) => {
    // Fun fact: the data parameter passed from the promise is the same as getSprite().data
    let loadedSpriteData = getSprite("bean").data;

    let particleEmitter = add([
        pos(center()),
        particles({
            max: 20,    // the max amount of particles generated from this emitter at one time
            lifeTime: [2, 5],   // how long the particles last before being destroyed
            speed: [50, 100],   // how fast the particles are moving
            acceleration: [vec2(0), vec2(0, -10)],  // changes the speed of the particle over its lifetime
            damping: [0, 0.5],  // slows down the particle over its lifetime
            angle: [0, 360],    // the rotation of each particle
            angularVelocity: [0, 100],   // how fast each particle should be rotating
            scales: [1.0, 0.5, 0.0],    // how large the particle is over its lifetime
            colors: [RED, GREEN, BLUE], // the color of the particle over its lifetime
            opacities: [1.0, 0.0],      // the opacity of the particle over its lifetime
            texture: loadedSpriteData.tex,  // texture of the sprite
            quads: loadedSpriteData.frames, // to tell whe emitter what frames of the sprite to use
        }, {
            shape: new Rect(vec2(0), 32, 32), // the area where particles should be emitted from (can be empty)
            lifetime: 5,    // how long the emitter should last
            rate: 5,        // the rate at which particles are emitted
            direction: 0,   // the direction where particles should be traveling
            spread: 45,     // variance in the direction where particles should be traveling
        })
    ])

    // .onEnd is called when the emitter's lifetime (in this example 5 seconds), has expired.
    particleEmitter.onEnd(() => {
        destroy(particleEmitter)
    })

    // Emit Particles at runtime
    particleEmitter.emit(5)

    // Wait 1 second, then emit more
    wait(1, () => {
        particleEmitter.emit(15)
    })
})
```