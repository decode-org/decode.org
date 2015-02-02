---

---
Arrays are the last super basic programming aspect to cover. These aspects that you've learned so far pretty much apply to all programming languages, so they'll be useful everywhere. Once we've done arrays, we'll put all of the stuff covered so far into one neat little program. First, get set up with your code.

**WARN:** Unable to preview web7/arrays/setup

## Arrays

You'll notice that at the beginning of the code, when setting the global variables, the variable `fruit` is being set to `[]`. What on earth does that mean? This is basically telling the program to create an empty array, so we can fill it with stuff. Here you have the basic idea of an array, it's a variable with multiple indices so you can effectively store more than one piece of information in your array. First, populate your array with information right after you declare your global variables.

``` js
//Populate our fruit array
fruit[0] = "Mandarin";
fruit[1] = "Pineapple";
fruit[2] = "Orange";
fruit[3] = "Apple";
```

From here you can see that the notation is pretty simple. To access the index n of a variable, simply type `variable[n]` and then you can treat that just like you would any other variable. Time to make this array do something. Following our usual trend of random things, we're going to pick a random fruit from this list by putting some code in the `getFruit` function.

**WARN:** Unable to preview web7/arrays/getFruit

Whoa! What is that outputting? What does that expression mean? It may seem complicated but when you pick apart `fruit[Math.floor(Math.random() * fruit.length)]`, it's a little more simple than it may seem initially.

*   `Math.random()` generates a random number from 0 to 1
*   `fruit.length` is a special property of an array. It simply returns the length of the array in terms of how many elements it has - which in this case is 4. By multiplying this by the random number, we get a random number from 0 to 4.
*   `Math.floor()` is important because arrays need indices of a natural number. If the number has a a fractional part, like the random number we've generated, you'll get an error. To remedy this, we round the number down using this floor function.
*   The only numbers that can be generated from this are 0, 1, 2 and 3, which are the only elements in our array. We have successfully picked a random one.

That's basically all there is to arrays. Now onto making something really cool.

## Drawing

So what was this `<canvas>` element that's in the `index.html` file. This element is a relatively new HTML file that allows you to directly manipulate pixels on the screen. Using it is pretty simple, but there are some important things you need to keep in mind when using canvases:

*   You need to find the canvas' _context_ by calling `canvas.getContext("2d")`. Store this into a variable such as `ctx`
*   To start drawing, you need to call `ctx.beginPath()`, and then write some drawing code
*   To actually draw some pixels to the screen after your code, you need to call `ctx.fill()` to fill the shape or `ctx.stroke()` to draw an outline of the shape

If you stick to those, you should be fine. Let's add the canvas to a variable for easy access after you declare your global variables.

``` javascript
//Store canvas as variable for easy access
canvas = document.getElementById("drawer");
```

Then put some code in the `addBall` function to actually draw a circle on the canvas.

**WARN:** Unable to preview web7/arrays/draw1

Following that description of drawing earlier, most of this should make sense. One new function you'll see is `ctx.arc()` which is what we're using to draw the circle. For the first time, here is a function that requires more than one argument. Arguments are seperated with a comma (`,`) as you see in the code. The first two arguments are your `x` and `y` arguments. These values can be a little hard to get your head around. `x` refers to the horizontal distance starting from the left side of the canvas. Zero is the leftmost value, and a higher value is more to the right. `y` is similar but zero starts from the top, greater means lower.

![Canvas Diagram](/assets/img/learn/canvas_diagram-01.png)

The third argument, `radius` is simply the radius of the arc (in this case, circle), in pixels.

The fourth and fifth arguments are a little more tricky. The fourth argument refers to the starting point of the arc, in radians. The fifth argument is the end point of the arg, in radians. If you leave the fourth argument as `0`, and the fifth as `Math.PI * 2`, you will draw a circle which is what you want in most cases.

## Making them move

This poses an interesting challenge. To make these circles move, we're going to have to redraw them every time they move. To do this, we're going to have to call a function many times a second. Time to rework the code just a little bit! We already made a `circles` array at the beginning of the program to store all of the circles we add. Then, we're going to change the `addBall` function to put new elements in this array.

``` js
//Adds a ball to our array and randomly sets some parts of it
function addBall() {
    //Create the object
    var circle = {};
    //Set its coordinates as random numbers from 0 - canvas bounds
    //x = 0; y = 0; is the top left corner of the screen
    //As x gets higher, the position goes to the right. As y gets higher, the position goes down
    circle.x = Math.random() * canvas.width;
    circle.y = Math.random() * canvas.height;

    //Adds the circle object to our circle array for drawing under the function
    circles.push(circle);
}
```

