class Inv {
  static items: Inv[] = [];
  static dragItem = { item: null as null | Inv, id: null as null | number };
  item: string;
  count: number;
  type: string;
  name: string;
  constructor(item: string, count: number, type: string, name: string) {
    this.item = item;
    this.count = count;
    this.type = type;
    this.name = name;
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
    if (x + y * 4 < 0 || x + y * 4 >= this.items.length) return false;
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
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    let id = x + y * 4;
    let { items, dragItem } = this;
    if (id < 0 || id >= items.length) {
      if (dragItem.id !== null && dragItem.item) {
        items[dragItem.id] = dragItem.item;
      }
      dragItem = { item: null, id: null };
      return;
    }
    if (dragItem.id != null && dragItem.item) {
      if (items[id].item === "none") {
        items[id] = dragItem.item;
      } else items[dragItem.id] = dragItem.item;
    }
    dragItem = { item: null, id: null };
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
}
Inv.addCell("potatoSeed", 10, "seed", "Картофель");
Inv.addCell("wheatSeed", 10, "seed", "Пшеница");
for (let i = 2; i < 16; i++) {
  Inv.addCell("none", 0, "-", "-");
}
export default Inv;
