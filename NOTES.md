# The main elements of Javascript

- Values: e.g. `123`, `"abc"`, `[4,5,6]`, `true`, `false`
- Operators: e.g. `+`, `-`, `+=`, `=`, the `[]` in `someArray[1]`
- Variables: a way of giving a value a name.
- Functions: another named thing and our main way of building up programs
- Other assignable places: other places to stash a value
- Control constructs: e.g. `if`, `for`, `while`.
- Properties: e.g. the `length` of a string, as in `someString.length`.
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

All four of these kinds of values also have a _syntax_ that describes
how you can write them in code. The syntax is not literally what is
stored in memory; it is just the way we write values in a program and
also how they will usually be displayed back to us by Javascript if we
print them or they show up in an error message.

Throughout this document I'll use the arrow symbol, ⟹, to mean
"the thing on the left has the value on the right" to illustrate the
values of different expressions in Javascript. Note: the ⟹ is not part
of the code; you'll never type it in your programs. With literal
values it's not entirely interesting to show their value because the
only way to to show the value to the right of the arrow is more or
less the same thing that will be on the left. However not always—the
syntax for some types is loose enough that the same value can be
written in multiple ways that are syntactically different but that
mean the same thing. For instance numbers can be written with a
decimal point but if the fractional part is zero the value is the
integer value and is canonically represented without any decimal
point.

```
10 ⟹ 10
10.0 ⟹ 10
10.000 ⟹ 10
```

Similarly strings are written enclosed in quotation marks but can be
written with either double (`"`) or single (`'`) quotation marks
without changing the value.

```
"foo" ⟹ "foo"
'foo' ⟹ "foo"
```

Also it's important to remember that the syntactic markers—the quote
marks in this case—are not part of the value when it is stored in
memory. The length of the string `"foo"` is three even though its
syntactic representation, including the quote marks, uses five
characters.

Booleans are simple having only two possible values each of which can
only be written one way:

```
true  ⟹ true
false ⟹ false
```

Finally, arrays are written enclosed in `[]` with the values of the
array separated by commas. However white space between the values has
no effect on the value. And the last values can have a comma after it
or not.

```
[1, 2, 3] ⟹ [1, 2, 3]
[1,2,3] ⟹ [1, 2, 3]
[1, 2, 3,] ⟹ [1, 2, 3]
[1,
 2,
 3] ⟹ [1, 2, 3]
 ```

## Operators

Since we don't have to worry about exactly how values are represented
in the computer's memory, the best way to describe different kinds of
values (e.g. numbers vs strings) is by describing what we can do with
them. At the most basic level that is defined by the _operations_ that
we can perform on different kinds of values to produce other values.

