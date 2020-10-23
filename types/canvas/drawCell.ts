export function drawInvCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number,
  img: string,
  count: number
) {
  ctx.fillStyle = "gold";
  ctx.fillRect(x, y, size, size);
  if (img !== "none") {
    let image = new Image();
    image.src = `images/${img}.png`;
    ctx.drawImage(image, x + 3, y + 3);
    ctx.fillStyle = "black";
    ctx.font = "12px serif";
    ctx.fillText(count + "", x + size - 20, y + size - 6);
    return;
  }
  ctx.fillStyle = color;
  ctx.fillRect(x + 3, y + 3, size - 6, size - 6);
}
export function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number,
  img?: string,
  count?: number
) {
  ctx.fillStyle = "gold";
  ctx.fillRect(x, y, size, size);
  if (img && img !== "none") {
    let image = new Image();
    image.src = `images/${img}.png`;
    if (count !== undefined) {
      let newSize = size - 6;
      ctx.drawImage(
        image,
        newSize * count,
        0,
        newSize,
        newSize,
        x + 3,
        y + 3,
        newSize,
        newSize
      );
    }
    return;
  }
  ctx.fillStyle = color;
  ctx.fillRect(x + 3, y + 3, size - 6, size - 6);
}
