

export class menu_bar {
    constructor(save_button , open_button , file_load , card_list_component) {
        this.save_button = save_button
        this.open_button = open_button
        this.file_load = file_load
        this.card_component_list = card_list_component
        this.save_button.addEventListener("click" , this.onLibrarySave.bind(this) , false)
        this.open_button.addEventListener("click" , this.onLoadLibrary.bind(this) , false)
        this.file_load.addEventListener("input" , this.onFileLoaded.bind(this) , false)

    }

    onLibrarySave() {
        eel.save_library()
    }

    onLoadLibrary() {
        this.file_load.click()
    }   

    onFileLoaded(event) {
        eel.load_library(event.target.files[0].name)
    }

    onLibrarySaveResponse(status) {
        if(status)
        {
            this.save_button.classList.toggle("saved")
            
            setTimeout(()=>{
                this.save_button.classList.toggle("saved")
                
            },
            200 
            )
            
        }
        else {
            alert("library not saved")
        }
    }

    onLoadLibraryResponse(result) {
        console.log(result)
        console.log("status :" + result.status)
        console.log("ref :" + result.ref_images_path)
        console.log("result :" + result.result_images_path)


    

        if(result.status)
        {
            
            this.card_component_list.ref_images_path = result.ref_images_path
            this.card_component_list.result_images_path = result.result_images_path
            this.card_component_list.onLibraryLoad()
        }
        else {
            alert("library not loaded")
        }

        console.log("load : " + result)

    }
}

export class library {
    
    libraries_dir = "web/libraries"
    
    constructor(search_bar , filter_select , card_component_list , detail_component) {
        this.search_bar = search_bar
        this.filter_select = filter_select
        this.card_component_list = card_component_list

        this.search_bar.addEventListener("keyup" , this.onSearchSubmit.bind(this))
        this.search_bar.addEventListener("input" , this.onInput.bind(this))
        
        this.detail_component = detail_component
        this.library_data = null

        this.ref_images_path = ""
        this.result_images_path = ""

        
    }

    onLibraryLoad() {
        eel.update_library_request(this.filter_select.value , this.search_bar.value.trim())
    }

    onInput(event) {
        eel.update_library_request(this.filter_select.value , this.search_bar.value.trim())
    }


    onSearchSubmit(event) {
        if(event.key === "Enter"){
            var filter = this.filter_select.value
            eel.update_library_request(filter , this.search_bar.value.trim())
        }        
    }

    onSearchResults(json_data) {
       if(json_data != null)
       {
            this.library_data = json_data
            this.ref_images_path = json_data.ref_images_path
            this.result_images_path = json_data.result_images_path

            console.log(this.library_data.prompts)
            this.update_library()
       }
       else {
        alert("request error")
       }
    }

    update_library() {
        this.card_component_list.innerHTML = ""
        this.library_data.prompts.forEach((element) => {
           
            this.card_component_list.append(this.get_card_div(element))
        })
    }

    get_card_div(card_data) {

        var prompt_card = document.createElement("div")
        prompt_card.setAttribute("class" , "prompt-card")
        
       

        var image_container = document.createElement("div")
        image_container.setAttribute("class" , "image-container")
     

        var result_image = document.createElement("img")
        
        var res_image = this.result_images_path + "/" + card_data.extra.result_image_path
       
        result_image.setAttribute("src" , res_image)
        
       
        image_container.append(result_image)

        var text_container = document.createElement("div")
        
        text_container.setAttribute("class" , "text-container")

        var prompt_name = document.createElement("h4")
        
        prompt_name.textContent = card_data.name
        
        var prompt = document.createElement("p")
        
        prompt.textContent = card_data.prompt
        
        text_container.append(prompt_name , prompt)
        

        var tag_container = document.createElement("div")
        
        tag_container.setAttribute("class" , "tag-container")

        card_data.themes.forEach(element => {
            var tag = document.createElement("span")
            tag.textContent = element
            tag_container.append(tag)
        });
       

        var icon_container = document.createElement("div")
        icon_container.setAttribute("class" , "icon-container")

        var more_icon = document.createElement("img")
        more_icon.setAttribute("src" , "resources/more2.svg")

        more_icon.addEventListener("click" , this.onMoreClick.bind(this) )
        icon_container.append(more_icon )

        prompt_card.append(image_container , text_container , tag_container , icon_container)

        prompt_card.addEventListener("contextmenu" , this.onCardRightClick.bind(this) , false)
        prompt_card.addEventListener("click" , this.onCardClick.bind(this) , false)
        
        return prompt_card
    }

