import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { PageView, BounceButton } from '@/components'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ms, s } from 'react-native-size-matters'
import { TabBarProps } from '@/components/ScrollableTabView/types'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import List from './components/List'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { primaryTextColor, themeGreenColor } from '@/contents/theme'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchAssetsList } from '@/store/slices/assetsSlice'
import CusView from './components/CusView'

const tabList = [
  {
    label: '支出',
    value: 1,
  },
  {
    label: '收入',
    value: 2,
  },
]

const AddPage = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const insets = useSafeAreaInsets()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const translateX = useSharedValue(0)
  const tStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  useEffect(() => {
    translateX.value = withTiming(tabIndex * ms(72), { duration: 300 })
  }, [tabIndex])

  const handleGoBack = (type: string) => {
    if (type === 'cancel') {
      navigation.goBack()
      return
    }
    dispatch(fetchAssetsList())
    navigation.goBack()
  }

  const renderTabBar = ({ tabs, activeTab, goToPage }: any) => {
    return (
      <View
        style={{ paddingTop: ms(insets.top), backgroundColor: themeGreenColor }}
      >
        <View style={[styles.tabBar]}>
          <View style={styles.tabBarContent}>
            {tabs.map((tab: string, i: number) => (
              <BounceButton
                key={i}
                onPress={() => {
                  setTabIndex(i)
                  goToPage(i)
                }}
                style={[styles.tabBarItem]}
              >
                <Text style={styles.tabBarItemText}>{tab}</Text>
              </BounceButton>
            ))}
            <Animated.View style={[styles.tabBarLine, tStyle]}></Animated.View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <PageView headerHide>
      <BounceButton
        style={{
          position: 'absolute',
          left: ms(10),
          zIndex: 1,
          height: ms(44),
          top: insets.top,
          justifyContent: 'center',
          paddingRight: ms(30),
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon
          type="feather"
          name="chevron-left"
          size={ms(30)}
          color={primaryTextColor}
        />
      </BounceButton>
      <ScrollableTabView
        initailPage={0}
        renderTabBar={renderTabBar}
        onChangeTab={({ from, i, ref }: any) => setTabIndex(i)}
      >
        {tabList.map((item, index) => (
          <CusView tabLabel={item.label} key={index} style={{ flex: 1 }}>
            <List
              type={item.value}
              onCancel={() => handleGoBack('cancel')}
              onSave={(type) => handleGoBack(type)}
            />
          </CusView>
        ))}
      </ScrollableTabView>
    </PageView>
  )
}
export default AddPage
