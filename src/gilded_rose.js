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
          if (increasesInQuality(item)) {
            item.quality++;
          }
          if (itemIsPastSaleDate && increasesInQuality(item)) {
            item.quality++;
          }
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          if (increasesInQuality(item)) {
            item.quality++;
            if (item.sellIn < 11) {
              if (increasesInQuality(item)) {
                item.quality++;
              }
            }
            if (item.sellIn < 6) {
              if (increasesInQuality(item)) {
                item.quality++;
              }
            }
          }
          if (itemIsPastSaleDate) {
            item.quality = 0;
          }
          break;
        default:
          if (decreasesInQuality(item)) {
            item.quality--;
          }
          if (!isLegendaryItem(item)) {
            item.sellIn--;
          }
          if (itemIsPastSaleDate && decreasesInQuality(item)) {
            item.quality--;
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
