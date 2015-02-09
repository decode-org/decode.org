---
title: Data Types
---
## Introduction

Java provides the option to select your data type. A data type is a type of value that has different requirements, and specifications. Different data types take up different amounts of space. Different data types can also have a min and max value for it, which can save you space if you have a value that is not too high or low. This lesson will teach you about the various data types in Java, and their limits/space as well as their uses and how to use them. A comprehensive understanding of these datatypes isn't necessary, so feel free to continue to the next lesson if this is going over your head.

### Table of data types

Name    | Range   | Min Value | Max Value
--------|---------|-----------|----------
char    | 16 Bits | Unicode 0 | Unicode 2<sup>16</sup>-1
boolean | 8 Bits  | False     | True
byte    | 8 Bits  | -128      | 128
short   | 16 Bits | -2<sup>15</sup>| 2<sup>15</sup>-1
int     | 32 Bits | -2<sup>31</sup>| 2<sup>31</sup>-1
long    | 64 Bits | -2<sup>63</sup>| 2<sup>63</sup>-1
float   | 32 Bits | IEEE754  | IEEE754
double  | 64 Bits | IEEE754  | IEEE754

## Explanation

As you can see in the table above, there are many different data types in java. The values above are known as 'primitives' which means that it does not get placed on the heap like normal objects do, it gets placed on the stack, which is much more efficient and faster, espically for slower computers. All primitive data types hold a value of a number, except for a couple of special cases. `boolean`, which either holds `true` or
`false`, and `char`, which holds a single Unicode character, such as the letter 'x'. `float` and `double` 
types can be a decimal place, and must contain the letter 'f' at the end of the value if it is a `float`, and the letter 'd' if it is a
`double`. All of these data types can be used as a primitive array, such as an `int[]` array.

## Detailed Info

Below this paragraph is a comprehensive guide on what each type of primitive does, what it is great for, how to use it, and what its limitations are.

### char

The `char` keyword indicates that this data type will be that of a `char`. An example of how a newly created `char` variable would look like is below.

``` java
char c = 'a';
```

As you can see, a char holds a single character. This can be used for identification, labelling, and other uses with single characters. Can you think of any other uses? The `char` data type isn't really used as often as the other data types, but there are still a few uses for it. When you get experienced in Java, the uses for the `char` data type would be more obvious and there would be more cases where you would use it.

### boolean

A `boolean` value is a value that is either `true` or `false`. Boolean values are a very common data type in Java, and just about any programming language. Boolean values are the center of most logic in a programming language, from loops to if-else statements. To make a `boolean` value, either a field or a local variable, simply write it like this: 

``` java
public boolean b = true;
```

If it is a local variable, simply remove the visibility modifier to make it local (only contained within a method or other body of code). They can be very useful for assorted logic tasks, for flagging a condition, and much more. Can you think of any useful purposes for a `boolean` value?

### byte

A `byte` is a numeral value that can hold numbers from -128 to 127, which essentially is 255 different numbers. Might seem useless and pointless to 
have such a restricting data type, but it is great when you have a value that is never intended to go higher or lower than its range, and you do not want to take up much memory. A `byte` variable would look like this:

``` java
public byte b = 21;
```

### short

A `short` is a data type this is considerably larger than a `byte`, but smaller than an `int` data type, but is still not commonly used. A `short` data type uses 16 bits, rather than the 32 bits that an `int` uses, so it is useful for making memory saving  varibles and arrays where memory saving matters, such as in a large and bulky program. A `short` variable would look like this: 

``` java
public short s = 24;
```

### int

An `int` data type is probably the most arbitratry and common data type that you would find in Java, possibly because it is the most simple and  quickest word to type. You would most probably use this data type the most often, therefore you will need to recognise what an `int` variable looks like, here is an example: 

``` java
public int variableName = 5;
```

You will have the visibility identifier first, the `int` keyword, then the variable name, then possibly an assignment directly to a numerical value, such as 5.

### long

The `long` data type is essentially an `int`, but can hold a value that is higher than the max value for an `int`. Thatcomes at a price, a `long` uses twice the memory that an `int` would use; it uses 64 bits instead of 32. A `long` variable would look like this: 

``` java
public long name = 40;
``` 

With the structure: visibility, `long` keyword, variable name, and an assignment if you intend to use the varible after when you assign it. Note that if you are assigning a rather large number to a `long` data type, then you must place the 'l' letter directly after the number, so it would look like this: 

``` java
long l = 48298453345l;
```

### float

A `float` data type is a single precision floating point number (decimal). Its range is absolutley large, but is generally used for decimal numbers, and/or large numbers with decimals. Do not use a `float` data type for precise values, such as currency as it is rounded to a degree and is never preciswleythe number you supply if that number is a long decimal, use the `double` data type for this. Because of that, it has a memory bank of 32 bits. A `float` needs to have the letter 'f' after the number to indicate that it is a `float`. An example of this is:

