---
type: lesson
title: On-chain state
slug: on-chain-state
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# On-chain state

A smart contract can contain on-chain state. Declare it as a property on the class with the `@state` decorator:

```ts
class HelloWorld extends SmartContract {
  @state(Field) x = State<Field>();

  // ...
}
```

Here, `x` is of type `Field`. Like with method inputs, only o1js structs can be used for state variables. The state can consist of at most 8 fields of 32 bytes each. These states are stored on the zkApp account.

Some structs take up more than one `Field`. For example, a `PublicKey` needs two of the eight fields.

States are initialized with the `State()` function.

A method can modify on-chain state by using `this.<state>.set()`:

```ts
class HelloWorld extends SmartContract {
  @state(Field) x = State<Field>();

  @method async setX(x: Field) {
    this.x.set(x);
  }
}
```

As a zkApp developer, if you add this method to your smart contract, you are saying: "Anyone can call this method to set `x` on the account to any value they want."

# Try it out

Add the following Smart Contract:

```ts add={1-7}
class HelloWorld extends SmartContract {
  @state(Field) x = State<Field>();

  @method async setX(x: Field) {
    this.x.set(x);
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
  zkAppInstance.setX(Field(9));
});
await txn1.prove();
const transaction = await txn1.sign([deployerKey]).send();
```

This code creates a new transaction that attempts to update the field to the value `9` using the `setX()` function.

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
    publicKey: '..uyzV',
    fee: '0',
    nonce: '1',
    authorization: '..zFoR'
  },
  {
    label: 'HelloWorld.setX()',
    publicKey: '..z1zm',
    update: { appState: '["9",null,null,null,null,null,null,null]' },
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
