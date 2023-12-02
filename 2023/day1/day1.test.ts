import { describe, it } from "mocha";
import { expect } from "chai";
import { combineFirstAndLastDigitLetters, combineFirstAndLastDigits, resolveFirstDemo, resolveFirst, resolveSecond, resolveSecondDemo } from "./day1";

describe("Day 1", () => {
  describe("combineFirstAndLastDigits", () => {
    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigits("1abc2")).to.equal(12);
    });
  
    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigits("pqr3stu8vwx")).to.equal(38);
    });
  
    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigits("a1b2c3d4e5f")).to.equal(15);
    });
  
    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigits("treb7uchet")).to.equal(77);
    });
  });

  describe("combineFirstAndLastDigitLetters", () => {
    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigitLetters("two1nine")).to.equal(29);
    });
  
    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigitLetters("eightwothree")).to.equal(83);
    });
  
    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigitLetters("abcone2threexyz")).to.equal(13);
    });
  
    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigitLetters("xtwone3four")).to.equal(24);
    });

    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigitLetters("4nineeightseven2")).to.equal(42);
    });

    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigitLetters("zoneight234")).to.equal(14);
    });

    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigitLetters("7pqrstsixteen")).to.equal(76);
    });

    it("should combine the first and last digits", () => {
      expect(combineFirstAndLastDigitLetters("oneight")).to.equal(18); // https://mtsknn.fi/blog/how-to-do-overlapping-matches-with-regular-expressions/
    });
  });

  describe("resolveFirstDemo", () => {
    it("should return the expected value for the demo", async () => {
      const result = await resolveFirstDemo();  
      expect(result).to.equal(142);
    });
  });

  describe("resolveFirst", () => {
    it("should return the expected value for the first input file", async () => {
      const result = await resolveFirst();
      expect(result).to.equal(55607);
    });
  });

  describe("resolveSecondDemo", () => {
    it("should return the expected value for the first input file", async () => {
      const result = await resolveSecondDemo();
      expect(result).to.equal(281);
    });
  });

  describe("resolveSecond", () => {
    it("should return the expected value for the first input file", async () => {
      const result = await resolveSecond();
      expect(result).to.equal(55291);
    });
  });
});

