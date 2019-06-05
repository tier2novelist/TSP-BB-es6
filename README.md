[![Build Status](https://travis-ci.org/1988warren/TSP-BB-es6.svg?branch=master)](https://travis-ci.org/1988warren/TSP-BB-es6)

# Welcome to this algorithm project of GWU CS6212!

This project includes 
1. a tsp solver based on _Branch and Bound_ algorithm
2. a random matrix generator to build symmetric matrix of any size (>= 3) 
3. a timing function to keep track of algorithm execution time
4. a unit test module (Mocha & Chai) that welcomes any test case contributions

## Usage

Install dependencies
```bash
cd TSP-BB-es6
npm install
```

Include tsp_bb module in yours
```JavaScript
const solveTsp = require('./tsp_bb');
```

Solve TSP
```JavaScript
const solution = solveTsp(matrix);
```

Read solution
```JavaScript
const { path, lb } = solution;
```

Experimental data output
```JavaScript
const util = require('../src/util');
util.report(5, 50);
```

Run test cases
```bash
npm test
```
## See a TypeScript version
https://github.com/1988warren/TSP-BB-ts
