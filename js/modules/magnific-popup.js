
jQuery(document).ready(function($){
  $('.popup-youtube').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true,
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1&mute=1'
        }
      }
    }
  });
  $('.popup-video').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true
  });
  $('.popup-modal').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
    fixedBgPos: true,
		overflowY: 'auto',
		preloader: false,
		removalDelay: 160,
		mainClass: 'my-mfp-slide-top'
  });
});
