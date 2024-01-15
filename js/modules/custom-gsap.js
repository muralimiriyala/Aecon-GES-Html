
var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin 
var CountUp = CountUp || window.CountUp 

gsap.registerPlugin(DrawSVGPlugin)

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

// Bar Chart 
// var $drawing = jQuery('.ui-drawing');
var $drawing = jQuery('[data-animation="ui-drawing"]');
console.log("drawing", $drawing)
$drawing.each(function(){
  var $self = jQuery(this);
  var $path = $self.find('path');
  var tl = gsap.timeline({
    paused: true
  })
  tl.fromTo($path, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.5, ease: 'power1.out'})
  $self[0].tl = tl
})

