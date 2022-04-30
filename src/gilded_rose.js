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
    const BACKSTAGE_PASSES = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"];
    const isABackstagePass = (item) => BACKSTAGE_PASSES.includes(item.name);
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

      const pastSaleDate = item.sellIn < 0;

      if (pastSaleDate) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (item.quality > 0) {
              if (item.name != "Sulfuras, Hand of Ragnaros") {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = 0;
          }
        } else {
          if (canIncrementQuality(item)) {
            item.quality++;
          }
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
