import { describe, it } from "mocha";
import { expect } from "chai";
import { combineFirstAndLastDigitLetters, combineFirstAndLastDigits, resolveFirstDemo, resolveFirst, resolveSecond, resolveSecondDemo } from "./day1";

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

  describe("combineFirstAndLastDigitLetters", () => {
    it("should combine the first and last digits", () => {
      const line = "two1nine";
  
      const result = combineFirstAndLastDigitLetters(line);
  
      expect(result).to.equal(29);
    });
  
    it("should combine the first and last digits", () => {
      const line = "eightwothree";
  
      const result = combineFirstAndLastDigitLetters(line);
  
      expect(result).to.equal(83);
    });
  
    it("should combine the first and last digits", () => {
      const line = "abcone2threexyz";
  
      const result = combineFirstAndLastDigitLetters(line);
  
      expect(result).to.equal(13);
    });
  
    it("should combine the first and last digits", () => {
      const line = "xtwone3four";
  
      const result = combineFirstAndLastDigitLetters(line);
  
      expect(result).to.equal(24);
    });

    it("should combine the first and last digits", () => {
      const line = "4nineeightseven2";
  
      const result = combineFirstAndLastDigitLetters(line);
  
      expect(result).to.equal(42);
    });

    it("should combine the first and last digits", () => {
      const line = "zoneight234";
  
      const result = combineFirstAndLastDigitLetters(line);
  
      expect(result).to.equal(14);
    });

    it("should combine the first and last digits", () => {
      const line = "7pqrstsixteen";
  
      const result = combineFirstAndLastDigitLetters(line);
  
      expect(result).to.equal(76);
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
      expect(result).to.equal(0);
    });
  });
});

