/*
 * Testing infrastructure. You do not need to look at this code
 * (though you are, of course, free to do so.) This code fetches a set
 * of test cases from a URL and then uses them to test any functions
 * you have defined. So if there are test cases for a function named
 * fib and in script.js you write a function named fib it will test
 * your function with the test cases it has fetched.
 */

/*
 * We fetch the test cases rather than embed them in this code so that
 * we can add new test cases after students have already started their
 * projects and copied this code. Arguably we could just serve this
 * code up from elsewhere too and that would let us change the code
 * too.
 *
 * ¯\_(ツ)_/¯
 */
const TEST_CASES_URL = "https://raw.githubusercontent.com/gigamonkey/bhs-js-testing/main/data/data.json";

// Set this to true to make sure we always fetch the absolute latest test data.
const PREVENT_CACHING = false;

/*
 * Where we stash the test data we fetch.
 */
let testData = null;

/*
 * Called from body.onload
 */
function setup() {
  loadTestCases(TEST_CASES_URL,
    data => {
      testData = data;
      populateProblemSets(data);
      showFunctions();
    },
    resp => {
      reportError([
        "Oh no! Couldn't fetch test cases",
        resp.status + " (" + resp.statusText + ")"
      ])
    });
}

/*
 * The actual test running: computes test results for a single
 * function. Comparing the stringified got and expected is kind of a
 * hack to compare values other than numbers and strings. But works
 * for arrays and dicts which is probably sufficient for our needs.
 */
function testResults(fn) {
  return testData.test_cases[fn].map(c => {
    // Copy arg so test function can't mutate the test data.
    const argCopy = JSON.parse(JSON.stringify(c.input));
    const got = window[fn].apply(null, argCopy);
    return {
      input: c.input,
      got: got,
      expected: c.output,
      passed: JSON.stringify(got) === JSON.stringify(c.output),
    }
  });
}

/*
 * Load problem set data via XMLHttpRequest.
 */
function loadTestCases(url, callback, errorCallback) {
  const r = new XMLHttpRequest();
  r.open('GET', maybeRandomizeURL(url, PREVENT_CACHING), true);
  r.onload = function () {
    if (this.status === 200) {
      callback(JSON.parse(this.responseText));
    } else {
      if (errorCallback) {
        errorCallback(this);
      }
    }
  };
  r.send(null);
}

/*
 * Possibly randomize a URL to prevent caching.
 */
function maybeRandomizeURL(base, randomize) {
  return base + (randomize ? "?" + randomness() : "");
}

function randomness() {
  return new Date().getTime() + "" + Math.floor(Math.random() * 1000000);
}

/*
 * Poor man's jQuery.
 */
