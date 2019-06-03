# loadScript
The loadScript is node.js version of the load JavaScript file.

Thanks to: [http://javascript.ru/forum/events/21439-dinamicheskaya-zagruzka-skriptov.html](http://javascript.ru/forum/events/21439-dinamicheskaya-zagruzka-skriptov.html)

and [https://learn.javascript.ru/onload-onerror](https://learn.javascript.ru/onload-onerror)


## Packaged Builds
The easiest way to use loadScript in your code is by using the built source at `build/loadScript.js`.
These built JavaScript files bundle all the necessary dependencies to run loadScript.

In your `head` tag, include the following code:
```html
<script src="https://raw.githack.com/anhr/loadScriptNodeJS/master/build/loadScript.js"></script>
```

Now you can use window.loadScript for loading of your JavaScript files.

### loadScript.async( src, [options] )

Asynchronous load JavaScript file.

src: URL of an external script file or array of the script file names.

options: followed options is available

    onload: function () The onload event occurs when a script has been loaded. Default is undefined.

    onerror: function ( str, e ) The onerror event occurs when an error has been occured. Default is undefined.

        str: error details

        e: event

    appendTo: The node to which the new script will be append. Default is head node.

### [Examples](https://raw.githack.com/anhr/loadScriptNodeJS/master/index.html)
```
//Asynchronous load JavaScript file
loadScript.async( "JavaScript.js" );
```
```
//Asynchronous load JavaScript file with events to specified node
loadScript.async( "JavaScript.js",
	{

		onload: function () {

			var str = 'files has been loaded successfully';
			console.log( str );

		},
		onerror: function ( str, e ) {

			console.error( str );

		},
		appendTo: document.getElementById( "appendto" ),

	}
	
);
```
```
//Asynchronous load of array of JavaScript files
loadScript.async( [

		"JavaScript1.js",
		"JavaScript2.js",

	],
	{

		onload: function () {

			var str = 'files has been loaded successfully';
			console.log( str );

		},
		onerror: function ( str, e ) {

			console.error( str );

		},

	}
	
);
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
