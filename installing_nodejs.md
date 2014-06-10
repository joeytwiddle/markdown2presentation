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



# Install NodeJS on Ubuntu/Debian

The `nodejs` package available in Debian/Ubuntu is rather out-of-date (0.6) but you can get fresh builds here:

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

# Pros of Node

- Writing your server in Javascript means you can share code between the client and the server.  (E.g. validation, template rendering, single-page-app via Ajax or rendered by server.)
- Modern package ecosystem with NPM and Github.  https://github.com/joyent/node/wiki/modules

`npm install markdown-html`

# Cons of Node

- No static type checking
- Asynchronous callbacks lead to *nested callback hell*
-- This can be mitigated with pre-processors like `streamlinejs`, or with promises. https://github.com/joyent/node/wiki/modules#wiki-async-flow


# Some interesting packages

- `jade` (minimalist templating engine - more HTML in fewer keystrokes)
- Meteor (actually that's a framework!)
- `gorillascript`
- [`Sails.js`](http://sailsjs.org/)



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

