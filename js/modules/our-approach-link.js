

jQuery(document).ready(function($){
  var _windowWidth = $(window).width();
  $("ul.our-approach-links li:first-child").addClass("open-approach");
    const approachLinks = $(".our-approach-link");
    approachLinks.on("click", function(e){
        e.preventDefault();
        const _self = $(this);
        _self.parent().siblings("li").find("a").removeClass("active");
        _self.addClass("active");
         
        // Find the corresponding slick slider index
        var index = $('.our-approach-link').index(this);
        console.log(index)

        // apply index to slide
        $('.approach-slider-for').slick('slickGoTo', index);
    
        _self.parent().siblings().removeClass("open-approach");
        _self.parent().siblings().find(".our-approach-mobile").slideUp(900);
        _self.siblings(".our-approach-mobile").slideToggle(900);
    });

    $('.approach-slider-for').slick({
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        fade: true,
        asNavFor: '.approach-slider-nav',
      });
      
      function introSlider() {
          if (_windowWidth >= 1024) {
          $('.approach-slider-nav').slick({
          slidesToShow: 1,
          adaptiveHeight: true,
          fade: true,
          arrows: false,
          asNavFor: '.approach-slider-for',
        });
      }
      else{
        if ($('.approach-slider-nav').hasClass('slick-initialized')) {
          $('.approach-slider-nav').slick('unslick');
        }
      }
    }
    introSlider();

    });