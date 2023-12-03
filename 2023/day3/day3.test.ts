import { expect } from "chai";
import { resolvePart1, resolvePart2 } from "./day3";

describe("Day 3", () => {
  it("should resolve the first demo", async () => {
    expect(await resolvePart1("day3.input.demo.txt")).to.equal(4361);
  });

  it("should resolve first problem", async () => {
    expect(await resolvePart1("day3.input.txt")).to.equal(525911);
  });

  it("should resolve the second demo", async () => {
    expect(await resolvePart2("day3.input.demo.txt")).to.equal(467835);
  });

  it("should resolve the second problem", async () => {
    expect(await resolvePart2("day3.input.txt")).to.equal(75805607);
  });
});
