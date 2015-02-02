---

---
## Introduction

Java is an Object Oriented programming language - meaning that everything is treated as an object. Therefore it is very important that you grasp the idea of this
tutorial, as objects and classes is what makes Java a successful and useful programming language. The textbook definition of an object is an item that has a state, 
behaviour, and a personality. This means that an object has fields (state), it has its own methods (behaviour), and it can behave in a unique way (personality).

The inner workings of an object are stored as a class, and new objects can be instantised from that class using the `new` keyword. Objects are constructed, 
and then destroyed when their purpose has been fufilled. Java automatically knows when an object is no longer needed, so it destroys it automatically so you do not 
have to, unlike C++, where all objects have to be destroyed manually.

## What is an Object?

As stated in the introduction, an object is a collection of values and methods that behave in a unique way. Think of an object as a very fancy variable. It can 
be assigned, created, and manipulated. The Java language revolves around this concept of Object Orientation. Without it, Java would be a basic, primitive language
not worth learning. Below is a diagram explaining what an object is.

![Object diagram](/assets/img/learn/object.png)

The inner circle in the diagram represents the state of the object - what variables and values it has defined inside of it. The outer circle is the methods
within an object - the object's behaviour. Here, the methods are defined that behave in a unique way specific to the object. It might be hard to understand it like
this, so let's use a living example...

``` java
﻿package objects;

public class Human
{
	public int height; // the height of the human
	public int age; // the age of the human
	public String name; // the person's name
	public int weight; // their weight

	public void move()
	{
		// code that makes the human move goes here
	}
	public void eat()
	{
		// code that makes the human eat goes here
	}
	public void learn()
	{
		// code that makes humans learn goes here
	}
	public void sleep()
	{
		// sleeping code goes here
	}
}
```

Now, it might seem inhumane and unethical to think of a person as an object, but this is what one would look like if programmed in a computer. You got the object's
(human) states, such as name, weight, and age. You also got the object's (human) behaviour, such as `learn();`, `eat();`, and `move();`
. You can create new objects in Java as: `TheObject name = new TheObject(paramaters);` In this case, we would create a new human object as 
`Human sally = new Human();` Variables can go in the object's constructor (between the paranthesis) such as the name: `Human h = new Human("Sally");
` A bit more code inside the object is required to actually register the variable, but we will cover that in the next chapter.

## Constructors

A constructor is a method that is called when a new instance of an object is created (`Human h = new Human()`). These can be very useful for assigning
information specific to the object, and for calling methods that might need calling. There are thousands of uses for a constructor. Below is the Human.java file with
an added constructor.

``` java
﻿package objects;

public class Human2
{
	public int height; // the height of the human
	public int age; // the age of the human
	public String name; // the person's name
	public int weight; // their weight

	public Human2(String name, int age, int height, int weight)
	{
		this.height = height;
		this.name = name;
		this.weight = weight;
		this.age = age;
		this.move();
	}
	public void move()
	{
		// code that makes the human move goes here
	}
	public void eat()
	{
		// code that makes the human eat goes here
	}
	public void learn()
	{
		// code that makes humans learn goes here
	}
	public void sleep()
	{
		// sleeping code goes here
	}
}
```

The constructor looks exactly like a method, however this is one difference. The name for the constructor **must** match the file and class name, in this
case, the file and class names are Human2, so the constructor must match that. A constructor can take arguments which is placed in when you create a new instance 
of the object. In this case, the constructor takes a String, and 3 `int` arguments and assignes it to the fields (state) of the object. An object with an 
added constructor would look like this: `Human2 h = new Human2("Sally", 15, 120, 40);`. The object took a string called "Sally", an `int` with 
the value of 15 for age, and two other int's that took 120 and 40 as values for the object's height and weight.

### The this keyword

You may of noticed the use of the `this` keyword in Human2.java, that keyword does have meaning in Java, but it is not important in Java as the 
places it in automatically. What it means is that it refers to the specific object being used and created. It is not of vital importance to use the `this`
keyword often, but one of its main uses is to prevent name conflicts in constructors and methods. For instance, in the Human2.java code example above, it is used
in the constructor quite uniquely - `this` is used before the variable name which matches the name in the arguments. Take this line for instance:
`this.name = name;`. As you can see, the field is called name, but one of the constructor's arguments is also called name. How do we prevent name conflicts
here? We use the `this` keyword to assure the compiler that it is referring to the field, not the constructor's arguments.

## What is a Class?

A class is what holds the contents of an object together. Think of it as the shell, or skin of an object, holding its internal organs inside of it. There can be 
one public class per file, and the class name **must** match the file name, same as the constructor name. In more precise and technical terms, a class
is the blueprint for which objects are made from. For you to understand further, lets explain a class with the use of an extended metaphor.

Imagine a factory that creates action figures, each action figure is made from a model. The model for the action figure is placed in a cast, mold, press, or 
whever you like to call it. Molten plastic is poured into the mold, and eventually it cools forming a shape within the mold. Think of a class as that mold,
and the action figure itself as the object. A class contains all of the methods and fields that an object has, then when an instance of the object is created using the 
`new` keyword, a mold of the class is implanted in that instance.

## Summary

As you can see, the Java programming language revolves around objects, so therefore it is important to know what they are and how they act. Remember that an object
is a group of fields (state) and methods (behaviour) that all make the object have a unique behaviour and personality. Each time you use the `new` 
keyword, you are creating an instance of that object, and that instance can have unique behaviour, or every instance of an object can act in the same way.

Classes hold and define the blueprints of an object, when a new instance is created, the fields and methods inside the object's class is cloned and used. Remember
the action figure production line metaphor for understanding what a class is, if you do not, read over it again.

## Additional tasks

*   Experiment around with objects and classes, see if you can make 3 objects called Dog, Cat, and Mouse. Create unique methods (behaviour) and fields (state)
    in each object, you do not need to write code inside the methods yet, just practice a bit with structuring and defining an object's state and behaviour.
