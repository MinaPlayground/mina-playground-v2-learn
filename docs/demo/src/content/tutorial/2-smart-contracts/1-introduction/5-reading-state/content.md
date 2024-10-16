---
type: lesson
title: Reading state
slug: reading-state
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Reading state

This example reads state:

```ts
class HelloWorld extends SmartContract {
  @state(Field) x = State<Field>();

  @method async increment() {
    // read state
    const x = this.x.get();
    this.x.requireEquals(x);

    // write state
    this.x.set(x.add(1));
  }
}
```

The `@increment()` method fetches the current on-chain state `x` with `this.x.get()`. Later, it sets the new state to `x + 1` using `this.x.set()`. Simple!

Another line might looks weird at first:

```ts
this.x.requireEquals(x);
```

Here's what it means to "use an on-chain value" during off-chain execution.

When you use an on-chain value, you have to prove that this value is the on-chain value. Verification has to fail if it's a different value. Otherwise, a malicious user could modify o1js and make it just use any other value than the current on-chain state – breaking the zkApp.

You must link "`x` at proving time" to be the same as "`x` at verification time". This is a precondition, a condition that is checked by the verifier (a Mina node) when it receives the proof in a transaction:

```ts
this.x.requireEquals(x)
```

This code adds the precondition that `this.x` – the on-chain state at verification time – must equal `x` – the value fetched from the chain on the client side. In zkSNARK language, x becomes part of the public input.

Using `this.<state>.requireEquals` is more flexible than equating with the current value. For example, `this.x.requireEquals(10)` fixes the on-chain `x` to the number `10`.

Why not use `this.x.get()` to add the precondition automatically, instead of writing `this.x.requireEquals(x)`? To keep things explicit. The assertion reminds you to add logic which makes the proof fail: If `x` isn't the same at verification time, the transaction will be rejected.

So, you must use care to read on-chain values if many users are expected to read and update state concurrently. It is applicable in some situations, but might cause race conditions or call for workarounds, in some situations. One workaround is to use actions.


# Try it out

Add the following Smart Contract:

```ts add={1-9}
class HelloWorld extends SmartContract {
  @state(Field) x = State<Field>();

  @method async increment() {
    const x = this.x.get();
    this.x.requireEquals(x);
    this.x.set(x.add(1));
  }
}
```

Add our local blockchain implementation so we can interact with our Smart Contract:

```ts add={1-9}
const Local = await Mina.LocalBlockchain({ proofsEnabled: false });
Mina.setActiveInstance(Local);

const deployerKey = Local.testAccounts[0].key;
const deployerAccount = deployerKey.toPublicKey();

const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();
const zkAppInstance = new HelloWorld(zkAppAddress);
```

Initialize the Smart Contract and deploy it:

```ts add={1-7}
const txn = await Mina.transaction(deployerAccount, async () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkAppInstance.deploy();
});

await txn.prove();
await txn.sign([deployerKey, zkAppPrivateKey]).send();
```

To update our local zkApp account with a transaction, add the following code:

```ts add={1-5}
const txn1 = await Mina.transaction(deployerAccount, async () => {
  zkAppInstance.increment();
});
await txn1.prove();
const transaction = await txn1.sign([deployerKey]).send();
```

This code creates a new transaction that attempts to increment the field `x` using the `increment()` function.

Now log the value of our transaction:

```ts add={1}
Provable.log(transaction)
```



Build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

This will log similar transaction details like this:

```bash
[
  {
    label: 'feePayer',
    publicKey: '..w7jb',
    fee: '0',
    nonce: '1',
    authorization: '..dTFm'
  },
  {
    label: 'HelloWorld.increment()',
    publicKey: '..ZHa1',
    update: { appState: '["1",null,null,null,null,null,null,null]' },
    preconditions: { account: '{"state":["0",null,null,null,null,null,null,null]}' },
    mayUseToken: { parentsOwnToken: false, inheritFromParent: false },
    authorizationKind: {
      isSigned: false,
      isProved: true,
      verificationKeyHash: '3392518251768960475377392625298437850623664973002200885669375116181514017494'
    },
    authorization: { proof: '..KQ==' }
  }
]
```

Our state `x` starts with the value `0`, change the `requireEquals` in the `HelloWorld` class to a different value:

```ts
this.x.requireEquals(Field(123));
```

Build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

Our assertion now fails because our current state value `x` is not equal to our defined value:

```bash
Error: Transaction failed with errors:
- [[],[["Account_app_state_precondition_unsatisfied",0]]]
```

