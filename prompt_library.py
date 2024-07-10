import json
import prompt_data
from pathlib import Path

class promptLibrary : 
    
    libraries_dir = Path("web" , "libraries")
    def __init__(self) -> None:
        self.prompts_list : list[prompt_data.promptData] = []
        self.filter = None
        self.library_path : Path = Path()
        self.ref_images_path  : str = ""
        self.result_images_path : str  = ""


    def add_prompt(self , json_data_string) :
        prompt_info = prompt_data.promptData.json2prompt_data(json_data_string)
        if not self.library_path.is_file() : 
            print("no file")
            return {
                "status" : False , 
                "error_msg" : str("""> ERROR : A library load is required for save a prompt.  
                > please make sure you loaded the good library""")
            }
        if self.check_double(prompt_info.name , prompt_info.prompt) : 
            self.prompts_list.append(prompt_info)
            return {
                "status" : True , 
                "error_msg" : "no error"
            }
        else : 
            print("the prompt already_exists")
            return {
                "status" : False , 
                "error_msg" :"> ERROR : the prompt already exists"
            }
        pass

    def check_double(self , prompt_name , prompt) :
        for prompt_data in self.prompts_list : 
            if prompt_data.prompt == prompt or (prompt_data.name == prompt_name and prompt_name != "untitled") : 
                print(f"the prompt '{prompt_data.prompt}' called {prompt_data.name} already exists")
                return False
        return True

    def load_library(self , library_name) : 

        
        self.library_path = self.libraries_dir / library_name


        try : 
            with open(self.library_path,  encoding="utf8") as json_file :
                json_info = json.load(json_file)

                self.ref_images_path = str(Path(self.libraries_dir.name , json_info["ref_images_path"])).replace("\\" , "/")

                self.result_images_path = str(Path( self.libraries_dir.name , json_info["result_images_path"])).replace("\\" , "/")
                

                print("references images path : " + self.ref_images_path)
                print("results images path : " + self.result_images_path)

                self.prompts_list = []
                for prompt_info in json_info["prompts"] : 
                    self.prompts_list.append(prompt_data.promptData.dict2prompt_data(prompt_info))
            
                print(f"the library {self.library_path} load with success")

                return True
            
        except FileNotFoundError : 
            print(f"The file \"{self.library_path}\" does not exists")
            return False
            pass
        except : 
            return False

    def save_library(self) : 
        
        
        try : 
            with open(self.library_path, "w" , encoding="utf8") as output_file :
                output_file.write(json.dumps(self.get_library_data())) 
                print("library saved with succes")
                return True
        except FileNotFoundError:
            print(f"the file \"{self.library_path}\" does not exixts")
            return False  
        except :
            return False
    
    def get_library_data(self) :
        library_data = {}
        
        relative_ref_path = Path(self.ref_images_path).relative_to(self.libraries_dir.name)
        
        print("saved ref path : " , relative_ref_path)
        relative_result_path = Path(self.result_images_path).relative_to(self.libraries_dir.name)
        print("saved res path : " , relative_result_path)



        library_data["ref_images_path"] = str(relative_ref_path).replace("\\" , "/")
        library_data["result_images_path"] = str(relative_result_path).replace("\\" , "/")
        library_data["prompts"] = []

        for prompt in self.prompts_list : 
            library_data["prompts"].append(prompt_data.promptData.prompt_data2json(prompt))
        return library_data

    def theme_filter(theme_list , theme) :  
                for tag in theme_list: 
                    if tag == theme : 
                        return True
                return False
    
    def search_prompts_by_filter(self , request_filter , request) : 


        if not self.library_path.is_file() : 
            print("the file is not loaded")
            return None
        results : list[prompt_data.promptData] = []

        if request_filter == "prompts" :
            for prompt_info in self.prompts_list : 
                if request in prompt_info.prompt : 
                    results.append(prompt_info)
            pass
        elif request_filter == "names" : 
             for prompt_info in self.prompts_list : 
                if request in prompt_info.name : 
                    results.append(prompt_info)
        elif request_filter == "themes" : 
            
            matching_prompts = filter(
                lambda prompt_info : promptLibrary.theme_filter(prompt_info.themes , request) 
                , self.prompts_list)
            

            for prompt_info in matching_prompts :  
                results.append(prompt_info)

        return promptLibrary.prompt_list2json(results , self.ref_images_path , self.result_images_path)

    def prompt_list2json(prompt_list , ref_path , result_path) :
        json_data = {"prompts" : [] , 
                     "ref_images_path" : ref_path , 
                     "result_images_path" : result_path 
                     }
        for prompt_info in prompt_list : 
            json_data["prompts"].append(prompt_data.promptData.prompt_data2json(prompt_info))
        return json_data

    def delete_prompt(self , prompt) :
        prompt_to_delete = filter(lambda prompt_info : prompt_info.prompt == prompt , self.prompts_list)
        
        
        for prt in prompt_to_delete : 
            print("this is the prompt to delete : " , prt)
            if prt in self.prompts_list : 
                print("delete with success")
                self.prompts_list.remove(prt)
                return {
                    "status" : "true" ,
                     "error" : ""
                }
            else : 
                print("delete fail")
                return {
                    "false" : "true" ,
                     "error" : "error as occured during the delete of prompt"
                }
        

       


    