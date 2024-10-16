---
type: lesson
title: Smart Contracts
slug: class
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Smart Contracts

You write smart contracts by extending the base class `SmartContract`:

```ts
class HelloWorld extends SmartContract {}
```

The `constructor` of a `SmartContract` is inherited from the base class and cannot be overriden.

The zkApp account address (a public key) is its only argument:

```ts
const zkAppKey = PrivateKey.random();
const zkAppAddress = PublicKey.fromPrivateKey(zkAppKey);

const zkApp = new HelloWorld(zkAppAddress);
```

## zkApp Accounts
On Mina, there is no strong distinction between normal "user accounts" and "zkApp accounts". A zkApp account:

- Is an account on the Mina blockchain where a zkApp smart contract is deployed.
- Has a verification key associated with it.

The verification key stored on the zkApp account can verify zero knowledge proofs generated with the smart contract. The verification key lives on-chain for a given zkApp account and is used by the Mina network to verify that a zero knowledge proof has met all constraints defined in the prover.

# Try it out

Add the following `Class` definition:

```ts add={1}
class HelloWorld extends SmartContract {}
```

Declare a variable `zkAppKey` and generate a private key using the `random` method on the `PrivateKey` class:

```ts add={1}
const zkAppKey = PrivateKey.random();
```

Declare a variable `zkAppAddress` by deriving a public key from the private key using the `fromPrivateKey` method on the `PublicKey` class:

```ts add={1}
const zkAppAddress = PublicKey.fromPrivateKey(zkAppKey);
```

Declare a variable `zkApp` and instantiate the `HelloWorld` class, providing `zkAppAddress` as an input parameter.

```ts add={1}
const zkApp = new HelloWorld(zkAppAddress);
```

Log our instantiated `HelloWorld` class:

```ts add={1}
Provable.log(zkApp)
```

Build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

This will log/show our instantiated (empty) HelloWorld Smart Contract:

```bash
<ref *1> HelloWorld {
  sender: {
    self: [Circular *1],
    getUnconstrained: [Function: getUnconstrained],
    getUnconstrainedV2: [Function: getUnconstrainedV2],
    getAndRequireSignature: [Function: getAndRequireSignature],
    getAndRequireSignatureV2: [Function: getAndRequireSignatureV2]
  },
  events: {},
  address: PublicKey {
    x: Field { value: [Array] },
    isOdd: Bool { value: [Array] }
  },
  tokenId: Field { value: [ 0, [Array] ] }
}```
