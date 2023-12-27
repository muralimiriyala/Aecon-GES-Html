
jQuery(document).ready(function($){
    // const header = $(".header-main");
    // const headerheight = header.clientHeight;
    // const banner = $(".banner-section");
    // if(banner){
    //     const bannerHeight = banner.offsetTop + banner.clientHeight;
    //     window.onscroll = function(){
    //         const _scroll = window.scrollY;
    //         console.log(_scroll, bannerHeight)
    //         if (_scroll > bannerHeight) {
    //            header.classList.add("fixed-header");
    //         }
    //         else{
    //            header.classList.remove("fixed-header");
    
    //         }
    //     }
    // }

    $('.accordion-header').on('click', function(e){
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().removeClass('active');
        $(this).parent().siblings().find('.accordion-header').removeClass('open');
        $(this).toggleClass("open");
        $(this).siblings('.accordion-content').slideToggle(500);
        $(this).parent().siblings().find('.accordion-content').slideUp(500);
    });

    const tablink = $("ul.about-partners-tabs li a");
    const tablinkFirst = $("ul.about-partners-tabs li:first-child a");
    tablinkFirst.addClass("active");
    tabValue = $(".partners-tab-content").attr("data-tab-value");

    tablink.on("click", function(e){
        e.preventDefault();
        $(this).addClass("active");
        $(this).parent().siblings().find("a").removeClass("active");
        const tabAttr = $(this).attr("data-tab-name");
        $(".partners-tab-content").hide();
        $(".partners-tab-content[data-tab-value="+ tabAttr +"]").fadeIn();
    });


});