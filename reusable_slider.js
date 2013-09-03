$(document).ready(function() {

  // There is a good reason we don't put these in init().
  // Because sooner or later (sooner) someone (me) will override init() without calling super.
  Slider.allSlides = $(".slide");
  Slider.currentSlide = Slider.allSlides.first();

  // Slider.autoFocus will put keyboard focus onto each slide when it comes into view.  This is very useful if some slides have a scrollbar; by focusing it the user can scroll that slide with the mouse.  It will be less desirable if you have other elements in the presentation that you want to focus.
  // TODO: Make configurable, or move to 'AdvancedSlider'.  Hmm well I suppose it is configurable; it can be overriden by extending init, or after this .ready() is called.
  Slider.autoFocus = true;

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
    var nextSlide = this.currentSlide.next(".slide");
    if (nextSlide.length) {
      this.animateSlideNext(this.currentSlide,nextSlide);
      this.currentSlide = nextSlide;
      if (this.autoFocus) {
        // Giving the <div> a tabindex makes it focusable
        this.currentSlide.attr("tabindex",0).focus();
      }
    }
  },

  slideLeft: function () {
    var prevSlide = this.currentSlide.prev(".slide");
    if (prevSlide.length) {
      this.animateSlidePrev(this.currentSlide,prevSlide);
      this.currentSlide = prevSlide;
      if (this.autoFocus) {
        this.currentSlide.attr("tabindex",0).focus();
      }
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
