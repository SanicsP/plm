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

    def __str__(self) -> str:
        return str(vars(self).items())    