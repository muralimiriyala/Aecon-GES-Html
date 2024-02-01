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
});
