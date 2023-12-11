import { expect } from "chai";
import { resolveDemo1, resolveDemo2, resolvePart1, resolvePart2, resolveRedditDemo, resolveRedditDemo2 } from "./day7";

describe.only("Day 7", () => {
  it("should solve the first demo", async () => {
    expect(resolveDemo1()).to.equal(6440);
  });

  it("should solve the reddit demo", async () => {
    expect(resolveRedditDemo()).to.equal(6592);
  });

  it.only("should solve the first part", async () => {
    expect(resolvePart1()).to.equal(251216224);
  });

  // ------------


  it.only("should solve the reddit demo", async () => {
    expect(resolveRedditDemo2()).to.equal(6839);
  });

  it.only("should solve the second demo", async () => {
    expect(resolveDemo2()).to.equal(5905);
  });

  it("should solve the second demo", async () => {
    expect(resolvePart2()).to.equal(0);
  });
});
