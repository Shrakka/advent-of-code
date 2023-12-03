import { expect } from "chai";
import { resolveDemo1, resolvePart1 } from "./day2";

describe("Day 2", () => {
  it("should solve the demo file", async () => {
    expect(await resolveDemo1()).to.equal(8);
  });

  it("should solve the first part", async () => {
    expect(await resolvePart1()).to.equal(2076);
  });
});
