import React from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import { ms } from 'react-native-size-matters'
import styles from './styles'
import {
  createBottomTabNavigator,
  TransitionPresets,
} from '@react-navigation/bottom-tabs'
import DetailPage from './detail'
import ChartPage from './chart'
import AddPage from './add'
import DiscoveryPage from './discovery'
import MyPage from './my'
const Tab = createBottomTabNavigator()
const tabMenus = [
  {
    iconActive: require('assets/home/home_active.png'),
    iconDefault: require('assets/home/home.png'),
  },
  {
    iconActive: require('assets/home/chart_active.png'),
    iconDefault: require('assets/home/chart.png'),
  },
  {
    iconActive: require('assets/home/home_active.png'),
    iconDefault: require('assets/home/home.png'),
  },
  {
    iconActive: require('assets/home/find_active.png'),
    iconDefault: require('assets/home/find.png'),
  },
  {
    iconActive: require('assets/home/my_active.png'),
    iconDefault: require('assets/home/my.png'),
  },
]

const AddButton = ({ onPress, selected }) => {
  return (
    <>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Text style={[styles.centerText]}>记账</Text>
    </>
  )
}

// 自定义tabBar
const TabBarIcon = (props) => {
  const { focused, style = {}, icon } = props
  return (
    <View style={styles.tabBar}>
      <Image
        resizeMode={'contain'}
        style={[{ width: ms(20), height: ms(20) }, style]}
        source={focused ? icon.iconActive : icon.iconDefault}
      />
    </View>
  )
}

// TODO: screen options
const getScreenOptions = (params) => {
  
  const { label, icon, style, navigation } = params
  if (label === '记账') {
    return {
      tabBarButton: (props) => (
        <AddButton
          {...props}
          selected={props.accessibilityState.selected}
          onPress={() => navigation.navigate('addBill')}
        />
      ),

      tabBarLabelStyle: { display: 'none' },

      ...TransitionPresets.ShiftTransition,
    }
  }

  return {
    tabBarLabel: label,
    title: label,
    tabBarLabelStyle: {},
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} icon={icon} style={style} />
    ),
    ...TransitionPresets.ShiftTransition,
  }
}

const getNavigatorOptions = () => {
  return {
    headerShown: false,
    tabBarActiveTintColor: '#0f0f0f',
    tabBarInactiveTintColor: '#0f0f0f',
    tabBarStyle: {
      paddingBottom: 25,
      height: 80,
    },
  }
}

const MainPage = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="detail"
      screenOptions={getNavigatorOptions()}
    >
      <Tab.Screen
        name="detail"
        component={DetailPage}
        options={getScreenOptions({ label: '收支', icon: tabMenus[0] })}
      />
      <Tab.Screen
        name="chart"
        options={getScreenOptions({ label: '图表', icon: tabMenus[1] })}
        component={ChartPage}
      />
      <Tab.Screen
        name="add"
        options={getScreenOptions({
          label: '记账',
          icon: tabMenus[2],
          navigation,
        })}
        component={AddPage}
      />
      <Tab.Screen
        name="discovery"
        options={getScreenOptions({ label: '发现', icon: tabMenus[3] })}
        component={DiscoveryPage}
      />
      <Tab.Screen
        name="my"
        options={getScreenOptions({ label: '我的', icon: tabMenus[4] })}
        component={MyPage}
      />
    </Tab.Navigator>
  )
}
export default MainPage
