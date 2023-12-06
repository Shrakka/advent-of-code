import { expect } from "chai";
import { resolveDemo1, resolveDemo2, resolvePart1, resolvePart2 } from "./day5";

describe.only("Day 5", () => {
  it("should solve the first demo", async () => {
    expect(resolveDemo1()).to.equal(0);
  });

  // it("should solve the first part", async () => {
  //   expect(resolvePart1()).to.equal(0);
  // });

  // it("should solve the second demo", async () => {
  //   expect(resolveDemo2()).to.equal(0);
  // });

  // it("should solve the second demo", async () => {
  //   expect(resolvePart2()).to.equal(0);
  // });
});
