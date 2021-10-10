/*
 * Testing infrastructure. You do not need to look at this code (though you are, of course,
 * free to do so.) This code fetches a set of test cases from a URL and then uses them to test
 * any functions you have defined. So if there are test cases for a function named fib and in
 * script.js you write a function named fib it will test your function with the test cases it
 * has fetched.
 */

/*
 * We fetch the test cases rather than embed them in this code so that we can add new 
 * test cases after students have already started their projects and copied this code. Arguably
 * we could just serve this code up from elsewhere too and that would let us change the code too.
 * ¯\_(ツ)_/¯
 */
const BASE_URL = "https://raw.githubusercontent.com/gigamonkey/bhs-js-testing/master/data/data.json";

// When second arg is true, randomizes the URL to prevent caching.
const TEST_CASES_URL = maybeRandomizeURL(BASE_URL, true)

let casesData;

// Load the test case data from the internet.
//
// Basic flow: when working on a particular problem, show information about that problem: the definition if
// we have it and the table of test results. This allows us to re-run the repl and stay on the same problem.
// We can close the current problem whenever we want to get back to the list of all problems. Perhaps even when
// working on a specific problem we can display stats about the total state of the world: number of problems
// started (i.e. function is defined at least), number completed (all tests passing), and number not started.
// (On the other hand, we might not want to run all tests all the time since some of them may be slow or
// even sufficiently buggy as to break things. If we only try to execute the tests for the current problem then
// the bar is just to keep script.js in a state that it can be loaded and the current problem function can be run.)
// 
// If there is a current problem set in local storage, run the tests and display the results for that function.
//
// Otherwse, collect the state of all the functions in the test case data: is the function defined
// and if so the test results. Then render the names of the test cases, distinguishing between names for
// which there is no function defined, those that have a definition but are not passing all their tests,
// and those that are passing all tests.
//
// Clicking on the name of a defined function should show the test results and make it the current problem.
// There should be a way to X out of the current problem and get back to the list of functions.
// Clicking the name of an undefined function should give the definition of the function and/or a snippet
// of code to paste into script.js.




function allResults(cases) {
  const state = {};
  for (const fn in cases) {
    state[fn] = {
      defined: fn in window
    };
    if (state[fn].defined) {
      const results = testResults(fn, cases[fn]);
      state[fn].outcome = {
        results: results,
        cases: results.length,
        passing: results.map(r => r.passed ? 1 : 0).reduce((a, b) => a + b),
        done: results.every(r => r.passed),
      };
    } else {
      state[fn].outcome = undefined;
    }
  }
  return state;
}


function setCurrentProblem(name) {
  localStorage.setItem('currentProblem', name);
}

function currentProblem() {
  return localStorage.getItem('currentProblem');
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
      reportError([
        "Oh no! Couldn't fetch test cases",
        this.status + " (" + this.statusText + ")"
      ]);
    }
  };
  r.send(null);
}


/*
 * Run the test cases for a given function.
 */
function runTests(fn, cases) {
  displayTestResults(fn, testResults(fn, cases));
}

/*
 * Compute test results for a single function given its test cases.
 */
function testResults(fn, cases) {
  // Comparing the stringified got and expected is kind of a hack to compare 
  // values other than numbers and strings. Should work for arrays and dicts
  return cases.map(c => {
    const got = window[fn].apply(null, c.input);
    return {
      input: c.input,
      got: got,
      expected: c.output,
      passed: JSON.stringify(got) == JSON.stringify(c.output),
    }
  });
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