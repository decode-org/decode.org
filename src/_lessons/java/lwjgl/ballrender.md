---
title: Rendering our Ball
---
## Introduction

Within this tutorial, we will create our ball, and render it to the screen. We will also add another keyboard event which starts the game. The movement and physics of the ball 
is not implemented yet, but will be in the next tutorial. Our goal for this one is to render a circular shape on our screen which represents our ball and define the starting
position of it.

## Rendering Circular Shapes

Rendering quads, or lines is one simple thing, but rendering complex shapes such as circles is another, more complicated thing to do. The snippet below is all of the code in our
new class, `Ball` which represents our ball object.

``` java
package org.decode;

import java.awt.Rectangle;

import org.lwjgl.util.Renderable;
import static org.lwjgl.opengl.GL11.*;

/**
 * The class which represents our ball.
 * @author Arbiter
 *
 */
public class Ball implements Renderable
{
	private int x, y; // x and y positions of the ball
	private final int maxSpeed = 10; // the max obtainable speed of the ball
	private final int radius = 25; // radius of the ball
	private Rectangle bounds; // Collision box.
	private int vSpeed, hSpeed; // the horizontal and vertical speed of the ball

	public Ball(int x, int y)
	{
		this.x = x;
		this.y = y;
		this.bounds = new Rectangle(x, y, radius * 2, radius * 2);
	}
	/**
	 * Renders our ball in our game
	 */
	public void render()
	{
		glTranslatef(x, y, 0); // translates the shape to the given coordinates
		glScalef(radius, radius, 1); // scales the shape
		glBegin(GL_TRIANGLE_FAN); // begins drawing triangles that fan out from the center.
		{
			glColor3f(1.0f, 0.003f, 0.04f); // gives it a nice red look
			glVertex2f(0, 0); // sets the center vertex
			for (int i = 0; i <= 360; i++)
			{
				double angle = Math.PI * 2 * i / 360; // finds the angle in radians
				glVertex2f((float)Math.cos(angle), (float)Math.sin(angle)); // sets the outer vertex (to the corresponding vertices of a circle)
			}
		}
		glEnd(); // stops drawing
	}
    /**
     * Called every frame to update the ball's position
     */
	public void update()
	{
		bounds.setBounds(x, y, radius * 2, radius * 2);
	}
	public void setX(int x) {this.x = x;} // sets the x position
	public void setY(int y) {this.y = y;} // sets the y position
	public int getX() {return this.x;} // gets the x position
	public int getY() {return this.y;} // gets the y position
	public Rectangle getCollisionBox() {return this.bounds;} // gets our collision box
}
```

The code snippet below is the changes we have made to our main class, `Pong`

``` java
/** Has our game started? */
public boolean gameStarted;

/** Code between omitted - unchanged */

public void startGame()
{
    objectList.add(new Player(20, 250)); // adds player 1 to our list
    objectList.add(new Player(755, 250)); // adds player 2 to our list
    objectList.add(new Ball(20 + (25 * 2), 300)); // adds the ball to our list
    /** Rest omitted - unchanged */
}
/**
 * Handles all of our actions when certain keys are pressed
 */
private void handleKeyPresses()
{
    final int pY = height - 100; // creates our y position for each player (otherwise the player would go off the screen)
    Player p1 = (Player)objectList.get(0); // reference to our first player
    Player p2 = (Player)objectList.get(1); // reference to our second player 
    Ball ball = (Ball)objectList.get(2); // reference to our ball
    if (Keyboard.isKeyDown(Keyboard.KEY_SPACE) && !gameStarted) // checks if the Space key is pressed and the game has not started
    {
        gameStarted = true;
    }
    if (Keyboard.isKeyDown(Keyboard.KEY_W)) // checks if the W key is pressed
    {
        if (p1.getY() >= 0) // checks if the player's y value is greater than 0
        {
            p1.setY(p1.getY() - 10); // decrements the player's y value by 10
            if (!gameStarted)
            {
                ball.setY(ball.getY() - 10); // moves the ball as well if the game has not started
            }
            if (p1.getY() <= 0) 
            {
                p1.setY(0); // sets the player's y value to 0 if the previous y value was below 0. 
                if (!gameStarted)
                {
                    ball.setY(50); // sets the ball's y value to 50 (the middle of the player)
                }
            }
        }
    }
    if (Keyboard.isKeyDown(Keyboard.KEY_S)) // checks if the S key is pressed
    {
        if (p1.getY() <= pY) // checks if the player's y value is less than the height
        {
            p1.setY(p1.getY() + 10); // increments the player's y value by 10
            if (!gameStarted)
            {
                ball.setY(ball.getY() + 10); // moves the ball as well if the game has not started
            }
            if (p1.getY() >= pY)
            {
                p1.setY(pY); // sets the player's y value to the height if the previous y value was abouve the height
                if (!gameStarted)
                {
                    ball.setY(pY + 50); // sets the ball's y value to height + 50 (the middle of the player)
                }
            }
        }
    }
    /** Rest Omitted - unchanged */
}
```

