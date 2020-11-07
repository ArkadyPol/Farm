import Player from "./player.js";
import ContextMenu from "./contextMenu.js";

let modes = {
  isDragging: false,
  isContext: false,
  isInventory: false,
  isFPS: false,
  isMarket: false,
};
let player = new Player();
let contextMenu = new ContextMenu();
let border = { top: 0, left: 0, right: 0, bottom: 0 };
let drag = { x: 0, y: 0 };
let start = { x: 0, y: 0 };
let center = { x: 0, y: 0 };
let size = { width: 0, height: 0 };
export { modes, player, border, contextMenu, drag, start, center, size };
