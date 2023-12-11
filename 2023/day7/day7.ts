import _ from "lodash";
import { parseLinesSync } from "../commons/utils";

function resolve1(filename: string) {
  const lineStrings = parseLinesSync(filename, __dirname);
  
  const handInfos = lineStrings.map(line => {
    const [handString, scoreString] = line.split(" ");
    return {
      score: parseFloat(scoreString),
      originalHand: handString.split(""),
      hand: handString.split("").toSorted(compareCards),
      handType: getHandType(handString.split(""))
    };
  }).sort(compareHands);
  
  return handInfos.reduce((acc, handInfo, index) => acc + (index + 1) * handInfo.score, 0);
}

function resolve2(filename: string) {
  const lineStrings = parseLinesSync(filename, __dirname);
  
  const handInfos = lineStrings.map(line => {
    const [handString, scoreString] = line.split(" ");
    return {
      score: parseFloat(scoreString),
      originalHand: handString.split(""),
      hand: handString.split("").toSorted(compareCards),
      handType: getHandTypeWithJoker(handString.split(""))
    };
  }).sort(compareHands);
  
  return handInfos.reduce((acc, handInfo, index) => acc + (index + 1) * handInfo.score, 0);
}

interface HandInfo {
  score: number;
  originalHand: string[];
  hand: string[];
  handType: string;
}

function compareCards(card1: string, card2: string) {
  const cardOrder = "AKQJT98765432";
  return cardOrder.indexOf(card1) - cardOrder.indexOf(card2)
}

function compareHands(hand1: HandInfo, hand2: HandInfo) {
  const handOrders = [
    "five-of-a-kind",
    "four-of-a-kind",
    "full-house",
    "three-of-a-kind",
    "two-pairs",
    "one-pair",
    "highest-card"
  ];
  
  const hand1Worth = handOrders.indexOf(hand1.handType);
  const hand2Worth = handOrders.indexOf(hand2.handType);
  
  if (hand1Worth === hand2Worth) {
    for (const [index] of hand1.originalHand.entries()) {
      const hand1card = hand1.originalHand[index];
      const hand2card = hand2.originalHand[index];
      if (hand1card === hand2card) { continue; }

      return compareCards(hand2card, hand1card);
    }
  }

  return hand2Worth - hand1Worth;
}

function getHandType(hand: string[]) { // hand is sorted
  const set = [...new Set(hand)];
  if (set.length === 1) { return "five-of-a-kind"; }

  if (set.length === 2) { // four-of-a-kind OR full-house
    const [leastOccuring] = Object.values(_.countBy(hand)).toSorted();
    if (leastOccuring === 1) { return "four-of-a-kind"; }
    return "full-house";
  }

  if (set.length === 3) { // three-of-a-kind OR two pairs
    const [,, mostOccuring] = Object.values(_.countBy(hand)).toSorted();
    if (mostOccuring === 3) { return "three-of-a-kind"; }
    return "two-pairs";
  }

  if (set.length === 4) { return "one-pair"; }

  return "highest-card";
}

function getHandTypeWithJoker(hand: string[]) { // hand is sorted
  const set = [...new Set(hand)];
  if (set.length === 1) { return "five-of-a-kind"; }

  if (set.length === 2) { // four-of-a-kind OR full-house
    const [leastOccuring] = Object.values(_.countBy(hand)).toSorted();
    if (leastOccuring === 1) { return "four-of-a-kind"; }
    return "full-house";
  }

  if (set.length === 3) { // three-of-a-kind OR two pairs
    const [,, mostOccuring] = Object.values(_.countBy(hand)).toSorted();
    if (mostOccuring === 3) { return "three-of-a-kind"; }
    return "two-pairs";
  }

  if (set.length === 4) { return "one-pair"; }

  return "highest-card";
}

export function resolveDemo1() {
  return resolve1("input.demo.txt");
}

export function resolvePart1() {
  return resolve1("input.txt");
}

export function resolveRedditDemo() {
  return resolve1("input.demo.reddit.txt");
}

export function resolveDemo2() {
  return resolve2("input.demo.txt");
}

export function resolvePart2() {
  return resolve2("input.txt");
}

export function resolveRedditDemo2() {
  return resolve2("input.demo.reddit.txt");
}