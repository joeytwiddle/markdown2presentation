window.Slider = {

     allSlides: null,
  currentSlide: null,

  init: function() {
    Slider.allSlides.hide();
    Slider.currentSlide.show();
  },

  // These two don't really need to be exposed

  slideRight: function() {
    var nextSlide = Slider.currentSlide.next();
    if (nextSlide.length) {
      Slider.animateSlideNext(Slider.currentSlide,nextSlide);
      Slider.currentSlide = nextSlide;
    }
  },

  slideLeft: function () {
    var prevSlide = Slider.currentSlide.prev();
    if (prevSlide.length) {
      Slider.animateSlidePrev(Slider.currentSlide,prevSlide);
      Slider.currentSlide = prevSlide;
    }
  },

  // These two are meant to be overridden

  animateSlideNext: function(currentSlide,nextSlide) {
    nextSlide.show();
    currentSlide.hide();
  },

  animateSlidePrev: function(currentSlide,prevSlide) {
    prevSlide.show();
    currentSlide.hide();
  }

};

$(document).ready(function() {

  Slider.allSlides = $(".slide");
  Slider.currentSlide = Slider.allSlides.first();

  Slider.init();

  $("body").keydown(function(event){
    //console.log("keypress event:",event);
    if (event.keyCode == 39) {
      event.preventDefault();
      Slider.slideRight();
    } else if (event.keyCode == 37) {
      event.preventDefault();
      Slider.slideLeft();
    }
  });

});
