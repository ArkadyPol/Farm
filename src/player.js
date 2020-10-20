class Player {
  x = 0;
  y = 0;
  money = 0;
  speed = 4;
  moveRight(border) {
    if (this.x < border.right) {
      this.x += this.speed;
    }
  }
  moveLeft(border) {
    if (this.x > border.left) {
      this.x -= this.speed;
    }
  }
  moveUp(border) {
    if (this.y < border.top) {
      this.y += this.speed;
    }
  }
  moveDown(border) {
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
