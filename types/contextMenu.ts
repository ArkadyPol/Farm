import Cell from "./cell.js";
import Inv from "./inv.js";

class ContextMenu {
  contX?: number;
  contY?: number;
  moveX?: number;
  moveY?: number;
  openIndex = null;
  menu?: string[][];
  init(e: MouseEvent) {
    this.contX = e.clientX;
    this.contY = e.clientY;
  }
  move(e: MouseEvent) {
    this.moveX = e.clientX;
    this.moveY = e.clientY;
  }
  select(action1: string, action2: string) {
    if (action1 === "Посадить семена") {
      let seed = action2.split(" ")[0];
      Inv.plantSeed(seed);
      if (Cell.activeCell) {
        Cell.activeCell.plantSeed(seed);
        Cell.activeCell = null;
      }
    }
  }
}
export default ContextMenu;
