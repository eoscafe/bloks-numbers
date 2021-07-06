import { BigNumber } from 'bignumber.js'

BigNumber.set({ ROUNDING_MODE: 1 })

export const BN = BigNumber
export type BN = BigNumber

export function add(...numbers: Array<number | BigNumber>) {
  let start = new BN(0)

  if (numbers.length) {
    for (const number of numbers) {
      start = start.plus(number)
    }
  }

  return start
}

export function substract(a: number | BigNumber, b: number | BigNumber) {
  return new BN(a).minus(b)
}

export function multiply(a: number | BigNumber, b: number | BigNumber) {
  return new BN(a).multipliedBy(b)
}

export function divide(a: number | BigNumber, b: number | BigNumber) {
  return new BN(a).dividedBy(b)
}