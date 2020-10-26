import { center, player } from "./data.js";
import Inv from "./inv.js";
import { findDirection, randomInt, transferY } from "./logic.js";
class Cell {
  static cells: Cell[] = [];
  static activeCell = null as null | Cell;
  static price = 50;
  isActive = false;
  type = "none";
  progress = 0;
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  static nextCell() {
    let cells = this.cells;
    let cell;
    type directionType = ReturnType<typeof findDirection>;
    let direction: directionType = findDirection(cells.length + 9);
    let lastCell = cells.slice(-1)[0];
    switch (direction) {
      case "up":
        cell = new this(lastCell.x, lastCell.y + 150);
        break;
      case "down":
        cell = new this(lastCell.x, lastCell.y - 150);
        break;
      case "left":
        cell = new this(lastCell.x - 150, lastCell.y);
        break;
      case "right":
        cell = new this(lastCell.x + 150, lastCell.y);
        break;
    }
    return cell;
  }
  static buyCell() {
    let cell = Cell.nextCell();
    this.cells.push(cell);
    this.price = Math.floor(this.price * 1.1);
  }
  static createField() {
    let cells = this.cells;
    cells.push(new this(-225, 375));
    while (cells.length < 16) {
      let cell = Cell.nextCell();
      cells.push(cell);
    }
  }
  static findExtremePoints() {
    let rightX = 0;
    let leftX = 0;
    let topY = 0;
    let bottomY = 0;
    this.cells.forEach(({ x, y }) => {
      if (rightX < x) rightX = x;
      if (leftX > x) leftX = x;
      if (topY < y) topY = y;
      if (bottomY > y) bottomY = y;
    });
    return { rightX, leftX, topY, bottomY };
  }
  static grow() {
    this.cells.forEach((cell) => {
      cell.grow();
    });
  }
  static findCell(x: number, y: number) {
    x = x - center.x + player.x + 75;
    x = Math.floor(x / 150) * 150 - 75;
    y = transferY(y) - 75;
    y = Math.ceil(y / 150) * 150 + 75;
    let cell = this.cells.find((cell) => {
      return x === cell.x && y === cell.y;
    });
    return cell;
  }
  contextMenu(seeds: Inv[]) {
    if (this.type === "none") {
      let menu = [["Посадить семена"]];
      seeds.forEach((seed) => {
        menu[0].push(`${seed.name} ${seed.count} шт.`);
      });
      return menu;
    } else if (this.progress === 100) {
      return ["Собрать урожай"];
    }
  }
  plantSeed(seed: string) {
    switch (seed) {
      case "Пшеница":
        this.type = "wheat";
        break;
      case "Картофель":
        this.type = "potato";
        break;
    }
  }
  harvest() {
    this.type = "none";
    this.progress = 0;
  }
  get count() {
    return this.progress < 80 ? Math.floor(this.progress / 20) : 4;
  }
  grow() {
    if (this.type === "none") return;
    if (this.progress < 100) {
      let rand = Math.random();
      switch (this.type) {
        case "wheat":
          if (rand < 0.265) {
            this.progress += randomInt(2, 6);
            if (this.progress > 100) this.progress = 100;
          }
          break;
        case "potato":
          if (rand < 0.199) {
            this.progress += randomInt(2, 6);
            if (this.progress > 100) this.progress = 100;
          }
          break;
      }
    }
  }
}
Cell.createField();
export default Cell;
