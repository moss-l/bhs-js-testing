function runTests() {
  // Unfortunately we don't seem to have complete control over when repl.it
  // saves our code so that reloading it will help. It is possible to make a
  // change and click Run tests and excecute the old version of the code and
  // then a second later click Run tests again and pick up the changes.
  clearResults();
  loadScript("script.js", () => {
    let fn = document.getElementById("functions").value;
    let cases = testCases[fn];
    clearResults();
    for (var i = 0; i < cases.length; i++) {
      let c = cases[i];
      let result = window[fn].apply(null, cases[i].input);
      if (result == c.output) {
        reportPass(fn, c.input, result);
      } else {
        reportFailure(fn, c.input, result, c.output);
      }
    }
  });
}

function clearResults() {
  clear(document.getElementById("results"));
}

function reportPass(fn, input, result) {
  let p = document.createElement("p");
  p.append(document.createTextNode("PASS: " + call(fn, input) + " => " + JSON.stringify(result)));
  document.getElementById("results").append(p);
}

function reportFailure(fn, input, result, expected) {
  let p = document.createElement("p");
  p.append(document.createTextNode("FAIL: " + call(fn, input) + " => " + JSON.stringify(result) + "; expected: " + JSON.stringify(expected)));
  document.getElementById("results").append(p);
}

function clear(e) {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
}

function call(fn, input) {
  return fn + "(" + input.map(JSON.stringify).join(", ") + ")";
}

function setup() {
  let menu = document.getElementById("functions");
  for (let fn in testCases) {
    let opt = document.createElement("option");
    opt.value = fn;
    opt.append(document.createTextNode(fn));
    menu.append(opt);
  }
}

function reloadCode() {

}

function loadScript(src, callback) {
  let oldCode = document.getElementById("code");

  let newCode = document.createElement('script');
  newCode.type = 'text/javascript';
  newCode.id = "code";
  newCode.src = src;
  newCode.onload = newCode.onreadystatechange = function () {
    if (!this.readyState || this.readyState == 'complete') {
      callback();
    }
  };
  oldCode.parentNode.replaceChild(newCode, oldCode);
}



testCases = {
  "countClumps": [
    { input: [[]], output: 0 },
    { input: [[1]], output: 0 },
    { input: [[1, 1]], output: 1 },
  ]
};
