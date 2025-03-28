import React, { forwardRef, ForwardedRef, useState, memo } from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import { View } from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DatePicker from '../DatePicker'
import dayjs from '@/utils/dayjs'

export type Props = {
  mode: string
  value: Date | string | number | undefined
  title?: string
  onCancel?: () => void
  onConfirm?: (value: string | undefined) => void
}

const ActionSheetDate = (
  {
    mode = 'day',
    value = dayjs().format('YYYY-MM-DD'),
    title = '选择日期',
    onCancel = () => {},
    onConfirm = () => {},
  }: Props,
  ref: ForwardedRef<ActionSheetRef>
) => {
  const insets = useSafeAreaInsets()
  const [date, setDate] = useState(dayjs(value).format('YYYY-MM-DD'))

  const handleConfirm = (selectedDate: string | undefined) => {
    setDate(dayjs(selectedDate).format('YYYY-MM-DD'))
    onConfirm(selectedDate)
  }

  const onOpen = () => {
    setDate(dayjs(value).format('YYYY-MM-DD'))
  }

  return (
    <ActionSheet
      ref={ref}
      safeAreaInsets={insets}
      containerStyle={{
        borderTopLeftRadius: ms(16),
        borderTopRightRadius: ms(16),
      }}
      onOpen={onOpen}
      onClose={onCancel}
    >
      <View style={styles.modalContent}>
        <DatePicker
          mode={mode}
          onPickerCancel={onCancel}
          onPickerConfirm={handleConfirm}
          value={date}
          title={title}
        />
      </View>
    </ActionSheet>
  )
}

const styles = ScaledSheet.create({
  modalContent: {
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 300,
  },
})

export default memo(forwardRef(ActionSheetDate))
