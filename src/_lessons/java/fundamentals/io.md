---
title: Java IO
---
## Introduction

Welcome to the tutorial on File I/O where we will explain how to read/write from and to files of all shapes and sizes using Java's nifty, built-in I/O library. In
this tutorial, we will cover how to read/write from files on your computer, web reading, and finally in my opinion, one of my most favourite
features about java - object serialization. Using these features, you can have input and output for your program in the form of files, or console input, which 
is really handy in many cases. A useful note is that I/O can throw many errors because the whole library is dependant on the assertion that the files are in the
correct type, in the correct place, and many more parameters, so therefore we have explained error handling first. But don't let that put you off - I/O is a
very useful, powerful, and interesting tool in Java.

## File I/O

This is a common use with the I/O library - it gives you the ability to read from and write to files on your computer. You can do many things with this, you can 
load information, save data if your program is of that type, and/or you could use it for representing data on your computer, e.g a level layout for a game, or a 
configuration file for your program. Below is an example of how to read from and write to files.

``` java
﻿package io;

import java.io.*;

public class FileIO
{
	public static void main(String[] args)
	{
		FileIO f = new FileIO(); // creates a new FileIO object (because non-static methods cannot be referenced inside static methods)
		f.writeFile(); // calls writeFile()
		f.readFile(); // calls readFile()
	}	
	public void writeFile()
	{
		try
		{
			BufferedWriter writer = new BufferedWriter(new FileWriter(new File("file.txt"))); // creates a new buffered writer for a file.
			writer.write("Hello!"); // writes 'Hello!' in the file
			writer.newLine(); // or writer.write("Hello!\n") instead
			writer.write("Goodbye!"); // writes 'Goodbye!' in the file
			writer.close(); // closes the writer object, very important
			System.out.println("File written"); // notifies us that the file has been written
		}
		catch (Exception e)
		{
			System.out.println("Exception caught"); // notifies us that an exception has been thrown
		}
	}
	public void readFile()
	{
		try
		{
			BufferedReader reader = new BufferedReader(new FileReader(new File("file.txt"))); // creates a new buffered reader for a file.
			String temp = null; // temporary string object
			while ((temp = reader.readLine()) != null) // reads the next line in the file, assigns it to temp, then checks if it is not null.
			{
				System.out.println(temp); // prints the read line to the console.
			}
			reader.close(); // closes the reader object, very important
		}
		catch (Exception e)
		{
			System.out.println("Exception caught"); // notifies us that an exception has been thrown
		}
	}
}
```

Or when you are reading the contents of the file, you could store the lines using a list:

``` java
BufferedReader reader = new BufferedReader(new FileReader(new File("file.txt"))); // creates a new buffered reader for a file.
String temp = null; // temporary string object
List<String> list = new ArrayList<String>(); // a container for the line
while ((temp = reader.readLine()) != null) // reads the next line in the file, assigns it to temp, then checks if it is not null.
{
    System.out.println(temp); // prints the read line to the console.
    list.add(temp); // adds the line contents to the list
}
reader.close(); // closes the reader object, very important
```

### Output

```
File written
Hello!
Goodbye!
```

The `main` method creates a new FileIO object (because the main method is `static`) and calls the two methods `writeFile()` and
`readFile()`. The first method writes the lines 'Hello' and 'Goodbye' to a File. If the file does not exist already, it creates it. But if it does exist,
it will overwrite it. The second method then reads the contents of the file and prints it out to the console. To write a file, you would create a new BufferedWriter
object, with its parameters, a new FileWriter object, and then the FileWriter's constructor, will take a new File object which is the file that you want to write.
As I have said, if the file does not exist, it creates it, otherwise it overwrites it.

After the writer object has been created, we write the line: "Hello!" to the file, then call `newLine();` which creates a new line. You can either
call this method, or insert a newline escape sequence (\n) at the end of the string for which the writer will write to the file. If you don't have either one of these
options, the next `write()` method will just continue the current line.

We then call `writer.close()` which closes the writer object. This is very important to have, otherwise resource (memory) leaks are likely to occur
(Eclipse warns you if you have not closed the object properly). The same applies for the BufferedReader object, this must be properly closed as well, or resources 
leaks can occur here as well.

