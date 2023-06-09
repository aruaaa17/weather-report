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

// Change temp text color and landscape emoji based on temp
const changeTempColor = () => {
    const tempValue = document.querySelector("#tempValue");
    const landscape = document.querySelector("#landscape");

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
        // Calling web proxy server to call LocationIQ API
        const locationResponse = await axios.get("http://127.0.0.1:5000/location", {
            params: {
                q: headerCityName.innerHTML
            }
        })
            
        const lat = locationResponse.data[0]['lat'];
        const lon = locationResponse.data[0]['lon'];

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
        state.temp = Math.round(fahrenheitTemp);
        changeTempColor();

    } catch(error){
        console.error(error.message)
    }
}

const convertKToF = (temp) => {
    return (temp-273.15) * 9/5 + 32;
}

const changeSky = (skySelection) => {
    const sky = document.querySelector("#sky");
    const gardenContent = document.getElementById("gardenContent");
    
    if (skySelection.value === "Sunny") {
        sky.innerHTML = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
        gardenContent.classList.replace(gardenContent.classList[1], "sunny");

    } else if (skySelection.value === "Cloudy") {
        sky.innerHTML = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
        gardenContent.classList.replace(gardenContent.classList[1], "cloudy");

    } else if (skySelection.value === "Rainy") {
        sky.innerHTML = "🌧🌈⛈️🌧🌧💧⛈️🌧🌦🌧💧🌧🌧";
        gardenContent.classList.replace(gardenContent.classList[1], "rainy");
    } else {
        sky.innerHTML = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
        gardenContent.classList.replace(gardenContent.classList[1], "snowy");
    }
};

const resetCityName = () => {
    cityNameInput.value = state.defaultCity;
    headerCityName.innerHTML = state.defaultCity;
    getRealtimeTemp();
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
    const skySelection = document.querySelector("#skySelect");

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
    // Change the sky when user selects a sky option in the dropdown menu
    skySelection.addEventListener("change", function() {
        changeSky(skySelection);
    });

    // Change the city name to default value (Seattle)
    resetButton.addEventListener("click", resetCityName);
    // When the page loads, get the current temp of Seattle
    getRealtimeTemp();
    // When the page loads, the default city in "City Name" textbox is Seattle
    cityNameInput.value = state.defaultCity;
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);
