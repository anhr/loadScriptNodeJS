/**
 * node.js version of the load JavaScript file
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

function loadScriptBase( callback, appendTo ) {

	var script = document.createElement( 'script' );
	script.setAttribute( "type", 'text/javascript' );
	callback( script );
	appendTo.appendChild( script );

}

//Synchronous load JavaScript file
//this.sync = function () { loadScriptBase( function ( script ) { script.innerHTML = getSynchronousResponse( src ); } ); }

//Asynchronous load JavaScript file
//@param src: URL of an external script file or array of the script file names.
//@param options: followed options is available
//{
//	onload: function () The onload event occurs when a script has been loaded. Default is undefined
//	onerror: function ( str, e ) The onerror event occurs when an error has been occured. Default is undefined
//		str: error details
//		e: event
//	appendTo: The node to which the new script will be append. Default is head node
//}
//
//@example
//loadScript.async( "JavaScript.js",
//	{
//		onload: function () {
//
//			var str = 'file has been loaded successfully';
//			console.log( str );
//
//		},
//		onerror: function ( str, e ) {
//
//			console.error( str );
//
//		},
//		appendTo: document.getElementById( "appendto" ),
//
//	}
//
//);
//
//loadScript.async( [
//		"JavaScript1.js",
//		"JavaScript2.js",
//	],
//	{
//		onload: function () {
//
//			var str = 'file has been loaded successfully';
//			console.log( str );
//
//		},
//		onerror: function ( str, e ) {
//
//			console.error( str );
//
//		},
//
//	}
//
//);


function async( src, options ) {

	options = options || {};
	options.appendTo = options.appendTo || document.getElementsByTagName( 'head' )[ 0 ];
	options.onload = options.onload || function () {};

	var isrc;

	function async( srcAsync ) {

		var scripts = options.appendTo.querySelectorAll( 'script' );
		for ( var i in scripts ) {

			var child = scripts[ i ];
			if ( child.id == srcAsync ) {

				if ( options.onload !== undefined ) {

					//setTimeout( function () { onload() }, 100 );//���� �� ������� ��� ��������, �� ��� �������� ��������� ��� ������ ������ �� �������� ����������� app.js � ���������� ������ addMedia.js:6 Uncaught ReferenceError: App is not defined
					options.onload();

				}
				return;

			}

		}
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

					//console.log( 'loadScript.onload() ' + this.src );
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
					else console.error( str );

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

export { async };
