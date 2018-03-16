/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(31);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(58)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(99),
    getValue = __webpack_require__(102);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14),
    getRawTag = __webpack_require__(76),
    objectToString = __webpack_require__(77);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_vue__ = __webpack_require__(59);
/* unused harmony reexport LibraryExample */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bar_chart_vue__ = __webpack_require__(63);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__bar_chart_vue__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line_chart_vue__ = __webpack_require__(67);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__line_chart_vue__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pie_chart_vue__ = __webpack_require__(79);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__pie_chart_vue__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__radar_chart_vue__ = __webpack_require__(83);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__radar_chart_vue__["a"]; });










/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(89),
    listCacheDelete = __webpack_require__(90),
    listCacheGet = __webpack_require__(91),
    listCacheHas = __webpack_require__(92),
    listCacheSet = __webpack_require__(93);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(34);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(112);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

module.exports = getMapData;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(37),
    baseAssignValue = __webpack_require__(38);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(39),
    baseKeys = __webpack_require__(126),
    isArrayLike = __webpack_require__(43);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function () {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function () {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(31);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = function () {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

  return value === proto;
}

module.exports = isPrototype;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(134),
    stubArray = __webpack_require__(45);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(138),
    Map = __webpack_require__(15),
    Promise = __webpack_require__(139),
    Set = __webpack_require__(140),
    WeakMap = __webpack_require__(141),
    baseGetTag = __webpack_require__(7),
    toSource = __webpack_require__(36);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function (value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString:
                    return dataViewTag;
                case mapCtorString:
                    return mapTag;
                case promiseCtorString:
                    return promiseTag;
                case setCtorString:
                    return setTag;
                case weakMapCtorString:
                    return weakMapTag;
            }
        }
        return result;
    };
}

module.exports = getTag;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(144);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__radar_chart_demo_vue__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pie_chart_demo_vue__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bar_chart_demo_vue__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__line_chart_demo_vue__ = __webpack_require__(167);
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    BarChartDemo: __WEBPACK_IMPORTED_MODULE_2__bar_chart_demo_vue__["a" /* default */],
    LineChartDemo: __WEBPACK_IMPORTED_MODULE_3__line_chart_demo_vue__["a" /* default */],
    PieChartDemo: __WEBPACK_IMPORTED_MODULE_1__pie_chart_demo_vue__["a" /* default */],
    RadarChartDemo: __WEBPACK_IMPORTED_MODULE_0__radar_chart_demo_vue__["a" /* default */]
  },

  data() {
    return {};
  },

  methods: {}
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_js__ = __webpack_require__(8);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "radar-chart-demo",

  components: {
    RadarChart: __WEBPACK_IMPORTED_MODULE_0__src_index_js__["d" /* RadarChart */]
  },

  data() {
    return {
      dimensions: ["Eat", "Drink", "Run", "Sleep", "Code", "Design", "Play"],
      dataset: [{
        label: "Lucy",
        color: "red",
        d: [50, 60, 20, 58, 20, 59, 88]
      }, {
        label: "Mike",
        color: "green",
        d: [20, 70, 53, 23, 67, 90, 43]
      }]
    };
  },
  computed: {},
  methods: {
    onRadarChartAction(params) {
      const { origin, act, payload } = params;

      switch (act) {
        case origin.ACT_CLICK:
          alert(`Region ${payload} clicked`);
          break;
        case origin.ACT_CLICK_DIMENSION_LABEL:
          alert(`${this.dimensions[payload]} clicked`);
          break;
        default:
          break;
      }
    }
  }
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'vue-d3-chart',

  components: {},

  props: {},

  data() {
    return {
      content: "Hello vue library boilerplate!"
    };
  },

  watch: {},

  computed: {},

  methods: {},

  mounted() {}
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_axis_director_mixin_js__ = __webpack_require__(29);
//
//
//
//
//
//
//
//
//
//



const padding = 40;

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'bar-chart',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_axis_director_mixin_js__["a" /* default */]],

  components: {},

  props: {
    axis: { // 坐标轴
      type: Object,
      required: true
    },
    dataset: { // 数据
      type: Array,
      required: true
    },
    width: { // 图表宽
      type: Number,
      required: true
    },
    height: { // 图表高
      type: Number,
      required: true
    }
  },

  data() {
    return {
      padding,
      ACT_CLICK: 1
    };
  },

  watch: {},

  computed: {
    dataViewHeight() {
      return this.height - 2 * this.padding;
    },
    dataViewWidth() {
      return this.width - 2 * this.padding;
    },
    xDiv() {
      return this.axis.xDiv ? this.axis.xDiv : this.axis.x[1] - this.axis.x[0];
    },
    xScale() {
      return d3.scaleLinear().domain(this.axis.x).range([0, this.dataViewWidth]);
    },
    yScale() {
      return d3.scaleLinear().domain(this.axis.y).range([this.dataViewHeight, 0]);
    },
    xAxis() {
      return {
        scale: this.xScale,
        format: this.axis.xFormat,
        div: this.xDiv
      };
    },
    yAxis() {
      return {
        scale: this.yScale,
        format: this.axis.yFormat,
        div: this.axis.yDiv
      };
    },
    bandWidth() {
      return this.dataViewWidth / this.xDiv;
    },
    rectList() {
      return this.dataset.map(d => {
        const h = +this.yScale(d.y).toFixed(2);
        const w = this.bandWidth / 2; // Bar宽度为X轴单位宽度的一半
        return {
          x: +this.xScale(d.x).toFixed(2) - w / 2,
          y: h,
          width: w,
          height: this.dataViewHeight - h,
          color: d.color ? d.color : 'red'
        };
      });
    }
  },

  mounted() {},

  methods: {
    onRectBarClick(i) {
      this.$emit('action', {
        origin: this,
        act: this.ACT_CLICK,
        payload: i
      });
    }
  }
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const { scale, format, div } = binding.value;
      d3.select(el).call(d3[axisMethod](scale).ticks(div).tickFormat(format));
    }
  }
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_axis_director_mixin_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_throttle__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_throttle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_throttle__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