We will first go over our newly addition to our project, the `Ball` class.

This class will contain all of the functionalities needed for the ball to act the way it should. Our first two fields, `x` and `y` represent the
horizontal and vertical positions of the center of the ball. We then have a couple of constants: `maxSpeed` and `radius`. We then have our object
that would represent our collision box for our ball, then we have something slightly more interesting: `hSpeed` and `vSpeed`. We will come back to these
in the next tutorial, as that will be for making it move.

The constructor looks pretty much the same as the constructor for `Player`. We assign the parameters passed in to the fields and create our collision box object.
It is pretty simple for what is happening here.

The next method, `render()` looks familiar, but it is a little bit different. Notice that we are also implementing `Renderable` in this class, so 
therefore we need to implement this method into our class as it is included into the interface. This will be called every loop when the objects are rendering, much like
how the rendering code for the players are executed. There is some new code in this method, we will now explain this.

The first line translates (moves) the position of our ball to the coordinates passed in. This position represents the center of our ball, so it is not exactly the top left 
corner of the shape (like how the players are drawn). The next line of code scales (increases or decreases the size) of our ball to that of the radius, otherwise our ball will
appear as a tiny dot because of the way it is drawn. Next, we begin drawing a type of triangle that fans out from the middle (isosoleces triangles, where the base of it
is on the circumference of the circle). We then set the color to a nice red.

Our code is a bit more complicated, we have to draw 360 isosceles triangles, with the top angle (the angle at the center) being 1 degree. There are 360 degrees in a 
circle, so this is why we must draw 360 of these triangles. The first vertex position is `0, 0`. We do not need to pass in the horizontal and vertical positions
of the ball here because we have already translated it. The coordinates that we pass in at the first vertex is relative to the translation. `0, 0` means exactly
where the translation should move to.

In the `for` loop, we draw all 360 of these triangles. We work out the angle for what it is at in radians. Radians are required because this is the unit
of measurement for the variables that are passed into the trigonometry functions (`sin()`, `cos()`, `tan()`). These trig functions are measured
in radians, not degrees. Therefore we must convert degrees to radians, which is what the `angle` variable represents. Next we define the vertices for the 
circumference of the circle, all 360 of them. We are using `sin()` and `cos()` to get the position of the point where the radius meets the circumference.
We won't go into the mathematics with this, as it is a bit complicated and we do not need to understand it in order to render a circle, you can just use our code. We then
end drawing our triangles and now we are finished explaining the code for drawing a circle on the screen. For those who want a challenge, you can figure out the mathematics 
for this for yourself.

The `update()` method is defined, but we do not need to explain this next. We will do this in the next tutorial as well.

The last 5 methods of the class are simply our getter and setter methods for the coordinates, and the collision box fields of this class. It is explained why we are using
these methods in the tutorial where we discuss rendering the players - the reason is the same. We do not need to explain these methods, as they are very simple and their
purpose is obvious. (If you are not sure, look over the player rendering tutorial again.)

We are now done explaining the `Ball` class. Next, we will explain the changes we have made to the main class, which are not a lot.

The first change we have made is the addition of a new field: `gameStarted`. This field is a `boolean` and represents whether we have started the
game or not. We will get back to why we are using this later on in this tutorial. The only change we have made to the `startGame()` method, is that we have
added a new `Ball` instance to our render list. We also define the starting position of the ball in the constructor when we create this new instance.

Significant changes have been made to the `handleKeyPress()` method though, we have defined a new handler for when the Space Bar key is pressed. In the conditional
for this event, we check if the space key has been pressed, and also check if `gameStarted` equals to `false`. The only other change is that some code has 
been written to update the ball position when the game has not started yet. This should make the ball 'stick' to player 1 (moving up and down) until the game starts, by pressing
the space key.

## Summary

We have seen how to draw ellipses using LWJGL and have rendered our red ball into the scene. In the next tutorial, we will tackle the physics of the ball so we can 
actually play the game dynamically, as all we have now are just some shapes, we need them to do something!
