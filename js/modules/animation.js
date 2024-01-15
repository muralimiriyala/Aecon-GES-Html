var $animation_elements = jQuery('[data-animation]');
var $window = jQuery(window);
var $document = jQuery(document);

function check_if_in_view() {
  let window_height = $window.height();
  let window_top_position = $window.scrollTop();
  let window_bottom_position = window_top_position + window_height;
  let viewport_threshold = 0.15; // Adjust this to change the threshold

  $animation_elements.each(function() {
    const $self = jQuery(this);
    let element_height = $self.outerHeight();
    let element_top_position = $self.offset().top;
    let element_bottom_position = element_top_position + element_height;
    
    const animation = $self.data('animation');
    const timeline = $self[0].tl;
    const counter = $self[0].counter;

    // Calculate the threshold for an element to be considered in view
    let threshold = element_height * viewport_threshold;

    if ((element_top_position + threshold <= window_bottom_position) && (element_bottom_position >= window_top_position + threshold)) {
      $self.addClass('visible ' + animation);
      if (timeline) { timeline.play(); }
    } 
    else {
      if (timeline && timeline.progress() > 0) { timeline.pause(true); }
      if (counter) { counter.reset(); }
    }
  });
}

$window.on("scroll", check_if_in_view);
$window.trigger("scroll");
$document.ready(function() { 
  check_if_in_view();
  setTimeout(check_if_in_view, 100);
});
