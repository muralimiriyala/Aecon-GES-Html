jQuery(document).ready(function ($) {
  $('ul.our-approach-links li:first-child').addClass('open-approach');
  const approachLinks = $('.our-approach-link');

  approachLinks.on('click', function (e) {
    e.preventDefault();
    const _self = $(this);
    _self.parent().siblings('li').find('a').removeClass('active');
    _self.addClass('active');

    const section = _self.closest('.our-approach-main'); 
    var index = $('.our-approach-link').index(this);
    section.find('.approach-slider-for').slick('slickGoTo', index);

    _self.parent().siblings().removeClass('open-approach');
    _self.parent().siblings().find('.our-approach-mobile').slideUp(900);
    _self.siblings('.our-approach-mobile').slideToggle(900);
  });

  $('.approach-slider-for').slick({
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    fade: true,
    asNavFor: '.approach-slider-nav',
  });

  $('.approach-slider-nav').slick({
    slidesToShow: 1,
    adaptiveHeight: true,
    fade: true,
    arrows: false,
    asNavFor: '.approach-slider-for',
  });

});