For now we can say that operators are the ways of producing values
from other values. (There are some other ways some operators are used
that make that not 100% true but we'll get to them later.)

For instance, `+`, `-`, `*`, and `/` are all operators that can be
applied to two numbers to produce a new number, according to the
normal mathematical definition. Another operator you'll need for some
of the exercises is `%`, called modulus, which divides one number by
another and returns the integer remainder. Here are some examples of
expressions using those operators:

```
1 + 2 ⟹ 3
7 - 3 ⟹ 4
4 * 10 ⟹ 40
50.3 / 13.2 ⟹ 3.8106060606060606
6 % 3 ⟹ 0
23 % 10 ⟹ 3
```

Boolean values, which represent logical true/false values, really show
how the meaning of a value is determined by the operators on the type.
The main operators are `!` which flips the meaning of a single boolean
value (`true` to `false` and `false` to `true`), `&&` which evaluates
to the logical “and” of two booleans, `||` which evaluates to the
logical “or” of two booleans. Here are some examples.

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
produce booleans: `<`, `>` are the normal less than and greater than;
less-than-or-equal and greater-than-or-equal are written `<=` and
`>=`. Equality and inequality tests are written `===` and `!==`.

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
individual characters of a string specified with a numeric index where
0 is the index of the first element.

```
"abc"[0] ⟹ "a"
"abc"[1] ⟹ "b"
"abc"[2] ⟹ "c"
```

The `[]` operator also works on arrays. Note however that `[]` are
used two ways with arrays: as part of the syntax of writing an array
value, e.g. `[1, 2, 3]` and as an operator, placed after an array
value to get at an element of the array.

```
[32, 43, 54][0] ⟹ 32
["foo", "bar", "baz"][2] ⟹ "baz"
```

## Variables

While values are what are actually stored in the computer's memory, in
order to be operated on by operators, often we want to be able to
refer to a value without specifying a particular value. Sometimes it's
useful to give things human-understandable names just to make our code
easier to understand. But the real power of variables is they let us
describe a whole set of possible computations rather than a single
(computed) value. It may seem a simple thing but while `1 + 2` is in
some sense just a funny way of writing `3`, `x + 2` is not describing
a particular value, but a computation that can take on a virtually
limitless number of values but we can't know what value it will
produce until we know the value of `x`. (Limitless but not infinite
because computers are ultimately finite machines.) So:

```
x + 2 ⟹ ???
```

It's important to be clear that `x` is not a value itself but rather a
_name_ that can refer to a value. Syntactically names must start with
a letter and can contain only letters, digits, and underscore (`_`).
Names are case sensitive so `foo`, `FOO`, and `Foo` are three
different names.

We can set the value that a variable refers to with the assignment
operator `=`. (Note that assignment is written with a single `=` while
equality comparison is written `===`.) The assignment operator is a
funny kind of operator that is not typically used for the value it
produces but rather for its ability to assign a value to a name.

```
x = 10
x + 2 ⟹ 12
```

Once we have assigned a value to a variable, we can use that variable
to refer to the value anywhere we could use the value itself.

```
i = 2
numbers = [10, 20, 30, 40]
numbers[i] ⟹ 30

x = 10
y = x + 1
x ⟹ 10
y ⟹ 11
```

We can also use a variable to refer to its current value in an
expression on the right side of a `=` that assigns the value to the
same variable:

```
x = 10
x ⟹ 10
x = x + 1
x ⟹ 11
```

Because assigning a new value to a variable derived from the current
value is a relatively common thing to want to do, there are some
special assignment operators that change the value of a variable using
its current value. A couple that you may need soon are the `++`
operator which increments the value of a variable by one and the `+=`
operator which increments a variable by a given amount.

```
x = 10
x ⟹ 10
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
It is followed by a set of `()` enclosing a comma-separated list of
variable names also known as the functions parameters. Then comes a
pair of `{}` enclosing the code that makes up the function. Inside a
function we can use the special word `return` followed by an
expression to return the value of the expression from the function.

Here's another function that takes two arguments. It calls yet another
function, `Math.sqrt`, which computes the square root of its argument.
Don't worry for now why its name has `Math.` in it.

```
function pythagoras(a, b) {
  return Math.sqrt(a*a + b*b);
}
```

The syntax for calling a function is simpler: just the name of the
function followed by `()` enclosing a comma-separated list of
expressions whose values will be assigned to the variables named by
the function's parameters. The function call is itself an expression
that produces a value, namely whatever value was `return`ed from the
function.

```
double(10) ⟹ 20
pythagoras(3, 4) ⟹ 5
```

As an expression, a function call can be used anywhere you would use a
variable on an expression made out of values and operators. For
instance, you can apply operators to the values returned by a
function; you can pass the result of calling a function as an argument
to another function; and you can assign the value of calling a
function to a variable:

```
double(2) + double(3) ⟹ 10
double(double(3)) ⟹ 12
x = double(2)
x ⟹ 4
```

The variables used as a function's parameters, such as `n` in the
`double` function above, and `a` and `b` in `pythagoras`, are only
meaningful within the body of the function, i.e. the code delimited by
the `{}`.

If a function has no parameters it is called with nothing between the
`()`.

```
function myFavoriteNumber() {
  return 36;
}

myFavoriteNumber() ⟹ 36;
```

## Other assignable places

The assignment operator `=` is actually more general than just
assigning values to variables. There are other places that can be
assigned different values at different times. For now the only one you
have to worry about are arrays: you can assign new values to the
individual slots in an array using the `[]` operator to specify the
slot.

```
xs = [1, 2, 3]
xs[0] = 10
xs ⟹ [10, 2, 3]
```

While this is useful, it is also somewhat dangerous because it's
possible that somewhere else in your code you have a variable that
refers to the same array value. The change made to the array will be
visible to other code that refers to the same array. In particular, if
a function assigns new values to an element of an array it is passed
as an argument, that change will be visible to the caller after the
function returns. Sometimes this is exactly what you want but you need
to be aware of it.

```
function mutateFirst(items) {
  items[0] = "mutated";
}

let someItems = ["ab", "cd", "ef"];
mutateFirst(someItems);
someItems ⟹ ["mutated", "cd", "ef"];
```

Note that you cannot assign to the individual characters of a string.
A string is what is called an _immutable_ data type. If you need to
make a new string you need to build it up via string concatenation
with `+`, of characters extracted with `[]` or parts extracted from
other strings using the `substring` method which I'll discuss below.

## Control constructs

Normally code executes one line after another. Elements of the
language that let us alter that order of execution are called "control
constructs" as they control the flow of execution. The main kinds
control constructs are the _conditional_ control constructs that allow
us to only execute code if a certain condition holds and _looping_ (or
_iteration_) constructs that allow us to execute the same code
repeatedly though possibly with different values of some variables.
(The `return` in a function is also a kind of control construct,
returning control, and also a value, from the function to wherever the
function was called.)

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
  // This code runs 10 times with i taking on the values from 0 to 9.
  // The i++ above says to increment each time through the loop after
  // all the code here has run.
}
```

```
while (x < limit) {
  // This code runs as long as x is less than limit.
  // The code inside the loop must change x (or possibly limit)
  // to ensure that the condition eventually becomes false. If
  // it does not the loop will keep going forever, a so-called
  // "infinite loop".
}
```

## Properties

Some values in Javascript have other named values attached to them.
The values are called _properties_. We'll get into this more when we
get into Object Oriented programming but for now the main property you
need to know about is the `length` property of strings and array
values which is always a number telling us the number of characters in
a string or the number of elements in an array. Properties of a value
are referred to with a `.` and the name of the property after an
expression that evaluates to that value.

```
"foobar".length ⟹ 6
[10, 20, 30, 40, 50].length ⟹ 5
("foo" + "bar").length ⟹ 6
```

The parenthesis in the third line above are necessary to get the
`length` property of the result of adding `"foo"` and `"bar"` rather
than adding `"foo"` to the length of `"bar"`.

The `length` property is particularly useful because the valid indexes
to use with the `[]` operator go from 0 to one less than the `length`
of a string or array so this is a very common idiom for looping over
each element of a string or array:

```
for (let i = 0; i < items.length; i++) {
  // do something with items[i]
}
```

## Methods

Like properties, methods are really a topic for when we discuss Object
Oriented programming. But for now know that some values have special
functions that can be invoked "on" the value without passing the value
in. Methods are accessed using a similar dot syntax as the one we use
to access properties of a value but with `()` after the name enclosing
any addition arguments to the method. Some important methods you'll
need to know for the JS 1-20 problems sets are the `substring`,
`toUpperCase`, and `toLowerCase` methods on string values. The first
is used to extract parts of an existing string while the other two
return a string value produced by converting all letters in the
original string to either upper or lower case. The `substring` method
can be called with either one numeric argument, in which case it
returns all the characters starting from that index to the end of the
string, or with two numeric arguments in which case it returns the
substring starting at the first value and continuing up to (but not
including) the character at the second index. The case conversion
methods don't take any extra arguments.

```
"dog food".substring(4) ⟹ "food"
"dog food".substring(0, 3) ⟹ "dog"
"dog food".substring(3, 4)  ⟹ " "
"foo".toUpperCase() ⟹ "FOO"
"FOO".toLowerCase() ⟹ "foo"
```

## Appendix: some occasionally annoying subtleties

While it is best to think of operators only operating on certain
types, e.g. `+`, `-`, `*`, and `/` operate on numbers, `!`, `&&`, and
`||` operate on booleans, and `[]` on strings and arrays, the
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
strings to be converted into numbers when needed.

The same thing happens with boolean operators and also control
constructs such as `if` and `while` that require a boolean value.
While `true` and `false` are the only actual boolean values, the
number `0` (or equivalently `0.0`) and the empty string `""` are
coerced to `false` when a boolean is required while all other numbers
and strings are consider true:

```
if ("") {
  // code in here DOES NOT run
}

if (0) {
  // code in here DOES NOT run
}

if ("abc") {
  // code in here DOES run
}

if (123) {
  // code in here DOES run
}
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
x + 15 ⟹ "5015"
```

Type coercion is also the reason that Javascript has two flavors of
equality operator: `===`, which I recommend you always use, and `==`
which you will also see. (There are also the corresponding inequality
operators, `!==` and `!=`.) The difference is that `==` does a much
more permissive comparison, making lots of attempts to coerce the two
values into the same type before it gives up and says they are not
equal. So for instance:

```
123 == "123" ⟹ true
0 == "0" ⟹ true
0 == "" ⟹ true
true == 1 ⟹ true
true == "1" ⟹ true
false == 0  ⟹ true
```

Yet somewhat weirdly:

```
true == "true" ⟹ false
```

The `===` operator is called "strict equality" and does essentially no
coercion. If the values aren't actually already the same type and
value it considers them unequal.

```
123 === "123" ⟹ false
0 === "0" ⟹ false
0 === "" ⟹ false
true === 1 ⟹ false
true === "1" ⟹ false
false === 0  ⟹ false
```
