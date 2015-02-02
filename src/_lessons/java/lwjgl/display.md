---

---
## Introduction

In this section, we will go over the basics about the Display with LWJGL, and the end goal of this tutorial is to get the window set up to form simply a black screen (we won't add
rendering stuff just yet). We will also go over how the game will work.

## Display

All of the code below is our code to display the screen (with nothing in it yet). We will go through the code in order of execution.

``` java
﻿package org.decode; // my package

import org.lwjgl.LWJGLException;
import org.lwjgl.input.Keyboard;
import org.lwjgl.input.Mouse;
import org.lwjgl.opengl.Display;
import org.lwjgl.opengl.DisplayMode;
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
		while (!Display.isCloseRequested())
		{
			glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); // clears the screen ready for rendering on the next frame.
			glMatrixMode(GL_MODELVIEW);
			glLoadIdentity();
			Display.sync(60); // make sure the framerate does not go past 60 fps
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

First, in the `main` method, we create two new variables. `width` and `height`. We then assign these to some default values and then do something
a bit more tricky. We check to see if any arguments have been passed in when launched, and we check to see if they're valid by converting the argument into an Integer. If not, it
will throw and exception inside the `try` block and be caught. If this happens, we will simply use the default dimensions. After this, we simply call the constructor
of the `Game` class and pass in the `width` and `height` variables in as the constructor takes these parameters.

The constructor of `Game` is then called. And in that constructor, it is basic. The `width` and `height` variables are assigned, and
a couple of methods called. It first calls `setupDisplay()` and then after that method has finished executing, it calls `startGame()`. That method
contains something interesting, but do not worry about that for now, we will focus on what goes on inside `setupDisplay()`.

The `setupDisplay()` does all of our screen setup. The first line, `Display.setDisplayMode()` sets the dimensions for the screen; the `width` 
and <height>height</height> variables are passed in. Note also that the `width` and `height` variables are declared `final`? This is because
we do not need them to change, and anything that does not need to be changed, or shouldn't be changed should be declared `final`. The next line sets whether the screen
should be fullscreen. Since we have already set the dimensions, we do not want this, so it is set to `false`. The title is set next, since our game is called Pong, it would
be wise to have the title called Pong as well. The next line, `Display.create()` is where most of the magic happens. The screen is actually created. This would be hard to
accomplish with OpenGL alone, so the API makes it a lot more convenient for us.

The next 11 lines are OpenGL in play directly. First note how I am not calling the methods in the conventional static manner (`ClassName.method()`). What is 
happening here? The methods are not defined in the same class. Well if you look closely at the `import` statements, you will find a unique one, `import static`/
This imports all of the classes static methods and fields directly into your class, eliminating the need for calling static methods in the class like: `ClassName.method()`/
This saves the amount of code we have to write. We are veering off topic now, back onto LWJGL.

The OpenGL methods are intriguing. The first one, `glEnable(GL_TEXTURE_2D)` enables 2D textures and shapes to be drawn onto the screen. Obviously you would do something
different if this was a 3D game. The next line enables depth testing. The `glClearColor` method on the next line sets the default background color of the screen, it is set
to black. Next we enable alpha and disable lighting. Alpha is transparency, we might need this, but we do not need any lighting as it is a 2D game, and lighting is not an aspect of 
Pong. We then define a matrix mode and load it, matrices will come in later when we draw objects to the screen. The next line, `glOrtho` does more than load a matrix or
enable something. It sets how our game will look. It sets the width, height, and depth of the view. Since it is a 2D game, we pass in the parameters as shown. We then load another
matrix mode, and set the viewport to the width and height of our game.

Next, we disable the cursor showing up in our game. Since the game is fully controlled by the keyboard, we have no need for the mouse. We then 'create' the Keyboard, which means
that we initialize the input listeners on the keyboard so that our game is responsive when a button is pressed. Since we are not using the mouse, we do not need to initialize it. If
you did want to use the mouse, simply call `Mouse.create()`. We have finished executing all of the procedures inside `setupDisplay()`, and then the constructor
moves on to `startGame()`.

`startGame()` is very interesting. Why is there a `while` loop in it? There is one because this is how every game works. Everything is executed within a loop, 
and an iteration of the loop represents a frame. It is basically saying: "while we have not requested to exit the game, do everything from rendering to handling game logic and 
input". To check if the user has requested to exit the game, we call `Display.isCloseRequested()` and inverse it, otherwise the `while` loop won't execute
at all!

Inside this loop, is where we will put everything that makes our game work, but that will be covered in later tutorials. Now, we just need to focus on the first 4 lines within
that `while` loop. The first one clears the screen, so things do not render over each other and the screen simply redraws in front of the old one. This would look pretty
weird, therefore we need to clear it to re-draw the screen. The next one loads the matrix mode for when we use it when we draw stuff, not that important. The final line, 
`Display.sync(60)` makes sure that our framerate does not go past 60 fps. Otherwise the computer will try its hardest to render as fast as we can, when really we only
need 60 fps for it to look smooth. Then, `Display.update()` is called. This method actually refreshes and re-draws the screen and checks for other things, e.g if 
exiting the application has been requested. This is probably the most crucial method of your loop, otherwise your program won't do anything and not respond.

When the `while` loop's condition is false, the loop will break and execute the next statement, `dispose()`. This method is absolutely necessary because
we need to cleanup all of the resources we have used. We have only used `Keyboard` and `Display`, so we `destroy()` these. If you used a Mouse,
you would need to destroy it too here. After all of our cleanup has been performed, we then can exit the program smoothly knowing that everything has been packed up. That is it for
this tutorial. This is what the program shows when we run it, a simple, blank screen.

![Execution of program so far](/assets/img/learn/lwjgl_display_exec.png)

## Summary

We have learnt how to display a basic, blank screen using LWJGL ready for all of the cool and fun stuff to begin, the actual rendering. In the next tutorial, we will go over
rendering some basic shapes and we will try to render our two players (the bats left and right) into the game. They won't do anything yet, but just render. See you in the next
lesson!
