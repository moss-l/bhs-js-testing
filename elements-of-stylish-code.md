# Elements of stylish code

Writing programs is sometimes just a means to an end. We need the
computer to do a thing so we write a program to tell it how. From that
point of view it doesn’t matter *how* we write our programs as long as
the program works. The computer certainly doesn’t care.

Unfortunately, even from a purely utilitarian point of view, there’s a
big problem with this take on programming. Namely that even simple
programs can be frustratingly hard to get right. For anything other
than the most trivial toy problems, programmers have found over and
over that the only reliable way to write a program that works is to
write a program that is as simple and easy to understand as possible.

And from a slightly less utilitarian point of view, it is also much
more satisfying to write simple and clear code than complex code that
just barely works—programming is ultimately a kind of thinking and the
process of writing a program is where we distill and clarify our
thoughts. It’s very satisfying to boil a problem down to its essence
and then capture that essence in code.

Luckily there are some ways of thinking about coding that will both
help us to make our code more clear and likely to be correct but also
to guide to a clearer understanding of the program we are trying to
write. I’ll take about some of the more important ones in these notes.

## Use good names

One of simplest things you can do to make your code easier to
understand is to use good names. This is the biggest difference
between human readers of code and the computer. For the computer names
are just arbitrary labels that could literally be anything and which
may not even exist by the time the program is running. (You may write
a program in terms of a variable like `score` once the program is
running the value of `score` lives in some particular bit of memory in
the computer and the running code is all in terms of that bit of
memory; the name is no longer needed.)

But for humans, obviously meaningful names are a huge aid to
understanding. Yet despite that, new programmers tend to not pay
enough attention to names. Here are a few rules of thumb to improve
your names.

### Use the same words you would use to talk about your program

The single best way to choose good names is to try to write your code
so it can almost be read out loud as English. One way to get there is
to describe in English what the code does and then use the same words
in the code itself.

For instance, suppose someone was describing a bit of program in
English and they said: “When the game is over, if the current score is
higher than the all time high score, we update the high score and add
the player’s initials to the all time rankings.” What are some names
you might expect to see in the code implementing that bit of the
program? I’d expect `score`, `highScore`, a Boolean `gameOver`, a
`rankings`list, and some way to access the `player` and their
`initials`. They might be put together like this:

```javascript
if (gameOver && score > highScore) {
  highScore = score;
  rankings.push(player.initials);
}
```

Compare that to something like:

```javascript
if (go && number > kablooie) {
  kablooie = number;
  rankings.push(player.name);
}
```

Logically these bits of code are identical. But the second version
falls into four common naming traps:

- **Excessive abbreviation** Given what we know about the actual
  meaning of this code, `go` is probably an abbreviation for “game
  over”. But it’s not a common abbreviation and if you weren’t already
  familiar with what this code was doing you might have a hard time
  guessing what it stands for. And even if you are familiar with the
  code, it still adds a little mental burden to be translating `go`
  into “game over” every time you see it. While names don’t need to be
  super verbose (`score` is actually better, in my opinion, than
  `currentScore` unless we are specifically trying to contrast the
  current score to some other score) trying to save a few characters
  of typing is not worth the confusion it can cause.

- **Overly generic**. `number` on the other hand is not a great name
  in this context because it is to generic. While it is descriptive
  (assuming the score is indeed a number) it is descriptive at the
  wrong level of abstraction. The score may be a number but lots of
  things are numbers. Why is this number interesting? Well, because
  it’s the score of the game. So call it that.

- **Too much fun** Programming can be fun and there is even some room
  for wordplay within programs. But a common temptation, especially
  among new programmers, is to try and liven things up with fun but
  otherwise meaningless names. The problem here is the same as with
  overly abbreviated names but worse—you just have to just know that
  `kablooie` means the current high score which means every time you
  read this code you’re spending some energy doing that translation.
  And worse, if you forget what it is you have to trace through the
  rest of the program to figure out how it is used and what it
  actually is.

