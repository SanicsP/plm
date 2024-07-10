import * as prompt_data from "/prompt_data.js"


export class required_data_component {
    constructor(prompt_name , prompt , negative_prompt , description) {
        this.prompt_name = prompt_name
        this.prompt = prompt
        this.negative_prompt = negative_prompt
        this.description = description
    }


    get required_data() {
        return {
            name : this.prompt_name.value,
            prompt : this.prompt.value,
            negative_prompt : this.negative_prompt.value,
            description : this.description.value
        }
    }
}

export class themes_component {
    constructor(theme_bar , add_theme_button , theme_list_div , delete_theme_button_class_name) {
        this.theme_bar = theme_bar
        this.add_theme_button = add_theme_button
        this.theme_list_div = theme_list_div 
        this.delete_theme_button_class_name = delete_theme_button_class_name
        
        var delete_buttons_list = Array.from(document.getElementsByClassName(this.delete_theme_button_class_name))
        
        delete_buttons_list.forEach(element => {
            element.addEventListener("click" , this.delete_tag.bind(this) , false)
        });

        this.add_theme_button.addEventListener("click" , this.add_tag.bind(this) , false)
        this.theme_bar.addEventListener("keydown" , this.onBarConfirm.bind(this))
        this.theme_list = []
    }

    delete_tag(event) {
        var theme_to_remove = event.target.parentNode.textContent.trim()

        console.log("remove theme : " + theme_to_remove)

        this.theme_list.splice(this.theme_list.indexOf(theme_to_remove) , 1)
        event.target.parentNode.remove()
        console.log("tag list : " + this.theme_list)

    }

    onBarConfirm(event){
        if(event.code == "Enter") {
            this.add_tag(event)
        }
        else if (event.code == "Escape") {
            this.theme_list_div.innerHTML = ""
            this.theme_list = []
        }
    } 

    add_tag(event) {
        
        
        var theme_text = this.theme_bar.value.trim()
        if (theme_text== "" || this.theme_list.includes(theme_text)) {
            return   
        }

        this.theme_list.push(theme_text)
        
        var tag_sapn = document.createElement("span")
        
        tag_sapn.setAttribute("class" , "theme-tag")
        
        tag_sapn.textContent += theme_text
        
        var delete_button_span = document.createElement("span")

        delete_button_span.addEventListener("click" , this.delete_tag.bind(this) , false)
        
        delete_button_span.setAttribute("class" , "delete-icon delete-theme-button")
        
        tag_sapn.append(delete_button_span)

        this.theme_list_div.append(tag_sapn)

        console.log("tag list : " + this.theme_list)
        if(event.target.type =="text"){
            event.target.value = ""
        }

    }

    get themes() {
        return this.theme_list
    }
}

export class additional_param_component {
    constructor(add_param_button , custom_param_list , param_name_class_name , 
        param_value_class_name , delete_param_button_class_name) {
            
            this.add_param_button = add_param_button
            this.custom_param_list = custom_param_list
            this.param_name_class_name = param_name_class_name
            this.param_value_class_name = param_value_class_name
            this.delete_param_button_class_name = delete_param_button_class_name
            
            var delete_button_list = Array.from(document.getElementsByClassName(delete_param_button_class_name))
            delete_button_list.forEach((element) => {
                element.addEventListener("click" , this.delete_param.bind(this) , false)
            })

            this.add_param_button.addEventListener("click" , this.add_param.bind(this) , false)
       

    }

    delete_param(event) {
        event.target.parentNode.remove()
    }

    add_param(event) {
        
        
        var param_div = document.createElement("div")
        param_div.setAttribute("class" , "param")
        var param_name_text = document.createElement("input")
        param_name_text.setAttribute("placeholder" , "param name..")
        param_name_text.setAttribute("type" , "text")
        param_name_text.setAttribute("class" , "param-name")

        var param_value_text = document.createElement("input")
        param_value_text.setAttribute("placeholder" , "param value..")
        param_value_text.setAttribute("type" , "text")
        param_value_text.setAttribute("class" , "param-value")

        var delete_param_button = document.createElement("span") 
        delete_param_button.setAttribute("class" , "delete-icon delete-param")
        delete_param_button.addEventListener("click" , this.delete_param.bind(this) , false)
        param_div.append(param_name_text , param_value_text , delete_param_button)
        this.custom_param_list.append(param_div)

        console.log(this.params_list)

    }
    
    get params_list() {
        var param_list = Array.from(this.custom_param_list.querySelectorAll(".param"))
        var param_data_list = []
        
        param_list.forEach((element) => {
            param_data_list.push(this.get_param_data(element))
        })
        
        return param_data_list
    }

    get_param_data(paramElement) {
        
        
        return {
            param_name : paramElement.querySelector(".param-name").value.trim(),
            param_value : paramElement.querySelector(".param-value").value.trim()

        }
    }

}

export class more_details_component {
    constructor(model_name , prompt_quality , result_image_div , ref_image_div , result_image_file , ref_image_file , prompt_quality_value) {
        this.model_name = model_name
        this.prompt_quality = prompt_quality
        this.result_image_div = result_image_div
        this.ref_image_div = ref_image_div
        this.result_image_file = result_image_file
        this.ref_image_file = ref_image_file
        this.prompt_quality_value = prompt_quality_value
        this.result_image_div.addEventListener("click" , this.onResultUploadClick.bind(this) , false)
        this.ref_image_div.addEventListener("click" , this.onRefUploadClick.bind(this) , false)

        this.result_image_file.addEventListener("change" , this.onResultFileLoad.bind(this) , false)
        this.ref_image_file.addEventListener("change" , this.onRefFileLoad.bind(this) , false)

        this.prompt_quality.addEventListener("input" , this.onSliderChange.bind(this))
        
        this.is_valid = true
        

        this.ref_file_name = ""
        this.result_file_name = ""

        


      

      

    }

   

