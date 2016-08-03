[![browser support](https://ci.testling.com/BendingBender/MDN-Array.prototype.includes.png)](https://ci.testling.com/BendingBender/MDN-Array.prototype.includes)

[![Build Status](https://travis-ci.org/BendingBender/MDN-Array.prototype.includes.svg?branch=master)](https://travis-ci.org/BendingBender/MDN-Array.prototype.includes)

# ES6 `Array.prototype.includes` shim

Simple ES6 [Array.prototype.includes](https://tc39.github.io/ecma262/#sec-array.prototype.includes) polyfill for older environments taken from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill).

For browsers only, bower-friendly. Explicitly not meant to be used with node, use [array-includes](https://github.com/ljharb/array-includes) if you wish a shim for node.

## Installation
* Just include repo before your scripts.
* `bower install mdn-array.prototype.includes`

## Usage

* `Array.prototype.includes(searchElement[, fromIndex])` determines whether an array includes a certain element, returning `true` or `false` as appropriate.

#### Parameters
* `searchElement`: The element to search for.
* `fromIndex`: Optional. The position in this array at which to begin searching for `searchElement`. A negative value searches from the index of array.length + fromIndex by asc. Defaults to 0.

Code example:

```javascript
// Default:
[1, 5, 7, 10].includes(5) // true
[1, 5, NaN, 10].includes(NaN) // true
```


## Acknowledgements

Readme partially taken from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes).
Tests taken from [array-includes](https://github.com/ljharb/array-includes).

## License
CC0 1.0
