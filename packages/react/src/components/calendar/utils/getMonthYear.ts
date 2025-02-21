import dayjs from 'dayjs'

import type { MonthYear } from '../types/monthYear'

export const getMonthYear = (initDate: dayjs.Dayjs) => {
  const value = initDate
  const month = initDate.format('MM')
  const year = initDate.format('YYYY')
  const date = initDate.format('DD')
  const currentMonth = dayjs().format('MM')
  const currentYear = dayjs().format('YYYY')
  const isCurrentMonthYear = month === currentMonth && year === currentYear
  const startDate = dayjs(`${year}${month}01`)
  const currentStartDate = dayjs(`${currentYear}${currentMonth}`)
  const prevMonthStartDate = startDate.clone().subtract(1, 'month')
  const nextMonthStartDate = startDate.clone().add(1, 'month')
  const firstDOW = Number(startDate.format('d'))
  const lastDate = Number(startDate.clone().endOf('month').format('DD'))
  const prevMonthLastDate = Number(prevMonthStartDate.endOf('month').format('DD'))
  const firstWeekPrevMonthDate = prevMonthStartDate.set('date', prevMonthLastDate - firstDOW + 1)

  return {
    value,
    month,
    year,
    date,
    currentMonth,
    currentYear,
    isCurrentMonthYear,
    startDate,
    currentStartDate,
    prevMonthStartDate,
    nextMonthStartDate,
    firstDOW,
    lastDate,
    prevMonthLastDate,
    firstWeekPrevMonthDate,
  }
}

export const getUpdatedMonthYear = (monthYear: MonthYear, monthIncrement: number) => {
  return monthYear.startDate.clone().add(monthIncrement, 'month')
}

export const getNewMonth = (prevDate: MonthYear, monthIncrement: number) => {
  const newMonthYear = getUpdatedMonthYear(prevDate, monthIncrement)

  return getMonthYear(newMonthYear)
}

export const getUpdatedYear = (monthYear: MonthYear, yearIncrement: number) => {
  return monthYear.startDate.clone().add(yearIncrement, 'year')
}

export const getNewYear = (prevDate: MonthYear, yearIncrement: number) => {
  const newMonthYear = getUpdatedYear(prevDate, yearIncrement)

  return getMonthYear(newMonthYear)
}

export const resetMonthYear = (date: MonthYear) => {
  return getMonthYear(date.currentStartDate)
}

export default getMonthYear
