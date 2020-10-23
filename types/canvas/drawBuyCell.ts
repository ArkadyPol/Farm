import Cell from "../cell.js";
import { transferX, transferY } from "../logic.js";

function drawBuyCell(ctx: CanvasRenderingContext2D) {
  let cell = Cell.nextCell();
  let left = transferX(cell.x) + 90;
  let top = transferY(cell.y) + 3;
  ctx.fillStyle = "#9400d3";
  ctx.fillRect(left, top, 57, 20);
  ctx.beginPath();
  ctx.fillStyle = "gold";
  ctx.arc(left + 8, top + 10, 6, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = "18px serif";
  ctx.fillText(Cell.price + "", left + 20, top + 15);
}
export default drawBuyCell;
