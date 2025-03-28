import React from 'react'
import { Modal } from '../index'
import {
  View,
  Text,
  ViewProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native'

import styles from './styles'
import { themeGreenColor, primaryTextColor } from '@/contents/theme'

type Props = Partial<{
  message: string
}>
const ToastComponent = ({ message }: Props): JSX.Element => {
  return (
    <Modal
      isVisible={true}
      hasBackdrop={true}
      backdropOpacity={0}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color={'white'} />

        {!!message && <Text style={styles.message}>{message}</Text>}
      </View>
    </Modal>
  )
}
export default ToastComponent
