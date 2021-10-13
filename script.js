// JS 1-10 & 11-20

// The parameter weekday is True if it is a weekday, and the parameter
// vacation is True if we are on vacation. We sleep in, if it is not a
// weekday or we're on vacation. Return True if we sleep in.
function sleep_in(weekday, vacation) {
  return !weekday || vacation;
}

// We have two monkeys, a and b, and the parameters a_smile and
// b_smile indicate if each is smiling. We are in trouble if they
// are both smiling or if neither of them is smiling. Return True if
// we are in trouble.
function monkey_trouble(a_smile, b_smile) {
  return !!a_smile == !!b_smile;
}

// Given a string and a non-negative int n, return a larger string
// that is n copies of the original string.
function string_times(s, n) {
  let r = "";
  for (let i = 0; i < n; i++) {
    r += s;
  }
  return r;
}

// Given a string and a non-negative int n, we'll say that the front of
// the string is the first 3 chars, or whatever is there if the string is
// less than length 3. Return n copies of the front.
function front_times(s, n) {
  let front = s.substring(0, 3);
  return string_times(front, n);
}

// Given a string, return a new string made of every other char starting
// with the first, so "Hello" yields "Hlo".
function string_bits(s) {
  let r = "";
  for (let i = 0; i < s.length; i += 2) {
    r += s[i];
  }
  return r;
}

// You are driving a little too fast, and a police officer stops you.
// Write code to compute the result, encoded as an int value: 0=no
// ticket, 1=small ticket, 2=big ticket. If speed is 60 or less, the
// result is 0. If speed is between 61 and 80 inclusive, the result is 1.
// If speed is 81 or more, the result is 2. Unless it is your birthday --
// on that day, your speed can be 5 higher in all cases.
function caughtSpeeding(speed, birthday) {
  if (birthday) {
    speed -= 5;
  }
  if (speed <= 60) {
    return 0;
  } else if (speed <= 80) {
    return 1;
  } else {
    return 2;
  }
}

// Given a number, return the string form of the number followed by "!".
// So the int 6 yields "6!". Except if the number is divisible by 3 use
// "Fizz" instead of the number, and if the number is divisible by 5 use
// "Buzz", and if divisible by both 3 and 5, use "FizzBuzz". Note: the %
// "mod" operator computes the remainder after division, so 23 % 10
// yields 3. What will the remainder be when one number divides evenly
// into another?
function fizz_buzz(n) {
  let fizzy = n % 3 == 0;
  let buzzy = n % 5 == 0;
  if (fizzy && buzzy) {
    return "FizzBuzz";
  } else if (fizzy) {
    return "Fizz";
  } else if (buzzy) {
    return "Buzz";
  } else {
    return n + "!";
  }
}

// We'll say a number is special if it is a multiple of 11 or if it is
// one more than a multiple of 11. Return true if the given non-negative
// number is special.
function specialEleven(n) {
  return n % 11 == 0 || (n - 1) % 11 == 0;
}

// Return the sum of two 6-sided dice rolls, each in the range 1..6.
// However, if noDoubles is true, if the two dice show the same value,
// increment one die to the next value, wrapping around to 1 if its value
// was 6.
function withoutDoubles(d1, d2, noDoubles) {
  if (noDoubles && d1 === d2) {
    d2 = (d2 % 6) + 1;
  }
  return d1 + d2;
}

// Given a string, return a "rotated left 2" version where the first 2
// chars are moved to the end. The string length will be at least 2.
function left2(s) {
  let start = s.substring(0, 2);
  let end = s.substring(2);
  return end + start;
}

// Given an array of ints, return true if 6 appears as either the first
// or last element in the array. The array will be length 1 or more.
function firstLast6(numbers) {
  return numbers[0] == 6 || numbers[numbers.length - 1] == 6;
}

// Given an array of length 2, return true if it contains a 2 or a 3.
function has23(numbers) {
  return numbers.indexOf(2) >= 0 || numbers.indexOf(3) >= 0;
}

