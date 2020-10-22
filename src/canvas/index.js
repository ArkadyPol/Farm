import { formatDate, transferX, transferY } from "../logic.js";
import { modes, player, drag, start, center } from "../data.js";
import Cell from "../cell.js";
import Inv from "../inv.js";
import Wall from "../wall.js";
import { drawCell } from "./drawCell.js";
import drawInventory from "./drawInventory.js";
import showContextMenu from "./showContextMenu.js";
import drawBuyCell from "./drawBuyCell.js";
const canvas = document.querySelector("canvas");
const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
canvas.width = width;
canvas.height = height;
center.x = width / 2;
center.y = height / 2;
const ctx = canvas.getContext("2d");
start.x = width - 300; // начальный Х для инвентаря
start.y = height - 300; // начальный Y для инвентаря
let farmer = new Image();
farmer.src = "images/Farmer.png";

export function drawGame(time) {
  ctx.fillStyle = "#AAAAAA";
  ctx.fillRect(0, 0, width, height);
  Wall.wall.forEach((wall) => {
    if (transferX(wall.x) < -150) return;
    if (transferX(wall.x) > width) return;
    if (transferY(wall.y) < -150) return;
    if (transferY(wall.y) > height) return;
    drawCell(ctx, transferX(wall.x), transferY(wall.y), "brown", 150);
  });
  Cell.cells.forEach((cell) => {
    if (transferX(cell.x) < -150) return;
    if (transferX(cell.x) > width) return;
    if (transferY(cell.y) < -150) return;
    if (transferY(cell.y) > height) return;
    drawCell(
      ctx,
      transferX(cell.x),
      transferY(cell.y),
      "green",
      150,
      cell.type,
      cell.count
    );
  });
  ctx.fillStyle = "orange";
  ctx.fillRect(transferX(-225), transferY(225), 450, 450);
  drawBuyCell(ctx);
  ctx.drawImage(
    farmer,
    center.x - farmer.width / 2,
    center.y - farmer.height / 2
  );
  if (modes.isInventory) {
    drawInventory(ctx, Inv, start.x, start.y);
    if (modes.isDragging) {
      let img = new Image();
      img.src = `images/${Inv.dragItem.item.item}.png`;
      ctx.drawImage(img, drag.x - 25, drag.y - 25);
    }
  }
  if (modes.isContext) {
    showContextMenu(ctx);
  }
  ctx.fillStyle = "black";
  ctx.font = "20px serif";
  ctx.fillText(`x: ${player.x}  y: ${player.y}`, width - 150, height - 10);
  let date = formatDate(time);
  ctx.fillText(date, 20, height - 10);
  ctx.fillStyle = "black";
  ctx.fillRect(width - 110, 0, 110, 28);
  ctx.beginPath();
  ctx.fillStyle = "gold";
  ctx.arc(width - 97, 12, 9, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = "bold 24px serif";
  ctx.fillText(player.money, width - 85, 20);
}
