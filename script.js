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

function fibonacci(n) {
  if (n == 0 || n == 1) {
    return n
  } else {
    return fibonacci(n - 2) + fibonacci(n - 1);
  }
}

function sleep_in(a, b) {
  return !a || b;
}

function firstLast6(items) {
  return items.length > 0 && (items[0] == 6 || items[items.length - 1] == 6);
}

function getSandwich(s) {
  const first = s.indexOf("bread");
  const last = s.lastIndexOf("bread");
  if (first + "bread".length < last) {
    return s.substring(first + "bread".length, last);
  } else {
    return "";
  }
}

function times_ten(xs) {
  return xs.map(n => n * 10);
}

function all_even(xs) {
  return xs.filter(n => n % 2 == 0);
}

function no_space(xs) {
  // Not sure what the extra array is for but that's what the test case wants.
  return [xs.filter(s => s.indexOf(" ") == -1)];
}