import { BN } from './bn'
import { assert } from './utils'

export namespace Maths {
  export enum Operations {
    PLUS = 'plus',
    MULTIPLY = 'multipliedBy',
    DIVIDE = 'dividedBy',
    MINUS = 'minus'
  }
}

export class Asset {
  symbol: Symbol;
  amount: BN;

  get integerAmount () {
    const factor = Math.pow(10, this.symbol.precision)
    return this.amount.multipliedBy(factor)
  }

  constructor(asset: {
    code: string;
    precision: number;
    amount: BN | number | string;
  }) {
    this.symbol = new Symbol({
      code: asset.code,
      precision: asset.precision
    })
    this.amount = new BN(asset.amount)
  }

  static fromString (asset: string) {
    const [amount, code] = asset.split(' ')
    const precision = (amount.split('.')[1] || []).length
    
    return new Asset({
      code: code,
      precision: precision,
      amount: new BN(amount)
    })
  }

  static fromSymbol ({ symbol, amount }: {
    symbol: Symbol,
    amount: BN
  }) {
    if (!(symbol instanceof Symbol)) {
      throw new Error('Invalid symbol')
    }

    return new Asset({
      code: symbol.code,
      precision: symbol.precision,
      amount: amount
    })
  }

  isEqualTo (asset: Asset) {
    return this.isLooselyEqualTo(asset) && this.amount == asset.amount
  }

  isLooselyEqualTo (asset: Asset) {
    return this.symbol.isEqualTo(asset.symbol)
  }

  toString () {
    return `${new BN(this.amount).toFixed(this.symbol.precision, BN.ROUND_DOWN)} ${this.symbol.code}`
  }

  modifyAmount (x: number | BN | Asset, method: Maths.Operations): Asset {
    let amount: BN = new BN(0)

    if (typeof x === "number" || BN.isBigNumber(x)) {
      amount = new BN(x)
    }

    if (x instanceof Asset) {
      assert(this.isLooselyEqualTo(x), "invalid symbol")
      amount = new BN(x.amount)
    }

    return Asset.fromSymbol({
      symbol: this.symbol,
      amount: this.amount[method](amount)
    })
  }

  plus (x: number): Asset;
  plus (x: Asset): Asset;
  plus (x: any): Asset {
    return this.modifyAmount(x, Maths.Operations.PLUS)
  }

  minus (x: number): Asset;
  minus (x: Asset): Asset;
  minus (x: any): Asset {
    return this.modifyAmount(x, Maths.Operations.MINUS)
  }

  multipliedBy (x: number): Asset;
  multipliedBy (x: Asset): Asset;
  multipliedBy (x: any): Asset {
    return this.modifyAmount(x, Maths.Operations.MULTIPLY)
  }

  dividedBy (x: number): Asset;
  dividedBy (x: Asset): Asset;
  dividedBy (x: any): Asset {
    return this.modifyAmount(x, Maths.Operations.DIVIDE)
  }
}

export class ExtendedAsset {
  quantity: Asset;
  contract: string

  constructor(extendedAsset: {
    quantity: Asset;
    contract: string;
  }) {
    if (!(extendedAsset.quantity instanceof Asset)) {
      throw new Error('Invalid quantity')
    }

    this.quantity = extendedAsset.quantity
    this.contract = extendedAsset.contract
  }

  isEqualTo (extendedAsset: ExtendedAsset) {
    return this.contract === extendedAsset.contract && this.quantity.isEqualTo(extendedAsset.quantity)
  }

  isLooselyEqualTo (extendedAsset: ExtendedAsset) {
    return this.contract === extendedAsset.contract && this.quantity.isLooselyEqualTo(extendedAsset.quantity)
  }

  toString () {
    return `${this.quantity.toString()}@${this.contract}`
  }

  modifyAmount (x: number | BN | Asset | ExtendedAsset, method: Maths.Operations): ExtendedAsset {
    let amount: number | BN | Asset = new BN(0)

    if (x instanceof ExtendedAsset) {
      assert(this.isLooselyEqualTo(x), "invalid contract or symbol")
      amount = x.quantity
    } else {
      amount = x
    }

    return new ExtendedAsset({
      contract: this.contract,
      quantity: this.quantity.modifyAmount(amount, method)
    })
  }

  plus (x: number): ExtendedAsset;
  plus (x: Asset): ExtendedAsset;
  plus (x: any): ExtendedAsset {
    return this.modifyAmount(x, Maths.Operations.PLUS)
  }

  minus (x: number): ExtendedAsset;
  minus (x: Asset): ExtendedAsset;
  minus (x: any): ExtendedAsset {
    return this.modifyAmount(x, Maths.Operations.MINUS)
  }

  multipliedBy (x: number): ExtendedAsset;
  multipliedBy (x: Asset): ExtendedAsset;
  multipliedBy (x: any): ExtendedAsset {
    return this.modifyAmount(x, Maths.Operations.MULTIPLY)
  }

  dividedBy (x: number): ExtendedAsset;
  dividedBy (x: Asset): ExtendedAsset;
  dividedBy (x: any): ExtendedAsset {
    return this.modifyAmount(x, Maths.Operations.DIVIDE)
  }
}

export class Symbol {
  precision: number;
  code: string;

  constructor(symbol: {
    code: string;
    precision: number;
  }) {
    this.precision = symbol.precision
    this.code = symbol.code
  }

  static fromString (symbol: string): Symbol {
    const [precision, code] = symbol.split(',')
    return new Symbol({
      precision: +precision,
      code: code
    })
  }

  isEqualTo (symbol: Symbol) {
    return this.code === symbol.code && this.precision === symbol.precision
  }

  toString () {
    return `${this.precision},${this.code}`
  }
}

export class ExtendedSymbol {
  contract: string;
  sym: Symbol;

  constructor(sym: Symbol, contract: string) {
    this.sym = sym
    this.contract = contract
  }

  isEqualTo (extendedSymbol: ExtendedSymbol) {
    return this.sym.isEqualTo(extendedSymbol.sym) && this.contract === extendedSymbol.contract
  }

  toString () {
    return `${this.sym.toString()}@${this.contract}`
  }
}
