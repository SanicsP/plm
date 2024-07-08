

export class menu_bar {
    constructor(save_button , open_button , file_load) {
        this.save_button = save_button
        this.open_button = open_button
        this.file_load = file_load

        this.save_button.addEventListener("click" , this.onLibrarySave.bind(this) , false)
        this.open_button.addEventListener("click" , this.onLoadLibrary.bind(this) , false)
        this.file_load.addEventListener("change" , this.onFileLoaded.bind(this) , false)

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
            alert("library saved with success")
        }
        else {
            alert("library not saved")
        }
    }

    onLoadLibraryResponse(status) {
        if(status)
        {
            alert("library loaded with success")
        }
        else {
            alert("library not loaded")
        }
    }
}

export class library {
    constructor(search_bar , filter_select , card_component_list) {
        this.search_bar = search_bar
        this.filter_select = filter_select
        this.card_component_list = card_component_list

        this.search_bar.addEventListener("keyup" , this.onSearchSubmit.bind(this) )
        console.log(typeof(this.filter_select))
        this.library_data = null
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
        result_image.setAttribute("alt" , "image")

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
        
        return prompt_card
    }
}