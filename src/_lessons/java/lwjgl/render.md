---
title: Rendering Our Objects
---
## Introduction

In this lesson, we will learn how to render our shapes onto our screen. We will render both players and the ball onto the screen. These objects won't move or do anything
special yet, we will just get the rendering done to make it render statically onto our screen. During this lesson, we will learn mainly about drawing 2D shapes with LWJGL.

## Rendering shapes

The code below is split up into two segments, the `Player` class, and our main class. I have added a `Player` class in favour of better file/project 
management, it won't significantly affect the code though, only creating new objects, which you should have learnt how to do. Below is the code in our `Player`
class.

``` java
package org.decode;

import java.awt.Rectangle;

import org.lwjgl.util.Renderable;
import static org.lwjgl.opengl.GL11.*;

/**
 * The class that represents our players.
 * @author Arbiter
 *
 */
public class Player implements Renderable
{
	/**
	 * Width and height of our players, will never change therefore declared final
	 */
	private final int WIDTH = 25, HEIGHT = 100;
	/**
	 * X and Y position of our player
	 */
	private int x, y;
	/**
	 * The hitbox/collision box of our player. Useful during collisions
	 */
	private Rectangle bounds;

	public Player(int x, int y)
	{
		this.x = x; // sets x
		this.y = y; // sets y
		this.bounds = new Rectangle(x, y, WIDTH, HEIGHT); // creates the hitbox of the object
	}
	/**
	 * Draws our rectangular player object to the screen
	 */
	@Override
	public void render()
	{
		glBegin(GL_QUADS); // starts the drawing of quads
		{
			glColor3f(0.6f, 0.6f, 0.6f); // sets the color of our quad
			glVertex2f(x, y); // sets the top-left corner position of our quad
			glVertex2f(x, y + HEIGHT); // sets the bottom-left corner position of our quad
			glVertex2f(x + WIDTH, y + HEIGHT); // sets the bottom-right corner position of our quad
			glVertex2f(x + WIDTH, y); // sets the top-right corner position of our quad
		}
		glEnd(); // stops the drawing of quads
	}
	/**
	 * Checks to see if another object (with a collision box) has collided with this object's collision box
	 * @param other Other object's collision box
	 * @return true if the other object's collision box has collided with this object's collision box, false if not.
	 */
	public boolean collided(Rectangle other)
	{
		return bounds.contains(other);
	}
	public void setX(int x) {this.x = x;} // sets the player's x position
	public void setY(int y) {this.y = y;} // sets the player's y position
	public int getX() {return this.x;} // gets the player's x position
	public int getY() {return this.y;} // gets the player's y position
}
```

And the following code section is under our main class, `Pong`.

``` java
package org.decode; // my package

import java.util.ArrayList;
import java.util.List;
import org.lwjgl.LWJGLException;
import org.lwjgl.input.Keyboard;
import org.lwjgl.input.Mouse;
import org.lwjgl.opengl.Display;
import org.lwjgl.opengl.DisplayMode;
import org.lwjgl.util.Renderable;
import static org.lwjgl.opengl.GL11.*;

/**
 * Our class which will contain the workings of our game
 * @author Arbiter
 *
 */
public class Pong
{
	/** the width and height of the screen */
	private final int width, height;
	/** list of objects to be rendered in our game */
	public List<Renderable> objectList = new ArrayList<Renderable>();

	public Pong(int width, int height)
	{
		this.width = width;
		this.height = height;
		setupDisplay();
		startGame();
	}
	/**
	 * Sets up our display
	 */
	private void setupDisplay()
	{
		try
		{
			Display.setDisplayMode(new DisplayMode(width, height)); // set the dimensions
			Display.setFullscreen(false);
			Display.setTitle("Pong"); // set the title
			Display.create(); // create the screen
			glEnable(GL_TEXTURE_2D); // enable 2D textures
			glEnable(GL_DEPTH_TEST);
			glClearColor(0.0f, 0.0f, 0.0f, 0.0f); // set the screen's background color
			glEnable(GL_ALPHA); // enable alpha blending
			glDisable(GL_LIGHTING); // disable lighting since we won't be using it
			glMatrixMode(GL_PROJECTION);
			glLoadIdentity();
			glOrtho(0, width, height, 0, -1, 1); // sets the rendering ortho to 2D
			glMatrixMode(GL_MODELVIEW);
			glLoadIdentity();
			glViewport(0, 0, width, height);
			Mouse.setGrabbed(false); // hides the cursor
			Keyboard.create(); // initializes the keyboard, so we can use it
		}
		catch (LWJGLException e)
		{
			e.printStackTrace(); // prints the error stack trace incase something went wrong
		}
	}
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
			Display.update(); // refresh the screen and draw what has been defined in this loop
		}
		dispose(); // cleanup
	}
	/**
	 * Cleans up the resources we have used
	 */
	public void dispose()
	{
		Keyboard.destroy();
		Display.destroy();
		System.exit(0);
	}
	/**
	 * Our main method
	 * @param args
	 */
	public static void main(String[] args)
	{
		int width = 800, height = 600;
		if (args.length >= 2) // checks to see if any dimensions have been passed in in the console arguments. For manual setting of width and height
		{
			try
			{
				width = Integer.parseInt(args[0]);
				height = Integer.parseInt(args[1]);
			}
			catch (NumberFormatException e)
			{
				System.out.println("Invalid dimensions, using default instead.");
			}
		}
		new Pong(width, height); // call the constructor 
	}
}
```

