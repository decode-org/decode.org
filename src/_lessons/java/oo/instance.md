---
title: Creating Instances
---
> Instances are copies of a class - Kristian

In this lesson, we will create a new instance of our `Computer` object. Object instances are how programs run and adapt - they are the lifeblood of a program.
In this lesson, we will show you how to create and manipulate instances.

In the code below, we are creating a new instance of a blank object. Our instance wont do everything, but it will show you the conecpt of creating new instances.

``` java
package org.decode.objects;

/**
 * 
 * @author Kristian
 *
 */
public class Computer1
{
	public static void main(String[] args)
	{
		Computer1 c = new Computer1(); // create new instance
	}
}
```

In the above class, something is a little different. We have our main method in the class definition. This method is not part of the class, but a standalone method, and will
have no effect on the behaviour or state of the class. This is what the **`static`** keyword essentially does, but there is more to it that will be discussed in a
later lesson.

In our `main` method, we are creating an instance of our class, and asigning that instance to a local variable. A new instance of an object is created using the
**`new`** keyword, followed by the class name and any parameters that the class might take that is defined in its constructor (more on constructors later). We can
reference and manipulate our instance using the local variable that we have declared. A local variable means that it will only be visible within the scope where it is created.
In this case, it will only be visible within the `main` method.

If we had a method defined within `Computer1` and we want to call it, we would use the local variable, seperated by a fullstop, then the method name. For example,
say that we want to call a method called `something` after creating a new instance of the object. You can choose what the method does, as that does not matter, but for 
now, let's show you how to call methods using object instances.

``` java
Computer1 c = new Computer1();
c.something();
```

It is that simple, we call a method located within the `Computer1` class by calling it through a local (or global) variable, using the fullstop operator. This code
will then execute whatever is defined in the `something` method.

## Summary

We have finished with this tutorial set for now. In the next tutorial, we will show you how to create fields and methods within a class, explore the different data types within
the language, and explore what constructors do. Come with us.
