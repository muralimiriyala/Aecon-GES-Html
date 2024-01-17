
jQuery(document).ready(function($){
  $('.popup-youtube').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
  $('.popup-video').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
  $('.popup-modal').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		preloader: false,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-top'
  });
});
