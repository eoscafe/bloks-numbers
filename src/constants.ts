export const currencyMap: {
  [name: string]: {
    symbol: string
    precision: number
  }
} = {
  // Fiat
  GBP: { symbol: '£', precision: 2 },
  EUR: { symbol: '€', precision: 2 },
  JPY: { symbol: '¥', precision: 0 },
  CAD: { symbol: 'CA$', precision: 2 },
  USD: { symbol: '$', precision: 2 },
  INR: { symbol: '₹', precision: 2 },
  CNY: { symbol: 'CN¥', precision: 2 },
  HKD: { symbol: 'HK$', precision: 2 },
  KRW: { symbol: '₩', precision: 0 },
  AUD: { symbol: 'AUD$', precision: 2 },
  SAR: { symbol: 'SR', precision: 2 },

  // Crypto
  ETH: { symbol: 'Ξ', precision: 4 },
  BTC: { symbol: '₿', precision: 8 },
  EOS: { symbol: 'EOS', precision: 4 }
}
  
export const assetFormat = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3
}
