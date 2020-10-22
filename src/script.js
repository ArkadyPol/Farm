import { drawGame } from "./canvas/index.js";
import { border } from "./data.js";
import Cell from "./cell.js";
import Wall from "./wall.js";
import { updateBorder } from "./logic.js";
import { onKeyDown } from "./listeners/keyboard.js";
import { onBuyCellClick } from "./listeners/mouse.js";
import { onContextMenu } from "./listeners/context.js";
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
document.addEventListener("contextmenu", onContextMenu);
document.addEventListener("click", onBuyCellClick);
