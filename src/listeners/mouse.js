import Cell from "../cell.js";
import { player, border, modes, drag, start, contextMenu } from "../data.js";
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
export function onMouseMove(e) {
  contextMenu.move(e);
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
export function onContextClick(e) {
  let { menu, openIndex, contX, contY } = contextMenu;
  if (menu) {
    let x = e.clientX - contX - 1;
    let y = e.clientY - contY - 1;
    x = Math.floor(x / 150);
    y = Math.floor(y / 20);
    if (x === 0 && menu[y] && typeof menu[y] === "string") {
      contextMenu.select(menu[y]);
    }
    if (x === 1 && openIndex !== null) {
      let lastIndex = y - openIndex + 1;
      if (lastIndex > 0 && menu[openIndex][lastIndex])
        contextMenu.select(menu[openIndex][0], menu[openIndex][lastIndex]);
    }
  }
  modes.isContext = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("click", onContextClick);
  contextMenu.openIndex = null;
}
