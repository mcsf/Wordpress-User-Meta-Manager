/**
 * @author Jason Lau
 * @copyright 2012
 * @package user-meta-manager
 */
 
 jQuery(function($){
        var page_data = $("div.umm-wrapper").data();
        $("div.actions").first().prepend($("div.umm-per-page-menu").html());
        $("div.umm-per-page-menu").html('');
        $("#get-search-input").after($("div.umm-search-mode-menu").html());
       
       $(".umm-go").each(function(){
        $(this).bind('mouseup',function(){
            $("#per-page-hidden").val($("#per-page").val());
            $("#umm-form").submit();
        }); 
       });
    
    $("a.umm-subpage").live('click', function(event){
        event.preventDefault();
        var obj = $(this),
        d = obj.data();
        if(d.nav_button){
           $(".umm-nav .umm-subpage-go").toggleClass('button-primary', false).toggleClass('button-secondary', true);
           $(".umm-nav .umm-subpage-go:contains('" + d.nav_button + "')").toggleClass('button-primary', true); 
        }
        $("div.umm-subpage-loading").show('slow');
        $("div.umm-subpage").load(d.subpage, function(){
            $("div.umm-subpage").show('slow');
            $("div.umm-subpage-loading").hide('slow');
            $("div#umm-home").hide('slow');
            if(d.message){
                $('div.umm-message').html(data.message).show('slow').delay(5000).hide('slow');
            }         
        });
    });
    
    $(".umm-button").live('click', function(event){
        event.preventDefault();
        var obj = $(this),
        d = obj.data(),
        loading_image = '<img class="umm-loading" src="' + $("div.umm-wrapper").data().umm_loading_image + '" alt="..." />';
        $("div.umm-subpage-loading").show('slow');
        
        if(obj.hasClass('umm-homelink')){
            $("div.umm-subpage").hide('slow');
            $("div.umm-subpage-loading").hide('slow');
            $("div#umm-home").show('slow');
        } else {
           $("div.umm-subpage").load(d.subpage, function(){
            $("div.umm-subpage-loading").hide('slow');
            $("div.umm-subpage").show('slow'); 
            if(d.message){
                $('div.umm-message').html(data.message).show('slow').delay(5000).hide('slow');
            }
           }); 
        }      
    });
    
    $(".umm-subpage-go").live('click', function(event){
        event.preventDefault();
        var obj = $(this),
        d = obj.data();
        
        $(".umm-subpage-go").toggleClass('umm-active-link', false);
        
        $(".umm-nav .umm-subpage-go").toggleClass('button-secondary', true);
        $(".umm-nav .umm-subpage-go").toggleClass('button-primary', false);
        $("div#umm-home").hide('slow');
        $("div.umm-subpage").hide('slow');
        $("div.umm-subpage-loading").show('slow');
        if((obj.hasClass('button-primary') || obj.hasClass('button-secondary')) && !obj.hasClass('umm-go-back-button')){
            $(".umm-nav .umm-subpage-go").toggleClass('button-primary', false);
            $(".umm-nav .umm-subpage-go").toggleClass('button-secondary', true);
            obj.toggleClass('button-primary', true);
        }           
        obj.toggleClass('umm-active-link', true);
        if(obj.hasClass('umm-homelink')){
            $("div.umm-subpage-loading").hide('slow');
            $("div#umm-home").show('slow');
        } else {
            
        $("div.umm-subpage").load(d.subpage, function(){
            $("div.umm-subpage-loading").hide('slow');
            $("div.umm-subpage").show('slow'); 
            if(d.message){
                $('div.umm-message').html(data.message).show('slow').delay(5000).hide('slow');
            }        
        });
        }       
    });
    
    $("#umm_edit_custom_meta_submit").live('click', function(event){
        event.preventDefault();
        if($("#umm_edit_key").val() != ""){
            var obj = $(this),
        d = obj.data(),
        original_value = obj.val(),
        return_page = $("#" + d.form + " input[name='return_page']").val() + '&umm_edit_key=' + $("#umm_edit_key").val();
        obj.prop('disabled',true).val(d.wait);
        $("div.umm-subpage").load(return_page, function(){
                if(d.message){
                    $('div.umm-message').html(data.message).show('slow').delay(5000).hide('slow');
                }
                $("div.umm-subpage").show('slow');
                $("div#umm-home").hide('slow');    
        });
        } else {
           $("#umm_edit_key").effect('highlight',1000); 
        }        
    });

    $("#umm_update_user_meta_submit").live('click', function(event){
        event.preventDefault();
        if($("#umm_edit_key").val() != ""){
        var obj = $(this),
        d = obj.data(),
        original_value = obj.val(),
        edit_key = ($("#umm_edit_key").val() == undefined) ? '' : $("#umm_edit_key").val(),
        return_page = $("#" + d.form + " input[name='return_page']").val() + '&umm_edit_key=' + edit_key;
        obj.prop('disabled',true).val(d.wait);
        
        $("div.umm-subpage-loading").show('slow');
        $.post('admin-ajax.php?action=umm_switch_action&sub_action=' + d.subpage, $("#" + d.form).serialize(), function(data){
            $("div.umm-result-container").load(location.href + " div#umm-home", function(){                
                $("table.umm-users").replaceWith($("div.umm-result-container table.umm-users"));
                $("div#umm-search select.umm-search-mode").replaceWith($("div.umm-result-container select.umm-search-mode"));
                $("div.umm-result-container").html('');
            });
            $("div.umm-subpage").load(return_page, function(){
                if(data){
                    $('div.umm-message').html(data).show('slow').delay(5000).hide('slow');
                } 
               $("div.umm-subpage").show('slow'); 
               $("div#umm-home").hide('slow');
               $("div.umm-subpage-loading").hide('slow');          
            });
        });
        } else {
           $("#umm_edit_key").effect('highlight',1000); 
        }
    });
    
    $(".umm-update-settings-submit").live('click', function(event){
        event.preventDefault();
        var obj = $(this),
        d = obj.data(),
        original_value = obj.val(),
        return_page = $("#" + d.form).attr('action');
        obj.prop('disabled', true).val(d.wait);
        $.post(return_page, $("#" + d.form).serialize(), function(data){
            $('div.umm-update-settings-result').html(data).show('slow').delay(5000).hide('slow');
            obj.val(original_value).prop('disabled', false);  
        });        
    });
    
    $("select.umm-profile-field-type").live('change', function(){
        $(".umm-profile-field-options").hide('slow');
        switch($(this).val()){
            case 'text':
            case 'color':
            case 'date':
            case 'datetime':
            case 'datetime-local':
            case 'email':
            case 'month':
            case 'number':
            case 'range':
            case 'search':
            case 'tel':
            case 'time':
            case 'url':
            case 'week':
            case 'textarea':
            case 'checkbox':
            $(".umm-input-options").show('slow');
            break;
                       
            case 'radio':
            case 'select':
            $(".umm-input-options").show('slow');
            $(".umm-select-options").show('slow');
            $(".umm-remove-option:first").hide();
            break;
            
            default:
            $(".umm-profile-field-options").hide('slow');
        }
    });
    
    switch($("select.umm-profile-field-type").val()){
            case 'text':
            case 'color':
            case 'date':
            case 'datetime':
            case 'datetime-local':
            case 'email':
            case 'month':
            case 'number':
            case 'range':
            case 'search':
            case 'tel':
            case 'time':
            case 'url':
            case 'week':
            case 'textarea':
            case 'checkbox':
            $(".umm-input-options").show('slow');
            break;
                      
            case 'radio':
            case 'select':
            $(".umm-input-options").show('slow');
            $(".umm-select-options").show('slow');
            $(".umm-remove-option:first").hide();
            break;
            
            default:
            $(".umm-profile-field-options").hide('slow');
        }
    
    $(".umm-add-row").live('click', function(event){
        event.preventDefault();
        $(".umm-select-options-clone tr").clone().appendTo(".umm-select-options-table").show();
    });
        
    $(".umm-remove-row").live('click', function(event){
        event.preventDefault();
        $(this).closest("tr").remove();
    });
       
    $("#contextual-help-link").html(page_data.help_text).delay(1500).effect('highlight', 2000);
    
    if(page_data.first_run == 'yes'){
        $(document).bind('ready', function(){
            $('a#contextual-help-link').trigger('click');
        });
    }
    
    $("input[name='meta_key']").live('keyup change', function(event){
       $("input#umm_update_user_meta_submit").prop("disabled","disabled"); 
       var obj = $(this),
        original_value = obj.val(),
        new_value = original_value.replace(' ', '_').replace(/\W/g, ''),
        invalidChars = /\W/; // letters, numbers, and underscores
       
        if(new_value.replace('_', '') == ''){
            new_value = '';
            obj.attr('placeholder', page_data.no_spaces);
        }
        
        if(new_value != original_value){
            obj.effect('highlight', 2000);
            obj.val(new_value);
        }
        
        var current_val = obj.val(),
        check_if_exists = function(){
            //if(event.type == 'change'){
            console.log(event.type);
            var request = $.ajax({
                url: 'admin-ajax.php?action=umm_switch_action&sub_action=umm_key_exists&meta_key=' + current_val,
                type: "POST",
                dataType: "json"
            });
            request.done(function(data){
                console.log(data.key_exists);
                if(data.key_exists){
            if(!$(".key-exists-warning").html()){
                $("input#umm_update_user_meta_submit").prop("disabled","disabled");
            obj.after('<div class="umm-warning key-exists-warning hidden">' + page_data.key_exists + '</div>');
            $(".key-exists-warning").show('slow');
            }
        } else {
            if($(".key-exists-warning").html()){
                $(".key-exists-warning").hide('slow').remove();
            }
            $("input#umm_update_user_meta_submit").prop("disabled","");
        }
            });
        //} 
        };
        
        if(invalidChars.test(new_value)){
            if(!$(".invalid-chars-warning").html()){
            obj.after('<div class="umm-warning invalid-chars-warning hidden">' + page_data.invalid_chars_warning + '</div>');
            $(".invalid-chars-warning").show('slow');
            }
        } else {
            if($(".invalid-chars-warning").html()){
                $(".invalid-chars-warning").hide('slow').remove();
            }
        check_if_exists();
           
        }        
    });
    
}); // jQuery