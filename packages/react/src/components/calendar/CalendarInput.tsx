import React, { memo } from 'react'

import dayjs from 'dayjs'

import { CalendarIcon } from '../../icons'
import Calendar from './Calendar'
import * as S from './CalendarInput.css'

interface CalendarInputProps {
  className?: string
  type?: 'date' | 'week' | 'free'
  value: string
  selectedDate: string[]
  hasTime?: boolean
  handleChange: (date: dayjs.Dayjs[] | []) => void
  handleFocusCondition?: (e?: React.FocusEvent<HTMLInputElement>) => void
  handleBlurCondition?: (e?: React.FocusEvent<HTMLInputElement>) => void
}

const CalendarInput = ({
  className,
  type,
  value,
  selectedDate,
  hasTime,
  handleChange,
  handleFocusCondition,
  handleBlurCondition,
}: CalendarInputProps) => {
  return (
    <S.Root className={className}>
      <S.CalendarInput placeholder="날짜 선택" value={value} />
      <S.CalendarDialogBtn
        popup={(dialogRef, isDialogOpen, handleDialogClose) => (
          <Calendar
            ref={dialogRef}
            isDialogOpen={isDialogOpen}
            hasTime={hasTime}
            as="dialog"
            type={type}
            selectedDate={selectedDate}
            handleClose={handleDialogClose}
            handleChange={handleChange}
            handleFocusCondition={handleFocusCondition}
            handleBlurCondition={handleBlurCondition}
          />
        )}
      >
        <CalendarIcon />
      </S.CalendarDialogBtn>
    </S.Root>
  )
}

export default memo(CalendarInput)