const padding = 40;
const POINT_COUNT_OF_LINE_PATH = 100;

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'line-chart',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_axis_director_mixin_js__["a" /* default */]],

  components: {},

  props: {
    axis: { // 坐标轴
      type: Object,
      required: true
    },
    line: { // 数据
      type: Array | Object,
      required: true
    },
    width: { // 图表宽
      type: Number,
      required: true
    },
    height: { // 图表高
      type: Number,
      required: true
    },
    showGrid: { // 显示格子
      type: Boolean,
      required: false
    },
    showDots: { // 显示点
      type: Boolean,
      required: false
    },
    trackMouse: {
      type: Boolean, // 跟踪鼠标显示十字坐标
      required: false
    }
  },

  data() {
    return {
      padding,
      ACT_CLICK_LINE: 1,
      ACT_CLICK_DOT: 2,
      crossPoints: [] // 十字线和数据线的交点
    };
  },

  watch: {},

  computed: {
    // 确保line为数组, 如果不是转成数组
    lines() {
      return Array.isArray(this.line) ? this.line : [this.line];
    },
    // dataViewHeight & dataViewWidth: 图表数据区域宽和高
    dataViewHeight() {
      return this.height - 2 * this.padding;
    },
    dataViewWidth() {
      return this.width - 2 * this.padding;
    },
    // xScale & yScale: 数据坐标到视图坐标转换器
    xScale() {
      return d3.scaleLinear().domain(this.axis.x).range([0, this.dataViewWidth]);
    },
    yScale() {
      return d3.scaleLinear().domain(this.axis.y).range([this.dataViewHeight, 0]);
    },
    // xAxis & yAxis: 坐标轴数据
    xAxis() {
      return {
        scale: this.xScale,
        format: this.axis.xFormat,
        div: this.axis.xDiv
      };
    },
    yAxis() {
      return {
        scale: this.yScale,
        format: this.axis.yFormat,
        div: this.axis.yDiv
      };
    },
    // gridX & gridY: 网格横竖坐标集合
    gridX() {
      const [start, end] = this.axis.x;
      return d3.ticks(start, end, this.axis.xDiv).map(x => +this.xScale(x).toFixed(2));
    },
    gridY() {
      const [start, end] = this.axis.y;
      return d3.ticks(start, end, this.axis.yDiv).map(y => +this.yScale(y).toFixed(2));
    },
    // 返回每组数据对应的视图坐标
    scaledDataset() {
      return this.lines.map(l => {
        return l.dataset.map(p => {
          return {
            x: +this.xScale(p.x).toFixed(2),
            y: +this.yScale(p.y).toFixed(2)
          };
        });
      });
    },
    // 返回每条线上N个抽样点
    pointsOfLinePath() {
      return this.$refs.lines.map(p => {
        const totalLength = p.getTotalLength();
        const points = [];
        const count = POINT_COUNT_OF_LINE_PATH;
        let n = count;
        while (n--) {
          points.unshift(p.getPointAtLength(totalLength / (count - 1) * n));
        }
        return points;
      });
    },
    // 返回每组数据对应的svg path data
    pathDataOfLines() {
      let path = d3.line().x(d => +this.xScale(d.x).toFixed(2)).y(d => +this.yScale(d.y).toFixed(2));

      return this.lines.map(l => {
        const p = l.curve ? path.curve(l.curve) : path;
        return {
          d: p(l.dataset),
          label: l.label,
          stroke: l.color ? l.color : 'black'
        };
      });
    }
  },

  mounted() {},

  methods: {
    // 点击每组数据对应的视图元素，包括线和label等
    onClickGroup(i) {
      this.$emit('action', {
        origin: this,
        act: this.ACT_CLICK_LINE,
        payload: i
      });
    },
    // 点击数据点
    onClickDot(lineIndex, pointIndex) {
      this.$emit('action', {
        origin: this,
        act: this.ACT_CLICK_DOT,
        payload: {
          lineIndex,
          pointIndex
        }
      });
    },
    // onMouseMove & onMouseLeave: 鼠标在数据区域内移动和离开
    onMouseMove(e) {
      const _onMouseMove = __WEBPACK_IMPORTED_MODULE_1_lodash_throttle___default()(e => {
        const offsetX = e.offsetX - this.padding;
        const offsetY = e.offsetY - this.padding;
        if (offsetX > this.dataViewWidth || offsetY > this.dataViewWidth) return;
        const bisect = d3.bisector(d => d.x).left;
        this.crossPoints = this.pointsOfLinePath.map(points => {
          const i = bisect(points, offsetX);
          if (i < 1 || i > POINT_COUNT_OF_LINE_PATH - 1) return null;
          const p0 = points[i];
          const p1 = points[i - 1];
          const yScaled = +(p0.y + (p1.y - p0.y) / (p1.x - p0.x) * (offsetX - p0.x)).toFixed(2);
          return {
            x: this.xScale.invert(offsetX).toFixed(2),
            y: this.yScale.invert(yScaled).toFixed(2),
            xScaled: offsetX,
            yScaled
          };
        });
      }, 20);
      _onMouseMove(e);
    },
    onMouseLeave() {
      this.crossPoints = [];
    }
  }
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73)))

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//

const padding = 50;
const descriptionHeight = 60;

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'pie-chart',

  components: {},

  props: {
    dataset: { // 数据
      type: Array,
      required: true
    },
    width: { // 图表宽
      type: Number,
      required: true
    },
    innerRadius: { // 内半径
      type: Number,
      default: 0
    },
    padAngle: { //间隔角度
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      padding,
      descriptionHeight,
      ACT_CLICK: 1
    };
  },

  watch: {},

  computed: {
    height() {
      return this.width + descriptionHeight;
    },
    dataViewHeight() {
      return this.height - 2 * this.padding;
    },
    dataViewWidth() {
      return this.width - 2 * this.padding;
    },
    pieRaidus() {
      return this.dataViewWidth / 2;
    },
    textRasius() {
      return this.pieRaidus + this.padding / 2;
    },
    arcsData() {
      return d3.pie()(this.dataset.map(d => d.value));
    },
    arcs() {
      return this.arcsData.map(d => {
        const arc = d3.arc().innerRadius(this.innerRadius).outerRadius(this.pieRaidus).startAngle(d.startAngle).endAngle(d.endAngle).padAngle(this.padAngle);
        return arc();
      });
    }
  },

  mounted() {},

  methods: {
    onClickGroup(i) {
      this.$emit('action', {
        origin: this,
        act: this.ACT_CLICK,
        payload: i
      });
    }
  }
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_cloneDeep__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_cloneDeep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_cloneDeep__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




