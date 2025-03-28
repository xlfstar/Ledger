import * as React from 'react'
import {
  createNavigatorFactory,
  StackRouter,
  useNavigationBuilder,
  StackRouterOptions,
  StackNavigationState,
  StackActionHelpers,
  RouterConfigOptions,
  NavigationState,
  NavigationAction,
  CommonNavigationAction,
  ActionCreators,
} from '@react-navigation/native'
import { StackView } from '@react-navigation/stack'
import type { ParamListBase, StackActionType } from '@react-navigation/native'
import type { RootStackParamList } from '@/pageRouter/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
// 登录拦截路由白名单
const noNeedLoginRoutes = ['launch', 'login', 'register']

const InterceptStackRouter = (options: any) => {
  const { isCreatedDeviceUser, user, isLogin } = useSelector(
    (state: RootState) => state.auth
  )
  const router = StackRouter(options)
  return {
    ...router,
    getStateForAction(
      state: StackNavigationState<RootStackParamList>,
      action: any,
      options: RouterConfigOptions
    ) {
      const { name } = action?.payload || {}

      // if (!isLogin && name && !noNeedLoginRoutes.includes(name)) {
      //   action.payload.name = 'login'
      // }
      const result = router.getStateForAction(state, action, options)
      return result
    },
  }
}

function InterceptStack(options: any) {
  const { state, descriptors, navigation } = useNavigationBuilder(
    InterceptStackRouter,
    options
  )

  return (
    <StackView
      {...options}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  )
}

export default createNavigatorFactory(InterceptStack)
