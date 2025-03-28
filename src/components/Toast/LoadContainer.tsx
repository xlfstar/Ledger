import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import Modal from '@/components/Modal'

import styles from './styles'
interface ContainerProps {
  message?: string
}
function Container({ message = '请稍后...' }: ContainerProps) {
  return (
    <Modal
      isVisible={true}
      hasBackdrop={true}
      backdropColor={'transparent'}
      animationIn="zoomIn"
      animationOut="zoomOut"
      style={{
        alignItems: 'center',
        margin: 0,
      }}
    >
      <View style={styles.loadView}>
        <ActivityIndicator color="white" size="large" />
        {!!message && <Text style={styles.loadViewText}>{message}</Text>}
      </View>
    </Modal>
  )
}

export default Container
