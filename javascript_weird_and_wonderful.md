<link rel="stylesheet" href='markdown_tweaks.css'></link>

<style type="text/css">
  html, body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: radial-gradient(hsl(200,60%,50%),hsl(180,60%,50%));
  }
</style>

# Javascript

## Why is Javascript great?

- Because all browsers have it installed.  It will run on anyone's computer, without them having to install anything.

## Why does Javascript suck?

- No static typing.  No interfaces.
- No compile stage means errors are not found until the program is running and the broken line is reached.

# Javascript beginner?

## Use the console

## Use bookmarklets

## Try userscripting

- Chrome users: install TamperMonkey
- Firefox users: Install TamperMonkey or Greasemonkey

- Visit: userscripts.org

## Why I don't recommend bookmarklets:

```
javascript:if(document.styleSheets.length>0){css=!document.styleSheets[0].disabled;for(var%20i=0;i<document.styleSheets.length;i++)%20document.styleSheets[i].disabled=css;};void(css=true);
```

- They look horrible once they are in your bookmarks.
- Getting them into and out of your bookmarks is difficult.
- Embedding them in a web page is problematic (cannot use `'` or `"`).


## A bookmarklet being useful

```
<A href='javascript:(function(){
  var script = document.createElement("script");
  script.src = "http://code.jquery.com/jquery-1.10.2.min.js";
  document.body.appendChild(script);
  script.onload = function(){
    $("pre").each(function(){
      var $pre = $(this);
      $pre[0].contentEditable = true;
      var $runButton = $("<button>Run</button>");
      $runButton.insertAfter($pre);
      $("<p/>").insertAfter($runButton);
      $runButton.click(function(){
        var output = "";
        console.log = function(){
          output += Array.prototype.slice.call(arguments,0).join(" ") + "\n";
        };
        var code = $pre.text();
        /* alert("Evaluating: "+code); */
        /* eval(code); */
        var fn = new Function(code);
        /* alert("Evaluating: "+fn); */
        fn();
        setTimeout(function(){
          if (output.length > 0) {
            alert(output);
          }
        },3000);
      });
    });
  };
})(); void(0);'>Make PREs runnable</A>
```

<A href='javascript:(function(){
  var script = document.createElement("script");
  script.src = "http://code.jquery.com/jquery-1.10.2.min.js";
  document.body.appendChild(script);
  script.onload = function(){
    $("pre").each(function(){
      var $pre = $(this);
      $pre.click(function(){
        $pre.attr("contentEditable",true);
      });
      var $runButton = $("<button>Run</button>");
      $runButton.insertAfter($pre);
      $("<p/>").insertAfter($runButton);
      $runButton.click(function(){
        var output = "";
        console.log = function(){
          output += Array.prototype.slice.call(arguments,0).join(" ") + "\n";
        };
        var code = $pre.text();
        /* alert("Evaluating: "+code); */
        /* eval(code); */
        var fn = new Function(code);
        /* alert("Evaluating: "+fn); */
        fn();
        setTimeout(function(){
          if (output.length > 0) {
            alert(output);
          }
        },3000);
      });
    });
  };
})(); void(0);'>Make PREs runnable</A>



# How to annoy/confuse/terrify your workmates

  - Switch to a tab they aren't using.
  - Hit F12 to bring up the Javascript console.
  - Set up a message to appear in 15 minutes:

```
setTimeout( function(){ alert("YoU hAve bEeN hAxx0rreD bY eCmaNinJa!"); }, 1000*60*15 );
```

  - Switch back to the tag they were on.
  - Whistle noncholantly while you walk away from their PC.



# Terminology

    // Statements:
    x = 20;                  // An assignment
    delete browsers.ie6;
    alert("HI MUM!");        // A function call

    // Declaration:
    var myFunc;

    // Definition:
    function myFunc() {
      return "foo";
    }

    // Expressions:
    y - 12
    Math.min(16, age)
    "You have " + player.health + " health."
    x

    // Array literal:
    var primes = [2, 3, 5, 7, 11];

    // Object literal:
    var animal = {
      name: "cheetah",
      speed: 40.0
    };

    // Building an object by assigning properties:
    var animal = {};
    animal.name = "cheetah";     // String literal
    animal["speed"] = 40.0;      // Number literal



# Wrapping setTimeout

    var realSetTimeout = window.setTimeout;
    window.setTimeout = function(){
        console.log("setTimeout was called with arguments:",arguments);
        return realSetTimeout.apply(this,arguments);
    };

# Wrapping $

An example of using `Function.prototype.apply`

    var realJQuery = window.$;

    function fakeJQuery() {
      var result = realJQuery.apply(realJQuery,arguments);
      if (result.length == 0) {
        console.warn("JQuery returned ZERO results for ",arguments);
      }
      return result;
    }

    // Make sure things like $.ajax() still appear as expected.
    for (var k in realJQuery) {
      fakeJQuery[k] = realJQuery[k];
    }

    window.$ = fakeJQuery;
    window.jQuery = fakeJQuery;


