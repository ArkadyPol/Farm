import { formatDate, updateBorder } from "../logic.js";
import {
  modes,
  player,
  border,
  contextMenu,
  drag,
  start,
  center,
} from "../data.js";
import Cell from "../cell.js";
import Inv from "../inv.js";
import Wall from "../wall.js";
import { drawCell } from "./drawCell.js";
import drawInventory from "./drawInventory.js";
import showContextMenu from "./showContextMenu.js";
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
  drawBuyCell();
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

document.addEventListener("click", onBuyCellClick);

function onMouseMove(e) {
  contextMenu.move(e);
}

export function onContextMenu(e) {
  e.preventDefault();
  Cell.cells.forEach((cell) => {
    if (
      transferX(cell.x) <= e.clientX &&
      transferX(cell.x) + 150 >= e.clientX &&
      transferY(cell.y) <= e.clientY &&
      transferY(cell.y) + 150 >= e.clientY
    ) {
      modes.isContext = true;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("click", onContextClick);
      let seeds = Inv.getSeeds();
      contextMenu.menu = cell.contextMenu(seeds);
      Cell.activeCell = cell;
    }
    contextMenu.init(e);
  });
}

function contextSelect(action1, action2) {
  if (action1 === "Посадить семена") {
    let seed = action2.split(" ")[0];
    Inv.plantSeed(seed);
    Cell.activeCell.plantSeed(seed);
    Cell.activeCell = null;
  }
}
function drawBuyCell() {
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
  ctx.fillText(Cell.price, left + 20, top + 15);
}
function transferX(x) {
  return x + center.x - player.x;
}
function transferY(y) {
  return -y + center.y + player.y;
}
function onBuyCellClick(e) {
  let cell = Cell.nextCell();
  let left = transferX(cell.x) + 90;
  let top = transferY(cell.y) + 3;
  if (e.clientX > left && e.clientX < left + 57) {
    if (e.clientY > top && e.clientY < top + 20) {
      if (player.spentMoney(Cell.price)) {
        Cell.buyCell();
        updateBorder(Cell, Wall, border);
      }
    }
  }
}
function onContextClick(e) {
  let { menu, openIndex, contX, contY } = contextMenu;
  if (menu) {
    let x = e.clientX - contX - 1;
    let y = e.clientY - contY - 1;
    x = Math.floor(x / 150);
    y = Math.floor(y / 20);
    if (x === 0 && menu[y] && typeof menu[y] === "string") {
      contextSelect(menu[y]);
    }
    if (x === 1 && openIndex !== null) {
      let lastIndex = y - openIndex + 1;
      if (lastIndex > 0 && menu[openIndex][lastIndex])
        contextSelect(menu[openIndex][0], menu[openIndex][lastIndex]);
    }
  }
  modes.isContext = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("click", onContextClick);
  contextMenu.openIndex = null;
}
