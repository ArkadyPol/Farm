import Cell from "../cell.js";
import { player, border, modes, drag, start } from "../data.js";
import Inv from "../inv.js";
import { transferX, transferY, updateBorder } from "../logic.js";
import Wall from "../wall.js";

export function onDragDown(e) {
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
export function onBuyCellClick(e) {
  let cell = Cell.nextCell();
  let left = transferX(cell.x) + 90;
  let top = transferY(cell.y) + 3;
  if (e.clientX > left && e.clientX < left + 57) {
    if (e.clientY > top && e.clientY < top + 20) {
      if (player.spentMoney(Cell.price)) {
        Cell.buyCell();
        updateBorder(Cell, Wall, border);
      }
    }
  }
}
