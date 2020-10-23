import Cell from "./cell.js";
import Inv from "./inv.js";
class ContextMenu {
    constructor() {
        this.openIndex = null;
    }
    init(e) {
        this.contX = e.clientX;
        this.contY = e.clientY;
    }
    move(e) {
        this.moveX = e.clientX;
        this.moveY = e.clientY;
    }
    select(action1, action2) {
        if (action1 === "Посадить семена" && action2) {
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
