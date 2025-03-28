import { RootState } from '@/store'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { getDateTypeList } from '@/utils'
import { OpUnitType, Dayjs, ManipulateType } from 'dayjs'
import dayjs from '@/utils/dayjs'

type DateType = {
  label: string
  value: number
}
export default function useChartDateList() {
  const { maxDate, minDate } = useSelector((state: RootState) => state.bill)
  const [weekList, setWeekList] = useState<DateType[]>([])
  const [monthList, setMonthList] = useState<DateType[]>([])
  const [yearList, setYearList] = useState<DateType[]>([])

  useEffect(() => {
    const weekList = getDateTypeList({ minDate, maxDate, type: 'week' })
    const monthList = getDateTypeList({ minDate, maxDate, type: 'month' })
    const yearList = getDateTypeList({ minDate, maxDate, type: 'year' })
    setWeekList(weekList || [])
    setMonthList(monthList || [])
    setYearList(yearList || []) 
  }, [minDate, maxDate])
  return { weekList, monthList, yearList }
}

export const getDateTypeList = ({
  minDate = undefined,
  maxDate = undefined,
  type = 'week',
}: {
  minDate?: number
  maxDate?: number
  type?: OpUnitType
}): { label: string; value: number }[] => {
  if (!minDate || !maxDate) return []
  const arr = []
  let current = dayjs(minDate)
  const end = dayjs(maxDate)

  // If min and max are same day, return single date
  if (current.isSame(end, 'day')) {
    return [
      {
        label: formatDateLabel(current, type),
        value: current.startOf(type).valueOf(),
      },
    ]
  }

  // Add dates until we reach or exceed max date
  while (current.isSame(end, type) || current.isBefore(end, type)) {
    arr.push(current.startOf(type))
    current = current.add(1, type as ManipulateType)
  }

  const res = arr.map((item) => {
    return {
      label: formatDateLabel(item, type),
      value: item.valueOf(),
    }
  })
  return res
}

function formatDateLabel(date: Dayjs, type: OpUnitType): string {
  const currentYear = dayjs().year()
  const currentMonth = dayjs().month()
  const currentWeek = dayjs().week()
  const year = date.year()
  const yearPrefix = year === currentYear ? '' : `${year}-`
  let res = ''
  switch (type) {
    case 'week':
      if (date.week() === currentWeek && year === currentYear) {
        res = '本周'
      } else {
        // Check if week is in previous year (week 53)
        const weekNum = date.week()
        const weekYear = date.year()
        // Check if it's first week of year but actually belongs to previous year's week 53
        if (weekNum === 1 && date.month() === 11) {
          res = `${weekYear}-53周`
        } else {
          res = `${yearPrefix}${weekNum}周`
        }
      }
      break
    case 'month':
      if (date.month() === currentMonth && year === currentYear) {
        res = '本月'
      } else {
        res = `${yearPrefix}${date.month() + 1}月`
      }
      break
    case 'year':
      if (year === currentYear) {
        res = '本年'
      } else {
        res = `${year}年`
      }
      break
    default:
      res = date.format('YYYY-MM-DD')
      break
  }
  return res
}
