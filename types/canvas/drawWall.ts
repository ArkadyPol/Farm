import Wall from "../wall.js";
import { transferX, transferY } from "../logic.js";
import { drawCell } from "./drawCell.js";

function drawWall(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  Wall.wall.forEach((wall) => {
    if (transferX(wall.x) < -150) return;
    if (transferX(wall.x) > width) return;
    if (transferY(wall.y) < -150) return;
    if (transferY(wall.y) > height) return;
    drawCell(ctx, transferX(wall.x), transferY(wall.y), "brown", 150);
  });
}
export default drawWall;
