import { TransitionPresets } from '@react-navigation/stack'
import { merge } from 'lodash'

const { cardStyleInterpolator, ...restProps } =
  TransitionPresets.SlideFromRightIOS
export default {
  ...restProps,
  headerShown: false,
  gestureEnabled: true,
  cardStyleInterpolator: (params) => {
    return merge(cardStyleInterpolator(params), {
      cardStyle: { opacity: 0.998 }, // 修复屏幕闪动问题，当此值为1时会引起屏幕闪动
    })
  },
}
