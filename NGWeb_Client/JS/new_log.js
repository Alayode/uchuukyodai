/**
 * Created by azuramei on 1/24/14.
 */
/**
 * Chris Samuel
 * ksamuel.chris@gmail.com
 *
 * */



$(document).ready(function(){

    jQuery.expr[':'].Contains = function(a, i, m){
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };

    /**
     * Disable closing the login dropdown if user clicks on login form elements
     */
        // Setup drop down menu
    $('.dropdown-toggle').dropdown();
    // Fix input element click problem
    $('.dropdown-menu form').click(function(e) {
        e.stopPropagation();
    });

    $('#new_log').click(function(e){
        window.location.href = "new_log.html";
    });

    // Load Logbooks
    loadLogbooks();

    // Load Tags
    loadTags();

    // Wait for dataload
    $('#load_tags').on('dataloaded', function(e){
        autocompleteTags(savedTags);
    });

    // Wait for dataload
    $('#load_logbooks').on('dataloaded', function(e){
        autocompleteLogbooks(savedLogbooks);
    });

    // Add upload field
    addAttachmentField();

    $('#add_attachment').click(function(e){
        addAttachmentField();
    });
});

function addAttachmentField(){
    var template = getTemplate("template_new_add_attachment");

    var addAtachment = {};

    var html = Mustache.to_html(template, addAtachment);
    $('#list_add_attachments').append(html);

    $('.new_attachment').unbind("change");
    $('.new_attachment').on("change", function(e){
        alert($(e.target).val());
    });
}

function autocompleteTags(tagsArray){
    var selectedTagsArray = [];

    if($.cookie(filtersCookieName) !== undefined){
        selectedTagsArray = $.parseJSON($.cookie(filtersCookieName))["list2"];
    }

    $("#tags_input").tagsManager({
        prefilled: selectedTagsArray,
        typeahead: true,
        typeaheadSource: tagsArray
    });
}

function autocompleteLogbooks(logbooksArray){
    var selectedLogbooksArray = [];

    if($.cookie(filtersCookieName) !== undefined){
        selectedLogbooksArray = $.parseJSON($.cookie(filtersCookieName))["list"];
    }

    $("#logbooks_input").tagsManager({
        prefilled: selectedLogbooksArray,
        typeahead: true,
        typeaheadSource: logbooksArray
    });
}