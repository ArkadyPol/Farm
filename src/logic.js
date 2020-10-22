import { center, player } from "./data.js";
function isEven(n) {
  return !(n % 2);
}
export function findDirection(n) {
  let temp = n - 1;
  let sqrt = Math.sqrt(temp);
  let int = Math.floor(sqrt);
  if (temp < int * int + int) {
    return isEven(int) ? "left" : "right";
  } else return isEven(int) ? "up" : "down";
}
export function formatDate(date) {
  let dd = date.getDate();
  dd = dd <= 9 ? "0" + dd : dd;
  let MM = date.getMonth() + 1;
  MM = MM <= 9 ? "0" + MM : MM;
  let yy = date.getFullYear() + "";
  yy = yy.slice(-2);
  let hh = date.getHours();
  hh = hh <= 9 ? "0" + hh : hh;
  let mm = date.getMinutes();
  mm = mm <= 9 ? "0" + mm : mm;
  return `${dd}.${MM}.${yy} ${hh}:${mm}`;
}
export function updateBorder(Cell, Wall, border) {
  let { rightX, leftX, topY, bottomY } = Cell.findExtremePoints();
  border.top = topY + 450;
  border.bottom = bottomY - 600;
  border.left = leftX - 450;
  border.right = rightX + 600;
  Wall.createWall(rightX, leftX, topY, bottomY);
}
export function transferX(x) {
  return x + center.x - player.x;
}
export function transferY(y) {
  return -y + center.y + player.y;
}
