import Items from "./index.js";

class Market extends Items {
  static addCell(item: string, type: string, name: string) {
    this.items.push(new this(item, type, name));
  }
}
Market.addCell("potatoSeed", "seed", "Картофель");
Market.addCell("wheatSeed", "seed", "Пшеница");
for (let i = 2; i < 16; i++) {
  Market.addCell("none", "-", "-");
}
export default Market;
