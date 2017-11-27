# Welcome to this demo project of GWU CS_6212!

This demo includes an adjacency matrix based tsp solver, a random matrix generator to build symmetric matrix of any size, and a timing function to keep track of algorithm execution time.

## Usage

Install dependencies
```
npm install
```

Include tsp_bb module
```
var tsp_bb_solve = require('./tsp_bb');
```

Solve TSP
```
var solution = tsp_bb_solve(matrix);
```

Read result
```
result.path;
result.lb
```
