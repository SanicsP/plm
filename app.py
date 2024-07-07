import eel
import prompt_data
import prompt_library

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


eel.start("prompt-creation.html")