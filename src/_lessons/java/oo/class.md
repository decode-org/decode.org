---

---
<q>Classes are the mold of objects</q> - Kristian

Classes are very important in Java. They contain all of your code that defines an object's state and behavour - essentially they are the blueprints for objects. 
There is generally one class for each file in Java, and the class name must have the same name as the file name. For example, a file called `Computer.java` will hold a
`Computer` class (Not always in the case of inner classes).

Classes are defined using the **`class`** keyword, before the name of the class. An example of our `Computer` class is below.

Computer.java
``` java
package org.decode.objects;

/**
 * 
 * @author Kristian
 *
 */
public class Computer
{

}
```

In the above code, there are a lot of things that might be new to you. Do not worry about these, just focus on our class definition: ``` java
class Computer
```
This line of code defines our class named `Computer`. The class has no methods or fields that define the object's behaviour and state because we have not learnt how
to add methods or fields yet. The class is contained in a single file called `Computer.java`. The package decleration at the top will be explored more in detail in the 
Access Control chapter, but for now, all you need to know is that it defines what folder the `.java` file is in.

The **`public`** keyword before the class definition is irrelevant right now, and you do not need to worry about it at this stage. It will be covered in greater
detail in the Access Control chapter, but for now, let's focus on the class itself.

What we have done in this file is we have essentially created a blank blueprint for a `Computer` object. We have not written any code which mimics the state or 
behaviour for the object yet, but all the code that will make the object the object (fields, methods, etc) will go between the curly brackets ({}) after the class definition.

Now that you know how to declare new classes, in the next tutorial we will create an instance of our class. This is where classes come into use.