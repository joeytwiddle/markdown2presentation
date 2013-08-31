// Replace all large 'code' elements with 'pre' elements because they render better with the particular markdown I am using.
$("p > code").each(function(){
  var old = $(this);
  // Note that we don't want to act on any 'code' element in the middle of a sentence (alongside text elements).  We only want those which sit on their own.
  if (old.parent()[0].childNodes.length == 1) {
    var better = $("<pre>").text(old.text());
    old.replaceWith(better);
  }
});
