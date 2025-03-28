import React, { useRef, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import {
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack'
import createInterceptStack from './interceptStack'
import NavigationService from './NavigationService'
import Transition from './Transition'
import { selectIsAuthenticated } from '@/store/slices/authSlice'

import Home from '@/pages/home'
import LaunchPage from '@/pages/launch'
import AddBill from '@/pages/addBill'
import Register from '@/pages/register'
import Login from '@/pages/login'
import BillPage from '@/pages/bill'
import BudgetPage from '@/pages/budget'
import AssetsManager from '@/pages/assetsManager'
import AddAssets from '@/pages/addAssets'
import AddAssetsInput from '@/pages/addAssets/addInput'
import SelectChildren from '@/pages/addAssets/selectChildren'
import ClassifyBill from '@/pages/classfifyBill'
import BillDetailPage from '@/pages/billDetail'
import StatisticsByMonth from '@/pages/statisticsByMonth'
import ExpenseListByMonth from '@/pages/expenseListByMonth'
import SelectClassifyPage from '@/pages/selectClassify'
import AssetDetailPage from '@/pages/assetDetail'
import AccountPage from '@/pages/user'
const Stack = createInterceptStack()
export default function App() {
  const routeNameRef = useRef()
  const navigationRef = NavigationService.navigationRef
  const handleStateChange = () => {
    const previousRouteName = routeNameRef.current
    if (navigationRef.current) {
      const { name } = navigationRef.current.getCurrentRoute() || {}
      const { title } = navigationRef.current.getCurrentOptions() || {}
      routeNameRef.current = name
    }
  }
  // const isLogin = useSelector(selectIsAuthenticated);

  // useEffect(() => {
  //   if (!isLogin) {
  //     // 重定向到登录页
  //   }
  // }, [isLogin]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={handleStateChange}
      >
        <Stack.Navigator
          headerMode="none"
          initialRouteName="launch"
          screenOptions={Transition}
        >
          <Stack.Screen name="launch" component={LaunchPage} />
          <Stack.Screen
            name="mainTab"
            component={Home}
            // options={{
            //   cardStyleInterpolator:
            //     CardStyleInterpolators.forBottomSheetAndroid,
            //   gestureEnabled: false,
            //   headerLeft: null,
            // }}
          />
          <Stack.Screen name="addBill" component={AddBill} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen
            name="bill"
            component={BillPage}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forBottomSheetAndroid,
              gestureEnabled: false,
              headerLeft: null,
            }}
          />
          <Stack.Screen name="budget" component={BudgetPage} />
          <Stack.Screen name="assetsManager" component={AssetsManager} />
          <Stack.Screen name="addAssets" component={AddAssets} />
          <Stack.Screen name="addAssetsInput" component={AddAssetsInput} />
          <Stack.Screen name="selectChildren" component={SelectChildren} />
          <Stack.Screen
            name="classifyBill"
            component={ClassifyBill}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="billDetail" component={BillDetailPage} />
          <Stack.Screen
            name="statisticsByMonth"
            component={StatisticsByMonth}
          />
          <Stack.Screen
            name="expenseListByMonth"
            component={ExpenseListByMonth}
          />
          <Stack.Screen name="selectClassify" component={SelectClassifyPage} />
          <Stack.Screen name="account" component={AccountPage} />
          <Stack.Screen
            name="assetDetail"
            component={AssetDetailPage}
            // options={{
            //   cardStyleInterpolator:
            //     CardStyleInterpolators.forBottomSheetAndroid,
            //   gestureEnabled: false,
            //   headerLeft: null,
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
