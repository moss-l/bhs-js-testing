# The main elements of Javascript

- Values: e.g. `123`, `"abc"`, `[4,5,6]`, `true`, `false`
- Operators: e.g. `+`, `-`, `+=`, `=`, the `[]` in `someArray[1]`
- Variables: a way of giving a value a name.
- Functions: another named thing and our main way of building up programs
- Control constructs: e.g. `if`, `for`, `while`.
- Attributes: e.g. the `length` of a string, as in `someString.length`.
- Methods: A special kind of function.

## Values

Values are the actual things stored in the computer's memory.
Different kinds of values are stored in a different ways but in a
high-level language like Javascript we don't need to care about
exactly how.

The kinds of values you need for JS 1-10 and 11-20 are:

- Numbers: what you would expect. `1`, `2`, `3`, `3.141592653589793`,
  etc.

- Strings: a piece of text, e.g. `"foo"`. Can also think of it as a
  sequence of individual characters.

- Booleans: one of two values `true` or `false`.

- Arrays: A simple collection of other values, e.g. `[1, 2, 3]` is an
  array of three numbers, `["foo", "bar", "baz"]` is an array of three
  strings, and `[1, "foo", true]` is an array of a number, a string,
  and a boolean.


## Operators

Since we don't have to worry about exactly how values are represented
in the computer's memory, the best way to describe different kinds of
values (e.g. numbers vs strings) is by describing what we can do with
them. At the most basic level that is defined by the _operations_ that
we can perform on different kinds of values to produce other values.

Operators are the ways of producing values from other values or, in
same cases, of manipulating values. For operators that produce new
values we can use the arrow symbol, ⟹, to mean "evaluates to" to
illustrate how different operators on different kinds of values
produce new values. (N.B. the ⟹ is not part of the code; you'll never
type it in your programs.)

For instance, `+`, `-`, `*`, and `/` are all operators that can be
applied to two numbers to produce a new number, according to the
normal mathematical definition.

```
1 + 2 ⟹ 3
7 - 3 ⟹ 4
4 * 10 ⟹ 40
50.3 / 13.2 ⟹ 3.8106060606060606
```

Boolean values, which represent logical true/false values, really show
how the meaning of a value can be largely determined by the operators
on the type. The main operators are `!` which flips the meaning of a
single boolean value (`true` to `false` and `false` to `true`), `&&`
which evaluates to the logical “and” of two booleans, `||` which
evaluates to the logical “or” of two booleans. Here are some examples.

```
!true ⟹ false
!false ⟹ true
true && true ⟹ true
true && false ⟹ false
false && true ⟹ false
true || false ⟹ true
false || true ⟹ true
```

Another set of operators from basic arithmetic operate on numbers to
produce booleans: `<`, `>` are the normal less than and greater than
less than or equal and greater than or equal are written `<=` and
`>=`. And equality and inequality tests are written `===` and `!==`.

```
10 < 20 ⟹ true
10 <= 10 ⟹ true
10 < 10 ⟹ false
10 === 10 ⟹ true
10 !== 11 ⟹ true
```

The `+` operator can also be applied to string values but has a
different meaning for strings than for numbers, producing the result
of concatenating (a.k.a. smooshing together) the two strings.

```
"foo" + "bar" ⟹ "foobar"
"This is " + " a sentence." ⟹ "This is a sentence."
```

The other arithmetic operators are not meaningful when applied to
strings in Javascript. But strings support another operator that
numbers do not, namely the `[]` operator that allows us to access the
individual characters of a string specified with a numeric "index",
where 0 is the index of the first element.

```
"abc"[0] ⟹ "a"
"abc"[1] ⟹ "b"
"abc"[2] ⟹ "c"
```

The `[]` operator also works on arrays:

```
[32, 43, 54][0] ⟹ 32
["foo", "bar", "baz"][2] ⟹ "baz"
```

## Variables

While values are what is actually stored in the computers memory,
often we want to be able to refer to a value without specifying a
particular value, sometimes just because it's useful to use
human-understandable names and sometimes because the same piece of
code can describe a way of producing a value that doesn't depend on
the exact values. For instance, if we write:

```
x * 2 ⟹ ???
```

we can't know what value it will produce until we know the value of
`x`. `x` is not a value itself but rather a _name_ that can refer to a
value. The exact rules for the form of names are a bit more
complicated but for our purposes, names must start with a letter and
can contain only letters, digits, and underscore (`_`). Names are case
sensitive so `foo`, `FOO`, and `Foo` are three different names.

We can set the value that a variable refers to with the assignment
operator `=`. (Note that assignment is written with a single `=` while
equality comparison is written `===`.) The assignment operator is a
funny kind of operator that is not typically used for the value it
produces but rather for its ability to assign a value to a name.

```
x = 10
x * 2 ⟹ 20
```

Once we have assigned a value to a variable, we can use that variable
to refer to the value anywhere we could use the value itself.

```
i = 2
numbers = [10, 20, 30, 40]
numbers[i] ⟹ 30
```

That also includes in expressions that we when turn around and assign
back to the same variable:

```
x = 10
x ⟹ 10
x = x + 1
x ⟹ 11
```

Because assigning the value of a variable with something added to it
is a relatively common thing to want to do, there are two special
assignment operators that change the value of a variable using it's
current value. The `++` operator increments the value of a variable by
one and the `+=` operator assigns a new value to a variable, adding a
number to the current value.

```
x = 10
x++
x ⟹ 11
x += 2
x ⟹ 13
```

## Functions

Functions are the way we can define new bits of, er, functionality,
and give them names. They are in many respects like operators except
that they are defined by us rather than built into the language. Also
while operators tend to have names made of punctuation characters
(`+`, `=`, etc.) functions are named following the same rules as
variables.

