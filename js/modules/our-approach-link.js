jQuery(document).ready(function ($) {
  $('.our-approach-links li:first-child').addClass('open-approach')
  $('.our-approach-links li:first-child a').addClass('active')
  $('.our-approach-main').each(function () {
    const section = $(this)
    const approachLinks = section.find('.our-approach-link')

    approachLinks.on('click', function (e) {
      e.preventDefault()
      const _self = $(this)
      _self.parent().siblings('li').find('a').removeClass('active')
      _self.toggleClass('active')

      var index = approachLinks.index(this)
      section.find('.approach-slider-for').slick('slickGoTo', index)

      _self.parent().siblings().removeClass('open-approach')
      _self.parent().siblings().find('.our-approach-mobile').slideUp(900)
      _self.siblings('.our-approach-mobile').slideToggle(900)
    })

    // Initialize sliders for each section
    section.find('.approach-slider-for').slick({
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: false,
      fade: true,
      asNavFor: section.find('.approach-slider-nav'),
    })

    section.find('.approach-slider-nav').slick({
      slidesToShow: 1,
      adaptiveHeight: true,
      fade: true,
      arrows: false,
      asNavFor: section.find('.approach-slider-for'),
    })
  })
})
