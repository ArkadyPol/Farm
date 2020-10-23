import { border } from "./data.js";
class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.money = 0;
        this.speed = 4;
    }
    moveRight() {
        if (this.x < border.right) {
            this.x += this.speed;
        }
    }
    moveLeft() {
        if (this.x > border.left) {
            this.x -= this.speed;
        }
    }
    moveUp() {
        if (this.y < border.top) {
            this.y += this.speed;
        }
    }
    moveDown() {
        if (this.y > border.bottom) {
            this.y -= this.speed;
        }
    }
    spentMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            return true;
        }
        return false;
    }
}
export default Player;
