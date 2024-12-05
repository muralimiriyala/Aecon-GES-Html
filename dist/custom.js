jQuery(document).ready(function ($) {
  $(
    '.flyout-form-overlay .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox], .contact-form .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]',
  ).on('click', function (e) {
    const _this = $(this)
    _this.closest('.frm_checkbox').find('label').toggleClass('open')
    _this.parents().siblings('.frm_checkbox').find('label').removeClass('open')
    _this
      .parents()
      .siblings('.frm_checkbox')
      .find("input[type='checkbox']")
      .prop('checked', false)
  })

  var countelem = $('.flyout-form-overlay')
  countelem.each(function () {
    const _self = $(this)
    const selectId = _self.find('select')
    selectId.change(function () {
      var selectedOption1 = $(this).val()
      var callLabel1 =
        'Schedule a call with a ' + selectedOption1 + ' specialist'
      $('#frm_checkbox_41-0 label span').html(callLabel1)
      var appointmentLabel1 =
        'Schedule a ' + selectedOption1 + ' service appointment'
      $('#frm_checkbox_41-1 label span').html(appointmentLabel1)
    })
  })

  const checkField = $(
    ".contact-form .frm_forms .frm_form_fields #frm_checkbox_8-1 input[type='checkbox']",
  )
  const container = $(
    '.contact-form .frm_forms .frm_form_fields #frm_field_4_container',
  )
  checkField.on('click', function (e) {
    const _this = $(this)
    const hasValue = $('input#field_e6lis6').val().trim()
    const errorMessage = container.find('.frm_error')
    if (_this.prop('checked') && hasValue === '') {
      if (errorMessage.length === 0) {
        container.addClass('show-phone').removeClass('hide-phone')
        container.append(
          '<div class="frm_error" role="alert" id="frm_error_field_4">Please enter the phone number</div>',
        )

        if ($('#frm_error_field_4').length === 0) {
          container.append(
            '<div class="frm_error" role="alert" id="frm_error_field_4">Please enter the phone number</div>',
          )
        }
      }
    } else {
      container.removeClass('hide-phone show-phone')
      errorMessage.remove()
    }
  })

  $(".contact-form .frm_forms .frm_form_fields input[type='checkbox']")
    .not(checkField)
    .on('click', function (e) {
      const _this = $(this)
      container.addClass('hide-phone').removeClass('show-phone')
      $('#frm_error_field_4').remove()
    })
  const phoneField = $(
    '.contact-form .frm_forms .frm_form_fields #frm_field_4_container input',
  )
  phoneField.on('input', function () {
    const _this = $(this)
    const _thisValue = _this.val()
    _this.parent().toggleClass('hide-phone', _thisValue !== '')
  })

  $('.contact-form select#field_rfh74').change(function () {
    var selectedOption = $(this).val()
    var newLabelText = 'Start a FREE ' + selectedOption + ' Assessment'
    $('#frm_checkbox_8-0 label span').text(newLabelText)
    var callLabel = 'Schedule a call with a ' + selectedOption + ' specialist'
    $('#frm_checkbox_8-1 label span').text(callLabel)
    var appointmentLabel =
      'Schedule a ' + selectedOption + ' service appointment'
    $('#frm_checkbox_8-3 label span').text(appointmentLabel)
  })

  /*-- new requirement --*/
  var solarlink = 'https://aecon.parachutedevelopment.ca/free-assessment-solar/'
  var evecharginglink =
    'https://aecon.parachutedevelopment.ca/free-assessment-ev-charging/'
  var heatingcoolinglink =
    'https://aecon.parachutedevelopment.ca/free-assessment-heating-cooling/'
  var batterystoragelink =
    'https://aecon.parachutedevelopment.ca/free-assessment-battery-storage/'
  var customLink =
    'https://outlook.office365.com/owa/calendar/Hayter1@aecon.com/bookings/'

  var contactform = $('.contact-form form')
  contactform.on('submit', function (event) {
    // event.preventDefault(); // commented august 1
    const inputs = $(
      '.frm_required_field input#field_qh4icy, .frm_required_field input#field_ocfup1, .frm_required_field input#field_29yf4d, .frm_required_field input#field_e6lis6',
    )
    if (
      inputs.filter(function () {
        return !this.value.trim()
      }).length > 0
    ) {
      return
    }
    const selectList = $('select#field_rfh74')
    const selectedValue = selectList.val()
    const checkValue = $("input[type='checkbox']#field_rcxd6-0").prop('checked')
    const newLinkChecked = $('input#field_rcxd6-1').prop('checked')

    setTimeout(greeting, 4000)
    function greeting() {
      if (selectedValue === 'Solar' && checkValue === true) {
        window.location.href = solarlink
      } else if (selectedValue === 'EV Charging' && checkValue === true) {
        window.location.href = evecharginglink
      } else if (selectedValue === 'Heating & Cooling' && checkValue === true) {
        window.location.href = heatingcoolinglink
      } else if (selectedValue === 'Battery Storage' && checkValue === true) {
        window.location.href = batterystoragelink
      } else if (newLinkChecked === true) {
        window.location.href = customLink
      } else {
      }
    }
  })
})