    onMoreClick(event) {
        var selected_prompt = event.currentTarget.parentElement.
        parentElement.querySelector(".text-container").querySelector("p").textContent.trim()
        var selected_prompt_data = this.library_data.prompts.find((element)=> element.prompt == selected_prompt)     
        
        this.detail_component.show(selected_prompt_data)
        event.stopPropagation()
    }

    onCardRightClick(event) {
        var selected_card = event.currentTarget
        var prompt = selected_card.querySelector(".text-container p").textContent
        
        console.log("prompt delete request on : " + selected_card)
        
        console.log("the selected prompt is : " + prompt)
        
        eel.remove_prompt(prompt)
        
        event.preventDefault()
    }

    onDeleteResponse(result){
        console.log("delete response : " +JSON.stringify(result))
        if(result.status) {
            eel.update_library_request("prompts" , this.search_bar.value.trim())
        }
        else {
            alert(result.error)
        }

    }

    onCardClick(event) {
        console.log("prompt copied : ")
        var prompt = event.currentTarget.querySelector(".text-container p").textContent
        navigator.clipboard.writeText(prompt)
    }
}


export class details_panel{
    constructor(details_menu , prompt_name , prompt , negative_prompt ,
        description , theme_list , model_name , quality , param_list , ref_img ,
        result_img , close_button
        ) {
            this.details_menu = details_menu
            this.prompt_name = prompt_name
            this.prompt = prompt
            this.negative_prompt = negative_prompt
            this.description = description
            this.theme_list = theme_list
            this.model_name = model_name
            this.quality = quality 
            this.param_list = param_list
            this.ref_img = ref_img
            this.result_img = result_img
            this.close_button = close_button
            close_button.addEventListener("click" , (element)=> {
                this.details_menu.style = "visibility : hidden;"
            })

            window.addEventListener("keydown" , (element)=>{
                this.details_menu.style = "visibility : hidden;"
            })
            
    }

    show(prompt_data) {
        this.details_menu.style = "visibility : visible;"
        
        this.prompt_name.textContent = prompt_data.name
        
        this.prompt.textContent = prompt_data.prompt
        
        this.negative_prompt.textContent = prompt_data.negative_prompt
        
        this.description.textContent = prompt_data.description
        
       
        this.theme_list.innerHTML = ""

        for(var i = 0 ; i < prompt_data.themes.length ; i++) {
            var theme = document.createElement("span")
            theme.textContent = prompt_data.themes[i]
            this.theme_list.append(theme)

        }
        this.param_list.innerHTML = ""

        for(var i = 0 ; i < prompt_data.extra.param_list.length ; i++) {
            var parameter = document.createElement("div")
            parameter.setAttribute("class" , "parameter")
            var name_span = document.createElement("span")
            name_span.setAttribute("class" , "param-name-info")
            name_span.textContent = prompt_data.extra.param_list[i].param_name

            var value_span = document.createElement("span")
            value_span.setAttribute("class" , "param-value-info")
            value_span.textContent = prompt_data.extra.param_list[i].param_value
            
            parameter.append(name_span , value_span)
            this.param_list.append(parameter)
        }

        this.model_name.textContent = prompt_data.extra.model_name
        this.quality.textContent = "Quality : " + prompt_data.extra.prompt_quality

    }
}