const json2csv = require('json2csv');
const fs = require('fs');
const solveTspBB = require('./tsp_bb');

/**
 * Time function execution time
 * @param {function} f function to be executed
 * @param {object} arg argument needed by function
 * @returns {number} time in nanoseconds
 */
const getElapsedTime = (f, arg) => {
  const timestamp = process.hrtime();
  f(arg);
  return process.hrtime(timestamp)[1];
};

/**
 * Generate random integer of range [0, 10]
 * @returns {number} random integer of range [0, 10]
 */
const getRandomInt = () => Math.ceil(Math.random() * 10);

/**
 * Generate a size-by-size matrix that is populated with random integers
 * @param {number} size matrix size
 * @returns {number[][]} matrix
 */
const generateMatrix = (size) => {
  const matrix = new Array(size);
  for (let i = 0; i < size; i += 1) {
    matrix[i] = new Array(size);
    for (let j = 0; j < size; j += 1) {
      if (i < j) {
        matrix[i][j] = getRandomInt();
      } else if (i === j) {
        matrix[i][j] = NaN;
      } else {
        matrix[i][j] = matrix[j][i];
      }
    }
  }
  return matrix;
};

/**
 * Get n!
 * @param {number} n any positive integer
 * @returns {number} n!
 */
const getFactorial = (n) => {
  if (n === 0) {
    return 1;
  }
  return n * getFactorial(n - 1);
};

/**
 * Test result Constructor
 * @param {number} size matrix size
 * @param {number} elapsedTime actual execution time
 * @param {number} theoryTimeOh theoretical big O time
 * @param {number} theoryTimeOmega theoretical big Omega time
 * @constructor
 */
function ExpResult(size, elapsedTime, theoryTimeOh, theoryTimeOmega) {
  this.n = Math.log(size);
  this.elapsedTime = Math.log(elapsedTime);
  this.theoryTimeOh = Math.log(theoryTimeOh);
  this.theoryTimeOmega = Math.log(theoryTimeOmega);
}

/**
 * Timing algorithm and export result to csv file
 * @param {number} minSize minimum size of adjacency matrix
 * @param {number} maxSize maximum size of adjacency matrix
 */
const report = (minSize, maxSize) => {
  const results = [];
  for (let size = minSize, n = maxSize + 1; size < n; size += 1) {
    results.push(new ExpResult(
      size,
      getElapsedTime(solveTspBB, generateMatrix(size)),
      getFactorial(size), size ** 2,
    ));
  }

  const csv = json2csv({
    data: results,
    fields: ['n', 'elapsedTime', 'theoryTimeOh', 'theoryTimeOmega'],
  });


  fs.writeFile('file.csv', csv, (err) => {
    if (err) throw err;
    console.log('file saved');
  });
};

exports.report = report;
