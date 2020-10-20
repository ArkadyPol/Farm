import { drawInvCell } from "./drawCell.js";

function drawInventory(ctx, Inv, startX, startY) {
  Inv.items.forEach((item, i) => {
    drawInvCell(
      ctx,
      startX + (i % 4) * 50,
      startY + Math.floor(i / 4) * 50,
      "gray",
      50,
      item.item,
      item.count
    );
  });
}
export default drawInventory;
