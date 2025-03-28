import React, { memo, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePicker from './date'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'

interface CustomDatePickerProps {
  isVisible: boolean
  onClose: () => void
  onDateChange: (date: Date | string) => void
  value: Date
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  isVisible,
  onClose,
  onDateChange,
  value,
}) => {
  const ref = React.useRef<ActionSheetRef>(null)
  useEffect(() => {
    if (isVisible) {
      ref.current?.show()
    } else {
      ref.current?.hide()
    }
  }, [isVisible])
  return (
    <ActionSheet
      ref={ref}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
      // open={isVisible}
      onClose={onClose}
    >
      <View style={styles.modalContent}>
        <DateTimePicker
          value={value}
          mode="day"
          onPickerConfirm={(date) => {
            if (date) onDateChange(date)
          }}
          onPickerCancel={onClose}
        />
      </View>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: 'hidden',

    height: 300,
  },
})

export default memo(CustomDatePicker)
