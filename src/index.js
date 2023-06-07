const state = {
    temp: 72
};

// Default value 72;
// let temp = 72;
// tempValue.innerHTML = temp;

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

const registerEventHandlers = () => {
    // Select increment and decrement buttons
    const incrementTemp = document.getElementById("increaseTempControl");
    const decrementTemp = document.getElementById("decreaseTempControl");
    const tempValue = document.querySelector("#tempValue");

    // Add click event to buttons
    incrementTemp.addEventListener("click", increaseTemp);
    decrementTemp.addEventListener("click", decreaseTemp);
    tempValue.innerHTML = state.temp;
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);
