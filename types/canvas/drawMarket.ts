import Market from "../market.js";
import { drawMarketCell } from "./drawCell.js";

function drawMarket(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number
) {
  Market.items.forEach((item, i) => {
    drawMarketCell(
      ctx,
      startX + (i % 4) * 50,
      startY + Math.floor(i / 4) * 50,
      "gray",
      50,
      item.item
    );
  });
}
export default drawMarket;
