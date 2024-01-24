
document.addEventListener("DOMContentLoaded", function(){
    var parallaxImage = document.querySelectorAll('.parallax-image img');
    parallaxImage.forEach(function(image){
        new simpleParallax(image, {
            scale: 1.2,
            delay: 1,
            transition: 'cubic-bezier(0,0,0,1)',
        });
    })
});