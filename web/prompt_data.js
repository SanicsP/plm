
export class promptData {
    
    
    constructor(name="untitled" , prompt , negative_prompt="" , description="" , themes=[""] , extra=null) 
    {
        this.name = name
        this.prompt = prompt
        this.negative_prompt = negative_prompt
        this.description = description
        this.themes = themes
        this.extra = extra

    }

    to_json () {
        return JSON.stringify(this)
    }
}

export class extraParams {
    constructor(custom_param_list=null , model_name=null , prompt_quality=1.0 , ref_image_path=null , result_image_path=null) {
        this.param_list = custom_param_list
        this.model_name = model_name
        this.prompt_quality = prompt_quality
        this.ref_image_path = ref_image_path
        this.result_image_path = result_image_path
    }
}


