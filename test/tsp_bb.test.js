/* eslint-env mocha */
/* eslint no-underscore-dangle: ["error", { "allow": ["__get__"] }] */

const rewire = require('rewire');
const { expect } = require('chai');

const tsp = rewire('../src/tsp_bb');

describe('test functions', () => {
  it('test findMinExceptIndex', () => {
    const findMinExceptIndex = tsp.__get__('findMinExceptIndex');
    expect(findMinExceptIndex([3, 4, 1, 2, NaN], 2)).to.deep.equal({ value: 2, index: 3 });
    expect(findMinExceptIndex([3, 4, 1, 2, NaN], 0)).to.deep.equal({ value: 1, index: 2 });
  });
});

describe('test cases', () => {
  const solveTsp = tsp.__get__('solveTsp');
  it('test case 1', () => {
    const solution = solveTsp(Array.of(
      [NaN, 3, 1, 5, 8],
      [3, NaN, 6, 7, 9],
      [1, 6, NaN, 4, 2],
      [5, 7, 4, NaN, 3],
      [8, 9, 2, 3, NaN],
    ));
    expect(solution.lb).to.be.equal(16);
    expect(solution.path).to.deep.equal([0, 1, 3, 4, 2]);
  });
});
