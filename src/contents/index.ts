import { Dimensions, Platform, StatusBar, NativeModules } from 'react-native'
import type { ScaledSize } from 'react-native'
const { StatusBarManager } = NativeModules
export const window: ScaledSize = Dimensions.get('window')
export const screen: ScaledSize = Dimensions.get('screen')
export const isAndroid: boolean = Platform.OS === 'android'
export const isiOS: boolean = Platform.OS === 'ios'
export const StatusBarHeight: number = isAndroid
  ? StatusBar.currentHeight
  : StatusBarManager.HEIGHT

export type ShadowProps<T = number> = Partial<{
  opacity: T
  elevation: T
  shadowOpacity: T
  shadowRadius: T
  shadowOffset: { width: T; height: T }
}>

// 公共阴影
export const shadow = (props?: ShadowProps) => {
  const { opacity, elevation, shadowOpacity, shadowRadius, shadowOffset } =
    props || {
      opacity: 0.1,
      elevation: 2,
      shadowRadius: 3,
      shadowOpacity: 0.35,
      shadowOffset: { width: 1, height: 2 },
    }

  return {
    elevation,
    shadowColor: `rgba(0, 0, 0, ${opacity})`,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  }
}
