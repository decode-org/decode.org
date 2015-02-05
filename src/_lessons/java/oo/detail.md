---
title: Introduction Continued
---
There are more to objects in Java. An object can be copied as many times as you like, and have different states to each other. A copy of an object is referred to as
an instance. For example, imagine a `Computer` object that has states brand, os, RAM. It can have whatever behaviour as you want. Make an instance of `Computer`
that has the brand "Dell", and os "Windows". This specific instance holds those properties only to itself, it is unique. If you create another instance of `Computer`, 
it can have a completly different state, and will still not affect your first instance.

Using this, you can have a truly dynamic program, that in a way, obeys the laws and logic of the real world (as long as you program it that way).

Of course, software emulations of real life objects are obviously different, as they are in a digital form. However their behaviour and state are pretty much the same, but 
only in the digital realm. Objects in Java can be imagined as a layered structure, with its state as its nucleus (much like DNA inside a cell), and its behaviour surrounding the 
center. This diagram is below.

![Object Diagram](/assets/img/learn/object.png)

Now we have covered objects itself, next will be classes. You cannot have objects without classes in Java.
