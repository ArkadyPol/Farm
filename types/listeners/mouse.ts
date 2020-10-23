import Cell from "../cell.js";
import { player, modes, drag, start, contextMenu } from "../data.js";
import Inv from "../inv.js";
import { transferX, transferY, updateBorder } from "../logic.js";

export function onDragDown(e: MouseEvent) {
  if (modes.isInventory) {
    if (e.button !== 0) return;
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
function onDragMove(e: MouseEvent) {
  drag.x = e.clientX;
  drag.y = e.clientY;
}
export function onMouseMove(e: MouseEvent) {
  contextMenu.move(e);
}
function onMouseUp(e: MouseEvent) {
  document.removeEventListener("mousemove", onDragMove);
  document.removeEventListener("mouseup", onMouseUp);
  let x = e.clientX - start.x;
  let y = e.clientY - start.y;
  Inv.endDrag(x, y);
  modes.isDragging = false;
}
export function onBuyCellClick(e: MouseEvent) {
  let cell = Cell.nextCell();
  let left = transferX(cell.x) + 90;
  let top = transferY(cell.y) + 3;
  if (e.clientX > left && e.clientX < left + 57) {
    if (e.clientY > top && e.clientY < top + 20) {
      if (player.spentMoney(Cell.price)) {
        Cell.buyCell();
        updateBorder();
      }
    }
  }
}
export function onContextClick(e: MouseEvent) {
  let { menu, openIndex, contX, contY } = contextMenu;
  if (menu && contX && contY) {
    let x = e.clientX - contX - 1;
    let y = e.clientY - contY - 1;
    x = Math.floor(x / 150);
    y = Math.floor(y / 20);
    if (x === 0 && menu[y] && typeof menu[y] === "string") {
      contextMenu.select(menu[y] as string);
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
