---
title: Diving into HTML
---
The web relies primarily on two languages for displaying information that we see in an everyday website:

*   **HTML** (Hyper Text Markup language) A markup language that tells the browser what to display
*   **CSS** (Cascading Style Sheets)A stylesheet language used to change the displaying of HTML beyond its default presentation

### Software

Before you start writing in HTML and CSS, you're going to need something to write with. This decision is completely up to you, but we suggest a great tool from Adobe for developing on the web called [Brackets](http://download.brackets.io). If you are on a Windows machine without admin rights, you can download this [portable version](http://goo.gl/JBX2IB).

Alternatively, if you want a more online solution, [jsFiddle](http://jsfiddle.net/) will let you develop code for the web in your browser.

## HTML

HTML is responsible for every website you visit, in a way. It carries information for the browser to display, and it does this through markup. You create this information using tags, and the syntax for those tags is as follows

``` html
<element attribute="value">
    <nestedelement>
        Text
    </nestedelement>
    <selfclosingelement />
</element>
```

You can put the syntax down to a few core aspects:

*   There are tags that you write out using the `<` and `>` signs, which open up an element.*   Everything you put inbetween that tag and the closing tag is inside that element, and you can even put more elements within it.
*   To close an element, just end it with the closing tag by putting a forward slash before its name within the tag.
*   Some elements are self closing, and you can't put anything inside them. They have a forward slash before the `>` sign in the tag.
*   Finally, there are attributes that you can set within elements. These are set using the `attribute="value"` notation within the tag, after its name. These will come to mean more later on

That's pretty much all you need to know to start writing in HTML. Please bear in mind that you need to follow this syntax pretty rigidly. As long as you write with the correct syntax, you won't have too many problems. 

To begin, make a new folder for your project in whatever software you are using, and then make a new file called `index.html`. These `.html` files store HTML data, funnily enough. Then write the following code in your new file

``` html
<!DOCTYPE html>
<html>
    <body>
        <p>Hello HTML!</p>
    </body>
</html>
```

Alright, so what's going on here? Let's go through the code line by line:

1.  This is called a doctype, it basically says what version of HTML we are using and helps with browser compatibility. This doctype says we are using HTML5
2.  This is an opening HTML tag, inside this tag is where all of the HTML in the document will be stored
3.  This is a body tag, this is where all of the rendered content goes4.  This is the content of the page being displayed. First a paragraph opening tag, `<p>`, the text you want to display, `Hello HTML!`, and then a closing tag for the pargraph, `</p>`
5.  A closing tag for the body element
6.  A closing tag for the html element

To display this HTML as you would a website, simply open the file up in your browser. In jsFiddle, you can click the "Run" button up at the top, and in Brackets you can click the lightning bolt up at the top right to start a live preview in Google Chrome. With any luck, once you start this up, you should see the text "Hello HTML!"

{% codepen 552857cabd202944cb3d1c08479846e7 height: 140 %}

### Some More Elements

With this knowledge, being an expert in HTML is really arming yourself with several different kinds of elements, there are quite a few. Here are some more to get you started:

#### Headings

You've learned about the `<p>` element for making paragraphs, you can use similar elements for making headings, which help to differentiate between sections of text (for example, the big text "Headings" in this section is a heading). There are six different heading elements, from `<h1>` to `<h6>`. They are numbered in order of rank, so `<h1>` is the biggest and most significant while `<h6>` is the smallest and least significant. Try adding the following to the beginning of your body tag

``` html
<h1>This is my first heading!</h1>
```

#### Anchors

Anchors can do a lot, but at first you'll probably use them for links to other pages. Anchors are denoted by the `<a>` tag. All of the text inside that will go to the URL you specify when clicked. To specify the url you use the `href` attribute. So to make a link to google, you would write it like this

``` html
<a href="http://google.co.nz">Go to Google</a>
```

If you use this, you'll notice that it takes you to the link in your current tab/window. To make it open a new tab/window (depending on browser), set the `target` attribute.

``` html
<a href="http://google.co.nz" target="_blank">Go to Google</a>
```

#### Bold and Italics

If you want to make your text **bold** or *italisized* with pure HTML, just use the `<b>` and `<i>` tags, it's that simple.

``` html
<b>This is bold</b>, <i>this is in italics!</i>
```

### Putting it Together

Take all of these new elements and put them into one document, you can copy this into your own computer and it will render as planned

``` html
<!DOCTYPE html>
<html>
    <body>
        <h1>A Great Document</h1>
        <h6>A Subheading</h6>
        <p>Hello HTML! <b>This is bold</b>, <i>this is in italics!</i> <a href="http://google.co.nz" target="_blank">Go to Google</a></p>
    </body>
</html>
```

### There You Have It

You now have a basic understanding of HTML! This tutorial is designed to get you started, but there are plenty of resources all over the web to learn about all of the elements in HTML and to get some more comprehensive knowledge. 

[Web Platform has some awesome materials on HTML](http://docs.webplatform.org/wiki/html)
