# Boolean simplification

One of the seemingly simplest concepts in programming but which may be
new to you (unless you've studied logic) is the idea of Boolean
values. On the other hand, we're all actually quite familiar with the
idea of true and false and are good at reasoning about simple Boolean
expressions: if I tell you that I only eat when I have food and am
hungry and then I tell you I have a bunch of bananas but am not
hungry, you can probably correctly predict that I will not eat because
you understand that the *and* in “have food and am hungry” means both
facts have to be true for me to eat. On the other hand, if I told you
that I eat whenever I'm hungry or when I'm bored you can probably
predict that even if I'm not hungry but I'm bored, I'm probably
eating.

Several of the problems in the JS 1-10 problem set involve these kinds
of Boolean expressions. The very first asks for a function,
`sleep_in`, that given two Boolean values, one saying whether it's a
weekday and the other saying whether we're on vacation, returns `true`
if we can sleep in which we can do “if it is not a weekday or we're on
vacation” and otherwise `false`.

However despite our intuitive familiarity with practical Boolean logic
(I eat when I’m hungry and have food) when it comes time to render
these statements in code using Boolean values, it’s easy to get lost
in a maze of true/false branches and write something that seems quite
complex for a relatively simple question such as, can I sleep in
today?

Luckily there are a few simple techniques for simplifying Boolean
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

## Replace all comparisons to literal `true` and `false` with just the thing or `!` the thing.

There are lots of expressions that evaluate to a Boolean value
including variables like `vacation` and `weekday` as well as more
complex expressions involving `&&`, `||`, and `!`. But there are only
two literal Booleans: `true` and `false`. While occasionally you will
need to use literal `true` and `false` in your code, you should never
compare to either of them. Look at what comparing to the literal
`true` does:

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
of `== true` and `== false` cruft. (Think of it this way: you almost
certainly say, “I’m hungry” not “It is true that I am hungry.”)


The next simplification isn’t strictly about Booleans but has to do
with how we use `if` statements.

## Chain mutually exclusive `if` statements with `else` clauses.

By itself an `if` statement just controls whether the code inside its
`{}`s executes. Sometimes of course we want to do something else when
the tested condition is not true. We could write that with another
`if` clause with a condition that is true when the the first `if`’s
condition is false and vice versa:

```javascript
if (timeForBed) {
  brushTeeth();
}

if (!timeForBed) {
  eatSnacks();
}
```

However this is unnecessarily complicated. To understand the code we
have to mentally parse two separate conditions and notice that only
one of them can be true at a time and therefore that it’s impossible
that we will end up eating snacks after we’ve brushed our teeth. In
this case because one condition is `!` the other that’s not too hard
to see but it would be even more clear if we used an `else` clause:

```javascript
if (timeForBed) {
  brushTeeth();
} else {
  eatSnacks();
}
```

Sometimes there might be more than just two cases. For instance, we
probably shouldn’t *always* eat just because it’s not bedtime. So
let’s add another condition `hungry`. If it’s bedtime, it doesn’t
matter if we’re hungry—we have to brush our teeth. But if it’s not
bedtime then we can choose whether to eat snacks or read:

```javascript
if (timeForBed) {
  brushTeeth();
}
else {
  if (hungry) {
    eatSnacks();
  } else {
    read();
  }
}
```

Since deeply nested code like this gets hard to read in its own way,
it’s traditional to write something like that like this instead:

```javascript
if (timeForBed) {
  brushTeeth();
} else if (hungry) {
  eatSnacks();
} else {
  read();
}
```

The meaning is the same but it makes it a bit more clear that there
are three branches: the time for bed branch, the not time for bed and
hungry branch, and the neither time for bed nor hungry branch. To
express the same thing as a series of independent `if` clauses we
would need to `&&` in the the negation of all the previous conditions
like this:

```javascript
if (timeForBed) {
  brushTeeth();
}
if (!timeForBed && hungry) {
  eatSnacks();
}
if (!timeForBed && !hungry) {
  read();
}
```

Which is starting to look like our `sleep_in` function. So lets
convert `sleep_in` to `if/else` clauses:


```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  } else if (weekday && !vacation) {
    return false;
  } else if (!weekday && vacation) {
    return true;
  } else if (!weekday && !vacation) {
    return true;
  }
}
```

This doesn’t change the behavior of the function at all. This is
especially true in this case because the code each `if` statement
contains a `return` clause which means as soon as one of the
conditions is true we will return from the function and the other `if`
statements will not get a chance to execute. But it’s still a good
idea to express what we mean and in this case the idea is these four
branches represent four mutually exclusive possibilities.

Since they’re mutually exclusive it doesn’t matter what order they
appear in so let’s reorder so all the branches that return `true` are
together:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  } else if (!weekday && vacation) {
    return true;
  } else if (!weekday && !vacation) {
    return true;
  } else if (weekday && !vacation) {
    return false;
  }
}
```

You might notice that we don’t have a plain `else` clause here. That’s
fine—if none of the conditions are true then we will fall out after
the last clause and then rather than returning a value explicitly from
`sleep_in` it will implicitly return `undefined`. Whic should raise
the question, do these four branches cover all the possible cases so
this function is in fact defined for all possible inputs? If they do,
then logically we could take the condition off the last `else if` like
this:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  } else if (!weekday && vacation) {
    return true;
  } else if (!weekday && !vacation) {
    return true;
  } else {
    return false;
  }
}
```

