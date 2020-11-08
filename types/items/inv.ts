import Items from "./index.js";

class Inv extends Items {
  static items: Inv[] = [];
  static dragItem = { item: null as null | Inv, id: null as null | number };
  count: number;
  constructor(item: string, count: number, type: string, name: string) {
    super(item, type, name);
    this.count = count;
  }
  static addCell(item: string, count: number, type: string, name: string) {
    this.items.push(new this(item, count, type, name));
  }
  static getSeeds() {
    return this.items.filter((item) => item.type === "seed");
  }
  static plantSeed(seed: string) {
    let id = 0;
    let item = this.getSeeds().find((x, i) => {
      id = i;
      return x.name === seed;
    });
    if (item) {
      item.count--;
      if (item.count < 1) this.deleteItem(id);
    }
  }
  static startDrag(x: number, y: number) {
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    if (!this.checkExistance(x, y)) return false;
    this.dragItem.id = x + y * 4;
    let id = this.dragItem.id;
    if (this.items[id].item !== "none") {
      this.dragItem.item = this.items[id];
      this.deleteItem(id);
      return true;
    }
    return false;
  }
  static endDrag(x: number, y: number) {
    let { items, dragItem } = this;
    if (dragItem.id !== null && dragItem.item) {
      x = Math.floor(x / 50);
      y = Math.floor(y / 50);
      let id = x + y * 4;
      if (!this.checkExistance(x, y)) {
        items[dragItem.id] = dragItem.item;
        this.dragItem = { item: null, id: null };
        return;
      }
      if (items[id].item === "none") {
        items[id] = dragItem.item;
      } else items[dragItem.id] = dragItem.item;
      this.dragItem = { item: null, id: null };
    }
  }
  static deleteItem(id: number) {
    this.items[id] = new this("none", 0, "-", "-");
  }
  static harvest(product: string) {
    product += "Product";
    let item = this.items.find((x) => x.item === product);
    if (item) {
      item.count++;
    } else {
      let id = 0;
      item = this.items.find((x, i) => {
        id = i;
        return x.item === "none";
      });
      if (item) {
        let name = "";
        switch (product) {
          case "potatoProduct":
            name = "Картофель";
            break;
          case "wheatProduct":
            name = "Пшеница";
            break;
        }
        this.items[id] = new this(product, 1, "product", name);
      }
    }
  }
  static checkExistance(x: number, y: number) {
    if (x < 0 || x > 3) return false;
    if (y < 0) return false;
    if (x + y * 4 >= this.items.length) return false;
    return true;
  }
}
Inv.addCell("potatoSeed", 10, "seed", "Картофель");
Inv.addCell("wheatSeed", 10, "seed", "Пшеница");
for (let i = 2; i < 16; i++) {
  Inv.addCell("none", 0, "-", "-");
}
export default Inv;
