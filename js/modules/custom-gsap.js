var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin
var CountUp = CountUp || window.CountUp

gsap.registerPlugin(DrawSVGPlugin)

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min
}

var $drawing = jQuery('[data-animation="ui-drawing"]')
$drawing.each(function () {
  var $self = jQuery(this)
  var $paths = $self.find('path')
  var tl = gsap.timeline({ paused: true, delay: 0.05 })
  $paths.each(function (i) {
    tl.fromTo(
      jQuery(this)[0],
      { drawSVG: '0%' },
      { drawSVG: '100%', duration: 0.4, ease: 'power1.out' },
    )
  })
  $self[0].tl = tl
})

var $uidot = jQuery('[data-animation="ui-svg-dot"]')
$uidot.each(function () {
  var $self = jQuery(this)
  var $path = $self.find('path')
  var tl = gsap.timeline({ paused: true })
  tl.fromTo(
    $path[0],
    { drawSVG: '0%', opacity: '0' },
    { drawSVG: '100%', opacity: '1', duration: 0.75, ease: 'power1.out' },
  )
  tl.fromTo(
    $path[1],
    { drawSVG: '0%', opacity: '0' },
    { drawSVG: '100%', opacity: '1', duration: 0.5, ease: 'power1.out' },
  )
  $self[0].tl = tl
})
