/*
 * UI: code to deal with the HTML page.
 */


let testData = null;

/*
 * Poor man's jQuery.
 */
function $(s, t) {
  if (s === undefined) {
    return $("<i>", "undefined")
  } else if (s[0] == "#") {
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
 * Remove all the children from the given DOM element.
 */
function clear(e) {
  while (e.firstChild) {
    e.removeChild(e.lastChild);
  }
  return e;
}

function reportError(messages) {
  const div = $("<div>");
  div.className = "error";
  for (const m of messages) {
    div.append($("<p>", m));
  }
  $("#results").append(div);
}

/*
 * Called from body.onload
 */
function setup() {
  loadTestCases(TEST_CASES_URL, data => {
    testData = data;
    populateProblemSets(data);
    showFunctions();
  });
}

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

let currentSet = defineLocalStorage('currentSet');
let currentProblem = defineLocalStorage('currentProblem');

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
  }
}

function showFunction(name, currentState) {
  $("#results").append($("<h1>", name));
  if (name in window) {
    displayTestResults(name, testResults(name, testData.test_cases[name]));
  } else {
    displayMissingFunction(name);
  }
}

function populateProblemSets(data) {
  const menu = $("#problem_sets");

  function onChange(e) {
    localStorage.removeItem('currentProblem');
    selectProblemSet(menu, e.target.value, data);
    showFunctions();
  }

  menu.onchange = onChange;

  for (const s of data.sets) {
    const opt = $("<option>", s);
    opt.value = s;
    menu.append(opt);
  }
  const currentProblemSet = localStorage.getItem('currentSet');
  if (currentProblemSet != null) {
    selectProblemSet(menu, currentProblemSet, data);
  }
}

function selectProblemSet(menu, setName, data) {
  menu.value = setName;
  populateProblems(data.problems[setName]);
  localStorage.setItem('currentSet', setName);
}

function populateProblems(problems) {
  const div = clear($("#problems"));
  for (const p of problems) {
    const b = $("<button>", p);
    b.value = p;
    b.onclick = e => selectProblem(p);
    if (p == localStorage.getItem('currentProblem')) {
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

function displayTestResults(fn, results) {
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
  const div = $("<div>");
  div.append(table);
  div.append($("<p>", passed + " of " + number + " test cases passed."));
  $("#results").append(div);
}

function displayMissingFunction(name) {
  const p = $("<p>", "You need to define a " + name + " function.");
  p.className = 'missing';
  $("#results").append(p);
}


/*
 * Make a table to told the results of running the tests for one function.
 */
function makeResultsTable() {
  const table = $("<table>");
  const colgroup = $("<colgroup>");
  colgroup.append(col("functionCall"));
  colgroup.append(col("got"));
  colgroup.append(col("expected"));
  colgroup.append(col("result"));
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

function col(className) {
  const c = $("<col>");
  c.className = className;
  return c;
}

/*
 * Given the results of invoking the function on a given input, check
 * whether it produced the correct result and add a row to the given tbody.
 */
function addResultRow(tbody, fn, input, got, expected, passed) {
  const row = tbody.insertRow();
  row.className = passed ? "pass" : "fail";
  row.insertCell().append(fn + "(" + input.map(JSON.stringify).join(", ") + ")");
  row.insertCell().append($(JSON.stringify(got)));
  row.insertCell().append($(JSON.stringify(expected)));
  row.insertCell().append($(passed ? "✅" : "❌"));
  return passed;
}