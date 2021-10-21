# Boolean simplification

One of the seemingly simplest concepts in programming but which is
probably new to you (unless you've studied formal logic) is the idea
of Boolean values. On the other hand, we're all actually quite
familiar with the idea of true and false and are good at reasoning
about simple Boolean expressions: if I tell you that I only eat when I
have food and am hungry and then I tell you I have a bunch of bananas
but am not hungry, you can probably correctly predict that I will not
eat because you understand that the *and* in “have food and am hungry”
means both facts have to be true for me to eat. On the other hand, if
I told you that I eat whenever I'm hungry or when I'm bored you can
probably predict that even if I'm not hungry but I'm bored, I'm
probably eating.

Several of the problems in the JS 1-10 problem set involve these kinds
of Boolean expressions. The very first asks for a function,
`sleep_in`, that given two Boolean values, one saying whether it's a
weekday and the other saying whether we're on vacation, returns `true`
if we can sleep in which we can do “if it is not a weekday or we're on
vacation” and otherwise `false`.

However despite our intuitive familiarity with practical Boolean logic
(I eat when I’m hungry and have food) when it comes time to render
these statements in code using boolean values, it’s easy to get lost
in a maze of true/false branches and write something that seems quite
complex for a relatively simple question such as, can I sleep in
today?

Luckily there are a few simple techniques for simplifying boolean
expressions, similar to the way we simplify mathematical expressions.

To illustrate them, lets take a look at one way to implement the
`sleep_in` function. Since there are only two arguments (`weekday` and
`vacation`) and they can each only take one of two values (`true` and
`false`) there are exactly four possible cases. So we could just write
a series of `if` statements to cover all four possible combinations of
the two arguments being `true` and `false`. For instance, one could
write this skeleton:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday == true && vacation == true){
    // TODO: implement
  }
  if (weekday == true && vacation == false){
    // TODO: implement
  }
  if (weekday == false && vacation == true){
    // TODO: implement
  }
  if (weekday == false && vacation == false){
    // TODO: implement
  }
}
```

The only thing that is left is to replace the `TODO` comments with
something that returns the right value for each case, like this:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday == true && vacation == true){
    return true;
  }
  if (weekday == true && vacation == false){
    return false;
  }
  if (weekday == false && vacation == true){
    return true;
  }
  if (weekday == false && vacation == false){
    return true;
  }
}
```

This is a correct definition of the requested function which is great
news! Because now we can step by step simplify things and after each
step rerun the tests and make sure it’s still correct.

The very first simplification is one of my favorites:

**Replace all comparisons to literal boolean values with just the thing or `!` the thing.**

There are lots of expressions that evaluate to a boolean value
including variables like `vacation` and `weekday` whose values are
booleans as well as more complex expressions involving `&&`, `||`, and
`!`. But there are only two literal booleans: `true` and `false`.
While occasionally you will need to use literal `true` and `false` in
your code, you should never compare to either of them. Look at what
comparing to the literal `true` does:

```
true == true ⟹ true
false == true ⟹ false
```

Notice that the value of the expression as a whole is always the same
as the value we are comparing to `true`. So anywhere we have an
expression of the form `x == true` we can replace it with just `x`.

So let’s do that everywhere we compare to literal `true` in this
function:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation){
    return true;
  }
  if (weekday && vacation == false){
    return false;
  }
  if (weekday == false && vacation){
    return true;
  }
  if (weekday == false && vacation == false){
    return true;
  }
}
```

Similarly, the value of comparing to literal `false` is determined by
the value being compared but in this case it is logically flipped:
`true` goes to `false` and `false` goes to `true`.

```
true == false ⟹ false
false == false ⟹ true
```

But we have an operator that does that: `!`:

```
!true ⟹ false
!false ⟹ true
```

So anywhere we have an expression of the form `x == false` we can
replace it with `!x`. If we do this we get this:


```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  }
  if (weekday && !vacation){
    return false;
  }
  if (!weekday && vacation){
    return true;
  }
  if (!weekday && !vacation){
    return true;
  }
}
```

Notice how this is starting to be almost readable as English: `if
(weekday && vacation) …` can be read as “if it’s a weekday and it’s a
vacation” and `if (weekday && !vacation) …` can be “if it’s a weekday
and it’s not a vacation” without having to mentally translate a bunch
of `== true` and `== false` cruft.


The next simplification isn’t strictly about Booleans but has to do
with how we use `if` statements.

*Chain mutually exclusive `if` statements with `else` clauses.*


```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  }
  if (!weekday && vacation){
    return true;
  }
  if (!weekday && !vacation){
    return true;
  }
  if (weekday && !vacation){
    return false;
  }
}
```





```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  } else if (!weekday && vacation){
    return true;
  } else if (!weekday && !vacation){
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}
```



```javascript
function sleep_in(weekday, vacation) {
  if ((weekday && vacation) || (!weekday && vacation) || (!weekday && !vacation)) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}
```



```javascript
function sleep_in(weekday, vacation) {
  if (vacation || (!weekday && !vacation)) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}
```



```javascript
function sleep_in(weekday, vacation) {
  if (vacation || (!weekday && !false)) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}
```



```javascript
function sleep_in(weekday, vacation) {
  if (vacation || (!weekday && true)) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}
```


```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}
```



```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (weekday && !false){
    return false;
  }
}
```


```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (weekday && true){
    return false;
  }
}
```


```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (true && true){
    return false;
  }
}
```


```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (true){
    return false;
  }
}
```


```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else {
    return false;
  }
}
```



```javascript
function sleep_in(weekday, vacation) {
  return vacation || !weekday;
}
```
