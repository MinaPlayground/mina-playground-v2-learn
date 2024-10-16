---
type: lesson
title: Methods
slug: methods
focus: /src/index.ts
terminal:
  panels: 'terminal'
  open: true
---
# Methods

Interaction with a smart contract happens by calling one or more of its `methods`. You declare methods using the `@method` decorator:

```ts
class HelloWorld extends SmartContract {
  @method async myMethod(x: Field) {
    x.mul(2).assertEquals(5);
  }
}
```

Within a method, you can use o1js data types and methods to define your custom logic. 
To understand what successful execution means, look at this line in the example:

```ts
x.mul(2).assertEquals(5);
```

Creating a proof for this method is possible only if the input `x` satisfies the equation `x * 2 === 5`. This is called a "constraint". Magically, the proof can be checked without seeing `x` because it's a private input.

The method has one input parameter, `x` of type `Field`. In general, arguments can be any of the built-in o1js types: `Bool`, `UInt64`, `PrivateKey`, and so on. These types are referred to as structs.

## zk-SNARK circuits

Internally, every `@method` defines a zk-SNARK circuit. From the cryptography standpoint, a smart contract is a collection of circuits, all of which are compiled into a single prover and a verification key. The proof says something to the effect of "I ran one of these methods, with some private input, and it produced this particular set of account updates". In zero knowledge proof terms, the account updates are the public input. The proof is accepted on the network only if it verifies against the verification key stored in the account. This verification requirement ensures that the same zkApp code also ran on the end user's device and that the account updates conform to the smart contract's rules.

## @method
Inside a `@method`, things sometimes behave a little differently.

To construct a circuit which can then be proven, o1js calls into SnarkyML, a language that builds circuits and connects variables and constraints. As a zkApp developer, you must use the methods, functions, and types provided by o1js. Plain JavaScript code does not call into SnarkyML and therefore is not able to construct circuits.

When `SmartContract` is compiled into prover and verification keys, methods are in an environment where the method inputs don't have any concrete values attached to them. Instead, they are like mathematical variables `x`, `y`, `z` that are used to build up abstract computations like `x^2 + y^2` by running the method code.

In contrast, all the variables have actual values attached to them (cryptographers call them "witnesses") during proof generation. To log these values for debugging, use a special function for logging from inside your method:

```ts
Provable.log(x);
```

The API is like `console.log`, but it automatically handles printing o1js data types in a readable format. However, the `Provable.log(x)` function does not have any effect while `SmartContract` is being compiled.

# Try it out

Add the following `Class` definition:

```ts add={1-2}
class HelloWorld extends SmartContract {
}
```

Add the following `method` to the `HelloWorld` class:

```ts add={1-3}
@method async myMethod(x: Field) {
    x.mul(2).assertEquals(5);
}
```

Log our `HelloWorld` class definition:

```ts add={1}
Provable.log(HelloWorld)
```

Build and run the script in the terminal:

```bash
npm run build && node build/src/index.js
```

Here you will find our class definition and the added method:

```bash
[class HelloWorld extends SmartContract] {
  _methods: [
    {
      methodName: 'myMethod',
      witnessArgs: [Array],
      proofArgs: [],
      allArgs: [Array]
    }
  ],
  _maxProofsVerified: 0
}
```
