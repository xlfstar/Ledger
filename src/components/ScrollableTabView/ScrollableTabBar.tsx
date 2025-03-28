import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  Dimensions,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { ScrollableTabBarProps } from './types'
import Button from './Button'

const WINDOW_WIDTH = Dimensions.get('window').width

/**
 * ScrollableTabBar是一个可滚动的标签栏组件
 * 当标签数量较多时，可以水平滚动查看所有标签
 */
const ScrollableTabBar: React.FC<ScrollableTabBarProps> = (props) => {
  const {
    goToPage,
    activeTab,
    tabs,
    scrollValue,
    containerWidth,
    backgroundColor,
    activeTextColor = 'navy',
    inactiveTextColor = 'black',
    scrollOffset = 52,
    style = {},
    tabStyle = {},
    tabsContainerStyle = {},
    textStyle = {},
    underlineStyle = {},
    onScroll,
  } = props

  const scrollViewRef = useRef<ScrollView>(null)
  const [containerMeasurements, setContainerMeasurements] = useState<{
    width: number
  } | null>(null)
  const [tabContainerMeasurements, setTabContainerMeasurements] = useState<{
    width: number
  } | null>(null)
  const [tabsMeasurements, setTabsMeasurements] = useState<
    Array<{ left: number; right: number; width: number; height: number }>
  >([])
  const [leftTabUnderline] = useState(new Animated.Value(0))
  const [widthTabUnderline] = useState(new Animated.Value(0))

  useEffect(() => {
    scrollValue.addListener(updateView)
    return () => {
      scrollValue.removeAllListeners()
    }
  }, [])

  const updateView = (offset: { value: number }) => {
    const position = Math.floor(offset.value)
    const pageOffset = offset.value % 1
    const tabCount = tabs.length
    const lastTabPosition = tabCount - 1

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return
    }

    if (
      necessarilyMeasurementsCompleted(position, position === lastTabPosition)
    ) {
      updateTabPanel(position, pageOffset)
      updateTabUnderline(position, pageOffset, tabCount)
    }
  }

  const necessarilyMeasurementsCompleted = (
    position: number,
    isLastTab: boolean
  ) => {
    return (
      tabsMeasurements[position] &&
      (isLastTab || tabsMeasurements[position + 1]) &&
      tabContainerMeasurements &&
      containerMeasurements
    )
  }

  const updateTabPanel = (position: number, pageOffset: number) => {
    if (
      !containerMeasurements ||
      !tabContainerMeasurements ||
      !tabsMeasurements[position]
    )
      return

    const containerWidth = containerMeasurements.width
    const tabWidth = tabsMeasurements[position].width
    const nextTabMeasurements = tabsMeasurements[position + 1]
    const nextTabWidth = (nextTabMeasurements && nextTabMeasurements.width) || 0
    const tabOffset = tabsMeasurements[position].left
    const absolutePageOffset = pageOffset * tabWidth
    let newScrollX = tabOffset + absolutePageOffset

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -=
      (containerWidth -
        (1 - pageOffset) * tabWidth -
        pageOffset * nextTabWidth) /
      2
    newScrollX = newScrollX >= 0 ? newScrollX : 0

    if (Platform.OS === 'android') {
      scrollViewRef.current?.scrollTo({ x: newScrollX, y: 0, animated: false })
    } else {
      const rightBoundScroll =
        tabContainerMeasurements.width - containerMeasurements.width
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX
      scrollViewRef.current?.scrollTo({ x: newScrollX, y: 0, animated: false })
    }
  }

  const updateTabUnderline = (
    position: number,
    pageOffset: number,
    tabCount: number
  ) => {
    if (!tabsMeasurements[position]) return

    const lineLeft = tabsMeasurements[position].left
    const lineRight = tabsMeasurements[position].right

    if (position < tabCount - 1) {
      const nextTabLeft = tabsMeasurements[position + 1].left
      const nextTabRight = tabsMeasurements[position + 1].right

      const newLineLeft = pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft
      const newLineRight =
        pageOffset * nextTabRight + (1 - pageOffset) * lineRight

      leftTabUnderline.setValue(newLineLeft)
      widthTabUnderline.setValue(newLineRight - newLineLeft)
    } else {
      leftTabUnderline.setValue(lineLeft)
      widthTabUnderline.setValue(lineRight - lineLeft)
    }
  }

  const renderTab = (
    name: string,
    page: number,
    isTabActive: boolean,
    onPressHandler: (page: number) => void,
    onLayoutHandler: (e: LayoutChangeEvent) => void
  ) => {
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return (
      <Button
        key={`${name}_${page}`}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
      >
        <View style={[styles.tab, tabStyle]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {name}
          </Text>
        </View>
      </Button>
    )
  }

  const measureTab = (page: number, event: LayoutChangeEvent) => {
    const { x, width, height } = event.nativeEvent.layout
    const newTabsMeasurements = [...tabsMeasurements]
    newTabsMeasurements[page] = { left: x, right: x + width, width, height }
    setTabsMeasurements(newTabsMeasurements)

    // 更新视图
    updateView({ value: (scrollValue as any).__getValue() })
  }

  const onContainerLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout
    setContainerMeasurements({ width })
  }

  const onTabContainerLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout
    setTabContainerMeasurements({ width })
  }

  const tabUnderlineStyle = {
    position: 'absolute',
    height: 4,
    backgroundColor: 'navy',
    bottom: 0,
  }

  const dynamicTabUnderline = {
    left: leftTabUnderline,
    width: widthTabUnderline,
  }

  return (
    <View
      style={[styles.container, { backgroundColor }, style]}
      onLayout={onContainerLayout}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        bounces={false}
        scrollsToTop={false}
        onScroll={
          onScroll as
            | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
            | undefined
        }
        scrollEventThrottle={16}
      >
        <View
          style={[styles.tabs, { width: containerWidth }, tabsContainerStyle]}
          onLayout={onTabContainerLayout}
        >
          {tabs.map((name, page) => {
            const isTabActive = activeTab === page
            return renderTab(name, page, isTabActive, goToPage, (e) =>
              measureTab(page, e)
            )
          })}
          <Animated.View
            style={[
              {
                position: 'absolute',
                height: 4,
                backgroundColor: 'navy',
                bottom: 0,
              },
              dynamicTabUnderline,
              underlineStyle,
            ]}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
})

export default ScrollableTabBar
