import React from 'react'
import Modal from 'react-native-modal'
import type { ModalProps } from 'react-native-modal'
import { Keyboard } from 'react-native'
import { useBackHandler } from '@react-native-community/hooks'
import { screen } from '@/contents'

interface Props extends ModalProps {
  children: React.ReactNode
}

const ModalComponent: React.FC<Partial<Props>> = (props) => {
  const {
    children,
    isVisible = false,
    backdropOpacity = 0.35,
    animationIn = 'slideInUp',
    animationOut = 'slideOutDown',
    onBackButtonPress,
    ...reset
  } = props

  // TODO: 同时弹出和隐藏 modal 时的手机键盘问题
  const hideKeyboard = (): void => {
    Keyboard.dismiss()
  }

  useBackHandler((): boolean => {
    if (isVisible) {
      onBackButtonPress?.()
    }
    return isVisible
  })

  return (
    <Modal
      {...reset}
      avoidKeyboard
      useNativeDriver
      coverScreen={false}
      isVisible={isVisible}
      deviceWidth={screen.width}
      deviceHeight={screen.height}
      animationIn={animationIn}
      animationOut={animationOut}
      hideModalContentWhileAnimating
      onModalWillShow={hideKeyboard}
      onModalWillHide={hideKeyboard}
      backdropTransitionOutTiming={0}
      backdropOpacity={backdropOpacity}
    >
      {children}
    </Modal>
  )
}

export default ModalComponent
