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
  var divSize = 2*Math.ceil(dotSize/2);

  var dotsData = [];

  for (var i=0;i<numDots;i++) {

    //var maxRadius = (window.innerWidth/2) * 80/100;
    var maxRadius = (window.innerWidth/2) * 1.0;
    // Make a random vector
    var dotX = (Math.random() - 0.5);
    var dotY = (Math.random() - 0.5);
    var dotZ = (Math.random() - 0.5);
    // Normalise it:
    var mag = Math.sqrt(dotX*dotX + dotY*dotY + dotZ*dotZ);
    dotX /= mag;  dotY /= mag;  dotZ /= mag;
    // Scale it up
    var radius = Math.pow(Math.random(), 1/3) * maxRadius;
    dotX *= radius;  dotY *= radius;  dotZ *= radius;
    var hue = 360 * Math.random();

    var $circle = $(document.createElementNS(namespace,"circle"))
    .attr("cx",dotSize/2)
    .attr("cy",dotSize/2)
    .attr("r",dotSize/2);
    //var $dot = $("<div>(O)</div>");
    var $dot = $("<div>");
    var $dotSVG = $(document.createElementNS(namespace,"svg"))
      .width(divSize)
      .height(divSize);
    $dotSVG.append($circle);
    $dot.append($dotSVG);

    $dot.css({
      //transform: 'translateX('+dotX+'px) translateY('+dotY+'px) translateZ('+dotZ+'px)'
      //transform: 'translateZ('+dotZ+'px)',
      //"transform-style": "preserve-3d"
      position: "fixed",
      left: (-divSize/2)+'px',
      top: (-divSize/2)+'px'
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
  // If we move #dots outside the content, the dots always appear in front of the slides (in Chrome)
  // TODO: However, if we don't move #dots into the body, then they expand the scroll area in Firefox!
  //$("body").append($("#dots"));

  //var $allDots = $dotsContainer.find('circle');

  var currentRotation = 0;

  var super_animateSlideNext = Slider.animateSlideNext;
  Slider.animateSlideNext = function(fromSlide, toSlide) {
    super_animateSlideNext.apply(this, arguments);
    currentRotation += 90;
    transformTheDots(toSlide);
  };

  var super_animateSlidePrev = Slider.animateSlidePrev;
  Slider.animateSlidePrev = function(fromSlide, toSlide) {
    super_animateSlidePrev.apply(this, arguments);
    currentRotation -= 90;
    transformTheDots(toSlide);
  };

  function transformTheDots(toSlide) {
    var fiftyPercent = Math.round(window.innerWidth / 2) + 'px';
    var halfWidth = Math.round(window.innerWidth / 2) + 'px';
    var halfHeight = Math.round(window.innerHeight / 2) + 'px';
    toSlide = toSlide || Slider.currentSlide;
    var thru = Slider.allSlides.index(toSlide) / Slider.allSlides.length;
    console.log(Slider.allSlides.index(toSlide), Slider.allSlides.length);
    //var scale = 1.0 + 2.0 * thru;
    var scale = 0.2 + 2.8 * thru;
    dotsData.forEach(function(dotData){
      var $dot = dotData.$dot;
      $dot.css({
        transform:
            'translate3D('+halfWidth+','+halfHeight+',-'+fiftyPercent+')'
          + 'scale('+scale+')'
          + 'rotateY('+(-currentRotation)+'deg)'
          + 'translate3D('+(dotData.dotX)+'px,'+(dotData.dotY)+'px,'+(dotData.dotZ)+'px)'
          + 'rotateY('+(currentRotation)+'deg)',
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
