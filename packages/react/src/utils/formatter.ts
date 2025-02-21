import dayjs, { Dayjs } from 'dayjs'

export const onlyString = (string: string) => {
  if (!string) return ''

  const regExp = /[^0-9]/g // 숫자가 아닌 문자열을 선택하는 정규식
  // 원래 문자열에서 숫자가 아닌 모든 문자열을 빈 문자로 변경
  return string.replace(regExp, '')
}

export const onlyNumber = (string: string) => {
  if (!string) return ''

  const regExp = /[^0-9]/g // 숫자가 아닌 문자열을 선택하는 정규식
  // 원래 문자열에서 숫자가 아닌 모든 문자열을 빈 문자로 변경
  return string.replace(regExp, '')
}

export const addZeroFirstString = (num: number) => {
  if (num === undefined) return

  return (num + '').length === 1 ? `0${num}` : num
}

export const changeFirstStringUpperCase = (string: string) => {
  return string.replace(/^[a-z]/, string => string.toUpperCase())
}

export const comma = (str: string) => str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')

export const unComma = (str: string) => str.replace(/[^\d]+/g, '')

export const formatCurrency = (number: string) => number && comma(unComma(number))

export const formatDDMMYYHHmm = (date: string) => {
  if (!date) return ''

  return dayjs(date).format('DD/MM/YY, HH:mm')
}

export const formatDDMMYYYYHHmm = (date: string) => {
  if (!date) return ''

  return dayjs(date).format('DD/MM/YY, HH:mm')
}

export const isNumber = (string: string) => {
  const regExp = /[^0-9]/g // 숫자가 아닌 문자열을 선택하는 정규식

  return regExp.test(string)
}

export const numericOnlyWithColons = (v: string) => {
  // eslint-disable-next-line
  const regex = /[^0-9\:]/g

  return v.replaceAll(regex, '')
}

export const deleteObjectKeyWithEmptyValue = (obj: any) => {
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return obj
}

export const isSameValueDeleteKey = (prevObj: any, newObj: any) => {
  for (const key in newObj) {
    if (newObj[key] === prevObj[key]) {
      delete newObj[key]
    }
  }

  return deleteObjectKeyWithEmptyValue(newObj)
}

export const numericOnly = (v: string) => {
  const regex = /[^0-9]/g

  return v.toString().replaceAll(regex, '')
}

export const stringOnly = (v: string) => {
  const regex = /[^a-zA-Z가-힣]/g

  return v.toString().replaceAll(regex, '')
}

export const formatPeriodLocalToUtc = (localTime: string[] | undefined) => {
  if (!localTime) return localTime

  return {
    startDate: dayjs.utc(dayjs(localTime[0])).toISOString(),
    endDate: dayjs.utc(dayjs(localTime[1])).add(1, 'day').toISOString(),
  }
}

export const formatFullName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName}`.trim()

export const formatAddr = (addrDetail: string, addr: string) => {
  const formattedAddrDetail = addrDetail ? `(${addrDetail})` : ''

  return `${formattedAddrDetail} ${addr}`.trim()
}

export const formatKm = (meter: number) => {
  const convertKiloMeter = (meter: number, place: number) => {
    const checkHasDecimalPoint = (value: number) =>
      (value * 10) % 10 > 0 ? value : Math.trunc(value)

    const fixedNum = +(meter / 1000).toFixed(place)
    return checkHasDecimalPoint(fixedNum)
  }

  const separateDecimal = (decimalNum: string) => {
    const decimalPointIndex = decimalNum.indexOf('.')
    const integer = decimalNum.slice(0, decimalPointIndex)
    const decimal = decimalNum.slice(decimalPointIndex)

    return { integer, decimal }
  }

  const kilometer = String(convertKiloMeter(meter, 1))
  const { integer, decimal } = separateDecimal(kilometer)

  return comma(integer) + decimal
}

export const formatMobile = (phone: string) => phone.replace(/^([0-9]{2})([0-9]{8,})$/, '$1 $2')

export const formatGetTime = (time: string) => String(new Date(time).getTime())

export const formatPrice = (price: string) => comma(deleteFirstZero(onlyNumber(price)))

const deleteFirstZero = (value: string) => (value[0] === '0' ? value.slice(1) : value)

export const formatDate = (
  date: Dayjs | string | number | Date,
  template: string = 'DD/MM/YY, HH:mm',
) => dayjs(date).format(template)

export const makeDeviceInfo = (deviceModel: string, osVersion: string, appVersion: string) =>
  [deviceModel, osVersion, `v${appVersion}`].join(' / ')
