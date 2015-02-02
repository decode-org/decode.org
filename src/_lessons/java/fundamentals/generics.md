---

---
## What are Containers?

Containers are classes already programmed in Java that contain or store your objects in a specific way. There is an array (pun intended) of containers that you
can choose from, each with its own usage and speciality. You can get special primitive arrays, to full-on, complex containers such as Maps and Queues. 
Each container holds objects uniquely, and in a very different way from each other, and each (apart from primitive arrays) can be generically parametized.
More on generics later in this tutorial, but first, let's discuss containers, and the various forms that they come in.

## Multidimensional Arrays

Forget single, consecutive arrays (`int[]`), now you are going to learn about an array that is way more awesome. You can have multiple 'rows' of 
values, like nested arrays inside another array. This can be very useful for holding a table of data, as the storage structure of a multidimensional array
is very much similar to that of a table. Now, here is how a multidimensional array is defined and used.

``` java
int[][] multiArray = new int[][] {% raw %}{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}{% endraw %};
```

Or if you want to pre-define the arrray without inserting any values, you would go:

``` java
int[][] multiArray = new int[2][2];
```

As you can see in the first example, multidimensional arrays look a lot like nested arrays, as it looks like the array takes arrays as its data type. You can see
multiple pairs of brackets containing numbers inside the main bracket, which defines the array. The first bracket pair containing the numbers 1, 2, and 3 is 
essentially a 'row' of the array. The next one is another row, and so on. Each 'row' must be seperated by commas as shown in the first example.

You can also define how many 'rows' or 'columns' are in the array before you define it as shown in the second example. In that example, we defined that the new 
multidimensional array will have 3 rows and 3 columns, making 9 values or 'cells' in total contained in the array.

Below is a table showing what a multidimensional array would actually look like, and how to get a value in the array.

![Table diagram](/assets/img/learn/multiarraydiagram.png)

As you can see, the data in the code example above is represented in this table directly above. The values are all put in their associated rows and columns - x and y.
For example, say if you would want to retrieve the value 5 from the array (represented as the table above), we would place the 'cell' coordinates in the braces of 
the array, as shown...

``` java
int value = multiArray[1][1];
```

...where the numbers in the braces of the multidimensional array are the coordinates (corresponds to X2, and Y2 in the table). If you wanted a different value from
the table instead, say 3, you would change the 1 and 1 in the brackets to 0 and 2 (`multiArray[0][2]`). Remember that 0 is the first variable in an array, so 
in order to reference the value 3, you would have to input 0, and 2. (0 is represented as the first row, and 2 as the last column). The first bracket of the array
represents the row of the variable, and the second bracket represents the column. That way, you can store your variables much more efficiently, and retrieve 
your variables easily as well. Multidimensional arrays are ideal if you need to store data in a table format, e.g. the values of a grid, or a sudoku grid.

## Generics

Generics are a way of enabling types (interfaces and classes) to be paramaters when defining classes, methods, and interfaces. Generics are used heavily with
containers, so it is important that we teach you about these before we move on to containers. Generics look a lot like formal parameters for a method (between
the paranthesis()), but do not behave like them. Formal paramaters are values or instances of an object, while generic parameters are types (the whole class/interface
in general). Take the program below for example, it is inefficient and can produce multiple exceptions without generics.

``` java
﻿package generics;

public class Box
{
	private Object contents; // the contents of the box

	public Object get() // the method which gets the contents
	{
		return contents;
	}
	public void set(Object o) // the method which sets the contents
	{
		this.contents = o;
	}
}
```

But with generic types added, the program below becomes much more efficient and clean then the one above.

``` java
﻿package generics;

public class BoxWithGenerics <T> // generic parametrized class
{
	private T t; // generic type (T stands for type)

	public T get() // method which gets the type
	{
		return t;
	}
	public void set(T t) // method which sets the type
	{
		this.t = t;
	]
}
```

The first program stores an Object instance, and sets and gets it accordingly. If you set a Box instance with a String instance, its fine. But until you set 
the Box instance with a different object instance, such as Float, errors would be thrown. Generics define what an object instance would be used for, so therefore
it is much more bug free.

How does this have anything to do with containers you might ask? Well containers are just fancy versions of the Box class demonstrated above. The containers also 
contain more specialised and fancy versions of the get and set methods for getting and setting the object that the Box contains, in fact, the methods contained
in the containers all do the same thing anyway, they get and set objects into the container, but with more control and functionality. Container instances need
to be generic paramaterized because of the same problem demosntrated in the first example. It also gives more functionality to the container specific to the 
type it contains, more is shown below in the Containers section.

