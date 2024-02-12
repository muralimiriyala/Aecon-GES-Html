jQuery(document).ready(function($){
    $('select').selectBox({
        keepInViewport: false,
        menuSpeed: 'slow',
        mobile:  true,
        hideOnWindowScroll: true,
    });
    $(".selectBox, .selectBox-dropdown .selectBox-label").removeAttr('style');
    // $('select').selectBox().each(function(){
    //     const _index = $(this).index();
    //     $('ul.selectBox-dropdown-menu').eq(0).addClass(`select-menu-${0}`);
    // });
});