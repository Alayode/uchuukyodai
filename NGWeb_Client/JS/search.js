/**
 * Created by azuramei on 1/24/14.
 * Using jQuery to load data
 */


/**
 *
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 * **/

$(document).ready(function(){
    //wait for the data to load
    $('#load_notebooks').on('dataSelected',function(e,data){
        //parseSearchQuery();
        generateSearchQuery(data);
    });

    //wait for the data to load then load the tags
    $('#load_tags').on('dataSelected', function(e, data){
        //parseSearchQuery();
        generateSearchQuery(data);
    });
})

/*
* Start listening for Search button clicks. When button is pressed, parse input and create search
* query @returns {undefined}
*
*/

 function activateSearch(){
     //Simple search
     $("search-button").click(function(e){
         var searchQuery = $("search-query").val();

         if(search === ""){
             page = 1;
             loadLogs(page);

         } else {
             searchForNotes('search=' + searchQuery);
         }
     });
 }
 function searchForNotes(searchQuery){
     searchQuery = serviceurl + 'notes?' + searchQuery + 'limit=' + numberofNotesPerLoad + '&page=' + page;
     console.log(searchQuery);

     //Load Notes
     $.getJson(searchQuery, function(logs) {
         $(".note-last").remove();
         $(".note").remove();
         repeatNotes("template_note","load_notes",notes);
         startListeningForLogClicks();

     });
 }

function buildSearchLanguage(value){

    var searchString = "";
    var filterType   = "";
    var remainder    = "";

    var re = new RegExp("(tag:| logbook:| from:|to:)(.*)", "i");
    var searchParts = re.exec(value);

    if(searchParts === null){
        searchString = value;

    } else {
        filterType = searchParts[1];
        searchString = value.split(filterType)[0];
        remainder = searchParts[2];
    }

    return [searchString, filterType, remainder];


}

function parseSearchQuery(){
    var value = $("search-query").val();

    var parsedStringParts = buildSearchLanguage(value);
    console.log(parsedStringParts);

     while (parsedStringParts[1] !== ""){
         parsedStringsParts = buildSearchLanguage(parsedStringParts[2]);
         //console.log(parsedStringParts);

     }
}


/**
 * Generate search input string and search query
 * @param {type} dataArray currently selected notebooks and tags
 * @returns {undefined}
 *  */

function generateSearchQuery(dataArray){
    var value = $("#search-query").val();
    var queryString = "";

    var parsedStringParts = buildSearchLanguage(value);

    var newValue = parsedStringParts[0];

    //Append general search to a search query
    if(newValue  !== ""){
        queryString += "search=" + newValue + '&';

    }
}