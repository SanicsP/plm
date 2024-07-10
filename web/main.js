import * as visual_component from "/visualisation_components.js"



var details = new visual_component.details_panel(
    document.getElementById("details_menu"),
    document.getElementById("prompt_name_text"),
    document.getElementById("prompt_text"),
    document.getElementById("negative_prompt_text"),
    document.getElementById("description_text"),
    document.getElementById("theme_list"),
    document.getElementById("model_name_text"),
    document.getElementById("quality_text"),
    document.getElementById("param_list"),
    document.getElementById("ref_image_detail"),
    document.getElementById("result_image_detail"),
    document.getElementById("close_detail_button")

)

var library = new visual_component.library(
    document.getElementById("search_bar"),
    document.getElementById("filter_select"),
    document.getElementById("card_list") , details
)

var menu_bar = new visual_component.menu_bar(
    document.getElementById("save_button") ,
    document.getElementById("open_button") ,
    document.getElementById("load_file") ,
    library
)



eel.expose(menu_bar.onLibrarySaveResponse.bind(menu_bar) , "onSaveLibraryResponse")
eel.expose(menu_bar.onLoadLibraryResponse.bind(menu_bar) , "onLoadLibraryResponse")
eel.expose(library.onSearchResults.bind(library) , "onSearchResults")
eel.expose(library.onDeleteResponse.bind(library) , "onDeleteResponse")
