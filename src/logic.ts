import Cell from "./cell.js";
import { border, center, player } from "./data.js";
import Wall from "./wall.js";
function isEven(n: number) {
  return !(n % 2);
}
export function findDirection(n: number) {
  let temp = n - 1;
  let sqrt = Math.sqrt(temp);
  let int = Math.floor(sqrt);
  if (temp < int * int + int) {
    return isEven(int) ? "left" : "right";
  } else return isEven(int) ? "up" : "down";
}
export function formatDate(date: Date) {
  let dd = date.getDate();
  let MM = date.getMonth() + 1;
  let yy = date.getFullYear() + "";
  yy = yy.slice(-2);
  let hh = date.getHours();
  let mm = date.getMinutes();
  return `${dd <= 9 ? "0" + dd : dd}.${MM <= 9 ? "0" + MM : MM}.${yy} ${
    hh <= 9 ? "0" + hh : hh
  }:${mm <= 9 ? "0" + mm : mm}`;
}
export function updateBorder() {
  let { rightX, leftX, topY, bottomY } = Cell.findExtremePoints();
  border.top = topY + 450;
  border.bottom = bottomY - 600;
  border.left = leftX - 450;
  border.right = rightX + 600;
  Wall.createWall(rightX, leftX, topY, bottomY);
}
export function transferX(x: number) {
  return x + center.x - player.x;
}
export function transferY(y: number) {
  return -y + center.y + player.y;
}
