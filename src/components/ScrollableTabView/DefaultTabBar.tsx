import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { DefaultTabBarProps } from './types'
import Button from './Button'

/**
 * DefaultTabBar是一个基本的标签栏组件，显示固定宽度的标签
 */
const DefaultTabBar: React.FC<DefaultTabBarProps> = (props) => {
  const {
    goToPage,
    activeTab,
    tabs,
    backgroundColor,
    activeTextColor = 'navy',
    inactiveTextColor = 'black',
    textStyle,
    tabStyle,
    renderTab: customRenderTab,
    underlineStyle,
    containerWidth,
    scrollValue,
  } = props

  const renderTab = (
    name: string,
    page: number,
    isTabActive: boolean,
    onPressHandler: (page: number) => void
  ) => {
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return (
      <Button
        style={{ flex: 1 }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, tabStyle]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {name}
          </Text>
        </View>
      </Button>
    )
  }

  const numberOfTabs = tabs.length
  const tabUnderlineStyle = {
    position: 'absolute',
    width: containerWidth / numberOfTabs,
    height: 4,
    backgroundColor: 'navy',
    bottom: 0,
  }

  const translateX = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth / numberOfTabs],
  })

  return (
    <View style={[styles.tabs, { backgroundColor }, props.style]}>
      {tabs.map((name, page) => {
        const isTabActive = activeTab === page
        const renderTabFn = customRenderTab || renderTab
        return renderTabFn(name, page, isTabActive, goToPage)
      })}
      <Animated.View
        style={[
          {
            position: 'absolute' as const,
            width: containerWidth / numberOfTabs,
            height: 4,
            backgroundColor: 'navy',
            bottom: 0,
          },
          {
            transform: [{ translateX }],
          },
          underlineStyle,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
})

export default DefaultTabBar
