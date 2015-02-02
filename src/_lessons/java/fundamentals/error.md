---

---
## Introduction

In almost every program, you will have exceptions (errors) being thrown at you relentlessley from your code in Java. Not amymore! This tutorial will show you how
to catch those exceptions before they wreak havoc inside your program, and teach you how to throw and/or create your own exceptions if you are designing an API 
in Java. Both can be very useful in one way or another. Enough talk for now, let's begin!

## Try-catch-finally block

This is the most fundamental and basic way of handling those pesky exceptions. It is essentially blocks of code inside a `try` and `catch`
block. The essential purpose of this is that you can 'try' some code that could throw exceptions, and catch the exception if an exception has been thrown. Below
is an example showing a try-catch block in effect.

``` java
﻿package error;

public class TryCatch
{
	public static void main(String[] args)
	{
		try
		{
			System.out.println(5 / 0); // will generate errors, and you cannot divide by zero
		}
		catch (ArithmeticException ex)
		{
			System.out.println("Arithmetic exception thrown"); // tells you that an arithmetic exception has been thrown
			ex.printStackTrace(); // prints the stack trace so you can trace the error
		}
		catch (Exception e)
		{
			System.out.println("Other exception thrown"); // ditto above (tells you an exception has been thrown)
			e.printStackTrace(); // ditto above, (prints the stack trace)
		}
		finally
		{
			System.out.println("This will run regardless"); // will run regardless if an exception has been thrown or not.
		}
	}
}
```

### Output

```
Arithmetic exception thrown
java.lang.ArithmeticException: / by zero
This will run regardless
   at files.Start.main(Start.java:50)
```

Whether it is in the rules of maths or programming or not, dividing a number by zero is illegal, so therefore calling `5 / 0` WILL generate 
some sort of exception, known as an ArithmeticException. So in order to handle this error without making the application crash and burn, we put troublesome
code inside a try-catch block. Try-catch blocks can have multiple `catch` clauses to catch different exceptions if the code can throw multiple
exceptions. This can be very useful if you want to perform different tasks for different types of exceptions that could be thrown. If you either don't know
what type of exception your code will throw, or if you want to handle a caught exception in a universal way regardless of what type of exception has been
thrown at you, then you can simply use `Exception` inside of your `catch` clause, because every exception is a subclass of the superclass
Exception.

The `finally` clause executes all of its contained code **regardless** of wheter the try-catch block has thrown an error or not. A `finally`
clause is optional with a try-catch statement, however the `catch` clause is compolusrly with any `try` block. An example of the 
`finally` clause in action is in the code example above. A `finally` clause must be placed after all of the `catch` clauses
that you have in a single `try` statement.

The `e.printStackTrace();` method call in the `catch` clauses prints a stack trace of the exception, so you can easily see where it is being 
thrown from, and what exact piece of code is causing it. Although this piece of code is optional, it is recommended to have, so you can easily see where an execption
is being thrown from.

## Throwing exceptions

You might be thinking at this stage: Why do I want to throw exceptions? I want to prevent them. True, but this feature enables you to have full control over your
program in terms of what exceptions are thrown when the specified conditions are met. You can throw any type of exception avaliable, but of course, when you create
a new exception object, the constructor paramaters usually takes a string, which is the error message. below is an example of how to throw your own exceptions!

``` java
﻿package error;

public class Throwing
{
	public static void main(String[] args)
	{
		int i = 0; // Assigns i to 0
		if (i == 0) // checks if i is equal to 0
		{
			throw new RuntimeException("I shouldn't be zero"); // throws a new RuntimeExcpetion
		}
	}
}
```

This program will throw a RuntimeException regardless, as the local variable 'i' is always assigned to 0, and if `i == 0`, an new RuntimeException
will be thrown. A RuntimeExcpetion is a special handled exception, meaning you do not need (but it is recommended) to place a throws tag on the method, or surround
the called method that will throw an exception with the try-catch clause. There are potentially many handled exceptions in the Java language, but if you ever decide
to use an unhandled exception type, such as IOException, or an exception that you create yourself, you need to handle it yourself. Below is how you handle it.

``` java
﻿package error;

public class UnhandledThrowing
{
	public static void main(String[] args)
	{
		ErrorCreatr e = new ErrorCreator();
		try
		{
			e.createError(); // handled method inside the try-catch block.
		}
		catch (IOException ex)
		{
			System.out.println("Caught the error!"); 
			ex.printStackTrace(); // prints the stack trace
		}
	}
}
class ErrorCreator
{
	public void createError() throws IOException // warns the programmer that this method can throw an exception
	{
		boolean flag = false;
		if (!flag)
		{
			throw new IOException(); // Throws an IOException if flag = false
		}
	}
}
```

In this example, the IOException that is being thrown, is handled. The method itself is marked with `throws IOException`, which is useful in two ways:
It warns the programmer that your method can throw an exception, and it also warns the compiler that the called method should be placed in a try-catch block
to ensure that the excpetion thrown will not mess up your program.

## Creating your own errors

If you for one reason or another, need to make your own exception for a specific purpose, or if you wnat to have some fun breaking your program, then this section
is for you. To create your own exception, you create a new class that either extends Throwable or Exception. Below is an example of a custom exception.

``` java
﻿package error;

public class CustomExceptionExample
{
	public static void main(String[] args) // main method
	{
		throw new CustomException("This is a custom exception"); // Throws my custom exception.
	}
}
class CustomException extends Exception // My custom exception. 
{
	public CustomException(String message)
	{
		super(message);
	}
}
```

As shown in the example, I have created my own exception with a constructer that takes a String paramater, which is the error message itself. Using the 
`throw` keyword, I throw that exception by fist creating a new instance of an exception, and then the compiler 'throws' it to you.

In order to create a custom exception, you would need to create the class that extends off Throwable or Exception, and then create the constructors and overridden
methods accordingly to your intended purpose. Bear in mind that your custom error handling code will not go in your new error class itself, it will be in the 
`catch` clause of your try-catch block where the exception will be thrown in.

## Summary

You have now learnt how to handle those pesky errors whose sole purpose of existence on Java's compiler is to wreck your program and cause grief to you. You have
also learnt of how to throw errors under specific conditions and how to create your own if the circumstances require it. You may now go off and handle those errors!

## Additional Tasks

*   Explore more in-depth of the Exception and Throwable class, to see what you can do fully.
*   Create your own exception that handles an invalid value for a specific paramater, for example a table cannot have negative numbers.