import React, { useState, useCallback } from 'react'

import dayjs from 'dayjs'

import { numericOnlyWithColons } from '../../../utils/formatter'
import { transform24Hr } from '../../../utils/transform24Hr'

const ERROR_MSG = {
  TIME_VALID: 'Invalid time value.',
}

const useTimePicker = (selectedValue: string, callbackFn?: (date: dayjs.Dayjs[] | []) => void) => {
  const [time, setTime] = useState(selectedValue ? dayjs(selectedValue).format('HH:mm') : '00:00')
  const [timeErr, setTimeErr] = useState('')

  const getTimeAppliedDate = useCallback((date: dayjs.Dayjs | string, time: string) => {
    const [hour, min] = time.split(':'),
      newDate = dayjs(date).set('hour', +hour).set('minute', +min)

    return newDate
  }, [])

  const applyTime = useCallback((date: dayjs.Dayjs | string, time: string) => {
    const formattedTime = transform24Hr(time)
    if (!formattedTime) return

    if (!formattedTime.valid) {
      setTimeErr(ERROR_MSG.TIME_VALID)
      return
    }

    if (date) {
      const newDate = [getTimeAppliedDate(date, formattedTime.value)]

      callbackFn?.(newDate)
    }

    setTime(formattedTime.value)
    setTimeErr('')
  }, [])

  const handleChangeTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeErr('')
    const value = e.target?.value

    if (value.length > 5) return

    setTime(numericOnlyWithColons(value))
  }, [])

  const handleBlurTime = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      applyTime(selectedValue, e.target.value)
    },
    [selectedValue],
  )

  const handleResetTime = useCallback(() => {
    setTime('00:00')
  }, [])

  const handleResetTimeErr = useCallback(() => {
    setTimeErr('')
  }, [])

  return {
    time,
    timeErr,
    getTimeAppliedDate,
    applyTime,
    handleChangeTime,
    handleBlurTime,
    handleResetTime,
    handleResetTimeErr,
  }
}

export default useTimePicker
