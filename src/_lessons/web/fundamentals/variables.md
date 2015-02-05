---
title: JavaScript and Variables
---
So far, the languages we've dealt with have not been programming languages. For web applications, or any application for that matter, to be truly dynamic, a programming language is incorporated. Javascript is the programming language of the web and is an interpreted, high level, object oriented programming language. This makes it a really powerful, but very easy to use language for making your websites really quite nice.

## Prepare For Javascript

Javascript is stored in `.js` files, and like CSS files, we must tell the browser in our HTML document to link to them. For this project, make an `index.html`, a `main.css` and a `main.js` file. Similar to the last lesson's file, fill your `index.html` like so:

``` html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="main.css" />
    </head>
    <body>
        <div id="output"></div>
        <div class="button" id="button"></div>

        <script type="text/javascript" src="main.js"></script>
    </body>
</html>
```

This is a pretty simple file, but there are some new things here. There is the `id` attribute, which is a unique identifier for elements in your HTML document. It's useful for css but it is the most useful for identifying elements with javascript. You can not have more than one element with the same id attribute in your HTML document.

The second new aspect here is the `<script>` element, which links to your javascript file. This is similar to the `<link>` element, but with a few key differences:

*   It is not self closing, so you must add `</script>` to the end of it
*   You do not need to set the `rel` attribute
*   Instead of setting the `href` attribute to point to its source, you set the `src` attribute
*   It is at the end of the `<body>` element, rather than in the `<head>` element. It's perfectly acceptable to put it in the `<head>` element, but it goes in the body for two main reasons
*  The script needs to make reference to objects on the page sometimes. If these pages haven't been loaded yet, for example, in the head element, you won't be able to access them.
*  Some scripts can be quite heavy in terms of file size, and people want to have their webpage displayed as soon as possible, so that the user doesn't get upset. Putting the script at the end means that the page will load first

Now fill your css file with the `button` class we made in the last lesson, just for some good looks.

``` css
.button {
    width: 200px;
    height: 40px;
    background: #111111;
    color: #ffffff;
    padding-top: 20px;
    text-align: center;
    font-family: Tahoma, sans-serif;
    margin-left: auto;
    margin-right: auto;
}
.button:hover {
    background: #aaaaaa;
    cursor: pointer;
}
```

## Hello World!

"Hello World!" is an infamous program that first time programmers use to prove that they can program. It involves printing that very simple phrase to the screen, we shall do exactly the same, try this code out in your `main.js` file

**WARN:** Unable to preview web3/variables/config1

If you have done everything correctly, this text should display where you put your script element. And just like that, you are now a programmer! But what exactly have we done here? The first thing you've done is accessed an object called `document` which represents your HTML document, and then by using the period (`.`), you can access properties within that object. A property that you have accessed is a function, called `write`, and then to this function you have passed an argument, the text `"Hello World!"`. The browser executes that function and prints the text as asked.

`document.write` is generally frowned upon for security reasons, so now we can turn to that div we created earlier for outputting. Change your code to this

**WARN:** Unable to preview web3/variables/config2

Now if you execute this, the text should appear where you made your output `div`. What's going on this time? We're accessing the same `document` object, but using a different function. `getElementById` will take an id as an argument, and then return an element from the document with that id. In this case we gave it `output`, so in return, it gave us the output element from the document. Then on that object, we're accessing a variable, `innerHTML`, and then setting that variable with `=` to the string `"Hello World!"`. And from that, the text has been put into the document

## Variables?

Here's a new term for you. A variable is a really important thing for programmers, and understanding them will be a great step towards becoming a good programmer. A variable simply stores a bit of data that you can access and change. There are many different kinds, but you'll mainly deal with numbers and strings (text). To declare a variable in Javascript, do the following

``` js
var a = 5;
```

We've set `a` to `5`. You should only define a variable once in a document, to access it again, just set it without the var sign.

``` js
a = 5;
```

Great, so now what? We can access that variable and put it in our document.

**WARN:** Unable to preview web3/variables/config3

So now we've set `a` to `5`, and then set `innerHTML` to `a`. So with any luck, you should see the number 5 on screen.

### Maths with Variables

Computers are pretty smart, and we can tap into that smartness in a lot of different ways. One way is to get them to perform calculations that we can't be bothered to do. Typing out maths in a programming language is pretty simple

``` js
var a = (5 + 2) * 3 / 9 - 1;
```

You should be familiar with all of those symbols, but just in case

*   `+` means adding
*   `-` means subtracting
*   `*` means multiplying
*   `/` means dividing

And in conjunction with regular BEDMAS rules, we've also made use of some brackets. Bear in mind that none of this has to be put in the variable's definition. By putting an equals sign after the operator, it can be put almost anywhere

``` js
var a = 2;
a += 20;
```

Just like with our `innerHTML`, variables can be put on the right side of the equation as well

**WARN:** Unable to preview web3/variables/config4

And that's about all you need to know for a basic understanding of variables. Currently, it may seem like programming isn't helping us much, but we're not far away from some true interactivity.
