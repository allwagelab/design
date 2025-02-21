import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'

import Calendar from './Calendar'
import CalendarInput from './CalendarInput'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const BasicDateSelection: Story = {
  args: {
    type: 'date',
    selectedDate: [],
  },
  render: function Component(args) {
    const [selectedDate, setSelectedDate] = useState<string[]>([])

    const handleChange = (dates: dayjs.Dayjs[]) => {
      setSelectedDate(dates.map(date => date.format('YYYY/MM/DD')))
    }

    return (
      <div>
        <h2>Basic Date Selection</h2>
        <Calendar {...args} selectedDate={selectedDate} handleChange={handleChange} />
      </div>
    )
  },
}

export const WeekSelection: Story = {
  args: {
    type: 'week',
    selectedDate: [],
  },
  render: function Component(args) {
    const [selectedDates, setSelectedDates] = useState<string[]>([])

    const handleChange = (dates: dayjs.Dayjs[]) => {
      setSelectedDates(dates.map(date => date.format('YYYY/MM/DD')))
    }

    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-3">Week Selection</h2>
        <Calendar {...args} selectedDate={selectedDates} handleChange={handleChange} />
      </div>
    )
  },
}

export const FreeRangeSelection: Story = {
  args: {
    type: 'free',
    selectedDate: [],
  },
  render: function Component(args) {
    const [selectedDates, setSelectedDates] = useState<string[]>([])

    const handleChange = (dates: dayjs.Dayjs[]) => {
      setSelectedDates(dates.map(date => date.format('YYYY/MM/DD')))
    }

    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-3">Free Range Selection</h2>
        <Calendar {...args} selectedDate={selectedDates} handleChange={handleChange} />
      </div>
    )
  },
}

export const DateTimeSelection: Story = {
  args: {
    type: 'date',
    hasTime: true,
    selectedDate: [],
  },
  render: function Component(args) {
    const [selectedDateTime, setSelectedDateTime] = useState<string[]>([])

    const handleChange = (dates: dayjs.Dayjs[]) => {
      setSelectedDateTime(dates.map(date => date.format('YYYY/MM/DD HH:mm')))
    }

    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-3">Date and Time Selection</h2>
        <Calendar {...args} selectedDate={selectedDateTime} handleChange={handleChange} />
        {selectedDateTime.length > 0 && (
          <p className="mt-3">Selected date and time: {selectedDateTime[0]}</p>
        )}
      </div>
    )
  },
}

export const DialogCalendar: Story = {
  args: {
    type: 'date',
    as: 'dialog',
  },
  render: function Component(args) {
    const [selectedDates, setSelectedDates] = useState<string[]>([])

    const selectedDate = selectedDates[0]

    const handleChangeFilterDate = (date: dayjs.Dayjs[] | []) => {
      if (date.length === 0) {
        setSelectedDates([])
      } else {
        const days = date.map(item => item.format('YYYY/MM/DD'))
        setSelectedDates(days)
      }
    }

    return (
      <div>
        <CalendarInput
          {...args}
          type="date"
          selectedDate={selectedDates}
          value={selectedDate}
          handleChange={handleChangeFilterDate}
        />
      </div>
    )
  },
}

export const ReadOnlyCalendar: Story = {
  args: {
    type: 'date',
    readonly: true,
  },
  render: function Component(args) {
    return (
      <div>
        <Calendar {...args} selectedDate={[]} />
      </div>
    )
  },
}
