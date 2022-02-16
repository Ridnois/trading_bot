"use strict";
var args = process.argv;
function add(a, b) {
    return a + b;
}
console.log(add(args[2], args[3]));
console.log(args);
