import {
  drawGame,
  onCanvasMouseDown,
  onCanvasContextMenu,
} from "./canvas/index.js";
import { modes, border, player } from "./data.js";
import Cell from "./cell.js";
import Wall from "./wall.js";
import { updateBorder } from "./logic.js";
updateBorder(Cell, Wall, border);
let time = new Date(2021, 0, 1, 6);
function draw() {
  drawGame(time);
  window.requestAnimationFrame(draw);
}
draw();
setInterval(() => {
  time = new Date(+time + 120000);
  if (!time.getMinutes() && time.getHours() > 6 && time.getHours() <= 22) {
    Cell.grow();
  }
}, 1000);
document.addEventListener("keydown", onKeyDown);
function onKeyDown(e) {
  switch (e.key) {
    case "w":
      player.moveUp(border);
      break;
    case "a":
      player.moveLeft(border);
      break;
    case "s":
      player.moveDown(border);
      break;
    case "d":
      player.moveRight(border);
      break;
    case "i":
      modes.isInventory = !modes.isInventory;
      if (modes.isInventory) {
        document.addEventListener("mousedown", onMouseDown);
      } else document.removeEventListener("mousedown", onMouseDown);
      break;
  }
}
function onMouseDown(e) {
  onCanvasMouseDown(e);
}

document.addEventListener("contextmenu", onContextMenu);
function onContextMenu(e) {
  e.preventDefault();
  onCanvasContextMenu(e);
}
