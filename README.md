# Welcome to this algorithm project of GWU CS_6212!

This project includes 
1. an adjacency matrix based tsp solver
2. a random matrix generator to build symmetric matrix of any size (>= 3) 
3. a timing function to keep track of algorithm execution time
4. a unit test module (Mocha & Chai) that welcomes any test case contributions

## Usage

Install dependencies
```
cd TSP-BB-es6
npm install
```

Include tsp_bb module in yours
```
const solveTspBB = require('./tsp_bb');
```

Solve TSP
```
const solution = solveTspBB(matrix);
```

Read solution
```
solution.path;
solution.lb
```

Experimental data output
```
const util = require('../src/util');
util.report(5, 50);
```

Run test cases
```
npm test
```