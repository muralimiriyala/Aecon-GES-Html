jQuery(document).ready(function($){

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

      psliderFor.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          var directionClass = (nextSlide > currentSlide) ? 'moveRightSlide' : 'moveLeftSlide';
          $('.p-slick-dot[data-slide="' + nextSlide + '"]').find(".process-slider-content").removeClass('moveLeftSlide moveRightSlide');
          $('.p-slick-dot[data-slide="' + nextSlide + '"]').find(".process-slider-content").addClass(directionClass);
      });

      psliderFor.on('afterChange', function (event, slick, currentSlide, slickNext) {
          $('.p-slick-dot').removeClass('slick-current');
          $('.p-slick-dot[data-slide="' + currentSlide + '"]').addClass('slick-current');
          $(".process-num").fadeIn(1000);
          $('.p-slick-dot[data-slide="' + currentSlide + '"]').find(".process-num").fadeOut(1000);
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


            $(this).closest('.p-slick-dot').find(".process-num").fadeIn(2000);
            $(this).closest('.p-slick-dot').next(".p-slick-dot").find(".process-num").fadeOut(1000);

            $(this).closest('.p-slick-dot').next(".p-slick-dot").find(".process-slider-content").addClass("moveRightSlide").removeClass("moveLeftSlide");
            if (nextSlide === totalSlides) {
              $(this).closest('.p-slick-dot').next(".p-slick-dot").addClass('slick-last-slide');
            }
          }
        } else if ($(this).hasClass('p-slick-prev')) {
          const prevSlide = currentSlide - 1;
          if (prevSlide >= 0) {
            psliderFor.slick('slickGoTo', prevSlide);

            $(this).closest('.p-slick-dot').find(".process-num").fadeIn(2000);
            $(this).closest('.p-slick-dot').prev(".p-slick-dot").find(".process-num").fadeOut(1000);
            

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
