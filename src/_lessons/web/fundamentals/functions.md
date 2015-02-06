---
title: Interactivity with Functions and Events
---
So you've learned the basics of Javascript and programming, but you haven't yet put true functionality into something (pun intended). How can we add user interaction? Make it so people can tell our app what to do. We must start with the function.

## Your Files

Here is a direct copy of the setup from the previous lesson. If you have it, great, but if you don't, here's a pen:

{% codepen c8676b65f253c23fadd8031baf61c32f height: 200 %}

## Make a Function

Functions are predefined pieces of code that you can refer to again and again to make your life easier when reusing common code. They can also have arguments passed to them which allows for great modular programming. You've already used functions before, when typing `document.getElementById("id")`. Let's make our own in the `main.js` file.

``` js
//Set up a variable
var a = 5;

//Define function
function myFunction() {
    document.getElementById("output").innerHTML = a;
}

//Call the function
myFunction();
```

Note the use of `//` to write comments, these are lines of code that aren't executed and help us humans make sense of things. They explain exactly what's going on here.

1.  We define a variable `a` as 5
2.  We define a function using the `function functionName()` notation. Everything inside those curly braces `{ }` is part of that function
3.  We call the function that we just set by typing the name of it `myFunction` followed by two brackets `()`. This executes the code that we just defined in the function, and your output div should say "5".

## Make your function useful

At the moment, this function is actually forcing us to write more code than we need. We can make it a little bit more useful. Remember those operators from earlier on? Lets chuck one in the function

``` js
//Set up a variable
var a = 5;

//Define function
function myFunction() {
    a += 5;
    document.getElementById("output").innerHTML = a;
}

//Call the function
myFunction();
myFunction();
```

Now it's displaying 15! What's going on here? Well, in your function you've added 5 to `a` before outputting it, so `a` is equal to 10. But you're actually calling the function _twice_ so another 5 gets added and `a` ends up being 15. Displaying the text 15 is nothing we can't do without plain 'ol HTML, so it's time to add some interactivity.

## Events

Events are another special concept that will make your programs really powerful. Events are simply things that happen in a program. A button gets pressed, the user moves the mouse, some data is transferred online, are all examples of an event occuring. Events usually have code associated with them, otherwise they wouldn't be useful. How do we give events the code? Most of the time, it's through a function. Let's add this function we just made to our button in the html file.

``` js
//Set up a variable
var a = 5;

//Define function
function myFunction() {
    a += 5;
    document.getElementById("output").innerHTML = a;
}

//Add the function to the buttons onclick event
document.getElementById("button").onclick = myFunction;
```

All we do is access the button object and set its `onclick` variable to our function, and then it's set. Note that there are no brackets after the function in this case as we're not calling it, we're just referring to it. Now when you click on the button, you should see the output, and every subsequent click will add 5 to `a`. Now you can make websites that actually do things.

{% codepen b675d64dd700010261518a24a6865ae1 height: 200 %}

That's all we have on this topic. To increase your knowledge, try out some extra tasks without the help of this website.

## Extra Stuff

*   Try making it so the number doubles every time
*   Add a second button that subtracts 5 every time