# The for loop async gotcha
## or "why .forEach is awesome"

    // I want to print out all these names, in 2 seconds time
    window.names = [ "Sam", "Fred", "David", "Mark" ];

    // This does not work.  Why?
    for (var i=0;i<names.length;i++) {
      var name = names[i];
      setTimeout(function(){
        console.log(names[i]);
        console.log(name);
      }, 2000);
    }

.

    // This works fine:
    names.forEach(function(name,i){
      setTimeout(function(){
        console.log(names[i]);
        console.log(name);
      }, 2000);
    });

Scopes and closure.

```
// An alternative
for (var i=0;i<names.length;i++) {
  var name = names[i];
  function setupTimer(name,i) {
    setTimeout(function(){
      console.log(names[i]);
      console.log(name);
    }, 2000);
  }();
}
```

```
// Another alternative
for (var i=0;i<names.length;i++) {
  var name = names[i];
  setTimeout(function(name,i){
    console.log(names[i]);
    console.log(name);
  }.bind(null,name,i), 2000);
}
```



# Animation in Javascript

    // Bad:

    function animate(elem, prop, startVal, endVal, duration) {
      var valNow = startVal;
      function doFrame(){
        valNow += (endVal - startVal) / duration * 1000 / 60;
        elem[prop] = valNow;
        if (valNow != endVal) {
          setTimeout(doFrame,1000/60);
        }
      }
      doFrame();
    }

    // Fixed steps might *not* run at fixed time intervals!


    // Good:

    function animate(elem, prop, startVal, endVal, duration) {
      var startTime = new Date().getTime();
      function doFrame(){
        var timeNow = new Date().getTime();
        var t = (timeNow - startTime) / duration;
        if (t > 1) {
          t = 1;
        }
        var valNow = startVal + (endVal - startVal) * t;
        elem[prop] = valNow;
        if (t < 1) {
          setTimeout(doFrame,1000/60);
        }
      }
      doFrame();
    }

Calculate your position based on the current time, and you will always be in the right place.



# Using && instead of if

    if (myCat.isHungry) {
      feed(myCat);
    }

    myCat.isHungry && feed(myCat);

## When does it not work?

    weCanSkipTheRest && return;

Because return is a statement, not an expression.

  - Job interviews

Because employers like readable code, so they can replace you later.



# Godel, Kleene and Turing
## and Why Javascript is terrible

Godel's incompleteness theorems blah blah maths.

Alan Turing (who was British, not Italian) produced a sad answer to the "halting problem":

  We cannot prove, for all computer programs, whether the program will halt, or run forever.

(This seems intuitively true.  If our program is performing a complex calculation that takes time, then there is no shortcut that allows us to see the result, without performing all the calculations required.  So the content of the final alert box is unknowable, until we actually run the program to completion.)

And things get even worse with Javascript.

"Find all calls to MyLib.suckyLookup in my program."

    var x = "suckyL";
    var y = "OOKUP".toLowerCase();

    var fn = MyLib[x+y];

    fn();

Javascript is agile, but less friendly for long-term maintenance.

Fortunately with Java(tm)'s reflection API, he can suck too!



# Refactoring out common patterns

Functions are "first-class" objects.  They can be assigned to variables and passed around.
Second-order functions are functions which operate on other functions.  Wanna see some?

## once

    function once(fn) {
      var done = false;

      return function(){
        if (!done) {
          fn();
          done = true;
        }
      };
    }

Example usage:

    function showMessage() {
      alert("You have clicked on the window.");
    }

    $(window).click( once( showMessage ) );


## The cache pattern

    function cached(fn) {
      var cache = {};
      return function(arg) {
        return (cache[arg] = cache[arg] || fn(arg));   // We don't use if or else any more :P
      };
    }

        // That one-liner is a shortcut for:
        if (cache[arg]) {
          return cache[arg];
        } else {
          cache[arg] = fn(arg);
          return cache[arg];
        }

    function slowComputation(arg){...}

    slowComputation("foo"); // takes a long time
    slowComputation("foo"); // takes a long time
    slowComputation("foo"); // takes a long time

    var slowComputationCached = cached(slowComputation);

    slowComputationCached("foo"); // takes a long time
    slowComputationCached("foo"); // returns immediately :D
    slowComputationCached("foo"); // returns immediately :D

Limitations: Single argument (and must be stringifiable).  Ignores caching of falsy results!


## callbackOrFallback

Callbacks: If a process will take time to complete (it is asynchronous), then your code should NOT "wait" for the response.  Instead it should construct a "callback function", and offer that to be called when the operation has completed.  Thanks to closure in JS scoping, when your function is called, it will still be able to see all the variables of the functions above/around it.

    // Similar to the once pattern (but we can not re-use it, because either of the two functions can set doneCallback)

    function callbackOrFallback(callback, fallback) {

      var doneCallback = false;

      var myFallback = function(){
        if (doneCallback) {
          // callback already happened; good - we don't need to fallback
        } else {
          doneCallback = true;
          fallback.apply(this,arguments);
        }
      }

      var myCallback = function(){
        if (doneCallback) {
          console.warn("Oh no, fallback happened before callback!  NOT calling the callback.");
        } else {
          doneCallback = true;
          callback.apply(this,arguments);
        }
      });

      setTimeout(myFallback, 30*1000);    // myFallback will be called after 30 seconds

      return myCallback;

    }



