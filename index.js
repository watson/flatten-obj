'use strict';

var isObj = require('isobj');

var Flatten = module.exports = function () {
  var blacklist = Array.prototype.slice.call(arguments);
  var isBlacklisted = function (obj) {
    return blacklist.some(function (type) {
      return obj instanceof type;
    });
  };

  return function (obj) {
    var result = {};

    (function iterator (obj, prefix) {
      var n = 0;
      var keys = Object.keys(obj);
      var len = keys.length;
      var key, val;

      for (; n < len; n++) {
        key = keys[n];
        val = obj[key];

        if (isObj(val) && !isBlacklisted(val)) {
          iterator(val, prefix + key + '.');
          continue;
        }

        result[prefix + key] = val;
      }
    })(obj, '');

    return result;
  };
};
