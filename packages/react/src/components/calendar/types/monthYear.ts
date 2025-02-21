import dayjs from 'dayjs'

export interface MonthYear {
  value: dayjs.Dayjs
  month: string
  year: string
  date: string
  currentMonth: string
  currentYear: string
  isCurrentMonthYear: boolean
  startDate: dayjs.Dayjs
  currentStartDate: dayjs.Dayjs
  prevMonthStartDate: dayjs.Dayjs
  nextMonthStartDate: dayjs.Dayjs
  firstDOW: number
  lastDate: number
  prevMonthLastDate: number
  firstWeekPrevMonthDate: dayjs.Dayjs
}
