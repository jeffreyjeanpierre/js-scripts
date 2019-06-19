lastColor = ""
alternateDefault = false;
colorList = ["black", "black", "black", "white", "black", "white", "white", "black", "black", "white"]
rectWidth = 10
rectHeight = 10
canvasId = 'pattern-board'
displayId = 'pattern-score'
serialId = 'pattern-code'
cols = canvas.height/rectHeight
rows = canvas.width/rectWidth
imageWidth = window.innerWidth /5
imageHeight = window.innerHeight /5

randomStyle = (colorList) => {
    let colorIndex = Math.floor(Math.random(0,1) * colorList.length)
    let color = colorList[colorIndex]
    if (color && color == lastColor) {
        alternateDefault = !alternateDefault;
        lastColor = color = alternateDefault ? "673ab7" : "9c27b0";
        return color;
    }
    lastColor = color;
    return color;
}

drawColumns = (currentRow, columns, context) => {
    for (let col = 0; col < columns; col++) {
        let xcoord = (rectWidth*col)
        let ycoord = (rectHeight*currentRow)
        let color = randomStyle(colorList);
        context.fillStyle = color;
        context.fillRect(xcoord, ycoord, rectWidth, rectHeight);
        context.stroke();
    }
   
}

drawPattern = (rows, cols) => {
    var ctx = canvas.getContext("2d");
    for (let row = 0; row < rows; row++) {
        drawColumns(row, cols, ctx);
    }
}

// create a map of what the "block" will look like
// as the drawPattern iterates, if the row/col is in this map
// then instead of drawing a pattern as expected,
// it should draw what is mapped in the "block"
// example: a row of 5 columns is expecting a 2 column "block" in "row 1, column 3" and "row 1, column 4"
// therefore when we're on those corresponding coordinates, instead of printing the random color, print the "block"
// this should result in an "image" that contains precalculated "blocks" and should theoretically be configurable for "patterns"
// in other words, the output of the pattern is called an image (the whole thing) which contains blocks
// ideally the block builder should be able to define patterns programatically,
// such as adding a border around the image
// or creating white squares that are 2x2 rectangle width wide
// and from now on refer to rectangle widths as rexels (portmanteau for rectangular pixels) 
blockBuilder = () => {}
checkBlock = () => {}
addImageBorder = () => {}

var canvas = document.createElement('canvas')
canvas.id = canvasId
canvas.width = imageWidth
canvas.height = imageHeight

var display = document.createElement('display')
display.id = displayId
display.width = 50
display.height = 50

var serial = document.createTextNode('serial')
serial.id = serialId
serial.width = 50
serial.height = 50

body = document.getElementsByTagName("BODY")[0]
body.appendChild(canvas)
body.appendChild(display)
body.appendChild(serial)

draw = () => { drawPattern(rows, cols) }
clickHandler = document.getElementById(canvasId).addEventListener('click', draw)
document.addEventListener('keydown', (e) => { 
    if (e.key && (e.key == '32' || e.keyCode == '32')) draw()
})

document.onreadystatechange(draw());
