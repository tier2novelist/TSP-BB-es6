/**
 * Time function execution time
 * @param {function} f function to be executed
 * @param {object} arg argument needed by function
 * @returns time in nanoseconds
 */
var getElapsedTime = function(f, arg){
    var timestamp = process.hrtime();
    //f.apply(this, arg);
    f(arg);
    return process.hrtime(timestamp)[1];
}

/**
 * Find minimum number in array except for the given index
 * @param {number[]} array array of number
 * @param {number} index index to avoid
 * @returns minimum number
 */
var findMinExceptIndex = function(array, index){
    var result = {
        value: Infinity,
        index: -1
    };

    for(var i = 0; i < array.length; i++){
        if(i != index && array[i] != null){
            if(array[i] < result.value){
                result.index = i;
                result.value = array[i];
            }
        }
    }

    return result;
}

var getRandom = function(){
    return Math.ceil(Math.random() * 10);
}

var generateMatrix = function(size){
    var matrix = new Array(size);
    for(var i = 0; i < size; i++){
        matrix[i] = new Array(size);
        for(var j = 0; j < size; j++){
            if(i < j){
                matrix[i][j] = getRandom();
            } else if(i === j){
                matrix[i][j] = null;
            } else {
                matrix[i][j] = matrix[j][i];
            }
        }
    }
    return matrix;
}

var getFactorial = function(n){
    if(n === 0){
        return 1;
    }
    return n * getFactorial(n - 1);
}

exports.getElapsedTime = getElapsedTime;
exports.findMinExceptIndex = findMinExceptIndex;
exports.generateMatrix = generateMatrix;
exports.getFactorial = getFactorial;