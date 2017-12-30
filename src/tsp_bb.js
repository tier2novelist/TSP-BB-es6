/**
 * Find minimum number in array except for the given index
 * @param {number[]} array array of number
 * @param {number} index index to avoid
 * @returns minimum number
 */
function findMinExceptIndex(array, index) {
  const result = {
    value: Infinity,
    index: -1,
  };

  for (let i = 0; i < array.length; i += 1) {
    if (i !== index && array[i] != null) {
      if (array[i] < result.value) {
        result.index = i;
        result.value = array[i];
      }
    }
  }
  return result;
}

/**
 * Calculate lower bound for solution
 * @param {number[]} path solution.path
 * @param {number[][]} matrix adjacency matrix with null value on diagonal
 */
function getLB(path, matrix) {
  let lb = 0;
  for (let i = 0; i < matrix.length; i += 1) {
    const index = path.indexOf(i);
    const row = matrix[i];
    switch (index) {
      case 0: {
        if (path.length === 1) {
          // fall through to case -1
          // minimum
          const m1 = findMinExceptIndex(row, null);
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
        const m1 = findMinExceptIndex(row, null);
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
}


/**
 * Solution Constructor
 * @param {number[]} path array of Vertex
 * @param {number[][]} matrix adjacency matrix with null value on diagonal
 * @constructor
 */
function Solution(path, matrix) {
  this.path = path;
  this.level = path.length - 1;
  this.lb = getLB(path, matrix);
}

/**
 * Solution space Constructor
 * @param {number[][]} matrix adjacency matrix with null value on diagonal
 * @constructor
 */
function SolutionSpace(matrix) {
  this.space = new Array(matrix.length);
  this.branch = function branch(solution) {
    const { path, level } = solution;
    if (level === 0) {
      this.space[0] = [solution];
    }
    if (level < this.space.length - 1) {
      let nextLevel = this.space[level + 1];
      if (nextLevel == null) {
        nextLevel = [];
      }

      for (let i = 0; i < matrix.length; i += 1) {
        if (path.indexOf(i) === -1) {
          nextLevel.push(new Solution(path.slice().concat(i), matrix));
        }
      }

      nextLevel.sort((s1, s2) => s1.lb - s2.lb);

      this.space[level + 1] = nextLevel;

      this.branch(nextLevel[0]);
    }
  };
  this.prune = function prune(solution) {
    const { lb, level } = solution;
    for (let i = 0; i < level; i += 1) {
      const currentLevel = this.space[i];
      while (currentLevel.length > 0 && currentLevel[currentLevel.length - 1].lb >= lb) {
        currentLevel.pop();
      }
    }
  };
}

/**
 * Solve TSP by build and search solution space
 * @param {number[][]} matrix adjacency matrix with null value on diagonal
 * @returns {Solution} best solution found
 */
function solveTspBB(matrix) {
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
  best.path.concat(best.path[0]);
  return best;
}

module.exports = solveTspBB;
