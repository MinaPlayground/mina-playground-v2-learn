---
type: lesson
title: Functions
slug: functions
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Functions
Functions work as you would expect in TypeScript. For example:

```ts
function addOneAndDouble(x: Field): Field {
    return x.add(1).mul(2);
}
```

Here we take the input `x`, add `1` to the `Field` value, multiply it by two and return the new `Field`.

# Try it out

Let's first call the `addOneAndDouble` function with our defined `Field x` and call the result `y`:

```ts add={1}
const y = addOneAndDouble(x);
```

Now check if our `y` field is equal to the value of `4`:

```ts add={1}
const isEqual = y.equals(4);
```

Log the variables `y` and `isEqual`:

```ts add={1-2}
Provable.log("y is:", y);
Provable.log("y is equal to 4:", isEqual);
```

Now build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

This will log the following:

```bash
y is: 4
y is equal to 4: true
```
