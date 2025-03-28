import React, { memo, useEffect, useState } from 'react'
import DatePicker from '../DatePicker'
import { View } from 'react-native'
import Modal from '../Modal'
import dayjs from '@/utils/dayjs'
import styles from './styles'

const PickerComponent = (props) => {
  const { mode, cancel, success, value, ...restProps } = props

  const [visible, setVisible] = useState(true)

  const [type, setType] = useState('')

  const [date, setDate] = useState(value)
  const handleCancel = () => {
    setVisible(false)
    setType('Cancel')
  }

  const handleHide = () => {
    switch (type) {
      case 'Cancel':
        if (typeof cancel === 'function') {
          cancel()
        }
        break
      case 'Confirm':
        if (typeof success === 'function') {
          success(date)
        }
        break
      default:
        break
    }
  }

  const handleConfirm = (e) => {
    setDate(e)
    setVisible(false)
    setType('Confirm')
  }
  return (
    <Modal
      isVisible={visible}
      // useNativeDriver={true}

      animationInTiming={300}
      style={styles.modalContainer}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackdropPress={handleCancel}
      onBackButtonPress={handleCancel}
      onModalHide={handleHide}
      // hasBackdrop={false}
    >
      <View style={styles.modalContent}>
        <DatePicker
          mode={mode}
          onPickerCancel={handleCancel}
          onPickerConfirm={handleConfirm}
          value={date}
          {...restProps}
        />
      </View>
    </Modal>
  )
}
export default memo(PickerComponent)
