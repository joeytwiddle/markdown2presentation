// Group everything between each <h1> into a slide.
$("h1").each(function(){
  var header = $(this);
  var contents = header.nextUntil("h1").addBack(header);
  var newContent = $("<div>").addClass("slide");
  header.replaceWith(newContent);
  newContent.append(contents);
});
