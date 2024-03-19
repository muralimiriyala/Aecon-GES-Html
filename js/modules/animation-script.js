var $animation_elements = jQuery('[data-animation]');
var $window = jQuery(window);

function check_if_in_view() {
  let window_height = $window.height();
  let window_top_position = $window.scrollTop();
  let window_bottom_position = window_top_position + window_height;
  let viewport_threshold = 0.75; 

  $animation_elements.each(function() {
    const $self = jQuery(this);
    let element_height = $self.outerHeight();
    let element_top_position = $self.offset().top;
    let element_bottom_position = element_top_position + element_height;
    let threshold = element_height * viewport_threshold;

    const animation = $self.data('animation');
    const animateType = $self.data('animate');
    const delay = Number($self.data('animation-delay') || 0);
    const timeline = $self[0].tl


    if ((element_top_position + threshold <= window_bottom_position) && (element_bottom_position >= window_top_position + threshold)) {
      setTimeout(() => {
        if (animateType) _.animateRun($self, animateType);
        else $self.addClass('visible ' + animation);

        jQuery(".ev-charging-anim").each(function() {
          var evchargingAnim = jQuery(this);
      
          if (evchargingAnim.hasClass("visible")) {
              var _cc = evchargingAnim.find("rect.ev-charging-rect");
              var initialY = 260;
      
              _cc.each(function(index) {
                  var $rect = jQuery(this);
                  var currentHeight = parseFloat($rect.attr("height"));
                  var newHeight = currentHeight + 20;
                  var newY = initialY + (index * 30);
      
                  $rect.css({
                      y: newY,
                      height: newHeight,
                  });
              });
          }
      });

      
      jQuery(".hc-anim").each(function() {
        var hcAnim = jQuery(this);

        if (hcAnim.hasClass("visible")) {
          var _dd = jQuery("rect.hc-rect");
          var initialYValues = [102, 130, 158, 186];        
          _dd.each(function (index) {
            var $hcrect = jQuery(this);
            var hccurrentHeight = parseFloat($hcrect.attr("height"));
            var hcnewHeight = hccurrentHeight + 20;
            var hcnewY = initialYValues[index];
        
            $hcrect.css({
              y: hcnewY,
              height: hcnewHeight,
            });
          });
        }
      });

        if (timeline) {
          timeline.play();
        }

      }, delay);      
    } else {      
      // $self.removeClass('visible ' + animation);
      // if(!evchargingAnim.hasClass("visible")){
      //   var _cc = jQuery("rect.ev-charging-rect");
      //   var initialY = 260;
      //   _cc.each(function(index){
      //     var $rect = jQuery(this);
      //     var currentHeight = parseFloat($rect.attr("height"));
      //     var newHeight = currentHeight;
      //     var newY = initialY + (index * 12);
      //     $rect.css({
      //       y: newY,
      //       height: newHeight,
      //     });
      //   });
      // }
      // if(!hcAnim.hasClass("visible")){
      //   var _dd = jQuery("rect.hc-rect");
      //   var hcinitialY = 180;
      //   _dd.each(function(index){
      //     var $hcrect = jQuery(this);
      //     var hccurrentHeight = parseFloat($hcrect.attr("height"));
      //     var hcnewHeight = hccurrentHeight;
      //     var hcnewY = hcinitialY + (index * 8);
      //     $hcrect.css({
      //       y: hcnewY,
      //       height: hcnewHeight,
      //     });
      //   });
      // }

      if (timeline && timeline.progress() > 0) {
        timeline.progress(0);
        timeline.pause();
      }
    }
  });
}
$window.on("scroll load", check_if_in_view);
$window.trigger("scroll");
jQuery(function(){ check_if_in_view(); setTimeout(check_if_in_view, 100); });
