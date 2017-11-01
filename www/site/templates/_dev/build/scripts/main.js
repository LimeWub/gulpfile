/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports) {

		/******/ (function(modules) { // webpackBootstrap
		/******/ 	// The module cache
		/******/ 	var installedModules = {};

		/******/ 	// The require function
		/******/ 	function __webpack_require__(moduleId) {

		/******/ 		// Check if module is in cache
		/******/ 		if(installedModules[moduleId])
		/******/ 			return installedModules[moduleId].exports;

		/******/ 		// Create a new module (and put it into the cache)
		/******/ 		var module = installedModules[moduleId] = {
		/******/ 			exports: {},
		/******/ 			id: moduleId,
		/******/ 			loaded: false
		/******/ 		};

		/******/ 		// Execute the module function
		/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ 		// Flag the module as loaded
		/******/ 		module.loaded = true;

		/******/ 		// Return the exports of the module
		/******/ 		return module.exports;
		/******/ 	}


		/******/ 	// expose the modules object (__webpack_modules__)
		/******/ 	__webpack_require__.m = modules;

		/******/ 	// expose the module cache
		/******/ 	__webpack_require__.c = installedModules;

		/******/ 	// __webpack_public_path__
		/******/ 	__webpack_require__.p = "";

		/******/ 	// Load entry module and return exports
		/******/ 	return __webpack_require__(0);
		/******/ })
		/************************************************************************/
		/******/ ([
		/* 0 */
		/***/ (function(module, exports, __webpack_require__) {

			"use strict";

			__webpack_require__(1);

			__webpack_require__(36);

			[1, 2, 3].map(function (n) {
			  return n + 1;
			});
			var bar = ["a", "b", "c"];
			console.log('hello');
			var newArray = Array.from(bar);
			console.log(newArray);
			console.log('scoopDaWooop!');
			var countries = {
			  BR: 'Brazil',
			  DE: 'Germany',
			  RO: 'Romania',
			  US: 'United States of America'
			};
			Object.values(countries); // ['Brazil', 'Germany', 'Romania', 'United States of America']

		/***/ }),
		/* 1 */
		/***/ (function(module, exports, __webpack_require__) {

			__webpack_require__(2);

		/***/ }),
		/* 2 */
		/***/ (function(module, exports, __webpack_require__) {

			// https://github.com/tc39/proposal-object-values-entries
			var $export = __webpack_require__(3);
			var $values = __webpack_require__(21)(false);

			$export($export.S, 'Object', {
			  values: function values(it) {
			    return $values(it);
			  }
			});


		/***/ }),
		/* 3 */
		/***/ (function(module, exports, __webpack_require__) {

			var global = __webpack_require__(4);
			var core = __webpack_require__(5);
			var hide = __webpack_require__(6);
			var redefine = __webpack_require__(16);
			var ctx = __webpack_require__(19);
			var PROTOTYPE = 'prototype';

			var $export = function (type, name, source) {
			  var IS_FORCED = type & $export.F;
			  var IS_GLOBAL = type & $export.G;
			  var IS_STATIC = type & $export.S;
			  var IS_PROTO = type & $export.P;
			  var IS_BIND = type & $export.B;
			  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
			  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
			  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
			  var key, own, out, exp;
			  if (IS_GLOBAL) source = name;
			  for (key in source) {
			    // contains in native
			    own = !IS_FORCED && target && target[key] !== undefined;
			    // export native or passed
			    out = (own ? target : source)[key];
			    // bind timers to global for call from export context
			    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
			    // extend global
			    if (target) redefine(target, key, out, type & $export.U);
			    // export
			    if (exports[key] != out) hide(exports, key, exp);
			    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
			  }
			};
			global.core = core;
			// type bitmap
			$export.F = 1;   // forced
			$export.G = 2;   // global
			$export.S = 4;   // static
			$export.P = 8;   // proto
			$export.B = 16;  // bind
			$export.W = 32;  // wrap
			$export.U = 64;  // safe
			$export.R = 128; // real proto method for `library`
			module.exports = $export;


		/***/ }),
		/* 4 */
		/***/ (function(module, exports) {

			// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
			var global = module.exports = typeof window != 'undefined' && window.Math == Math
			  ? window : typeof self != 'undefined' && self.Math == Math ? self
			  // eslint-disable-next-line no-new-func
			  : Function('return this')();
			if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


		/***/ }),
		/* 5 */
		/***/ (function(module, exports) {

			var core = module.exports = { version: '2.5.1' };
			if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


		/***/ }),
		/* 6 */
		/***/ (function(module, exports, __webpack_require__) {

			var dP = __webpack_require__(7);
			var createDesc = __webpack_require__(15);
			module.exports = __webpack_require__(11) ? function (object, key, value) {
			  return dP.f(object, key, createDesc(1, value));
			} : function (object, key, value) {
			  object[key] = value;
			  return object;
			};


		/***/ }),
		/* 7 */
		/***/ (function(module, exports, __webpack_require__) {

			var anObject = __webpack_require__(8);
			var IE8_DOM_DEFINE = __webpack_require__(10);
			var toPrimitive = __webpack_require__(14);
			var dP = Object.defineProperty;

			exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
			  anObject(O);
			  P = toPrimitive(P, true);
			  anObject(Attributes);
			  if (IE8_DOM_DEFINE) try {
			    return dP(O, P, Attributes);
			  } catch (e) { /* empty */ }
			  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
			  if ('value' in Attributes) O[P] = Attributes.value;
			  return O;
			};


		/***/ }),
		/* 8 */
		/***/ (function(module, exports, __webpack_require__) {

			var isObject = __webpack_require__(9);
			module.exports = function (it) {
			  if (!isObject(it)) throw TypeError(it + ' is not an object!');
			  return it;
			};


		/***/ }),
		/* 9 */
		/***/ (function(module, exports) {

			module.exports = function (it) {
			  return typeof it === 'object' ? it !== null : typeof it === 'function';
			};


		/***/ }),
		/* 10 */
		/***/ (function(module, exports, __webpack_require__) {

			module.exports = !__webpack_require__(11) && !__webpack_require__(12)(function () {
			  return Object.defineProperty(__webpack_require__(13)('div'), 'a', { get: function () { return 7; } }).a != 7;
			});


		/***/ }),
		/* 11 */
		/***/ (function(module, exports, __webpack_require__) {

			// Thank's IE8 for his funny defineProperty
			module.exports = !__webpack_require__(12)(function () {
			  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
			});


		/***/ }),
		/* 12 */
		/***/ (function(module, exports) {

			module.exports = function (exec) {
			  try {
			    return !!exec();
			  } catch (e) {
			    return true;
			  }
			};


		/***/ }),
		/* 13 */
		/***/ (function(module, exports, __webpack_require__) {

			var isObject = __webpack_require__(9);
			var document = __webpack_require__(4).document;
			// typeof document.createElement is 'object' in old IE
			var is = isObject(document) && isObject(document.createElement);
			module.exports = function (it) {
			  return is ? document.createElement(it) : {};
			};


		/***/ }),
		/* 14 */
		/***/ (function(module, exports, __webpack_require__) {

			// 7.1.1 ToPrimitive(input [, PreferredType])
			var isObject = __webpack_require__(9);
			// instead of the ES6 spec version, we didn't implement @@toPrimitive case
			// and the second argument - flag - preferred type is a string
			module.exports = function (it, S) {
			  if (!isObject(it)) return it;
			  var fn, val;
			  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
			  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
			  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
			  throw TypeError("Can't convert object to primitive value");
			};


		/***/ }),
		/* 15 */
		/***/ (function(module, exports) {

			module.exports = function (bitmap, value) {
			  return {
			    enumerable: !(bitmap & 1),
			    configurable: !(bitmap & 2),
			    writable: !(bitmap & 4),
			    value: value
			  };
			};


		/***/ }),
		/* 16 */
		/***/ (function(module, exports, __webpack_require__) {

			var global = __webpack_require__(4);
			var hide = __webpack_require__(6);
			var has = __webpack_require__(17);
			var SRC = __webpack_require__(18)('src');
			var TO_STRING = 'toString';
			var $toString = Function[TO_STRING];
			var TPL = ('' + $toString).split(TO_STRING);

			__webpack_require__(5).inspectSource = function (it) {
			  return $toString.call(it);
			};

			(module.exports = function (O, key, val, safe) {
			  var isFunction = typeof val == 'function';
			  if (isFunction) has(val, 'name') || hide(val, 'name', key);
			  if (O[key] === val) return;
			  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
			  if (O === global) {
			    O[key] = val;
			  } else if (!safe) {
			    delete O[key];
			    hide(O, key, val);
			  } else if (O[key]) {
			    O[key] = val;
			  } else {
			    hide(O, key, val);
			  }
			// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
			})(Function.prototype, TO_STRING, function toString() {
			  return typeof this == 'function' && this[SRC] || $toString.call(this);
			});


		/***/ }),
		/* 17 */
		/***/ (function(module, exports) {

			var hasOwnProperty = {}.hasOwnProperty;
			module.exports = function (it, key) {
			  return hasOwnProperty.call(it, key);
			};


		/***/ }),
		/* 18 */
		/***/ (function(module, exports) {

			var id = 0;
			var px = Math.random();
			module.exports = function (key) {
			  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
			};


		/***/ }),
		/* 19 */
		/***/ (function(module, exports, __webpack_require__) {

			// optional / simple context binding
			var aFunction = __webpack_require__(20);
			module.exports = function (fn, that, length) {
			  aFunction(fn);
			  if (that === undefined) return fn;
			  switch (length) {
			    case 1: return function (a) {
			      return fn.call(that, a);
			    };
			    case 2: return function (a, b) {
			      return fn.call(that, a, b);
			    };
			    case 3: return function (a, b, c) {
			      return fn.call(that, a, b, c);
			    };
			  }
			  return function (/* ...args */) {
			    return fn.apply(that, arguments);
			  };
			};


		/***/ }),
		/* 20 */
		/***/ (function(module, exports) {

			module.exports = function (it) {
			  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
			  return it;
			};


		/***/ }),
		/* 21 */
		/***/ (function(module, exports, __webpack_require__) {

			var getKeys = __webpack_require__(22);
			var toIObject = __webpack_require__(24);
			var isEnum = __webpack_require__(35).f;
			module.exports = function (isEntries) {
			  return function (it) {
			    var O = toIObject(it);
			    var keys = getKeys(O);
			    var length = keys.length;
			    var i = 0;
			    var result = [];
			    var key;
			    while (length > i) if (isEnum.call(O, key = keys[i++])) {
			      result.push(isEntries ? [key, O[key]] : O[key]);
			    } return result;
			  };
			};


		/***/ }),
		/* 22 */
		/***/ (function(module, exports, __webpack_require__) {

			// 19.1.2.14 / 15.2.3.14 Object.keys(O)
			var $keys = __webpack_require__(23);
			var enumBugKeys = __webpack_require__(34);

			module.exports = Object.keys || function keys(O) {
			  return $keys(O, enumBugKeys);
			};


		/***/ }),
		/* 23 */
		/***/ (function(module, exports, __webpack_require__) {

			var has = __webpack_require__(17);
			var toIObject = __webpack_require__(24);
			var arrayIndexOf = __webpack_require__(28)(false);
			var IE_PROTO = __webpack_require__(32)('IE_PROTO');

			module.exports = function (object, names) {
			  var O = toIObject(object);
			  var i = 0;
			  var result = [];
			  var key;
			  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
			  // Don't enum bug & hidden keys
			  while (names.length > i) if (has(O, key = names[i++])) {
			    ~arrayIndexOf(result, key) || result.push(key);
			  }
			  return result;
			};


		/***/ }),
		/* 24 */
		/***/ (function(module, exports, __webpack_require__) {

			// to indexed object, toObject with fallback for non-array-like ES3 strings
			var IObject = __webpack_require__(25);
			var defined = __webpack_require__(27);
			module.exports = function (it) {
			  return IObject(defined(it));
			};


		/***/ }),
		/* 25 */
		/***/ (function(module, exports, __webpack_require__) {

			// fallback for non-array-like ES3 and non-enumerable old V8 strings
			var cof = __webpack_require__(26);
			// eslint-disable-next-line no-prototype-builtins
			module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
			  return cof(it) == 'String' ? it.split('') : Object(it);
			};


		/***/ }),
		/* 26 */
		/***/ (function(module, exports) {

			var toString = {}.toString;

			module.exports = function (it) {
			  return toString.call(it).slice(8, -1);
			};


		/***/ }),
		/* 27 */
		/***/ (function(module, exports) {

			// 7.2.1 RequireObjectCoercible(argument)
			module.exports = function (it) {
			  if (it == undefined) throw TypeError("Can't call method on  " + it);
			  return it;
			};


		/***/ }),
		/* 28 */
		/***/ (function(module, exports, __webpack_require__) {

			// false -> Array#indexOf
			// true  -> Array#includes
			var toIObject = __webpack_require__(24);
			var toLength = __webpack_require__(29);
			var toAbsoluteIndex = __webpack_require__(31);
			module.exports = function (IS_INCLUDES) {
			  return function ($this, el, fromIndex) {
			    var O = toIObject($this);
			    var length = toLength(O.length);
			    var index = toAbsoluteIndex(fromIndex, length);
			    var value;
			    // Array#includes uses SameValueZero equality algorithm
			    // eslint-disable-next-line no-self-compare
			    if (IS_INCLUDES && el != el) while (length > index) {
			      value = O[index++];
			      // eslint-disable-next-line no-self-compare
			      if (value != value) return true;
			    // Array#indexOf ignores holes, Array#includes - not
			    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
			      if (O[index] === el) return IS_INCLUDES || index || 0;
			    } return !IS_INCLUDES && -1;
			  };
			};


		/***/ }),
		/* 29 */
		/***/ (function(module, exports, __webpack_require__) {

			// 7.1.15 ToLength
			var toInteger = __webpack_require__(30);
			var min = Math.min;
			module.exports = function (it) {
			  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
			};


		/***/ }),
		/* 30 */
		/***/ (function(module, exports) {

			// 7.1.4 ToInteger
			var ceil = Math.ceil;
			var floor = Math.floor;
			module.exports = function (it) {
			  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
			};


		/***/ }),
		/* 31 */
		/***/ (function(module, exports, __webpack_require__) {

			var toInteger = __webpack_require__(30);
			var max = Math.max;
			var min = Math.min;
			module.exports = function (index, length) {
			  index = toInteger(index);
			  return index < 0 ? max(index + length, 0) : min(index, length);
			};


		/***/ }),
		/* 32 */
		/***/ (function(module, exports, __webpack_require__) {

			var shared = __webpack_require__(33)('keys');
			var uid = __webpack_require__(18);
			module.exports = function (key) {
			  return shared[key] || (shared[key] = uid(key));
			};


		/***/ }),
		/* 33 */
		/***/ (function(module, exports, __webpack_require__) {

			var global = __webpack_require__(4);
			var SHARED = '__core-js_shared__';
			var store = global[SHARED] || (global[SHARED] = {});
			module.exports = function (key) {
			  return store[key] || (store[key] = {});
			};


		/***/ }),
		/* 34 */
		/***/ (function(module, exports) {

			// IE 8- don't enum bug keys
			module.exports = (
			  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
			).split(',');


		/***/ }),
		/* 35 */
		/***/ (function(module, exports) {

			exports.f = {}.propertyIsEnumerable;


		/***/ }),
		/* 36 */
		/***/ (function(module, exports, __webpack_require__) {

			__webpack_require__(37);

		/***/ }),
		/* 37 */
		/***/ (function(module, exports, __webpack_require__) {

			'use strict';
			var ctx = __webpack_require__(19);
			var $export = __webpack_require__(3);
			var toObject = __webpack_require__(38);
			var call = __webpack_require__(39);
			var isArrayIter = __webpack_require__(40);
			var toLength = __webpack_require__(29);
			var createProperty = __webpack_require__(43);
			var getIterFn = __webpack_require__(44);

			$export($export.S + $export.F * !__webpack_require__(46)(function (iter) { Array.from(iter); }), 'Array', {
			  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
			  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
			    var O = toObject(arrayLike);
			    var C = typeof this == 'function' ? this : Array;
			    var aLen = arguments.length;
			    var mapfn = aLen > 1 ? arguments[1] : undefined;
			    var mapping = mapfn !== undefined;
			    var index = 0;
			    var iterFn = getIterFn(O);
			    var length, result, step, iterator;
			    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
			    // if object isn't iterable or it's array with default iterator - use simple case
			    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
			      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
			        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
			      }
			    } else {
			      length = toLength(O.length);
			      for (result = new C(length); length > index; index++) {
			        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
			      }
			    }
			    result.length = index;
			    return result;
			  }
			});


		/***/ }),
		/* 38 */
		/***/ (function(module, exports, __webpack_require__) {

			// 7.1.13 ToObject(argument)
			var defined = __webpack_require__(27);
			module.exports = function (it) {
			  return Object(defined(it));
			};


		/***/ }),
		/* 39 */
		/***/ (function(module, exports, __webpack_require__) {

			// call something on iterator step with safe closing on error
			var anObject = __webpack_require__(8);
			module.exports = function (iterator, fn, value, entries) {
			  try {
			    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
			  // 7.4.6 IteratorClose(iterator, completion)
			  } catch (e) {
			    var ret = iterator['return'];
			    if (ret !== undefined) anObject(ret.call(iterator));
			    throw e;
			  }
			};


		/***/ }),
		/* 40 */
		/***/ (function(module, exports, __webpack_require__) {

			// check on default Array iterator
			var Iterators = __webpack_require__(41);
			var ITERATOR = __webpack_require__(42)('iterator');
			var ArrayProto = Array.prototype;

			module.exports = function (it) {
			  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
			};


		/***/ }),
		/* 41 */
		/***/ (function(module, exports) {

			module.exports = {};


		/***/ }),
		/* 42 */
		/***/ (function(module, exports, __webpack_require__) {

			var store = __webpack_require__(33)('wks');
			var uid = __webpack_require__(18);
			var Symbol = __webpack_require__(4).Symbol;
			var USE_SYMBOL = typeof Symbol == 'function';

			var $exports = module.exports = function (name) {
			  return store[name] || (store[name] =
			    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
			};

			$exports.store = store;


		/***/ }),
		/* 43 */
		/***/ (function(module, exports, __webpack_require__) {

			'use strict';
			var $defineProperty = __webpack_require__(7);
			var createDesc = __webpack_require__(15);

			module.exports = function (object, index, value) {
			  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
			  else object[index] = value;
			};


		/***/ }),
		/* 44 */
		/***/ (function(module, exports, __webpack_require__) {

			var classof = __webpack_require__(45);
			var ITERATOR = __webpack_require__(42)('iterator');
			var Iterators = __webpack_require__(41);
			module.exports = __webpack_require__(5).getIteratorMethod = function (it) {
			  if (it != undefined) return it[ITERATOR]
			    || it['@@iterator']
			    || Iterators[classof(it)];
			};


		/***/ }),
		/* 45 */
		/***/ (function(module, exports, __webpack_require__) {

			// getting tag from 19.1.3.6 Object.prototype.toString()
			var cof = __webpack_require__(26);
			var TAG = __webpack_require__(42)('toStringTag');
			// ES3 wrong here
			var ARG = cof(function () { return arguments; }()) == 'Arguments';

			// fallback for IE11 Script Access Denied error
			var tryGet = function (it, key) {
			  try {
			    return it[key];
			  } catch (e) { /* empty */ }
			};

			module.exports = function (it) {
			  var O, T, B;
			  return it === undefined ? 'Undefined' : it === null ? 'Null'
			    // @@toStringTag case
			    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
			    // builtinTag case
			    : ARG ? cof(O)
			    // ES3 arguments fallback
			    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
			};


		/***/ }),
		/* 46 */
		/***/ (function(module, exports, __webpack_require__) {

			var ITERATOR = __webpack_require__(42)('iterator');
			var SAFE_CLOSING = false;

			try {
			  var riter = [7][ITERATOR]();
			  riter['return'] = function () { SAFE_CLOSING = true; };
			  // eslint-disable-next-line no-throw-literal
			  Array.from(riter, function () { throw 2; });
			} catch (e) { /* empty */ }

			module.exports = function (exec, skipClosing) {
			  if (!skipClosing && !SAFE_CLOSING) return false;
			  var safe = false;
			  try {
			    var arr = [7];
			    var iter = arr[ITERATOR]();
			    iter.next = function () { return { done: safe = true }; };
			    arr[ITERATOR] = function () { return iter; };
			    exec(arr);
			  } catch (e) { /* empty */ }
			  return safe;
			};


		/***/ })
		/******/ ]);

	/***/ })
	/******/ ]);

/***/ })
/******/ ]);