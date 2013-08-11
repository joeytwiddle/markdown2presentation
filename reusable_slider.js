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

window.Slider = {

  init: function() {
    this.allSlides.hide();
    this.currentSlide.show();
  },

  // These two don't really need to be exposed

  slideRight: function() {
    var nextSlide = this.currentSlide.next();
    if (nextSlide.length) {
      this.animateSlideNext(this.currentSlide,nextSlide);
      this.currentSlide = nextSlide;
    }
  },

  slideLeft: function () {
    var prevSlide = this.currentSlide.prev();
    if (prevSlide.length) {
      this.animateSlidePrev(this.currentSlide,prevSlide);
      this.currentSlide = prevSlide;
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
