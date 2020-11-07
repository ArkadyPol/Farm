import Cell from "../cell";

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
export function drawMarketCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number,
  img: string
) {
  ctx.fillStyle = "gold";
  ctx.fillRect(x, y, size, size);
  if (img !== "none") {
    let image = new Image();
    image.src = `images/${img}.png`;
    ctx.drawImage(image, x + 3, y + 3);
    return;
  }
  ctx.fillStyle = color;
  ctx.fillRect(x + 3, y + 3, size - 6, size - 6);
}
function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.beginPath();
  ctx.fillStyle = "orange";
  let smallShiftX = 12;
  let bigShiftX = 18;
  let smallShiftY = 15;
  let bigShiftY = 40;
  ctx.moveTo(x - smallShiftX, y + bigShiftY);
  ctx.lineTo(x, y);
  ctx.lineTo(x + smallShiftX, y + bigShiftY);
  ctx.lineTo(x - bigShiftX, y + smallShiftY);
  ctx.lineTo(x + bigShiftX, y + smallShiftY);
  ctx.fill();
}

export function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number,
  cell: Cell
) {
  ctx.fillStyle = "gold";
  ctx.fillRect(x, y, size, size);
  if (cell.type !== "none") {
    let image = new Image();
    image.src = `images/${cell.type}.png`;
    let newSize = size - 6;
    ctx.drawImage(
      image,
      newSize * cell.count,
      0,
      newSize,
      newSize,
      x + 3,
      y + 3,
      newSize,
      newSize
    );
    if (cell.isActive) {
      ctx.fillStyle = "white";
      ctx.fillRect(x + 3, y + newSize - 7, newSize, 10);
      let redWidth = Math.floor((cell.progress / 100) * newSize);
      ctx.fillStyle = "red";
      ctx.fillRect(x + 3, y + newSize - 7, redWidth, 10);
    }
    if (cell.progress === 100) {
      drawStar(ctx, x + size / 2, y + size / 2 - 20);
    }
    return;
  }
  ctx.fillStyle = color;
  ctx.fillRect(x + 3, y + 3, size - 6, size - 6);
}
export function drawWallCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number
) {
  ctx.fillStyle = "gold";
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = color;
  ctx.fillRect(x + 3, y + 3, size - 6, size - 6);
}