const padding = 50;
const descriptionHeight = 60;

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'radar-chart',

  components: {},

  props: {
    dataset: { // 数据
      type: Array,
      required: true
    },
    dimensions: { //维度
      type: Array,
      required: true
    },
    width: { // 图表宽
      type: Number,
      required: true
    }
  },

  data() {
    return {
      padding,
      descriptionHeight,
      netValues: [100, 80, 60, 40, 20],
      focusIndex: 0,
      ACT_CLICK: 1,
      ACT_CLICK_DIMENSION_LABEL: 2
    };
  },

  watch: {},

  computed: {
    height() {
      return this.width + descriptionHeight;
    },
    dataViewHeight() {
      return this.height - 2 * this.padding;
    },
    dataViewWidth() {
      return this.width - 2 * this.padding;
    },
    radarRaidus() {
      return this.dataViewWidth / 2;
    },
    textRasius() {
      return this.radarRaidus + this.padding / 2;
    },
    // 返回网格数组包含每层数据，直接用于svg polygon
    nets() {
      return this.netValues.map(v => {
        return this.dimensions.map((label, i) => {
          const point = this.valueToPoint(v, i);
          return point.x + ',' + point.y;
        }).join(' ');
      });
    },
    // 最外层多边形坐标，返回{x, y}数组
    mostOutsizePolygon() {
      return this.dimensions.map((_, i) => {
        return this.valueToPoint(100, i);
      });
    },
    // 根据dataset和focusIndex计算出的多边形数组，直接用于svg polygon
    dataPolygons() {
      // svg中不支持通过style设置z-index, 而是最后一个子元素z-index最高
      // 这里把focusIndex对应的数据放到末尾使其位于最上层
      const ds = __WEBPACK_IMPORTED_MODULE_0_lodash_cloneDeep___default()(this.dataset).map((d, i) => {
        d.index = i;
        return d;
      });
      const focusItem = ds[this.focusIndex];
      ds.splice(this.focusIndex, 1);
      ds.push(focusItem);

      // 构建Polygons
      return ds.map(item => {
        const d = item.d.map((v, i) => {
          const point = this.valueToPoint(v, i);
          return point.x + ',' + point.y;
        }).join(' ');
        return {
          index: item.index, // 原dataset中的index
          d
        };
      });
    },
    angles() {
      var total = this.dimensions.length;
      return this.dimensions.map((_, i) => Math.PI * 2 / total * i);
    }
  },

  mounted() {},

  methods: {
    valueToPoint(value, index) {
      var total = this.dimensions.length;
      var r = this.radarRaidus;
      var x = 0;
      var y = -r * value / 100;
      var angle = Math.PI * 2 / total * index;
      var cos = Math.cos(angle);
      var sin = Math.sin(angle);
      var tx = x * cos - y * sin + r;
      var ty = x * sin + y * cos + r;
      return {
        x: tx.toFixed(2),
        y: ty.toFixed(2)
      };
    },
    onClickGroup(i) {
      this.$emit('action', {
        origin: this,
        act: this.ACT_CLICK,
        payload: i
      });
    },
    onClickDimensionLabel(i) {
      this.$emit('action', {
        origin: this,
        act: this.ACT_CLICK_DIMENSION_LABEL,
        payload: i
      });
    },
    onGroupHover(i) {
      this.focusIndex = i;
    }
  }
});

/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(7),
    isObject = __webpack_require__(4);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(38),
    eq = __webpack_require__(34);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(117);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(119),
    isArguments = __webpack_require__(120),
    isArray = __webpack_require__(17),
    isBuffer = __webpack_require__(40),
    isIndex = __webpack_require__(123),
    isTypedArray = __webpack_require__(124);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
    // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' ||
    // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') ||
    // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
    // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(0),
    stubFalse = __webpack_require__(122);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ }),
