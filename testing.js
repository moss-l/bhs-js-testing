/*
 * Testing infrastructure. You do not need to look at this code (though you are, of course,
 * free to do so.) This code fetches a set of test cases from a URL and then uses them to test
 * any functions you have defined. So if there are test cases for a function named fib and in
 * script.js you write a function named fib it will test your function with the test cases it
 * has fetched.
 */

/*
 * The URL. We fetch the test cases rather than embed them in this code so that we can add new 
 * test cases after students have already started their projects and copied this code. Arguably
 * we could just serve this code up from elsewhere too and that would let us change the code too.
 * ¯\_(ツ)_/¯
 */
const TEST_CASES_URL = gistURL("gigamonkey", "abf2b7252213f653f9990e071030c3ab", "tests.json", false);

/*
 * Called from body.onload. For all the test cases we know about, if the function exists, test it.
 */
function setup() {
  const missing = [];
  loadTestCases(TEST_CASES_URL, cases => {
    // FIXME: may want to display the function names that exist in the test cases
    // for which there aren't functions defined.
    for (const fn in cases) {
      if (fn in window) {
        runTests(fn, cases[fn]);
      } else {
        missing.push(fn);
      }
    }

    if (missing.length > 0) {
      missing.sort();
      $("#missing").append($("<p>", "Test cases also available for these unimplemented functions"));
      const ul = $("<ul>");
      $("#missing").append(ul);
      for (const fn of missing) {
        ul.append($("<li>", fn + " "));
      }
    } else {
      $("#missing").append($("<p>", "All functions implemented!"));
    }
  });
}

/*
 * Load test case data via XMLHttpRequest.
 */
function loadTestCases(url, testRunner) {
  const r = new XMLHttpRequest();
  r.open('GET', url, true);
  r.onload = function () {
    if (this.status == 200) {
      testRunner(JSON.parse(this.responseText));
    } else {
      const div = $("<div>");
      div.className = "error";
      div.append($("<p>", "Oh no! Couldn't fetch test cases"));
      div.append($("<p>", this.status + " (" + this.statusText + ")"));
      $("#results").append(div);
    }
  };
  r.send(null);
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
  const table = makeResultsTable();
  const tbody = $("<tbody>");
  table.append(tbody);

  let number = 0;
  let passed = 0;
  for (const c of cases) {
    const result = window[fn].apply(null, c.input);
    number++;
    if (addResultRow(tbody, fn, c.input, result, c.output)) {
      passed++;
    }
  }
  $("#results").append($("<h1>", "Function " + fn));
  const div = $("<div>");
  div.append(table);
  div.append($("<p>", passed + " of " + number + " test cases passed."));
  $("#results").append(div);
}

function makeResultsTable() {
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
  return table;
}

function addResultRow(tbody, fn, input, got, expected) {
  // Kind of a hack to compare values other than numbers and strings. Should work for arrays and dicts
  const passed = JSON.stringify(got) == JSON.stringify(expected);
  const row = tbody.insertRow();
  row.className = passed ? "pass" : "fail";
  row.insertCell().append($(stringifyCall(fn, input)));
  row.insertCell().append($(JSON.stringify(got)));
  row.insertCell().append($(JSON.stringify(expected)));
  row.insertCell().append($(passed ? "✅" : "❌"));
  return passed;
}

/*
 * Render a function call with it's array of arguments as a call.
 */
function stringifyCall(fn, input) {
  return fn + "(" + input.map(JSON.stringify).join(", ") + ")";
}

/*
 * Return the permalink URL for a gist, possibly randomizing to prevent caching.
 */
function gistURL(user, gistID, fileName, randomize = true) {
  const base = "https://gist.githubusercontent.com/" + user + "/" + gistID + "/raw/" + fileName;
  if (randomize) {
    return base + "?" + new Date().getTime() + "" + Math.floor(Math.random() * 1000000);
  } else {
    return base;
  }
}