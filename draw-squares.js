lastColor = ""
alternateDefault = false;
colorList = ["red", "#e03f3f", "#ff6b6b", "#ff906b", "#ff541b", "#de3800", "#a02800", "crimson", "#ed144d", "#e2a6b0"]
rectWidth = 10
rectHeight = 10
canvasId = 'pattern-board'
displayId = 'pattern-score'
serialId = 'pattern-code'


randomStyle = (colorList) => {
    let colorIndex = Math.floor(Math.random(0,1) * colorList.length)
    let color = colorList[colorIndex]
    if (color && color == lastColor) {
        alternateDefault = !alternateDefault;
        lastColor = color = alternateDefault ? "pink" : "tomato";
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
var canvas = document.createElement('canvas')
canvas.id = canvasId
canvas.width= 500
canvas.height = 500

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

draw = () => { drawPattern(canvas.width/rectWidth, canvas.height/rectHeight) }
clickHandler = document.getElementById(canvasId).addEventListener('click', draw)
document.addEventListener('keydown', (e) => { 
    if (e.key && (e.key == '32' || e.keyCode == '32')) draw()
})

document.onreadystatechange(draw());

