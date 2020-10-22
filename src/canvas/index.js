import { formatDate, transferX, transferY } from "../logic.js";
import { modes, player, drag, start, center } from "../data.js";
import Inv from "../inv.js";
import drawInventory from "./drawInventory.js";
import showContextMenu from "./showContextMenu.js";
import drawBuyCell from "./drawBuyCell.js";
import drawWall from "./drawWall.js";
import drawField from "./drawField.js";
import drawMoney from "./drawMoney.js";
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
  drawWall(ctx, width, height);
  drawField(ctx, width, height);
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
  drawCoords();
  drawTime(time);
  drawMoney(ctx, width);
}

function drawTime(time) {
  let date = formatDate(time);
  ctx.fillText(date, 20, height - 10);
}
function drawCoords() {
  ctx.fillStyle = "black";
  ctx.font = "20px serif";
  ctx.fillText(`x: ${player.x}  y: ${player.y}`, width - 150, height - 10);
}
