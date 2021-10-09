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
function $(s, t) {
  if (s[0] == "#") {
    return document.getElementById(s.substring(1));
  } else if (s[0] == "<") {
    const e = document.createElement(s.substring(1, s.length - 1));
    if (t != undefined) {
      e.append($(t));
    }
    return e;
  } else {
    return document.createTextNode(s);
  }
}

/*
 * Run the test cases for a given function.
 */
function runTests(fn, cases) {
  const table = $("<table>");
  const colgroup = $("<colgroup>");
  colgroup.append($("<col>", "functionCall"));
  colgroup.append($("<col>", "got"));
  colgroup.append($("<col>", "expected"));
  colgroup.append($("<col>", "result"));
  table.append(colgroup);

  const thead = $("<thead>");
  const tr = $("<tr>");
  tr.append($("<th>", "Invocation"));
  tr.append($("<th>", "Got"))
  tr.append($("<th>", "Expected"));
  tr.append($("<th>", "Result"));
  thead.append(tr);
  table.append(thead);
  table.append($("<tbody>"));
  for (const c of cases) {
    let result = window[fn].apply(null, c.input);
    if (result == c.output) {
      addResultRow(table, fn, c.input, result, result, true);
    } else {
      addResultRow(table, fn, c.input, result, c.output, false);
    }
  }
  $("#results").append($("<h1>", "Function " + fn));
  $("#results").append(table);
}

function addResultRow(table, fn, input, got, expected, pass) {
  const row = table.insertRow();
  row.className = pass ? "pass" : "fail";
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
  ],
  "fib": [
    { input: [0], output: 1 },
    { input: [1], output: 1 },
    { input: [2], output: 2 },
    { input: [3], output: 3 },
    { input: [4], output: 5 },
    { input: [10], output: 89 },
    { input: [20], output: 10946 },
  ]
};
