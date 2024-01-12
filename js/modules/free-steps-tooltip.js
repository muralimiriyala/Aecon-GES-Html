

jQuery(function($){
    const _selffImage = $(".free-steps-thumb");
    const _tooltip = $(".tooltip-main");
    const _selfOffset = _selffImage.offset();
    _selffImage.on("mouseenter mousemove", function(e){
        _tooltip.fadeIn();
        let mouseY = e.pageY - _selfOffset.top;
        let mouseX = e.pageX - _selfOffset.left;
        _tooltip.css({
            "top": mouseY,
            "left": mouseX,
        })
    }).on("mouseleave", function(){
        _tooltip.fadeOut();
    })
});
