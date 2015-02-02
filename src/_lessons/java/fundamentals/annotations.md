---

---
## Introduction

Although these features are a rather small aspect of Java, they can be quite useful and powerful. Annotations are a way of applying metadata to your variables,
methods, and classes, while enumerated types are useful for organizing functions that certian classes can perform. Although there isn't a large deal to these aspects,
they can be darn useful in some cases. In this tutorial, we will discuss how to use them.

## Annotations

Annotations are a way of adding metadata to your code which do not do anything to the function of your code, but just simply adds information to it.
You can place them before class definitions, field definitions, and method declearations to give the annotated object a little bit of information.
Before we explore on how to create your own annotations, we first will discuss the predefined annotations already built into Java, because some of them hold
special information.

### Predefined annotations

<table>
    <tr>
        <td>**Annotation**</td>
        <td>**Where to place it**</td>
        <td>**What it does**</td>
    </tr>
    <tr>
        <td>**@Override**</td>
        <td>Before method or field declerations</td>
        <td>This will mark that a method will override the same method in the superclass. Even though that methods written the same in the subclass from the superclass
        are automatically overriden, but it is a good way of marking that the method is an overriding method. So you or anyone else reading your code can figure it out
        fast. It is recommended to have this before overridden methods are defined, because it makes it easier for you, and anyone else.</td>
    </tr>
    <tr>
        <td>**@Deprecated**</td>
        <td>Before anything</td>
        <td>This annotation will mark your method/class/field as deprecated. This means that it is a method/field/class that other people would generally want to avoid
        using because either the item marked deprecated is volatile and dangerous, or another superior item has been made with the same purpose, therefore the old one 
        might be removed in a future update. IDE's will warn you if you are using a deprecated item, and advise you to not.</td>
    </tr>
    <tr>
        <td>**@SuppressWarnings("warning")**</td>
        <td>Before anything</td>
        <td>This annotation does exactly as it sounds. It hides any warnings that either the compiler or the IDE brings forth to you. It can be placed before anything
        that can give you a warning to hide it. The parameters of this annotation are the type of warning you would like to suppress. There may be more than one, but 
        it must be in a list ({}) with each warning seperated by a comma (,).</td>
    </tr>
</table>

### Creating annotations

We will now teach you how you can create your own annotations to give your code some specialized metadata. Remember that annotations do nothing towards the 
functionality of your code, they merely provide information for it in the form of metadata. Below is the structure of custom annotations, and adding them to a method.

In the example, we create two annotations, and use them on the class. An annotation type is defined by the `@interface` keyword. (@ stands for AT 
(Annotation Type)). You define it like you would with a normal interface.

The body of the annotatoin type can be the values or attributes that the annotation can hold, and they can be any object. You would define them as you would
as an interface method, without any method body. Simply declare the type that you would like an attribute to be, followed by the attribute name, followed by a pair of
paranthesis, like how you would declare a method outline in an interface.

The @Retention and @Target annotations are designed specially for defining custom annotations. The first one declares how the annotation will exist, and the 
second one declares where the annotation can be placed. The retention policy can either be SOURCE meaning that it only exists at source level, CLASS meaning that
it only exists as part of the compiler, and not the JVM, or RUNTIME which means that it can exist on the JVM, but the element type can be anything. Below
is a table showing the options.

<table>
    <tr>
        <td>**Option**</td>
        <td>**Location**</td>
    </tr>
    <tr>
        <td>_ANNOTATION_TYPE_</td>
        <td>Applied before annotation declerations</td>
    </tr>
    <tr>
        <td>_CONSTRUCTOR_</td>
        <td>Can be applied before a constructor</td>
    </tr>
    <tr>
        <td>_FIELD_</td>
        <td>Applies to a field or property</td>
    </tr>
    <tr>
        <td>_LOCAL_VARIABLE_</td>
        <td>Can be applied before the decleration of a local variable</td>
    </tr>
    <tr>
        <td>_METHOD_</td>
        <td>Applied before defining a method</td>
    </tr>
    <tr>
        <td>_PACKAGE_</td>
        <td>Placed before a package decleration</td>
    </tr>
    <tr>
        <td>_PARAMETER_</td>
        <td>Can be applied to the parameters of a method</td>
    </tr>
    <tr>
        <td>_TYPE_</td>
        <td>Can be applied before a class, interface, or enum type</td>
    </tr>
