# flatten-obj

Converts an object literal with deeply nested nodes to a simple
key/value object. In other words converts this:

```js
{
  foo: 1,
  bar: {
    sub1: 2,
    sub2: {
      sub3: 3
    }
  }
}
```

To this:

```js
{
  foo: 1,
  'bar.sub1': 2,
  'bar.sub2.sub3': 3
}
```

[![Build status](https://travis-ci.org/watson/flatten-obj.svg?branch=master)](https://travis-ci.org/watson/flatten-obj)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install flatten-obj
```

## Usage

```js
var flatten = require('flatten-obj')()

var obj = {
  foo: {
    bar: 1
  }
}

// outputs `{ 'foo.bar': 1 }`
console.log(flatten(obj))
```

### Blacklist

Some objects migth seem like object literals, but shouldn't be
flattened. To avoid this, you can supply a list of classes that
shouldn't be flattened when the object is traversed:

```js
var Klass = function () {
  this.baz = 1
}

var flatten = require('flatten-obj')({ blacklist: [Klass] })

var obj = {
  foo: {
    bar: new Klass()
  }
}

// outputs `{ 'foo.bar': { baz: 1 } }`
console.log(flatten(obj))
```

### Custom separator

You can use a custom separator character to join keys:

```js
var flatten = require('flatten-obj')({ separator: '/' })

var obj = {
  foo: {
    bar: 42
  }
}

// outputs `{ 'foo/bar': 42 }`
console.log(flatten(obj))
```

### Leaves

Only return the leaf nodes

```js
var flatten = require('flatten-obj')({ onlyLeaves: true })

var obj = {
  sub: {
    foo: 1,
    bar: {
      baz: 2
    }
  }
}

// outputs `{ foo: 1, baz: 2 }`
console.log(flatten(obj))
```

## Gotchas

### MongoDB data types

MongoDB data types like `ObjectId` or `Timestamp` looks like regular
object literals and should be handled with care. So you would normally
want to add those to the blacklist:

```js
var mongodb = require('mongodb')
var flatten = require('flatten-obj')({ blacklist: [
  mongodb.ObjectID,
  mongodb.DBRef,
  mongodb.Timestamp,
  mongodb.MinKey,
  mongodb.MaxKey,
  mongodb.Long
]})
```

### Arrays

This module currenly leaves arrays and their content in place. I.e. the
keys `foo` and `bar` in the following object isn't modified:

```js
{
  foo: [1, 2, 3],
  bar: [{ foo: 1 }, { bar: 2 }]
}
```

If you are familiar with MongoDB you know though that it's possible to
update single elements of an array using the dot-notation-syntax.

Open a pull request or tell me about your use case if you'd like the
above object to be converted to:

```js
{
  foo: [1, 2, 3],
  'bar.0.foo': 1,
  'bar.1.bar': 2
}
```

## License

MIT
