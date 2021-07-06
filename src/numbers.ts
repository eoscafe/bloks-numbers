import numbro from '@jafri/numbro'
import { assetFormat, currencyMap } from './constants'
import { BN } from './bn'

export function toBN(number: string) {
  return new BN(number)
}
export function numberToAmount(
  number: number | BN,
  precision: number,
  round: any = BN.ROUND_DOWN
) {
  return new BN(number).toFixed(precision, round)
}
export function numberToAmountFormatted(
  number: number,
  precision: number,
  round = BN.ROUND_DOWN
) {
  return new BN(number).toFormat(precision, round, assetFormat)
}
export function calculatePercentage(
  balance: number,
  percentage: number,
  precision: number
) {
  const final = new BN(balance).multipliedBy(percentage)
  return numberToAmount(final, precision, BN.ROUND_DOWN)
}
export function eosDisplayFormatting(
  value: number,
  symbol: string,
  precision: number
) {
  return `${numberToAmountFormatted(value, precision)} ${symbol}`
}

export function numberToEos(number: number, symbol: string, precision: number) {
  return `${numberToAmount(number, precision)} ${symbol}`
}

export function numberToEosRoundUp(
  number: number,
  symbol: string,
  precision: number
) {
  return `${numberToAmount(number, precision, BN.ROUND_UP)} ${symbol}`
}

export function parseRex(rex: number) {
  return new BN(rex).dividedBy(10000)
}

/**
 * Converts USD to { symbol: "USD", precision: 4 }
 * @param {*} currency
 */
export function currencyToSymbol(currency: string) {
  return currencyMap[currency]
}

/**
 * Converts "1000.0000 EOS" to { amount: 1000, symbol: { code: "EOS", precision: 4 }}
 * @param {*} quantity
 */
export function split(quantity: string) {
  const [amount, code] = quantity.split(' ')
  const precision = (amount.split('.')[1] || []).length

  return {
    amount: +amount,
    symbol: {
      code,
      precision
    }
  }
}

export function toNumbro(number: number) {
  return numbro(number)
}

/**
 * Converts 1000 to "1000.0000 EOS"
 * @param {*} asset
 */
export function numberToAsset(
  number: number,
  symbol: number,
  precision: number,
  trimMantissa = false
) {
  const amount = numbro(number).format({
    thousandSeparated: false,
    mantissa: precision,
    trimMantissa
  })
  return `${amount} ${symbol}`
}

/**
 * DISPLAY FUNCTIONS
 */

/**
 * Converts 1000 to 1,000
 * @param {*} number
 */
export function displayNumber(number: number, trimMantissa = false) {
  return numbro(number).format({
    thousandSeparated: true,
    trimMantissa
  })
}

/**
 * Converts 1000 to $1,000 USD
 * @param {*} number
 */
export function displayNumberAsCurrency(number: number, currency = 'USD', precision: number) {
  const { symbol, precision: defaultPrecision } = currencyMap[currency]
  const formattedNumber = numbro(number).format({
    thousandSeparated: true,
    mantissa: precision !== undefined ? precision : defaultPrecision
  })
  return `${symbol}${formattedNumber}`
}

/**
 * Converts "1000.0000 EOS" to "1,000.0000 EOS"
 * @param {*} asset
 */
export function displayAsset(asset: string) {
  const {
    amount,
    symbol: { code }
  } = split(asset)
  return `${displayNumber(amount)} ${code}`
}

/**
 * Converts 1000 to 1,000.0000
 * @param {*} number
 */
export function displayNumberAsAmount(
  number: number,
  precision: number,
  trimMantissa = false
) {
  return numbro(number).format({ thousandSeparated: true, mantissa: precision, trimMantissa })
}

/**
 * Converts 1000 to "1,000.0000 EOS"
 * @param {*} number
 */
export function displayNumberAsAsset(
  number: number,
  symbol: string,
  precision: number,
  trimMantissa = false
) {
  const amount = numbro(number).format({
    thousandSeparated: true,
    mantissa: precision,
    trimMantissa
  })
  return `${amount} ${symbol}`
}

/**
 * Converts 10000000 to "1,000.0000 EOS"
 * @param {*} number
 */
export function displayRawNumberAsAsset(
  number: number,
  symbol: string,
  precision: number,
  trimMantissa = false
) {
  return displayNumberAsAsset(number / Math.pow(10, precision), symbol, precision, trimMantissa)
}