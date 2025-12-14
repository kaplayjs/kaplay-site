---
title: Picture
description: Learn how to use a picture in KAPLAY.
url: picture
---

# Picture API

Pictures contain drawing commands which can be replayed by drawing the picture. Pictures are an optimization primitive. By using a picture, a large part of the drawing pipeline can be shortcut.
This is the normal pipeline, where everything is rendered to the screen framebuffer.

![normal pipeline](./assets/target_framebuffer.png)

When a picture is active, the vertex data is sent to the picture instead. Later, when the picture is drawn, only the rendering step needs to be done.

![normal pipeline](./assets/target_picture.png)

## Creating a picture

Creating a picture is as easy as calling `beginPicture()`, drawing some primitives and finally calling `endPicture()` to get the finished picture.

```ts
kaplay();

loadSprite("bean", "sprites/bean.png");

onLoad(() => {
    beginPicture(new Picture());
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            drawSprite({
                pos: vec2(64 + i * 32, 64 + j * 32),
                sprite: "bean",
            });
        }
    }
    const picture = endPicture();
});
```

Note that we do this inside onLoad, since we need to be sure bean is loaded. If not, there won't be anything visible in the picture. Unlike a bean sprite component, which is drawn every frame, the draw method for the picture data is only really drawn once.

## Drawing a picture

A picture has no meaning in life if it isn't drawn. To draw a picture, use drawPicture, passing the picture as well as the desired transformation parameters.

```ts
kaplay();

loadSprite("bean", "sprites/bean.png");

onLoad(() => {
    beginPicture(new Picture());
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            drawSprite({
                pos: vec2(64 + i * 32, 64 + j * 32),
                sprite: "bean",
            });
        }
    }
    const picture = endPicture();

    onDraw(() => {
        drawPicture(picture, {
            pos: vec2(400, 0),
            angle: 45,
            scale: vec2(0.5),
        });
    });
});
```

## Appending to a picture

When `appendToPicture()` is used instead of `beginPicture()`, new drawing commands can be added to an existing picture.

## Disposing of a picture

When done, a picture needs to be freed in order to free the WebGL buffers. This does not remove the picture data itself, so by appending and ending the picture, the picture can be restored.

```ts
picture.free();
```
