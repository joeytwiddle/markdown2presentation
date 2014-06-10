<link rel="stylesheet" href='markdown_tweaks.css'></link>

<style type="text/css">
  html, body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: -webkit-radial-gradient(center,farthest-side circle,hsl(30,80%,50%),hsl(0,80%,50%));
    background-image: radial-gradient(farthest-side circle at center,hsl(30,80%,50%),hsl(0,80%,50%));
  }
</style>



# Callback functions in Javascript

    $.get('/news.json', function(news){
    });

# Memory allocation and memory pointers

- Memory allocation
- Pointers (references)
- Memory cleanup.  Reclaims memory for re-use later (de-allocation)

# Garbage collection

Older languages (e.g. C) require developers clean up memory when data is no longer needed (e.g. using `delete` keyword).  If this is not done properly, slow or fast memory leaks can occur.

That means the developer must keep track of which pieces of data are still referenced by parts of the application, and which are no longer being pointed to.

Some later languages added an alternative: garbage collection (GC).

In languages with garbage collection, the interpreter or engine knows what parts of memory are pointing at other parts of memory.  When a piece of data is *no longer being pointed at* by the application, then it is not needed, and the memory can be reclaimed.

Early garbage collectors run occasionally.
- Slow, freeze, jitter
- Saw-shaped

Modern garbage collectors run much more frequently
- Forgot the name for this
- Using frames?
- Also, reference counting can be used (overhead)

# Scopes and Closures in Javascript



<!-- Finally -->
<script src='prefixfree.min.js'></script>
<script src='jquery-1.10.2.min.js'></script>
<script src='replace_codes_with_pres.js'></script>
<script src='group_into_slides.js'></script>
<!-- Anything above group_into_slides will end up in a slide; itself in the last one. -->
<script src='reusable_slider.js'></script>
<link rel="stylesheet" href='cube_slider.css'></link>
<script src='cube_slider.js'></script>
<div id='dots'></div>
<link rel="stylesheet" href='dotfield.css'></link>
<script src='dotfield.js'></script>

