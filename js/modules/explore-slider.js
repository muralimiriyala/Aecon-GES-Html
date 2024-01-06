
jQuery(document).ready(function($){
    const exploreLink = $(".explore-icons-list");
    exploreLink.on("click", function(e){
        e.preventDefault();
        _self = $(this);
        _self.addClass("active");
        _self.siblings().removeClass("active");
        const exploreName = _self.data("name");
        $(".explore-slider-image").hide();
        $(".explore-slider-image[data-value="+ exploreName +"]").fadeIn();
        $(".explore-slider-text").hide();
        $(".explore-slider-text[data-text="+ exploreName +"]").fadeIn();
    });
});