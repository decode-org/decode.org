---
title: Adding Some Styles
---
You've learned HTML and you've just skimmed the surface of the power behind the web. You haven't even learned a programming language yet. But before we do that, we shall learn CSS. CSS stands for Cascading Style Sheets and is used to change the way the browser renders HTML, to make websites look good.

## Prepare For CSS

CSS is stored in `.css` files, so in a folder where you want this to be make your `index.html` file and a `main.css` file. Now let's take the HTML from the last lesson, and add a few crucial elements to link to the CSS file

``` html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="main.css" />
    </head>
    <body>
          <p>
              Hello HTML! <b>This is bold</b>, <i>this is in italics!</i>, <a href="http://google.co.nz">Go to Google</a>
          </p>
    </body>
</html>
```

There are only two new elements in this file, a `<head>` element and a `<link>` element. The `<head>` is an element where we store a lot of our behind the scenes stuff, mainly metadata. In this case, we're storing our `<link>`, which is used to link in the CSS file. You can see that it's using some attributes. `rel="stylesheet"` and `type="text/css"` are telling the browser that this is a css file you're linking in, and `href="main.css"` is telling the browser where this file is located.

## CSS Syntax

CSS has a really simple syntax, which is as follows

``` css
selector { 
   property1: value1; 
   property2: value2; 
}
```

*   The selector gives the instructions as to what elements we style
*   That style is set within the bounds of the two curly brackets (`{ }`).*   Within the style you set properties, the left side is the property you are setting
*   The right side is what you are setting the property to
*   The property is seperated from the value with a colon (`:`)
*   Each declaration is delimited with a semicolon at the end (`;`)

## Get to CSS

In your `main.css` file you can write the following CSS

{% codepen 12f5f769512c7614e5446384d64e5adf type: css, height: 200 %} 

Here we have set the `color` property to `#0000ff` for all `<p>` elements. If everything has been done right, and you open up `index.html` in your browser, you will see your paragraph has turned a startling blue! This property refers to the colour of the text, and that random string of numbers was a hexidecimal colour. 

## Lets Be Classy Here

Say we want to make another `<p>` element. Lets add it in

{% codepen f9b0a8bcd88311ddae10c50fe7c9ad4f type: result, height: 200 %} 

Uh oh! It's blue as well. This is because our css is pointing towards all `<p>` elements. We can fix this pretty easily. So first, lets add a `class` attribute to our first `<p>` element

``` html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="main.css" />
    </head>
    <body>
        <p class="blue">Hello HTML! <b>This is bold</b>, <i>this is in italics!</i> <a href="http://google.co.nz" target="_blank">Go to Google</a></p>
        <p>Paragraph number two</p>
    </body>
</html>
```

And now we make a really simple change to our CSS file, and that's to the selector

{% codepen c81e39faf591416e842bece91e5eee2d height: 200 %}

This new selector, instead of pointing to all `<p>` elements, it uses the period (`.`) before the selector and the class name to point to all elements with the `blue` class, like our first paragraph. Selectors do get a little more complex than this, but for the most part this is all you will need.

## Make a Button

Take this basic knowledge and add some more properties to set, now we can make a pretty little button. Lets start by adding our button to the HTML, right after the second paragraph

``` html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="main.css" />
    </head>
    <body>
        <p class="blue">Hello HTML! <b>This is bold</b>, <i>this is in italics!</i> <a href="http://google.co.nz" target="_blank">Go to Google</a></p>
        <p>Paragraph number two</p>
        
    </body>
</html>
```

A brand new element, you'll see here, is the `<div>` element. This element is just an empty block element for styling however we want. Time to make some CSS for it.

``` css
.button {
    width: 200px;
    height: 40px;
    background: #111111;
    color: #ffffff;
    padding-top: 20px;
    text-align: center;
    font-family: Tahoma, sans-serif;
    margin-left: auto;
    margin-right: auto;
}
```

That's quite a few different properties, so let's go through them individually

*   `width` is the width of the element. Note the unit `px` here, which stands for pixels. Units are required with dimensions in CSS
*   `height` is just like width but for height instead
*   `background` can do a lot of things, we're setting the colour of the background here
*   `color` sets the colour of the text, just like before
*   `padding-top` is an interesting one. Padding is the distance between the edges of an element and its content, so here we're setting the distance between the top of the button and the content to 20 pixels
*   `text-align` is just like the text alignment in word processing programs like Word, here we're centre aligning the text
*   `font-family` selects what font we want to use. Tahoma is our first choice, and if that's not available we will fall back on sans-serif. Note the use of a comma (`,`) to seperate between fonts
*   `margin-left` and `margin-right` are similar to padding. Margin is the distance between the edges of an element and the content around it. Here, setting them to auto will centre the button in the middle of the page

Lets add some interactivity to this button, with a new selector

{% codepen aa1816d234cb6220fc04198dfd3ffe43 %}

This `:hover` at the end of the selector means that the style will only apply when the mouse is over the element. Here, we're changing the background of the button and changing the mouse cursor to a hand pointer.

## Well Done!

That's a breif introduction to CSS. Like HTML, becoming an expert is about learning all of the selectors and properties. With these two languages, you can make some powerful websites.

[Web Platform has some awesome resources for css](http://docs.webplatform.org/wiki/css)
