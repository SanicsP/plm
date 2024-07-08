import * as visual_component from "/visualisation_components.js"


var menu_bar = new visual_component.menu_bar(
    document.getElementById("save_button") ,
    document.getElementById("open_button") ,
    document.getElementById("load_file") 

)

var library = new visual_component.library(
    document.getElementById("search_bar"),
    document.getElementById("filter_select"),
    document.getElementById("card_list")
)

eel.expose(menu_bar.onLibrarySaveResponse.bind(menu_bar) , "onSaveLibraryResponse")
eel.expose(menu_bar.onLoadLibraryResponse.bind(menu_bar) , "onLoadLibraryResponse")
eel.expose(library.onSearchResults.bind(library) , "onSearchResults")
