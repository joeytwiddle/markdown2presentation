$(document).ready(function() {

  var numDots = 50;

  var namespace = "http://www.w3.org/2000/svg";

  //var $dotsContainer = $(document.createElementNS(namespace,"svg"));
  var $dotsContainer = $("<div>");
  //$dotsContainer.attr('id','dots');
  //$dotsContainer.addClass('dots-container');
  //$dotsContainer.css({
    //"transform-style": "preserve-3d"
  //})

  var dotSize = window.innerWidth / 250 * 5;

  var dotsData = [];

  for (var i=0;i<numDots;i++) {

    var dotX = window.innerWidth * (Math.random() - 0.5);
    var dotY = 0; // window.innerHeight * (Math.random() - 0.5);
    var depth = Math.random();
    var dotZ = window.innerWidth * (depth - 0.5);
    var hue = 360 * depth;

    var $circle = $(document.createElementNS(namespace,"circle"))
    .attr("cx",dotSize/2)
    .attr("cy",dotSize/2)
    .attr("r",dotSize/2);
    //var $dot = $("<div>(O)</div>");
    var $dot = $("<div>");
    var $dotSVG = $(document.createElementNS(namespace,"svg"))
      .width(dotSize)
      .height(dotSize);
    $dotSVG.append($circle);
    $dot.append($dotSVG);

    $dot.css({
      //transform: 'translateX('+dotX+'px) translateY('+dotY+'px) translateZ('+dotZ+'px)'
      //transform: 'translateZ('+dotZ+'px)',
      //"transform-style": "preserve-3d"
    });

    //var hue = 360 * Math.random() | 0;
    $dot.css({
      fill: 'hsla('+hue+',100%,70%,0.5)'
    });

    var dotData = {
      $dot: $dot,
      dotX: dotX,
      dotY: dotY,
      dotZ: dotZ
    };
    dotsData.push(dotData);

    $dotsContainer.append($dot);
  }

  $('#dots').append($dotsContainer);
  //$('body').append($dotsContainer);
  $("body").append("#dots");

  //var $allDots = $dotsContainer.find('circle');

  var currentRotation = 0;

  var super_animateSlideNext = Slider.animateSlideNext;
  Slider.animateSlideNext = function() {
    super_animateSlideNext.apply(this, arguments);
    currentRotation += 90;
    transformTheDots();
  };

  var super_animateSlidePrev = Slider.animateSlidePrev;
  Slider.animateSlidePrev = function() {
    super_animateSlidePrev.apply(this, arguments);
    currentRotation -= 90;
    transformTheDots();
  };

  function transformTheDots() {
    var fiftyPercent = Math.round(window.innerWidth / 2) + 'px';
    var halfWidth = Math.round(window.innerWidth / 2) + 'px';
    var halfHeight = Math.round(window.innerHeight / 2) + 'px';
    dotsData.forEach(function(dotData){
      var $dot = dotData.$dot;
      $dot.css({
        transform: 'translate3D('+halfWidth+','+0+'px,-'+fiftyPercent+') rotateY('+(-currentRotation)+'deg) translate3D('+(dotData.dotX)+'px,'+(dotData.dotY)+'px,'+(dotData.dotZ)+'px) rotateY('+(currentRotation)+'deg)',
        transition: 'all 1s'
      });
    });
    /*
    $("#dots").css({
        transform: 'translateZ(-'+fiftyPercent+') rotateY('+currentRotation+'deg) translateZ(+'+fiftyPercent+') rotateY('+(-currentRotation)+'deg)',
      transition: 'all 1s'
    });
    */
  }

  transformTheDots();

});
