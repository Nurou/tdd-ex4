class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  BACKSTAGE_PASSES = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"];

  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    const isABackstagePass = (item) => this.BACKSTAGE_PASSES.includes(item.name);
    const decreasesInQuality = (item) => item.quality > 0 && item.name != "Sulfuras, Hand of Ragnaros";
    const canIncrementQuality = (item) => item.quality < 50;
    const isLegendaryItem = (item) => item.name == "Sulfuras, Hand of Ragnaros";

    return this.items.map((item) => {
      if (!isABackstagePass(item)) {
        if (decreasesInQuality(item)) {
          item.quality--;
        }
      } else {
        if (canIncrementQuality(item)) {
          item.quality++;
          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            if (item.sellIn < 11) {
              if (canIncrementQuality(item)) {
                item.quality++;
              }
            }
            if (item.sellIn < 6) {
              if (canIncrementQuality(item)) {
                item.quality++;
              }
            }
          }
        }
      }

      if (!isLegendaryItem(item)) {
        item.sellIn--;
      }

      const itemIsPastSaleDate = item.sellIn < 0;

      if (itemIsPastSaleDate) {
        switch (item.name) {
          case "Aged Brie":
            if (canIncrementQuality(item)) {
              item.quality++;
            }
            break;
          case "Backstage passes to a TAFKAL80ETC concert":
            item.quality = 0;
            break;
          default:
            if (decreasesInQuality(item)) {
              item.quality--;
            }
            break;
        }
      }

      return item;
    });
  }
}

module.exports = {
  Item,
  Shop,
};
