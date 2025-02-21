import { useCallback } from 'react'

import dayjs from 'dayjs'

import * as S from './Date.css'

interface DateProps {
  className?: string
  currentDate: dayjs.Dayjs[] | []
  date: dayjs.Dayjs
  disabled?: boolean
  hoveredDate?: dayjs.Dayjs | string
  isThisMonth?: boolean
  readonly type: 'date' | 'week' | 'free'
  getWeekPeriodFromMon?: (date: dayjs.Dayjs, weekIdx: number) => dayjs.Dayjs[] | undefined
  changeHoveredDate: (date: dayjs.Dayjs | string) => void
  changeMonth?: () => void
  handleClick?: (date: dayjs.Dayjs[]) => () => void
}

const Date = ({
  className,
  currentDate,
  date,
  disabled,
  hoveredDate,
  isThisMonth,
  type,
  getWeekPeriodFromMon,
  handleClick,
  changeMonth,
  changeHoveredDate,
}: DateProps) => {
  const isToday = dayjs().isSame(date, 'd')
  const isSelectedDates =
    date.isSameOrAfter(currentDate[0]) && date.isSameOrBefore(currentDate[currentDate.length - 1])
  const isSelectedStartDate = currentDate.length !== 0 && currentDate[0].isSame(date, 'd')
  const isSelectedEndDate =
    currentDate.length !== 0 && currentDate[currentDate.length - 1].isSame(date, 'd')

  const isHoveredBeforeSelectedDate =
    date.isSameOrBefore(currentDate[0]) && hoveredDate && date.isSameOrAfter(hoveredDate)
  const isHoveredAfterSelectedDate =
    date.isSameOrAfter(currentDate[0]) && hoveredDate && date.isSameOrBefore(hoveredDate)

  const weekIdx = date.get('d')

  const getNotSelectedDate = (date: dayjs.Dayjs) => {
    return currentDate.filter(item => item.format('YYYY-MM-DD') !== date.format('YYYY-MM-DD'))
  }

  const handleClickFree = (date: dayjs.Dayjs) => {
    if (typeof handleClick !== 'function') return

    const filteredDate = getNotSelectedDate(date)

    if (filteredDate.length !== currentDate.length) {
      handleClick(filteredDate)()

      return
    }

    if (currentDate.length === 1) {
      handleClick([...currentDate, date])()
      changeHoveredDate(currentDate[0])
    } else if (currentDate.length === 0) {
      handleClick([date])()
    } else {
      if (date.isSameOrBefore(currentDate[0])) {
        handleClick([date, currentDate[1]])()
      } else {
        handleClick([date, currentDate[0]])()
      }
    }
  }

  const handleClickPeriod = (date: dayjs.Dayjs) => {
    if (typeof getWeekPeriodFromMon !== 'function' || typeof handleClick !== 'function') return

    const days = getWeekPeriodFromMon(date, weekIdx)!

    handleClick(days)()
  }

  const handleClickDate = (date: dayjs.Dayjs) => () => {
    switch (type) {
      case 'date':
        handleClick && handleClick([date])()
        break

      case 'week':
        handleClickPeriod(date)
        break

      default:
        handleClickFree(date)
        break
    }

    if (!isThisMonth) {
      changeMonth && changeMonth()
    }
  }

  const handleMouseOver = useCallback(
    (date: dayjs.Dayjs) => () => {
      currentDate.length === 1 ? changeHoveredDate(date) : changeHoveredDate('')
    },
    [currentDate],
  )

  return (
    <S.Root
      className={className}
      aria-current={isToday ? 'date' : 'false'}
      aria-selected={isSelectedDates}
      data-status={type}
      data-weekstatus={weekIdx >= 3 ? 'current' : 'prev'}
      data-weekidx={weekIdx}
      data-isthismonth={isThisMonth}
      data-isselectedstartdate={isSelectedStartDate}
      data-isselectedenddate={isSelectedEndDate}
      data-ishoverdate={date.isSame(hoveredDate)}
      data-ishoverbeforedate={isHoveredBeforeSelectedDate}
      data-ishoverafterdate={isHoveredAfterSelectedDate}
    >
      <S.Btn
        type="button"
        disabled={disabled}
        onMouseEnter={handleMouseOver(date)}
        onClick={handleClickDate(date)}
      >
        {date.format('D')}
      </S.Btn>
    </S.Root>
  )
}

export default Date
