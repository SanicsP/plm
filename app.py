import eel
import prompt_data
import prompt_library
import json

eel.init("web")
prompt_lib = prompt_library.promptLibrary()

@eel.expose 
def add_prompt(json_data_string) : 
    response = prompt_lib.add_prompt(json_data_string)
    if response : 
        print("new lib : " , prompt_lib.prompts_list)
    else : 
        print("prompt not added")

    eel.add_prompt_response(response)

@eel.expose
def load_library(libray_path) :
    status = {
        "ref_images_path" : "none",
        "result_images_path" : "none" ,
        "status" : "false"  
    }
    
    status = prompt_lib.load_library(libray_path)
    eel.onLoadLibraryResponse(status)
    pass

@eel.expose
def save_library() : 
    status = prompt_lib.save_library()
    eel.onSaveLibraryResponse(status)
    pass


@eel.expose 
def update_library_request(search_mode , request) :
    results = prompt_lib.search_prompts_by_filter(search_mode , request)
    eel.onSearchResults(results)
    print("request results : " , results)
    pass


eel.start("main.html" , mode="edge")