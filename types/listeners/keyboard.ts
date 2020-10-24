import { onDragDown } from "./mouse.js";
import { player, modes } from "../data.js";

export function onKeyDown(e: KeyboardEvent) {
  switch (e.code) {
    case "ArrowUp":
    case "KeyW":
      player.moveUp();
      break;
    case "ArrowLeft":
    case "KeyA":
      player.moveLeft();
      break;
    case "ArrowDown":
    case "KeyS":
      player.moveDown();
      break;
    case "ArrowRight":
    case "KeyD":
      player.moveRight();
      break;
    case "KeyI":
      modes.isInventory = !modes.isInventory;
      if (modes.isInventory) {
        document.addEventListener("mousedown", onDragDown);
      } else document.removeEventListener("mousedown", onDragDown);
      break;
    case "KeyF":
      modes.isFPS = !modes.isFPS;
      break;
  }
}
