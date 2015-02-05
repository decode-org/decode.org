---
title: jQuery
---
There are smart people all over the world trying to make your life as a programmer easier. You will be often told to not reinvent the wheel, and this is very good advice. One library designed to make Javascript easier is [jQuery](http://jquery.com/). A great tutorial for getting started can be found [here<a/>. On Decode, there are two examples to play with, a quiz, and an object engine

## Quiz

This takes in a list of questions and answers and randomly generates a quiz based on that.

**WARN:** Unable to preview jquery/quiz/quiz

## Object Engine

This is an engine that allows you to define and place objects in a canvas. Each object draws in a different way!

**WARN:** Unable to preview jquery/objects/objects

In `core.js` you'll see all of the setup code, which you don't need to mess around with. `main.js` is where your work happens. You define objects at the beginning and then you create buttons for them. You'll see that we've defined a circle object that works the same as the one in Arrays and Drawing. You can make more with this template. 

``` js
//Rectangle object, falls from the sky!
var NewObject = newObject( function() {

    //This code is executed when the object is created
    this.x = 0;
    this.y = 0;

    // This code is executed when the object is updated
    this.update = function() {

    }

    //This code is executed when the object is drawn
    this.draw = function() {

    }
});
Rectangle.displayName = "Object";
```

For example, here's a rectangle that falls to the ground.

``` js
//Rectangle object, falls from the sky!
var Rectangle = newObject( function() {

    //This code is executed when the object is created
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.hSpeed = 0;
    this.vSpeed = 0;

    this.width = Math.random() * 10 + 5;
    this.height = Math.random() * 10 + 5;

    // This code is executed when the object is updated
    this.update = function() {
        this.x += this.hSpeed;
        this.y += this.vSpeed;

        if ((this.x < 0) || (this.x + this.height > canvas.height)) {
            this.hSpeed = -this.hSpeed;
        }

        if ((this.y < 0) || (this.y + this.height > canvas.height)) {
            this.vSpeed = 0;
        } else {
            this.vSpeed += 0.5;
        }   
    }

    //This code is executed when the object is drawn
    this.draw = function() {
       var ctx = canvas.getContext("2d");
       ctx.beginPath();
       ctx.rect(this.x, this.y, this.width, this.height);
       ctx.fill();
    }
});
Rectangle.displayName = "Rectangle";
```

Making buttons for their associated is easy. Put this after your `initWorld()` call.

<?= luminous::highlight("javascript", "addButton(ObjectName);"); ?>

Try doing something new and interesting with your code! Chuck some new drawing calls in there, you can find a list of functions to call from `ctx` <a href="http://www.w3schools.com/tags/ref_canvas.asp" target="_blank">here](http://www.codecademy.com/tracks/jquery).
