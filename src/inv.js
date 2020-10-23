class Inv {
    constructor(item, count, type, name) {
        this.item = item;
        this.count = count;
        this.type = type;
        this.name = name;
    }
    static addCell(item, count, type, name) {
        this.items.push(new this(item, count, type, name));
    }
    static getSeeds() {
        return this.items.filter((item) => item.type === "seed");
    }
    static plantSeed(seed) {
        let id = 0;
        let item = this.getSeeds().find((x, i) => {
            id = i;
            return x.name === seed;
        });
        if (item) {
            item.count--;
            if (item.count < 1) {
                this.items[id] = new this("none", 0, "-", "-");
            }
        }
    }
    static startDrag(x, y) {
        x = Math.floor(x / 50);
        y = Math.floor(y / 50);
        if (x + y * 4 < 0 || x + y * 4 >= this.items.length)
            return false;
        this.dragItem.id = x + y * 4;
        let id = this.dragItem.id;
        if (this.items[id].item !== "none") {
            this.dragItem.item = this.items[id];
            this.items[id] = new this("none", 0, "-", "-");
            return true;
        }
        return false;
    }
    static endDrag(x, y) {
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
        if (items[id].item === "none") {
            if (dragItem.item) {
                items[id] = dragItem.item;
            }
        }
        else {
            if (dragItem.id != null && dragItem.item) {
                items[dragItem.id] = dragItem.item;
            }
        }
        dragItem = { item: null, id: null };
    }
}
Inv.items = [];
Inv.dragItem = { item: null, id: null };
Inv.addCell("potatoSeed", 10, "seed", "Картофель");
Inv.addCell("wheatSeed", 10, "seed", "Пшеница");
for (let i = 2; i < 16; i++) {
    Inv.addCell("none", 0, "-", "-");
}
export default Inv;
