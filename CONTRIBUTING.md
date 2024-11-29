# Contribution Rules

# Writing guides

The guides are documents that teach different concepts and examples of KAPLAY. We could define the guides in two:

- **Concept Guides**: Describing concepts or features of KAPLAY: Assets, Components, Particles, etc.
- **Tutorial Guides**: Describes how to do a certain thing inside KAPLAY: Create a parallax, create a splashscreen.

## Think your guide

1. First you should think about what you want to show in KAPLAY, and think if it should be a concept or a tutorial (usually if is something in-core, is a concept, if is something you have to ellaborate, is a tutorial)
2. Go to `guides/en/` and select one of the categories (folders):
   
   - `1_getting_started`: Basic and core KAPLAY concepts
   - `2_concepts`: Other KAPLAY concepts, may be more than basic
   - `3_advanced`: Advanced concepts and tutorials
   - `4_expanding_kaplay`: All related to plugins, integrations, etc
   - `5_miscaleneus`: Migration and other various guides not neccesary related to the library itself.
     
4. Select the order and url of the guide, for example `4_components`. The order usually how advanced is the concept related to others. For tuturials there's no concern for the order, only append as latest.

### Tips for write your guide type

- **Concepts**: You usually start with this format

```md
# [Name of Concept]

[Little explanation of the concept]

This guide covers:
- [list of components, functions with links of what this covers]

## [What is a Concept?] (it can be modified, but is usually a question)

...

## Subconcept or How to do [Subconcept]

...etc
```

For example


```md
# Components

Components are the building blocks of game objects. They define the behavior of
the object, like how it moves, how it looks, and how it interacts with other
objects.

This guide covers:

-   Component & Tags system, what they are and how they work
-   The [`GameObjRaw.use()` method](/doc/GameObjRaw/#GameObjRaw-use)
-   The [`GameObjRaw.c()` method](/doc/GameObjRaw/#GameObjRaw-c)
-   The [`GameObjRaw.is()` method](/doc/GameObjRaw/#GameObjRaw-is)

The components system of KAPLAY (the `C` of ECS) is powerful and flexible.

## What is a Component?

A component is a piece of code that defines a specific behavior of a game
object. It usually returns a set of **properties** and **methods**...

## Adding Components

...

...etc
```
