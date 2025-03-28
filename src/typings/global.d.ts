// 声明redux日志器
declare module 'redux-logger'

// 声明dialog弹窗子类型
declare namespace Dialog {
  import type { StyleProp, ViewStyle, TextStyle } from 'react-native'
  interface ButtonOptions {
    text: string
    type?: 'cancel' | 'confirm' | 'middle'
    style?: StyleProp<ViewStyle> | undefined
    onPress?: () => void
    textStyle?: StyleProp<TextStyle> | undefined
  }
  interface ShowOptions<T = string> {
    title?: T // 标题
    message: T // 信息
    options?: ButtonOptions[] // 按钮组
  }
}

// TouchableBounce
declare module 'react-native/Libraries/Components/Touchable/TouchableBounce'
