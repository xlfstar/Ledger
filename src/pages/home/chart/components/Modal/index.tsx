import React, { useState } from 'react'
import { View } from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import { Modal } from '@/components'
let lastToast: RootSiblings | null = null
type Props = {
  children: React.ReactNode
  cancel?: () => void
  height?: number
}

const ModalCom = ({ children, cancel }: Props) => {
  const [visible, setVisible] = useState(true)

  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      style={{ margin: 0, justifyContent: 'flex-start' }}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      onModalHide={() => cancel && cancel()}
    >
      {children}
    </Modal>
  )
}

class Picker {
  static hide = function () {
    if (lastToast !== null) {
      lastToast.destroy()
    }
  }
  static show = ({ children, height }: Props) =>
    new Promise((resolve, reject) => {
      if (lastToast != null) {
        lastToast.destroy()
      }

      const Container = (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: height,
            overflow: 'hidden',
          }}
        >
          <ModalCom
            cancel={() => {
              reject()
              Picker.hide()
            }}
          >
            {children}
          </ModalCom>
        </View>
      )
      const toast = new RootSiblings(Container)
      lastToast = toast
    })
}
export default Picker
