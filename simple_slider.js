(function(){

  var allSlides = $(".slide");
  var currentSlide = allSlides.first();
  allSlides.hide();
  currentSlide.show();

  $("body").keydown(function(event){
    //console.log("keypress event:",event);
    if (event.keyCode == 39) {
      event.preventDefault();
      slideRight();
    } else if (event.keyCode == 37) {
      event.preventDefault();
      slideLeft();
    }
  });

  function slideRight() {
    var nextSlide = currentSlide.next();
    if (nextSlide.length) {
      nextSlide.show();
      currentSlide.hide();
      currentSlide = nextSlide;
    }
  }

  function slideLeft() {
    var prevSlide = currentSlide.prev();
    if (prevSlide.length) {
      prevSlide.show();
      currentSlide.hide();
      currentSlide = prevSlide;
    }
  }

})();
