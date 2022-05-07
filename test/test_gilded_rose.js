var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("should not do anything when there are no items ", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items.length).to.equal(0);
  });

  describe("when items are not named Aged brie or Backstage passes to a TAFKAL80ETC concert", () => {
    it("should degrade quality of item(s) by one", function () {
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("foo", 1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality - 1);
    });

    it("should not update if quality is 0", () => {
      const originalQuality = 0;
      const gildedRose = new Shop([new Item("foo", 1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality);
    });

    it("should not update if item name is 'Sulfuras, Hand of Ragnaros'", () => {
      const originalQuality = 1;
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality);
    });

    it("should not update if quality is 0", () => {
      const originalQuality = 0;

      const gildedRose = new Shop([new Item("foo", 1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality);
    });

    describe("when the item sell in is less than 0", () => {
      it("should decrement quality by two when the quality is greater than 0", () => {
        const originalQuality = 10;
        const gildedRose = new Shop([new Item("foo", -1, originalQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(originalQuality - 2);
      });
      it("should not decrement quality when quality is 0", () => {
        const originalQuality = 0;
        const gildedRose = new Shop([new Item("foo", -1, originalQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(originalQuality);
      });
      it("should not decrement quality when quality is greater than 0 and item name is 'Sulfuras, Hand of Ragnaros'", () => {
        const originalQuality = 1;
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, originalQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(originalQuality);
      });
    });
  });

  describe("when the item is Aged Brie", () => {
    it("should increment quality by one when quality is less than 50", () => {
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("Aged Brie", 1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality + 1);
    });

    it("should increment the quality by 2 when quality is less than 50", () => {
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("Aged Brie", -1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality + 2);
    });

    it("should not increment quality when quality is 50", () => {
      const originalQuality = 50;
      const gildedRose = new Shop([new Item("Aged Brie", 1, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality);
    });
  });

  describe("when the item is named Backstage passes to a TAFKAL80ETC concert", () => {
    it("should increment quality by three when quality is less than 50 and sell in is 5 or less", () => {
      const sellIn = 1;
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality + 3);
    });

    it("should increment quality by two when quality is less than 50 and sell in is between 10 and 6", () => {
      const sellIn = 6;
      const originalQuality = 48;
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality + 2);
    });

    it("should increment quality by one when quality is less than 50 and sell in is 11", () => {
      const sellIn = 11;
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality + 1);
    });

    it("should not increment quality when quality is 50", () => {
      const sellIn = 7;
      const originalQuality = 50;
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(originalQuality);
    });

    it("should increment quality by two when quality is less than 50 and sell in is between 10 and 6", () => {
      const sellIn = 6;
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
    });

    it("should set the quality to 0 when the concert has ended", () => {
      const sellIn = -1;
      const originalQuality = 10;
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, originalQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });
  });

  it("should not decrement the sell in of items named 'Sulfuras, Hand of Ragnaros'", () => {
    const originalSellIn = 1;
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", originalSellIn, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(originalSellIn);
  });

  it("should decrement the sell in of items by one for an item not named 'Sulfuras, Hand of Ragnaros'", () => {
    const originalSellIn = 1;
    const gildedRose = new Shop([new Item("foo", originalSellIn, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(originalSellIn - 1);
  });
});
