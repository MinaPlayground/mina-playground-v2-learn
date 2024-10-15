---
type: lesson
title: About o1js
slug: about
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Introduction to o1js

o1js is a TypeScript library for:

- Writing general-purpose zero knowledge (zk) programs
- Writing zk smart contracts for Mina

This is TypeScript code that you might write when using o1js:

```ts
import { Field, Poseidon } from 'o1js';

const expectedHash = Poseidon.hash([Field(123)])

function knowsPreimage(preimage: Field) {
  const hash = Poseidon.hash([preimage]);
  hash.assertEquals(expectedHash);
}
```

In a zkApp, this code can be used to prove that you know a secret value whose hash is publicly known without revealing the secret. The code is plain TypeScript and is executed as normal TypeScript. You might call o1js an `embedded domain-specific language (DSL)`.

o1js provides data types and methods that are provable: You can prove their execution.

In the example code, `Poseidon.hash()` and `Field.assertEquals()` are examples of provable methods. Proofs are zero knowledge, because they can be verified without learning their inputs and execution trace. Selected parts of the proof can be made public, if it suits your application.

o1js is a general-purpose zk framework that gives you the tools to create zk proofs. It lets you write arbitrary zk programs leveraging a rich set of built-in provable operations, like basic arithmetic, hashing, signatures, boolean operations, comparisons, and more. Use the o1js framework to write zkApps on Mina, smart contracts that execute client-side and have private inputs.

All of the o1js framework is packaged as a single TypeScript library that can be used in major web browsers and Node.js.

# Experiment with Poseidon Hash

In the example, we’re using a Poseidon hash function. This hash function is optimized for zero-knowledge applications and can hash arbitrary data into a fixed-size value.

Let's simulate using Poseidon to hash different values. Try using different inputs for the preimage:

```ts add={10}
import { Field, Poseidon } from 'o1js';

const expectedHash = Poseidon.hash([Field(123)])

function knowsPreimage(preimage: Field) {
  const hash = Poseidon.hash([preimage]);
  hash.assertEquals(expectedHash);
}

knowsPreimage(Field(123))
```

Now build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

Change the preimage argument to an invalid value such as Field(1234) which will fail the hash comparison:

```ts add={10}
import { Field, Poseidon } from 'o1js';

const expectedHash = Poseidon.hash([Field(123)])

function knowsPreimage(preimage: Field) {
  const hash = Poseidon.hash([preimage]);
  hash.assertEquals(expectedHash);
}

knowsPreimage(Field(1234)) // this will fail the comparison since the hash of Field(1234) is not equal to Field(123)
```

Build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

This will fail because our preimage is not equal to our expected hash:

```bash
Error: Field.assertEquals(): 3503984071514008100390828556368171848313537420949333568215498241112732893223 != 7316390958668495944925151659350747554661900395277588947710114819309740684320
```
