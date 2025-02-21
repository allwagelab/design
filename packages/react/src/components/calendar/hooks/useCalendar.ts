import { useState, useCallback } from 'react'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import { getMonthYear, getNewMonth, getNewYear, resetMonthYear } from '../utils/getMonthYear'

dayjs.locale('ko')

const useCalendar = (initDate: string[], handleChange?: (date: dayjs.Dayjs[] | []) => void) => {
  const date = initDate.length !== 0 ? dayjs(initDate[0], 'YYYY/MM/DD') : dayjs()
  const initMonthYear = getMonthYear(date)
  const [monthYear, setMonthYear] = useState(initMonthYear)

  const handleChangeDate = (date: dayjs.Dayjs[] | []) => {
    handleChange?.(date)
  }

  const handleChangePrevMonth = useCallback(() => {
    setMonthYear(prevDate => getNewMonth(prevDate, -1))
  }, [])

  const handleChangeNextMonth = useCallback(() => {
    const newMonthYear = getNewMonth(monthYear, 1)

    setMonthYear(newMonthYear)
  }, [monthYear])

  const handleChangePrevYear = useCallback(() => {
    setMonthYear(prevDate => getNewYear(prevDate, -1))
  }, [])

  const handleChangeNextYear = useCallback(() => {
    const newMonthYear = getNewYear(monthYear, 1)

    setMonthYear(newMonthYear)
  }, [monthYear])

  const changeMonthYear = useCallback((date: dayjs.Dayjs) => {
    const monthYear = getMonthYear(dayjs(date))
    setMonthYear(monthYear)
  }, [])

  const handleChangeMonth = useCallback(
    (month: number) => {
      const date = dayjs(monthYear.value).set('month', month - 1)
      changeMonthYear(date)
    },
    [monthYear],
  )

  const handleResetMonthYear = useCallback(() => {
    const monthYear = resetMonthYear(initMonthYear)
    setMonthYear(monthYear)
  }, [])

  const getWeekPeriodFromMon = (date: dayjs.Dayjs, weekIdx: number) => {
    const monDay =
      weekIdx >= 1 ? date.subtract(weekIdx - 1, 'd') : date.subtract(7 - (1 - weekIdx), 'd')

    const dayList = [monDay.add(0, 'd'), monDay.add(6, 'd')]

    return dayList
  }

  return {
    monthYear,
    handleChangeDate,
    handleChangeMonth,
    handleChangePrevMonth,
    handleChangeNextMonth,
    handleChangePrevYear,
    handleChangeNextYear,
    handleResetMonthYear,
    getWeekPeriodFromMon,
  }
}

export default useCalendar