/* 41 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(35),
    isLength = __webpack_require__(41);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(39),
    baseKeysIn = __webpack_require__(129),
    isArrayLike = __webpack_require__(43);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(47),
    getPrototype = __webpack_require__(48),
    getSymbols = __webpack_require__(22),
    stubArray = __webpack_require__(45);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(42);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(47),
    isArray = __webpack_require__(17);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_js__ = __webpack_require__(8);
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "pie-chart-demo",

  components: {
    PieChart: __WEBPACK_IMPORTED_MODULE_0__src_index_js__["c" /* PieChart */]
  },

  data() {
    return {
      dataset: [{ label: "CN", value: 0.2, color: 'red' }, { label: "US", value: 0.4, color: 'green' }, { label: "UK", value: 0.3, color: 'gray' }, { label: "JP", value: 0.1, color: 'yellow' }]
    };
  },
  computed: {},
  methods: {
    onPieChartAction(params) {
      const { origin, act, payload } = params;

      switch (act) {
        case origin.ACT_CLICK:
          alert(`Region ${payload} clicked`);
          break;
        default:
          break;
      }
    }
  }
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_js__ = __webpack_require__(8);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "bar-chart-demo",

  components: {
    BarChart: __WEBPACK_IMPORTED_MODULE_0__src_index_js__["a" /* BarChart */]
  },

  data() {
    return {
      axis: {
        x: [-1, 7],
        xFormat(d) {
          if (d === -1 || d === 7) return '';
          return ['Sunday', 'Monday', 'Tudsday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d];
        },
        y: [0, 100],
        yDiv: 10,
        xLabel: "Day",
        yLabel: "Temp"
      },
      dataset: [{ x: 0, y: 84, color: 'red' }, { x: 1, y: 57, color: 'green' }, { x: 2, y: 76, color: 'red' }, { x: 3, y: 43, color: 'green' }, { x: 4, y: 32, color: 'red' }, { x: 5, y: 38, color: 'green' }, { x: 6, y: 28, color: 'red' }]
    };
  },
  computed: {},
  methods: {
    onBarChartAction(params) {
      const { origin, act, payload } = params;

      switch (act) {
        case origin.ACT_CLICK:
          alert(`Bar ${payload} clicked`);
          break;
        default:
          break;
      }
    }
  }
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_js__ = __webpack_require__(8);
//
//
//
//
//
//
//
//



const c1 = {
  axis: {
    x: [100, 200],
    xDiv: 5,
    y: [0, 100],
    yDiv: 10,
    xLabel: "USD",
    yLabel: "KG"
  },
  line: {
    color: 'red',
    dataset: [{ x: 104, y: 84 }, { x: 150, y: 57 }, { x: 134, y: 76 }, { x: 186, y: 43 }, { x: 148, y: 32 }, { x: 177, y: 38 }, { x: 190, y: 28 }, { x: 132, y: 8 }, { x: 154, y: 34 }, { x: 198, y: 51 }, { x: 145, y: 67 }, { x: 132, y: 43 }, { x: 113, y: 21 }, { x: 103, y: 57 }, { x: 187, y: 56 }, { x: 174, y: 20 }].sort((a, b) => d3.ascending(a.x, b.x)),
    curve: d3.curveBasis
  }
};

const c2 = {
  axis: {
    x: [0, 6],
    xFormat(d) {
      return ['Sun', 'Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat'][d];
    },
    xDiv: 7,
    y: [0, 100],
    yDiv: 10,
    xLabel: "Temp",
    yLabel: "Day"
  },
  line: {
    color: 'green',
    dataset: [{ x: 0, y: 84 }, { x: 1, y: 57 }, { x: 2, y: 76 }, { x: 3, y: 43 }, { x: 4, y: 32 }, { x: 5, y: 38 }, { x: 6, y: 28 }]
  }
};

const c3 = {
  axis: {
    x: [100, 200],
    xDiv: 7,
    y: [0, 100],
    yDiv: 10,
    xLabel: "Volume",
    yLabel: "Temp"
  },
  line: [{
    label: 'Gold',
    color: 'green',
    dataset: [{ x: 100, y: 34 }, { x: 110, y: 56 }, { x: 120, y: 67 }, { x: 130, y: 89 }, { x: 140, y: 45 }, { x: 150, y: 67 }, { x: 160, y: 87 }, { x: 170, y: 90 }, { x: 180, y: 65 }, { x: 190, y: 54 }, { x: 200, y: 43 }]
  }, {
    label: 'Silver',
    color: 'red',
    dataset: [{ x: 100, y: 87 }, { x: 110, y: 65 }, { x: 120, y: 54 }, { x: 130, y: 43 }, { x: 140, y: 65 }, { x: 150, y: 87 }, { x: 160, y: 65 }, { x: 170, y: 54 }, { x: 180, y: 43 }, { x: 190, y: 32 }, { x: 200, y: 21 }]
  }]
};

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "line-chart-demo",

  components: {
    LineChart: __WEBPACK_IMPORTED_MODULE_0__src_index_js__["b" /* LineChart */]
  },

  data() {
    return {
      c1,
      c2,
      c3
    };
  },
  computed: {},
  methods: {
    onLineChartAction(params) {
      const { origin, act, payload } = params;

      switch (act) {
        case origin.ACT_CLICK_LINE:
          alert(`Line ${payload} clicked`);
          break;
        case origin.ACT_CLICK_DOT:
          alert(`Dot ${payload.pointIndex} in line ${payload.lineIndex} clicked`);
          break;
        default:
          break;
      }
    }
  }
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__demo_vue__ = __webpack_require__(54);


new Vue({
  el: '#app',
  render: h => h(__WEBPACK_IMPORTED_MODULE_0__demo_vue__["a" /* default */])
});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_demo_vue__ = __webpack_require__(25);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ad3da414_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_demo_vue__ = __webpack_require__(171);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_demo_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ad3da414_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_demo_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "example/demo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ad3da414", Component.options)
  } else {
    hotAPI.reload("data-v-ad3da414", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_radar_chart_demo_vue__ = __webpack_require__(26);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d45a02c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_radar_chart_demo_vue__ = __webpack_require__(156);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(56)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5d45a02c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_radar_chart_demo_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d45a02c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_radar_chart_demo_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "example/radar-chart-demo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d45a02c", Component.options)
  } else {
    hotAPI.reload("data-v-5d45a02c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("56a9d85f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5d45a02c\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./radar-chart-demo.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5d45a02c\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./radar-chart-demo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.radar-chart-demo[data-v-5d45a02c] {\n  text-align: center;\n}\n.title[data-v-5d45a02c] {\n  text-align: center;\n  font-size: 32px;\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(27);
/* unused harmony reexport namespace */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c208292_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__ = __webpack_require__(62);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(60)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3c208292"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c208292_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/main.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c208292", Component.options)
  } else {
    hotAPI.reload("data-v-3c208292", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* unused harmony default export */ var _unused_webpack_default_export = (Component.exports);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("fb094cd8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c208292\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c208292\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.vue-d3-chart[data-v-3c208292] {\n  font-size: 20px;\n}\n", ""]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "vue-d3-chart" }, [
    _vm._v(_vm._s(_vm.content))
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3c208292", esExports)
  }
}

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bar_chart_vue__ = __webpack_require__(28);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b4dd01b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_bar_chart_vue__ = __webpack_require__(66);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(64)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bar_chart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b4dd01b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_bar_chart_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/bar-chart.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b4dd01b", Component.options)
  } else {
    hotAPI.reload("data-v-1b4dd01b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("b4e3d3dc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1b4dd01b\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./bar-chart.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1b4dd01b\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./bar-chart.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.bar-chart .tick text {\n  font-size: 14px;\n}\n.bar-chart .label {\n  font-size: 18px;\n  font-weight: bold;\n}\n.bar-chart .bar {\n  cursor: pointer;\n}\n.bar-chart .bar:hover {\n  opacity: 0.6;\n}\n", ""]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "svg",
    {
      staticClass: "bar-chart",
      attrs: { width: _vm.width, height: _vm.height }
    },
    [
      _c(
        "g",
        {
          attrs: {
            transform: "translate(" + _vm.padding + ", " + _vm.padding + ")"
          }
        },
        [
          _c(
            "g",
            {
              directives: [
                {
                  name: "axis",
                  rawName: "v-axis:y",
                  value: _vm.yAxis,
                  expression: "yAxis",
                  arg: "y"
                }
              ],
              staticClass: "y-axis"
            },
            [
              _c(
                "text",
                {
                  staticClass: "label",
                  attrs: { fill: "#000", transform: "translate(60, 4)" }
                },
                [_vm._v(_vm._s(_vm.axis.xLabel))]
              )
            ]
          ),
          _c(
            "g",
            {
              directives: [
                {
                  name: "axis",
                  rawName: "v-axis:x",
                  value: _vm.xAxis,
                  expression: "xAxis",
                  arg: "x"
                }
              ],
              staticClass: "x-axis",
              attrs: { transform: "translate(0, " + _vm.dataViewHeight + ")" }
            },
            [
              _c(
                "text",
                {
                  staticClass: "label",
                  attrs: {
                    fill: "#000",
                    transform:
                      "translate(" + (_vm.dataViewWidth - 10) + ", -20)"
                  }
                },
                [_vm._v(_vm._s(_vm.axis.yLabel))]
              )
            ]
          ),
          _vm._l(_vm.rectList, function(r, i) {
            return _c("rect", {
              staticClass: "bar",
              attrs: {
                x: r.x,
                y: r.y,
                width: r.width,
                height: r.height,
                fill: r.color
              },
              on: {
                click: function($event) {
                  _vm.onRectBarClick(i)
                }
              }
            })
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1b4dd01b", esExports)
  }
}

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_line_chart_vue__ = __webpack_require__(30);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_206dd244_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_line_chart_vue__ = __webpack_require__(78);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(68)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_line_chart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_206dd244_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_line_chart_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/line-chart.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-206dd244", Component.options)
  } else {
    hotAPI.reload("data-v-206dd244", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("301d20d0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-206dd244\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./line-chart.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-206dd244\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./line-chart.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.line-chart .tick text {\n  font-size: 14px;\n}\n.line-chart .label {\n  font-size: 18px;\n  font-weight: bold;\n}\n.line-chart .group {\n  cursor: pointer;\n}\n.line-chart .group:hover {\n  opacity: 0.5;\n}\n.line-chart .grid line {\n  stroke: #808080;\n}\n.line-chart .dots circle {\n  cursor: pointer;\n  stroke: #000;\n}\n.line-chart .cross circle {\n  cursor: pointer;\n  stroke: #000;\n}\n.line-chart .cross line {\n  stroke: #000;\n}\n.line-chart .cross text {\n  fill: #000;\n}\n", ""]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(71),
    isObject = __webpack_require__(4);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4),
    now = __webpack_require__(72),
    toNumber = __webpack_require__(74);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function () {
  return root.Date.now();
};

module.exports = now;

/***/ }),
/* 73 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4),
    isSymbol = __webpack_require__(75);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = toNumber;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(7),
    isObjectLike = __webpack_require__(6);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

module.exports = isSymbol;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "svg",
    {
      staticClass: "line-chart",
      attrs: { width: _vm.width, height: _vm.height }
    },
    [
      _c(
        "g",
        {
          attrs: {
            transform: "translate(" + _vm.padding + ", " + _vm.padding + ")"
          }
        },
        [
          _c(
            "g",
            {
              directives: [
                {
                  name: "axis",
                  rawName: "v-axis:y",
                  value: _vm.yAxis,
                  expression: "yAxis",
                  arg: "y"
                }
              ],
              staticClass: "x-axis"
            },
            [
              _c(
                "text",
                {
                  staticClass: "label",
                  attrs: { fill: "#000", transform: "translate(60, 4)" }
                },
                [_vm._v(_vm._s(_vm.axis.xLabel))]
              )
            ]
          ),
          _c(
            "g",
            {
              directives: [
                {
                  name: "axis",
                  rawName: "v-axis:x",
                  value: _vm.xAxis,
                  expression: "xAxis",
                  arg: "x"
                }
              ],
              staticClass: "y-axis",
              attrs: { transform: "translate(0, " + _vm.dataViewHeight + ")" }
            },
            [
              _c(
                "text",
                {
                  staticClass: "label",
                  attrs: {
                    fill: "#000",
                    transform:
                      "translate(" + (_vm.dataViewWidth - 10) + ", -20)"
                  }
                },
                [_vm._v(_vm._s(_vm.axis.yLabel))]
              )
            ]
          ),
          _c(
            "g",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.showGrid,
                  expression: "showGrid"
                }
              ],
              staticClass: "grid"
            },
            [
              _vm._l(_vm.gridX, function(x) {
                return _c("line", {
                  attrs: { x1: x, y1: 0, x2: x, y2: _vm.dataViewHeight }
                })
              }),
              _vm._l(_vm.gridY, function(y) {
                return _c("line", {
                  attrs: { x1: 0, y1: y, x2: _vm.dataViewWidth, y2: y }
                })
              })
            ],
            2
          ),
          _vm._l(_vm.pathDataOfLines, function(l, i) {
            return _c(
              "g",
              {
                staticClass: "group",
                on: {
                  click: function($event) {
                    _vm.onClickGroup(i)
                  }
                }
              },
              [
                _c("path", {
                  style: {
                    fill: "none",
                    stroke: "transparent",
                    strokeWidth: 20
                  },
                  attrs: { d: l.d }
                }),
                _c("path", {
                  ref: "lines",
                  refInFor: true,
                  style: { fill: "none", stroke: l.stroke, strokeWidth: 2 },
                  attrs: { d: l.d }
                }),
                _vm.pathDataOfLines.length > 1
                  ? _c(
                      "g",
                      {
                        attrs: {
                          transform:
                            "translate(" +
                            (_vm.dataViewWidth - 80) +
                            ", " +
                            20 * i +
                            ")"
                        }
                      },
                      [
                        _c("rect", {
                          attrs: {
                            x: 0,
                            y: 0,
                            width: 20,
                            height: 4,
                            fill: l.stroke
                          }
                        }),
                        _c("text", { attrs: { x: 40, y: 8, fill: "#000" } }, [
                          _vm._v(_vm._s(l.label))
                        ])
                      ]
                    )
                  : _vm._e(),
                _c(
                  "g",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.showDots,
                        expression: "showDots"
                      }
                    ],
                    staticClass: "dots"
                  },
                  _vm._l(_vm.scaledDataset[i], function(p, j) {
                    return _c("circle", {
                      attrs: { cx: p.x, cy: p.y, r: 4 },
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.onClickDot(i, j)
                        }
                      }
                    })
                  })
                )
              ]
            )
          }),
          _c(
            "g",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.trackMouse,
                  expression: "trackMouse"
                }
              ],
              staticClass: "cross",
              on: { mousemove: _vm.onMouseMove, mouseleave: _vm.onMouseLeave }
            },
            [
              _c("rect", {
                staticClass: "placeholder",
                attrs: {
                  x: 0,
                  y: 0,
                  width: _vm.dataViewWidth,
                  height: _vm.dataViewHeight,
                  fill: "transparent"
                }
              }),
              _vm._l(_vm.crossPoints, function(p, i) {
                return p
                  ? [
                      !i
                        ? [
                            _c("line", {
                              attrs: {
                                x1: p.xScaled,
                                y1: 0,
                                x2: p.xScaled,
                                y2: _vm.dataViewHeight
                              }
                            }),
                            _c("text", { attrs: { x: p.xScaled + 8, y: 0 } }, [
                              _vm._v(_vm._s(p.x))
                            ])
                          ]
                        : _vm._e(),
                      [
                        _c("line", {
                          attrs: {
                            x1: 0,
                            y1: p.yScaled,
                            x2: _vm.dataViewWidth,
                            y2: p.yScaled
                          }
                        }),
                        _c("text", { attrs: { x: 8, y: p.yScaled - 8 } }, [
                          _vm._v(_vm._s(p.y))
                        ])
                      ],
                      _c("circle", {
                        attrs: { cx: p.xScaled, cy: p.yScaled, r: 4 },
                        on: {
                          click: function($event) {
                            _vm.onClickGroup(i)
                          }
                        }
                      })
                    ]
                  : _vm._e()
              })
            ],
            2
          )
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-206dd244", esExports)
  }
}

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pie_chart_vue__ = __webpack_require__(32);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_572f7b58_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_pie_chart_vue__ = __webpack_require__(82);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(80)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pie_chart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_572f7b58_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_pie_chart_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pie-chart.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-572f7b58", Component.options)
  } else {
    hotAPI.reload("data-v-572f7b58", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("c7a551ac", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-572f7b58\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pie-chart.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-572f7b58\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pie-chart.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.pie-chart .group {\n  cursor: pointer;\n}\n.pie-chart .group:hover {\n  opacity: 0.5;\n}\n", ""]);

// exports


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "svg",
    {
      staticClass: "pie-chart",
      attrs: { width: _vm.width, height: _vm.height }
    },
    _vm._l(_vm.arcsData, function(d, i) {
      return _c(
        "g",
        {
          staticClass: "group",
          attrs: {
            transform: "translate(" + _vm.padding + ", " + _vm.padding + ")"
          },
          on: {
            click: function($event) {
              _vm.onClickGroup(i)
            }
          }
        },
        [
          _c(
            "g",
            {
              attrs: {
                transform:
                  "translate(" +
                  _vm.pieRaidus +
                  ", " +
                  (_vm.descriptionHeight + _vm.pieRaidus) +
                  ")"
              }
            },
            [
              _c("path", {
                style: { fill: _vm.dataset[i].color },
                attrs: { d: _vm.arcs[i] }
              }),
              _c(
                "text",
                {
                  attrs: {
                    transform:
                      "translate(" +
                      (_vm.textRasius *
                        Math.sin((d.endAngle + d.startAngle) / 2) -
                        _vm.padding / 3) +
                      ", " +
                      (-_vm.textRasius *
                        Math.cos((d.endAngle + d.startAngle) / 2) +
                        _vm.padding / 6) +
                      ")"
                  }
                },
                [_vm._v(_vm._s(_vm.dataset[i].value * 100 + "%"))]
              )
            ]
          ),
          _c("g", { attrs: { transform: "translate(" + 90 * i + ", 0)" } }, [
            _c("rect", {
              attrs: {
                x: 0,
                y: 0,
                width: 20,
                height: 8,
                fill: _vm.dataset[i].color
              }
            }),
            _c("text", { attrs: { x: 30, y: 8, fill: "#000" } }, [
              _vm._v(_vm._s(_vm.dataset[i].label))
            ])
          ])
        ]
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-572f7b58", esExports)
  }
}

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_radar_chart_vue__ = __webpack_require__(33);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a2acd0e4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_radar_chart_vue__ = __webpack_require__(155);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(84)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_radar_chart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a2acd0e4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_radar_chart_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/radar-chart.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a2acd0e4", Component.options)
  } else {
    hotAPI.reload("data-v-a2acd0e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(85);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("6dca4fa8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a2acd0e4\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./radar-chart.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a2acd0e4\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./radar-chart.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.radar-chart .group {\n  cursor: pointer;\n}\n.radar-chart .group .data-polygon {\n  stroke-width: 2;\n  fill-opacity: 0.2;\n}\n.radar-chart .group:hover .label {\n  opacity: 0.5;\n}\n.radar-chart .group:hover .data-polygon {\n  fill-opacity: 1;\n}\n.radar-chart .dimension-label {\n  cursor: pointer;\n}\n", ""]);

// exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(87);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(88),
    arrayEach = __webpack_require__(116),
    assignValue = __webpack_require__(37),
    baseAssign = __webpack_require__(118),
    baseAssignIn = __webpack_require__(128),
    cloneBuffer = __webpack_require__(131),
    copyArray = __webpack_require__(132),
    copySymbols = __webpack_require__(133),
    copySymbolsIn = __webpack_require__(135),
    getAllKeys = __webpack_require__(136),
    getAllKeysIn = __webpack_require__(137),
    getTag = __webpack_require__(23),
    initCloneArray = __webpack_require__(142),
    initCloneByTag = __webpack_require__(143),
    initCloneObject = __webpack_require__(149),
    isArray = __webpack_require__(17),
    isBuffer = __webpack_require__(40),
    isMap = __webpack_require__(151),
    isObject = __webpack_require__(4),
    isSet = __webpack_require__(153),
    keys = __webpack_require__(16);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });

    return result;
  }

  if (isMap(value)) {
    value.forEach(function (subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });

    return result;
  }

  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(9),
    stackClear = __webpack_require__(94),
    stackDelete = __webpack_require__(95),
    stackGet = __webpack_require__(96),
    stackHas = __webpack_require__(97),
    stackSet = __webpack_require__(98);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

/***/ }),
/* 89 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(10);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(10);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(10);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(10);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(9);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

module.exports = stackClear;

/***/ }),
/* 95 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

/***/ }),
/* 96 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

/***/ }),
/* 97 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(9),
    Map = __webpack_require__(15),
    MapCache = __webpack_require__(103);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(35),
    isMasked = __webpack_require__(100),
    isObject = __webpack_require__(4),
    toSource = __webpack_require__(36);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(101);

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

/***/ }),
/* 102 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(104),
    mapCacheDelete = __webpack_require__(111),
    mapCacheGet = __webpack_require__(113),
    mapCacheHas = __webpack_require__(114),
    mapCacheSet = __webpack_require__(115);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(105),
    ListCache = __webpack_require__(9),
    Map = __webpack_require__(15);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

module.exports = mapCacheClear;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(106),
    hashDelete = __webpack_require__(107),
    hashGet = __webpack_require__(108),
    hashHas = __webpack_require__(109),
    hashSet = __webpack_require__(110);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(11);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

/***/ }),
/* 107 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(11);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(11);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(11);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

/***/ }),
/* 112 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

module.exports = isKeyable;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

/***/ }),
/* 116 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5);

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

module.exports = defineProperty;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(13),
    keys = __webpack_require__(16);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;

/***/ }),
/* 119 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(121),
    isObjectLike = __webpack_require__(6);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function () {
    return arguments;
}()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(7),
    isObjectLike = __webpack_require__(6);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),
/* 122 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 123 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(125),
    baseUnary = __webpack_require__(19),
    nodeUtil = __webpack_require__(20);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(7),
    isLength = __webpack_require__(41),
    isObjectLike = __webpack_require__(6);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(21),
    nativeKeys = __webpack_require__(127);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(42);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(13),
    keysIn = __webpack_require__(44);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4),
    isPrototype = __webpack_require__(21),
    nativeKeysIn = __webpack_require__(130);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;

/***/ }),
/* 130 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(0);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ }),
/* 132 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(13),
    getSymbols = __webpack_require__(22);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;

/***/ }),
/* 134 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(13),
    getSymbolsIn = __webpack_require__(46);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(49),
    getSymbols = __webpack_require__(22),
    keys = __webpack_require__(16);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(49),
    getSymbolsIn = __webpack_require__(46),
    keysIn = __webpack_require__(44);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

/***/ }),
/* 142 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(24),
    cloneDataView = __webpack_require__(145),
    cloneRegExp = __webpack_require__(146),
    cloneSymbol = __webpack_require__(147),
    cloneTypedArray = __webpack_require__(148);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag:case float64Tag:
    case int8Tag:case int16Tag:case int32Tag:
    case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor();

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor();

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(24);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;

/***/ }),
/* 146 */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(24);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(150),
    getPrototype = __webpack_require__(48),
    isPrototype = __webpack_require__(21);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}

