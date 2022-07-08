const canvas = document.querySelector('.canvas');

function makeGrid (rows, cols) {
    canvas.style.setProperty('--grid-rows', rows);
    canvas.style.setProperty('--grid-cols', cols);
    for (i=0; i < (rows * cols); i++) {
        let pixel = document.createElement('div');
        pixel.addEventListener('mouseover', paint);
        pixel.className = "pixel";
        canvas.appendChild(pixel);
    };
};

function paint (e) {
    let brush = e.target.style;
    brush.backgroundColor = "green";
}

document.getElementById("slider").oninput = function() {
    sliderOutput();
    newGrid();
}

const sliderOutput = () => {
    let val = document.getElementById('slider').value // retrieves slider value
    document.getElementById('sliderOut').textContent = val + 'x' + val // displays slider value
}

const newGrid = () => {
    let val = document.getElementById('slider').value // retrieves slider value
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild);
    }
    makeGrid(val, val);
}

makeGrid(16, 16);
sliderOutput();