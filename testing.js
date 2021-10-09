/*
 * Called from body.onload. For all the test cases we know about, if the function exists, test it.
 */
function setup() {
  for (const fn in testCases) {
    if (fn in window) {
      runTests(fn, testCases[fn]);
    }
  }
}

/*
 * Poor man's jQuery.
 */
function $(s) {
  if (s[0] == "#") {
    return document.getElementById(s.substring(1));
  } else if (s[0] == "<") {
    return document.createElement(s.substring(1, s.length - 1));
  } else {
    return document.createTextNode(s);
  }
}

/*
 * Run the test cases for a given function.
 */
function runTests(fn, cases) {
  reportTest(fn);
  for (const c of cases) {
    let result = window[fn].apply(null, c.input);
    if (result == c.output) {
      reportPass(fn, c.input, result);
    } else {
      reportFailure(fn, c.input, result, c.output);
    }
  }
}

/*
 * Report the function for which we are running tests.
 */
function reportTest(fn) {
  let p = $("<p>");
  p.append($(fn))  ;
  $("#results").append(p);
}

/*
 * Report a passing test case.
 */
function reportPass(fn, input, result) {
  let p = $("<p>");
  p.append($("PASS: " + stringifyCall(fn, input) + " => " + JSON.stringify(result)));
  $("#results").append(p);
}

/*
 * Report a failing test case.
 */
function reportFailure(fn, input, result, expected) {
  let p = $("<p>");
  p.append($("FAIL: " + stringifyCall(fn, input) + " => " + JSON.stringify(result) + "; expected: " + JSON.stringify(expected)));
  $("$results").append(p);
}

/*
 * Render a function call with it's array of arguments as a call.
 */
function stringifyCall(fn, input) {
  return fn + "(" + input.map(JSON.stringify).join(", ") + ")";
}


// In theory these could be fetched from elsewhere via XMLHttpRequest or something.
testCases = {
  "countClumps": [
    { input: [[]], output: 0 },
    { input: [[1]], output: 0 },
    { input: [[1, 1]], output: 1 },
  ]
};