There are two bits of syntax related to functions: how we define them
and how we call them. A function definition starts with the word
`function` and looks like this:

```
function double(n) {
  return n * 2;
}
```

The name after `function` is the name of the function being defined.
It is followed by a set of `()`s enclosing a comma-separated list of
variable names also known as the functions parameters. Then comes a
pair of `{}` enclosing the code that makes up the function. Inside a
function we can use the special word `return` followed by an
expression to return the value of the expression from the function.


The syntax for calling a function is simpler: just the name of the
function followed by `()`s enclosing a comma-separated list of
expressions whose values will be assigned to the variables named by
the function's parameters. The function call is itself an expression
that produces a value, namely whatever value was `return`ed from the
function. If a function has no parameters it is called with nothing
between the `()`s.

```
double(10) ⟹ 20

function myFavoriteNumber() {
  return 36;
}

myFavoriteNumber() ⟹ 36;
```

## Control constructs

Normally code executes one line after another. Elements of the
language that let us alter that order of execution are called "control
constructs" as they control the flow of execution. The main kinds
control constructs are the _conditional_ control constructs that allow
us to only execute code if a certain condition holds and _looping_ (or
_iteration_) constructs that allow us to execute the same code
repeatedly though possibly with different values of some variables.
(The `return` in a function is also a kind of control constuct,
returning control, and also a value, from the function containing the
return to wherever the function was called.)

```
if (x == 0) {
  // this code runs if x is zero
}
```

```
if (x == 0) {
  // this code runs if x is zero
} else {
  // this code runs in all other cases
}
```

```
if (x == 0) {
  // this code runs if x is zero
} else if (x == 42) {
  // this code runs if x is forty-two
} else {
  // this code runs in all other cases
}
```

```
for (let i = 0; i < 10; i++) {
  // This code runs 10 times with i taking on the values from 0 to 9
  // The i++ above says to increment each time through the loop after all the code
  // here has run.
}
```

```
while (x < limit) {
  // This code runs as long as x is less than limit.
  // The code inside the loop must change x (or possibly limit)
  // to ensure that the condition eventually becomes false. If it does
  // not the loop will keep going forever, a so-called "infinite loop".
}
```


## Attributes

Some values in Javascript have other named values attached to them.
We'll get into this more when we get into Object Oriented programming
but for now the main attribute you need to know about is the `length`
attribute of strings and array values which is always a number telling
us the number of characters in a string or the number of elements in
an array. Attributes of a value are referred to with a `.` and the
name of the attribute after an expression that evaluates to that value.

```
"foobar".length ⟹ 6
[10, 20, 30, 40, 50].length ⟹ 5
("foo" + "bar").length ⟹ 6
```

The parenthesis in the third line above are necessary to get the
`length` attribute of the result of adding `"foo"` and `"bar"` rather
than adding `"foo"` to the length of `"bar"`.

The `length` attribute is particularly useful because the valid
indexes to use with the `[]` operator go from 0 to one less than the
`length` of a string or array so this is a very common idiom for
looping over each element of a string or array:

```
for (let i = 0; i < items.length; i++) {
  // do something with items[i]
}
```

## Methods

Like attributes, methods are really a topic for when we discuss Object
Oriented programming. But for now know that some values have special
functions that can be invoked "on" the value without passing the value
in using a similar dot syntax as the one we use to access attributes
of a value but with `()` after the name enclosing any addition
arguments to the method. Some important methods you'll need to know
for the JS 1-20 problems sets are the `toUpperCase` and `toLowerCase`
methods on string values that return a string value produced by
converting all letters in the original string to either upper or lower
case. These methods don't take any extra arguments so they are called
like this:

```
"foo".toUpperCase() ⟹ "FOO"
"FOO".toLowerCase() ⟹ "foo"
```

## Appendix: some occassionally annoying subtleties

While it is best to think of operators only operating on certain
types, e.g. `+`, `-`, `*`, and `/` operate on numbers, `!`, `&&`, and
`||` operate on booleans, and `[]` on strings and arrays. The
situation is a bit more complicated than that. For one thing, as we've
already seen how `+` can also be used to concatenate strings. Which is
perhaps mildly confusing but not too terrible.

But there's another feature of Javascript which, while sometimes
useful, can also make life confusing for beginners and sometimes even
experts. Namely, if you try to use an operator with the wrong kind of
values, Javascript will try to convert (or to use the technical term
_coerce_) them into the right kinds. For instance if we try to use `*`
with strings and those strings are made up of digits, Javascript will
"helpfully" convert the strings to numbers and then happily perform
the multiplication:

```
"42" * "12" ⟹ 504
```

So it's a bit of a fine distinction to say that `*` doesn't work on
strings when it certainly seems that it does. But it is actually
accurate; it's just that there's another mechanism in play that causes
strings to be converted into numbers when needed. The same thing
happens with boolean operators and also control constructs such as
`if` and `while` that require a boolean value. While `true` and
`false` are the only actual boolean values, the number `0` (or
equivalently `0.0`) and the empty string `""` are coerced to `false`
when a boolean is required while all other numbers and strings are
consider true.

```
!"" ⟹ true
!0 ⟹ true
!"abc" ⟹ false
!123 ⟹ false
```

Somewhat oddly, when evaluating the `+` operator, Javascript prefers
string concatenation to numeric addition: if either of the values we
are trying to `+` are strings, then both are coerced to strings and
then concatenated. However if neither value is a string then
Javascript does it's best to convert both values to numbers, for
instance by converting `true` to `1` and `false` to `0` and then does
a numeric addition. This leads to sometimes surprising results such as
the last expression below:

```
x = "50"
x * 15 ⟹ 750
x - 15 ⟹ 35
x / 15 ⟹ 3.3333333333333335
x + 15 ⟹ '5015'
```
