
jQuery(document).ready(function($){
    const header = document.querySelector(".header-main");
    const banner = document.querySelector("body.home .banner-section");
    if(banner){
        const bannerHeight = banner.offsetTop + banner.clientHeight;
        window.onscroll = function(){
            const _scroll = window.scrollY;
            console.log(_scroll, bannerHeight)
            if (_scroll > bannerHeight) {
               header.classList.add("fixed-header");
            }
            else{
               header.classList.remove("fixed-header");
    
            }
        }
    }
    const contact_btn = $(".contact_btn");
    contact_btn.on("click", function(e){
        e.preventDefault();
        $(this).toggleClass("open");
        $(".contact_btn_menu").fadeToggle(900);
    });
    const humburgerbtn = $(".humburger-btn");
    humburgerbtn.on("click", (e)=>{
        e.preventDefault();
        contact_btn.removeClass("open");
        $(".contact_btn_menu").fadeOut(900);
        $(".flyout-overlay").addClass("open");
    });
    const flyoutclose = $(".flyout-close");
    flyoutclose.on("click", (e)=>{
        e.preventDefault();
        $(".flyout-overlay").removeClass("open");
    });
    $("body").on("click", function(e){
        if(!$(e.target).closest(".humburger-btn, .flyout-overlay").length){
            $(".flyout-overlay").removeClass("open");
        }
    });


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

    $("ul.our-approach-links li:first-child a").addClass("active");
    const approachLinks = $("ul.our-approach-links li a");
    approachLinks.on("click", function(e){
        e.preventDefault();
        const _self = $(this);
        _self.parent().siblings("li").find("a").removeClass("active");
        _self.addClass("active");
        const tabAttr = $(this).attr("data-link");
        $(".our-approach-image").hide();
        $(".our-approach-image[data-value="+ tabAttr +"]").fadeIn();
    });




    if($(window).width() <= 1023){
        let level1 = $("ul.flyout-menu > li.menu-item-has-children > a");
        level1.on("click", function(e){
            e.preventDefault();
            $(this).parent("li").siblings().children("a").removeClass("active");
            $(this).toggleClass("active");
            $(this).parent("li").siblings().children("ul").slideUp(900);
            $(this).siblings("ul").slideToggle(900);
        });
    }

});