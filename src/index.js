// Select increment and decrement buttons
const incrementCount = document.getElementById("increaseTempControl");
const decrementCount = document.getElementById("decreaseTempControl");

const changeElement = document.querySelector("#tempValue");

// Default value 72;
let count = 72;
changeElement.innerHTML = count;

const increaseTemp = () => {
    count++;
    changeElement.innerHTML = count;
}

const decreaseTemp = () => {
    count--;
    changeElement.innerHTML = count;
}

// Add click event to buttons
incrementCount.addEventListener("click", increaseTemp);
decrementCount.addEventListener("click", decreaseTemp);