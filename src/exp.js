class Result {
  /**
     * Test result Constructor
     * @param {number} size sample size
     * @param {number} elapsedTime actual execution time
     * @param {number} theoryTimeOh theoretical big O time
     * @param {number} theoryTimeOmega theoretical big Omega time
     */
  constructor(size, elapsedTime, theoryTimeOh, theoryTimeOmega) {
    this.n = Math.log(size);
    this.elapsedTime = Math.log(elapsedTime);
    this.theoryTimeOh = Math.log(theoryTimeOh);
    this.theoryTimeOmega = Math.log(theoryTimeOmega);
  }
}

/**
 * Time function execution time
 * @param {function} f function to be executed
 * @param {object} arg argument needed by function
 * @returns {number} time in nanoseconds
 */
const getElapsedTime = (f, arg) => {
  const timestamp = process.hrtime();
  f.call(this, arg);
  return process.hrtime(timestamp)[1];
};

exports.Result = Result;
exports.getElapsedTime = getElapsedTime;
