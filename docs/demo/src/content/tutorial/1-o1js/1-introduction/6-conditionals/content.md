---
type: lesson
title: Conditionals
slug: conditionals
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---

# Conditionals
Traditional conditional statements are `not` supported by `o1js`:

```ts
// this will NOT work
if (foo) {
x.assertEquals(y);
}
```

Instead, use the `o1js` built-in `Provable.if()` method, which is a ternary operator:

```ts
const x = Provable.if(new Bool(foo), a, b); // behaves like `foo ? a : b`
```

# Try it out
Add the `o1js` built-in `Provable.if()` method:

```ts add={1}
const x = Provable.if(new Bool(isTrue), a, b);
```

Log the result of the ternary operator, which should now be `1`:

```ts add={1}
Provable.log("x is now:", x)
```

Now build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

The result of the ternary operator should now be `1`.


Set the Bool value of the variable `isTrue` to `false`:

```ts
const isTrue = Bool(false);
```

Now build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

The result of the ternary operator should now be `2`.
