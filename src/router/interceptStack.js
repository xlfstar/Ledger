import * as React from 'react'
import {
  createNavigatorFactory,
  StackRouter,
  useNavigationBuilder,
} from '@react-navigation/native'
import { StackView } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/store/slices/authSlice'
import store from '@/store'
// 登录拦截路由黑名单
const needLoginRoutes = ['bill']

const InterceptStackRouter = (options) => {
  const router = StackRouter(options)
  // const { isCreatedDeviceUser, user, isLogin } = useSelector(
  //   (state) => state.auth
  // )
  return {
    ...router,
    getStateForAction(state, action, options) {
      const isLogin = selectIsAuthenticated(store.getState())
      const { name } = action.payload || {}

      // if (!isLogin && name && !needLoginRoutes.includes(name)) {
      //   action.payload.name = 'login'
      // }
      const result = router.getStateForAction(state, action, options)

      return result
    },
  }
}

function InterceptStack(options) {
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
