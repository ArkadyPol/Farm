class Items {
  static items: Items[] = [];
  item: string;
  type: string;
  name: string;
  constructor(item: string, type: string, name: string) {
    this.item = item;
    this.type = type;
    this.name = name;
  }
  static checkExistance(x: number, y: number) {
    if (x < 0 || x > 3) return false;
    if (y < 0) return false;
    if (x + y * 4 >= this.items.length) return false;
    return true;
  }
}
export default Items;
