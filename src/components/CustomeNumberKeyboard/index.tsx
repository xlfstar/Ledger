import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { Image, BounceButton, ModalDate, ActionSheetDate } from '@/components'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { Icon } from 'react-native-elements'
import { primaryTextColor, lineColor, themeGreenColor } from '@/contents/theme'
import calendarIcon from '@/assets/images/clockIn.png'
import { ActionSheetRef } from 'react-native-actions-sheet'
import dayjs from 'dayjs'
import DateTimePicker, {
  DateTimePickerAndroid,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker'

const list = [
  {
    key: '7',
    value: '7',
  },
  {
    key: '8',
    value: '8',
  },
  {
    key: '9',
    value: '9',
  },
  {
    key: '4',
    value: '4',
  },
  {
    key: '5',
    value: '5',
  },
  {
    key: '6',
    value: '6',
  },
  {
    key: '1',
    value: '1',
  },
  {
    key: '2',
    value: '2',
  },
  {
    key: '3',
    value: '3',
  },
  {
    key: '.',
    value: '.',
  },
  {
    key: '0',
    value: '0',
  },
  {
    value: 'C',
    icon: 'delete',
  },
]
const extraList = [
  {
    key: '今天',
    value: 'date',
    icon: calendarIcon,
  },
  {
    key: '完成',
    value: 'completed',
  },
]

export interface CustomeNumberKeyboardProps {
  onChange: (value: string) => void
  isCalendar?: boolean
  onChangeDate?: (value: Date) => void
  onCompleted?: () => void
  date?: Date
}
const CustomeNumberKeyboard = ({
  onChange = () => {},
  isCalendar = false,
  onChangeDate = () => {},
  onCompleted = () => {},
  date = new Date(),
}: CustomeNumberKeyboardProps) => {
  const [value, setValue] = useState('')
  // const [date, setDate] = useState(new Date())
  const isToday = useMemo(() => {
    return dayjs(date).isSame(dayjs(), 'days')
  }, [date])
  const [extraData, setExtraData] = useState(extraList)
  const dateRef = useRef<ActionSheetRef>(null)
  useEffect(() => {
    if (!isToday) {
      setExtraData([
        {
          key: dayjs(date).format('YYYY/MM/DD'),
          value: 'date',
          icon: null,
        },
        {
          key: '完成',
          value: 'completed',
        },
      ])
    } else {
      setExtraData(extraList)
    }
  }, [date])
  const alreadyPress = useRef(false)
  const handlePress = (key: string) => {
    if (!alreadyPress.current) {
      alreadyPress.current = true
    }

    if (key === 'clear') {
      setValue('')
      return
    }
    if (key === 'C') {
      setValue((prevValue) => prevValue.slice(0, -1))
      return
    }

    if (key === '.') {
      if (value.includes('.')) return // Prevent multiple decimal points
      if (value === '' || value === '0') {
        setValue('0.')
        return
      }
    }
    if (key === '0' && value === '0') return // Prevent leading zeros
    if (value === '0' && key !== '.') {
      setValue(key)
      return
    }

    // Limit to two decimal places
    const parts = value.split('.')
    if (parts[1] && parts[1].length >= 2) return

    setValue(value + key)
  }

  const handleClickExtraBtn = (value: string) => {
    if (value === 'date') {
      onChangeDate(date)
    }
    if (value === 'completed') {
      onCompleted()
      return
    }
  }

  useEffect(() => {
    if (!alreadyPress.current) return
    onChange(value)

    // return ()=>{
    //   alreadyPress.current =  false
    // }
  }, [value, alreadyPress.current])

  // useEffect(() => {
  //   onChangeDate(date)
  // }, [date])
  // const onChangeDate = (value: string) => {
  //   onChangeData(value)
  // }

  // const handleSelectDate = (date: any) => {
  //   setDate(date)
  //   // dateRef.current?.hide()
  // }
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {list.map((item, index) => (
          <BounceButton
            style={[styles.item, index % 3 === 1 && styles.centerItem]}
            key={index}
            onPress={() => handlePress(item.value)}
          >
            {item.icon && (
              <Icon
                name={item.icon}
                color={primaryTextColor}
                type="feather"
                size={ms(20)}
              />
            )}
            {item.key && <Text style={[styles.label]}>{item.key}</Text>}
          </BounceButton>
        ))}
      </View>
      {isCalendar && (
        <View style={styles.extraContent}>
          {extraData.map((item, index) => (
            <BounceButton
              style={[styles.extraItem, index === 1 && styles.extraLastItem]}
              key={index}
              onPress={() => handleClickExtraBtn(item.value)}
            >
              {item.icon && (
                <Image
                  src={item.icon}
                  style={{
                    width: ms(16),
                    height: ms(16),
                    marginRight: ms(4),
                  }}
                />
              )}
              {item.key && (
                <Text
                  style={[
                    styles.extraLabel,
                    index === 1 && styles.extraLastLabel,
                  ]}
                >
                  {item.key}
                </Text>
              )}
            </BounceButton>
          ))}
        </View>
      )}
      {/* <ActionSheetDate
        ref={dateRef}
        onCancel={() => dateRef.current?.hide()}
        onConfirm={handleSelectDate}
        mode={'day'}
        value={date}
      /> */}
    </View>
  )
}
export default CustomeNumberKeyboard

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: lineColor,
    borderBottomWidth: 0.5,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    height: ms(52),
    width: '33.33%',
    borderTopWidth: 0.5,
    borderTopColor: lineColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerItem: {
    borderLeftColor: lineColor,
    borderLeftWidth: 0.5,
    borderRightColor: lineColor,
    borderRightWidth: 0.5,
  },
  label: {
    textAlign: 'center',
    fontSize: ms(20),
    fontWeight: 300,
  },
  extraContent: {
    minWidth: ms(90),
    borderLeftColor: lineColor,
    borderLeftWidth: 0.5,
  },
  extraItem: {
    flex: 1,
    borderTopColor: lineColor,
    borderTopWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  extraLastItem: {
    backgroundColor: themeGreenColor,
    borderTopColor: 'transparent',
  },
  extraLabel: {
    fontWeight: 300,
    color: primaryTextColor,
  },
  extraLastLabel: {
    fontSize: ms(16),
  },
})
