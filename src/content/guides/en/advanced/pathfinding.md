---
title: Pathfinding
description: Learn how to help objects find their way around in KAPLAY.
order: 8
---

# Introduction
Pathfinding means searching for a path between one location and the other. It is mostly used in adventure or realtime strategy games, but is found in a lot of other game genres as well.
There are both high level and low level pathfinding APIs available in Kaplay. This outlines their use.
# Using Level
Using the ready to go solution of the level, tile and agent components.
## Level component 
Level has built-in pathfinding when using the agent component. By giving the player or enemy the agent component and spawning them inside a level, pathfinding is as simple as giving them a goal to move towards. They will avoid obstacles, reroute when the situation changes and announce when they reach their goal.
The map they use is derived from the level itself. 
```js
const bean = level.spawn(
    [
        sprite("bean"),
        anchor("center"),
        pos(32, 32),
        tile(),
        agent({ speed: 640, allowDiagonals: true }),
        "bean",
    ],
    vec2(1, 1)
);
```
## Tile component 
The tile component is a component automatically added to objects spawned within the level if it is not present already. The tile component has properties which can set the passability of a tile, either global (isObstacle) or for each direction separately (edges). The difficulty of moving over a tile can be set as well (cost), making agents avoid sand or swamps if solid soil, grass or rock is available.
```js
const level = addLevel(
    createMazeLevelMap(15, 15, {}),
    {
        tileWidth: TILE_WIDTH,
        tileHeight: TILE_HEIGHT,
        tiles: {
            "#": () => [
                sprite("steel"),
                tile({ isObstacle: true }),
            ],
        },
    },
);
```
# Custom pathfinding
While level supplies a ready made solution, your game might need more specific behavior.
## Maps or graphs
While level provides a map based on its tiles, there are situations when you may want to use a custom map. A map is a graph with nodes and connections. A node is a location, while the connection is a path between locations. There are two graphs you can use if you don't feel the need to implement your own.
There is a grid graph which allows you to built a similar system as used in level. It is good for tile based games 
There is also a navigation mesh graph. This one uses polygons for nodes and edges for connections. It is more performant since there are less nodes, but harder to configure since there is no navigation mesh editor yet.
```js
const nav = new NavMesh();
nav.addPolygon([vec2(20, 20), vec2(1004, 20), vec2(620, 120), vec2(20, 120)]);
```
## Navigation component 
The navigation component simplifies using a map for navigation. It can be assigned a map to use, or it will look for an object with a navigationMap component in its ancestors.
```js
// Use the navigation component with the given graph
add([
    ...
    navigation({
        graph: nav,
        navigationOpt: {
            type: "edges",
        },
    }),
])
```
Like agent, it can plot out a course, but won't move. It only calculates the waypoints to follow.
```js
// Compute a path towards the player
path = enemy.navigateTo(player.pos);
```
## Patrol component 
The patrol component can follow a set of waypoints, like the ones calculated by the navigation component. Like this, the two components can be used to simulate some of the functionality of agent.
```js
// Use the patrol component with a speed of 100px per second
add([
    ...
    patrol({ speed: 100 }),
])
// Use the previously computed path
enemy.waypoints = path;
```
## Sentry component
The sentry component is made to sense when certain objects come into view. It is made to make enemies act on visual cues like noticing the player.
```js
// Use the sentry component to look for the player using line of sight
add([
    ...
    sentry({ includes: "player" }, {
        lineOfSight: true,
        raycastExclude: ["enemy"],
    }),
])
```
See [ghosthunting](https://play.kaplayjs.com/?example=ghosthunting) for a more complete example.