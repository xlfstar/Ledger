import React from 'react'
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from 'react-native'
import { ButtonProps } from './types'

/**
 * 跨平台按钮组件
 * 在Android上使用TouchableNativeFeedback，在iOS上使用TouchableOpacity
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.SelectableBackground()}
        {...restProps}
      >
        <View>{children}</View>
      </TouchableNativeFeedback>
    )
  }

  return (
    <TouchableOpacity activeOpacity={0.8} {...restProps}>
      {children}
    </TouchableOpacity>
  )
}

export default Button
