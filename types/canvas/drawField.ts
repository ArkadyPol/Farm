import { transferX, transferY } from "../logic.js";
import { drawCell } from "./drawCell.js";
import Cell from "../cell.js";

function drawField(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  Cell.cells.forEach((cell) => {
    if (transferX(cell.x) < -150) return;
    if (transferX(cell.x) > width) return;
    if (transferY(cell.y) < -150) return;
    if (transferY(cell.y) > height) return;
    drawCell(ctx, transferX(cell.x), transferY(cell.y), "green", 150, cell);
  });
}
export default drawField;
