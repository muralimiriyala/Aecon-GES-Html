jQuery(document).ready(function ($) {
  const header = $('.header-main')
  const banner = $('body.home .banner-section')
  if (banner.length) {
    const bannerHeight = banner.offset().top + banner.outerHeight(true)
    window.onscroll = function () {
      const _scroll = window.scrollY
      _scroll >= bannerHeight
        ? header.addClass('sticky')
        : header.removeClass('sticky')
    }
  }
  const contact_btn = $('.contact_btn')
  contact_btn.on('click', function (e) {
    e.preventDefault()
    $(this).toggleClass('open')
    $('.contact_btn_menu').slideToggle(900)
  })
  $('body').on('click', function (e) {
    if (!$(e.target).closest('.contact_btn, .contact_btn_wrap').length) {
      $('.contact_btn_menu').slideUp()
    }
  })

  const getQuotebtn = $('.get_quote_flyout')
  getQuotebtn.each(function () {
    const _self = $(this)
    _self.on('click', function (e) {
      e.preventDefault()
      contact_btn.removeClass('open')
      $('body').addClass('open-flyout-bg')
      $(this).siblings('.flyout-blue-overlay').addClass('open')
      $(this).siblings('.flyout-form-overlay').addClass('open')
      $('.contact_btn_menu').slideUp(900)
    })
  })
  const flyoutFormclose = $('.flyout-form-close')
  flyoutFormclose.each(function () {
    const _selfClose = $(this)
    _selfClose.on('click', function (e) {
      e.preventDefault()
      $('body').removeClass('open-flyout-bg')
      $('.flyout-blue-overlay').removeClass('open')
      $('.flyout-form-overlay').removeClass('open')
      $('.html').removeClass('scroll-hidden')
      $('.flyout-overlay').removeClass('scroll-hidden')
    })
  })
  $('.header-right .get_quote_flyout').on('click', function (e) {
    e.preventDefault()
    $('body').removeClass('open-flyout-bg')
    $('html').addClass('scroll-hidden')
    $('.flyout-overlay').addClass('scroll-hidden')
  })

  const humburgerbtn = $('.humburger-btn')
  humburgerbtn.on('click', (e) => {
    e.preventDefault()
    humburgerbtn.toggleClass('open')
    contact_btn.removeClass('open')
    $('.header-right .flyout-blue-overlay').toggleClass('open')
    $('body').toggleClass('nav-overlay-open')
    $('.contact_btn_menu').slideUp(900)
    $('.header-right .flyout-overlay').toggleClass('open')
  })
  const flyoutclose = $('.flyout-close')
  flyoutclose.on('click', (e) => {
    e.preventDefault()
    humburgerbtn.removeClass('open')
    $('.flyout-blue-overlay').removeClass('open')
    $('.flyout-overlay').removeClass('open')
  })
  $('body').on('click', function (e) {
    if (
      !$(e.target).closest(
        '.humburger-btn, .flyout-overlay, .get_quote_flyout, .flyout-form-overlay, body .selectBox-dropdown, ul.selectBox-dropdown-menu li a',
      ).length
    ) {
      humburgerbtn.removeClass('open')
      $('.flyout-blue-overlay').removeClass('open')
      $('.flyout-overlay').removeClass('open')
      $('.flyout-form-overlay').removeClass('open')
      $('body').removeClass('open-flyout-bg')
    }
  })

  $('.accordion-header').on('click', function (e) {
    e.preventDefault()
    $(this).parent().toggleClass('active')
    $(this).parent().siblings().removeClass('active')
    $(this).parent().siblings().find('.accordion-header').removeClass('open')
    $(this).toggleClass('open')
    $(this).siblings('.accordion-content').slideToggle(500)
    $(this).parent().siblings().find('.accordion-content').slideUp(500)
  })

  const tablink = $('ul.about-partners-tabs li a')
  const tablinkFirst = $('ul.about-partners-tabs li:first-child a')
  tablinkFirst.addClass('active')
  tabValue = $('.partners-tab-content').attr('data-tab-value')

  tablink.on('click', function (e) {
    e.preventDefault()
    $(this).addClass('active')
    $(this).parent().siblings().find('a').removeClass('active')
    const tabAttr = $(this).attr('data-tab-name')
    $('.partners-tab-content').hide()
    $('.partners-tab-content[data-tab-value=' + tabAttr + ']').fadeIn()

    let text = $(this).text()
    $('.partners-mobile-span').text(text)
    let html = $(this).find('.partners-tab-icon').html()
    $('.all-partners-icon').html(html)
    $('ul.about-partners-tabs').removeClass('open')
  })

  $('.partners-mobile-btn').on('click', function (e) {
    e.preventDefault()
    $('ul.about-partners-tabs').toggleClass('open')
  })

  const faqtablink = $('ul.faq-tabs li a')
  $('ul.faq-tabs li:first-child a').addClass('active')
  tabValue = $('.partners-tab-content').attr('data-tab-value')

  faqtablink.on('click', function (e) {
    e.preventDefault()
    $(this).addClass('active')
    $(this).parent().siblings().find('a').removeClass('active')
    const faqtabAttr = $(this).attr('data-name')
    $('.faq-tab-content').hide()
    $('.faq-tab-content[data-value=' + faqtabAttr + ']').fadeIn()
    let text = $(this).text()
    $('.faqs-mobile-span').text(text)
    let html = $(this).find('.faq-tabs-icon').html()
    $('.faqs-mobile-icon').html(html)
    $('ul.faq-tabs').removeClass('open')
  })

  $('.faqs-mobile-btn').on('click', function (e) {
    e.preventDefault()
    $('ul.faq-tabs').toggleClass('open')
  })

  if ($(window).width() <= 1023) {
    let level1 = $('ul.flyout-menu > li.menu-item-has-children > a')
    level1.on('click', function (e) {
      e.preventDefault()
      $(this).parent('li').siblings().children('a').removeClass('active')
      $(this).toggleClass('active')
      $(this).parent('li').siblings().children('ul').slideUp(900)
      $(this).siblings('ul').slideToggle(900)
    })
  }

  $('.leaderships-mask').hover(
    function () {
      $(this).removeClass('out').addClass('over')
    },
    function () {
      $(this).removeClass('over').addClass('out')
    },
  )
})
