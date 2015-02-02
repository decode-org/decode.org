---

---
<q>The JVM is the magic behind the Java language</q> - Kristian

The Java virtual machine (JVM) is responsible for compiling, checking, and executing your Java programs. The JVM works on many platforms, including Windows, Mac OSX, and Linux.
It is what makes the Java language possible.

Of course the Java API does also contribute greatly to the brilliance of Java, but it would be useless without the JVM to compile and execute the code. Below is a diagram 
representing the process of execution.

![JVM Flowchart](/assets/img/learn/java/jvm-execution-flowchart.png)

The first step is writing the files of your program in plain-text source code format. When you launch or test the program, the JVM compiler compiles your source code into
bytecode that only your machine can read. The JVM then reads this bytecode and executes all instructions within it.

The JVM also executes your code accordingly to your computer specs, including operating systems and processor and RAM size. This provides portability within the Java language,
as you do not need to write Java code accordingly to a specific operating system, the JVM automatically ports for you. This obviously can be different for native libraries, io, 
and other OS-dependant functions that you program.

When finished, the compiler exports your entire project into an archived .jar folder, which contains all of your packages, and compiled classes. These .jar files 
can be executable directly if specified when to do so. It is much easier to compile a project into a .jar folder if you are using an IDE such as Eclipse.
