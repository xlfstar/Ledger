import { TransitionPresets } from '@react-navigation/stack'
import { merge } from 'es-toolkit'

/**
 * 定义转场动画配置
 */
const { cardStyleInterpolator, ...restProps } =
  TransitionPresets.SlideFromRightIOS

/**
 * 转场配置接口
 */
interface TransitionConfig {
  headerShown: boolean
  gestureEnabled: boolean
  cardStyleInterpolator: (params: any) => any
}

/**
 * 转场动画配置
 */
const transitionConfig: TransitionConfig = {
  ...restProps,
  headerShown: false,
  gestureEnabled: true,
  cardStyleInterpolator: (params) => {
    return merge(cardStyleInterpolator(params), {
      cardStyle: { opacity: 0.998 }, // 修复屏幕闪动问题，当此值为1时会引起屏幕闪动
    })
  },
}

export default transitionConfig
