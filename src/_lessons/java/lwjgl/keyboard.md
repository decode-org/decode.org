---
title: Keyboard Input with LWJGL
---
## Introduction

During this lesson, we will make our two players respond to different keyboard inputs, and make them move up and down. We will also make sure that our players do not go outside
of the bounds of the screen, otherwise we cannot find them. We will use the w and s keys for player 1, and the up and down arrow keys for player 2. At the end of this lesson, we 
should have two fully responsive players on our screen, so we then can place the ball in and give it physics to make it even more interactive.

## Keyboard Input

Below is the changes we have made. The first snippet is the changes I have made to our `Pong` class. Note that it is not the whole entire class, it is only 
what we have changed as our class is getting a bit to big, so we only want to display important sections in it.

``` java
/**
 * Starts the game
 */
public void startGame()
{
    objectList.add(new Player(20, 250)); // adds player 1 to our list
    objectList.add(new Player(755, 250)); // adds player 2 to our list
    while (!Display.isCloseRequested())
    {
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); // clears the screen ready for rendering on the next frame.
        glMatrixMode(GL_MODELVIEW);
        glLoadIdentity();
        Display.sync(60); // make sure the framerate does not go past 60 fps
        glPushMatrix(); // starts the matrix for rendering everything
        for (Renderable r : objectList) // loop through each renderable object in our list
        {
            r.render(); // draws our object
        }
        glPopMatrix(); // finishes the matrix for rendering everything
        handleKeyPresses(); // call the key press handlers
        Display.update(); // refresh the screen and draw what has been defined in this loop
    }
    dispose(); // cleanup
}
/**
 * Handles all of our actions when certain keys are pressed
 */
private void handleKeyPresses()
{
    final int pY = height - 100; // creates our y position for each player (otherwise the player would go off the screen)
    Player p1 = (Player)objectList.get(0); // reference to our first player
    Player p2 = (Player)objectList.get(1); // reference to our second player 
    if (Keyboard.isKeyDown(Keyboard.KEY_W)) // checks if the W key is pressed
    {
        if (p1.getY() >= 0) // checks if the player's y value is greater than 0
        {
            p1.setY(p1.getY() - 10); // decrements the player's y value by 10
            if (p1.getY() <= 0) 
            {
                p1.setY(0); // sets the player's y value to 0 if the previous y value was below 0. 
            }
        }
    }
    if (Keyboard.isKeyDown(Keyboard.KEY_S)) // checks if the S key is pressed
    {
        if (p1.getY() <= pY) // checks if the player's y value is less than the height
        {
            p1.setY(p1.getY() + 10); // increments the player's y value by 10
            if (p1.getY() >= pY)
            {
                p1.setY(pY); // sets the player's y value to the height if the previous y value was abouve the height
            }
        }
    }
    if (Keyboard.isKeyDown(Keyboard.KEY_UP)) // checks if the Up arrow is pressed
    {
        if (p2.getY() >= 0) // checks if the player's y value is greater than 0
        {
            p2.setY(p2.getY() - 10); // decrements the player's y value by 10
            if (p2.getY() <= 0) 
            {
                p2.setY(0); // sets the player's y value to 0 if the previous y value was below 0. 
            }
        }
    }
    if (Keyboard.isKeyDown(Keyboard.KEY_DOWN))
    {
        if (p2.getY() <= pY) // checks if the player's y value is less than the height
        {
            p2.setY(p2.getY() + 10); // increments the player's y value by 10
            if (p2.getY() >= pY)
            {
                p2.setY(pY); // sets the player's y value to the height if the previous y value was abouve the height
            }
        }
    }
    if (Keyboard.isKeyDown(Keyboard.KEY_ESCAPE)) // checks if the escape key has been pressed
    {
        this.dispose(); // cleans up and exits our application
    }
}
```

We will first look at the changes we have made to the `startGame()` method, which really are not a lot. There is one new change, and that is we have added a method
call to `handleKeyPress()`. This is so we do not write our key press handlers within the main loop, which would look ugly, unorganized, and someone who was reading the code
(like you) would find it really hard to interpret, therefore we have moved it to a different method. It is advisable that you do organize your methods properly, and not bundle
all of the functions that those methods bring into one big method.

Before we go into a large tangent on code conventions, we will steer back on track and look at what the `handleKeyPress()` does. It is clearly simple what it does do,
it handles key presses, but we will explain how it does this next.

The code within this method is pretty repetitive, so we will explain how one section of the rest works in detail, and the rest would be self-explanatory. First, we create a
couple of variable, 1 constant that holds our preferred max y position of our players (otherwise they would go off the screen), and 2 that holds references to our players, so we
do not have to consistently creating new references throughout the method. We retrieve these references by calling the `get()` method in a `ArrayList`.
The index we pass in is a straightforward number, because our indexes of the players never change within the list.

There are multiple `if` statements within this method that check if a certain key is pressed because we want the program to handle the events when maybe more than one
key is pressed, therefore an `else if` statement would not work here. There is another way to achieve this, which is to use a buffer (a list of any unhandled key presses)
, but that only checks if a key was pressed, not held down. Since our game relies on keys being held down, this would not work here either, so the setup that we have is the most
simple and ideal way of achieving what we want.

The first `if` statement checks whether the W key is down. If it is, then it will then check if player 1's `y` position is larger than or equal to 0. If we
did not have this conditional, then the player could move off the screen when the key is pressed. It essentially acts as the barrier. If the `y` value is larger than 0,
then we will remove 10 pixels from the position, making it move up 10 pixels. (The `x` and `y` coordinates with LWJGL are what pixel the coordinate is at).
It then does another check to see if the new `y` value is less than 0. If so, it sets the `y` value to 0, therefore it will go no further than 0 (further
than 0 would mean off the screen).

The same, but opposite thing is happening with the next `if` statement which checks whether the S key was pressed. What is different in this conditional is that
we then check whether the `y` value of player 1 is less than or equal to the height of the screen minus the height of the player (what the `pY` variable
evaluates). If it is, then it will increment the `y` value by 10 pixels, and then does another check to see if the new `y` position is less than 
`pY` and assigns the `y` value to `pY` if it is. Essentially the opposite of what is happening in the first `if` statement.

The next two `if` statements are the same as the first two, but with all of the player 1 references replaced with player 2 references, so it is modifying the 
`y` values of player 2 instead. The Up and Down arrow keys are checked if they are pressed in these `if` statements.

The last `if` statement might seem a bit unique. We are checking if the Esc button has been pressed. If it has been, then it will exit the application (and clean
up our resources of course). This adds another way of exiting our game other than the red 'x' button in the game window.

That is it for our keyboard tutorial. In the next tutorial, we will draw our ball onto the screen.

## Summary

We have learnt how to trigger events when certain keys are pressed using LWJGL as well as when each type of key press listening techniques are best suited for different types of 
circumstances. The result of this tutorial: Both players now move when their keys are pressed, and they do not go off the screen - they stop at the borders of it. Move onto the next
tutorial when ready.
