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

const changeTempColor = () => {
    tempValue.classList.remove("red", "orange", "yellow", "green", "light-blue");
    
    if (state.temp >= 80) {
        tempValue.classList.add("red");
    } else if (state.temp >= 70) {
        tempValue.classList.add("orange");
    } else if (state.temp >= 60) {
        tempValue.classList.add("yellow");
    } else if (state.temp >= 50) {
        tempValue.classList.add("green");
    } else if (state.temp <= 49) {
        tempValue.classList.add("light-blue");
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
