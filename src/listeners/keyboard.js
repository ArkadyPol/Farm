import { onDragDown } from "./mouse.js";
import { player, border, modes } from "../data.js";

export function onKeyDown(e) {
  switch (e.key) {
    case "w":
      player.moveUp(border);
      break;
    case "a":
      player.moveLeft(border);
      break;
    case "s":
      player.moveDown(border);
      break;
    case "d":
      player.moveRight(border);
      break;
    case "i":
      modes.isInventory = !modes.isInventory;
      if (modes.isInventory) {
        document.addEventListener("mousedown", onDragDown);
      } else document.removeEventListener("mousedown", onDragDown);
      break;
  }
}
