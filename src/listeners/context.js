import Cell from "../cell.js";
import { contextMenu, modes } from "../data.js";
import Inv from "../inv.js";
import { transferX, transferY } from "../logic.js";
import { onMouseMove, onContextClick } from "./mouse.js";

export function onContextMenu(e) {
  e.preventDefault();
  Cell.cells.forEach((cell) => {
    if (
      transferX(cell.x) <= e.clientX &&
      transferX(cell.x) + 150 >= e.clientX &&
      transferY(cell.y) <= e.clientY &&
      transferY(cell.y) + 150 >= e.clientY
    ) {
      modes.isContext = true;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("click", onContextClick);
      let seeds = Inv.getSeeds();
      contextMenu.menu = cell.contextMenu(seeds);
      Cell.activeCell = cell;
    }
    contextMenu.init(e);
  });
}
