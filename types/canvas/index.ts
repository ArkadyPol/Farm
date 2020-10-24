import { formatDate, transferX, transferY } from "../logic.js";
import { modes, player, drag, start, center, size } from "../data.js";
import Inv from "../inv.js";
import drawInventory from "./drawInventory.js";
import showContextMenu from "./showContextMenu.js";
import drawBuyCell from "./drawBuyCell.js";
import drawWall from "./drawWall.js";
import drawField from "./drawField.js";
import drawMoney from "./drawMoney.js";
import onResize from "../listeners/resize.js";

const canvas = document.querySelector("canvas");
size.width = document.documentElement.clientWidth;
size.height = document.documentElement.clientHeight;
let ctx: CanvasRenderingContext2D | null;
if (canvas) {
  canvas.width = size.width;
  canvas.height = size.height;
  ctx = canvas.getContext("2d");
}
center.x = size.width / 2;
center.y = size.height / 2;
start.x = size.width - 300; // начальный Х для инвентаря
start.y = size.height - 300; // начальный Y для инвентаря
window.addEventListener("resize", onResize);
let farmer = new Image();
farmer.src = "images/Farmer.png";

export function drawGame(time: Date, fps: number) {
  if (ctx) {
    ctx.fillStyle = "#AAAAAA";
    ctx.fillRect(0, 0, size.width, size.height);
    drawWall(ctx, size.width, size.height);
    drawField(ctx, size.width, size.height);
    ctx.fillStyle = "orange";
    ctx.fillRect(transferX(-225), transferY(225), 450, 450);
    drawBuyCell(ctx);
    ctx.drawImage(
      farmer,
      center.x - farmer.width / 2,
      center.y - farmer.height / 2
    );
    if (modes.isInventory) {
      drawInventory(ctx, start.x, start.y);
      if (modes.isDragging && Inv.dragItem.item) {
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
    if (modes.isFPS) {
      drawFPS(fps);
    }
    drawMoney(ctx, size.width);
  }
}

function drawTime(time: Date) {
  let date = formatDate(time);
  if (ctx) ctx.fillText(date, 20, size.height - 10);
}
function drawCoords() {
  if (ctx) {
    ctx.fillStyle = "black";
    ctx.font = "20px serif";
    ctx.fillText(
      `x: ${player.x}  y: ${player.y}`,
      size.width - 150,
      size.height - 10
    );
  }
}
function drawFPS(fps: number) {
  if (ctx) {
    ctx.fillStyle = "red";
    ctx.fillText(`fps: ${fps}`, 20, 20);
  }
}
