

import jQuery from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

jQuery(function($){
    const freeStepSlider = $(".free-steps-slider");
    freeStepSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '<div class="slick-arrow slick-prev step-slick-arrow flex flex-center"><i class="fa-solid fa-arrow-left"></i></div>',
      nextArrow: '<div class="slick-arrow slick-next step-slick-arrow flex flex-center"><i class="fa-solid fa-arrow-right"></i></div>',
      dots: false,
    });
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

    
      const psliderFor = $(".process-slider-for");
      const psliderNav = $(".process-slider-nav");

      if($(window).width() >= 1024){
          psliderFor.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            cssEase: 'ease',
            arrows: false,
            dots: true,
            appendDots: $("<div class='process-slider-nav'></div>"),
          });
          // Set initial class for the first dot
          $('.p-slick-dot[data-slide="0"]').addClass('slick-current slick-first-slide');
          psliderFor.on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $('.p-slick-dot').removeClass('slick-current');
            $('.p-slick-dot[data-slide="' + currentSlide + '"]').addClass('slick-current');
          });
          $('[data-slide]').on("click", function(e){
            e.preventDefault();
            var slideno = $(this).data('slide');
            psliderFor.slick('slickGoTo', slideno);
          });

          $('.p-slick-arrow').on("click", function(e){
            e.preventDefault();
            const currentSlide = psliderFor.slick('slickCurrentSlide');
            const totalSlides = psliderFor.slick('getSlick').slideCount - 1;
            if ($(this).hasClass('p-slick-next')) {
              const nextSlide = currentSlide + 1;
              if (nextSlide <= totalSlides) {
                psliderFor.slick('slickGoTo', nextSlide);
                $(this).closest('.p-slick-dot').next(".p-slick-dot").find(".process-slider-content").addClass("moveRightSlide").removeClass("moveLeftSlide");
                if (nextSlide === totalSlides) {
                  $(this).closest('.p-slick-dot').next(".p-slick-dot").addClass('slick-last-slide');
                }
              }
            } else if ($(this).hasClass('p-slick-prev')) {
              const prevSlide = currentSlide - 1;
              if (prevSlide >= 0) {
                psliderFor.slick('slickGoTo', prevSlide);
                $(this).closest('.p-slick-dot').prev(".p-slick-dot").find(".process-slider-content").addClass("moveLeftSlide").removeClass("moveRightSlide");

                if (prevSlide === 0) {
                  $(this).closest('.p-slick-dot').prev(".p-slick-dot").addClass('slick-first-slide');
                }
              }
            }
          });
      }
      else{
          psliderFor.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            cssEase: 'ease',
            arrows: false,
            dots: false,
            swipeToSlide: true,
            focusOnSelect: true,
            asNavFor: psliderNav
          });
          psliderNav.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1500,
            swipeToSlide: true,
            focusOnSelect: true,
            dots: false,
            arrows: true,
            prevArrow: '<div class="slick-arrow slick-prev button btn-green flex flex-center"><span class="fa-regular fa-arrow-left"></span></div>',
            nextArrow: '<div class="slick-arrow slick-next button btn-green flex flex-center"><span class="fa-regular fa-arrow-right"></span></div>',
            asNavFor: psliderFor,
            responsive: [
              {
              breakpoint: 739,
                  settings: {
                    dots: true,
                  }
              }
            ]
          });  
      }
      
});