``` java
public float f = 3.141f;
```

The structure of it is like the other data types, but can include a decimal place, and must include the letter 'f' at the end.

### double

A `double` is a double precision floating point number (decimal), with notably more accuracy and precision than a `float`. This data typeis more commonly used due to its level of precision over a `float`, but it is not recommended for general decimal point numbers, due to its memory size of 64 bits. Use a `float` instead for general decimals, espically decimal arrays to conserve memory. A `double` value will need the letter 'd' directly after the number like this: 

``` java
public double d = 3.141592654d;
```

The structure is visibility, `double` keyword, variable name, then an assignment with the letter 'd' after the value.

## The special data type - String

A String is a sequence of unicode characters in between a pair of double quotes (`"`). A String is an object (more on that in another tutorial), but has some special primitive conditions as well as it is possibly the most commonly used object in Java. Because it is an object, the general treatment of a String variable would be: 

``` java
public String s = new String("Hello");
```

But because it can be treated as a primitive data type, it can look like this: 

``` java
public String s = "Hello";
```

 Without the `new` keyword, which creates a new object. Because a String is an object, it will haveits own methods and paramaters, such as `length();` unlike the numerical primitives such as `char` or `int`, where the primitive value do not have associated methods. If you want a numerical value that does have its accompanying methods, use the object instead of the primitive, e.g: `public Integer i = new Integer(2);`. An important note with strings is that they are surrounded by double quotes (") insteadof single quotes (') that is used with `char` data types. This is a common mistake. Overall, can you think of any uses for a String?
Strings also have some special features that can be included inside the string as well, escape characters. These are special features such as a tab, or a new line that is defined by a backslash (\). Below is a table of all of the escape sequences that can be used in strings. Note that these can also be used in `char`variables.

Escape Sequence | Symbol 
----------------|--------
Backspace       | `\b`     
Tab             | `\t`     
Newline         | `\n`     
Carriage Return | `\r`     
Form Feed       | `\f`
Single Quote    | `\'`
Double Quote    | `\"`
Backslash       | `\\`

Escape sequences can come in handy in many circumstances when you are making String varibles 

 ``` java
public String s = "He said 'NO'!";
```

Which shows that there needs to be single quote characters placed in those positions, but because String and `char` variables are contained in quotes,  this would conflict, so an escape sequence is needed. The output for the String above would be: `He said 'NO'!` which shows an important need for escape sequences.

## Upcasting and Downcasting

Upcasting is changing one data type to another above it, and downcasting is the opposite. Say if you needed an `int` variable at one location, but all you have is a `float` variable. What do you do? You cast it. An example of upcasting would be:

 ``` java
short s = 40;
int i = (int)s;
```

And downcasting would look like this.

 ``` java
float f = 1.0f;
int i = (int)f;
```

This is very useful when you need a specific data type, but have another one of a different type. This usefulness comes at a price however, casting can lose  precision and accuracy, because it is changing a data type to another. For example:

 ``` java
float f = 1.2f;
int i = (int)f;
```

Where a floating point decimal is being casted to a whole number, so it would round from 1.2 to 1. This  is just one example of the flaws that casting has. Casting can also be used for objects as well as primitives. An example of this is below

 ``` java
﻿package data;

class Object1
{
	public void something()
	{

	}
}
class Object2 extends Object1
{
	@Override
	public void something()
	{

	}
	public void somethingElse()
	{

	}
}
public class Main
{
	public static void main(String[] args)
	{
		Object1 object = new Object1();
		Object2 anotherObject = (Object2)object; // upcasting, legal
		Object1 finalObject = (Object1)anotherObject; // downcasting, legal
	}
}
```

Two classes are made, Object1 and Object2. Object2 extends off Object1 (More on inheritance and classes later), so Object2 is related to Object1. Because of  this, you can upcast and downcast objects that are related to each other as shown in the example. You cannot cast two seperate or different objects, such  as an `int` to a String. In this case, upcasting objects makes the object have methods and fields that the other object has, for example the  upcasted Object1 will now have the `somethingElse();` method avaliable to it, as well as the `something();` method. Downcasting  is the opposite.

The general syntax for casting is: `CastedObject name = (CastedObject)originalObject;`

## Summary

So as you can see, Java provides a plethora of data types for you to use, and you can manipulate and use those data types to your discretion. You can cast objects and data types to each other, provide special tasks for a string, and much more. You must know that there is a difference between a primitive and an object though, primitives are *not* objects, they are simple numbers that exist within the heap, not the stack. In order to program efficiently in  Java, you must be familiar with the various data types avalaible, and their strengths/limitations.

## Additional tasks

*   Experiment around with the assorted data types, try casting, defining, and testing them so you can see what is legal and what is not. Eclipse will tel you if something is not legal.
*   Brainstorm the uses for each of the data types
