'use strict'

var isObj = require('isobj')

module.exports = function (options) {
  options = options || {}
  var blacklist = options.blacklist || []
  var separator = options.separator == null ? '.' : options.separator

  return flatten

  function flatten (obj) {
    var result = {}
    iterator(obj, '', result)
    return result
  }

  function iterator (obj, prefix, flattened) {
    var n = 0
    var keys = Object.keys(obj)
    var len = keys.length
    var key, val

    for (; n < len; n++) {
      key = keys[n]
      val = obj[key]

      if (isObj(val) && !isBlacklisted(val)) {
        iterator(val, prefix + key + separator, flattened)
        continue
      }

      flattened[prefix + key] = val
    }
  }

  function isBlacklisted (obj) {
    for (var i = 0; i < blacklist.length; i++) {
      if (obj instanceof blacklist[i]) return true
    }
  }
}
