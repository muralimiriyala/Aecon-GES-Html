

import jQuery from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

jQuery(document).ready(function($){
    const partnerLogoSlider = $(".partner-logos-slider");
    partnerLogoSlider.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<div class="slick-arrow slick-prev button btn-green flex flex-center"><span class="fa-regular fa-arrow-left"></span></div>',
        nextArrow: '<div class="slick-arrow slick-next button btn-green flex flex-center"><span class="fa-regular fa-arrow-right"></span></div>',
        dots: false,
        infinite: false,
        speed: 1000,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1299,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
            },
          {
            breakpoint: 1023,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                }
            },
          {
          breakpoint: 739,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
              }
          }
        ]
      });

      $(".partner-logos-slide").removeAttr("style");

      const timeline = $(".timeline-slider");
      timeline.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<div class="slick-arrow slick-prev button btn-green flex flex-center"><span class="fa-regular fa-arrow-left"></span></div>',
        nextArrow: '<div class="slick-arrow slick-next button btn-green flex flex-center"><span class="fa-regular fa-arrow-right"></span></div>',
        dots: false,
        infinite: false,
        speed: 1000,
        variableWidth: true,
        swipeToSlide: true,
        touchThreshold: 200,
        responsive: [
          {
            breakpoint: 1023,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                }
            },
          {
          breakpoint: 739,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
              }
          }
        ]
      });
      $(".timeline-slide").removeAttr("style");

      const psliderNav = $(".process-slider-nav");
      const psliderFor = $(".process-slider-for");
      psliderFor.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'ease',
        arrows: false,
        dots: true,
        appendDots: $("<div class='slick-dots-wrap'></div>"),
      });

      // Set initial class for the first dot
      $('.p-slick-dot[data-slide="0"]').addClass('slick-current');
      psliderFor.on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $('.p-slick-dot').removeClass('slick-current');
        $('.p-slick-dot[data-slide="' + currentSlide + '"]').addClass('slick-current');
      });

      
      $('[data-slide]').click(function(e) {
        e.preventDefault();
        var slideno = $(this).data('slide');
        psliderFor.slick('slickGoTo', slideno);
      });

      $('.p-slick-arrow').click(function(e) {
        e.preventDefault();
        var slideno = $(this).parent().data('slide');
        psliderFor.slick('slickGoTo', slideno);
      });

});