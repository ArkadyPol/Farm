class Wall {
  static wall: Wall[] = [];
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  static createWall(
    rightX: number,
    leftX: number,
    topY: number,
    bottomY: number
  ) {
    let wall: Wall[] = [];
    wall.push(new this(leftX - 150, topY + 150));
    let lastWall = wall.slice(-1)[0];
    while (lastWall.x <= rightX) {
      wall.push(new this(lastWall.x + 150, lastWall.y));
      lastWall = wall.slice(-1)[0];
    }
    while (lastWall.y >= bottomY) {
      wall.push(new this(lastWall.x, lastWall.y - 150));
      lastWall = wall.slice(-1)[0];
    }
    while (lastWall.x >= leftX) {
      wall.push(new this(lastWall.x - 150, lastWall.y));
      lastWall = wall.slice(-1)[0];
    }
    while (lastWall.y < topY) {
      wall.push(new this(lastWall.x, lastWall.y + 150));
      lastWall = wall.slice(-1)[0];
    }
    if (this.wall.length < wall.length) this.wall = wall;
  }
}
export default Wall;
