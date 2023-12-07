import { expect } from "chai";
import { resolveDemo1, resolveDemo2, resolvePart1, resolvePart2 } from "./day5";

describe("Day 5", () => {
  it("should solve the first demo", async () => {
    expect(resolveDemo1()).to.equal(35);
  });

  it("should solve the first part", async () => {
    expect(resolvePart1()).to.equal(26273516);
  });

  it.only("should solve the second demo", async () => {
    expect(resolveDemo2()).to.equal(46);
  });

  it("should solve the second demo", async () => {
    expect(resolvePart2()).to.equal(0);
  });
});
