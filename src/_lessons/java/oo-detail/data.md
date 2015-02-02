---

---
<q></q> - Kristian

Data types are at the core of a programming language. They let us specify, assign, and manipulate different types of values, whether that be numbers or a string. Below is a
table showing you a summary of the various data types found within Java.

<table style="width: 100%">
    <tr>
        <th>Data type</th>
        <th>Description</th>
        <th>Range</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>**`char`**</td>
        <td>Holds a single unicode character</td>
        <td>16 bit Unicode character (0 to 65535)</td>
        <td>``` java
char c =  'a';
```</td>
    </tr>
    <tr>
        <td>**`byte`**</td>
        <td>Holds a 8 bit signed integer. This data type is useful for saving memory in large arrays due to its small memory size, ideal where memory actually matters.</td>
        <td>-128 to 127</td>
        <td>``` java
byte b = 3;
```</td>
    </tr>
    <tr>
        <td>**`short`**</td>
        <td>Holds a 16 bit signed integer As with `byte`, you can save memory using this data type instead of `int`.</td>
        <td>-32768 to 32767</td>
        <td>``` java
short s = 43;
```</td>
    </tr>
    <tr>
        <td>**`int`**</td>
        <td>32 bit signed integer. The most commonly used data type where memory does not matter. It is essentially the default data type for many programmers.</td>
        <td>-2<sup>31</sup> to 2<sup>31</sup> - 1</td>
        <td>``` java
int i = 484;
```</td>
    </tr>
    <tr>
        <td>**`long`**</td>
        <td>64 bit signed integer. Used for storing very large numbers that can be larger than `int`.</td>
        <td>-2<sup>63</sup> to 2<sup>63</sup> - 1</td>
        <td>``` java
long l = 45323556l;
```</td>
    </tr>
    <tr>
        <td>**`float`**</td>
        <td>32 bit single precision floating point number. Floats are used instead of `doubles` to save memory when using numbers with decimal places. Never use
        `float` for precise values such as currency.</td>
        <td>IEEE 754</td>
        <td>``` java
float f = 1.4f;
```</td>
    </tr>
    <tr>
        <td>**`double`**</td>
        <td>64 bit double percision floating point number. For decimals, this data type is the most commonly used. Double should also not be used for percise values due to
        rounding errors as with `float`.</td>
        <td>IEEE 754</td>
        <td>``` java
double d = 4.532d;
```</td>
    </tr>
    <tr>
        <td>**`boolean`**</td>
        <td>Boolean value which can have only two possible values. Commonly used for flags and boolean logic</td>
        <td>**`true`** or **`false`**</td>
        <td>``` java
boolean b = true;
```</td>
    </tr>
</table>

All the types above are called primitive data types. This means that they are data types that are built into the language - they are not an object and are not created by
creating an instance of a class (although there are wrapper classes, which are beyond the bounds of what we are discussing in this lesson). In short, primitive data types
do not need to be created using the `new` keyword.

## Data type literals

You may have noticed that some of the data types require a single letter at the end of the declared value.