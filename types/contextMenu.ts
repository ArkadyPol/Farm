import Cell from "./cell.js";
import Inv from "./inv.js";

type MenuElement = string | string[];

class ContextMenu {
  contX?: number;
  contY?: number;
  moveX?: number;
  moveY?: number;
  openIndex = null as null | number;
  menu?: MenuElement[];
  init(e: MouseEvent) {
    this.contX = e.clientX;
    this.contY = e.clientY;
  }
  move(e: MouseEvent) {
    this.moveX = e.clientX;
    this.moveY = e.clientY;
  }
  select(action1: string, action2?: string) {
    switch (action1) {
      case "Посадить семена":
        if (action2) {
          let seed = action2.split(" ")[0];
          Inv.plantSeed(seed);
          if (Cell.activeCell) {
            Cell.activeCell.plantSeed(seed);
            Cell.activeCell = null;
          }
        }
        break;
      case "Собрать урожай":
        if (Cell.activeCell) {
          Inv.harvest(Cell.activeCell.type);
          Cell.activeCell.harvest();
          Cell.activeCell = null;
        }
        break;
    }
  }
}
export default ContextMenu;
