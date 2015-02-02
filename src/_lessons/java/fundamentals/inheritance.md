---

---
## Introduction

Inheritance and Interfaces are very important and valuable concepts and features in Java. They define how objects are related to each other. Inheritance with 
objects is much the same as inheritance with families, child objects inherit traits and behaviour from their parent objects. For an object to inherit off another
object, you must use the `extends` keyword. For an object to implement an interface, one must use the `implements` keyword. Firstly we will 
explain what an interface is, as well as the benefits of inheritance.

## What is Inheritance?

Inheritance is essentially objects that are extended, or inherited off another object. The child object will have the same methods and fields that the parent object
has, but additional methods and fields can be added to the child object that are not visible at all from the parent object. Methods in the child object can be
overridden, meaning that the method in the child object replaces the method in the parent object, but only for instances of the child object. Below is a diagram, 
and then an example showing this.

![Inheritance flowchart](img/inheritance.png)

The child class all extend off the parent or base class. Remember from our Objects and Classes tutorial what a class was, a holder for the contents of an object? 
Well good, because inheritance revolves around classes as much as objects, as that is where you extend from another class. Before we get any further, let's go over 
some definitions.

* * *

The class that is derived or extended from another class is called the subclass (or child class)

The class from which the child class is extended from is called the superclass (or parent class)

Subclasses can extend off another subclass, and so on.

**Every** class is automatically extended off the Object class (built into the language). Even subclasses extend off a superclass which is extended 
off the Object class.

* * *

Inheritance is very useful if you already have an object defined, and you want to use the code in it as well as extra behaviour without re-typing it. This is where 
inheritance is very handy, as a class that is derived off another one has all of the methods and fields of the superclass, unless the superclass contains private
fields and methods, so there those won't be visible to the subclass. More on visibility later in this lesson though. Let's take a look at a code example that shows 
inheritance in effect.

``` java
﻿package inheritance;

public class Inheritance
{
	public static void main(String[] args)
	{
		Parent p = new Parent("Bob");
		p.doSomething();
		p.somethingElse();
		// p.evenMore() Illegal, as this method is not contained in the parent class
		Child c = new Child("Fred");
		c.evenMore(); // Added special method to child class
		c.doSomething(); // Overriden method, will call the method inside the child class, not the parent class
		c.somethingElse(); // Not overriden, so it will call the method inside 
	}
}
class Parent
{
	public String name;

	public Parent(String name)
	{
		this.name = name;
	}
	public void doSomething()
	{
		System.out.println(name + ": Something is happening");
	}
	public void somethingElse()
	{
		System.out.println(name + ": Something else is happening!");
	}
}
class Child extends Parent
{
	public Child(String name)
	{
		super(name); // special purpose - more on it later.
	}
	public void evenMore()
	{
		System.out.println("This is a special method in the child class");
	}
	@Override
	public void doSomething() // overridden method!
	{
		System.out.println(name + ": I have overridden my parent!");
	}
}
```

#### Output

``` java
Bob: Something is happening
Bob: Something else is happening!
This is a special method in the child class
Fred: I have overridden my parent!
Fred: Something else is happening!
```

First, the program creates two objects, a Parent and Child object and calls their explicit constructor, which is a name that it assigns to the class. 
The program then calls methods inside the object's class. The first line calls the `doSomething();` method inside the parent class, and 
prints `Bob: Something is happening`. which shows that it is calling the `System.out.println();` command inside the method in the parent class.

The next line of code calls the `somethingElse();` method inside the parent class, which prints: `Bob: Something else is happening!`

The next line of code creates a Child object, which extends off the Parent class, and assigns the name "Fred" inside its constructor. You might see a new keyword
here in the child's constructor, the `super` keyword. The `super` keyword calls the method or constructor in the **superclass.**.
In this instance, it is calling the superclasses' constructor, which assigns a value to a name variable. To call the superclasses' constructor, simply use the 
`super` keyword, followed by parenthesis and its arguments. To call a method in the superclass using the `super` keyword, type: 
`super.methodName(methodArguments);` This can be very useful if you still want to use code from the superclass, but want to add extra code into the
overridden method.

The method that is called using the child object in the next line of code calls the subclasses' special unique method - `evenMore();`. This method
is only unique in the child class, and not the parent class. For example, you see a line of code that is commented out that calls that method, but using the Parent
instance. This is illegal, because it is not defined in the Parent class. This method outputs: `This is a special method in the child class` in the 
console.

