import prompt_data
import json

class promptLibrary : 
    def __init__(self) -> None:
        self.prompts_list : list[prompt_data.promptData] = []
        self.filter = None
        self.library_file_path : str = ""
    
    def add_prompt(self , json_data_string) :
        prompt_info = prompt_data.promptData.json2prompt_data(json_data_string)
        
        if self.check_double(prompt_info.name , prompt_info.prompt) : 
            self.prompts_list.append(prompt_info)
            return True
        else : 
            print("the prompt already_exists")
            return False
        pass

    def check_double(self , prompt_name , prompt) :
        for prompt_data in self.prompts_list : 
            if prompt_data.prompt == prompt or (prompt_data.name == prompt_name and prompt_name != "untitled") : 
                print(f"the prompt '{prompt_data.prompt}' called {prompt_data.name} already exists")
                return False
        return True

