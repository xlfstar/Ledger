import React from 'react'
import { Text, Image, ImageSourcePropType } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  assetsIcon,
  assetsActiveIcon,
  chartIcon,
  chartActiveIcon,
} from './assets/bottomIcon'
import { ms } from 'react-native-size-matters'
import Assets from './assetsPage'
import Chart from './chartPage'

interface IconType {
  icon: ImageSourcePropType
  iconActive: ImageSourcePropType
}

const Tab = createBottomTabNavigator()

const Index: React.FC = () => {
  const icons: IconType[] = [
    {
      icon: assetsIcon,
      iconActive: assetsActiveIcon,
    },
    {
      icon: chartIcon,
      iconActive: chartActiveIcon,
    },
  ]

  const IconTab = (focused: boolean, index: number): React.ReactElement => {
    const source = (): ImageSourcePropType => {
      if (focused) {
        return icons[index].iconActive
      }
      return icons[index].icon
    }

    return (
      <Image
        style={{
          width: ms(22),
          height: ms(22),
        }}
        source={source()}
      />
    )
  }

  const renderTabBarLabel = (
    focused: boolean,
    title: string,
    index: number
  ): React.ReactElement => {
    return (
      <Text
        style={{
          fontSize: ms(10),
          color: focused ? '#95d475' : '#0f0f0f',
        }}
      >
        {title}
      </Text>
    )
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: ms(80),
          paddingBottom: ms(25),
        },
        headerTitleAllowFontScaling: false,
        // labelStyle: {
        //   bottom: ms(5),
        // },
        tabBarActiveTintColor: '#FF0019',
        tabBarInactiveTintColor: '#AAAAAA',
        // tabBarItemStyle: {
        //   fontSize: 10,
        // },
      }}
    >
      <Tab.Screen
        name="assets"
        component={Assets}
        options={{
          tabBarLabel: ({ focused }: any) =>
            renderTabBarLabel(focused, '资产', 0),
          tabBarIcon: ({ focused }: any) => IconTab(focused, 0),
          title: '资产',
        }}
      />
      <Tab.Screen
        name="chart"
        component={Chart}
        options={{
          tabBarLabel: ({ focused }: any) =>
            renderTabBarLabel(focused, '图表', 1),
          tabBarIcon: ({ focused }: any) => IconTab(focused, 1),
          title: '图表',
        }}
      />
    </Tab.Navigator>
  )
}

export default Index
