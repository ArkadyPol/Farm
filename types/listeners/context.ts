import Cell from "../cell.js";
import { contextMenu, modes } from "../data.js";
import Inv from "../inv.js";
import { onContextMove, onContextClick } from "./mouse.js";

export function onContextMenu(e: MouseEvent) {
  e.preventDefault();
  let cell = Cell.findCell(e.clientX, e.clientY);
  if (cell) {
    modes.isContext = true;
    document.addEventListener("mousemove", onContextMove);
    document.addEventListener("click", onContextClick);
    let seeds = Inv.getSeeds();
    contextMenu.menu = cell.contextMenu(seeds);
    Cell.activeCell = cell;
  }
  contextMenu.init(e);
}
