
var fiftyPercent = Math.round(window.innerWidth / 2) + 'px';

var pointingRight = 'translateZ(-'+fiftyPercent+') rotateY(+90deg) translateZ(+'+fiftyPercent+')';
var  pointingLeft = 'translateZ(-'+fiftyPercent+') rotateY(-90deg) translateZ(+'+fiftyPercent+')';
var pointingFront = 'translateZ(-'+fiftyPercent+') rotateY(0deg) translateZ(+'+fiftyPercent+')';

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


