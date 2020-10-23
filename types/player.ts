import { border } from "./data.js";

class Player {
  x = 0;
  y = 0;
  money = 0;
  speed = 4;
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
  spentMoney(amount: number) {
    if (this.money >= amount) {
      this.money -= amount;
      return true;
    }
    return false;
  }
}
export default Player;
