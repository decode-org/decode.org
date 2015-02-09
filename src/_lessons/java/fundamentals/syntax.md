---
title: Basic Java Syntax
---
Because Java is a different language to other programming languages, the syntax for certain elements might be slightly different. This page shows comprehensivley 
the syntax for items in Java

## File structure

``` java
﻿package syntax;

public class FileExample
{
    // inner-workings go here
}
```

The first line, you will have the `package` keyword, followed by the name of your folder. This is quite useful for sorting out your files.

The next line is your class decleration. The basic structure is: visibility filetype filename. There is more to this, but we will get up to that at a later stage. Then in the body (between the two curly brackets), you will have all of your functions and variables. All the things that make the file work will go in there.

## Method decleration

``` java
﻿public void methodName(int arg1, String arg2)
{
	// Method guts go here
	return; // optional if you want to exit out of the method, compolsury if the return type is not void
}
```

The structure for the method goes here: `visibility return_type method_name (data_type/file_type arguments...)`. The return keyword is optional if you want to 
exit out of the method, but must be present if the method's return type is something other than **void**. With that, you need to return an object that is that 
of the same value type as the return type. As for the strange `int` keywords in the method paramaters, these are just the data value. Don't worry about
these for now, we will cover them in a later topic.

## Variable declerations

``` java
public int variableName = value; // It is optional to define the variable when you make a new one, but is recommended.
```

The structure for defining a new variable is this: visibility optional_modifiers data_type valuName = value. We will cover what visibility, optional_modifers, 
and data_type means in later topics, but for now, all you need to know is the general syntax of defining a new variable.

## Comments

``` java
﻿// Single-lined comment.

/**
*	Multi-lined
*	comment.
**/

/*
*	Second option for a Multi-lined
*	comment.
*/
```

Comments are used for simply commenting on a piece or code, or informing someone else what a particular piece of code does. The compiler ignores any text in
commented lines. The single lined comment tells the compiler to ignore everything past the //. A multi-lined comment is surrounded by *s and /s. It tells the compiler
to ignore any information between those groups. There are 2 options for multi-lined comments. The top one is best for describing what a method or variable does, as it
is placed into the javadoc of a file, which means the method is 'tagged' with that informatn. The second option is just for making a simple comment that happens to
be multi-lined.

## If-else statement

``` java
﻿if (statement)
{
	// code to run if statement is true
}
else
{
	// code to run if statement is not true (the else part is optional)
}
```

As you might know, the If-else operator executes some code if a statement is true, and other code if it is not true. But above is how it is structured in Java, 
pretty similar to other languages, such as JavaScript. 

``` java
﻿if (statement)
{
	// code to run if statement is true
}
else if (second statement)
{
	// code to run if first statement is not true, but second statement is
}
else
{
	// code to run if no statements are true. Again, optional
}
```

An extra thing you can do with If-else statements is 'stack' up `else if` statements on top of each other. That basically acts as another if statement if 
the statement above is not true.

## Switch statement

``` java
﻿switch (value)
{
case 0:
	something();
	break;
case 1:
	somethingElse();
	break;
	default:
		methodIfNothingElseIsTrue();
		break;
}
```

A switch statement is very similar to other languages. It provides a multi-choice path for information to flow down through. The structure is switch (value) {case 0: something() break;}. The `break` keyword must be at the end of a `case` otherwise the switch statment will continue. If the switch statment returns a value in a `case`, then the `break` keyword is no longer needed. There is also a `default` keyword which is the final path the switch statement will take if no other cases are true

## While loop

``` java
﻿while (expression)
{	
	// code to run if expression is still true.
}
```

The `while` loop looks pretty much the same as it would in another language. And its purpose is pretty basic. While the expression in the paranthesis is
true, it executes code contained in the while loop.

## Do-while loop

``` java
do
{
	// code goes here
}
while (condition);
```

This loop behaves very similarly to how the `while` loop functions, but with one noticable difference. The code is always executed at least once, regardless
whether or not the condition is false.

## For loop

``` java
﻿for (int i = 0; i < 10; i++)
{
	// code to exxecute each loop
}
```

The for loop is also similar to other languages. The structure is, `for` (variable, expression, increment/decrement). Very important, but do not
forget those semicolons (;) at the end of each section of the for loop. This might seem strange, but it is the way it was designed to go (no idea why).

All loops can also be labelled for reference with a `break` or `continue` statement. The syntax is: labelName : for/while/do-while 
(paramaters) and to reference that label, you can put the label name after the `break` or `continue` statement.

## Arrays

``` java
public int[] name = new int[] {itemOne, itemTwo, itemThree}; // for storing multiple variables in one.
```

The syntax for arrays is notably different in Java. The structure is: `visibility data_type[] name = new data_type[] {list_of_data};`
The `new` keyword just simply statest that it is making a new object of the specified type. It might also be worth noting that if you do not
want to define the list of paramaters in the array, you can simply add a number between the [] in the data_type[] after the `new` keyword.
That simply specifies how long the array will be.

## Summary

So as you can see the meaning of these items is the same, but every language has the syntax slightly different. In Java's case, it is similar to some languages, 
espically C++, and JavaScript, but it does have quite a few important, and notable differences. Hopefully you are now ready to learn what makes Java such a great
and useful programming language in the next section.
