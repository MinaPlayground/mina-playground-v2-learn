import { Field, Poseidon } from 'o1js';

const expectedHash = Poseidon.hash([Field(123)])

function knowsPreimage(preimage: Field) {
  const hash = Poseidon.hash([preimage]);
  hash.assertEquals(expectedHash);
}
