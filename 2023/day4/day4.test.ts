import { expect } from "chai";
import { resolveDemo1, resolveDemo2, resolvePart1, resolvePart2 } from "./day4";

describe("Day 4", () => {
  it("should solve the first demo", async () => {
    expect(resolveDemo1()).to.equal(13);
  });

  it("should solve the first part", async () => {
    expect(resolvePart1()).to.equal(27845);
  });

  it("should solve the second demo", async () => {
    expect(resolveDemo2()).to.equal(30);
  });

  it("should solve the second demo", async () => {
    expect(resolvePart2()).to.equal(9496801);
  });
});
