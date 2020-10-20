import { drag, modes, start, player } from "./data.js";
import Inv from "./inv.js";

function onDragDown(e) {
  if (modes.isInventory) {
    if (e.which !== 1) return;
    let x = e.clientX - start.x;
    let y = e.clientY - start.y;
    let isDrag = Inv.startDrag(x, y);
    if (isDrag) {
      modes.isDragging = true;
      drag.x = e.clientX;
      drag.y = e.clientY;
      document.addEventListener("mousemove", onDragMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  }
}
function onDragMove(e) {
  drag.x = e.clientX;
  drag.y = e.clientY;
}
function onMouseUp(e) {
  document.removeEventListener("mousemove", onDragMove);
  document.removeEventListener("mouseup", onMouseUp);
  let x = e.clientX - start.x;
  let y = e.clientY - start.y;
  Inv.endDrag(x, y);
  modes.isDragging = false;
}
export function onKeyDown(e) {
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
        document.addEventListener("mousedown", onDragDown);
      } else document.removeEventListener("mousedown", onDragDown);
      break;
  }
}
