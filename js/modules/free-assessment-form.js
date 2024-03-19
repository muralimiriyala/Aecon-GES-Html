
jQuery(document).ready(function($){
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]").on("click", function(e){
        const _this = $(this);
        _this.parent().addClass('open');
        _this.parent().parent().siblings().find("label").removeClass("open");
        setTimeout(function(){
            _this.parents().siblings(".frm_checkbox").find("input").prop("disabled", false).prop("checked", false);
        }, 100)
        _this.removeAttr("disabled").prop("checked", true); 

        let isChecked = $(this).prop("checked");
        let closestElement = $(this).closest(".frm_form_field");
        if(isChecked){
            closestElement.removeClass('frm_blank_field');
        }
    });  
    
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_65_container .frm_checkbox input[type=checkbox]:not(#field_xxesr-3)").on("click", function(e){
        $("#frm_field_90_container").fadeOut("slow");
    });
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_65_container .frm_checkbox input[type=checkbox]#field_xxesr-3").on("click", function(e){
        $("#frm_field_90_container").fadeIn("slow");
    });
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_67_container .frm_checkbox input[type=checkbox]:not(#field_d83cb-2)").on("click", function(e){
        $("#frm_field_91_container").fadeOut("slow");
    });
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_67_container .frm_checkbox input[type=checkbox]#field_d83cb-2").on("click", function(e){
        $("#frm_field_91_container").fadeIn("slow");
    });
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_68_container .frm_checkbox input[type=checkbox]:not(#field_5pmmi-4)").on("click", function(e){
        $("#frm_field_92_container").fadeOut("slow");
    });
    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_68_container .frm_checkbox input[type=checkbox]#field_5pmmi-4").on("click", function(e){
        $("#frm_field_92_container").fadeIn("slow");
    });

    $(".free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]:checked").each(function() {
        const _this = $(this);
        let isChecked = $(this).prop("checked");
        let closestElement = $(this).closest(".frm_form_field");
        if(isChecked){
            closestElement.removeClass('frm_blank_field');
        }
        
        _this.parent().addClass('open');
        _this.parent().parent().siblings().find("label").removeClass("open");
    
        // Remove "disabled" attribute and uncheck other checkboxes
        setTimeout(function(){
            _this.parents().siblings(".frm_checkbox").find("input").prop("disabled", false).prop("checked", false);
        }, 100);
    });
    
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

    $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field input").on("input", function(){
        const _selfInput = $(this);
        const value = _selfInput.val();
        if(value.trim() !== ""){
            _selfInput.siblings(".frm_error").addClass("hide-error-message");
        }
        else{
            _selfInput.siblings(".frm_error").removeClass("hide-error-message");
        }
      });
      $("body .free-steps-text .frm_forms .frm_form_fields .frm_form_field input").each(function() {
        if ($(this).val().trim() !== "") {
          $(this).trigger("input");
        }
      });


});