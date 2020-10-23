class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static createWall(rightX, leftX, topY, bottomY) {
        let wall = [];
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
        if (this.wall.length < wall.length)
            this.wall = wall;
    }
}
Wall.wall = [];
export default Wall;
