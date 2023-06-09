const state = {
    temp: 72,
    defaultCity: 'Seattle'
};

const increaseTemp = () => {
    state.temp++;
    tempValue.innerHTML = state.temp;
    changeTempColor();
}

const decreaseTemp = () => {
    state.temp--;
    tempValue.innerHTML = state.temp;
    changeTempColor();
}

// Change the color of the temperature text
const tempValue = document.querySelector("#tempValue");

// Change the landscape based on the temperature
const landscape = document.querySelector("#landscape");

const changeTempColor = () => {
    tempValue.classList.remove("red", "orange", "yellow", "green", "light-blue");
    
    if (state.temp >= 80) {
        tempValue.classList.add("red");
        landscape.innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (state.temp >= 70) {
        tempValue.classList.add("orange");
        landscape.innerHTML = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";

    } else if (state.temp >= 60) {
        tempValue.classList.add("yellow");
        landscape.innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";

    } else if (state.temp >= 50) {
        tempValue.classList.add("green");
        landscape.innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";

    } else if (state.temp <= 49) {
        tempValue.classList.add("light-blue");
        landscape.innerHTML = "❄️🥶🥶❄️🧣🧤❄️🎿🏔️❄️🧥🏂";
    }
}

const getRealtimeTemp = async () => {
    const headerCityName = document.querySelector("#headerCityName");

    try {
        // throw new Error('my error')
        // Calling web proxy server to call LocationIQ API
        const locationResponse = await axios.get("http://127.0.0.1:5000/location", {
            params: {
                q: headerCityName.innerHTML
            }
        })
            
        const lat = locationResponse.data[0]['lat'];
        const lon = locationResponse.data[0]['lon'];
        // console.log(lat);
        // console.log(lon);

        // Calling web proxy server to call Open Weather API
        const weatherResponse = await axios.get("http://127.0.0.1:5000/weather", {
            params: {
                "lat": lat,
                "lon": lon,
            }
        })
        const kelvinTemp = weatherResponse.data.main.temp;
        const fahrenheitTemp = convertKToF(kelvinTemp);
        tempValue.innerHTML = Math.round(fahrenheitTemp);
    } catch(e){
        console.error(e.message)
    }
}

const convertKToF = (temp) => {
    return (temp-273.15) * 9/5 + 32;
}

const changeSky = () => {
    const sky = document.querySelector("#sky")
    console.log('test')
    if (skySelection.value === "Sunny") {
        sky.innerHTML = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
        garden__content.classList.replace("sunny");
    } else if (skySelection.value === "Cloudy") {
        sky.innerHTML = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
        garden__content.classList.replace("cloudy");
    } else if (skySelection.value === "Rainy") {
        sky.innerHTML = "🌧🌈⛈️🌧🌧💧⛈️🌧🌦🌧💧🌧🌧";
        garden__content.classList.replace("rainy");
    } else {
        sky.innerHTML = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
        garden__content.classList.replace("snowy");
    }
};

const resetCityName = () => {
    cityNameInput.value = state.defaultCity;
};

const registerEventHandlers = () => {
    // Select increment and decrement buttons
    const incrementTemp = document.getElementById("increaseTempControl");
    const decrementTemp = document.getElementById("decreaseTempControl");
    const tempValue = document.querySelector("#tempValue");
    
    // Select the input element (typing in the city name)
    const cityNameInput = document.querySelector("#cityNameInput");
    const headerCityName = document.querySelector("#headerCityName");

    // Select the Get Realtime Temperature button
    const realtimeTemp = document.querySelector("#tempButton");

    // Select the drop down menu for the sky
    // const skySelection = document.querySelector("#skySelect");

    // Select the 'Reset' button 
    const resetButton = document.querySelector("#cityNameReset");
    
    // Add click event to buttons
    incrementTemp.addEventListener("click", increaseTemp);
    decrementTemp.addEventListener("click", decreaseTemp);
    realtimeTemp.addEventListener("click", getRealtimeTemp);

    // Add an event listener for the 'input' event
    cityNameInput.addEventListener("input", function(event) {
    // Code to execute when text is typed or changed in the input box
    headerCityName.innerHTML = event.target.value;
    });
    // // Change the sky when user selects a sky option in the dropdown menu
    // skySelection.addEventListener("change", changeSky);

    // Change the city name to default value (Seattle)
    resetButton.addEventListener("click", resetCityName);
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);

// // Select the drop down menu for the sky
const skySelection = document.querySelector("#skySelect");
// // Change the sky when user selects a sky option in the dropdown menu
skySelection.addEventListener("change", changeSky);