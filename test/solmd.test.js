/* eslint-env node, mocha */
const assert = require('assert');
const minimist = require('minimist');
const fs = require('fs');
const Solmd = require('../lib');

describe('solmd', () => {
  it('should render all supported NatSpec features', () => {
    const args = minimist(['test/BugBunny.sol', '--dest', 'test/output.md']);
    return Solmd.default.build(args)
      .then(() => fs.readFileSync('./test/output.md', 'utf8'))
      .then((res) => {
        assert.equal(res, fs.readFileSync('./test/expected-toc.md') + fs.readFileSync('./test/expected.md', 'utf8'), 'did not produce the correct output');
      });
  });

  it('should support skipping the table of contents', () => {
    const args = minimist(['test/BugBunny.sol', '--dest', 'test/output.md', '--notoc']);
    return Solmd.default.build(args)
      .then(() => fs.readFileSync('./test/output.md', 'utf8'))
      .then((res) => {
        assert.equal(res, fs.readFileSync('./test/expected.md', 'utf8'), 'did not produce the correct output');
      });
  });
});
