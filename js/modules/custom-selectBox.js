jQuery(document).ready(function($){
    $('select').selectBox({
        keepInViewport: false,
        menuSpeed: 'slow',
        mobile:  true,
        hideOnWindowScroll: true,
    });
    $(".selectBox, .selectBox-dropdown .selectBox-label").removeAttr('style');
});