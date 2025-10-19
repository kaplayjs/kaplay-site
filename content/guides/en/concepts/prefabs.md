---
title: Prefabs
description: Learn how to use prefabs in KAPLAY.
url: prefabs
version: "4000"
---

# Prefabs

Prefabs make it easy to define an object once, and make multiple, customized, instances later.

## Creating a prefab

Calling createPrefab(obj) will serialize the object into a prefab. This prefab can be used to instantiate similar objects, or saved to a file in order to be loaded later.

It is also possible to create and register the prefab as an asset in one go, by using createPrefab(name, obj).

```ts
createPrefab("hexagon", obj);
```

## Loading a prefab

Using loadPrefab(name, uri), a prefab can be loaded from file. This makes it possible to split code and resources, which makes it easier to work in a team with artists.

```ts
loadPrefab("hexagon");
```

## Adding a prefab

Adding a prefab instance can be done using addPrefab(name | data) which adds the prefab to the root, or obj.addPrefab(name | data) which will add the prefab as a child of obj. It is possible to modify the prefab as well, as addPrefab(name | data, Comp[]) can take a list of components to replace the exiting ones.

```ts
addPrefab("hexagon", [pos(200, 200), color(BLUE)]);
```

## Serializing your custom components

If you use custom components, you need to make sure that these can be serialized by giving the a serialize() method returning json data.

```ts
serialize() {
    return { pos: this.pos.serialize() };
},
```

Additionally, a factory function needs to be registered in order to support deserialization.

```ts
registerFactory("pos", data => {
    return pos(data.pos);
});
```

For more information about prefabs, see [the wiki](https://github.com/kaplayjs/kaplay/wiki/Prefabs).
