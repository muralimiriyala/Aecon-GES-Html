
document.addEventListener("DOMContentLoaded", () =>{
    const header = document.querySelector(".header-main");
    const headerheight = header.clientHeight;
    const banner = document.querySelector(".banner-section");
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
});