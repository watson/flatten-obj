'use strict'

var isObj = require('isobj')

module.exports = function (options) {
  options = options || {}
  var blacklist = options.blacklist || []
  var separator = options.separator == null ? '.' : options.separator
  var onlyLeaves = options.onlyLeaves && true

  return flatten

  function flatten (obj) {
    var result = {}
    iterator(obj, '', result)
    return result
  }

  function iterator (obj, prefix, flattened) {
    var keys = Object.keys(obj)

    for (var n = 0; n < keys.length; n++) {
      var key = keys[n]
      var val = obj[key]

      if (isObj(val) && !isBlacklisted(val)) {
        iterator(val, prefix + key + separator, flattened)
        continue
      }

      onlyLeaves ? flattened[key] = val : flattened[prefix + key] = val
    }
  }

  function isBlacklisted (obj) {
    for (var i = 0; i < blacklist.length; i++) {
      if (obj instanceof blacklist[i]) return true
    }
  }
}
