You can quickly turn a markdown document into a presentation.

# Setup

    $ npm install markdown-html

# Making a presentation from a markdown

The current method is:

1. Find a presentation you like (by looking at the `.html` files in this folder).
2. Open the `.md` file that corresponds to your favourite.
3. Copy and paste the header and footer HTML from there into your own `.md` or `.txt` file.
4. Edit the `make` file so that it will process your `.md` file and generate an `.html` file.
5. Run `./make`

# TODOs

Make a builder script.  It would leave your original `.md` file untouched, and prepend and append the neccessary HTML and CSS rules, with options to change colors and add extra effect scripts.  It should be a one-liner to create a presentation from a markdown!

Another improvement might be to use a Markdown processor which runs in Javascript, so that last-minute changes can be made to the presentation which will show on reload, rather than requiring a rebuild.

Move my presentations into a separate repository.  Just keep one simple example presentation here.

Make a github.io page so we can actually demonstrate the result.

