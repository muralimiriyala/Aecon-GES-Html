
jQuery(document).ready(function($){
    const header = $(".header-main");
    const banner = $("body.home .banner-section");
    if(banner.length){
        header.addClass("no_sticky");
        const bannerHeight = banner.offset().top + banner.outerHeight(true);
        window.onscroll = function(){
            const _scroll = window.scrollY;
            _scroll >= bannerHeight ? header.removeClass("no_sticky") : header.addClass("no_sticky");
        }
    }
    const contact_btn = $(".contact_btn");
    contact_btn.on("click", function(e){
        e.preventDefault();
        $(this).toggleClass("open");
        $(".contact_btn_menu").slideToggle(900);
    });
    $("body").on("click", function(e){
        if(!$(e.target).closest(".contact_btn, .contact_btn_wrap").length){
            $(".contact_btn_menu").slideUp();
        }
    });
    
    const getQuotebtn = $(".get_quote_btn > a");
    getQuotebtn.on("click", (e)=>{
        e.preventDefault();
        contact_btn.removeClass("open");
        $(".flyout-blue-overlay").addClass("open");
        $(".contact_btn_menu").slideUp(900);
        $(".flyout-form-overlay").addClass("open");
    });
    const flyoutFormclose = $(".flyout-form-close");
    flyoutFormclose.on("click", (e)=>{
        e.preventDefault();
        $(".flyout-blue-overlay").removeClass("open");
        $(".flyout-form-overlay").removeClass("open");
    });

    const humburgerbtn = $(".humburger-btn");
    humburgerbtn.on("click", (e)=>{
        e.preventDefault();
        humburgerbtn.toggleClass("open");
        contact_btn.removeClass("open");
        $(".flyout-blue-overlay").toggleClass("open");
        $("body").toggleClass("nav-overlay-open");
        $(".contact_btn_menu").slideUp(900);
        $(".flyout-overlay").toggleClass("open");
    });
    const flyoutclose = $(".flyout-close");
    flyoutclose.on("click", (e)=>{
        e.preventDefault();
        humburgerbtn.removeClass("open");
        $(".flyout-blue-overlay").removeClass("open");
        $(".flyout-overlay").removeClass("open");
    });
    $("body").on("click", function(e){
        if(!$(e.target).closest(".humburger-btn, .flyout-overlay, .get_quote_btn, .flyout-form-overlay").length){
            humburgerbtn.removeClass("open");
            $(".flyout-blue-overlay").removeClass("open");
            $(".flyout-overlay").removeClass("open");
            $(".flyout-form-overlay").removeClass("open");
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

        let text = $(this).text();
        $(".partners-mobile-span").text(text);
        let html = $(this).find(".partners-tab-icon").html();
        $(".all-partners-icon").html(html);
        $("ul.about-partners-tabs").removeClass("open");
    });

    $(".partners-mobile-btn").on("click", function(e){
        e.preventDefault();
        $("ul.about-partners-tabs").toggleClass("open");
    });
    
    $("ul.our-approach-links li:first-child").addClass("open-approach");
    $(".our-approach-image:first-child").addClass("open");
    const approachLinks = $(".our-approach-link");
    approachLinks.on("click", function(e){
        e.preventDefault();
        const _self = $(this);
        _self.parent().siblings("li").find("a").removeClass("active");
        _self.addClass("active");
        const tabAttr = $(this).attr("data-link");
        $(".our-approach-image").removeClass("open");
        $(".our-approach-image[data-value="+ tabAttr +"]").addClass("open");

        // $(".our-approach-thumb").fadeIn().addClass("red");

        _self.parent().siblings().removeClass("open-approach");
        _self.parent().siblings().find(".our-approach-mobile").slideUp(900);
        _self.siblings(".our-approach-mobile").slideToggle(900);
    });


    const faqtablink = $("ul.faq-tabs li a");
    $("ul.faq-tabs li:first-child a").addClass("active");
    tabValue = $(".partners-tab-content").attr("data-tab-value");

    faqtablink.on("click", function(e){
        e.preventDefault();
        $(this).addClass("active");
        $(this).parent().siblings().find("a").removeClass("active");
        const faqtabAttr = $(this).attr("data-name");
        $(".faq-tab-content").hide();
        $(".faq-tab-content[data-value="+ faqtabAttr +"]").fadeIn();
        let text = $(this).text();
        $(".faqs-mobile-span").text(text);
        let html = $(this).find(".faq-tabs-icon").html();
        $(".faqs-mobile-icon").html(html);
        $("ul.faq-tabs").removeClass("open");
    });

    
    $(".faqs-mobile-btn").on("click", function(e){
        e.preventDefault();
        $("ul.faq-tabs").toggleClass("open");
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

    $(".leaderships-mask").hover(
        function () {
            $(this).removeClass('out').addClass('over');
        },
        function () {
            $(this).removeClass('over').addClass('out');
        }
    );

});