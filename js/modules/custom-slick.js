

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
      });
      const timeline = $(".timeline-slider");
      timeline.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<div class="slick-arrow slick-prev button btn-green flex flex-center"><span class="fa-regular fa-arrow-left"></span></div>',
        nextArrow: '<div class="slick-arrow slick-next button btn-green flex flex-center"><span class="fa-regular fa-arrow-right"></span></div>',
        dots: false,
        infinite: false,
        speed: 1000,
        variableWidth: true
      });
      $(".timeline-slide").removeAttr("style");
});