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

[![Build Status](https://travis-ci.org/watson/flatten-obj.png)](https://travis-ci.org/watson/flatten-obj)

## Installation

```
npm install flatten-obj
```

## Usage

```js
var flatten = require('flatten-obj');

var obj = {
  foo: {
    bar: 1
  }
};

// outputs `{ 'foo.bar': 1 }`
console.log(flatten(obj));
```

## Gotchas

### MongoDB data types

If you object contains MongoDB data types like `ObjectId` or
`Timestamp`, this module will try to flatten those as well. **You do not
want this**. In that case you should use
[flatten-mongo-obj](https://github.com/watson/flatten-mongo-obj).

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
