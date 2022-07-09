const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#008000';
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;


const canvas = document.querySelector('.canvas');
const rainbow = document.querySelector('.rainbowBtn');
const color = document.querySelector('.colorBtn');
const colorPicker = document.querySelector('.colorPanel');
const eraser = document.querySelector('.eraserBtn');
const reset = document.querySelector('.reset');
const size = document.getElementById('slider').value 


// Changes current color and mode
function setCurrentColor(newColor) {
    currentColor = newColor
}
function setCurrentMode(newMode) {
    modeChange(newMode);
    currentMode = newMode;
}

// changes variables when the buttons are pressed
colorPicker.oninput = (e) => (setCurrentColor(e.target.value));
color.onclick = () => setCurrentMode('color');
rainbow.onclick = () => setCurrentMode('rainbow');
eraser.onclick = () => setCurrentMode('eraser');
reset.onclick = () => newGrid();

// Makes the grid and adds the event listeners to each created div
function makeGrid (rows, cols) {
    canvas.style.setProperty('--grid-rows', rows);
    canvas.style.setProperty('--grid-cols', cols);
    for (i=0; i < (rows * cols); i++) {
        let pixel = document.createElement('div');
        pixel.addEventListener('mouseover', paint);
        pixel.addEventListener('mousedown', paint);
        pixel.className = "pixel";
        canvas.appendChild(pixel);
    };
};

// Sets up mouse down logic so it will only draw when you click down and drag
let mouseDown = false;
document.body.onmousedown = () => (mouseDown=true);
document.body.onmouseup= () => (mouseDown=false);


// Paints the grid by changing backgorund color. Checks to see if you are clicking first
function paint (e) {
    let brush = e.target.style;
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'rainbow') {
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        brush.backgroundColor = `rgb(${R}, ${G}, ${B})`
    } else if (currentMode === 'color') {
    brush.backgroundColor = currentColor;
    } else {
        brush.backgroundColor = 'rgb(245, 245, 220)'
    }
}

// Changes grid size and silder text when the slider is moved
document.getElementById("slider").oninput = function() {
    sliderOutput();
    newGrid();
}

// Get slider output and displays it
const sliderOutput = () => {
    let val = document.getElementById('slider').value 
    document.getElementById('sliderOut').textContent = val + 'x' + val
    let currentSize = val
}

// Makes a new grid by removing the old one and creating the new one to the correct size based on the slider
const newGrid = () => {
    let val = document.getElementById('slider').value // retrieves slider value
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild);
    }
    makeGrid(val, val);
}

const modeChange = (newMode) => {
    if(currentMode === 'color') {
        color.classList.remove('active')
    } else if(currentMode === 'rainbow') {
        rainbow.classList.remove('active')
    } else {
        eraser.classList.remove('active')
    }
    if(newMode === 'color') {
        color.classList.add('active')
    } else if(newMode === 'rainbow') {
        rainbow.classList.add('active')
    } else {
        eraser.classList.add('active')
    }
}



makeGrid(16, 16);
sliderOutput();