We will first go over the top code snippet, `Player`. This class represents our player objects. The class will render a grey rectangle shape within our game, and
once we implement methods to make it respond to keyboard button presses, it will move too. There will be two `Player` objects in our game, player 1 and 2 who will
be both controlled with different keys. Lets look at the fields and the constructor of this class first.

Next we have the `WIDTH` and `HEIGHT` of our players. We do not want these values to change, so they are declared `final`.

We then create a `Rectangle` object, which will represent our invisible collision box. We create the instance of this object in the constructor, which we will 
pass in the x, y, width, and height of our player object, to represent the 4 corners of the rectangle. Of course, it would remain in one position, even when the players
move. This is fixed when the method `collided()` will be called every loop, as it updates the collision boxes' position to the `x` and `y`
positions of the ball. The `Rectangle` class also provides a convenient method to check whether another rectangle overlaps or is contained with the rectangle
instance that called the method. This makes our lives as a programmer easier, so we do not have to write this method ourselves!

I should point out at this stage now; notice how the `Player` class implements `Renderable`? This interface provides an implemented `render()`
method, that will be called in the main loop. The main loop will loop through an array list of instances of type `Renderable`. Therefore we do not have to create our
own type to implement. Go to [Inheritance and Interfaces](http://decode.org.nz/lessons/set/java/inheritance) and [
Generics and Containers](http://decode.org.nz/lessons/set/java/generics) for more info on them if you do not fully understand those concepts. It can also explain why I am implementing `Renderable` more clearer.

I will next briefly explain those simple methods at the bottom of the snippet. `setX()`, `setY()`, `getX()`, and `getY()`. These
methods simply set or get the `x` and/or `y` values of the player, as these fields are declared `private`. This is because this type of modification
can be harmful and damaging to the integrity of the program, and lead to error-prone code, especially during runtime. Therefore it is standard code convention to provide a getter
and setter method for every field in a class and to declare that field `private`, unless you know that the field is safe to modify directly, or you do not want the field to
be modified externally at all (the true purpose of `private`).<p>
<p>Now, we are veering off track, and must get back on it, therefore we will discuss the `render()` method inside the `Player` class next. This is the method that
will actually draw our player to screen. Since we do not need images, we can draw it directly using quads. First we call `glBegin()` with `GL_QUADS` as our
parameter. This tells OpenGl that we are about to start drawing quads, and not lines or points. We then set the color of the quad, we have set it to a light grey color here. 
Next, we draw our vertices - the four corners of the quad. We set `x` and `y` to the top-left position of the quad all the way down to setting `
x + WIDTH, y + HEIGHT` for the bottom-right corner of the quad. The other corner positions are self-explanitory.

We have finished explaining the code for the `Player` class, now we will discuss the changes we made to the main class: `Pong`.

The differences in this class is the filled in `startGame()` method, as well as a new variable added: `objectList`. First, lets talk about this new field.

This new field will contain a list of all of our objects that need to be rendered into the game. An array would work here, but it is more efficient and flexible to use an
`ArrayList` instead as it is more dynamic and flexible. New instances, that represent both of our players are added in the first lines of the `startGame()`
method before the `while` loop. This is so that our players are in the list to be rendered. Note how the list includes generics? Well this is important to make sure 
that we only add instances of type `Renderable` (meaning any class that implements this interface) can only go in this list, nothing else. Otherwise it will break
our code, and we do not want that.

We have now explained our new field, `objectList` and explained the first two lines of the `startGame()` method, now we will examine the `while`
loop within it, as some pretty important and crucial changes were made here. We've explained what the loop does, and what conditions it continues, and we have also explained
the first few lines in the previous tutorial, now we will look at that `for` loop within it, and the code surrounding it.

First, the `glPushMatrix()` method starts our matrix where we draw our quads (and other shapes) in. We have placed it here, so it is only called once every main
loop, rather than every loop that the internal `for` loop makes, therefore we result in faster and more efficient code. The `for` loop is interesting though,
if you have not seen this type of loop before, it is called a foreach loop. This means that it will loop over every element in an array or other collection and assign it to
the temporary variable declared in the `for` loop parenthesis. In this case, our temporary variable is `r`. We then call `r.render()`
which called the `render()` method in any instance of classes that implement `Renderable` in our loop (more on interfaces [here](http://decode.org.nz
/lessons/set/java/inheritance)). Therefore it will draw our quads, as that is what the `render()` method does in our `Player` class.

In the next line, we then call `glPopMatrix()` which closes the matrix that we have used to render stuff, so we can do other functions without the dangers
of continuing the matrix (if you did that, that could cause some various, unexplainable problems). That is it, we have finished explaining all of the changes we have made 
to the `Pong` class. We are done, and ready to move onto the next tutorial - keyboard input!

What the program looks like if we run it. Notice our players are being drawn the way we wanted them to.

![](/assets/img/learn/lwjgl_player_rendering.png)

## Summary

We have learnt how to draw simple shapes onto the screen using OpenGL, and we have set up our player classes ready for a little bit more interactivity in the next tutorial.
At the moment, the players are stationary on the screen, we have yet to implement the code to make it move when different keys are pressed. Go onto the next tutorial to start 
learning about this with LWJGL.
