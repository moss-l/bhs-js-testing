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
const TEST_CASES_URL = "https://raw.githubusercontent.com/gigamonkey/bhs-js-testing/master/data/data.json";

// Set this to true to make sure we always fetch the absolute latest test data.
const PREVENT_CACHING = false;

/*
 * Load test case data via XMLHttpRequest.
 */
function loadTestCases(url, callback, errorCallback) {
  const r = new XMLHttpRequest();
  r.open('GET', maybeRandomizeURL(url, PREVENT_CACHING), true);
  r.onload = function () {
    if (this.status == 200) {
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
 * Compute test results for a single function given its test cases.
 */
function testResults(fn, cases) {
  // Comparing the stringified got and expected is kind of a hack to compare 
  // values other than numbers and strings. But works for arrays and dicts
  // which is probably sufficient for our needs.
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