---

---
This brief tutorial will show you how to make your own hello world application. It will go over the basic structure of the program, what each line of code does, 
and what the program will output in the console once executed.

## Hello World Example

### Source code

``` java
﻿package hello; // folder the file belongs in

public class HelloWorld // class decleration, then class name
{
	public static void main(String[] args) // our most important method
	{
		System.out.println("Hello World!"); // method which prints out a string to the console
	}
}
```

### Output

```
Hello World!
```

## Explanation

The code example might seem daunting at first glance, espically if you have never had any past experince with programming at all. Dont worry though, here is a run
through of what each line of code does.

``` java
package hello;
```

This line of code declares what package (folder) your file is in. Must be the first line of any program. More on this later.

``` java
public class HelloWorld
```

This is your class declaration. This is the code that defines a class (file). Classes are covered in a later topic, but the class
name **must** match the file name, HelloWorld.

``` java
public static void main(String[] args)
```

This is your main method, the method always called when you run your program. This is where you begin your 
program and where it ends. This method is declared `static`, which has a special meaning. Do not worry about this at the moment though, it will
be covered in a later tutorial.

``` java
System.out.println("Hello World!");
```

This is the method that prints a line of text to the console. Note that there are full stops between each word. This
is essentially refrencing something within an object, in this instance, it is refrencing the `println()` method within the out object that is with in the 
System class. The `println();` method itself takes one argument, a String which is a sequence of characters. The method takes this String object and 
prints it to the console (output). This method is especially useful for outputting information to the console to see what your program is doing, and where it is at. It 
is generally used for debugging.

## Console I/O

Console I/O is input and output in the console. This can be a very useful way of outputting and inputting basic information for your programs, generally used
in the debugging section though. For the output, I have used the number 4 for the sake of argument.

### Code

``` java
﻿package hello; // the package decleration

import java.util.Scanner; // An import statement - imports an external file

public class ConsoleIO // Class decleration
{
	public static void main(String[] args) // main method
	{
		System.out.print("Select a number, any number:"); // prints this message to the console
		Scanner s = new Scanner(System.in); // Creates a new Scanner object
		int number = s.nextInt(); // Scans the number using a method in the Scanner object and assigns it to a variable.
		s.close(); // Closes the scanner - very important to prevent memory leakage. 
		System.out.println("Did you know that " + number + " squared is: " + number * number + "?"); // Prints your number squared to the console. 
	}
}

```

### Output

```
Select a number, any number:4
Did you know that 4 squared is: 16?
```

### Explaination

Console I/O is simply input and output in the console. In the code example above, we have both in effect. The first `System.out.println()` method
is printing the first line of code out to the console. The second line is slightly more interesting... It is creating a new object and assigning it to a variable.
Objects are covered in depth in a later tutorial, but all you need to know for this is that objects are simply files with its accompanying methods that exist
on the stack. The `Scanner scanner = new Scanner(System.in);` line of code creates a new Scanner object with the `new` keyword and assigns it 
to the `scanner` variable. The `System.in` expression within the paranthesis is the arguments for the object's constructor. More on this in 
another tutorial, but for this, all you need to know is that `System.in` is required there.

The next line of code is even more interesting, it reads the inputted number in the console and assigns it to another variable. Note that there is an `int`
keyword before the variable name, this is a data type. More on that is covered in a later tutorial, but all you need to know now is that an `int` is 
the most commonly used data type for storing numbers. The last `System.out.println();` called method simply prints out the inputted number squared using
the multiplication operator (*). Also, make note of the use of the + operator in the method paranthesis, this is called string concatenation. It essentially joins 
objects, numbers, and strings together to form one big string. It converts the numbers and objects into a string if it can.

## Summary

As you can see, your first application is easy to understand once you do, and is one of the most basic programs you can write in any programming language due 
to its simplicity. Every other small idea in the code example, such as classes, methods, and Strings are throughly talked about in later topics, so do not worry 
about what they exactly do in this tutorial, or if you decide to write and test the program yourself in your Eclipse program.

## Additional Tasks

*   Try writing and running the program yourself in Eclipse. To create a project, click new - project, and follow the wizard from there. To create a new package,    click new - package, and name it to whatever you want. To create a file, click new - class and follow the wizard. Type in the code in the class, and click the
    green triangle button on the toolbar to test your program. The output will be displayed in the console window below your code.
*   Experiment around with console input/output. Tinker it with it and see if you can make a simple maths game using console I/O.