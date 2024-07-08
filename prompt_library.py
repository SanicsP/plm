import json
import prompt_data
import pprint


class promptLibrary : 
    
    libraries_path = "libraries"
    def __init__(self) -> None:
        self.prompts_list : list[prompt_data.promptData] = []
        self.filter = None
        self.library_file_path : str = ""
        self.ref_images_path  : str = ""
        self.result_images_path : str  = ""


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

    def load_library(self , library_path) : 

        lib_file_path = f"{self.libraries_path}/{library_path}"
        self.library_file_path = lib_file_path

        try : 
            with open(lib_file_path,  encoding="utf8") as json_file :
                json_info = json.load(json_file)

                self.ref_images_path = json_info["ref_images_path"]

                self.result_images_path = json_info["result_images_path"]

                for prompt_info in json_info["prompts"] : 
                    self.prompts_list.append(prompt_data.promptData.dict2prompt_data(prompt_info))
            
                print(f"the library {library_path} load with success")

                return True
            
        except FileNotFoundError : 
            print(f"The file \"{lib_file_path}\" does not exists")
            return False
            pass
        except : 
            return False

    def save_library(self) : 
        
        
        try : 
            with open(self.library_file_path, "w" , encoding="utf8") as output_file :
                output_file.write(json.dumps(self.get_library_data())) 
                print("library saved with succes")
                return True
        except FileNotFoundError:
            print(f"the file \"{self.library_file_path}\" does not exixts")
            return False  
        except :
            return False
    
    def get_library_data(self) :
        library_data = {}
        library_data["ref_images_path"] = self.ref_images_path
        library_data["result_images_path"] = self.result_images_path
        library_data["prompts"] = []

        for prompt in self.prompts_list : 
            library_data["prompts"].append(prompt_data.promptData.prompt_data2json(prompt))
        return library_data

    def search_prompts_by_filter(self , filter , request) : 
        if self.library_file_path == "" : 
            print("the file is not loaded")
            return None
        results : list[prompt_data.promptData] = []

        if filter == "prompts" :
            for prompt_info in self.prompts_list : 
                if request in prompt_info.prompt : 
                    results.append(prompt_info)
            pass
        elif filter == "names" : 
             for prompt_info in self.prompts_list : 
                if request in prompt_info.name : 
                    results.append(prompt_info)
        elif filter == "themes " : 
            for prompt_info in self.prompts_list : 
                if request in prompt_info.themes : 
                    results.append(prompt_info)
        return promptLibrary.prompt_list2json(results)

    def prompt_list2json(prompt_list) :
        json_data = {"prompts" : []}
        for prompt_info in prompt_list : 
            json_data["prompts"].append(prompt_data.promptData.prompt_data2json(prompt_info))
        print("json_data : " , json_data)
        return json_data


    