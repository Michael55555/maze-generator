import "./style.css";

const walls = [[1, 1]];
let ctx;
let frame = 0;
let i = 0;
let stop = false;
let dx = 0;
let dy = 0;

function init() {
  const canvas = document.querySelector("canvas");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  return canvas.getContext("2d");
}

function draw() {
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";

  addWall(walls);
  for (let [x, y] of walls) {
    drawCoordinate(x, y);
  }
}

function addWall(walls) {
  let wall = generateWallPosition(walls);

  for (let i = 0; i < 10 && !isValidWall(walls, wall); i++) {
    wall = generateWallPosition(walls);
  }

  if (!isValidWall(walls, wall)) walls.push([]);
  walls.push(wall);
}

function isValidWall(walls, wall) {
  if (wallExists(walls, wall)) return false;

  const factors = [
    wallExists(walls, [wall[0] + 1, wall[1]]),
    wallExists(walls, [wall[0] - 1, wall[1]]),
    wallExists(walls, [wall[0], wall[1] - 1]),
    wallExists(walls, [wall[0], wall[1] + 1]),
    wallExists(walls, [wall[0] - 1, wall[1] - 1]),
    wallExists(walls, [wall[0] - 1, wall[1] + 1]),
    wallExists(walls, [wall[0] + 1, wall[1] - 1]),
    wallExists(walls, [wall[0] + 1, wall[1] + 1]),
  ];

  if (factors.reduce((a, b) => a + b) > 2) return false;

  return true;
}

function wallExists(walls, wall) {
  for (let arr of walls) {
    // If an existing wall is in this position already.
    if (arr[0] === wall[0] && arr[1] === wall[1]) return true;
  }

  return false;
}

function generateWallPosition(walls) {
  const lastWall = walls[walls.length - 1];
  if (frame % 4 === 0) {
    const d = Math.floor(Math.random() * 4);

    dx = 0;
    dy = 0;

    if (d == 0) dx = -1;
    if (d == 1) dx = 1;
    if (d == 2) dy = -1;
    if (d == 3) dy = 1;
  }

  return [lastWall[0] + dx, lastWall[1] + dy];
}

function roll() {
  return Math.floor(Math.random() * 4);
}

function drawCoordinate(x, y) {
  const gap = 0;
  const size = 2;
  const offset = gap / 2 + 400;

  x = offset + size * x + gap * x;
  y = offset + size * y + gap * y;

  ctx.fillRect(x, y, size, size);
}

function animate() {
  frame++;
  i = 0;
  draw();
  if (stop) return;
  requestAnimationFrame(animate);
}

onload = () => {
  ctx = init();
  animate();
};
