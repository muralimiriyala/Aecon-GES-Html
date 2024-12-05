jQuery(document).ready(function ($) {
  const a = $('.about-partner-logos')
  a.each(function () {
    const _this = $(this)
    const b = _this.children('.about-partner-logo')
    if (b.length >= 16) {
      _this
        .parent()
        .append(
          "<div class='partner-show-btn'><a class='partner-logo-btn button btn-md btn-gray down-arrow'>Show all partners</a></div>",
        )
      let button = $('.partner-logo-btn')
      button.on('click', function (e) {
        e.preventDefault()
        b.slice(15).fadeToggle('fast')
        $(this).text(
          $(this).text() == 'Show all partners'
            ? 'Show Less partners'
            : 'Show all partners',
        )
      })
    }
  })
})
