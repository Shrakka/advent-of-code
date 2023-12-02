import { describe, it } from "mocha";
import { expect } from "chai";
import { combineFirstAndLastDigits, resolveDemo, resolveFirst } from "./day1";

describe("Day 1", () => {
  describe("combineFirstAndLastDigits", () => {
    it("should combine the first and last digits", () => {
      const line = "1abc2";
  
      const result = combineFirstAndLastDigits(line);
  
      expect(result).to.equal(12);
    });
  
    it("should combine the first and last digits", () => {
      const line = "pqr3stu8vwx";
  
      const result = combineFirstAndLastDigits(line);
  
      expect(result).to.equal(38);
    });
  
    it("should combine the first and last digits", () => {
      const line = "a1b2c3d4e5f";
  
      const result = combineFirstAndLastDigits(line);
  
      expect(result).to.equal(15);
    });
  
    it("should combine the first and last digits", () => {
      const line = "treb7uchet";
  
      const result = combineFirstAndLastDigits(line);
  
      expect(result).to.equal(77);
    });
  });

  describe("resolveDemo", () => {
    it("should return the expected value for the demo", async () => {
      const result = await resolveDemo();
            
      expect(result).to.equal(142);
    });
  });

  describe("resolveFirst", () => {
    it("should return the expected value for the first input file", async () => {
      const result = await resolveFirst();
            
      expect(result).to.equal(55607);
    });
  });
});

