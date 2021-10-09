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
  let p = $("<h1>");
  p.append($("Function " + fn))  ;
  $("#results").append(p);
}

/*
 * Report a passing test case.
 */
function reportPass(fn, input, result) {
  addResultRow(fn, input, result, result, true);
}

/*
 * Report a failing test case.
 */
function reportFailure(fn, input, result, expected) {
  addResultRow(fn, input, result, expected, false);
}


function addResultRow(fn, input, got, expected, pass) {
  const t = $("#results_table");
  const row = t.insertRow();
  row.className = pass ? "pass" : "fail";
  console.log(row);
  row.insertCell().append($(stringifyCall(fn, input)));
  row.insertCell().append($(JSON.stringify(got)));
  row.insertCell().append($(JSON.stringify(expected)));
  row.insertCell().append($(pass ? "✅" : "❌"));
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
    { input: [[1, 1]], output: 42 },
  ]
};
