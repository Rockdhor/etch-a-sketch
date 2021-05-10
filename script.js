function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let d = max - min;
    let h;
    if (d === 0) h = 0;
    else if (max === r) h = (g - b) / d % 6;
    else if (max === g) h = (b - r) / d + 2;
    else if (max === b) h = (r - g) / d + 4;
    let l = (min + max) / 2;
    let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    return [h * 60, s, l];
  }

const handleSlide = (e) => {
    generateBoard(e.target.value);
}

const changeMode = (e) => {
    buttons.forEach(button => button.classList.remove("active"));
    e.target.classList.add('active');
    paintMode = e.target.attributes[0].nodeValue;
}

const changeColor = (e) => {
    switch (paintMode) {
        case "color":
            e.target.style.backgroundColor = document.getElementById("color").value;
            break;
        case "rainbow":
            e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
            break;
        case "darken":
            let dk = e.target.style.backgroundColor;
            dk = dk.split(",");
            dk[0] = parseInt(dk[0].substring(4,dk[0].length));
            dk[1] = parseInt(dk[1]);
            dk[2] = parseInt(dk[2]);
            let hsl = rgbToHsl(dk[0], dk[1], dk[2]);
            hsl[1] *=100;
            hsl[2] = (hsl[2] <= 0.1 ? 0 : hsl[2] - .1)*100;
            e.target.style.backgroundColor = `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`
            break;
        case "lighten":
            let bg = e.target.style.backgroundColor;
            bg = bg.split(",");
            bg[0] = parseInt(bg[0].substring(4,bg[0].length));
            bg[1] = parseInt(bg[1]);
            bg[2] = parseInt(bg[2]);
            let nhsl = rgbToHsl(bg[0], bg[1], bg[2])
            nhsl[1] *=100;
            nhsl[2] = (nhsl[2] >= 0.9 ? 1 : nhsl[2] + .1)*100;
            e.target.style.backgroundColor = `hsl(${nhsl[0]},${nhsl[1]}%,${nhsl[2]}%)`
            break;

        default :
            break;
        
    }
    
}
const colorInput = (e) => {
    buttons.forEach(button => button.classList.remove("active"));
    document.querySelector('[data-mode="color"]').classList.add('active');
}

const generateBoard = (gridSize) => {
    grid.innerHTML = "";
    for (let index = 0; index < (gridSize*gridSize); index++) {
        let node = document.createElement("div");
        node.classList.add("node");
        node.style.backgroundColor = "rgb(255, 255, 255)";
        node.addEventListener("mouseover", changeColor);
        grid.appendChild(node)
    }
    let gridSizeString = "";
    for (let index = 0; index < gridSize; index++) {
        gridSizeString += "1fr ";
    
    }
    grid.style.gridTemplateColumns = (gridSizeString);
    grid.style.gridTemplateRows = (gridSizeString);
}

let paintMode = "color";
const grid = document.getElementById("gridContainer");

let headerText = "Etch-a-Sketch!";
let header = document.getElementById("header");
headerText.split("").map((c) => {
    let span = document.createElement("span");
    span.textContent = c;
    span.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    
    header.appendChild(span)
})

generateBoard(16);


const buttons = Array.from(document.getElementsByClassName("mode"));
buttons.forEach(button => button.addEventListener("click", changeMode));
let slider = document.getElementById("size");
slider.addEventListener("change", handleSlide) 
let colorChanger = document.getElementById("color");
colorChanger.addEventListener("change", colorInput) 