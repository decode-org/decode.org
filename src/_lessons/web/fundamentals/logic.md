---
title: What If?
---
Events have enabled us to create interactivity within our programs, but let's learn some new concepts that will enhance this interactivity. First a new `index.html` file with some new elements.

``` html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="main.css" />
    </head>
    <body>
        <div id="output"></div>
        
        <input type="text" value="An Input" id="input" />
        <div class="button" id="button">Is it love?</div>
        
        <div class="button" id="button2">Toss</div>
        
        <script type="text/javascript" src="main.js"></script>
    </body>
</html>
```

These files are like the ones used in previous lessons, except we've added a second button, and an `<input>` element with its `type` attribute set to `"text"`. If you open your html file, you'll discover that this makes a text field that people can type into, which is what we'll be tampering with in our JavaScript. But first, a note on logic.

## Boolean Logic

When we refer to logic in computer programming, we are usually referring to _Boolean Logic_. Boolean logic is a special way of thinking about things, in which a statement is either `true` or `false`. There are different ways to make a statement true or false under boolean logic, a common way is through comparing two variables. Consider two numbers, `a` and `b`, which we can compare in a number of ways:

*   `a == b` or `a === b` will return `true` if `a` *is equal to* `b`
*   `a < b` will return `true` if `a` *is lesser than* `b`
*   `a > b` will return `true` if `a` *is greater than* `b`
*   `a <= b` will return `true` if `a` *is lesser than or equal to* `b`
*   `a >= b` will return `true` if `a` *is greater than or equal to* `b`
*   `a != b` or `a !== b` will return `true` if `a` *is not equal to* `b`

Through `if` and `else` statements, we can execute certain pieces of code on the condition that these statements are true, or are not true. Let's write a function.

``` js
//Define a function
function checkLove() {
    if (document.getElementById("input").value === "yes") {
        document.getElementById("output").innerHTML = "Fantastic!"
    }
}

//Add the function to the button's onclick event
document.getElementById("button").onclick = checkLove;
```

What is this supposed to do? Basically, we have a function that is bound to the click event of our button. This function takes the text that is inside the text field (`value`), and checks to see if it is equal to `"yes"`. If it is, we have showed our love to the browser and it outputs the text *Fantastic!* at us.

But this only takes a lowercase version of the string `"yes"`. We need to accomodate for people that type in all caps, or capitalise the first letter of the word. To do this, we can convert the string inside the text field to uppercase first, and then compare it to an uppercase version of our string.

``` js
function checkLove() {
    if (document.getElementById("input").value.toUpperCase() === "YES") {
        document.getElementById("output").innerHTML = "Fantastic!"
    }
}
```

This should work for all forms of the string `"yes"`. This function could be a lot more useful if it displayed an alternative when we don't express our love to the browser. To execute code in the instance of an expression being false, just put it in an `else` block of code.

``` js
//Define a function
function checkLove() {
    if (document.getElementById("input").value.toUpperCase() === "YES") {
        document.getElementById("output").innerHTML = "Fantastic!"
    } else {
        document.getElementById("output").innerHTML = "I'm sad!";
    }
}

//Add the function to the button's onclick event
document.getElementById("button").onclick = checkLove;
```

{% codepen 3651949fba3287660975889620ec7c3a height: 300 %}

## Logical Operators

What if we want to combine two or more expressions to determine whether we want to do something or not? Logical operators allow you to do just that, through a syntax like this:

``` js
((expression) OPERATOR (expression))
```

There are three different kinds of operators you'll typically always have access to is a programmer

*   OR (`||`): Returns true if either expression is true
*   AND (`&&`): Returns true if both expressions are true
*   XOR (`^^`): Returns true if the expressions are different (**this isn't available in JavaScript**)

Here is a table explaining the possible outcomes of the different operators when comparing different boolean values

Expression      |OR (<code>&#124;&#124;</code>)|AND (`&&`)|XOR (`^^`)
----------------|---------|----------|----------
True • True     |True     |True      |False
True • False    |True     |False     |True
False • False   |False    |False     |False

We're going to make use of the OR operator to improve our function just a little bit. We're going to add a shorthand for the text yes, and that's simply the character y. Adding it in is relatively simple

``` js
//Define a function
function checkLove() {
    if ((document.getElementById("input").value.toUpperCase() === "YES") || (document.getElementById("input").value.toUpperCase() === "Y")) {
        document.getElementById("output").innerHTML = "Fantastic!";
    } else {
        document.getElementById("output").innerHTML = "I'm sad!";
    }
}

//Add the function to the button's onclick event
document.getElementById("button").onclick = checkLove;
```

If you enter in "y" in the text field now, the browser should be happy with your love as well.

## Making a Coin Toss

That second button we made is for a coin toss function, which will make use of a new function: `Math.random()`. This function will return a random value between 0 and 1, and is a good way of adding uncertainty to a program which is useful for a whole lot of things.

``` js
//Define another function
function coinToss() {
    if (Math.random() < 0.5) {
        document.getElementById("output").innerHTML = "Heads!";
    } else {
        document.getElementById("output").innerHTML = "Tails!";
    }
}
//Add the function to the button's onclick event
document.getElementById("button2").onclick = coinToss;
```

So in this function, which we've bound to the second button, we're generating a random number and seeing if it is lesser than 0.5. Funnily enough, this has a 0.5 chance of being true, or 1 in 2. You could replace that number with anything to change the probability of getting a heads or tails. Depending on the outcome of this, we're setting the output to either heads or tails. We can make it slightly more complex by adding a remote chance of the coin landing on its side, by adding another if statement into the mix.

``` js
//Define a function
function checkLove() {
    if ((document.getElementById("input").value.toUpperCase() === "YES") || (document.getElementById("input").value.toUpperCase() === "Y")) {
        document.getElementById("output").innerHTML = "Fantastic!";
    } else {
        document.getElementById("output").innerHTML = "I'm sad!";
    }
}

//Define another function
function coinToss() {
    var rand = Math.random();
    if (rand < 0.45) {
        document.getElementById("output").innerHTML = "Heads!";
    } else if (rand < 0.9) {
        document.getElementById("output").innerHTML = "Tails!";
    } else {
        document.getElementById("output").innerHTML = "The coin broke :/";
    }
}

//Add the functions to the buttons' onclick events
document.getElementById("button").onclick = checkLove;
document.getElementById("button2").onclick = coinToss;
```

What's this with more variables and extra if statements? What's happening here is we're setting our random number to a variable because we need to refer to it more than once. The rest speaks for itself. The first if statement has a 45% percent chance, the second then has 90%-45% chance (also 45%), and then the last statement (broken coin) has a 10% chance, and now you've got a simple coin tossing app.

{% codepen 20275ef606d978242faa471c810d0aa3 height 300 %}

## What now?

You've worked through if statements and that's another powerful tool to make great programs. For some extra steps beyond what's covered in this lesson, try figuring out some other things:

*   Add different statements to your first `checkLove` function, such as responding to someone saying "Maybe"
*   Make a dice rolling function by adding more outcomes
*   Make something's colour change randomly. This will probably require some searching online (another useful skill)
