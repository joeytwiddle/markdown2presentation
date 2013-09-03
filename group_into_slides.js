// Group everything between each <h1> into a slide.
$("h1").each(function(){
  var header = $(this);
  var contents = header.nextUntil("h1").addBack(header);
  var slideContainer = $("<div>").addClass("slide");
  var slideContents = $("<div>").addClass("slide-content");
  header.replaceWith(slideContainer);
  slideContainer.append(slideContents);
  slideContents.append(contents);
});

// If there were any gaps in our markdown, e.g. to introduce <style> or <script> tags, these may have been converted into <p>s with no content.  It seems neater to hide them (even though we cannot see them anyway).
$(document).ready(function() {
  $(".container > p").hide();
});

