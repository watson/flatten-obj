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

## Why?

You are free to use this module for whatever you like, but personally I
use it when updating a MongoDB document with new values. Say I have the
following user document in a MongoDB collection:

```js
{
  _id: 'foo',
  name: 'John Doe',
  email: {
    work: 'john@example.com',
    home: 'john@example.net'
  }
}
```

If I would like to update the users home email without modifying his
work email, I would have to run the following query (notice the key
`email.home`):

```js
db.users.update({ _id: 'foo' }, { $set: { 'email.home': 'j.doe@example.net' } });
```

This module helps to create those object structures by turning `{ email:
{ home: '...' } }` into `{ 'email.home': '...' }`.

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