The next called method is the most interesting method demonstrated in this code example. It calls the method `doSomething();` in the child class.
Because that method is defined in the child class, it **overriddes** the same method in the parent class, meaning that it no longer calls it. It
prints: `Fred: I have overridden my parent!` in the console. The `name` variable is not defined in the child class, so why is it that 
when we use it in the child classes' method, we do not get an error? Answer is because it is already defined in the parent class, so the child class can 
access it just as if it was included in its own class. The `@Override` annotation simply states that this method overrides the same method in the 
parent class. This is not needed when you are overriding, but it highly recommended because it marks it, so you can see what method is overriding another.

The very last line of code calls the `somethingElse();` using the child class. Because it is not physically defined in the child class, it should
generate an error. So why does it not? Because the method is already defined in its parent class. Note that the name is changed to Fred from Bob. This shows
that the Child object has assigned the name variable in the base class to its own name (remember the constructor and the `super` keyword).

So there you have it, a thorough example of inheritance, what it can do, and how it works. This can be very useful for creating multiple objects of the
same type with special behaviour, but without rewriting the whole entire method again.

## Visibility

Visibility is marking objects, methods, and variables with special privacy conditions so that the programmer can control if the object can be used elsewhere or
not. There are four levels of visibility, and they are...

*   Default or package access. This makes members only visible to other classes in the same package as the member is in. (To get this level of access, do not
    type in any visibility modifier at all.
*   `private` access, which only makes a member visible to only the class that it is contained in, nothing else.
*   `protected` access. This is a special type of access. It only makes members visible to the class that it is contained in, and any classes
    that inherit or extend off the class that the member is located in. It also provides package access to that protected member.
*   `public` access. This level of access is the least restricting, it makes the member visible to **every** other class in the    Java language. Even other people's classes can access members in your classes that are made public.

Visibility gives you control of if other external classes can access features in your classes, and if so how. It is mainly used for security and code 
management purposes. It is recommended to make every field and method automatically `private`, so that you do not have to later unless you absolutely
need something declared `public`, `protected`, or default.

Visibility is also useful for controlling if people in your team or company should access certain members of your own classes. For example, say if you are 
making a program that lets users log into something, the username and password variables are stored in a class that you have made. You make the username class
`public`, or default so that other members in your team can use that variable for signing in, identification, and other purposes in other classes
that they write themselves. You would declare the password variable `private`, as you do not want any other teammates to access that variable as it
is only used in your class to check to see if it is the correct user. Firstly the password variable could contain sensitive data, so you would want to declare
it `private` to prevent anyone else, in your team or not from accessing that variable. Secondly, if people in your team do not know what they are doing,
they could potentially break the functionality of your class, as data is being used from your class somewhere else. Make a method or field `public`
only if you know what you are doing, and you know precisely what the method does, and if it could break the workings of your class.

Below is a code example that shows you how to declare items with different visibility levels, and an explanation for how they work.

``` java
﻿package inheritance;

public class Visibility // class visible everywhere
{
	int number = 0; // package-visible variable, visible to other classes in the inheritance package.
	private String password = "Password"; // private variable, only visible to this class
	public int value = 1; // public variable, visible everywhere. 

	protected Visibility(int i) // constructor only visible to this class, and subclasses. 
	{
		this.number = i;
	}
	public void something() // public method, visible everywhere
	{
		// code goes here
	}
	protected int getNumber() // protected method, only visible to this class, and subclasses that extend off of this class. 
	{
		return number; // reference to the package-visible variable.
	}
	private String setPassword(String password) // private method, only visible to this class
	{
		this.password = password;		// reference to the private variable
		return password; 				// reference to the method's arguments
	}
	void somethingElse() // package-visible method.
	{
		// other code goes here
	}
}
class Extension extends Visibility // package access class, only because two public classes are not allowed in one file. 
{
	public Extension() // constructor visible everywhere. 
	{
		super(2); // legal, as superclass constructor is protected. 
		this.number = getNumber(); // legal, because this class is inside the same file, and therefore the same package, and the
		// method is protected, meaning it is visible to this class as well as it extends off Visibility
		this.password = setPassword("Password"); // illegal, because method and variable are declared private
		this.something(); // legal, as the method is public, so it is visible anywhere
		this.somethingElse(); // legal, as this class is inside the same package, so therefore it can see it. 
	}
}
```

## Polymorphism

Right now, you are probably thinking with a sense of panic: _"Oh no, a large, fancy word. What does it mean?"_. But don't worry, 
polymorphism is much simpler than it sounds.

The dictionary definition of polymorphism is: _"Many forms"_. It essentially means the same in Java (and many other Object Oriented languages) as well.
In Java, subclasses can define and manipulate their own unique behaviour, and still share the same functionality and behaviour of its parent class. This is 
essentially the definition of polymorphism in a nutshell in Java. The example you saw of inheritance is very similar, but it calles the base classes method
and the subclasses method as well, instead of overriding (using the `super` keyword of course. Polymorphism is basically a fancy name for the
behaviour between parent and child classes. It is essentially the concept that objects can take many forms.

## Interfaces

### A class interface

There are two types of interfaces, an abstract class, and an actual full-on interface. Both have their own benefits. An abstract class is declared using the
`abstract` keyword/modifier before the `class` keyword, and an interface is declared by using the `interface` keyword
instead of the `class` keyword. A class that is declared `abstract` **has** to be extended off from another class, as that
is the sole purpose of the `abstract` keyword. Another strong note is that an abstract class cannot be declared `final`, as that
is the exact opposite of an abstract class. A `final` class is a class that cannot be extended off, so you can see that this will cause a major
conflict with the `abstract` modifier.

Below is a code example for how an abstract class would look like, and how it would behave. Also, it can be worth noting that abstract classes are halfway between 
normal classes, and interfaces. Think of it as in between.

``` java
﻿package inheritance;

public abstract class Abstract
{
	protected int something; // visible only to child classes of this class.

	public void somethingInitial()
	{
		/**
		* some code that is universal accross all object that extend off this class
		* goes here
		**/
	}
	public abstract void something(int par1); // abstract method, MUST be defined in the subclasses

	public abstract void somethingElse(); // ditto above. 
}
class Sub extends Abstract
{
	public void something(int par1) // abstract methods MUST be defined in the child class, like this one.
	{

	}
	public void somethingElse() // ditto above.
	{

	}
}
```

Note the use of the `abstract` keyword before the class declaration, and before some method declarations. This is declaring these methods (and the class)
abstract. Abstract methods **must** be implemented and defined in any child classes. Abstract methods in the superclass have no body, only a definition.
Abstract classes are used for defining 'half' of a class. They are used if you want every object that is extended off the superclass to have some universal code,
but you want a method or two defined uniquely to every subclass that extends off the abstract superclass. You can override predefined methods in a superclass
from a subclass though, so that option is not fully gone.

As with classes, methods cannot be declared both `abstract` and `final` because yet again, they are completely the opposite. An 
`abstract` methods means that it has to be implemented and overridden in a subclass, while `final` methods **cannot** be
implemented or overridden in subclasses. Another huge rule with abstract classes is that they cannot be instantiated, meaning that you cannot create instances
of an object with an abstract class directly, for example:

``` java
Abstract a = new Abstract();
```

...is illegal, because the abstract class is, well declared abstract, meaning that it has no meaningful (or if at all) implementation. So therefore, constructors
for abstract classes are not necessary, unless you intend to call that constructor anywhere in the subclass. There is something interesting though, an object
instantiated from an abstract class can be upcasted or downcasted, for example: `Abstract a = (Abstract)new Sub();` and visa versa. This is strange
because you wouldn't expect abstract classes to behave this way.

### Actual interfaces

If you thought that abstract classes was a bit weird and full-on, well wait until you hear and learn about full interfaces. In order to wrap your head around
how an interface looks, or how it will act, use this saying. "An interface is what an object will **look** like, now I am going to show you how the object
will **act**." Interfaces are defined using the `interface` keyword and contain only undefined methods (methods with no method body), and constants
(variables whose value remains the same). A class that implements an interface **must** have all of the undefined methods in the interface into
the implementing class. Those methods must be also defined (have a body, the {} braces). Constants that are declared in an interface do not need to be redefined
in the implementing class. In order for a class to implement an interface, one must use the `implements` keyword after the class declaration (where you
would extend off other classes). A class can implement multiple interfaces, and also extend off another class, but a class can only extend off one other class.

Below is a code example demonstrating what an interface would look like, and how it would be implemented in the implementing class.

``` java
﻿public interface Interface // interface decleration
{
	int ZERO = 0; // declaring a constant - does not need to be defined in the subclass

	void something(); // an undefined method

	void somethingElse(String aString); // another undefined method
}
class Example implements Interface // class decleration that implements an interface
{
	public void something() // class in interface must be defined in implementing class exactly how it is in the interface
	{

	}
	public void somethingElse(String aString) // ditto above (argument names do not have to be the same though)
	{

	}
}
```

As you can see in the example, we define an interface using the `interface` keyword. We then define a constant called ZERO, and then instantly assign
it to the value 0. Variables defined in an interface are always automatically declared `static` and `final`. More on the `static`
keyword later, but for now let's learn about what a `final` variable is.

A field that is declared `final` means that the value cannot change and must be assigned immediately. A `final` field must either 
be defined immediately, or in the classes constructor. Because an interface does not have a constructor, we must assign the variable immediately.

Note the absence of the `public` modifier for the methods in the interface. This is because any method that is declared in the interface
is automatically made `public`. Remember that every method declared in an interface MUST be defined, or implemented in an implementing class, 
otherwise the compiler will throw many errors at you.

## The static keyword

The `static` keyword defines a method, or a field that does NOT behave polymorphically, and does not need an instance of an object to be 
referenced. A static method or field means that it belongs to the class and not an instance. Generally speaking, a static field or method belongs to
ALL instances of the class/object. This is useful if you want the same method or field behaviour for every single instance of an object. An example of a class
that uses static fields/methods is Java's Math class. There are many static methods like `abs();`, `sin();`, and `tan();`.
These methods all behave in the same way regardless of its use, so therefore it will be static. Static fields/methods cannot be overridden or implemented in a 
subclass. ALso, a very strict, but common rule with `static` methods is that non-static methods/fields CANNOT be referenced inside the static 
method, but the reverse is possible. You can create new instances of objects as normal in static methods though. Below is a code example showing what 
a static method/field looks like, how it behaves, and how it is referenced.

``` java
﻿package inheritance;

public class Static
{
	public int numberOne = 1;
	public static int numberTwo = 2;

	public static void main(String[] args) // note the main method is also static.
	{
		int newNumber = numberOne * 2; // illegal, numberOne is not a static variable, but it is being referenced
									   // in a static method.
		int anotherNumber = numberTwo * 2; // legal, as numberTwo IS a static variable. 
		ClassWithStaticStuff c = new ClassWithStaticStuff(); // making new instances of objects are still legal.
		c.something(); // legal, non-static fields/methods can be referenced from an instance of an object defined in a static method
		c.somethingElse(); // OK, but not recommended, static fields/methods should be referenced from a static context
		ClassWithStaticStuff.somethingElse(); // referencing a static method from static context.
	}
}
class ClassWithStaticStuff
{
	public static String string = "I am a string with a static modifier!";

	public void something()
	{
		String newString = string; // legal, static fields/metods can be referenced inside non-static methods.
	}
	public static void somethingElse()
	{
		string = string; // also legal
		Static.numberTwo // also legal, as numberTwo is a static field
	}
}
```

The above code defines all of the legal and illegal things you can and cannot do with `static` fields/methods. As you can see, the only
time a non-static method/field can be referenced in a static method is if a new instance of the object that the method is defined in is created, as
shown with `ClassWithStaticStuff c = new ClassWithStaticStuff();`. The way to reference a static method/field in another class is to type
the class name, followed by a period (.), then the static method/field name as shown above. No creating new instances of objects are needed for this, however
this means that static field/methods do not behave polymorphically. In summary, remember that a static method/field is part of a class, and is the same
through every instance of that object's class.

## Summary

In conclusion, inheritance and interfaces are powerful concepts and features in the Java programming language. They allow us to define how a class would look
like (or act), and provide easier means of reusing code in other classes. Make sure you know all of the rules of inheritance and interfaces as these are a really
useful and important aspect of this (and most other Object Oriented) programming languages. Also, make sure that you remember the explanations and 
visual interpretations of the features in this tutorial, because they can help you memorize the behaviour and usage of inheritance and interfaces much more easily.

## Additional Tasks

*   Experiment around with inheritance and interfaces. Explore the benefits (and limitations) of each concept, and generate working examples of it.
*   Experiment around with the visibility modifiers in Java. Find out the circumstances and special cases with each.
*   Create a hierarchy of your family using inheritance. This can be fun and humourous.