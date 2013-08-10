// Replace all large 'code' elements with 'pre' elements because they render better.
// Note that we don't want to catch 'code' element in the middle of a sentence.  :S
$("p > code").each(function(){
  var old = $(this);
  var better = $("<pre>").text(old.text());
  old.replaceWith(better);
});
