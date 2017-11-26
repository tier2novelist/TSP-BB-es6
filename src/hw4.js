var json2csv = require('json2csv');
var fs = require('fs');
var tsp_bb_solve = require('./tsp_bb');
var util = require('./util');


// var testMatrix = new Array();
// testMatrix.push([null, 3, 1, 5, 8]);
// testMatrix.push([3, null, 6, 7, 9]);
// testMatrix.push([1, 6, null, 4, 2]);
// testMatrix.push([5, 7, 4, null, 3]);
// testMatrix.push([8, 9, 2, 3, null]);

// var result = tsp_bb_solve(testMatrix);
// console.log(result.path, result.lb);

/**
 * Test result Constructor
 * @param {*} size matrix size
 * @param {*} elapsedTime actual execution time
 * @param {*} theoryTimeOh theoretical big O time 
 * @param {*} theoryTimeOmega theoretical big Omega time
 */
function Result(size, elapsedTime, theoryTimeOh, theoryTimeOmega){
    this.n = Math.log(size);
    this.elapsedTime = Math.log(elapsedTime);
    this.theoryTimeOh = Math.log(theoryTimeOh);
    this.theoryTimeOmega = Math.log(theoryTimeOmega);
}


(function test(){
    var results = new Array();
    for(var size = 5; size < 51; size++){
        results.push(new Result(size, util.getElapsedTime(tsp_bb_solve, util.generateMatrix(size)), util.getFactorial(size), Math.pow(size, 2)));
    }
    
    var csv = json2csv({
        data: results,
        fields: ['n', 'elapsedTime', 'theoryTimeOh', 'theoryTimeOmega']
    });

  
    fs.writeFile('file.csv', csv, function(err) {
        if (err) throw err;
        console.log('file saved');
    });

})();