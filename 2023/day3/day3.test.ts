import { expect } from "chai";
import { resolvePart1 } from "./day3";

describe("Day 3", () => {
  it("should resolve the first demo", async () => {
    expect(await resolvePart1("day3.input.demo.txt")).to.equal(4361);
  });

  it("should resolve first problem", async () => {
    expect(await resolvePart1("day3.input.txt")).to.equal(525911);
  });
});
