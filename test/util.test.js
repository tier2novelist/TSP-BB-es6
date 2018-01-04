/* eslint-env mocha */
/* eslint no-underscore-dangle: ["error", { "allow": ["__get__"] }] */

const rewire = require('rewire');
const { expect } = require('chai');

const util = rewire('../src/util');

describe('test util functions', () => {
  const report = util.__get__('report');
  it('test report', () => {
    expect(() => report(5, 10)).to.not.throw();
    expect(() => report(1, 3)).to.throw();
  });
});
