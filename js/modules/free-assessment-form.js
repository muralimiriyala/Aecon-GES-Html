
jQuery(document).ready(function($){
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]").on("click", function(e){
        const _this = $(this);
        _this.parent().addClass('open');
        _this.parent().parent().siblings().find("label").removeClass("open");
        setTimeout(function(){
            _this.parents().siblings(".frm_checkbox").find("input").prop("disabled", false).prop("checked", false);
            // _this.parents().siblings(".frm_checkbox").find("input").removeAttr("disabled").prop("checked", false);
        }, 100)
        _this.removeAttr("disabled").prop("checked", true); 
    });    

    $(".free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]:checked").each(function() {
        const _this = $(this);
    
        _this.parent().addClass('open');
        _this.parent().parent().siblings().find("label").removeClass("open");
    
        // Remove "disabled" attribute and uncheck other checkboxes
        setTimeout(function(){
            _this.parents().siblings(".frm_checkbox").find("input").prop("disabled", false).prop("checked", false);
        }, 100);
    });

    // $("body").on("change", ".free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]", function(e) {
    //     const _this = $(this);
        
    //     // Check if the checkbox is checked
    //     if (_this.prop("checked")) {
    //         _this.parent().addClass('open');
    //         _this.parent().parent().siblings().find("label").removeClass("open");
    
    //         // Remove "disabled" attribute and uncheck other checkboxes
    //         setTimeout(function(){
    //             _this.parents().siblings(".frm_checkbox").find("input").prop("disabled", false).prop("checked", false);
    //         }, 100);
    //     }
    // });
    
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox#frm_checkbox_69-0 input[type=checkbox]").on("click", function(){
        let isChecked = $(this).prop("checked");
        let btnText = $(".frm_button_submit");
        if(isChecked){btnText.text("submit")};
    });
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox#frm_checkbox_69-1 input[type=checkbox]").on("click", function(){
        let isChecked = $(this).prop("checked");
        let btnText = $(".frm_button_submit");
        if(isChecked){btnText.text("next")};
    });

    $('body .free-steps-text .frm_forms .frm_form_fields .frm_submit button[type="submit"].frm_prev_page').text("Back");

});