The called method, `readFile()` reads the contents of the file and prints it to the console. We create a BufferedReader object, which takes a
FileReader object as its constructor, which then takes a File object as its constructor parameter. Then, we create a new String object, called temp which
will temporarly store the contents of each line. The `while` loop reads the next line in the file and assigns it to the temp instance, then it checks
if that temp instance is null or not (to indicate that we have finished reading the file). If not, it prints the temp instance which stores the contents of the line
to the console for us to read, if it is null, we just simply continue. Next, we close the reader object, because it is essential that we do so, otherwise a memory leak
could happen. The output shows that the two methods work, as it confirms that it has written to the file, and prints each line of the file while reading it.

One suggestion of storing the contents of each line of the file for later uses, I have created an ArrayList with a String as its generic parameter. Each iteration
of the while loop, it adds the current line for it. You would want this if you want to pass on information for later processing, but there are other ways of doing
this, its really a matter of preference.

## Web Reading

This section simply covers the basics of web reading, because it is an extensive section, with better dedicated tutorials on it elsewhere. With this, we can 
load information from a website. You could use this for many reasons, try to think of a couple. But first, here is the basics of web reading - below is a program
that will find a keyword in a webpage.

``` java
﻿package io;

import java.io.*;
import java.net.*;

public class WebReader
{
	public String body;
	public String output;

	public boolean checkForUpdate()
	{
		try
		{
			URL url = new URL("http://aurl.com"); // creats a new URL object
			URLConnection urlConnection = url.openConnection(); // opens the connection
			body = "keyowrd" + URLEncoder.encode("a_keyword", "UTF-8"); // encodes
			((HttpURLConnection)urlConnection).setRequestMethod("POST");
			urlConnection.setDoInput(true);
			urlConnection.setDoOutput(true);
			urlConnection.setUseCaches(false);
			urlConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			urlConnection.setRequestProperty("Content-Length", "" + body.length());
			DataOutputStream outStream = new DataOutputStream(urlConnection.getOutputStream());
			DataInputStream inStream = new DataInputStream(urlConnection.getInputStream()); // retrieves the content of the webpage and places it as a DataInputStream object
			outStream.writeBytes(body);
			outStream.flush();
			outStream.close(); // !to close input and output streams!
			String buffer; // temp string variable
			while ((buffer = inStream.readUTF()) != null) // reads a line of the retrieved content, and checks if it is null, if not, appends to the temp buffer
			{
				output += buffer;
			}
			inStream.close(); // !remember to close!
			System.out.println("Successfully loaded info from http://aurl.com");
			return output.contains("a_keyword"); // returns true if output does contain the keyword
		}
		catch (Exception e)
		{
			System.out.println("Failed to find http://aurl.com, prehaps you are not connected to the internet");
			return false;
		}
	}
}
```

The method checkForUpdate() will return either true or false if the webpage does contain the keyword a_keyword. (Used that just as an example). In the method,
we first create a new URL object that takes a string which contains the link as a parameter. For the sake of argument, we have used aurl.com for our webpage 
url example. We open the url connection and assign it to a new UrlConnection object. From here it gets very complex and interesting.

We call a plethora of methods, like `setDoInput()`, `setDoOutput()` and more. This is just configuring `urlConnection` 
for how it should act. We don&#39;t need to go into this in detail, but you should know that this preconfiguration is needed (unless you know what you are 
doing, and you want to do advanced stuff). We create two objects, DataInputStream and DataOutputStream. The input stream will essentially do all of the
reading, and return the website contents stored in its instance, but below is how we get it out.

We have initiated a `while` loop to assign the next read UTF line (called using `instream.readUTF()`) to a temporary String variable,
and then we check if the read line is not `null` (empty), that way we can know when the webpage is fully read. We then append the temporary variable
to output, which will contain all of our read content. After the `while` loop, we then close our DataInputStream and DataOutputStream objects to prevent
resource leaks, and then we return either true or false whether the output contains the specific keyword we are looking for.

Note that the whole method is surrounded by a try-catch clause. As with the IO library, many things in the net library also need to be handled in terms of errors.
For example, the most common error with reading from the web of course is if you are connected to the internet or not, which is the most obvious exception (there
are many more).

## Object serialization

This in my opinion would have to be one of my most favourite and useful features with java. Object serialization is serializing (writing) the state of an object
to a hard disk. Instead of writing a complex program for text files, it is a fast process which simply encodes the state of the object, and can open it again next time
you launch the program etc. This is useful because on many occasions, you would want to keep the state of an object, even at the next startup time of your program.
Because objects on the heap are deleted once the program terminates, you cannot save the state of objects like that, therefore you use serialization. Below
is how you would do this.

