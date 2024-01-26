
jQuery(document).ready(function($){
    const freeStepSlider = $(".free-steps-slider");
    freeStepSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 1500,
      arrows: true,
      prevArrow: '<div class="slick-arrow slick-prev step-slick-arrow flex flex-center"><span class="fa-solid fa-arrow-left"></span></div>',
      nextArrow: '<div class="slick-arrow slick-next step-slick-arrow flex flex-center"><span class="fa-solid fa-arrow-right"></span></div>',
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
            breakpoint: 1299,
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
});