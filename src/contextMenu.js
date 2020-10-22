import Cell from "./cell.js";
import Inv from "./inv.js";

class ContextMenu {
  contX;
  contY;
  moveX;
  moveY;
  openIndex = null;
  menu;
  init(e) {
    this.contX = e.clientX;
    this.contY = e.clientY;
  }
  move(e) {
    this.moveX = e.clientX;
    this.moveY = e.clientY;
  }
  select(action1, action2) {
    if (action1 === "Посадить семена") {
      let seed = action2.split(" ")[0];
      Inv.plantSeed(seed);
      Cell.activeCell.plantSeed(seed);
      Cell.activeCell = null;
    }
  }
}
export default ContextMenu;
