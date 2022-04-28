var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  describe("when items are not named Aged brie or Backstage passes to a TAFKAL80ETC concert", () => {
    it("should degrade quality of item(s) by one", function () {
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("foo", 1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality - 1);
    });
  });

  describe("when the item quality is less than 50", () => {
    it("should increment quality by one when items are named Aged brie", () => {
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("Aged Brie", 1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality + 1);
    });

    describe("when the item is named Backstage passes to a TAFKAL80ETC concert", () => {
      it("should increment quality by three when sellIn is less than 6 ", () => {
        const originalQuality = 10;
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, originalQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(originalQuality + 3);
      });
    });
  });

  describe("when items have a sellIn of less than 0", () => {
    it("should decrement quality by two when the item sellIn is less than 0 and the item name is not one of the non-degradable items", () => {
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("foo", -1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality - 2);
    });
  });
});
