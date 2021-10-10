#!/usr/bin/env python

import json

with open("tests.json") as f:
    tests = json.load(f)

with open("problem-sets.json") as f:
    problem_sets = json.load(f)


in_problem_sets = { item for v in problem_sets.values() for item in v }
in_tests = set(tests.keys())

if in_problem_sets == in_tests:
    print(f"All {len(in_tests)} tests in both files.")
else:
    if x := (in_problem_sets - in_tests):
        print(f"Only in problem sets: {x}")

    if x := (in_tests - in_problem_sets):
        print(f"Only in tests: {x}")