    onSliderChange(event) {
        var new_value = event.target.value
        this.prompt_quality_value.textContent = "Quality : " + new_value + "/10"
        //console.log(event.target)
        
    }

    onRefUploadClick() {
        this.ref_image_file.click()
    }

    onResultUploadClick() {
        this.result_image_file.click()

    }

    onRefFileLoad(event) 
    {
        console.log(event.target.files[0].name)
        this.ref_image_div.style = `
            background-color : #412E54;
            color : white;
        `
    }

    onResultFileLoad(event) {
        console.log(event.target.files[0].name)
        this.result_image_div.style = `
            background-color : #412E54;
            color : white;
        `
    }

    get_data() {
        
        var ref_path = ""
        var result_path = ""
        try {

            var ref_path = this.ref_image_file.files[0].name
            var result_path = this.result_image_file.files[0].name 
        }
        catch(TypeError){

        }
        
        console.log(ref_path + " " + result_path )
        return {
            model_name : this.model_name.value ,
            prompt_quality : this.prompt_quality.value ,
            ref_image_name : ref_path  ,
            result_image_name : result_path
        }
        
    }
    
}

export class prompt_creation_component {
    constructor(required_component , theme_component ,
         additional_component , more_component , save_prompt_button , log_text) {
        this.required_component = required_component,
        this.theme_component = theme_component , 
        this.additional_component = additional_component
        this.more_component = more_component
        this.save_prompt_button = save_prompt_button
        this.log_text = log_text
        this.prompt_info = new prompt_data.promptData()

        this.save_prompt_button.addEventListener("click" , this.save_prompt.bind(this) , false)

    }

    save_prompt() {
        var required_info = this.required_component.required_data
        this.prompt_info.name = required_info.name.trim()
        this.prompt_info.prompt = required_info.prompt.trim()
        this.prompt_info.negative_prompt = required_info.negative_prompt.trim()
        this.prompt_info.description = required_info.description.trim()
        
        var theme_info = this.theme_component.themes
        this.prompt_info.themes = theme_info

        var extra = new prompt_data.extraParams()
        
        extra.param_list = this.additional_component.params_list
        var more_info = this.more_component.get_data()
        extra.model_name = more_info.model_name.trim()
        extra.prompt_quality = more_info.prompt_quality.trim()
        extra.ref_image_path = more_info.ref_image_name
        extra.result_image_path =  more_info.result_image_name

        this.prompt_info.extra = extra


       


        var validation_data = this.verify_information()
        if(validation_data.status) {
            eel.add_prompt(JSON.stringify(this.prompt_info))()
            this.log_prompt()
            var files = document.querySelectorAll('input[type="file"]')
            files.forEach((element)=>{
                element.type = "text"
                element.type = "file"
                element.parentElement.style = ""
            })
        }
        else{
            this.log_errors(validation_data)
            this.prompt_info = new prompt_data.promptData()
        }


    }   

    verify_information() {

        var validation_data = {
            status : true ,
            result_msg : []
        }

      
        if(this.prompt_info.name === "") {
            this.prompt_info.name = "untitled"
        }
        if(this.prompt_info.prompt === "") {
            
            validation_data.status = false

            validation_data.result_msg.push("The prompt is empty")

        }

        if(this.prompt_info.extra.length != 0 ) {
            this.prompt_info.extra.param_list.forEach((param) => {
                if(param.param_name === "" || param.param_value === "")
                {
                    validation_data.status = false
                    validation_data.result_msg.push("one additional parameter has empty value or name")
                }})
        }

        
        return validation_data
    }

    log_errors(validation_data) {
        this.clear_console()
        
      
        for(var i = 0 ; i < validation_data.result_msg.length ; i++)
        {
            this.log_error(">\t" + validation_data.result_msg[i])
        }

        
    }

    log_prompt() {
        this.clear_console()
        var output_text = "> Prompt Added ! \n your prompt : \n" + JSON.stringify(this.prompt_info , null , "\t")
        this.log_console(output_text)
    }

    onAddPromptResponse(response) {
        
        if(!response.status) {
            console.log(response)

            this.clear_console()
            
            var error_msg = response.error_msg
            console.log(error_msg)
            this.log_error(error_msg)
        }
    }

    log_console(text) {
        var output = document.createElement("p")
        output.textContent = text
        this.log_text.append(output)
    }

    log_error(text) {
        var output = document.createElement("p")
        output.textContent = text
        output.style = ` color : red`
        this.log_text.append(output)
    }

    clear_console() {
        this.log_text.innerHTML = ""
    }
}

export class menu_bar_component{
    constructor(save_button) {
        this.save_button = save_button
        this.save_button.addEventListener("click" , this.onSaveLibrary.bind(this) , false)
    }

    onSaveLibrary() {
        eel.save_library()()
    }

    onSaveLibraryResponse(status) {
        if(status) {
            alert("library saved with succes")
        }
        else {
            alert("library not saved")
        }
    }

}