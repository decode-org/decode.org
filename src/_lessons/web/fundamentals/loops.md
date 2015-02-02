---

---
Loops are so important in programming for automation and complex tasks. They'll allow you to do things in miliseconds what would take an ordinary human years. Let's get set up

## Setup Files

**WARN:** Unable to preview web6/loops/setup

## Making Conversations Easy

Before we get onto loops, we can learn about another really neat element of programming: switch statements. Switch statements allow you to take the value of something, and create a number of outcomes depending on that value. Think of it as a whole bunch of if statements with far less hassle. The syntax of a switch statement is really simple:

``` javascript
switch (value) {
case value:
    code();
    break;
case value2:
case value3:
    code2();
    break;
default:
    defaultCode();
    break;
}
```

So the way this works, is that the `switch (value)` code starts the switch statement. One would usually have a variable in the place of the `value`. Inside the switch statement we specify a number of cases, and inside each case we put some code. After the code is finished, a `break;` statement needs to be used in order to stop it from going through to the next case. The `default` keyword specifies the option to take when none of the cases are performed. You'll also notice that instead of our command for outputting we used `alert()`. This displays the information in another window. Time to improve the chat engine we made before and use a switch statement to talk to the browser

<?= codeSnippet::preview("web6/loops/firstSwitch"); ?>

## Enter Loops

Loops do what their name suggests. They perform a piece of code and _loop_ back to the beginning to perform the code again. They keep going until certain conditions are fulfilled. For loops are a very common type of loop, and they follow this simple syntax.

``` javascript
for (initialisation; expression; afterthought) {
    code();
}
```

Once reached, the code is executed in a very specific order. The flowchart below explains this order.

![For Loop Diagram](/assets/img/learn/loop_diagram-01.png)

The most common implementation of this is to have a variable, and increase that variable by 1 on every afterthought. By checking if the variable is lesser than a certain number in the expression, we can loop through a piece of code that many times. It's easier to see it with an example, so let's make our output far more annoying by saying it 10 times. First, change your variable declarations at the beginning of the function to add a new variable, `i`.

<?= luminous::highlight("javascript", 'var out = "", i = 0;'); ?>

Then, add a for loop to your output code to make it execute 10 times, using this new variable.

**WARN:** Unable to preview web6/loops/forLoop

Now isn't that extremely annoying? Don't abuse these functions, you can quite easily get a lot of people upset with you.

## While Loops

Another less used, but still very useful, loop is the while loop. It basically executes a piece of code while a condition is true. Consider it a for loop without the initialisation or afterthought. The syntax is as follows

``` javascript
while (condition) {
    code();
}
```
![While Loop Diagram](/assets/img/learn/loop_diagram-02.png) 

We're going to use this loop here to make a "continous random", something made up right here at Decode to help you out. Basically, it generates a random number until that number is larger than a value we specify, and then exits the loop. Here's the code for that function that's been sitting here empty for the whole lesson.

**WARN:** Unable to preview web6/loops/whileLoop

This code is really quite simple. We start with the variable, `rand`. In the loop we come up with a new value for it, and then output that value. If the value is greater than 0.9, the loop will exit and output the last calculated value as "good".

## Well Done

That's all we have on loops, but there are a lot of uses for them. Try some of these extra learning activities.

### Break and Continue

These two statements have useful functionality in loops. The `break` keyword, on its own, will simply exit the loop regardlss of whether a condition has been fulfilled or not. The `continue` keyword will stop executing code in the loop, and go straight to the next iteration. Can you think of any uses for these keywords?

### Fixing the Code

The while loop for our "continous random" outputs the last value twice, and says it's not good, when in reality it is good. Try and fix this.

### Hard Problems

See if you can get a loop to work out a really hard maths problem. Then try and make it customizable with an input field.
