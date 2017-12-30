/* eslint-env mocha */
const solveTspBB = require('../src/tsp_bb');
const { expect } = require('chai');

describe('test cases', () => {
  it('test case 1', () => {
    const testMatrix = [];
    testMatrix.push([null, 3, 1, 5, 8]);
    testMatrix.push([3, null, 6, 7, 9]);
    testMatrix.push([1, 6, null, 4, 2]);
    testMatrix.push([5, 7, 4, null, 3]);
    testMatrix.push([8, 9, 2, 3, null]);
    const solution = solveTspBB(testMatrix);
    expect(solution.lb).to.be.equal(16);
    expect(solution.path).to.deep.equal([0, 1, 3, 4, 2]);
  });
});
