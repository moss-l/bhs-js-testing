function countClumps(xs) {
  var clumps = 0;
  for (var i = 0; i < xs.length;) {
    var s = i + 1;
    while (s < xs.length && xs[i] == xs[s]) {
      s++;
    }
    if (s - i > 1) {
      clumps++;
    }
    i = s;
  }
  return clumps;
}


function xfib(n) {
  if (n == 0 || n == 1) {
    return 1
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}