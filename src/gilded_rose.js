class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    const decreasesInQuality = (item) => item.quality > 0 && item.name != "Sulfuras, Hand of Ragnaros";
    const increasesInQuality = (item) => item.quality < 50;
    const isLegendaryItem = (item) => item.name == "Sulfuras, Hand of Ragnaros";

    return this.items.map((item) => {
      const itemIsPastSaleDate = item.sellIn < 0;

      switch (item.name) {
        case "Aged Brie":
          if (!increasesInQuality(item)) break;

          if (itemIsPastSaleDate) {
            item.quality += 2;
          } else {
            item.quality += 1;
          }
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          if (itemIsPastSaleDate) {
            item.quality = 0;
            break;
          }

          if (!increasesInQuality(item)) break;

          if (item.sellIn <= 5) {
            item.quality += 3;
            break;
          }
          if (item.sellIn <= 10) {
            item.quality += 2;
            break;
          }
          item.quality += 1;
          break;
        default:
          if (decreasesInQuality(item)) {
            if (itemIsPastSaleDate) {
              item.quality -= 2;
            } else {
              item.quality -= 1;
            }
          }
          if (!isLegendaryItem(item)) {
            item.sellIn--;
          }
          break;
      }

      return item;
    });
  }
}

module.exports = {
  Item,
  Shop,
};
