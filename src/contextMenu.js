class ContextMenu {
  contX;
  contY;
  moveX;
  moveY;
  openIndex = null;
  menu;
  init(e) {
    this.contX = e.clientX;
    this.contY = e.clientY;
  }
  move(e) {
    this.moveX = e.clientX;
    this.moveY = e.clientY;
  }
}
export default ContextMenu;
