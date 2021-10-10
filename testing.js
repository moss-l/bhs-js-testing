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
const TEST_CASES_URL = maybeRandomizeURL(BASE_URL, false);

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