The syntax for generic paramaters are &lt;Type1&gt; where the paramaters come after the object instantisation, after method declerations, or after class 
declerations. There can be more than one generic paramater which depends on how much you set if you create your own, but containers usually take one generic paramater,
with one exception that is explained in the section below. There is more to generics than is discussed here, but that is for more advanced purposes, and there are 
tutorials about Java which explain generics in more detail than this one, such as [here](http://docs.oracle.com/javase/tutorial/java/generics/index.html). 
But you just need to know the basics of generics to be a good (not great) programmer in Java, which is what this tutorial covers.

## Containers

Now we are up to the section where we discuss about actual containers in Java. These containers are objects, not primitives, and are defined and created like
how you would create an object. Each container holds the data inside of it in a specific order or speciality. Each container must include generic parameters,
otherwise it is more likely to cause exceptions.

### The List interface

Java's List interface defines an ordered list of objects, just like an array would, but a List can hold multiple instances of the same type, and can add,
remove, and clear the whole list, plus much more. Below is how you would define a new List instance.

``` java
List<String> list = new ArrayList<String>();
```

See that the generic parameter is set to a String, which means that it can only contain strings. Same goes with every other container. You can retrieve 
elements in a List by using `.get(index)`, where `index` is the index of the object. You can set and add elements to the list
as well. `.add(object)` adds another object to the END of the list, while `.set(index, object)` sets the object in a specific index
in the list, re-ordering other objects before and after the index automatically. To remove an object, simply call `.remove(index)` which removes
the object at the specified index, or you can call `.remove(object)` which removes the first occurence of the object passed in the arguments. 
`.clear()` removes every object in the list, and resets it. It basically empties out the whole list.

Note that I am using a new `ArrayList()` object, this is because List is an interface, not a class. Therefore you would have to instantiate it to a
class that implements the interface instead, such as ArrayList, or LinkedList.

The difference between ArrayList and LinkedList is not much, but can still be useful to know. ArrayList is an index-based data order structure, and that
objects can easily be retrieved, but not removed as it has to re-organise the whole entire list. This does not have any direct or noticeable effect on you,
but can still be handy to know. A LinkedList however is a linked, continuous list of data, with iterations to retrieve a value. However, this again does
not affect you directly. An ArrayList is the common choice, and the most common, while LinkedList is not that common. Use ArrayLists more because
they are fast and easy to use than LinkedLists, but do not use them for synchronized methods (more on concurrency in another tutorial). Use LinkedList
for synchronized methods instead.

### The Set interface

A Set collection is much like the List collection, but cannot contain duplicate instances of an object. This can be very useful if you have a program
that is sensitive, and cannot perform two functions of the same object instance, possibly due to bugs or exceptions. A set instance is defined and created
like this.

``` java
Set<Integer> set = new HashSet<Integer>();
```

Note that I used an Integer type instead of a String type, this is the Integer class, what an `int` represents, however it is the object, not the
primitive used, as generic types do not allow primitive values. Also, a HashSet is used instead of an ArrayList. This is because the Set interface has special 
implementing classes, ArrayList (or LinkedList) does not implement the Set interface, so therefore it has its own for use. A HashSet is the best-performing,
and most common implementing class, it stores its objects in a hash table. Because of this, it lacks iteration abilities. A TreeSet stores its elements in 
a tree-like order, which is slightly slower than HashSet, but can have various circumstances when it comes in handy. A LinkedHashSet is combining LinkedList
and HashSet into one. It is basically a HashSet with linked objects. As with LinkedList, it is better for use with synchronized methods.

Retrieving objects from the Set is a little trickier and different than that of the List, you use `.iterate().next()`. The `iterate()`
method applies an iteration to the set (basically preps the set for object retrieval), and you can get the object using `next()`, which returns
the next object in the set. Adding and removing objects are also done in the same way as a List, however you can only remove the specified element of an object
in the set, not by index, as a set is not index-based. Clearing the set is also done in the same way as a List.

### The Queue interface

A Queue container is rather special. It has a FIFO (first in, first out) system to it. An object that is the first to be added to the Queue container,
will be the first to be retrieved, same goes with the last on in, it will be the last one out of the Queue, much like in real life. An object that you
add to the Queue is placed at the 'back of the line', and therefore calling the `element()` or `peek()` methods retrieves the object
that is at the front of the Queue container. Below is an example of a Queue container.

``` java
Queue<Float> queue = new LinkedList<Float>();
```

This time, I am using the Float class as a type parameter, much like the Integer class, this is the class that defines `float` objects, if you 
want your Queue to only contain `float` objects, then you must use its class, because generic arguments do not take primitive types.

You may of noticed that I am using the LinkedList class again. This class is the best, most basic class that implements the Queue interface. 
There are others, like PriorityQueue, which is the same, but somewhere inside of it, you can set priority to objects in the Queue, basically to move them to the 
front. `add()`, `clear()` all work the same way in a Queue instance, however removing is slightly different. After retrieving the first
object in the Queue, you must remove it (you can not if you want, but you must have a good reason for it). This removes the object at the head of the Queue
so it keeps flowing and does not stop (Airport security checkpoints need this function *joke*). To remove the object at the head of the Queue, you can call
either `poll()` or `remove()` methods if you have used either `element()` or `peek()` because these methods 
retrieve the head of the list, but do not remove it. However, `poll()` and `remove()` do, you can get the head of the Queue, and delete
it at the same time, which is much more efficient. `clear()` still has the same purpose in a Queue.

### The Stack class

A Stack container behaves in a FILO (first in, last out) manner. Objects that are added to the Stack are placed on top, which means that the first object
placed in the Stack is placed at the bottom, and others placed on top of it, much like a stack of books or a stack of papers in real life. The Stack has 
methods similar to that of a List, but there are some which gives it its functionality. Below is a definition of a Stack object.

``` java
Stack<String> stack = new Stack<String>();
```

I am using the String type just for the sake of argument this time. Notice that I am directly creating a Stack object (`Stack s = new Stack();`),
this is because Stack itself is a class, and contains its methods inside whcih gives it functionality already. Adding an element is like how you would add
one to a List, you can use `add(index, object)`, `add(object)`, or `addElement(object)`. Note that there is an option to
add an object with a specified index, that is because Stacks are index based, as they extend off the Vector class. Adding an object using the other two
methods will place the object at the top. To retrieve an element, you can call `get(index)` because Stacks are index-based, or you can call
`peek()` or `poll()`, with the former just retrieving the object, and the latter retrieving it and removing it at the same time.
As with the others, you can clear it using `clear()`.

### The Deque interface

This container behaves exactly like the Queue container, but has two ends at either side instead of one. This way, you can use it for faster processing,
or any other uses you can think of. To create a new Deque instance, do it like the code example below.

``` java
Deque<String> deque = new ArrayDeque<String>();
```

Notice that I am using ArrayDeque, this is the most common choice for creating new Deque instances, either this or LinkedList. The methods are the same
for removing, adding, and retrieving objects, but instead it follows with either first or last, defining which side to remove, add, or retrieve an object from.

### The Map interface

Maps are special, they are the only basic predefined container that contains two generic arguments. Maps are just like Sets, but each object inside it will have
an assigned (mapped) key to it of the object or value of your choice. Because Maps act like sets, however they can contain duplicate objects, but not duplicate
keys. Here is how you would define a Map.

``` java
Map<Integer, String> map = new HashMap<Integer, String>();
```

I am mapping String objectcs with Integer values, which means that I am assigning a unique integer to every String object that I add to the map. The three
classes that you can use that implement the Map interface is HashMap, TreeMap, and LinkedHashMap, which behaves in the same was as those that implement
the Set interface. HashMap is again, the most common choice for creating Maps as it is the easiest and quickest to use. Adding a new value with a key to a map
is pretty easy, but not when it comes to retrieving it again. Deleting it is pretty much the same. To add a value with a key to a map, call 
`put(key, value)` where value is the object you are adding, and key is the key you are assigning the value to.

In order to get a value from it, you can call `values().iterator().next()` to get just the next value. You could go `keySet().iterator()
.next()` to get the next key in the map, or you can use the most common, useful and efficient way of retrieving it. Call `entrySet().iterator()
.next()` and at the end of that, call `getKey()` or `getValue()` which gets either the next key or value that corresponds
to the entry that the iterator has returned (`next()` returns the next one after the previous one and so on). Removing an entry in the
map is just as easy as calling `remove(object)` which removes the object in question, and `clear()` which clears the whole entire container.

## Summary

So you can see that generics and containers go directly hand in hand. They could be brothers in fact, however generics does more than typesetting a container,
they can be used for debugging, and more. Those purposes are more complicated, and dedicated tutorials on generics are made to cover that, this tutorial just covers
generics so you can understand how containers work. Containers come in handy in multiple cases, but the most common one that you use would be List, and there is a
bonus to that as it is the most simple one of them all. Maps in my opinion are the most complicated container in the list above, however they can have great uses.
So hopefully you are enlightened by this tutorial, and you now know how you can store your objects in multiple ways.

## Additional Tasks

*   Create each container defined in the list above in a program, and store the same object in each one. Experiment with them to see the behaviour of each one.
*   Create a new container using generic arguments that simulates a crate - it retrieves objects at random. (Build up on the Box code example for this)
*   Follow the link provided above to the generics tutorial and learn more about it if you want to know more about generics.
