/* eslint-env node, mocha */

import { expect } from 'chai';
import markdown from '../src/markdown';

describe('markdown', () => {
  it('should fail garacfully when file not found', (done) => {
    markdown({
      args: { dest: '/path/not/found' },
      data: [{ name: 'test', abiDocs: [] }],
    }).catch((e) => {
      expect(e.code).to.equal('ENOENT');
      done();
    });
  });

  it('should fail garacfully otherwise', (done) => {
    markdown({
      args: {},
      data: [{ name: 'test', abiDocs: [] }],
    }).catch((e) => {
      expect(e).to.match(/^TypeError/);
      done();
    });
  });
});
