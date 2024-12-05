jQuery(document).ready(function ($) {
  const browseBtn = $('.browse-mobile-btn')
  browseBtn.on('click', function (e) {
    e.preventDefault()
    $(this).toggleClass('active')
    $('.browse-news-form').toggleClass('open')
  })
})
