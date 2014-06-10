<link rel="stylesheet" href='markdown_tweaks.css'></link>

<style type="text/css">
  html, body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: radial-gradient(#b3d4fc,#0769AD);
    /* background-image: radial-gradient(#b3d4fc,#000000); */
  }
</style>

# What do we use Javascript for?

## Manipulating the DOM

<div style='display:none;'>
<p>DOM</p>
<p>Document Object Model.</p>
</div>

Web pages were static before Javascript.

The addition of Javascript allowed developers to make parts of the page move and change.

This was initially called DHTML (D for dynamic).

(Now CSS can provide some interactive behaviour alone.)

## Processing

HTML can present information but it has no intelligence.  Javascript can perform calculations, to make the page appear smarter!

## Network operations

Javascript allows us to communicate with a webserver, send and receive, without changing page.

Techniques involving this became known as Ajax.



# jQuery

## Why use jQuery?

The browser's DOM gives us control over everything on the page using Javascript.

However it is not so friendly to use, and sometimes there are inconsistencies (IE).

Many people write "convenience functions" to help make this easier.

Some of these efforts have been bundled up into libraries.

- Dojo
- jQuery
- MooTools
- Prototype
- MyLibrary
- ...

jQuery is one of these libraries, and is quite popular.

Even if it's not the best library, its popularity is an advantage because *everyone knows it*.

## When NOT to use jQuery?

jQuery is not always efficient (depending how you use it).  It is quite small by modern standards (~90k minified) but it still costs CPU and memory when loaded into the browser.

So it may not be appropriate if you want a very snappy website on mobiles or other low-power machines.



# Getting started with jQuery!

Let's just play with it a little bit...

The browser console lets us *try out* bits of Javascript without having to write a `script.js` file.  It is a great way to *experiment* with a new library.  When you have found some working code, you can copy it into a script.

Visit your favourite webpage: `http://microsoft.com/`

Pop up your browser's console:

- Chromium: `<Ctrl-Shift-J>`
- Firefox: `<Ctrl-Shift-K>`

Find an element in the Inspector.

Split open the Console with `<Escape>`.  (Chrome only.)

Note that the selected element has been automatically placed in the `$0` variable.  (This is *not* jQuery!)

Now, can we find the element using jQuery's `$` selector?

And manipulate it ... !

    .hide();
    .show();

    .text();                    // To read the element's textContent
    .text("New Text");          // To write

    .css(<property>, <value>);
    .css('opacity', 0.5);       // For example

# An example

Visit `http://jquery.com/`

Visit the "API Documentation" page

    $('.entry-title').css("background",'green');

# Adding some active behaviour:

First let's hide all the summaries:

    $('.entry-summary').hide();

Now let's make each summary re-appear, when we hover over its title:

    var $titles = $('.entry-title > a');

    $titles.hover( function(){ $(this).closest('article').find('.entry-summary').show(); } );

What is this doing:

- The call to `hover()` says "run this function when the user hovers any of the titles".
- Inside the function, `$this` refers to the title which was clicked.
- `closest` walks up the DOM tree, looking for an element of type `<article>`.
- Then `find` searches below the `<article>` for the summary element, and shows it.

Here is an alternative, that will show on hover, hide on un-hover:

    $titles.each(function(){
      var $title = $(this);
      var $summary = $title.closest('article').find('.entry-summary');
      $title.hover($summary.show.bind($summary), $summary.hide.bind($summary));
    });





<!-- Finally -->
<script src='prefixfree.min.js'></script>
<script src='jquery-1.10.2.min.js'></script>
<script src='replace_codes_with_pres.js'></script>
<script src='group_into_slides.js'></script>
<script src='reusable_slider.js'></script>
<link rel="stylesheet" href='cube_slider.css'></link>
<script src='cube_slider.js'></script>
<div id='dots'></div>
<link rel="stylesheet" href='dotfield.css'></link>
<script src='dotfield.js'></script>

