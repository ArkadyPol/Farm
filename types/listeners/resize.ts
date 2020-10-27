import { center, size, start } from "../data.js";

function onResize(e: UIEvent) {
  const canvas = document.querySelector("canvas");
  size.width = document.documentElement.clientWidth;
  size.height = document.documentElement.clientHeight;
  start.x = size.width - 300; // начальный Х для инвентаря
  start.y = size.height - 300; // начальный Y для инвентаря
  center.x = size.width / 2;
  center.y = size.height / 2;
  if (canvas) {
    canvas.width = size.width;
    canvas.height = size.height;
  }
}
export default onResize;
