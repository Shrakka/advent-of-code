import { log } from "node:console";
import { parseLinesSync, sum } from "../commons/utils";

function resolve1(filename: string) {
}

function resolve2(filename: string) {
  
}

export function resolveDemo1() {
  return resolve1("input.demo.txt");
}

export function resolvePart1() {
  return resolve1("input.txt");
}

export function resolveDemo2() {
  return resolve2("input.demo.txt");
}

export function resolvePart2() {
  return resolve2("input.txt");
}