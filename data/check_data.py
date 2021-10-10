#!/usr/bin/env python

import json

with open("data.json") as f:
    data = json.load(f)

sets = set(data['sets'])
problems = data['problems']
tests = data['test_cases']


have_problems = set(problems.keys())
in_problems = { item for v in problems.values() for item in v }
in_tests = set(tests.keys())

if sets == have_problems:
    print(f"All {len(sets)} named sets have problems.")
else:
    if x := (sets - have_problems):
        print(f"Sets with no problems: {x}")

    if x := (have_problems - sets):
        print(f"Unused problem sets: {x}")



if in_problems == in_tests:
    print(f"All {len(in_tests)} tests in both files.")
else:
    if x := (in_problems - in_tests):
        print(f"Only in problem sets: {x}")

    if x := (in_tests - in_problems):
        print(f"Only in tests: {x}")
