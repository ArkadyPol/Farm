import { onDragDown } from "./mouse.js";
import { player, modes } from "../data.js";

export function onKeyDown(e) {
  switch (e.key) {
    case "w":
      player.moveUp();
      break;
    case "a":
      player.moveLeft();
      break;
    case "s":
      player.moveDown();
      break;
    case "d":
      player.moveRight();
      break;
    case "i":
      modes.isInventory = !modes.isInventory;
      if (modes.isInventory) {
        document.addEventListener("mousedown", onDragDown);
      } else document.removeEventListener("mousedown", onDragDown);
      break;
  }
}