However, let’s leave it with the condition for now and see if after
some other simplifications we can’t prove to ourselves that we have
captured all the possibilities.

The next simplification is one that is applicable to far more than
simplifying uses of Booleans but it’s useful here:

## Remove duplicate code

It may not be obvious what code is duplicated here as it’s a pretty
small amount but there are three copies of `return true`, one in each
of the first three branches of our `if/else`. Usually we want to
remove duplicate code because it’s hard to read and hard to change:
you have to read carefully to ensure that it’s actually doing the same
thing as other copies and if you need to change it, you need to change
all the copies. In this case those reasons don’t really apply but it’s
still worth seeing how we can get rid of the duplication and it will
move us into a position where we can further simplify things.

Since the duplication occurs in different branches of the `if/else`
structure it’s essentially saying, “return `true` if the first
condition is true or the second condition is true or the third
condition is true.” Well, we have a Boolean operator that can combine
Boolean values with a logical “or”: `||`. So we can rewrite with one
condition that or’s together the three conditions under which we
return `true`:

```javascript
function sleep_in(weekday, vacation) {
  if ((weekday && vacation) || (!weekday && vacation) || (!weekday && !vacation)) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}
```

It’s not clear that that’s a huge improvement in readability but now
we’ve got something to work with. Consider this this gnarly expression:

```javascript
(weekday && vacation) || (!weekday && vacation) || (!weekday && !vacation)
```

Now we can get down to simplifying actual Boolean expressions. This
process is just like simplifying mathematical expressions except with
slightly different rules. With numbers we’re used to rules like for “1
times *x* is *x* for all *x*” and “0 + *x* is *x* for all *x*” and
“*x* / *x* is 1 for all *x* except zero”. Thus you could simplify the
following expression via the following steps, keeping in mind PEMDAS:

```
(32 - 32) + x * (50 / 50)
0 + x * 1
0 + x
x
```

In Boolean logic the rules are actually quite similar:

```
x && true ⟹ x
x || false ⟹ x
```

If you squint you can think of Boolean `&&` as multiplication and `||`
as addition and `true` as 1 and `false` as 0 in which case `x && true
⟹ x` is similar to `n * 1 ⟹ n` and `x || false ⟹ x` is like `n + 0 ⟹
n`.

Two other rules came from basic logic—given any x:

```
x && !x ⟹ false // i.e. you can’t be both hungry and not hungry.
x || !x ⟹ true  // i.e. you are always either hungry or not hungry.
```

And just like in math where we can factor out the `b` in:

```
(a * b) + (c * b)
```

to get:

```
b * (a + c)
```

with Booleans the elements of `&&` expressions `||`’d together can be
factored out, so:

```
(a && b) || (c && d)
```

is equivalent to:

```
b && (a + c)
```

With those rules in mind let’s tackle the big Boolean expression from
the first branch of our `if` statement:

```
(weekday && vacation) || (!weekday && vacation) || (!weekday && !vacation)
```

Group the first two expressions to tackle them first:

```
((weekday && vacation) || (!weekday && vacation)) || (!weekday && !vacation)
```

Then factor out the `vacation` from the two terms of that grouped expression:

```
(vacation && (weekday || !weekday)) || (!weekday && !vacation)
```

Reduce `(weekday || !weekday)` via the `x || !x ⟹ true` rule:

```
(vacation && true) || (!weekday && !vacation)
```

Reduce `(vacation && true)` via the `x && true ⟹ x` rule:

```
vacation || (!weekday && !vacation)
```

Almost there. Now consider how this expression will be evaluated. If
`vacation` is true the value of the whole expression is true and we
don’t even have to think about the part after the `||`. Therefore the
only time the second term is relevant is when `vacation` is false. So
replace `vacation` with `false` in the second term:

```
vacation || (!weekday && !false)
```

Now there are just a couple more simple steps:

```
vacation || (!weekday && true)
```

And:

```
vacation || !weekday
```

Dropping that much simpler expression back into our `if` clause we end
up with this:

```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}
```

I mentioned earlier on that we’d want to make sure that our four
branches were in fact exhaustive, covering all the possible
combinations of arguments we could get. We kind of know they are
because that was how we constructed the very first version of the
function. However we can also use a similar kind of logic to further
simplify the test in the `else if` branch as we did in simplifying the
Boolean expression in the `if` test. Similar to one of the last steps
above, we know that if we end up in the `else if` branch that
`vacation` must false because otherwise the `if` test would have been
true. Similarly, if `weekday` was false then `!weekday` would be true
and the `if` test would have been true; therefore if we’re in the
`else if` test `weekday` must be true. So we can replace `vacation`
with `false` and `weekday` with `true` in the `else if` test:

```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (true && !false){
    return false;
  }
}
```

Hopefully you can see how `true && !false` can be further simplified
all the way down to `true` giving us:

```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (true) {
    return false;
  }
}
```

which is equivalent to:

```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else {
    return false;
  }
}
```

And now we’re ready for the final Boolean related simplification.

## If you need to return a boolean and you have one, just return it.

Look carefully at the version of the function just above. Just the
same way you don’t need to compare a Boolean value with `== true` to
determine whether it is true—it already is either true or false—you
don’t need to use an `if` on a Boolean value to decide whether to
return `true` or `false`. If you have an expression to put in the `if`
test, and you’re going to return true if it’s true and false if it’s
false, just return it:

```javascript
function sleep_in(weekday, vacation) {
  return vacation || !weekday;
}
```
