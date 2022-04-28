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

  describe("when items are named Aged brie", () => {
    it("should increment quality by one", () => {
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("Aged Brie", 1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality + 1);
    });
  });
});
