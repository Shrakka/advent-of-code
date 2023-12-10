import { expect } from "chai";
import { mergeRanges, resolveDemo1, resolveDemo2, resolvePart1, resolvePart2 } from "./day5";

const allRanges = [
  [
    { minFrom: 50, maxFrom: 97, minTo: 52, maxTo: 99 },
    { minFrom: 98, maxFrom: 99, minTo: 50, maxTo: 51 }
  ],
  [
    { minFrom: 0, maxFrom: 14, minTo: 39, maxTo: 53 },
    { minFrom: 15, maxFrom: 51, minTo: 0, maxTo: 36 },
    { minFrom: 52, maxFrom: 53, minTo: 37, maxTo: 38 }
  ],
  [
    { minFrom: 0, maxFrom: 6, minTo: 42, maxTo: 48 },
    { minFrom: 7, maxFrom: 10, minTo: 57, maxTo: 60 },
    { minFrom: 11, maxFrom: 52, minTo: 0, maxTo: 41 },
    { minFrom: 53, maxFrom: 60, minTo: 49, maxTo: 56 }
  ],
  [
    { minFrom: 18, maxFrom: 24, minTo: 88, maxTo: 94 },
    { minFrom: 25, maxFrom: 94, minTo: 18, maxTo: 87 }
  ],
  [
    { minFrom: 45, maxFrom: 63, minTo: 81, maxTo: 99 },
    { minFrom: 64, maxFrom: 76, minTo: 68, maxTo: 80 },
    { minFrom: 77, maxFrom: 99, minTo: 45, maxTo: 67 }
  ],
  [
    { minFrom: 0, maxFrom: 68, minTo: 1, maxTo: 69 },
    { minFrom: 69, maxFrom: 69, minTo: 0, maxTo: 0 }
  ],
  [
    { minFrom: 56, maxFrom: 92, minTo: 60, maxTo: 96 },
    { minFrom: 93, maxFrom: 96, minTo: 56, maxTo: 59 }
  ]
];

describe("Day 5", () => {
  it("should solve the first demo", async () => {
    expect(resolveDemo1()).to.equal(35);
  });

  it("should solve the first part", async () => {
    expect(resolvePart1()).to.equal(26273516);
  });

  it("should solve the second demo", async () => {
    expect(resolveDemo2()).to.equal(46);
  });

  it("should solve the second demo", async () => {
    expect(resolvePart2()).to.equal(0);
  });

  describe("merge ranges", () => {
    it("should merge ranges", async () => {
      const mergedRanges = mergeRanges(allRanges[0], allRanges[1]);
      // [
      //   { minFrom: 50, maxFrom: 97, minTo: 52, maxTo: 99 },
      //   { minFrom: 98, maxFrom: 99, minTo: 50, maxTo: 51 }
      // ],
      // [
      //   { minFrom: 0, maxFrom: 14, minTo: 39, maxTo: 53 },
      //   { minFrom: 15, maxFrom: 51, minTo: 0, maxTo: 36 },
      //   { minFrom: 52, maxFrom: 53, minTo: 37, maxTo: 38 }

      expect(mergedRanges).to.deep.equal([
        { minFrom: 0, maxFrom: 14, minTo: 39, maxTo: 53 },
        { minFrom: 15, maxFrom: 49, minTo: 0, maxTo: 34 },
        { minFrom: 50, maxFrom: 51, minTo: 37, maxTo: 38 },
        { minFrom: 52, maxFrom: 97, minTo: 54, maxTo: 99 },
        { minFrom: 98, maxFrom: 99, minTo: 35, maxTo: 36 }
      ]);
    });

    it.only("should merge previously merged range with next range", async () => {
      const mergedRanges = [
        { minFrom: 0, maxFrom: 14, minTo: 39, maxTo: 53 },
        { minFrom: 15, maxFrom: 49, minTo: 0, maxTo: 34 },
        { minFrom: 50, maxFrom: 51, minTo: 37, maxTo: 38 },
        { minFrom: 52, maxFrom: 97, minTo: 54, maxTo: 99 },
        { minFrom: 98, maxFrom: 99, minTo: 35, maxTo: 36 }
      ];

      const nextRange = [
        { minFrom: 0, maxFrom: 6, minTo: 42, maxTo: 48 },
        { minFrom: 7, maxFrom: 10, minTo: 57, maxTo: 60 },
        { minFrom: 11, maxFrom: 52, minTo: 0, maxTo: 41 },
        { minFrom: 53, maxFrom: 60, minTo: 49, maxTo: 56 }
      ]

      expect(mergeRanges(mergedRanges, nextRange)).to.deep.equal([
        { minFrom: 0, maxFrom: 6, minTo: 28, maxTo: 34 },
        { minFrom: 7, maxFrom: 10, minTo: 35, maxTo: 38 },
        { minFrom: 11, maxFrom: 14, minTo: 39, maxTo: 49 },
        { minFrom: 15, maxFrom: 49, minTo: 42, maxTo: 23 },
        { minFrom: 50, maxFrom: 51, minTo: 26, maxTo: 27 },
        { minFrom: 52, maxFrom: 52, minTo: 50, maxTo: 50 },
        { minFrom: 53, maxFrom: 97, minTo: 51, maxTo: 99 },
        { minFrom: 98, maxFrom: 99, minTo: 24, maxTo: 25 }
      ]); // VALEUR D'ARRIVER à vérifier !!
    });

    it.only("should recursively merge ranges", async () => {
      const mergedRanges = allRanges.slice(0, 3).reduce((mergedRange, currentRange) => mergeRanges(mergedRange, currentRange));

      console.log(mergedRanges);
    });
  });
});
