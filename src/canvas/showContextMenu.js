import { contextMenu } from "../data.js";
function showBlock(ctx, x, y, text, selected, withTriangle) {
  ctx.fillStyle = selected ? "gray" : "white";
  ctx.fillRect(x, y, 150, 20);
  ctx.strokeRect(x, y, 150, 20);
  ctx.fillStyle = "black";
  ctx.font = "16px serif";
  ctx.fillText(`${text}`, x + 5, y + 15);
  if (withTriangle) {
    ctx.beginPath();
    ctx.moveTo(x + 140, y + 14);
    ctx.lineTo(x + 140, y + 6);
    ctx.lineTo(x + 146, y + 10);
    ctx.fill();
  }
}
function showContextMenu(ctx) {
  let { menu, moveX, moveY, contX, contY, openIndex } = contextMenu;
  if (!menu) return;
  for (let i = 0; i < menu.length; i++) {
    let selected = false;
    if (moveX > contX && moveX < contX + 150) {
      if (moveY > contY + i * 20 && moveY < contY + i * 20 + 20) {
        selected = true;
      }
    }
    if (typeof menu[i] === "string") {
      showBlock(ctx, contX, contY + i * 20, menu[i], selected);
      if (selected) contextMenu.openIndex = null;
    } else {
      showBlock(
        ctx,
        contX,
        contY + i * 20,
        menu[i][0],
        selected || openIndex === i,
        true
      );
      if (selected || openIndex === i) {
        contextMenu.openIndex = i;
        for (let j = 1; j < menu[i].length; j++) {
          let selected2 = false;
          if (moveX > contX + 150 && moveX < contX + 300) {
            if (
              moveY > contY + (i + j - 1) * 20 &&
              moveY < contY + (i + j) * 20
            ) {
              selected2 = true;
            }
          }
          showBlock(
            ctx,
            contX + 150,
            contY + (i + j - 1) * 20,
            menu[i][j],
            selected2
          );
        }
      }
    }
  }
}
export default showContextMenu;
