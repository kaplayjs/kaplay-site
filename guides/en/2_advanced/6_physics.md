---
title: Physics
description: Learn how to use physics in KAPLAY.
url: physics
---

# Introduction

There are two main components which implement physics in KAPLAY. Area and Body.

## Area

Area is used to define the area of the object. This can be seen as the collision
shape, whether the object is actually solid or not. When using just area,
without body, the object is not solid, but still reports overlapping with other
areas. Area has three events for this:

- onCollide which is fired when the collision starts.
- onCollideUpdate which is fired during collision.
- onCollideEnd which is fired when the collision ends.

By default, an area component creates a shape similar to the shape which is
drawn. Thus a sprite receives an area which has the size and position of the
sprite. A custom shape can be passed if this is not what is needed.

## Body

Body makes an object with an area solid, as well as makes it being affected by
gravity if gravity is set.

```ts
setGravity(100);
// Inverse gravity
setGravityDirection(vec2(0, -1));
```

To make an object with a body not affected by gravity, like a platform, it can
be made static using `isStatic: true`.

```ts
add([
    pos(80, 400),
    rect(250, 20),
    area(),
    body({ isStatic: true }),
]);
```

A body has a velocity `obj.vel` (px/s). This velocity can changed by using
impulses and forces. An impulse (px/s) is a sudden change in velocity, its
effect does not depend on the mass (kg) of the object.

```ts
obj.applyImpulse(vec2(100, 0));
```

A force (kg*px/s^2) is applied for one physics frame, and its effect depends on
the mass of the object. The higher the mass, the less the force changes the
velocity.

```ts
obj.addForce(vec2(100, 0));
```

Even if the mass of the object is 1, these two calls will not have the same
effect. The force will only be active during one physics frame (1/50th of a
second), so it will not cause the horizontal velocity to increase by 100px, but
only 2px. It has to be added for a duration of 2 seconds to have the same effect
as the impulse.

### Mass

For simple games, mass doesn't need to be passed, as it defaults to 1 and will
thus make no noticeable difference (force will be divided by 1). There are two
places where mass makes a difference.

1. Collisions. When two objects collide, they will move away from each other (it
   is an elastic collision). The distance they move depends on their mass and
   velocity. A heavier object will impart a larger reaction force on the lighter
   object. Thus a light object colliding with a heavy object will have little
   effect, while a heavy object colliding with a light object will impart a
   large impulse.
2. Effectors. Effectors use forces. The larger the mass of an object, the larger
   the force is needed to accelerate it.

Where mass plays no role is gravity. Like in reality, an object's mass does not
affect how fast it falls. Gravity is not a force, but an acceleration caused by
the curvature of space-time (which is caused by the presence of mass). This
acceleration is the same for all objects (9.806 meters/second^2 on earth).

## Angular velocity and torque

Currently both the impulses and forces are applied at the center of mass of the
area, causing no torque and thus no change in angular velocity. Once the
collision module supports contact points, a more realistic simulation will be
added.

# Effectors

Effectors implement forces which can be used to simulate various real world
situations. They can be used by just adding one of the following components.

## AreaEffector

The areaEffector implements a directional force within a certain area. For
example there can be a strong wind preventing a player to quickly run past
traps, or an elevator using water flow. This effector is used without a body,
since objects need to be able to travel through its area to be affected.

```ts
add([
    pos(20, 150),
    rect(50, 300),
    area(),
    areaEffector({
        forceAngle: -90,
        forceMagnitude: 150,
    }),
]);
```

## SurfaceEffector

The surfaceEffector implements a tangential force along the edges of an area.
It's most common usage is to implement a conveyor belt. Unlike areaEffector,
which takes a force, this effector takes a speed. It will adjust the force it
uses according to the body's mass in order to reach the given speed. This
effector is used with a static body, since objects need to rest on it, not
penetrate the area.

```ts
add([
    pos(100, 300),
    rect(200, 20),
    area(),
    body({ isStatic: true }),
    surfaceEffector({ speed: 20 }),
]);
```

## PointEffector

The PointEffector implements a force towards or away from a point. The point in
question is the position of the object in world space. All objects within its
area are affected. The force can be constant, or depend on distance or squared
distance. This effector is used without a body, since objects need to be able to
travel through its area to be affected.

```ts
add([
    pos(85, 50),
    rect(90, 90),
    anchor("center"),
    area(),
    pointEffector({ forceMagnitude: 300 }),
]);
```

## BuoyancyEffector

The buoyancyEffector implements fluid buoyancy and flow. Objects falling in it
will float depending on the density of the fluid. This effector is used without
a body, since objects need to be able to travel through its area to be affected.

```ts
add([
    pos(400, 200),
    rect(200, 100),
    color(BLUE),
    opacity(0.5),
    area(),
    buoyancyEffector({ surfaceLevel: 200, density: 6 }),
]);
```

## PlatformEffector

The platform effector makes it easier to implement one way platforms or walls.
This effector is used with a static body, but it will only be solid depending on
the direction the object is traveling from.

# ConstantForce

This is not an effector, since it doesn't need an area. It just adds a constant
force each frame. It is good for an object which needs a constant acceleration,
like a rocket for example.
