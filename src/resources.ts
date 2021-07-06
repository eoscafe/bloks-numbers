import numbro from '@jafri/numbro'
import { displayNumberAsAmount } from './numbers'

export function bytesToKB(bytes = 0) {
  return numbro(bytes / 1024).format({ thousandSeparated: false, mantissa: 2 })
}

export function parseNetAndRam(bytes: number) {
  let parsedValue = 0
  let parsedText = ''

  if (bytes < 1024) {
    parsedValue = bytes
    parsedText = 'Bytes'
  } else if (bytes < 1048576) {
    parsedValue = bytes / 1024
    parsedText = 'KB'
  } else if (bytes < 1073741824) {
    parsedValue = bytes / 1048576
    parsedText = 'MB'
  } else if (bytes < 1099511627776) {
    parsedValue = bytes / 1073741824
    parsedText = 'GB'
  } else if (bytes < 1125899906842624) {
    parsedValue = bytes / 1099511627776
    parsedText = 'TB'
  }

  return `${displayNumberAsAmount(parsedValue, 2, true)} ${parsedText}`
}

export function parseCpu(us: number) {
  let parsedValue = 0
  let parsedText = ''

  if (us < 1000) {
    parsedValue = us
    parsedText = 'µs'
  } else if (us < 1000000) {
    parsedValue = us / 1000
    parsedText = 'ms'
  } else if (us < 60000000) {
    parsedValue = us / 1000000
    parsedText = 's'
  } else if (us < 3600000000) {
    parsedValue = us / 60000000
    parsedText = 'min'
  } else if (us < 3600000000000) {
    parsedValue = us / 3600000000
    parsedText = 'hours'
  } else {
    parsedValue = us / 86400000000
    parsedText = 'days'
  }

  return `${displayNumberAsAmount(parsedValue, 2, true)} ${parsedText}`
}