- **Wrong name**. The last trap, using a wrong name, is weirdly common
  but can also lead to the worst confusion. In the good version of the
  code above we have `player.initials` being pushed onto the rankings.
  That matches the English description of the code. In the version
  with naming problems we see `player.name` instead. Since initials
  and names are not the same thing, `name` is subtly wrong. A wrong
  name like this could arise because earlier on we were using names
  instead of initials and thus used the property `name` and only later
  decided to store initials instead. At best this trap can adds the
  same mental translation burden as meaningless or abbreviated names.
  But it also can lead to greater confusion if you sometimes forget
  the actual meaning. With the wrong name some code like `player.name
  = "Peter"` might look fine in a way that `player.initials = "Peter"`
  would not. Better to change the name everywhere to match its actual
  meaning.


### The smaller the scope, the less important the name

A subtlety to layer over these rules is that sometimes you actually do
want to use abbreviated and/or generic names to indicate that the
thing being named is not particularly important. Usually this is
because the name has a very limited scope, meaning it can only be
referred to from a small section of code.

The classic example of this is the loop variable in a `for` loop,
looping over a string or array. It’s scope is limited to the body of
the loop which hopefully should only be a few lines. Thus it’s
actually a good idea to use an inignificant name, almost always `i`,
to convey that this is just a regular `for` loop like almost every
other `for` loop:

```javascript
for (let i = 0; i < collection.length; i++) {
  // Do stuff with collection[i]
}
```

In this case `i` is an abbreviation for `index` but it is such a
common idiom in languages with `for` loops and array indices that it
is actually clearer and easier to read than something longer like
`index`. If the loop variable was anything other than `i` an
experienced programmer would slow down to see what was different about
this particular `for` loop. (If you have nested `for` loops, the inner
loop should use `j` but as we’ll discuss later it’s probably better to
see if you can’t get rid of the nesting instead.)

Similarly, if you are writing a function that doesn’t care about the
meaning of its arguments beyond what kind of values they are, then it
is often good to use fairly generic names exactly to indicate that the
only thing about the argument that matters is its type. And because
the names of a function’s parameters are only meaningful within the
body of the function, there’s a pretty constrained number of lines of
code that can possibly refer to the name

```javascript
function maximum(numbers) {
  let max = -Infinity;
  for (let i = 0; i < numbers.length; i++) {
    max = Math.max(max, numbers[i]);
  }
  return max;
}
```

### Connect through names

The final trick with names is not to use them to show how different
parts of your code are connected by using the same name everywhere to
refer to the same conceptual thing and, conversely, to use different
names for different things.

For instance, if you have two different functions that take the score
of the game an an argument, use the same name in each:

```javascript
function isAllTimeHigh(score) {
  …
}

function level(score) {
  …
}

```

Since function parameters are only meaningful within the body of the
function, the fact that these two functions both use the name `score`
for their argument makes no difference to the behavior of the program.
One could use `xyz` while the other used `abc` without changing the
logic at all. But to a human reader, beyond the fact that `score` is a
better name than either `xyz` or `abc`, it can be a useful clue that
these functions operate on the same kind of thing—not on arbitrary
vaules, not even on any old numbers, but on numbers that can represent
a score in the game.

The flip side of this rule of thumb is *don’t* use the same name to
mean different things; don’t use `score` somewhere else to refer to
the number of aliens zapped if that is only part of the player’s total
score.

You can also make the connections between different pieces of code by
using related names. Just looking at this:

```javascript
function frobnicate(scores) {
  // ...
}
```

without knowing what `frobnicate` actually does (maybe not the best
name itself), we can at least guess that it is operating on some
collection of the kind of values we pass around with the name `score`
because of the English-language relationship between `scores` and
`score`.



## Divide and conquer

The fundamental strategy of programming is divide and conquer. Every
school of thought about programming from structured programming in the
50s to present-day object oriented and functional styles is arguably
about different ways ways of dividing large programs into smaller,
intellectually managable chunks and then recombining them in reliable
ways.
