import React, { useRef, useEffect, useMemo, useState,memo } from 'react'
import {  Text, FlatList } from 'react-native'
import styles from './styles'
import { BounceButton } from '@/components'
import  { OpUnitType, ManipulateType, Dayjs } from 'dayjs'
import { screen } from '@/contents'
import dayjs from '@/utils/dayjs'
const { width } = screen
const ITEM_WIDTH = width / 5

type Props={
  list:{label:string,value:number}[]
  date:number
  dateType:OpUnitType
  onChange:(value:number)=>void
}

const DateList =({list,date,dateType,onChange}:Props)=>{
  const ref = useRef<FlatList>(null)
  const currentIndex = useMemo(() => {
    return list.findIndex((item) => {
      const itemDate = dayjs(item.value).startOf(dateType)
      const targetDate = dayjs(date).startOf(dateType)
      return itemDate.isSame(targetDate)
    }) 

  }, [list, date, dateType])
   

  const handleChangeDate = (item:{label:string,value:number}, index:number)=>{
    onChange && onChange(item.value)
  }
  useEffect(()=>{
    if(currentIndex>=0){
      ref.current?.scrollToIndex({
        index:currentIndex,
        animated:true,
        viewPosition:0.5
      })
    }
  },[date,list])
  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  })
  return (
    <FlatList
      ref={ref}
      data={list}
      renderItem={({ item, index }) => {
        const isActive = currentIndex === index
        return (
          <BounceButton
            style={[styles.dateItem, { width: ITEM_WIDTH }]}
            onPress={() => handleChangeDate(item, index)}
          >
            <Text
              style={
                isActive
                  ? styles.activeDateItemText
                  : styles.dateItemText
              }
            >
              {item.label}
            </Text>
          </BounceButton>
        )
      }}
      keyExtractor={(item, index) => item.value.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
    />
  )
}

const ListForDateType = ({
  maxDate,
  minDate,
  type,
  dateType,
  onChange,
  initDate,
  date
}: {
  maxDate: number
  minDate: number
  type: OpUnitType
  dateType:OpUnitType
  onChange: (value: number) => void
  initDate?: number,
  date:number
}) => {
  const ref = useRef<FlatList>(null)
  const data = useMemo(
    () => getDateTypeList({ maxDate, minDate, type }),
    [maxDate, minDate, type]
  )

  const currentIndex = useMemo(()=>{
    return data.findIndex((item) => dayjs(item.value).isSame(dayjs(date), type))
  },[date,data])
  useEffect(() => {
    
    
    if (data.length > 0 && currentIndex >= 0  ) {
      ref.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
        viewPosition: 0.5,
      })
    }
  }, [currentIndex,type,dateType])

  const handleChangeDate = (item: any, index: number) => {
    
    // setDate(item.value)
    dateType===type && onChange && onChange(item.value)
  }

  
  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  })

  return (
    <FlatList
      ref={ref}
      data={data}
      renderItem={({ item, index }) => {
       
        const isActive = currentIndex === index
        
        
        return (
          <BounceButton
            style={[styles.dateItem, { width: ITEM_WIDTH }]}
            onPress={() => handleChangeDate(item, index)}
          >
            <Text
              style={
                currentIndex === index
                  ? styles.activeDateItemText
                  : styles.dateItemText
              }
            >
              {item.label}{isActive&&'-'}
            </Text>
          </BounceButton>
        )
      }}
      keyExtractor={(item, index) => item.value.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      // initialScrollIndex={currentIndex}
    />
  )
}

export default memo(DateList)

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
