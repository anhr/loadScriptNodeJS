/**
 * node.js version of the loadScript
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.loadScript = {})));
}(this, (function (exports) { 'use strict';

function src(src) {
					function loadScriptBase(callback, appendTo) {
										var script = document.createElement('script');
										script.setAttribute("type", 'text/javascript');
										callback(script);
										appendTo.appendChild(script);
					}
					this.async = function (options) {
										options = options || {};
										options.appendTo = options.appendTo || document.getElementsByTagName('head')[0];
										var isrc;
										function async(srcAsync) {
															var scripts = options.appendTo.querySelectorAll('script');
															for (var i in scripts) {
																				var child = scripts[i];
																				if (child.id == srcAsync) {
																									if (options.onload !== undefined) {
																														options.onload();
																									}
																									return;
																				}
															}
															loadScriptBase(function (script) {
																				script.setAttribute("id", srcAsync);
																				if (script.readyState && !script.onload) {
																									script.onreadystatechange = function () {
																														if (script.readyState == "complete") {
																																			if (options.onload !== undefined) options.onload();
																														}
																														if (script.readyState == "loaded") {
																																			setTimeout(options.onload, 0);
																																			this.onreadystatechange = null;
																														}
																									};
																				} else {
																									function _onload() {
																														if (options.onload !== undefined) {
																																			if (src instanceof Array && isrc < src.length - 1) {
																																								isrc++;
																																								async(src[isrc]);
																																			} else options.onload();
																														}
																									}
																									script.onload = _onload;
																									if (options.onerror !== undefined) script.onerror = options.onerror;else script.onerror = function () {
																														console.error('loadScript: "' + this.src + '" failed');
																									};
																				}
																				script.src = srcAsync;
															}, options.appendTo);
										}
										if (src instanceof Array) {
															isrc = 0;
															async(src[isrc]);
										} else async(src);
					};
					return this;
}

exports.src = src;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=loadScript.js.map
