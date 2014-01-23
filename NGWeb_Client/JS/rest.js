/**
 * Created by KayodeAlayode on 1/21/14.
 */
/**
 * Load shit onto dong ready
 * @author: Chris Samuel <ksamuel.chris@icloud.com>
 * var note = new log
 * */


    var modalWindows = "static/html/modal_windows.html";
    var templates = "static/html/templates.html";



    //Create object for saving logs
    var savedLogs = {};
    var savedTags =  new Array();
    var savedLogs = new Array();
    var page = 1;

    function loadNotebooks() {
            // Load Notebooks

        $.getJSON(serviceurl + 'notebooks/', function(books){
            repeat("template_notebook", "load_notebooks", books, "notebook");
            multiselect("list");
            filterListItems("notebooks_filter_search", "list");

        });
    }

    function loadTags(){
        //Load tags
        $.getJSON(serviceurl + 'tags/', function(tags){
            repeat("template_tag", "load_tags", tags, "tags");
            multiselect("list2")
        })
    }


    function loadNotes (page){
        // Remove all the logs if we are starting  from the beginning
        if(page === 1){
            $(".log").remove();
        }
}
    var searchQuery = serviceurl + 'logs?limit=' + numberOfLogsPerLoad + '&page' + page;
    console.log(searchQuery);


    $.getJSON(searchQuery, function(logs){
        $(".log-last").remove();
        repeatNotes("template_note", "load_notes",notes);
        appendAddMoreNote("load_Notes");
        startListeningForNoteClicks();
    });



    function loadNotesAutomatically(){
        //Automatically load new notes when at the end of the page
        $('load_notes').scrol(function(e){
            var scrollDiv = $('#load_notes');

          // console.log(scrollDiv.prop('scrollHeight') + "-" +scrollDiv.scrollTop() + " - " + scrollDiv.height());

            if(scrollDiv.prop('scrollHeight') - scrollDiv.scrollTop() <= scrollDiv.height()){
                page = page + 1;
                console.log('increate to ' + page)
                LoadNote(page);
            }
        });
    }

    /**
     * Get log from json object or from REST if it does not exist
     * @param {type} id note id
     *
     * */

    function getNote(id){

        //Load Note
        if(id in savedNotes){
            showNote(savedNOtes[id]);


        }else{
            $.getJSON(serviceurl + 'logs/' + id, function(log){
                showNote(note);
            });
        }
    }


    /***
     * Show note that was read from JSON object or from REST
     * @param {type} note note object
     *
     * */


    function showNote(log){
        $('.container-right').show("fast");

        $("note_description").html(note.description);
        $("#note_owner").html(note.owner);
        $("#note_date").html(formatDate(note.createdDate));

        //Show date edited
        if(log.createdDate !== log.lastModifiedDate){
            var template = getTemplate("template_note_details_edited");

            var item = {
                editedDate: formatDate(log.modifiedDate)

            };

            var html = Mustache.to_html(template, item);

            $('#note_details_edited').html(html);


        } else {
            $('#log_details_edited').html("");

        }


        //Load note notebooks
        $("load_note_notebooks").html("");

        if(note.tags.length !== 0){
            repeat("template_note_tag", "load_note_tags", note , "notes");
        }

z
        //Load attachments
        $('#load_note_attachments').html("");

        if(note.attachments.length!== 0 ){
            $('.note_attachments').show("fast");
            repeatAttachments("templates_note_attachment", "load_note_attachments", note.attachments, note.id);

        } else {
            $('.note_attachments').hide("fast");
        }


    }
/**
 * Repeat function that can load a list of various data
 * @param {type} source_id id attribute of template tag
 * @param {type} target_id  id attribute  of container  tag (where data will be placed)
 * @param {type} property data.property object
 * @returns replaces template with data and puts it in the right place
 * */


    function repeat(source_id, target_id, data, property){
    var template = getTemplate(source_id);
    var html = "";

    $.each(data[property], function(i,item){

        var customItem = item;
        customItem.clicked = "";

        if(property === "tag"){
            savedTags = savedTags.concat(item.name);

            //Check cookie content and select tags that need to be selected
            if($.cookie(filtersCookieName) !== undefined){
                var obj = $.parseJSON($.cookie(filtersCookieName)) ["list2_index"];

                if(obj !== undefined && obj[item.name] !== undefined){
                    customItem.clicked = "multilist_clicked";
                }
            }
        } else if(property === "notebook"){
            savedNoteBooks = savedNotes.concat(item.name);

            //Check cookie content and select tags that need to be selected
         if($.cookie(filtersCookieName) !== undefined){
                var obj = $.parseJSON($.cookie(filterssCookieName))["List_index"];

            if(obj !== undefined && onj[item.name] !== undefined){
                customItem.clicked = "multilist_clicked";
            }
        }
     }

        html = Mustache.to_html(template, customItem);

        $('#' + target_id). append(html);

     });

        $('#' + target_id).trigger('dataloaded', null);



}


/**
 * Show notes in the middle section. Some of the data must be formatted to be shown properly
 * @param {type} source_id id attribute of template tag
 * @param {type} target_id id attribute of container tag (where data will be placed)
 * @param {type} data data in JSON format
 * @returns replaces template with data and puts it in the right place
 *
 * */

    function repeatLogs (source_id, target_id, data){
    var template = getTemplate(source_id);
    var html = "";


    // Go through all the logs
    $.each(data,function(i,item){
        savedLogs[item.id] = item;

        //Build customized log object
        var newItem = {
            description: returnFirstXWords(item.desription, 40),
            owner: item.owner,
            createdDate: formatDate(item.createdDate),
            id: item.id,
            attachments : []
        };

        // Append attachments
        if(item.attachments.length !== 0 ){

            $.each(item.attachments, function(j, attachment){

                // Skip non image attachments
                if(!isImage(attachment.contentType)){
                    return;
                }

            // Create custom attribute thumbnail object
                newItem.attachments.push(
                    {imageUrl: serviceurl + "attachments/" + item.id + "/" + attachment.fileName + "thumbnail"}
                );

            });
        }

        html = Mustachace.to_html(template, newItem);
        $('#'+target_id).append(html);

    });

}

