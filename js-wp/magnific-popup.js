
document.addEventListener("DOMContentLoaded", function($) {
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
});
