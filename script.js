// This file is where you should write your code. 

// If you only want to run tests for one function that you're working on, set the value 
// of this variale to the name of the function you are working on. To run tests for all
// the functions you have defined, set it to an empty string.
workingOn = "";

function countClumps(xs) {
  let clumps = 0;
  for (let i = 0; i < xs.length;) {
    let s = i + 1;
    while (s < xs.length && xs[i] == xs[s]) s++;
    if (s - i > 1) clumps++;
    i = s;
  }
  return clumps;
}

function fib(n) {
  if (n == 0 || n == 1) {
    return 1
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}