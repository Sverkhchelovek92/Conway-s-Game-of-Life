const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const res = 10;
const cols = canvas.width / res;
const rows = canvas.height / res;

const startButton = document.querySelector(".start-btn");
const stopButton = document.querySelector(".stop-btn");
const resetButton = document.querySelector(".reset-btn");

// Create grid

function make2DArray(c, r) {
  let arr = new Array(c);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(r);
  }
  return arr;
}

let grid = make2DArray(cols, rows);

// Fill grid

function fillGrid(grid) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
}

fillGrid(grid);

console.log(grid);

// Draw grid

function drawGrid(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      ctx.beginPath();
      ctx.rect(col * res, row * res, res, res);
      ctx.fillStyle = cell ? "green" : "black";
      ctx.fill();
      ctx.stroke();
    }
  }
}

drawGrid(grid);

// Count neighbors

function countNeighbors(grid, x, y) {
  let neighborsCount = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const neighborX = x + i;
      const neighborY = y + j;

      if (
        neighborX >= 0 &&
        neighborX < cols &&
        neighborY >= 0 &&
        neighborY < rows
      ) {
        neighborsCount += grid[neighborX][neighborY];
      }
    }
  }

  return neighborsCount;
}

// Making new grid

function updateGrid(grid) {
  let newGrid = grid.map((arr) => [...arr]);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = grid[i][j];
      const neighborsNum = countNeighbors(grid, i, j);

      if (cell === 1 && (neighborsNum < 2 || neighborsNum > 3)) {
        newGrid[i][j] = 0;
      } else if (cell === 0 && neighborsNum === 3) {
        newGrid[i][j] = 1;
      }
    }
  }

  return newGrid;
}

function drawNewGrid() {
  if (animation === true) {
    grid = updateGrid(grid);
    drawGrid(grid);
  }
}

// Animation & Buttons

let animation = false;

startButton.addEventListener("click", () => {
  animation = true;
});

stopButton.addEventListener("click", () => {
  animation = false;
});

resetButton.addEventListener("click", () => {
  animation = false;
  grid = make2DArray(cols, rows);
  fillGrid(grid);
  drawGrid(grid);
});

setInterval(drawNewGrid, 100);