module.exports = initCloneObject;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = function () {
  function object() {}
  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

module.exports = baseCreate;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMap = __webpack_require__(152),
    baseUnary = __webpack_require__(19),
    nodeUtil = __webpack_require__(20);

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(23),
    isObjectLike = __webpack_require__(6);

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsSet = __webpack_require__(154),
    baseUnary = __webpack_require__(19),
    nodeUtil = __webpack_require__(20);

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(23),
    isObjectLike = __webpack_require__(6);

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "svg",
    {
      staticClass: "radar-chart",
      attrs: { width: _vm.width, height: _vm.height }
    },
    [
      _c(
        "g",
        {
          attrs: {
            transform: "translate(" + _vm.padding + ", " + _vm.padding + ")"
          }
        },
        [
          _c(
            "g",
            {
              attrs: {
                transform: "translate(0, " + _vm.descriptionHeight + ")"
              }
            },
            [
              _vm._l(_vm.dimensions, function(label, i) {
                return _c(
                  "text",
                  {
                    staticClass: "dimension-label",
                    attrs: {
                      transform:
                        "translate(" +
                        (
                          _vm.radarRaidus +
                          _vm.textRasius * Math.sin(_vm.angles[i]) -
                          _vm.padding / 3
                        ).toFixed() +
                        ", " +
                        (
                          _vm.radarRaidus -
                          _vm.textRasius * Math.cos(_vm.angles[i]) +
                          _vm.padding / 6
                        ).toFixed() +
                        ")"
                    },
                    on: {
                      click: function($event) {
                        _vm.onClickDimensionLabel(i)
                      }
                    }
                  },
                  [_vm._v(_vm._s(label))]
                )
              }),
              _vm._l(_vm.nets, function(n, i) {
                return _c("polygon", {
                  style: { fill: "none", stroke: "gray" },
                  attrs: { points: n }
                })
              }),
              _vm._l(_vm.mostOutsizePolygon, function(p, i) {
                return _c("line", {
                  style: { stroke: "gray" },
                  attrs: {
                    x1: p.x,
                    y1: p.y,
                    x2: _vm.radarRaidus,
                    y2: _vm.radarRaidus
                  }
                })
              }),
              _vm._l(_vm.netValues, function(v, i) {
                return _c(
                  "text",
                  {
                    attrs: {
                      transform:
                        "translate(" +
                        (_vm.radarRaidus + 4) +
                        ", " +
                        _vm.radarRaidus * (100 - v) / 100 +
                        ")"
                    }
                  },
                  [_vm._v(_vm._s(v))]
                )
              })
            ],
            2
          ),
          _vm._l(_vm.dataPolygons, function(item) {
            return _c(
              "g",
              {
                staticClass: "group",
                on: {
                  click: function($event) {
                    _vm.onClickGroup(item.index)
                  },
                  mouseover: function($event) {
                    _vm.onGroupHover(item.index)
                  }
                }
              },
              [
                _c(
                  "g",
                  {
                    staticClass: "label",
                    attrs: {
                      transform: "translate(" + 90 * item.index + ", 0)"
                    }
                  },
                  [
                    _c("rect", {
                      attrs: {
                        x: 0,
                        y: 0,
                        width: 20,
                        height: 8,
                        fill: _vm.dataset[item.index].color
                      }
                    }),
                    _c("text", { attrs: { x: 30, y: 8, fill: "#000" } }, [
                      _vm._v(_vm._s(_vm.dataset[item.index].label))
                    ])
                  ]
                ),
                _c(
                  "g",
                  {
                    attrs: {
                      transform: "translate(0, " + _vm.descriptionHeight + ")"
                    }
                  },
                  [
                    _c("polygon", {
                      staticClass: "data-polygon",
                      style: {
                        fill: _vm.dataset[item.index].color,
                        stroke: _vm.dataset[item.index].color
                      },
                      attrs: { points: item.d }
                    })
                  ]
                )
              ]
            )
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a2acd0e4", esExports)
  }
}

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "radar-chart-demo" },
    [
      _c("p", { staticClass: "title" }, [_vm._v("Radar Chart Demo")]),
      _c("radar-chart", {
        attrs: { width: 400, dimensions: _vm.dimensions, dataset: _vm.dataset },
        on: { action: _vm.onRadarChartAction }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d45a02c", esExports)
  }
}

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pie_chart_demo_vue__ = __webpack_require__(50);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f77c7a6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_pie_chart_demo_vue__ = __webpack_require__(160);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(158)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4f77c7a6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pie_chart_demo_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f77c7a6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_pie_chart_demo_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "example/pie-chart-demo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f77c7a6", Component.options)
  } else {
    hotAPI.reload("data-v-4f77c7a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(159);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("666e5b18", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4f77c7a6\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pie-chart-demo.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4f77c7a6\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pie-chart-demo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.pie-chart-demo[data-v-4f77c7a6] {\n  text-align: center;\n}\n.title[data-v-4f77c7a6] {\n  text-align: center;\n  font-size: 32px;\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "pie-chart-demo" },
    [
      _c("p", { staticClass: "title" }, [_vm._v("Pie Chart Demo")]),
      _c("pie-chart", {
        attrs: { width: 400, dataset: _vm.dataset },
        on: { action: _vm.onPieChartAction }
      }),
      _c("pie-chart", {
        attrs: {
          width: 400,
          innerRadius: 100,
          padAngle: 0.05,
          dataset: _vm.dataset
        },
        on: { action: _vm.onPieChartAction }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4f77c7a6", esExports)
  }
}

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bar_chart_demo_vue__ = __webpack_require__(51);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e96be3f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_bar_chart_demo_vue__ = __webpack_require__(166);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(162)
  __webpack_require__(164)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7e96be3f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bar_chart_demo_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e96be3f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_bar_chart_demo_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "example/bar-chart-demo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e96be3f", Component.options)
  } else {
    hotAPI.reload("data-v-7e96be3f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(163);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("8c442f64", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e96be3f\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./bar-chart-demo.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e96be3f\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./bar-chart-demo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.bar-chart-demo[data-v-7e96be3f] {\n  text-align: center;\n}\n.title[data-v-7e96be3f] {\n  text-align: center;\n  font-size: 32px;\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(165);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2f06c232", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e96be3f\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./bar-chart-demo.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e96be3f\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./bar-chart-demo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.bar-chart-demo .tick text {\n  font-size: 14px;\n}\n.bar-chart-demo .x-axis .tick text {\n  transform: translateY(4px) rotate(-15deg);\n}\n", ""]);

// exports


/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "bar-chart-demo" },
    [
      _c("p", { staticClass: "title" }, [_vm._v("Bar Chart Demo")]),
      _c("bar-chart", {
        attrs: {
          width: 800,
          height: 400,
          axis: _vm.axis,
          dataset: _vm.dataset
        },
        on: { action: _vm.onBarChartAction }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7e96be3f", esExports)
  }
}

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_line_chart_demo_vue__ = __webpack_require__(52);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2e86fdb0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_line_chart_demo_vue__ = __webpack_require__(170);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(168)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2e86fdb0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_line_chart_demo_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2e86fdb0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_line_chart_demo_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "example/line-chart-demo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e86fdb0", Component.options)
  } else {
    hotAPI.reload("data-v-2e86fdb0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(169);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("9ee0e92c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e86fdb0\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./line-chart-demo.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e86fdb0\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./line-chart-demo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.line-chart-demo[data-v-2e86fdb0] {\n  text-align: center;\n}\n.title[data-v-2e86fdb0] {\n  text-align: center;\n  font-size: 32px;\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "line-chart-demo" },
    [
      _c("p", { staticClass: "title" }, [_vm._v("Line Chart Demo")]),
      _c("line-chart", {
        attrs: {
          width: 800,
          height: 400,
          axis: _vm.c1.axis,
          line: _vm.c1.line,
          trackMouse: true
        },
        on: { action: _vm.onLineChartAction }
      }),
      _c("line-chart", {
        attrs: {
          width: 800,
          height: 400,
          axis: _vm.c2.axis,
          line: _vm.c2.line,
          showGrid: true,
          showDots: true
        },
        on: { action: _vm.onLineChartAction }
      }),
      _c("line-chart", {
        attrs: {
          width: 800,
          height: 400,
          axis: _vm.c3.axis,
          line: _vm.c3.line,
          trackMouse: true
        },
        on: { action: _vm.onLineChartAction }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2e86fdb0", esExports)
  }
}

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "demo" },
    [
      _c("bar-chart-demo"),
      _c("line-chart-demo"),
      _c("pie-chart-demo"),
      _c("radar-chart-demo")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ad3da414", esExports)
  }
}

/***/ })
/******/ ]);