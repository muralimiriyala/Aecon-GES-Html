

import jQuery from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

jQuery(document).ready(function($){
    const partnerLogoSlider = $(".partner-logos-slider");
    partnerLogoSlider.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        speed: 1000,
      });
});