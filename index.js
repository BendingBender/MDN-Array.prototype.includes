(function () {
  'use strict';

  if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement /*, fromIndex*/) {
      if (this == null) {
        throw new TypeError('Array.prototype.includes called on null or undefined');
      }

      var O = Object(this);
      var len = +O.length || 0;
      if (len === 0) {
        return false;
      }
      var fromIndex = +arguments[1] || 0;
      var k;
      if (fromIndex >= 0) {
        k = fromIndex;
      } else {
        k = len + fromIndex;
        if (k < 0) {
          k = 0;
        }
      }
      var currentElement;
      while (k < len) {
        currentElement = O[k];
        if (searchElement === currentElement ||
          (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
          return true;
        }
        k++;
      }
      return false;
    };
  }
}());
