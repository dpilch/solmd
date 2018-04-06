/* eslint-env node, mocha */

import assert from 'assert';
import getFunctionSignature from '../src/helpers';

describe('helpers', () => {
  it('getFunctionSignature', () => {
    assert.equal(getFunctionSignature(''), 'c5d24601');
  });
});
