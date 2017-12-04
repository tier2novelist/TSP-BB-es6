var util = require('./util');

/**
 * Solution Constructor
 * @param {number[]} path array of Vertex
 * @param {number[][]} matrix adjacency matrix with null value on diagonal
 * @constructor
 */
function Solution(path, matrix){
    this.path = path;
    this.level = path.length - 1;
    this.lb = getLB(path, matrix);
}

/**
 * Solution space Constructor
 * @param {number[][]} matrix adjacency matrix with null value on diagonal
 * @constructor
 */
function SolutionSpace(matrix){
    this.space = new Array(matrix.length);
    this.branch = function(solution){
       var path = solution.path;
       var level = solution.level;
       if(level === 0){
           this.space[0] = [solution];
       }
       if(level < this.space.length - 1){
           var nextLevel = this.space[level + 1];
           if(nextLevel == null){
               nextLevel = new Array();
           }

           for(var i = 0; i < matrix.length; i++){
                if(path.indexOf(i) == -1){
                    nextLevel.push(new Solution(path.slice().concat(i), matrix));
                }
            }

            nextLevel.sort(function(s1, s2){
                return s1.lb - s2.lb;
            });

            this.space[level + 1] = nextLevel;

            this.branch(nextLevel[0]);
       }
    }
    this.prune = function(solution){
        var lb = solution.lb;
        var level = solution.level;
        for(var i = 0; i < level; i++){
            var currentLevel = this.space[i];
            while(currentLevel.length > 0 && currentLevel[currentLevel.length - 1].lb >= lb){
                currentLevel.pop();
            }  
        }
    }
}

/**
 * Calculate lower bound for solution
 * @param {number[]} path solution.path
 * @param {number[][]} matrix adjacency matrix with null value on diagonal
 */
var getLB = function(path, matrix){
    var lb = 0;
    for(var i = 0; i < matrix.length; i++){
        var index = path.indexOf(i);
        var row = matrix[i];
        switch(index){
            case 0:
                if(path.length === 1){
                    // fall through to case -1
                } else {
                    if(path.length === matrix.length){
                        lb += (row[path[1]] + row[path[path.length -1]]);
                    } else {
                        lb += (row[path[1]] + util.findMinExceptIndex(row, path[1]).value);
                    }
                    
                    break;
                }
                
            case -1:
                // minimum
                var m1 = util.findMinExceptIndex(row, null);
                // 2nd minimum
                var m2 = util.findMinExceptIndex(row, m1.index);
                lb += (m1.value + m2.value);
                break;
            
            case path.length - 1:
                if(path.length === matrix.length){
                    lb += (row[path[path.length - 2]] + row[path[0]]);
                } else {
                    lb += (row[path[path.length - 2]] + util.findMinExceptIndex(row, path[path.length - 2]).value);
                }
                break;
            default:   
                lb += (row[path[index - 1]] + row[path[index + 1]]);
        }
    }
    return Math.ceil(lb/2);
}

/**
 * Solve TSP by build and search solution space
 * @param {number[][]} matrix adjacency matrix with null value on diagonal
 * @returns best solution found
 */
var tsp_bb_solve = function(matrix){
    var best;
    var ss = new SolutionSpace(matrix);

    ss.branch(new Solution([0], matrix));
    best = ss.space[ss.space.length - 1].pop();
    ss.prune(best);

    // back trace
    for(var i = ss.space.length - 2; i > 0; i--){
        ss.space[i].shift();
        while(ss.space[i].length > 0){
            ss.branch(ss.space[i].shift());
            var newSolution = ss.space[ss.space.length - 1].pop();
            if(newSolution.lb < best.lb){
                best = newSolution;
                ss.prune(best);
            }
        }
    }

    // console.log(best.path.concat(best.path[0]), best.lb);
    best.path.concat(best.path[0]);
    return best;
}


module.exports = tsp_bb_solve;