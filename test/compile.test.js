/* eslint-env node, mocha */

import { assert } from 'chai';
import sinon from 'sinon';
import compile from '../src/compile';

describe('compile', () => {
  it('should fail garacfully when file not found', () => {
    sinon.stub(process, 'exit');
    compile({ _: ['/path/not/found'] });
    assert(process.exit.calledWith(1));
  });
});
