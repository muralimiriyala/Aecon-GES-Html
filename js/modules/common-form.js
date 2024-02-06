jQuery(document).ready(function($){
    // Handle click event for checkboxes
    $(".flyout-form-overlay .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox], .contact-form .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]").on("click", function(e){
        const _this = $(this);
        const parentField = _this.closest('.frm_checkbox');
        const parentLabel = parentField.find('label');
        if(_this.prop('checked')) {
            parentLabel.addClass('open');
        } 
        else{
            parentLabel.removeClass('open');
        }
    });

    // Initialize state on page load for checked checkboxes
    $(".flyout-form-overlay .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]:checked, .contact-form .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]:checked").each(function() {
        const _this = $(this);
        const parentField = _this.closest('.frm_checkbox');
        const parentLabel = parentField.find('label');
        parentLabel.addClass('open');
        parentField.siblings().find('label').removeClass('open');
    });

    const checkField = $(".contact-form .frm_forms .frm_form_fields #frm_checkbox_8-0 input[type='checkbox']");
    checkField.on("click", function(e){
        const _this = $(this);
        const container = _this.closest(".frm_form_fields").find("#frm_field_4_container");
        const errorMessage = container.find(".frm_error");
        if (_this.prop("checked")) {
            if (errorMessage.length === 0) {
                container.addClass("show-phone");
                container.append('<div class="frm_error" role="alert" id="frm_error_field_4">Please enter the phone number</div>');
            }
        }
    });
    $(".contact-form .frm_forms .frm_form_fields input[type='checkbox']").not(checkField).on("click", function (e) {
        const _this = $(this);
        const container = _this.closest(".frm_form_fields").find("#frm_field_4_container").addClass("hide-phone");

    });

    const phoneField = $(".contact-form .frm_forms .frm_form_fields #frm_field_4_container input");
    phoneField.on("input", function(){
        const _this = $(this);
        const _thisValue = $(this).val();
        _this.parent().toggleClass("hide-phone", _thisValue !== "");
    });

    

});
