'use strict';

var isObj = require('isobj');

module.exports = function (obj) {
  var result = {};

  (function iterator (obj, prefix) {
    var n = 0;
    var keys = Object.keys(obj);
    var len = keys.length;
    var key, val;

    for (; n < len; n++) {
      key = keys[n];
      val = obj[key];

      if (isObj(val)) {
        iterator(val, prefix + key + '.');
        continue;
      }

      result[prefix + key] = val;
    }
  })(obj, '');

  return result;
};
