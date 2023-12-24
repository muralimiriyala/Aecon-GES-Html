
document.addEventListener("DOMContentLoaded", () =>{
    const header = document.querySelector(".header-main");
    const headerheight = header.clientHeight;
    const banner = document.querySelector(".banner-section");
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


    $('.accordion-header').on('click', function(e){
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().removeClass('active');
        $(this).parent().siblings().find('.accordion-header').removeClass('open');
        $(this).toggleClass("open");
        $(this).siblings('.accordion-content').slideToggle(500);
        $(this).parent().siblings().find('.accordion-content').slideUp(500);
    });

});