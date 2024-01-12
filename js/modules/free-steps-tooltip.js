

jQuery(function($){
    const _selffImage = $(".free-steps-thumb");
    const _tooltip = $(".tooltip-main");
    _selffImage.on("mouseenter mousemove", function(e){
        _tooltip.fadeIn();
        _tooltipHeight = _tooltip.outerHeight(true);
        _tooltipWidth = _tooltip.width();

        let _selfOffset = _selffImage.offset();
        let mouseY = e.pageY - _selfOffset.top;
        let mouseX = e.pageX - _selfOffset.left;
        _tooltip.css({
            "top": mouseY -  180,
            "left": mouseX - 104,
        })
    })
    _selffImage.on("mouseleave", function(){
        _tooltip.fadeOut();
    })
    _tooltip.on("mouseenter", function(){
        _tooltip.stop(true, true).show();
    });

});