</table>

If you want the annotation to go anywhere, simply exclude it, and if you want multiple places, simply put as many @Target annotations with different assignments
as you want.

You can also apply the `default` keyword after an annotation attribute to specify the default parameter for that attribute. Simply place the `default`
keyword straight after the attribute name and paranthesis, and then specify the default value for that attribute. The default value must match the attribute type. 
Attributes with default parameters do not need to be included within when writing the annotation elsewhere, unless you want to include it.

There are more things that you can do with annotations, like to give them code functionality, instead of being fancy comments, but that is too advanced for this
group of tutorials. There are other tutorials online, or in books that cover this if you want to get more into annotations. But for now, we'll keep it simple.

## Enumerated types

Enumerated types are a useful tool when it comes to representing a fixed set of constants. That is what enumerated types essentially are. They are a set of
predefined constants, much like `static final` fields in a class, but instead treated and handled differently. It might also be worth noting that enums
cannot extend off another one, but it can implement an interface.

Enums are declared using the `enum` keyword that takes the `class` keyword's place when defining a type. Below is an example of a couple of
enums, and how they can be used.

``` java
﻿package enum;

public class Enums
{
	public static void main(String[] args)
	{
		for (EnumWithParams e : EnumWithParams.values()) // foreach loop working nicely with enums
		{
			System.out.println(e.getNumber());
		}
		EnumWithoutParams number = EnumWithoutParams.TWO;
		switch (number) // switch statement working nicely with enums
		{
		case ONE:
			System.out.println("1");
			break;
		case TWO:
			System.out.println("2");
			break;
		case THREE:
			System.out.println("3");
			break;
		case FOUR:
			System.out.println("4");
			break;
		case FIVE:
			System.out.println("5");
			break;
		}
	}
}
enum EnumWithParams // enum with a constructor
{
	ONE(1),
	TWO(2),
	THREE(3),
	FOUR(4),
	FIVE(5);

	private int number; // enum field, not to be confused with enum fields (ONE, TWO...)

	private EnumWithParams(int par1) // automatically private; enum constructor
	{
		this.number = par1;
	}
	public int getNumber() // enum method
	{
		return this.number;
	}
}
enum EnumWithoutParams // enum without a constructor
{
	ONE,
	TWO,
	THREE,
	FOUR,
	FIVE;
}
```

### Output

```
1
2
3
4
52
```

There are two types of enums displayed in the above code sample. One with constructor parameters, and one without. The first one, EnumWithParams takes parameters
after each enum decleration. In order for an `enum` with parameters, we need a constructor, field, and a getter method. Our constructor is just like how
you would define a class constructor, and it takes one parameter, an `int` value, and assigns it to the `private` field known as number. We
then can use the getNumber() method to retrieve the number for each enum value as we please.

Switch statements work really nicely with enums, because of that they are very useful. A foreach loop can also be used with an enum, granted the values() method is
used. This method returns an array of all of the enumerated values inside of the specified enum.

## Summary

We have now covered enumerated types, and annotations. Small, yet useful aspects of Java in some instances. Annotations are used like fancy comments to provide
annotated information on any item in Java, while enumerated types are used to represent a fixed set of constants as a easier and better managed alternative over
many static final fields in a class. Custom annotations are declared using the `@interface` keyword, and enums are declared using the `enum`
keyword. We hope now that you can take this information away and use it rather easily during your ambitions as a programmer.

## Additional tasks

*   Create an enum called Days, with all of the days of the week inside.
*   Create a custom annotation called Important, which can be applied to any item, and has an attribute called importance, which can be whatever you want.