<link rel="stylesheet" href='markdown_tweaks.css'></link>

<style type="text/css">
  html, body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: -webkit-radial-gradient(top,farthest-side circle,hsl(30,80%,50%),hsl(0,80%,50%));
    background-image: radial-gradient(farthest-side circle at top,hsl(30,80%,50%),hsl(0,80%,50%));
  }
</style>



# Animation options in HTML5

## Why?

- Catches attention
- Keeps users entertained
- Makes other people nearby curious!
- Needed for smooth transitions, or games

## Why not?

Some users may experience problems with animation:

- Extra processing
 - May slow down older PCs
 - May use up battery, heat the core, spin the fan
- Distracting, annoying (if not done right, but each user has a different threshold)

Those issues can be easily addressed, with a Stop or Pause Animations button!

But these ones cannot:

- Browser lacks support for the technology
- Platform lacks performance: runs well on your Mac, but runs terrible on the user's phone



# Overview of the alternatives

## Animating standard HTML elements

- `<div>`
- `<img>`
- `#text`

Limited.

## Before canvas there were...

[Triangles](http://www.uselesspickles.com/triangles/demo.html)!

## Animating SVGs

- `<circle>`
- `<triangle>`
- `<rect>`
- Full `<svg>` imported from Illustrator/Inkscape/svgedit/Piktochart

## Canvas

- Slow in theory, fast in practice!

## WebGL and ... GLshaders?



# Options

What technology is available for animation?

## jQuery.animate

Advantages:

- We have used it before
- It works on familiar CSS properties we know and love

Disadvantages:

- It *only* works on CSS properties (not on element attributes).  This is an issue because SVGs are always shaped and often positioned by attributes.
- Does it support `-transform`?  I don't know!  (TODO)

## TweenMax.js

Advantages:

- Can interpolate 

## Raphael

...

## CSS transform!

...



# One more technology

## prefixfree.js

Not actually for animation, but worth mentioning.  It lets you write CSS without worrying about vendor prefix.

    <script src='prefixfree.min.js'></script>

Where it works:

- CSS files linked in your HTML.  (It inspects them retrospectively using XMLHttpRequest)
- CSS you add to the DOM at runtime (to element style)

Where it doesn't work:

- CSS files linked in your HTML while browsing offline (`file://`).  Because some browsers don't support XHR to the filesystem.  There are ways to enable this (Chrome flags).



# Getting started

Create `<svg>` elements manually, and add components to them.

Or grab components directly from the DOM.



# Manipulating a transform

If `myRect` is a `<rect>` element under an `<svg>` then we can move it with:

    myRect.transform.baseVal.getItem(0).setTranslate(newX,newY);

But it will jump to its new location, it won't move smoothly!



# Animating an element

// TODO: Bring a working example here!

    var $nose = $('#monkey1 .nose');
    $nose.



# Terminology

## Interpolation

- Inter = "between"
- Pole = "point"

## Linear interpolation

- Linear means "in a straight line"
Example: `x = C + M * y`
- but with respect to time, it means "at a constant speed"
Example: `(x,y) = (x0,y0) + t * (u0,v0)`

When you rotate an object around a circle, the movement is non-linear

When you use easing, the animation speed is non-linear



# Non-linear interpolation with -transform?

Yes, in time.

But not, in space!

At least, not with CSS `transform`.  You *can* animate CSS properties like `top` and `left` indepdently, but these cannot be applied to individual SVG paths.  (Although if you want to go that way, you can keep each thing you want to animate in a separate SVG.)

## Easing over time

You can set the easing `-animation-timing-function`:

    -webkit-animation-timing-function: linear;
      -moz-transition-timing-function: ease-in-out;
        -ms-animation-timing-function: ease-in;
         -o-animation-timing-function: ease-out;
           -animation-timing-function: cubic-bezier(0.175, 1.120, 0.685, 1.400);

or alternatively directly in the transition:

    -moz-transition: all 500ms ease-out;

See the defaults in action, and a summary of all the features here:

- [Bradshaw Transitions](http://css3.bradshawenterprises.com/transitions/)

Specifying a Bezier curve gives you quite fine-grained control:

- [Caesar](http://matthewlein.com/ceaser/)



# Non-linear motion

The goal:

- Move a ball in a parabola (the curve caused by gravity)

## Use rotation to move the ball in an arc?

Yuck.  An arc looks nothing like a parabola!

## Use bezier curve?

A Bezier curve can only approximate a parabola, but that is good enough.

Move X linearly.

Move Y in a Bezier curve that *looks like* a parabola.

Two separate transforms, requires two separate elements.

If we are animating a `<circle>` then we will need to wrap it in a `<g>`.  Set the x transform on one and the y transform on the other.



<!-- Finally -->
<script src='prefixfree.min.js'></script>
<script src='jquery-1.10.2.min.js'></script>
<script src='replace_codes_with_pres.js'></script>
<script src='group_into_slides.js'></script>
<!-- Anything above group_into_slides will end up in a slide; itself in the last one. -->
<script src='reusable_slider.js'></script>
<link rel="stylesheet" href='cube_slider.css'></link>
<script src='cube_slider.js'></script>
<!-- <div id='dots'></div> -->
<link rel="stylesheet" href='dotfield.css'></link>
<script src='dotfield.js'></script>

