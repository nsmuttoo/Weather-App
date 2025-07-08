
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
    const inputBox = document.createElement("input")
    const submitButton = document.createElement("button")

    submitButton.addEventListener("click",submitButtonOnClick)

    document.body.appendChild(inputBox)
    document.body.appendChild(submitButton)

    async function submitButtonOnClick() {
        console.log(processData(inputBox.value))
    }


    
}


