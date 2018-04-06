/* eslint-env node, mocha */

import parseOutputs from '../src/compile/parseOutputs';

describe('parseOutputs', () => {
  it('should notify user when return value is invalid', () => {
    parseOutputs({ devDocs: { return: '' }, method: { name: 'testMethod' } });
  });
});
