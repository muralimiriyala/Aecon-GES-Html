
jQuery(document).ready(function($){
  $('.popup-youtube').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true
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
