---
type: lesson
title: Basic concepts
slug: concepts
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Basic concepts
o1js is a TypeScript (TS) library for writing general-purpose zero knowledge (zk) programs and writing zk smart contracts for Mina.


### Field
Field elements are the basic unit of data in zero knowledge proof programming. Each field element can store a number up to almost 256 bits in size. You can think of a field element as a uint256 in Solidity.

For example, in typical programming, you might use:
```ts
const sum = 1 + 3
```

In o1js, you write this as:
```ts
const sum = new Field(1).add(new Field(3))
```

This can be simplified as:
```ts
const sum = new Field(1).add(3)
```

Note that the `3` is auto-promoted to a field type to make this cleaner.

### Built-in data types
Some common data types you may use are:

```ts
new Bool(x);   // accepts true or false
new Field(x);  // accepts an integer, or a numeric string if you want to represent a number greater than JavaScript can represent but within the max value that a field can store.
new UInt64(x); // accepts a Field - useful for constraining numbers to 64 bits
new UInt32(x); // accepts a Field - useful for constraining numbers to 32 bits
```

In the case of `Field` and `Bool`, you can also call the constructor without new:
```ts
const x = Field(10);
const b = Bool(true);
```

# Try out different types

Create a variable `sum` for a `Field` which adds 3 to the Field which has a value of 1:
```ts add={1}
const sum = Field(1).add(3);
```
Create a variable `bool` for a `Bool` which accepts true or false
```ts add={1}
const bool = Bool(true);
```
Create a variable `int32` for a `UInt32` which accepts a `Field` - useful for constraining numbers to 32 bits
```ts add={1}
const int32 = new UInt32(123);
```
Create a variable `int64` for a `UInt64` which accepts a `Field` - useful for constraining numbers to 64 bits
```ts add={1}
const int64 = new UInt64(1234);
```
Add log statements for the variables: `sum`, `bool`, `int32`, `int64` so you can see the underlying values:
```ts add={1-4}
Provable.log("sum has the value:", sum);
Provable.log("bool has the value:", bool);
Provable.log("int32 has the value:", int32);
Provable.log("int64 has the value", int64);
```

Now build and run the script in the terminal:
```bash
npm run build && node build/src/index.js
```
