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

One of simplest things you can do to improve the legibility of your
code (including to yourself) is to use good names. This is the biggest
difference between human readers of code and the computer. For the
computer names are just arbitrary labels that could literally be
anything and which may not even exist by the time the program is
running. (You may write a program in terms of a variable like
`currentScore` but once the program is running the value of
`currentScore` lives in some particular bit of memory in the computer
and the running code is all in terms of that bit of memory; the name
is no longer needed.)

But for humans, obviously meaningful names are a huge aid to
understanding. Yet despite that, new programmers tend to not pay
enough attention to names. Here are a few rules of thumb to improve
your names.

### Use the same words you would use to talk about your program

Suppose someone was describing a bit of program in English and they
said: “When the game is over, if the current score is higher than the
all time high score, we update the high score and add the player’s
initials to the all time rankings.” What are some names you might
expect to see in the code implementing that bit of the program? I’d
expect `score` or maybe `currentScore`, `highScore`, and maybe a
Boolean `gameOver` or a function `gameOver()` that checks whether the
game is over. They might be put together like this:

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
  in this context because while it is descriptive (assuming the score
  is indeed a number) it is descriptive at the wrong level of
  abstraction. Okay, it’s a number but lots of things are numbers. Why
  is this number interesting? Well, because it’s the score of the
  game.

- **Too much fun** Programming should be fun and there is even some
  room for wordplay within programs. But a common temptation,
  especially among new programmers, is to try and liven things up with
  fun but otherwise meaningless names. The problem here is the same as
  with overly abbreviated names but worse—you just have to just know
  that `kablooie` means the current high score which means every time
  you read this code you’re spending some energy doing that
  translation. And worse, if you forget what it is you have to trace
  through the rest of the program to figure out how it is used and
  what it actually is.

- **Wrong name**. The last trap, using a wrong name, is weirdly common
  but also the most confusing. In the good version of the code above
  we have `player.initials` being pushed onto the rankings list which
  matches the English description of the code. In the version with
  naming problems we see `player.name` instead. Since initials and
  names are not the same thing, `name` is subtly wrong. A wrong name
  like this could arise because earlier on we were using names instead
  of initials and thus used the property `name` and only later decided
  to store initials instead. At best this trap can adds the same
  mental translation burden as meaningless and overly abbreviated
  names. But it also can lead to greater confusion if you sometimes
  forget the actual meaning. With the wrong name some code like
  `player.name = "Peter"` might look fine in a way that
  `player.initials = "Peter"` would not.






  This is in someways even
  harder to keep straight than








In any textual programming language the names of things—of variables,
functions, classes—are one of




## Divide and conquer

The fundamental strategy of programming is divide and conquer. Every
school of thought about programming from structured programming in the
50s to present-day object oriented and functional styles is arguably
about different ways ways of dividing large programs into smaller,
intellectually managable chunks and then recombining them in reliable
ways.
