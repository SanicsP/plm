import * as prompt_data from "/prompt_data.js"
import * as components from "/components.js"



var require_component = new components.required_data_component(
    document.getElementById("prompt_name"),
    document.getElementById("prompt_text"),
    document.getElementById("negative_prompt_text"),
    document.getElementById("description_text"),

)


var themeComponent = new components.themes_component(
    document.getElementById("theme_text") ,
    document.getElementById("add_theme_button") ,
    document.getElementById("theme_list") ,
    "delete-theme-button"
)

var param_component = new components.additional_param_component(
    document.getElementById("add_param_button") ,
    document.getElementById("custom_param_list") ,
    "param-name" ,
    "param-value",
    "delete-param"

    
)

var more_component = new components.more_details_component(
    document.getElementById("model_name"),
    document.getElementById("prompt_quality"),
    document.getElementById("result_image"),
    document.getElementById("ref_image"),
    document.getElementById("result_image_upload"),
    document.getElementById("ref_image_upload"),
    document.getElementById("prompt_quality_value"),
    

)

var creation_component = new components.prompt_creation_component(
    require_component , 
    themeComponent ,
    param_component ,
    more_component,
    document.getElementById("save_prompt_button") , 
    document.getElementById("log_text") , 
    
)

var menu_bar = new components.menu_bar_component(document.getElementById("save_button"))
eel.expose(menu_bar.onSaveLibraryResponse.bind(menu_bar) , "onSaveLibraryResponse")
eel.expose(creation_component.onAddPromptResponse.bind(creation_component) , "add_prompt_response")
console.log(param_component)
console.log(themeComponent)
console.log(more_component)
