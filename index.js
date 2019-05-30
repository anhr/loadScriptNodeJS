/**
 * node.js version of the TreeElement
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

//load JavaScript file
//http://javascript.ru/forum/events/21439-dinamicheskaya-zagruzka-skriptov.html
//https://learn.javascript.ru/onload-onerror
//src: URL of an external script file.
function src( src ) {

	function loadScriptBase( callback, appendTo ) {

		var script = document.createElement( 'script' );
		script.setAttribute( "type", 'text/javascript' );
		callback( script );
		appendTo.appendChild( script );

	}

	//Synchronous load JavaScript file
	//this.sync = function () { loadScriptBase( function ( script ) { script.innerHTML = getSynchronousResponse( src ); } ); }

	//Asynchronous load JavaScript file
	//options: followed options is available
	//{
	//	onload: The onload event occurs when a script has been loaded.
	//	onerror: The onerror event occurs when aт error has been occured.
	//	appendTo: The node to which the new script will be append.
	//}
	this.async = function ( options ) {

		options = options || {};
		options.appendTo = options.appendTo || document.getElementsByTagName( 'head' )[0];

		var isrc;

		function async( srcAsync ) {

			var scripts = options.appendTo.querySelectorAll( 'script' );
			for ( var i in scripts ) {

				var child = scripts[i];
				if ( child.id == srcAsync ) {

					if ( options.onload !== undefined ) {

						//setTimeout( function () { onload() }, 100 );//Если не сделать эту задержку, то при открыити локальной веб камеры иногда не успевает скачиваться app.js и появляется ошибка addMedia.js:6 Uncaught ReferenceError: App is not defined
						options.onload();

					}
					return;

				}

			}
			loadScriptBase( function ( script ) {

				script.setAttribute( "id", srcAsync );

				if ( script.readyState && !script.onload ) {

					// IE, Opera
					script.onreadystatechange = function () {

						if ( script.readyState == "complete" ) {

							// на случай пропуска loaded
							if ( options.onload !== undefined ) options.onload(); // (2)

						}

						if ( script.readyState == "loaded" ) {

							setTimeout( options.onload, 0 ); // (1)

							// убираем обработчик, чтобы не сработал на complete
							this.onreadystatechange = null;

						}

					};

				} else {

					// Rest
					function _onload() {

						//console.log( 'loadScript.onload() ' + this.src );
						if ( options.onload !== undefined ) {

							if ( src instanceof Array && ( isrc < ( src.length - 1 ) ) ) {

								isrc++;
								async( src[isrc] );

							} else options.onload();

						}

					}
					script.onload = _onload;

					if ( options.onerror !== undefined )
						script.onerror = options.onerror;
					else script.onerror = function () {

						console.error( 'loadScript: "' + this.src + '" failed' );

					};

				}

				script.src = srcAsync;

			}, options.appendTo );

		}

		if ( src instanceof Array ) {

			isrc = 0;
			async( src[isrc] );
			//			src.forEach( function ( src ) { async( src ); } );

		} else async( src );

	};
	return this;

}

export { src };