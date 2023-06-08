

const state = {
    temp: 72
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

const getRealtimeTemp = () => {
// When button is clicked, update and display realtime temp of the currently displayed city name
// Get the latitude and longitude of a city using LocationIQ
// Use the latitude and longitude to get current weather data from OpenWeather
// The web proxy does both of these requests
    const headerCityName = document.querySelector("#headerCityName");

    // Calling web proxy server to call LocationIQ
    axios.get("http://127.0.0.1:5000/location", {
        params: {
            q: headerCityName.innerHTML
        }
    })
        .then(function (response) {
            const lat = response.data[0]['lat'];
            const lon = response.data[0]['lon'];
            console.log(lat);
            console.log(lon);

            // Calling web proxy server to call Open Weather
            axios.get("http://127.0.0.1:5000/weather", {
                params: {
                    "lat": lat,
                    "lon": lon,
                    "units": "imperial"
                }
            })
            .then(function (response) {
                const currentTemp = response.data.main.temp;
            })
            .catch(function(error) {
                console.log(error);
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}

const registerEventHandlers = () => {
    // Select increment and decrement buttons
    const incrementTemp = document.getElementById("increaseTempControl");
    const decrementTemp = document.getElementById("decreaseTempControl");
    const tempValue = document.querySelector("#tempValue");
    
    // Select the input element (typing in the city name)
    const cityNameInput = document.querySelector("#cityNameInput");
    const headerCityName = document.querySelector("#headerCityName");

    // // Select the Get Realtime Temperature button
    const realtimeTemp = document.querySelector("#tempButton");

    // Add click event to buttons
    incrementTemp.addEventListener("click", increaseTemp);
    decrementTemp.addEventListener("click", decreaseTemp);
    tempValue.innerHTML = state.temp;
    realtimeTemp.addEventListener("click", getRealtimeTemp);

    // Add an event listener for the 'input' event
    cityNameInput.addEventListener("input", function(event) {
    // Code to execute when text is typed or changed in the input box
    headerCityName.innerHTML = event.target.value;
});
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);

