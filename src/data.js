import Player from "./player.js";
import ContextMenu from "./contextMenu.js";

let modes = {};
modes.isDragging = false;
modes.isContext = false;
modes.isInventory = false;
let player = new Player();
let contextMenu = new ContextMenu();
let border = { top: 0, left: 0, right: 0, bottom: 0 };
let drag = { x: 0, y: 0 };
let start = { x: 0, y: 0 };
export { modes, player, border, contextMenu, drag, start };