``` java
﻿package io;

import java.io.*;

public class ObjectWriter
{
	User u;

	public static void main(String[] args)
	{
		ObjectWriter w = new ObjectWriter(); // create a new ObjectWriter instance, since this is a static method
		w.u = w.readObject(); // calls readObject()
		System.out.println("Username: " + w.u.username); // prints the username
		System.out.println("Password: " + w.u.password); // prints the password
	}
	public User readObject()
	{
		try
		{
			ObjectInputStream in = new ObjectInputStream(new FileInputStream(new File("user.txt"))); // creates a new ObjectInputStream
			User user = (User)in.readObject(); // reads the object, casts it, and assigns it to a local User variable
			in.close(); // again, very important
			System.out.println("Read the object from file"); // notifies us that it has successfully read the file.
			return user; // returns user
		}
		catch (FileNotFoundException e)
		{
			System.out.println("No file exists, uh oh! Let's make one then"); // notifies us that no file exists
			u = new User("arbiter", "12345"); // creates a new User object, with parameters
			try
			{
				ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(new File("user.txt"))); // creates a new ObjectOutputStream
				out.writeObject(u); // writes the User object out
				out.close(); // very important that you must close
				System.out.println("Created a new file"); // notifies us that a new file has been made
				ObjectWriter.main(null); // calls the main method again
			}
			catch (Exception ex)
			{
				System.out.println("Failed to write as well, oh dear"); // notifies us that writing an object has failed too
			}
			return null; // returns a null value
		}
		catch (Exception ex)
		{
			System.out.println("Another exception thrown"); // notifies us that an exception has been thrown
			ex.printStackTrace(); // dump stack trace in console
			return null; // returns a null value
		}
	}
}
class User implements Serializable // our user class that implements serializable
{
	public String username; // username variable
	public transient String password; // password variable, note that it is declared transient

	public User(String username, String password) // simple constructor
	{
		this.username = username;
		this.password = password;
	}
}
```

### Output

```
No file exists, uh oh! Let's make one then
Created a new file
Read the object from file
Username: arbiter
Password: null
```

And the output when the program has run the second time

```
Read the object from file
Username: arbiter
Password: null
```

I know that it looks like a lot of stuff to remember, but here is the break down of it. First, we create a new ObjectWriter object, this will hold our
stuff. Next, we call the `readObject()` method to get the User instance that is stored on disk, however the first time it does not exist, so a
FileNotFoundException will be thrown, which then the specific `catch` clause will catch it and write a new instance of the object to the disk.

We write it by creating an ObjectOutputStream instance, with eventually, the file name as a File object parameter. We then call `writeObject()`
with the new User instance as its parameter. After that, we close the ObjectOutputStream to prevent resource leaks. And finally, we then call the main method
again to execute reading the object again.

When we read the object from the file, we first create a new ObjectInputStream instance and assign it to the specified file in its construtor parameter.
We then cast `in.readObject()` to User and assign that to the User field as specified. As always, we close our ObjectInputStream to prevent
compromization of memory.

Note that the User class implements Serializable, but there are no implementing methods inside the User class. This is because Serializable has none,
it is simply a marker for the compiler to tell if the object can or cannot be serialized. If you serialize an object that does not implement Serializable,
and exception will be thrown.

### The transient keyword

As you may of noticed with the password field inside the User class, it is marked `transient`. This special keyword marks that a field cannot
be serialized within an implementing Serializable class, and thus behaves like a normal object. It is a modifier that can only apply to fields, as methods
do not, and cannot be serialized.

The time what I have used it in the above code sample is to show you possibly under what circumstances you might use the `transient`
keyword. Say for example that you have a rather sensitive field that holds sensitive data, like a password. You can apply the `transient`
keyword before it to mark that it will not be serialized when serialization occurs. In the output, you can see that the printed password has a value of 
`null`, which shows the `transient` keyword in effect.

## Summary

You have now learnt how to read and write files to your computer, to read off a webpage, and to (the most coolest thing) serialize objects.
You may now apply this knowledge anywhere you see fit. But remember, the stuff discussed in this tutorial is only scratching the surface, there are 
many more things you can do with the io and net library, but for now you have learnt the powerful and common features with these libraries.

## Additional tasks

*   Reaseach online what else the io and net libraries can do.
*   Write a program which keeps track of notes that you write, and you can view them next time you relaunch your program.
