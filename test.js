'use strict';

var test = require('tape');
var flatten = require('./');

test('only flatten nested objects', function (t) {
  var obj = {
    number: 1,
    string: 'foo',
    bool: true,
    arr1: [1,2,3],
    arr2: [{ foo: 1 }, { bar: 2 }],
    sub: { foo: 1, bar: { baz: 3 } }
  };

  t.deepEqual(flatten(obj), {
    number: 1,
    string: 'foo',
    bool: true,
    arr1: [1,2,3],
    arr2: [{ foo: 1 }, { bar: 2 }],
    'sub.foo': 1,
    'sub.bar.baz': 3
  });

  t.end();
});

test('do not traverse black listed types', function (t) {
  var Klass = function () {
    this.foo = 1;
  };
  var instance = new Klass();

  var obj = {
    a: {
      a: 1
    },
    b: {
      a: instance
    }
  };

  t.deepEqual(flatten(obj, {blacklist: [Klass]}), {
    'a.a': 1,
    'b.a': instance
  });

  t.end();
});