This function simply makes a circle object with the `{}` notation, which allows us to store a whole bunch of variables in it. Then we create `x` and `y` variables in the object by setting them. After this we put the object at the end of the circles array with the `array.push(value)` function. Next, we need a function to erase the canvas and draw all the circles to the screen.

``` js
//Function that redraws the circles on the canvas and then waits 10ms before calling the function again
function redraw() {
    //Get the canvas context
    var ctx = canvas.getContext("2d"), circle, ind;

    //Clear the canvas of any previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Loop through all of our circles
    for (ind in circles) {
        //Store circle into temporary variable
        circle = circles[ind];

        //Start drawing
        ctx.beginPath();

        //Draw an arc. Arguments are x (pixels), y (pixels), radius (pixels), startPoint (radians), endPoint (radians)
        ctx.arc(circle.x, circle.y, 5, 0, Math.PI * 2);

        //Fill our arc/circle!
        ctx.fill();
    }

    //Wait 10ms before calling the redraw function again
    setTimeout(redraw, 10);
}
```

This function first clears the canvas using `ctx.clearRect(x, y, width, height)`, which is a function that clears all pixels in the area of a rectangle that you specify the dimensions of. Then it uses this really interesting _for-in_ loop. This is a special kind of for loop that iterates over all of the indices of an array, and then stores it in a variable so then we can do things with the elements of the array. By saying `for (ind in circles)` we are saying "loop over the circles array and on each iteration of the loop, store the index in the variable `ind`". In that function we store the element from the array for quick reference and call all of the familiar drawing code. The last step is to use this special `setTimeout(function, time)` function. This function basically waits `time` miliseconds before calling `function`. By saying we want to call `redraw` in 10ms, we're creating a function that calls itself over and over again. Roughly 100 times a second! We only need to call this function once to get it going on its own.

**WARN:** Unable to preview web7/arrays/redraw1

But that has simply replicated the code that we just made but in a more complicated state. To add that movement, we must first add `hSpeed` and `vSpeed` variables to the balls that says how fast they are moving in both the horizontal and vertical directions. Add this code to the `addBall` function, right after you set its `x` and `y` values.

``` js
//Sets random speed values which we will access later, between -1 and 1
circle.hSpeed = Math.random() * 2 - 1;
circle.vSpeed = Math.random() * 2 - 1;
```

This picks a random value from -1 to 1 and sets it to each speed to put the ball in a random direction. Then to actually make it move, every time we redraw, we must also add these speed values to the ball's position. Over time, these small values can make it move quite fast!

**WARN:** Unable to preview web7/arrays/drawSpeed

## Making them Bounce

You'll notice that there's nothing to stop the balls from just moving out of the canvas and out of view. We could leave it like this, but really they should stay in the field of view, they just need to bounce off the walls. Time to use an if statement here! Add this little snippet right after we change the positions of the balls in the loop but before we draw them.

**WARN:** Unable to preview web7/arrays/bounce

This basically checks if the `x` value is too far left, by using the expression `x < 0`, and checks if it is too far right by using `x > canvas.width`. If this is the case, it is just about to go out of view, or is out of view, so we need to turn it around. To turn it around, we just flip the speed around with this statement: `hSpeed = -hSpeed;`. The same process goes for the `y` value, but with its respective variables used.

## Well Done

This is certainly a lot to take in, so read through it again if you're confused and try out all of the examples. Once you've got your head around all this stuff, try some of these ideas to further your knowledge.

### Change the range of speeds

You can do this when you set the speed of the circle object in your `addBall` function.

### Add 1000 circles at once

Just use a loop like we did in the lesson before! Go back and look if you're confused about that.

### Make the size of the circles random

To do this, you must make a new `size` variable for the circle just like you do in your other properties when creating it. After you do this, you need to pass this variable to the radius argument on your `arc` function, just like you do with `circle.x` and `circle.y`.

### Make the circles have a random colour

There are lots of ways to do this, but a really simple way is to define a set of colours at the beginning of your document like this:

``` javascript
var colours = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"];
```

Then, just like with your setting of size, you need to add another variable to your circle object when you define it. To pick a random colour, simply use the same method used to pick a random fruit at the beginning, and assign that to your `colour` variable. To then actually draw this new colour, add a new line to set `ctx.fillStyle` after starting to draw, but before your arc:

``` javascript
ctx.fillStyle = circle.colour;
ctx.arc(...);
```

### Add gravity and friction

To do this, you need to manipulate the speed values of the circles at each and every step, just like you manipulate the circles `x` and `y` values. Using your understanding of physics, try and see how you can make this work!