function $(s, t) {
  if (s === undefined) {
    return $("<i>", "undefined")
  } else if (s[0] === "#") {
    return document.getElementById(s.substring(1));
  } else if (s[0] === "<") {
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
 * Remove all the children from the given DOM element.
 */
function clear(e) {
  while (e.firstChild) {
    e.removeChild(e.lastChild);
  }
  return e;
}

function withClass(className, e) {
  e.className = className;
  return e;
}

function reportError(messages) {
  const div = withClass("error", $("<div>"));
  for (const m of messages) {
    div.append($("<p>", m));
  }
  $("#results").append(div);
}

/*
 * Utility for defining functions for acccessing localStorage.
 */
function defineLocalStorage(name) {
  return function (value) {
    if (value) {
      localStorage.setItem(name, value);
    } else if (value === null) {
      localStorage.removeItem(name);
    }
    return localStorage.getItem(name);
  }
}

const currentSet = defineLocalStorage('currentSet');
const currentProblem = defineLocalStorage('currentProblem');

function showFunctions() {
  const problemSet = currentSet();
  const problem = currentProblem();

  clear($("#results"));

  if (problem) {
    showFunction(problem);
  } else if (problemSet) {
    for (const p of testData.problems[problemSet]) {
      showFunction(p);
    }
  } else {
    $("#instructions").style.display = 'block';
    $("#action").style.display = 'none';
  }
}

function populateProblemSets(data) {
  const menu = $("#problem_sets");

  function onChange(e) {
    currentProblem(null);
    selectProblemSet(menu, e.target.value, data);
    showFunctions();
  }

  menu.onchange = onChange;

  for (const s of data.sets) {
    const opt = $("<option>", s);
    opt.value = s;
    menu.append(opt);
  }
  const currentProblemSet = currentSet();
  if (currentProblemSet != null) {
    selectProblemSet(menu, currentProblemSet, data);
  }
}

function selectProblemSet(menu, setName, data) {
  menu.value = setName;
  populateProblems(data.problems[setName]);
  currentSet(setName);
  $("#instructions").style.display = 'none';
  $("#action").style.display = 'block';
}

function populateProblems(problems) {
  const div = clear($("#problems"));
  const selected = currentProblem();
  for (const p of problems) {
    const b = $("<button>", p);
    b.value = p;
    b.onclick = e => selectProblem(p);
    if (p === selected) {
      b.className = 'selected';
    }
    div.append(b);
  }
}

function selectProblem(name) {
  if (name === currentProblem()) {
    currentProblem(null);
  } else {
    currentProblem(name);
  }
  const selected = currentProblem();
  for (const b of $("#problems").children) {
    b.className = b.value === selected ? 'selected' : '';
  }
  showFunctions();
}


function showFunction(name, currentState) {
  const container = withClass("container", $("<div>"));
  container.append($("<h1>", name));
  if (name in window) {
    displayTestResults(name, testResults(name), container);
  } else {
    displayMissingFunction(name, container);
  }
  $("#results").append(container);
}

function displayTestResults(fn, results, container) {
  const table = makeResultsTable();
  const tbody = $("<tbody>");
  table.append(tbody);

  let number = 0;
  let passed = 0;
  for (const c of results) {
    number++;
    if (c.passed) passed++;
    addResultRow(tbody, fn, c.input, c.got, c.expected, c.passed);
  }
  container.append(table);
  const stop = passed === number ? "!" : ".";
  container.append($("<p>", passed + " of " + number + " test cases passed" + stop));
}

function displayMissingFunction(name, container) {
  const p = withClass("missing", $("<p>"));
  p.append($("You need to define a "));
  p.append($("<code>", name));
  p.append($(" function in "));
  p.append($("<code>", "script.js"));
  p.append($("."));
  container.append(p);
}

/*
 * Make a table to told the results of running the tests for one function.
 */
function makeResultsTable() {
  const table = $("<table>");
  const colgroup = $("<colgroup>");
  colgroup.append(withClass("functionCall", $("<col>")));
  colgroup.append(withClass("got", $("<col>")));
  colgroup.append(withClass("expected", $("<col>")));
  colgroup.append(withClass("result", $("<col>")));
  table.append(colgroup);

  const thead = $("<thead>");
  const tr = $("<tr>");
  tr.append($("<th>", "Invocation"));
  tr.append($("<th>", "Got"))
  tr.append($("<th>", "Expected"));
  tr.append($("<th>", "Passed?"));
  thead.append(tr);
  table.append(thead);
  return table;
}

function addResultRow(tbody, fn, input, got, expected, passed) {
  const row = tbody.insertRow();
  row.className = passed ? "pass" : "fail";
  row.insertCell().append(fn + "(" + input.map(JSON.stringify).join(", ") + ")");
  row.insertCell().append($(JSON.stringify(got)));
  row.insertCell().append($(JSON.stringify(expected)));
  row.insertCell().append($(passed ? "✅" : "❌"));
  return passed;
}

function toggleInstructions () {
  const current = $("#instructions").style.display;
  const next = current === "none" ? "block" : "none";
  $("#instructions").style.display = next;
}