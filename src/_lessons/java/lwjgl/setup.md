---

---
## Introduction

In this tutorial, I will show you how to create a new project with eclipse and import in the files we need to use the LWJGL library. Before we get started, you should
have downloaded LWJGL and extracted it to the location of your choice, just make sure you can remember where you put it!

## Creating a new project with LWJGL

Below is a step-by-step guide for setting up an LWJGL project with Java.

1.  Create a new project in the Eclipse workspace. If you haven't defined a workspace, do so. Create one under your Documents or the location of your choice and direct    Eclipse to it. If you have, create a new project. Go File -> New -> Java Project. A dialog should appear. Enter in your project name, we will call our project 'Pong'.
    Once you are done, click the 'Finish' button, and your new project should be created on the left.
2.  Now we need to add LWJGL to the project. Right-click the project icon in the package explorer menu, and go to Properties -> Java Build Path -> Libraries. In this screen,
    you would find an 'Add External JARs' button to the right, press this. In the new popup menu that has now appeared, navigate to where the .jar files are. They should be in    a folder called 'jars' inside your extracted 'lwjgl' folder. Select all the ones that you want to use, we don't need the other utilities, so I have selected only jinput.jar,    lwjgl_util.jar, and lwjgl.jar. Once you are done, click 'Open', and then your jars should be added to the project, but we are not done here.
3.  Now that we have added the jar files, we now need to link the native library. In the 'Libraries' menu, click that small arrow to the left of the 'lwjgl.jar' list entry,
    then select 'Native library location'. Once you have done this, the 'Edit' button to the right should become available for using. Press it and it opens a new dialog box.
4.  In the new dialog box that has appeared, you must select your native files. Click the 'External folder' button, and navigate to where your extracted lwjgl folder is.
    Inside that folder, navigate into the native directory, and click your operating system's folder, mine is windows. Select that folder, and then click 'Ok', and then click
    the 'Ok' button in the Native Library folder configuration dialog. You have now added LWJGL to your project, and can begin programming!

If you do not fully understand the directions, below are some screenshots that may help you.

Where you go to add libraries to your Java project. (Step 2)

![Adding external JAR](/assets/img/learn/lwjgl_step1.png)

How to open the Native Library location dialog. (Step 3)

![Native library location](/assets/img/learn/lwjgl_step2.png)

Setting your Native Library location path in the dialog. (Step 4)

![Setting the directory of the native libraries](/assets/img/learn/lwjgl_step3.png)

## First Class

In this section, I am simply going to create the main class for the program that includes the main method which is where the program initially starts. We are doing nothing
with LWJGL yet, this is just to set up for when we do. Before you create your own class, I do recommend first creating a package in your project src
folder, just to make management easier. Below is my main class.

``` java
﻿package org.decode; // our package

/**
 * Our class which will contain the workings of our game.
 * @author Arbiter
 *
 */
public class Pong
{
	/**
	 * Our main method
	 * @param args
	 */
	public static void main(String[] args)
	{

	}
}
```

## Summary

We have learnt how to create a new Java project, and link LWJGL to it so we can use its facilities. We have also started our barebones program by simply making a class
containing our program entry point, the `main` method. Next we will configure our game display!
