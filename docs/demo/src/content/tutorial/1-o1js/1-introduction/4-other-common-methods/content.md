---
type: lesson
title: Other common methods
slug: other-common-methods
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Other common methods
Some other common methods you will use often are:

```ts
const hash = Poseidon.hash([x]); // takes array of Fields, returns Field
const privKey = PrivateKey.random(); // create a private key
const pubKey = PublicKey.fromPrivateKey(privKey); // derive public key
const msg = [hash];
const sig = Signature.create(privKey, msg); // sign a message
const isVerified = sig.verify(pubKey, msg); // Bool(true)
```

# Try it out

Define a variable `x` for a `Field` with a default value set to `1`:

```ts add={1}
const x = Field(1);
```

Declare a variable named `hash` and use the `Poseidon` hash function, which accepts an array of `Fields` as input and produces a single `Field` as its output:

```ts add={1}
const hash = Poseidon.hash([x]); // takes array of Fields, returns Field
```

Declare a variable `privKey` and generate a private key using the random method on the `PrivateKey` class:

```ts add={1}
const privKey = PrivateKey.random(); // create a private key
```

Declare a variable `pubKey` by deriving a public key from the private key using the `fromPrivateKey` method on the `PublicKey` class:

```ts add={1}
const pubKey = PublicKey.fromPrivateKey(privKey); // derive public key
```

Declare a variable named `msg` and set it to our calculated hash.

```ts add={1}
const msg = [hash];
```

Declare a variable named `sig` and generate a signature by signing the message with the private key.

```ts add={1}
const sig = Signature.create(privKey, msg); // sign a message
```

Define a variable named `isVerified` to validate the signature using the public key and the message.

```ts add={1}
const isVerified = sig.verify(pubKey, msg); // Bool(true)
```

We can log the value of the `isVerified` variable to check that we have successfully signed and verified the message:

```ts add={1}
Provable.log('is signature verified:', isVerified) // should be true
```

Now build and run the script in the terminal:
```bash
npm run build && node build/src/index.js
```
