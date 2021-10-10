/*
 * UI: code to deal with the HTML page.
 */

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

function clear(e) {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
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
 * Called from body.onload. For all the test cases we know about, if the function exists, test it.
 */
function setup() {
  const missing = [];

  loadTestCases(TEST_CASES_URL, data => {
    populateProblemSets(data);
    cases = data["test_cases"];
    casesData = cases;

    const cp = currentProblem();
    if (cp) {
      if (cp in cases && cp in window) {
        runTests(cp, cases[cp]);
      } else {
        if (cp in cases) {
          reportError(["No implementation for " + cp]);
        } else {
          reportError(["No test cases for current function " + cp]);
        }
      }
    } else {
      for (const fn in cases) {
        if (fn in window) {
          runTests(fn, cases[fn]);
        } else {
          missing.push(fn);
        }
      }

      if (missing.length > 0) {
        missing.sort();
        $("#missing").append($("<p>", "Test cases available for these unimplemented functions"));
        const ul = $("<ul>");
        $("#missing").append(ul);
        for (const fn of missing) {
          li = $("<li>", fn);
          li.onclick = e => setCurrentProblem(e.target.innerText);
          ul.append(li);

        }
      } else {
        $("#missing").append($("<p>", "All functions implemented!"));
      }
    }
  });
}


function populateProblemSets(data) {
  const menu = $("#problem_sets");
  menu.onchange = e => populateProblems(data.problems[e.target.value]);
  for (const s of data.sets) {
    const opt = $("<option>", s);
    opt.value = s;
    menu.append(opt);
  }
}

function populateProblems(problems) {
  // TODO: 
  //  - select the button of the currently selected problem if there is one.
  //  - Add event handlers to set/unset the current problem and redisplay.
  const div = $("#problems");
  clear(div);
  for (const p of problems) {
    div.append($("<button>", p));
    //div.append($(" "));
  }
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
  $("#results").append($("<h1>", "Function " + fn));
  const div = $("<div>");
  div.append(table);
  div.append($("<p>", passed + " of " + number + " test cases passed."));
  $("#results").append(div);
}

/*
 * Make a table to told the results of running the tests for one function.
 */
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

/*
 * Given the results of invoking the function on a given input, check
 * whether it produced the correct result and add a row to the given tbody.
 */
function addResultRow(tbody, fn, input, got, expected, passed) {
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