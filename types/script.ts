import { drawGame } from "./canvas/index.js";
import Cell from "./cell.js";
import { updateBorder } from "./logic.js";
import { onKeyDown } from "./listeners/keyboard.js";
import { onBuyCellClick } from "./listeners/mouse.js";
import { onContextMenu } from "./listeners/context.js";
updateBorder();
let time = new Date(2021, 0, 1, 6);
let fps = 0;
let lastFPS = 0;
function draw() {
  drawGame(time, lastFPS);
  time = new Date(+time + 20_000);
  if (
    !time.getMinutes() &&
    !time.getSeconds() &&
    time.getHours() > 6 &&
    time.getHours() <= 22
  ) {
    Cell.grow();
  }
  window.requestAnimationFrame(draw);
  fps++;
}
draw();
setInterval(() => {
  lastFPS = fps;
  fps = 0;
}, 1000);
document.addEventListener("keydown", onKeyDown);
document.addEventListener("contextmenu", onContextMenu);
document.addEventListener("click", onBuyCellClick);
