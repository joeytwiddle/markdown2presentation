
var fiftyPercent = Math.round(window.innerWidth / 2) + 'px';

var pointingRight = 'translateZ(-'+fiftyPercent+') rotateY(+90deg) translateZ(+'+fiftyPercent+')';
var  pointingLeft = 'translateZ(-'+fiftyPercent+') rotateY(-90deg) translateZ(+'+fiftyPercent+')';
var pointingFront = 'translateZ(-'+fiftyPercent+') rotateY(0deg) translateZ(+'+fiftyPercent+')';

var superInit = Slider.init;
Slider.init = function() {
  superInit();
  //Slider.allSlides.show();
  Slider.allSlides.css({
    transform: pointingRight,
    transition: 'all 0s'
  });
  Slider.currentSlide.css({
    transform: pointingFront,
    transition: 'all 0s'
  });
  //setTimeout(function() {
    //Slider.allSlides.hide();
  //},10);
};

Slider.animateSlideNext = function(currentSlide, nextSlide) {

  //nextSlide.show();

  /*
  nextSlide.css({
    transform: pointingRight,
    transition: 'all 0s'
  });
  */

  setTimeout(function(){
    currentSlide.css({
      transform: pointingLeft,
      transition: 'all 1s'
    });
    nextSlide.css({
      transform: pointingFront,
      transition: 'all 1s'
    });
    setTimeout(function(){
      currentSlide.hide();
    },1000);
  },10);

};

Slider.animateSlidePrev = function(currentSlide, prevSlide) {

  setTimeout(function(){
    currentSlide.css({
      transform: pointingRight,
      transition: 'all 1s'
    });
    prevSlide.css({
      transform: pointingFront,
      transition: 'all 1s'
    });
    setTimeout(function(){
      currentSlide.hide();
    },1000);
  },10);

};


