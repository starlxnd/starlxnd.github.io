const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let grid = [];

for (let i = 0; i < 100; i++){

    let tempArr = [];
    for (let j = 0; j < 100; j++) tempArr.push(i ^ j); // CHANGE THIS !!!!
    grid.push(tempArr);

};

const camX = -50;
const camY = 50;
const camZ = 50;
const camAng = Math.PI/3;

function perspective(point){

    let xDiff = point[0] - camX;
    let yDiff = point[1] - camY;
    let zDiff = point[2] + camZ;

    let zMax = camZ + (xDiff * Math.tan(camAng));
    let zMin = camZ - (xDiff * Math.tan(camAng));
    let yMax = camY + (xDiff * Math.tan(camAng));
    let yMin = camY - (xDiff * Math.tan(camAng));

    let newY = canvas.width * (point[1] - yMin)/(yMax - yMin);
    let newZ = canvas.height * (point[2] - zMin)/(zMax - zMin);

    return [newY, canvas.height-newZ];

};

function drawLine(pointA, pointB){

    ctx.beginPath();
    ctx.moveTo(...pointA);
    ctx.lineTo(...pointB);
    ctx.stroke();

};

function render(){
    
    for (let y = 0; y < grid.length; y++){
        for (let x = 0; x < grid[y].length; x++){

            let point = [x, y, grid[y][x]];
            if (x > 0) drawLine(perspective(point), perspective([x-1, y, grid[y][x-1]]));
            if (y > 0) drawLine(perspective(point), perspective([x, y-1, grid[y-1][x]]));
            if (x < grid[y].length - 1) drawLine(perspective(point), perspective([x+1, y, grid[y][x+1]]));
            if (y < grid.length - 1) drawLine(perspective(point), perspective([x, y+1, grid[y+1][x]]));

        }
    }
};

window.onload = function () {
    render();
};