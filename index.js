/**
 * node.js version of the load JavaScript file
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * Thanks to:
 *http://javascript.ru/forum/events/21439-dinamicheskaya-zagruzka-skriptov.html
 *https://learn.javascript.ru/onload-onerror
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

//Please download https://github.com/anhr/loadFileNodeJS into ../loadFileNodeJS folder
import { sync as loadFileSync, escapeHtml } from '../loadFileNodeJS/index.js';

/**
 * @callback onerror
 * @param {string} str - error details
 * @param {Object} e - event
 */

/**
 * Synchronous load JavaScript file
 * @param {string} src URL of an external script file.
 * @param {Object} [options] followed options is available. Default is undefined
 * @param {Function} [options.onload] function () The onload event occurs when a script has been loaded. Default is undefined.
 * @param {onerror} [options.onerror] function ( str, e ) The onerror event occurs when an error has been occured. Default is undefined.
 * @param {}[options.appendTo] The node to which the new script will be append. Default is head node
 * 
 * @example
 * 
	//Simplest example. Append script into head node.
	loadScript.sync( 'sync.js' );

 * @example
 * 
	//onload, onerror events. Append script into "appendto" element
	loadScript.sync( 'sync.js',
		{
			onload: function ( response ) {

				var str = 'file has been loaded successfully';
				console.log( str );

			},
			onerror: function ( str, e ) {

				elSync2Res.style.color = 'red';

			},
			appendTo: document.getElementById( "appendto" ),
		},
	);

 */
function sync( src, options ) {

	options = options || {};
	options.onload = options.onload || function () { };
	options.onerror = options.onerror || function () { };
	options.appendTo = options.appendTo || document.getElementsByTagName( 'head' )[0];

	if ( isScriptExists( options.appendTo, src ) ) {

		options.onerror( 'duplicate downloading of the ' + src + ' file' );
		return;

	}

	loadScriptBase( function ( script ) {

		script.setAttribute( "id", src );
		script.innerHTML = loadFileSync( src, options );

	}, options.appendTo );

}

/**
 * Asynchronous load JavaScript file
 * @param {string|string[]} src URL of an external script file or array of the script file names.
 * @param {Object} [options] followed options is available. Default is undefined
 * @param {Function} [options.onload] function () The onload event occurs when a script has been loaded. Default is undefined.
 * @param {onerror} [options.onerror] function ( str, e ) The onerror event occurs when an error has been occured. Default is undefined.
 * @param {}[options.appendTo] The node to which the new script will be append. Default is head node
 * 
 * @example
 * 
	//Simplest example. Append script into head node.
	loadScript.async( "JavaScript.js);
 * 
 * @example
 *
	//onload, onerror events. Append script into "appendto" element
	loadScript.async( "JavaScript.js",
	{
 		onload: function () {
 
 			var str = 'file has been loaded successfully';
 			console.log( str );
 
 		},
 		onerror: function ( str, e ) {
 
 			console.error( str );
 
 		},
 		appendTo: document.getElementById( "appendto" ),
 
 	}
 
  );
 *
 * @example
 *
	//loading of array of JavaScript files. Append script into head node.
	loadScript.async( [
 		"JavaScript1.js",
 		"JavaScript2.js",
 	],
 	{
 		onload: function () {
 
 			var str = 'file has been loaded successfully';
 			console.log( str );
 
 		},
 		onerror: function ( str, e ) {
 
 			console.error( str );
 
 		},
 
 	}
 
  );
 */
function async( src, options ) {

	options = options || {};
	options.appendTo = options.appendTo || document.getElementsByTagName( 'head' )[ 0 ];
	options.onload = options.onload || function () {};

	var isrc;

	function async( srcAsync ) {

		if ( isScriptExists( options.appendTo, srcAsync, options.onload ) )
			return;

		loadScriptBase( function ( script ) {

			script.setAttribute( "id", srcAsync );

			if ( script.readyState && ! script.onload ) {

				// IE, Opera
				script.onreadystatechange = function () {

					if ( script.readyState == "complete" ) {

						// �� ������ �������� loaded
						if ( options.onload !== undefined ) options.onload(); // (2)

					}

					if ( script.readyState == "loaded" ) {

						setTimeout( options.onload, 0 ); // (1)

						// ������� ����������, ����� �� �������� �� complete
						this.onreadystatechange = null;

					}

				};

			} else {

				// Rest
				function _onload() {

					//console.log( 'loadScript.onload() ' + this.url );
					if ( options.onload !== undefined ) {

						if ( src instanceof Array && ( isrc < ( src.length - 1 ) ) ) {

							isrc ++;
							async( src[ isrc ] );

						} else options.onload();

					}

				}
				script.onload = _onload;

				script.onerror = function ( e ) {

					var str = 'loadScript: "' + this.src + '" failed';
					if ( options.onerror !== undefined )
						options.onerror( str, e );
					console.error( str );

				};

			}

			script.src = srcAsync;

		}, options.appendTo );

	}

	if ( src instanceof Array ) {

		isrc = 0;
		async( src[ isrc ] );

	} else async( src );

}

function loadScriptBase( callback, appendTo ) {

	var script = document.createElement( 'script' );
	script.setAttribute( "type", 'text/javascript' );
	callback( script );
	appendTo.appendChild( script );

}

function isScriptExists( elParent, srcAsync, onload ) {

	var scripts = elParent.querySelectorAll( 'script' );
	for ( var i = 0; i < scripts.length; i++ ) {

		var child = scripts[i];
		if ( child.id == srcAsync ) {

			if ( onload !== undefined )
				onload();
			return true;

		}

	}
	return false;

}

export { async, sync, escapeHtml };