// Given an int array length 3, if there is a 2 in the array immediately
// followed by a 3, set the 3 element to 0. Return the changed array.
function fix23(numbers) {
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] === 2 && numbers[i + 1] === 3) {
      numbers[i + 1] = 0;
    }
  }
  return numbers;
}

// Given a string, count the number of words ending in 'y' or 'z' -- so
// the 'y' in "heavy" and the 'z' in "fez" count, but not the 'y' in
// "yellow" (not case sensitive). We'll say that a y or z is at the end
// of a word if there is a space (" ") immediately following it. Hint:
// use your toUpperCase() here.

function countYZ(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {

    let c = s[i].toUpperCase();
    let yOrZ = c == "Y" || c == "Z";
    // Per the spec we shouldn't count a y or z at the end of the string
    // but the test cases seem to want that.
    let endOfWord = i + 1 == s.length || s[i + 1] == " ";

    if (yOrZ && endOfWord) {
      count += 1;
    }
  }
  return count;
}

// 15. endOther

// Given two strings, return true if either of the strings appears at the
// very end of the other string, ignoring upper/lower case differences
// (in other words, the computation should not be "case sensitive").
// Note: str.toLowerCase() returns the lowercase version of a string.
function endOther(s1, s2) {
  let lower1 = s1.toLowerCase();
  let lower2 = s2.toLowerCase();
  return lower1.endsWith(lower2) || lower2.endsWith(lower1);
}

// Return a version of the given string, where for every star (*) in the
// string the star and the chars immediately to its left and right are
// gone. So "ab*cd" yields "ad" and "ab**cd" also yields "ad". Hint: make
// a new string to store your answer.
function starOut(s) {
  let r = "";
  for (let i = 0; i < s.length; i++) {
    let beforeStar = i < s.length - 1 && s[i + 1] === "*";
    let afterStar = i > 0 && s[i - 1] === "*";
    let isStar = s[i] === "*";

    if (!(isStar || beforeStar || afterStar)) {
      r += s[i];
    }
  }
  return r;
}

// A sandwich is two pieces of bread with something in between. Return
// the string that is between the first and last appearance of "bread" in
// the given string, or return the empty string "" if there are not two
// pieces of bread.
function getSandwich(s) {
  let slice1 = s.indexOf("bread");
  let slice2 = s.lastIndexOf("bread");
  if (slice1 != -1 && slice2 != -1 && slice1 < slice2) {
    // N.B. substring "helpfully" will take the arguments in either order,
    // thus the need to check that slice1 < slice2
    return s.substring(slice1 + "bread".length, slice2);
  } else {
    return "";
  }
}

// Given a non-empty array, return true if there is a place to split the
// array so that the sum of the numbers on one side is equal to the sum
// of the numbers on the other side. Hint: use a nested loop.
function canBalance(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    let weight = 0;
    for (let j = 0; j <= i; j++) {
      weight += numbers[j];
    }
    for (let j = i + 1; j < numbers.length; j++) {
      weight -= numbers[j];
    }
    if (weight == 0) {
      return true;
    }
  }
  return false;
}


// Say that a "clump" in an array is a series of 2 or more adjacent
// elements of the same value. Return the number of clumps in the given
// array.
function countClumps(xs) {
  let clumps = 0;
  let i = 0;
  while (i < xs.length) {
    let s = i + 1;
    while (s < xs.length && xs[i] == xs[s]) s++;
    if (s - i > 1) clumps++;
    i = s;
  }
  return clumps;
}

// Given a string, return the longest substring that appears at both the
// beginning and end of the string without overlapping. For example,
// sameEnds("abXab") is "ab".
function sameEnds(s) {
  for (let i = Math.floor(s.length / 2); i >= 0; i--) {
    if (s.substring(0, i) == s.substring(s.length - i)) {
      return s.substring(0, i);
    }
  }
}
