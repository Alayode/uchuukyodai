/**
 * Created by KayodeAlayode on 1/21/14.
 */
/**
 * Load shit onto dong ready
 * @author: Chris Samuel <ksamuel.chris@icloud.com>
 *
 * */

        // var note = new log

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

}

    function loadNotesAutomatically(){
        //Automatically load new notes when at the end of the page
        $('load_notes').scrol(function(e){
            var scrollDiv = $('#load_notes');

          // console
        })
    }