# Using bind

You can call `<function>.bind` to provide arguments to a function without calling it yet.  You get back a new function which when called, will call the original function with the provided arguments.

    setTimeout( moveit(id,newxpos,timetotake), 1000 );                  // Wrong

    setTimeout( "moveit(id,newxpos,timetotake);", 1000 );               // Dirty

    setTimeout( function(){ moveit(id,newxpos,timetotake); }, 1000 );   // OK

    setTimeout( moveit.bind(null,id,newxpos,timetotake), 1000 );        // Nice


    myFunc.call(null, arg1, arg2);

    // could be written

    myFunc.bind(null, arg1, arg2)();


    // Alternatively, whenever you see the pattern:

    var x = function(){ sam.callHenry("foo","bar"); };

    // You can simplify it to:

    var x = callHenry.bind(sam,"foo","bar");



<!--
for (var prop in window) { console.log(prop + ": " + window.hasOwnProperty(prop)); }
-->





# Promise vs callback

    function doLater(fn) {
      // Simulated async
      setTimeout(fn,0);
    }

    function add_callback(x,y,callback) {
      doLater(function(){ callback(x+y); });
    }

    function add_promise(x,y) {
      var onSuccess = null;
      doLater( function(){ onSuccess(x+y); });
      return {
        then: function(_callback) {
          onSuccess = _callback;
        }
      };
    }

    function logit(r) {
      console.log(r);
    }

    add_callback(4,5,logit);

    add_promise(4,5).
      then(logit);

    add_promise(4,5)
    .then(logit);



# Partial application

    <shesek_> usually for performance I just make the functions partial to begin with, I don't use `pap` that often... e.g. `searchByField = (field) -> (value) -> (object) -> object[field] is value; searchByName = searchByField 'name'; [{name:'joe'}, {name:'bob'}].filter searchByName 'bob'`

Let's Javascriptify that:

    function matchByField(field) {
      return function(value) {
        return function(object) {
          return object[field] === value;
        };
      };
    }

    var db = [{name:"sam",age:20}, {name:"fred",age:30}, {name:"dave",age:40}];

    // Clear usage:
    console.log( matchByField("name")("sam")(db[0]) );
    console.log( matchByField("name")("sam")(db[1]) );

    // Funky usage:
    var matchByName = matchByField("name");
    var results = db.filter( matchByName("fred") );
    console.log(results);

See: ./prefixify.js



# Progressive Enhancement

- Make the page work without Javascript.

- If Javascript is present, add the dynamic Javascript features over the top!

For example:

    <a href="/views/monkey.html" class='.showMonkey'>Show me the monkey</a>

    ...

    <script>
      $('.showMonkey').click(function(event){
        displayMonkeyPopup();
        event.preventDefault();     // Do not follow the link! (fails in old IE)
        return false;             // Do not follow the link! (works everywhere)
      });

This applies to other technologies which may or not be present in the browser.

1. Make it work without the technology (old school)
2. If the technology is present, add the new way and disable the traditional way.

Modernizr can help to check which technologies are available in the browser.



# document.onready / $(document).ready pros and cons

Pros:

  Waits for all the stuff to be loaded.
  All the elements are there when you want to bind event handlers to them.

Cons:

  Waits for all the stuff to be loaded.
  Until *all* the elements are there, *none* of them will have event handlers bound to them!

The first way:

    <script>
      $('document').ready ->
        $('.myMagicLinks').on('click', doMagic)

    ... page content ...

Is basically equivalent to waiting until the end:

    ... page content ...

    <script>
      $('.myMagicLinks').on('click', doMagic)

Users with slow connections may be displaying the top 60% of the page, but impatient so clicking anyway!

But how can we bind events to things that are not there yet?!  Not so hard...

    <script>
      $('body').on('click', '.myMagicLinks', doMagic)

    ... page content ...

The click event listener is bound to the 'body' element before any page content is loaded.  But it only *fires* the event handler function if the clicked element matches the selector `.myMagicLinks`.

(You don't really need this before *all* the content, just before any myMagicLinks.)

Do you even want to force this early loading of event handlers?

- Without event handlers is fine, if your site has progressive enhancement (will do something sensible anyway).
- Using event handlers may fail, if the handler is loaded early, but requires something later in the page be present!

For pages with non-huge amounts of content, you will rarely see bugs emerging from this.  A second click may work if the first one failed.

# Magic things: arguments

# Magic things: debugger

# Magic things: \_\_proto\_\_

# Magic things: constructor


<!-- Finally -->
<script src='prefixfree.min.js'></script>
<script src='jquery-1.10.2.min.js'></script>
<script src='replace_codes_with_pres.js'></script>
<script src='group_into_slides.js'></script>
<script src='reusable_slider.js'></script>
<link rel="stylesheet" href='cube_slider.css'></link>
<script src='cube_slider.js'></script>

