

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
    
    constructor(search_bar , filter_select , card_component_list) {
        this.search_bar = search_bar
        this.filter_select = filter_select
        this.card_component_list = card_component_list

        this.search_bar.addEventListener("keyup" , this.onSearchSubmit.bind(this))
        this.search_bar.addEventListener("input" , this.onInput.bind(this))
        
        
        console.log(typeof(this.filter_select))
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
            console.log(this.card_component_list)
            this.card_component_list.append(this.get_card_div(element))
        })
    }

    get_card_div(card_data) {

        var prompt_card = document.createElement("div")
        prompt_card.setAttribute("class" , "prompt-card")
        
        console.log("card created")

        var image_container = document.createElement("div")
        image_container.setAttribute("class" , "image-container")
        console.log("image container created")

        var result_image = document.createElement("img")
        
        var res_image = this.result_images_path + "/" + card_data.extra.result_image_path
        console.log("ressource image : " + res_image)
        result_image.setAttribute("src" , res_image)
        
        console.log("result image created")

        image_container.append(result_image)

        var text_container = document.createElement("div")
        
        text_container.setAttribute("class" , "text-container")

        var prompt_name = document.createElement("h4")
        
        prompt_name.textContent = card_data.name
        
        var prompt = document.createElement("p")
        
        prompt.textContent = card_data.prompt
        
        text_container.append(prompt_name , prompt)
        console.log("text container created")

        var tag_container = document.createElement("div")
        
        tag_container.setAttribute("class" , "tag-container")

        card_data.themes.forEach(element => {
            var tag = document.createElement("span")
            tag.textContent = element
            tag_container.append(tag)
        });
        console.log("tag container created")

        prompt_card.append(image_container , text_container , tag_container)
        prompt_card.addEventListener("contextmenu" , this.onCardRightClick.bind(this) , false)
        prompt_card.addEventListener("click" , this.onCardClick.bind(this) , false)
        
        return prompt_card
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