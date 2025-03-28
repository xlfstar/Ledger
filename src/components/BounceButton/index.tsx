import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
} from 'react'
import { View, TouchableOpacity } from 'react-native'
import type {
  ViewProps,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native'
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce'
import { debounce } from '@/utils'

interface Props {
  bounce?: boolean
  disabled?: boolean
  debounceTime?: number
  children?: React.ReactNode
  style?: ViewProps['style']
  onPress: ((event: GestureResponderEvent) => void) | undefined
  onPressOut?: ((event: GestureResponderEvent) => void) | undefined
  [key: string]: any
}

export interface Refs {
  width: number
}

const BounceButton = forwardRef<Refs, Props>((props, ref): React.ReactNode => {
  const {
    bounce = true,
    debounceTime = 100,
    disabled = false,
    style = {},
    children,
    onPressOut,
    onPress,
    ...reset
  } = props
  const [buttonWidth, setButtonWidth] = useState(0)

  // 如果被禁用
  if (disabled) {
    return (
      <View style={style} {...reset}>
        {children}
      </View>
    )
  }

  // 按钮
  const TouchButton = bounce ? TouchableBounce : TouchableOpacity

  // TODO: 点击
  const handlePress = (e: GestureResponderEvent) => {
    requestAnimationFrame(() => {
      onPress?.(e)
    })
  }

  // TODO: 点击释放
  const handlePressOut = (e: GestureResponderEvent) => {
    requestAnimationFrame(() => {
      onPressOut?.(e)
    })
  }

  // TODO: 获取按钮layout属性
  const getButtonLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      const { width } = nativeEvent.layout
      if (buttonWidth < width) {
        setButtonWidth(width)
      }
    },
    [buttonWidth]
  )

  // 自定义ref
  useImperativeHandle(
    ref,
    () => ({
      width: buttonWidth,
    }),
    [buttonWidth]
  )

  return (
    <TouchButton
      onLayout={getButtonLayout}
      onPressOut={debounce(handlePressOut, debounceTime)}
      onPress={debounce(handlePress, debounceTime)}
      style={style}
      {...reset}
    >
      {children}
    </TouchButton>
  )
})

export default BounceButton
