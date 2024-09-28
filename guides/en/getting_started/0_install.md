---
title: Installation
description: Learn how to install KAPLAY.
order: 0
url: install
---

# Installation

This guide covers:

- [create-kaplay](https://npmjs.com/package/create-kaplay) for create KAPLAY
  projects easily
- Using KAPLAY with a CDN
- Using KAPLAY with Node.js
- Loading assets
- Running a static file server

The most easy way to get started with KAPLAY is to use the
[CLI tool](https://www.npmjs.com/package/create-kaplay), which will generate a
project for you:

```sh
$ npx create-kaplay mygame
$ cd mygame
$ npm run dev
```

This will create your game in the `mygame` directory, and start a development
server for you to preview your game. If you edit `src/main.js` and refresh the
page, you will see your changes.

To see all options, run:

```sh
$ create-kaplay --help
```

## Using a CDN

If you prefer to use KAPLAY without any bundlers, you can use a CDN to include
it directly in your HTML file, or import it with ECMAScript modules.

```html
<script type="module">
    // import kaplay
    import kaplay from "https://unpkg.com/kaplay@3001.0.0-alpha.20/dist/kaplay.mjs";
    // start kaplay
    kaplay();
</script>
```

You can also just include it with a `<script>` tag.

```html
<script src="https://unpkg.com/kaplay@3001.0.0-alpha.20/dist/kaplay.js"></script>

<script>
    kaplay();
</script>
```

## Setup your own Node.js environment

With Node.js and npm it's easier have some other packages and use version
control, also it's easier to get typescript autocomplete support, but it
requires a bit more setup. (This is the way of `create-kaplay`)

```sh
$ npm install kaplay
```

You'll need to use a bundler to use Kaboom with NPM. There's a lot of options
like:

- `esbuild`,
- `webpack`,
- `parcel`,
- `vitejs`,

This is a short example of how to use Kaboom with
["esbuild"](https://esbuild.github.io/).

Once you have `esbuild` installed, and you have this in a `.js` or `.ts` file:

```js
import kaplay from "kaplay";

kaplay();
```

just run

```sh
$ esbuild game.js --bundle > build.js
```

and it'll find the KAPLAY package and include it in the built `build.js`,
include `build.js` in your HTML and you're good to go. Feel free to automate
this process.

## Loading Assets

You might have encountered errors when trying to `loadSprite()` from local file
system, that is because browser won't allow loading local files with JavaScript.
To get around that you'll need to use a static file that serves the files
through HTTP. There're a lot of programs that helps you to do that.

- `$ python3 -m http.server` if you have [python3](https://www.python.org)
  installed
- `$ python -m SimpleHTTPServer` if you have [python2](https://www.python.org)
  installed
- `$ ruby -run -ehttpd . -p8000` if you have [ruby](https://www.ruby-lang.org/en)
  installed
- `$ php -S localhost:8000` if you have [php](https://php.net)
  installed
- `$ serve` if you have [serve](https://github.com/vercel/serve) installed
- `$ caddy file-server` if you have [caddy](https://caddyserver.com/) installed
- `$ static-here` if you have
  [static-here](https://github.com/amasad/static-here) installed

Let's say you have a folder structure like this:

```sh
.
├── sprites
│   ├── froggy.png
│   └── cloud.png
├── sounds
│   └── horse.mp3
└── index.html
```

and you have the static file server running on port `8000`, just go to
`http://localhost:8000/index.html`, and you should be able to load stuff from
relative paths like

```js
loadSprite("froggy", "sprites/froggy.png");
loadSound("horse", "sounds/horse.mp3");
```

To learn more check out this
[MDN doc](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server).
