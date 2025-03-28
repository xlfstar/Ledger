import React, { memo, useState, useMemo, useEffect, useCallback } from 'react'
import WheelPicker from '@quidone/react-native-wheel-picker'
import { View, Text } from 'react-native'
import dayjs from '@/utils/dayjs'
import { BounceButton } from '@/components'
import styles from './styles'
export type Props = {
  mode: string
  value: Date | string | number | undefined
  title?: string
  onPickerCancel?: () => void
  onPickerConfirm?: (value: string | undefined) => void
}
export type Item = {
  label: string
  value: number | string
}

const DatePicker = ({
  mode = 'day',
  value = dayjs().format('YYYY-MM-DD'),
  title = '',
  onPickerCancel = () => {},
  onPickerConfirm = () => {},
}: Props): JSX.Element => {
  const currentYear = dayjs().year()
  const minYear = currentYear - 10
  const maxYear = currentYear + 10
  const [year, setYear] = useState<number>(dayjs(value).year()) //年
  const [month, setMonth] = useState<number>(dayjs(value).month() + 1) //月
  const [day, setDay] = useState<number>(dayjs(value).date()) //日

  // 当外部value变化时更新内部状态
  useEffect(() => {
    if (value) {
      const dateValue = dayjs(value)
      if (dateValue.isValid()) {
        setYear(dateValue.year())
        setMonth(dateValue.month() + 1)
        setDay(dateValue.date())
      }
    }
    return () => {
      const current = dayjs()
      setYear(current.year())
      setMonth(current.month() + 1)
      setDay(current.date())
    }
  }, [value])

  const yearData: Item[] = useMemo(() => {
    const res: Item[] = []
    for (let i = minYear; i <= maxYear; i++) {
      res.push({ label: `${i}年`, value: i })
    }
    return res
  }, [])

  const monthData: Item[] = useMemo(() => {
    const res: Item[] = []
    for (let i = 1; i <= 12; i++) {
      res.push({ label: `${i}月`, value: i })
    }
    return res
  }, [])

  const dayData: Item[] = useMemo(() => {
    const daysInMonth = dayjs(`${year}-${month}`).daysInMonth()
    const res: Item[] = []
    for (let i = 1; i <= daysInMonth; i++) {
      res.push({ label: `${i}日`, value: i })
    }
    return res
  }, [year, month])

  const handleCancel = useCallback(() => {
    onPickerCancel()
  }, [onPickerCancel])

  const handleConfirm = useCallback(() => {
    let result
    switch (mode) {
      case 'year':
        result = `${year}`
        break
      case 'month':
        result = `${year}-${month < 10 ? '0' + month : month}`
        break
      case 'day':
        result = `${year}-${month < 10 ? '0' + month : month}-${
          day < 10 ? '0' + day : day
        }`
        break
      default:
        break
    }
    onPickerConfirm(result)
  }, [mode, year, month, day, onPickerConfirm])
  const renderContent = useMemo(() => {
    // console.log(111, { mode, day, year, month, yearData, monthData, dayData })

    return (
      <View style={styles.content}>
        <View style={[styles.item]}>
          <WheelPicker
            data={yearData}
            value={year}
            onValueChanged={({ item: { value } }) => setYear(Number(value))}
            overlayItemStyle={styles.overlayItemStyle}
            keyExtractor={(e) => e.label}
          />
        </View>
        {['month', 'day'].includes(mode) && (
          <View style={styles.item}>
            <WheelPicker
              data={monthData}
              value={month}
              onValueChanged={({ item: { value } }) => {
                setMonth(Number(value))
              }}
              overlayItemStyle={styles.overlayItemStyle}
              keyExtractor={(e) => e.label}
            />
          </View>
        )}
        {mode === 'day' && (
          <View style={styles.item}>
            <WheelPicker
              data={dayData}
              value={day}
              onValueChanged={({ item: { value } }) => setDay(Number(value))}
              overlayItemStyle={styles.overlayItemStyle}
              keyExtractor={(e) => e.label}
            />
          </View>
        )}
      </View>
    )
  }, [value, mode, onPickerConfirm])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BounceButton onPress={handleCancel}>
          <Text style={styles.cancelText}>取消</Text>
        </BounceButton>
        <Text style={styles.titleText}>{title}</Text>
        <BounceButton onPress={handleConfirm}>
          <Text style={styles.confirmText}>确定</Text>
        </BounceButton>
      </View>
      {renderContent}
    </View>
  )
}
export default memo(DatePicker)
