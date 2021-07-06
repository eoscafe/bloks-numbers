import dayjs from 'dayjs'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import utcPlugin from 'dayjs/plugin/utc'
import timezonePlugin from 'dayjs/plugin/timezone'
import advancedFormatPlugin from 'dayjs/plugin/advancedFormat'

dayjs.extend(relativeTimePlugin)
dayjs.extend(utcPlugin)
dayjs.extend(timezonePlugin)
dayjs.extend(advancedFormatPlugin)

const COMMON_DATE_FORMAT = 'MMM-DD-YYYY, hh:mm:ss A'

/**
 * Time utilities
 */
export function time(date?: dayjs.ConfigType) {
  return dayjs(date)
}
export function utcTime(date?: dayjs.ConfigType) {
  return dayjs(date).utc()
}
export function utcTimeToLocal(date?: dayjs.ConfigType) {
  return dayjs(date).local()
}
export function unixTime(unixTimestamp: number) {
  return dayjs.unix(unixTimestamp)
}
export function formatDate(date: dayjs.ConfigType, format: string = COMMON_DATE_FORMAT) {
  return dayjs(date).format(format)
}
export function formatDateLocal(date: dayjs.ConfigType, format: string = COMMON_DATE_FORMAT) {
  return dayjs(date)
    .utc()
    .format(format)
}
export function timestampToDate(timestamp: string) {
  return new Date(timestamp)
}
export function utcTimestampToDate(timestamp: string) {
  timestamp = timestamp.slice(-1) === 'Z' ? timestamp : timestamp + 'Z'
  return new Date(timestamp)
}
export function timestampFromNow(timestamp: string) {
  return time(timestamp).fromNow()
}
export function utcTimestampFromNow(timestamp: string) {
  timestamp = timestamp.slice(-1) === 'Z' ? timestamp : timestamp + 'Z'
  return time(timestamp).fromNow()
}
export function parseTimestamp(timestamp: string, format = COMMON_DATE_FORMAT) {
  return formatDate(timestampToDate(timestamp), format)
}
export function parseUtcTimestamp(timestamp: string, format = COMMON_DATE_FORMAT) {
  return formatDate(utcTimestampToDate(timestamp), format)
}

export function inFuture(date: dayjs.ConfigType, utc: boolean = false) {
  return utc ? utcTime(date).isAfter(utcTime()) : time(date).isAfter(time())
}
export function inPast(date: dayjs.ConfigType, utc: boolean = false) {
  return utc ? utcTime(date).isBefore(utcTime()) : time(date).isBefore(time())
}
export function isSameDay(start: dayjs.ConfigType, end: dayjs.ConfigType = time()) {
  return dayjs(start).isSame(dayjs(end), 'day')
}

// Seconds till now if second param empty
export function secondsFrom(start: dayjs.ConfigType, end: dayjs.ConfigType = time()) {
  return dayjs(start).diff(dayjs(end), 'second' as any)
}
export function millisecondsFrom(start: dayjs.ConfigType, end: dayjs.ConfigType = time()) {
  return dayjs(start).diff(dayjs(end))
}

/**
 * Specific to EOS
 */
export function startDate(startDate: dayjs.ConfigType, days = 3) {
  return dayjs(startDate)
    .clone()
    .subtract(days, 'days' as any)
}
export function formatStartDate(startTimestamp: dayjs.ConfigType) {
  return startDate(startTimestamp).format('MMM-DD-YYYY, hh:mm:ss A')
}
export function endDate(endDate: dayjs.ConfigType, days = 3) {
  return dayjs(endDate)
    .clone()
    .add(days, 'days' as any)
}
export function formatEndDate(endTimestamp: dayjs.ConfigType) {
  return endDate(endTimestamp).format('MMM-DD-YYYY, hh:mm:ss A')
}
export function dateToUtcTimePoint(date: dayjs.ConfigType = time()) {
  return dayjs(date)
    .utc()
    .format('YYYY-MM-DDTHH:mm:ss.SSS')
}
export const emptyTimePoint = '1970-01-01T00:00:00.000'

export function parseSeconds(seconds: number) {
  let days = 0
  let hours = 0
  let minutes = 0
  let parsedDate = ''

  // Days
  if (seconds > 86400) {
    days += Math.floor(seconds / 86400)
    seconds -= days * 86400
    parsedDate += `${days.toFixed(0)} ${days === 1 ? 'Day' : 'Days'} `
  }

  // Hours
  if (seconds > 3600) {
    hours += Math.floor(seconds / 3600)
    seconds -= hours * 3600
    parsedDate += `${hours.toFixed(0)} ${hours === 1 ? 'Hour' : 'Hours'} `
  }

  // Minutes
  if (seconds > 60) {
    minutes += Math.floor(seconds / 60)
    seconds -= minutes * 60
    parsedDate += `${minutes.toFixed(0)} ${minutes === 1 ? 'Minute' : 'Minutes'} `
  }

  // Seconds
  if (seconds > 0) {
    parsedDate += `${seconds.toFixed(0)} Seconds `
  }

  return parsedDate
}
