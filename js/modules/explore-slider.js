jQuery(document).ready(function ($) {
  const exploreLink = $('.explore-icons-list')
  $('.explore-icons-list:first').addClass('active')
  exploreLink.on('click', function (e) {
    e.preventDefault()
    _self = $(this)
    _self.addClass('active')
    _self.siblings().removeClass('active')

    const exploreName = _self.data('name')
    $('.explore-slider-text[data-text=' + exploreName + ']').addClass('active')
    $('.explore-slider-image').hide()
    $('.explore-slider-image[data-value=' + exploreName + ']').fadeIn(800)
    $('.explore-slider-text').hide()
    $('.explore-slider-text[data-text=' + exploreName + ']').fadeIn(100)
  })
})
