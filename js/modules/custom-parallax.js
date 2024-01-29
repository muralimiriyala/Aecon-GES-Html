
document.addEventListener("DOMContentLoaded", function(){
    var parallaxImage = document.querySelectorAll('.parallax-image img');
    if(parallaxImage){
        parallaxImage.forEach(function(image){
            new simpleParallax(image, {
                scale: 1.1,
                delay: 0.2,
                transition: 'cubic-bezier(0, 0, 0, 0.5)',
            });
        })
    }
});
