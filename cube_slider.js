
var pointingLeft, pointingRight, pointingFront;

// BUG: OK these values now react when we change the browser size, *but* this only affects new application of the transforms; it doesn't change the existing style settings which have already been applied to elements in the page!
// It might be neater if we made these into actual named CSS rules, and edited those.
// Alternatively on recalc, we could do some css work, like in init().
function recalcTransforms() {
  var fiftyPercent = Math.round(window.innerWidth / 2) + 'px';
  pointingRight = 'translateZ(-'+fiftyPercent+') rotateY(+90deg) translateZ(+'+fiftyPercent+')';
  pointingLeft  = 'translateZ(-'+fiftyPercent+') rotateY(-90deg) translateZ(+'+fiftyPercent+')';
  pointingFront = 'translateZ(-'+fiftyPercent+') rotateY(0deg)   translateZ(+'+fiftyPercent+')';
}
recalcTransforms();
$(window).on('resize',recalcTransforms);

Slider.init = function() {

  Slider.allSlides.css({
    opacity: 0,
    transform: pointingRight,
    transition: 'all 0s'
  });

  Slider.currentSlide.css({
    opacity: 1.0,
    transform: pointingFront,
    transition: 'all 0s'
  });

};

Slider.animateSlideNext = function(currentSlide, nextSlide) {

  currentSlide.css({
    opacity: 0,
    transform: pointingLeft,
    transition: 'all 1s'
  });

  nextSlide.css({
    opacity: 1.0,
    transform: pointingFront,
    transition: 'all 1s'
  });

};

Slider.animateSlidePrev = function(currentSlide, prevSlide) {

  currentSlide.css({
    opacity: 0,
    transform: pointingRight,
    transition: 'all 1s'
  });

  prevSlide.css({
    opacity: 1.0,
    transform: pointingFront,
    transition: 'all 1s'
  });

};


