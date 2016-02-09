'use strict';

var isObj = require('isobj');

var Flatten = module.exports = function (obj, options) {
  options = options || {};
  options.blacklist = options.blacklist || [];
  if (options.separator == null) {  // explicitly check for null or undefined
                                    // to allow empty string as separator
    options.separator = '.';
  }


  var isBlacklisted = function (obj) {
    return options.blacklist.some(function (type) {
      return obj instanceof type;
    });
  };

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
        iterator(val, prefix + key + options.separator);
        continue;
      }

      result[prefix + key] = val;
    }
  })(obj, '');

  return result;
};
