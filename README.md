# loadScript
The loadScript is node.js version of the load JavaScript file.

Thanks to: [http://javascript.ru/forum/events/21439-dinamicheskaya-zagruzka-skriptov.html](http://javascript.ru/forum/events/21439-dinamicheskaya-zagruzka-skriptov.html)

and [https://learn.javascript.ru/onload-onerror](https://learn.javascript.ru/onload-onerror)


## Packaged Builds
The easiest way to use loadScript in your code is by using the built source at `build/loadScript.js`.
These built JavaScript files bundle all the necessary dependencies to run TreeElement.

In your `head` tag, include the following code:
```html
<script src="https://raw.githack.com/anhr/loadScriptNodeJS/master/build/loadScript.js"></script>
```

Now you can use loadScript for loading of your JavaScript file.

## Append simple tree 

```
	element
```

## Directory Contents

```
└── build - Compiled source code.
```

## Building your own customController

In the terminal, enter the following:

```
$ npm install
$ npm run build
```

## npm scripts

- npm run build - Build development and production version of scripts.

## Thanks
The following libraries / open-source projects were used in the development of customController:
 * [Rollup](https://rollupjs.org)
 * [Node.js](http://nodejs.org/)

 ## Have a job for me?
Please read [About Me](https://anhr.github.io/AboutMe/).
