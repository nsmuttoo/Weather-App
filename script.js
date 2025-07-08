
//console.log(fetchData("toronto"))

updateDisplay()

async function fetchData(location) {
    //https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
    //QQSTZFZTQ8UBLMN2E42YASRAZ

   // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=QQSTZFZTQ8UBLMN2E42YASRAZ

const response = await fetch ("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+location+"?key=QQSTZFZTQ8UBLMN2E42YASRAZ")
return await response.json()

}

async function processData(location) {

    const weatherObject = await fetchData(location)

    let goodWeather = {
        temp: weatherObject.currentConditions.temp,
        conditions: weatherObject.currentConditions.conditions,
        location: weatherObject.resolvedAddress

    }

    return goodWeather
    
}

async function updateDisplay() {
    const content = document.getElementById("content")
    const inputBox = document.createElement("input")
    const submitButton = document.createElement("button")
    const dataBox = document.createElement("div")
    submitButton.innerHTML = "Submit"
    const toggleFlag = document.createElement("button")
    toggleFlag.innerText = "F/C"

    toggleFlag.addEventListener("click",toggleFlagOnClick)

    function toggleFlagOnClick(){
        if (flag ==0){
            flag = 1
        }else {
            flag = 0
        }
        displayData()
    }

    let flag = 0
    
    let data = 0

    submitButton.addEventListener("click",submitButtonOnClick)

    content.appendChild(inputBox)
    content.appendChild(submitButton)
    
    content.appendChild(dataBox)
    content.appendChild(toggleFlag)

    async function submitButtonOnClick() {
        try{
        data =  await processData(inputBox.value)
        
        console.log(data)
        
        updateBackground(data.temp)
        displayData()
    }catch(error){
        alert("Sorry we couldn't find this location")
        inputBox.value = ""
    }
    }

    function displayData(){
        dataBox.innerHTML = ""

        const location = document.createElement("div")
        const temp = document.createElement("div")
        const conditions = document.createElement("div")

        location.innerText = data.location
        conditions.innerText = data.conditions

        if(flag ==0){
            store = (data.temp-32)*5/9
            store = Math.trunc(store)
            temp.innerText =  store + " C"

        }else{
            temp.innerText=data.temp + " F"
        }
        dataBox.appendChild(location)
        dataBox.appendChild(conditions)
        dataBox.appendChild(temp)

        


    }

    function updateBackground(temp){
        content.classList = ""
        
        if(temp > 90){
            content.classList.add("hot")
        }else if(temp > 70){
            
            content.classList.add("warm")
        }else if (temp > 50){
            content.classList.add("cool")
        }else if (temp <= 50){
            content.classList.add("cold")
        }


    }


    
}


