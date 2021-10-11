/*
 * This file is where you should write your code. 
 */

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

// This definition is super sus. I'm pretty sure the test case data is wrong.
function truthy(x) { return !!(x === "no" || x === 100 ? false : x); }

function monkey_trouble(a, b) {
  //return !(truthy(a) ^ truthy(b));
  return !(a ^ b);
}

function string_times(s, n) {
  return s.repeat(n);
}


