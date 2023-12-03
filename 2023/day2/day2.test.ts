import { expect } from "chai";
import { resolveDemo1, resolveDemo2, resolvePart1, resolvePart2 } from "./day2";

describe("Day 2", () => {
  it("should solve the demo file", async () => {
    expect(await resolveDemo1()).to.equal(8);
  });

  it("should solve the first part", async () => {
    expect(await resolvePart1()).to.equal(2076);
  });

  it("should solve the second demo", async () => {
    expect(await resolveDemo2()).to.equal(2286);
  });

  it("should solve the first part", async () => {
    expect(await resolvePart2()).to.equal(70950);
  });
});
