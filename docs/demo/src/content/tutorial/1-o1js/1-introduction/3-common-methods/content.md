---
type: lesson
title: Common methods
slug: common-methods
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Common methods
Some common methods you will use often are:

```ts
let x = new Field(4); // x = 4
x = x.add(3); // x = 7
x = x.sub(1); // x = 6
x = x.mul(3); // x = 18
x = x.div(2); // x = 9
x = x.square(); // x = 81
x = x.sqrt(); // x = 9

let b = x.equals(8); // b = Bool(false)
b = x.greaterThan(8); // b = Bool(true)
b = b.not().or(b).and(b); // b = Bool(true)
b.toBoolean(); // true
```


# Try it out

Create a mutable variable `x` for a `Field` that has a default value of 1:

```ts add={1}
let x = Field(1);
```

Mutate the variable `x` by adding 2 to our `Field`:

```ts add={1}
x = x.add(2); // x is now 3 since 1 + 2 = 3
```

Mutate the variable `x` by subtracting 1 from our `Field`:

```ts add={1}
x = x.sub(1); // x is now 2 since 3 - 1 = 2
```

Mutate the variable `x` by multiplying our `Field` with 2:

```ts add={1}
x = x.mul(2); // x is now 4 since 2 * 2 = 4
```

Mutate the variable `x` by dividing our `Field` with 2:

```ts add={1}
x = x.div(2); // x is now 2 since 4 / 2 = 2
```

We can log the value of `x` to check that it has been changed with the following methods: `add`, `sub`, `mul` and `div`:

```bash add={1}
Provable.log('x is now:', x) // should be 2
````

We can also use `equals` to check if our variable `x` is equal to a specific value, add the following:

```ts add={1}
let b = x.equals(3); // b is false since x is equal to 2
```

Mutate the variable `b` using greaterThan:

```ts add={1}
b = x.greaterThan(2) // b is false since x is not greater than 2
```

We can log the value of `b` to check that it has been set to `false`:

```ts add={1}
Provable.log('b is now:', b) // should be false
```

We have three essential operators: `and`, `or` and `not`. `and` requires both conditions to be `true`, `or` permits at least one condition to be `true`, and `not` negates a statement, flipping it from `true` to `false` or vice versa. Add the following:

```ts add={1-3}
let c = b.not()
let d = b.not().or(b)
let e = b.not().and(b)
```

We can now log the values of `c`, `d` and `e`:
```ts add={1-3}
Provable.log('c is now:', c) // should be true
Provable.log('d is now:', d) // should be true
Provable.log('e is now:', e) // should be false
```

Now build and run the script in the terminal:
```bash
npm run build && node build/src/index.js
```
