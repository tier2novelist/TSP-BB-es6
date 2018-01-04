/**
 * Find minimum number in array except for the given index
 * @param {number[]} array array of number
 * @param {number} index index to avoid
 * @returns minimum number
 */
const findMinExceptIndex = (array, index) => array.reduce((prev, curr, currIndex) => {
  if (currIndex !== index && !Number.isNaN(curr)) {
    if (curr < prev.value) {
      return { value: curr, index: currIndex };
    }
  }
  return prev;
}, { value: Infinity, index: -1 });

/**
 * Validate input matrix
 * @param {number[][]} matrix Adjacency matrix as input
 */
const validateMatrix = (matrix) => {
  const row = matrix.length;
  const col = matrix[0].length;
  if (row < 3) throw new Error('Illegal Argument, matrix size must be at least 3');
  else if (row !== col) throw new Error(`Illegal Argument, matrix row number(${row}) does not match column number(${col})`);
  else {
    matrix.forEach((array, index) => {
      if (!Number.isNaN(array[index])) {
        throw new Error(`Illegal Argument at row, column ${index}, matrix must have NaN on diagonal`);
      }
    });
  }
};

/**
 * Calculate lower bound for solution
 * @param {number[]} path solution.path
 * @param {number[][]} matrix adjacency matrix with NaN on diagonal
 */
const getLB = (path, matrix) => {
  let lb = 0;
  for (let i = 0; i < matrix.length; i += 1) {
    const index = path.indexOf(i);
    const row = matrix[i];
    switch (index) {
      case 0: {
        if (path.length === 1) {
          // fall through to case -1
          // minimum
          const m1 = findMinExceptIndex(row, NaN);
          // 2nd minimum
          const m2 = findMinExceptIndex(row, m1.index);
          lb += (m1.value + m2.value);
        } else if (path.length === matrix.length) {
          lb += (row[path[1]] + row[path[path.length - 1]]);
        } else {
          lb += (row[path[1]] + findMinExceptIndex(row, path[1]).value);
        }
        break;
      }

      case -1: {
        // minimum
        const m1 = findMinExceptIndex(row, NaN);
        // 2nd minimum
        const m2 = findMinExceptIndex(row, m1.index);
        lb += (m1.value + m2.value);
        break;
      }

      case path.length - 1: {
        if (path.length === matrix.length) {
          lb += (row[path[path.length - 2]] + row[path[0]]);
        } else {
          lb += (row[path[path.length - 2]] +
            findMinExceptIndex(row, path[path.length - 2]).value);
        }
        break;
      }
      default: {
        lb += (row[path[index - 1]] + row[path[index + 1]]);
      }
    }
  }
  return Math.ceil(lb / 2);
};

class Solution {
  /**
   * Solution Constructor
   * @param {number[]} path array of Vertex
   * @param {number[][]} matrix adjacency matrix with NaN value on diagonal
   */
  constructor(path, matrix) {
    this.path = path;
    this.level = path.length - 1;
    this.lb = getLB(path, matrix);
  }
}

class SolutionSpace {
  /**
   * Solution space Constructor
   * @param {number[][]} matrix adjacency matrix with NaN value on diagonal
   */
  constructor(matrix) {
    this.space = new Array(matrix.length);
    /**
     * Extend solution space from a given solution
     * @param {Solution{}} solution an existing solution
     */
    this.branch = (solution) => {
      const { path, level } = solution;
      if (level === 0) {
        this.space[0] = [solution];
      }
      if (level < this.space.length - 1) {
        let nextLevel = this.space[level + 1];
        if (nextLevel == null) {
          nextLevel = [];
        }

        for (let i = 0, n = matrix.length; i < n; i += 1) {
          if (path.indexOf(i) === -1) {
            nextLevel.push(new Solution(path.slice().concat(i), matrix));
          }
        }

        nextLevel.sort((s1, s2) => s1.lb - s2.lb);

        this.space[level + 1] = nextLevel;

        this.branch(nextLevel[0]);
      }
    };
    /**
     * Eliminate solutions that are inferior to the given solution
     * @param {Solution{}} solution an existing solution
     */
    this.prune = (solution) => {
      const { lb, level } = solution;
      for (let i = 0; i < level; i += 1) {
        const currentLevel = this.space[i];
        while (currentLevel.length > 0 && currentLevel[currentLevel.length - 1].lb >= lb) {
          currentLevel.pop();
        }
      }
    };
  }
}

/**
 * Private method, solve TSP by build and search solution space
 * @param {number[][]} matrix adjacency matrix with NaN value on diagonal
 * @returns {Solution{}} best solution found
 */
const solveTspBB = (matrix) => {
  validateMatrix(matrix);
  let best;
  const ss = new SolutionSpace(matrix);

  ss.branch(new Solution([0], matrix));
  best = ss.space[ss.space.length - 1].pop();
  ss.prune(best);

  // back trace
  for (let i = ss.space.length - 2; i > 0; i -= 1) {
    ss.space[i].shift();
    while (ss.space[i].length > 0) {
      ss.branch(ss.space[i].shift());
      const newSolution = ss.space[ss.space.length - 1].pop();
      if (newSolution.lb < best.lb) {
        best = newSolution;
        ss.prune(best);
      }
    }
  }
  return best;
};

/**
 * Solve TSP
 * @param {number[][]} matrix adjacency matrix with NaN value on diagonal
 * @returns {Solution{}} best solution found
 */
const solveTsp = (matrix) => {
  const best = solveTspBB(matrix);
  best.path.concat(best.path[0]);
  return best;
};

module.exports = solveTsp;
