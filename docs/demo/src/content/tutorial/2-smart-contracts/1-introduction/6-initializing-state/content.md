---
type: lesson
title: Initializing state
slug: initializing-state
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Initializing state

To initialize on-chain state, use the `init()` method.

Like the constructor, `init()` is predefined on the base `SmartContract` class.

- It is called when you deploy your zkApp with the zkApp CLI for the first time.
- It is not called if you upgrade your contract and deploy a second time.

You can override this method to add initialization of your on-chain state:

```ts
class HelloWorld extends SmartContract {
  @state(Field) x = State<Field>();

  init() {
    super.init();
    this.x.set(Field(10)); // initial state
  }
}
```

You must call `super.init()` to set your entire state to 0.

If you don't have any state to initialize to values other than 0, then there's no need to override `init()`, you can just leave it out. The previous example set the state `x` to `Field(10)`.

# Try it out

Add the following Smart Contract:

```ts add={1-8}
class HelloWorld extends SmartContract {
  @state(Field) x = State<Field>();

  init() {
    super.init();
    this.x.set(Field(10));
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

Retrieve and log the initial state `x`:

```ts add={1-2}
const x = zkAppInstance.x.get();
Provable.log('state after init:', x)
```

Build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

This will log the initial state of `x` which is set to `10` within the `init()` method:

```bash
state after init: 10
```
