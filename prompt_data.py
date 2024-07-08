import json


class extraParams : 
    def __init__(self , custom_params : list[tuple] = [] , model_name : str = "", prompt_quality : str = "", 
                 ref_image_name : str ="" , result_image_name : str ="") : 
        self.custom_params = custom_params
        self.model_name = model_name
        self.prompt_quality = prompt_quality 
        self.ref_image_name = ref_image_name
        self.result_image_name = result_image_name
    
    def __str__(self) -> str:
        return str(vars(self).items())
        
class promptData :
    def __init__(self , name : str="" , prompt : str="" , negative_prompt : str=""  , description : str="", 
                 themes : list[str] = [], extra=None) :
        self.name : str = name
        self.prompt : str = prompt 
        self.negative_prompt : str = negative_prompt
        self.description : str = description
        self.themes : list[str] = themes 
        self.extra : extraParams = extra

    def json2prompt_data(json_data_string):
        json_data = json.loads(json_data_string)
        prompt_data = promptData()

        prompt_data.name = json_data["name"]
        prompt_data.prompt = json_data["prompt"]
        prompt_data.negative_prompt = json_data["negative_prompt"]
        prompt_data.description = json_data["description"]
        prompt_data.themes = json_data["themes"]

        extra = extraParams()

        extra.param_list = json_data["extra"]["param_list"]
        extra.model_name = json_data["extra"]["model_name"]
        extra.prompt_quality = json_data["extra"]["prompt_quality"]
        extra.ref_image_name = json_data["extra"]["ref_image_path"]
        extra.result_image_name = json_data["extra"]["result_image_path"]

        prompt_data.extra = extra

        return prompt_data
    
    def prompt_data2json(prompt_info) : 
        
        json_data = {}
        json_data["name"] = prompt_info.name
        json_data["prompt"] = prompt_info.prompt
        json_data["negative_prompt"] = prompt_info.negative_prompt
        json_data["description"] = prompt_info.description
        json_data["themes"] = prompt_info.themes
        
        json_data["extra"] = {}
        json_data["extra"]["param_list"] = prompt_info.extra.param_list
        json_data["extra"]["model_name"] = prompt_info.extra.model_name
        json_data["extra"]["prompt_quality"] = prompt_info.extra.prompt_quality
        json_data["extra"]["ref_image_path"] = prompt_info.extra.ref_image_name
        json_data["extra"]["result_image_path"] =prompt_info.extra.result_image_name

        return json_data
    
        pass
    def dict2prompt_data(data : dict) :
        prompt_data = promptData()

        prompt_data.name = data["name"]
        prompt_data.prompt = data["prompt"]
        prompt_data.negative_prompt = data["negative_prompt"]
        prompt_data.description = data["description"]
        prompt_data.themes = data["themes"]

        extra = extraParams()

        extra.param_list = data["extra"]["param_list"]
        extra.model_name = data["extra"]["model_name"]
        extra.prompt_quality = data["extra"]["prompt_quality"]
        extra.ref_image_name = data["extra"]["ref_image_path"]
        extra.result_image_name = data["extra"]["result_image_path"]

        prompt_data.extra = extra
        return prompt_data
    
    def __str__(self) -> str:
        return str(vars(self).items())    