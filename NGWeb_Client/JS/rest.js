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


        //Load attachments
        $('#load_note_attachments').html("");

        if(note.attachments.length!== 0 ){
            $('.note_attachments').show("fast");
            repeatAttachments("templates_note_attachment", "load_note_attachments", note.attachments, note.id);

        } else {
            $('.note_attachments').hide("fast");
        }


    }