import { player } from "../data.js";

function drawMoney(ctx, width) {
  ctx.fillStyle = "black";
  ctx.fillRect(width - 110, 0, 110, 28);
  ctx.beginPath();
  ctx.fillStyle = "gold";
  ctx.arc(width - 97, 12, 9, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = "bold 24px serif";
  ctx.fillText(player.money, width - 85, 20);
}
export default drawMoney;
