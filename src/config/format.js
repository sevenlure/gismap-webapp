export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm'
export const HH_MM = 'HH:mm'

export const FORMAT_LOCAL = 'en'
export const ROUND_DIGIT = 2 // Làm tròn số thap phan

// Hien tai qui ve mot kieu la "EN"
export function getFormatNumber(value, numberToFixed = 0) {
  if (typeof value === 'number') {
    let tempNumber = value.toLocaleString(FORMAT_LOCAL, {
      minimumFractionDigits: numberToFixed,
      maximumFractionDigits: numberToFixed
    })
    return value === 0 ? '0' : tempNumber
  } else {
    return '0'
  }
}
