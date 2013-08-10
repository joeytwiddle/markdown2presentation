
var fiftyPercent = Math.round(window.innerWidth / 2) + 'px';

var pointingRight = 'translateZ(-'+fiftyPercent+') translate(+50%,0%) rotateY(+90deg) translate(-50%,0%)';
var  pointingLeft = 'translateZ(-'+fiftyPercent+') translate(-50%,0%) rotateY(-90deg) translate(+50%,0%)';
var pointingFront = 'translateZ(0px) translate(0,0%) rotateY(0deg) translate(0,0%)';

var superInit = Slider.init;
Slider.init = function() {
  superInit();
  Slider.allSlides.show();
  Slider.allSlides.css({
    transform: pointingRight,
    transition: 'all 1s'
  });
  setTimeout(function() {
    Slider.allSlides.hide();
  },500);
};

Slider.animateSlideNext = function(currentSlide, nextSlide) {

  currentSlide.css({
    transform: pointingLeft,
    transition: 'all 1s'
  });

  nextSlide.show();

  /*
  nextSlide.css({
    transform: pointingRight,
    transition: 'all 0s'
  });
  */

  setTimeout(function(){
    nextSlide.css({
      transform: pointingFront,
      transition: 'all 1s'
    });
  },10);

  setTimeout(function(){
    currentSlide.hide();
  },1000);

};



