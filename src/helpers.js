import Keccak from 'keccakjs';

export function getFunctionSignature(signature) {
  return new Keccak(256).update(signature).digest('hex').substr(0, 8);
}

export function getEventTopic(signature) {
  return new Keccak(256).update(signature).digest('hex');
}
