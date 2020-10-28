import { drawGame } from "./canvas/index.js";
import Cell from "./cell.js";
import { updateBorder } from "./logic.js";
import { onKeyDown } from "./listeners/keyboard.js";
import { onButtonClick, onBuyCellClick, onMouseMove } from "./listeners/mouse.js";
import { onContextMenu } from "./listeners/context.js";
updateBorder();
let time = new Date(2021, 0, 1, 6);
let fps = 0;
let lastFPS = 0;
function draw() {
  drawGame(time, lastFPS);
  time = new Date(+time + 18_000);  //normal - 9_000
  if (!time.getSeconds() && time.getHours() >= 6 && time.getHours() < 22) {
    if (time.getMinutes() === 0 || time.getMinutes() === 30) Cell.grow();
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
document.addEventListener("click", onButtonClick);
document.addEventListener("mousemove", onMouseMove);
