import React, { useCallback, useState, useEffect } from 'react'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'

import { CalendarIcon, TimeIcon } from '../../icons'
import Button from '../button/Button'
import * as S from './Calendar.css'
import Date from './Date'
import useCalendar from './hooks/useCalendar'
import useTimePicker from './hooks/useTimePicker'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export const WEEKS = ['일', '월', '화', '수', '목', '금', '토']

export const MONTH = {
  '1월': 1,
  '2월': 2,
  '3월': 3,
  '4월': 4,
  '5월': 5,
  '6월': 6,
  '7월': 7,
  '8월': 8,
  '9월': 9,
  '10월': 10,
  '11월': 11,
  '12월': 12,
}

interface CalendarProps {
  className?: string
  isDialogOpen?: boolean
  hasTime?: boolean
  type?: Readonly<'date' | 'week' | 'free'>
  as?: React.ElementType & string
  selectedDate: string[]
  readonly?: boolean
  handleChange?: (date: dayjs.Dayjs[] | []) => void
  handleClose?: () => void
  handleFocusCondition?: (e?: React.FocusEvent<HTMLInputElement>) => void
  handleBlurCondition?: (e?: React.FocusEvent<HTMLInputElement>) => void
}

const Calendar = React.forwardRef(
  (
    {
      className,
      isDialogOpen,
      hasTime = false,
      as = 'div',
      type = 'date',
      selectedDate,
      readonly = false,
      handleChange,
      handleClose,
      handleFocusCondition,
      handleBlurCondition,
    }: CalendarProps,
    ref: React.ForwardedRef<HTMLDialogElement>,
  ) => {
    const {
      monthYear,
      getWeekPeriodFromMon,
      handleChangeDate,
      handleChangeMonth,
      handleChangePrevMonth,
      handleChangeNextMonth,
      handleChangePrevYear,
      handleChangeNextYear,
      handleResetMonthYear,
    } = useCalendar(selectedDate, handleChange)

    const {
      time,
      timeErr,
      getTimeAppliedDate,
      applyTime,
      handleChangeTime,
      handleBlurTime,
      handleResetTime,
      handleResetTimeErr,
    } = useTimePicker(selectedDate[0], handleChange)

    const initSelectedDate = selectedDate.map(date => dayjs(date, 'YYYY/MM/DD'))
    const [isOpen, setIsOpen] = useState(false)
    const [hoveredDate, setHoveredDate] = useState<dayjs.Dayjs | string>('')
    const [currentDate, setCurrentDate] = useState<dayjs.Dayjs[] | []>(initSelectedDate)

    const isDisabled = (type === 'free' && currentDate.length === 0) || !!timeErr

    const handleOpen = () => {
      setIsOpen(!isOpen)
    }

    const changeHoveredDate = useCallback(
      (date: dayjs.Dayjs | string) => {
        setHoveredDate(date)
      },
      [hoveredDate],
    )

    const handleClickMonth = (month: number) => () => {
      handleChangeMonth(month)
    }

    const handleClickDate = (date: dayjs.Dayjs[]) => () => {
      if (readonly) return
      if (type === 'free') {
        date.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1))
      }
      setCurrentDate(date)
    }

    const handleReset = () => {
      handleResetMonthYear()
      setCurrentDate([])

      if (hasTime) {
        handleResetTime()
        handleResetTimeErr()
      }
    }

    const handleApply = () => {
      if (hasTime) {
        applyTime(currentDate[0], time)
        const dateTime = [getTimeAppliedDate(dayjs(currentDate[0]), time)]
        handleChangeDate(dateTime)
      } else {
        handleChangeDate(currentDate)
      }

      !timeErr && handleClose?.()
    }

    const handleMouseLeave = useCallback(() => {
      hoveredDate && changeHoveredDate('')
    }, [hoveredDate])

    useEffect(() => {
      if (isDialogOpen && timeErr) {
        handleResetTime()
        handleResetTimeErr()
      }

      if (isDialogOpen) {
        handleFocusCondition && handleFocusCondition()
      } else {
        handleBlurCondition && handleBlurCondition()
      }
    }, [isDialogOpen])

    return (
      <S.Root ref={ref} className={className} aria-modal="true" open={isDialogOpen} as={as}>
        <S.Header>
          <S.MoveBtnWrapper>
            <S.MoveBtn type="button" aria-label="move previous year" onClick={handleChangePrevYear}>
              <S.ArrowDoubleLeftIcon />
            </S.MoveBtn>
            <S.MoveBtn
              type="button"
              aria-label="move previous month"
              onClick={handleChangePrevMonth}
            >
              <S.ArrowLeftIcon />
            </S.MoveBtn>
          </S.MoveBtnWrapper>
          <S.MonthYear
            type="button"
            aria-controls="month-list"
            aria-expanded={isOpen}
            aria-label="open month list"
            onClick={handleOpen}
          >
            <S.MonthYearContent>
              <span>{monthYear.value.format('YYYY')}</span>
              <span>{monthYear.value.format('MMM')}</span>
            </S.MonthYearContent>
            <S.OpenMonthWrapper>
              <S.ArrowDownIcon />
            </S.OpenMonthWrapper>
          </S.MonthYear>
          <S.MoveBtnWrapper>
            <S.MoveBtn type="button" aria-label="move next month" onClick={handleChangeNextMonth}>
              <S.ArrowRightIcon />
            </S.MoveBtn>
            <S.MoveBtn type="button" aria-label="move next year" onClick={handleChangeNextYear}>
              <S.ArrowDoubleRightIcon />
            </S.MoveBtn>
          </S.MoveBtnWrapper>
        </S.Header>
        {isOpen ? (
          <S.MonthWrapper id="month-list">
            {Object.entries(MONTH).map(([label, value]) => (
              <li key={value}>
                <S.MonthBtn
                  type="button"
                  aria-current={
                    value === +monthYear.currentMonth && monthYear.year === monthYear.currentYear
                  }
                  aria-selected={+monthYear.month === value}
                  onClick={handleClickMonth(value)}
                >
                  {label}
                </S.MonthBtn>
              </li>
            ))}
          </S.MonthWrapper>
        ) : (
          <>
            <S.WeekRow>
              {WEEKS.map(week => (
                <li key={week}>{week}</li>
              ))}
            </S.WeekRow>
            <S.DateRow className={className} data-status={type} onMouseLeave={handleMouseLeave}>
              {[...Array(monthYear.firstDOW)].map((_, i) => (
                <Date
                  key={i}
                  currentDate={currentDate}
                  date={monthYear.firstWeekPrevMonthDate.add(i, 'd')}
                  disabled={type === 'date'}
                  hoveredDate={hoveredDate}
                  type={type}
                  changeMonth={handleChangePrevMonth}
                  changeHoveredDate={changeHoveredDate}
                  getWeekPeriodFromMon={getWeekPeriodFromMon}
                  handleClick={handleClickDate}
                />
              ))}
              {[...Array(monthYear.lastDate)].map((_, i) => {
                const date = monthYear.startDate.add(i, 'd')

                return (
                  <Date
                    key={i}
                    currentDate={currentDate}
                    date={date}
                    hoveredDate={hoveredDate}
                    isThisMonth={true}
                    type={type}
                    getWeekPeriodFromMon={getWeekPeriodFromMon}
                    changeHoveredDate={changeHoveredDate}
                    handleClick={handleClickDate}
                  />
                )
              })}
              {[...Array(42 - (monthYear.firstDOW + monthYear.lastDate))].map((_, i) => (
                <Date
                  key={i}
                  currentDate={currentDate}
                  date={monthYear.nextMonthStartDate.add(i, 'd')}
                  disabled={type === 'date'}
                  hoveredDate={hoveredDate}
                  type={type}
                  changeMonth={handleChangeNextMonth}
                  getWeekPeriodFromMon={getWeekPeriodFromMon}
                  changeHoveredDate={changeHoveredDate}
                  handleClick={handleClickDate}
                />
              ))}
              {/* row(6) * column(7) 캘린더에서 각각의 row를 담당하며,
                  date hover시 담당 div의 길이를 이용하여 css를 표현하기 위해 사용 */}
              <div /> {/* 첫 번째 row */}
              <div /> {/* 두 번째 row */}
              <div /> {/* 세 번째 row */}
              <div /> {/* 네 번째 row */}
              <div /> {/* 다섯 번째 row */}
              <div /> {/* 여섯 번째 row */}
            </S.DateRow>
          </>
        )}
        {hasTime && (
          <S.DateTimeContainer>
            <S.DateTimeWrapper hasErr={!!timeErr}>
              <S.DateWrapper>
                <CalendarIcon />
                {currentDate && <time>{dayjs(currentDate[0]).format('YYYY/MM/DD')}</time>}
              </S.DateWrapper>
              <S.TimeWrapper>
                <TimeIcon />
                <S.TimeInput value={time} onChange={handleChangeTime} onBlur={handleBlurTime} />
              </S.TimeWrapper>
            </S.DateTimeWrapper>
            <S.ErrorMsg role="alert">{timeErr}</S.ErrorMsg>
          </S.DateTimeContainer>
        )}
        {!isOpen && !readonly && (
          <S.BtnWrapper>
            <Button variant="outline" onClick={handleReset}>
              초기화
            </Button>
            <Button disabled={isDisabled} onClick={handleApply}>
              적용하기
            </Button>
          </S.BtnWrapper>
        )}
      </S.Root>
    )
  },
)

Calendar.displayName = 'Calendar'

export default Calendar
