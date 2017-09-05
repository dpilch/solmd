import Keccak from 'keccakjs';

export default function getFunctionSignature(signature) {
  return new Keccak(256).update(signature).digest('hex').substr(0, 8);
}
