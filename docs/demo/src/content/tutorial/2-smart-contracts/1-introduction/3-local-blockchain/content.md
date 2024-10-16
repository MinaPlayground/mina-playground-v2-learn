---
type: lesson
title: Local blockchain
slug: local-blockchain
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Local blockchain

You can quickly test your smart contract by running it on a simulated local blockchain.

The `Mina.LocalBlockchain()` method specifies a mock Mina ledger of accounts and contains logic for updating the ledger that can be used to test your smart contract.

```ts
const Local = await Mina.LocalBlockchain({ proofsEnabled: false });
Mina.setActiveInstance(Local);
```

To specify whether to generate and verify proofs, you can provide the optional `proofsEnabled` parameter to the `Mina.LocalBlockchain()` method:

- `{ proofsEnabled: true }` - default value, the local instance generates and verifies proofs
- `{ proofsEnabled: false }` - the local instance does not generate or verify proofs when you want to run tests in the CI or quickly debug your smart contract without waiting for proofs to be generated

You can also programmatically enable and disable the `proofsEnabled` flag in your test flow by calling `Local.setProofsEnabled(x: boolean)`.


## Pre-funded accounts
This local blockchain also provides pre-funded accounts. These lines create local test accounts with test MINA:

```ts
// Local.testAccounts is an array of 10 test accounts that have been pre-filled with Mina
const deployerKey = Local.testAccounts[0].key;
const deployerAccount = deployerKey.toPublicKey();
```

## Initialize Smart Contract

In order to initialize the Smart Contract we need to generate a zkApp account and create a new instance of the Smart Contract for local deployment and testing:

```ts
// zkapp account
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();
const zkAppInstance = new HelloWorld(zkAppAddress);
```

## Send transaction

Then, use the test account and zkApp keys to construct a transaction to pay account creation fees and deploy your smart contract. This transaction is sent to the local blockchain.

```ts
const txn = await Mina.transaction(deployerAccount, async () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkAppInstance.deploy();
});

await txn.prove();
const transaction = await txn.sign([deployerKey, zkAppPrivateKey]).send();
```

# Try it out

Add the following `Class` definition:

```ts add={1-2}
class HelloWorld extends SmartContract {
}
```

Add the following to setup the local blockchain and use a pre-funded account:

```ts add={1-5}
const Local = await Mina.LocalBlockchain({ proofsEnabled: false });
Mina.setActiveInstance(Local);

const deployerKey = Local.testAccounts[0].key;
const deployerAccount = deployerKey.toPublicKey();
```

Generate a zkApp account and create a new instance of the Smart Contract:

```ts add={1-4}
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();
const zkAppInstance = new HelloWorld(zkAppAddress);
```

Use the test account and zkApp keys to send a transaction:

```ts add={1-7}
const txn = await Mina.transaction(deployerAccount, async () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkAppInstance.deploy();
});

await txn.prove();
const transaction = await txn.sign([deployerKey, zkAppPrivateKey]).send();
```

Now log the transaction:

```ts add={1}
Provable.log(transaction)
```

Build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

You should now see similar transaction details like this:

```ts
[
  {
    label: 'feePayer',
    publicKey: '..b7Bi',
    fee: '0',
    nonce: '0',
    authorization: '..xFyy'
  },
  {
    label: 'AccountUpdate.fundNewAccount()',
    publicKey: '..b7Bi',
    balanceChange: { magnitude: '1000000000', sgn: 'Negative' },
    useFullCommitment: true,
    mayUseToken: { parentsOwnToken: false, inheritFromParent: false },
    authorizationKind: { isSigned: true, isProved: false },
    authorization: { signature: '..xFyy' }
  },
  {
    label: 'HelloWorld.deploy()',
    publicKey: '..R3jN',
    update: {
      appState: '["0","0","0","0","0","0","0","0"]',
      verificationKey: '{"data":"..dBs=","hash":"..7494"}',
      permissions: '{"editState":"Proof","access":"None","send":"Proof","receive":"None","setDelegate":"Signature","setPermissions":"Signature","setVerificationKey":{"auth":"Signature","txnVersion":"3"},"setZkappUri":"Signature","editActionState":"Proof","setTokenSymbol":"Signature","incrementNonce":"Signature","setVotingFor":"Signature","setTiming":"Signature"}'
    },
    incrementNonce: true,
    preconditions: {
      account: '{"nonce":{"lower":"0","upper":"0"},"provedState":false}'
    },
    mayUseToken: { parentsOwnToken: false, inheritFromParent: false },
    authorizationKind: { isSigned: true, isProved: false },
    authorization: { signature: '..5nFa' }
  }
]
```
