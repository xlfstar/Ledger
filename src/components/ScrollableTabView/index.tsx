import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
  Dimensions,
  InteractionManager,
} from 'react-native'
import PagerView from 'react-native-pager-view'
import { ScrollableTabViewProps } from './types'
import SceneComponent from './SceneComponent'
import DefaultTabBar from './DefaultTabBar'
import ScrollableTabBar from './ScrollableTabBar'

// 创建动画化的PagerView组件
const AnimatedPagerView =
  Platform.OS === 'android'
    ? Animated.createAnimatedComponent(PagerView)
    : undefined

/**
 * ScrollableTabView是一个可滑动的标签页组件
 * 支持水平滑动切换标签页，可自定义标签栏样式
 */
const ScrollableTabView: React.FC<ScrollableTabViewProps> & {
  DefaultTabBar: typeof DefaultTabBar
  ScrollableTabBar: typeof ScrollableTabBar
} = (props) => {
  const {
    tabBarPosition = 'top',
    initialPage = 0,
    page = -1,
    onChangeTab = () => {},
    onScroll = () => {},
    renderTabBar,
    tabBarBackgroundColor,
    tabBarActiveTextColor,
    tabBarInactiveTextColor,
    tabBarUnderlineStyle,
    tabBarTextStyle,
    style,
    contentProps = {},
    scrollWithoutAnimation = false,
    locked = false,
    prerenderingSiblingsNumber = 0,
    children,
  } = props

  const containerWidth = Dimensions.get('window').width
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [sceneKeys, setSceneKeys] = useState<string[]>([])
  const scrollViewRef = useRef<ScrollView | PagerView>(null)
  const scrollXIOS = useRef(
    new Animated.Value(initialPage * containerWidth)
  ).current
  const positionAndroid = useRef(new Animated.Value(initialPage)).current
  const offsetAndroid = useRef(new Animated.Value(0)).current
  const scrollValue =
    Platform.OS === 'ios'
      ? Animated.divide(scrollXIOS, new Animated.Value(containerWidth))
      : Animated.add(positionAndroid, offsetAndroid)
  const [containerWidthState, setContainerWidthState] = useState(containerWidth)
  const [tabWillChangeWithoutGesture, setTabWillChangeWithoutGesture] =
    useState(false)

  // 添加监听器到动画值
  useEffect(() => {
    if (Platform.OS === 'ios') {
      scrollXIOS.addListener(({ value }) => {
        const scrollValue = value / containerWidthState
        onScroll(scrollValue)
      })
    } else {
      let positionValue = initialPage
      let offsetValue = 0

      positionAndroid.addListener(({ value }) => {
        positionValue = value
        onScroll(positionValue + offsetValue)
      })

      offsetAndroid.addListener(({ value }) => {
        offsetValue = value
        onScroll(positionValue + offsetValue)
      })
    }

    return () => {
      if (Platform.OS === 'ios') {
        scrollXIOS.removeAllListeners()
      } else {
        positionAndroid.removeAllListeners()
        offsetAndroid.removeAllListeners()
      }
    }
  }, [containerWidthState])

  // 初始化场景键
  useEffect(() => {
    updateSceneKeys(initialPage, children)
  }, [])

  // 监听children变化
  useEffect(() => {
    updateSceneKeys(currentPage, children)
  }, [children])

  // 监听page属性变化
  useEffect(() => {
    if (page >= 0 && page !== currentPage) {
      goToPage(page)
    }
  }, [page])

  // 更新场景键
  const updateSceneKeys = (
    page: number,
    children: React.ReactNode,
    callback?: () => void
  ) => {
    const newKeys = newSceneKeys(sceneKeys, page, children)
    setSceneKeys(newKeys)
    setCurrentPage(page)
    if (callback) callback()
  }

  // 生成新的场景键
  const newSceneKeys = (
    previousKeys: string[] = [],
    currentPage: number,
    children: React.ReactNode
  ) => {
    const newKeys: string[] = []
    React.Children.forEach(children, (child, idx) => {
      if (!React.isValidElement(child)) return

      const key = makeSceneKey(child, idx)
      if (
        keyExists(previousKeys, key) ||
        shouldRenderSceneKey(idx, currentPage)
      ) {
        newKeys.push(key)
      }
    })
    return newKeys
  }

  // 检查场景键是否应该渲染
  const shouldRenderSceneKey = (idx: number, currentPageKey: number) => {
    const numOfSibling = prerenderingSiblingsNumber
    return (
      idx < currentPageKey + numOfSibling + 1 &&
      idx > currentPageKey - numOfSibling - 1
    )
  }

  // 检查键是否存在
  const keyExists = (sceneKeys: string[], key: string) => {
    return sceneKeys.indexOf(key) !== -1
  }

  // 生成场景键
  const makeSceneKey = (child: React.ReactElement, idx: number) => {
    return `${child.props.tabLabel}_${idx}`
  }

  // 跳转到指定页面
  const goToPage = (pageNumber: number) => {
    if (Platform.OS === 'ios') {
      const offset = pageNumber * containerWidthState
      if (scrollViewRef.current) {
        ;(scrollViewRef.current as ScrollView).scrollTo({
          x: offset,
          y: 0,
          animated: !scrollWithoutAnimation,
        })
      }
    } else {
      if (scrollViewRef.current) {
        setTabWillChangeWithoutGesture(true)
        const pagerView = scrollViewRef.current as PagerView
        if (scrollWithoutAnimation) {
          pagerView.setPageWithoutAnimation(pageNumber)
        } else {
          pagerView.setPage(pageNumber)
        }
      }
    }

    const currentPage1 = currentPage
    updateSceneKeys(pageNumber, children, () => {
      onChangeTab({
        i: pageNumber,
        ref: getChildrenArray()[pageNumber],
        from: currentPage1,
      })
    })
  }

  // 渲染标签栏
  const renderTabBar1 = (props: any) => {
    if (renderTabBar === false) {
      return null
    } else if (renderTabBar) {
      const tabBar = renderTabBar(props)
      if (React.isValidElement(tabBar)) {
        return React.cloneElement(tabBar, props)
      }
      return null
    } else {
      return <DefaultTabBar {...props} />
    }
  }

  // 获取子元素数组
  const getChildrenArray = () => {
    return React.Children.toArray(children).filter((child) =>
      React.isValidElement(child)
    )
  }

  // 组合场景
  const composeScenes = () => {
    return getChildrenArray().map((child, idx) => {
      if (!React.isValidElement(child)) return null

      const key = makeSceneKey(child, idx)
      return (
        <SceneComponent
          key={child.key}
          shouldUpdated={shouldRenderSceneKey(idx, currentPage)}
          style={{ width: containerWidthState }}
        >
          {keyExists(sceneKeys, key) ? child : <View />}
        </SceneComponent>
      )
    })
  }

  // 渲染可滚动内容
  const renderScrollableContent = () => {
    if (Platform.OS === 'ios') {
      const scenes = composeScenes()
      return (
        <Animated.ScrollView
          horizontal
          pagingEnabled
          automaticallyAdjustContentInsets={false}
          contentOffset={{ x: initialPage * containerWidthState, y: 0 }}
          ref={scrollViewRef as React.RefObject<ScrollView>}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollXIOS } } }],
            {
              useNativeDriver: true,
              listener: (event: any) => {
                const value =
                  event.nativeEvent.contentOffset.x / containerWidthState
                onScroll(value)
              },
            }
          )}
          onMomentumScrollBegin={onMomentumScrollBeginAndEnd}
          onMomentumScrollEnd={onMomentumScrollBeginAndEnd}
          scrollEventThrottle={16}
          scrollsToTop={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!locked}
          directionalLockEnabled
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
          {...contentProps}
        >
          {scenes}
        </Animated.ScrollView>
      )
    } else if (Platform.OS === 'android' && AnimatedPagerView) {
      const scenes = composeScenes()
      return (
        <AnimatedPagerView
          key={getChildrenArray().length}
          style={styles.scrollableContentAndroid}
          initialPage={initialPage}
          onPageSelected={updateSelectedPage}
          scrollEnabled={!locked}
          onPageScroll={Animated.event(
            [
              {
                nativeEvent: {
                  position: positionAndroid,
                  offset: offsetAndroid,
                },
              },
            ],
            {
              useNativeDriver: true,
              listener: (event: any) => {
                const position = event.nativeEvent.position
                const offset = event.nativeEvent.offset
                onScroll(position + offset)
              },
            }
          )}
          ref={scrollViewRef as React.RefObject<PagerView>}
          {...contentProps}
          keyboardDismissMode="on-drag"
        >
          {scenes}
        </AnimatedPagerView>
      )
    } else {
      // 默认回退渲染
      return <View style={styles.scrollableContentAndroid} />
    }
  }

  // 处理动量滚动开始和结束
  const onMomentumScrollBeginAndEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x
    const page = Math.round(offsetX / containerWidthState)
    if (currentPage !== page) {
      updateSelectedPage(page)
    }
  }

  // 更新选中页面
  const updateSelectedPage = (nextPage: any) => {
    let localNextPage = nextPage
    if (typeof localNextPage === 'object') {
      localNextPage = nextPage.nativeEvent.position
    }

    if (!tabWillChangeWithoutGesture) {
      updateSceneKeys(localNextPage, children, () => {
        onChangeTab({
          i: localNextPage,
          ref: getChildrenArray()[localNextPage],
          from: currentPage,
        })
      })
    }
    setTabWillChangeWithoutGesture(false)
  }

  // 处理布局变化
  const handleLayout = (e: any) => {
    const { width } = e.nativeEvent.layout

    if (
      !width ||
      width <= 0 ||
      Math.round(width) === Math.round(containerWidthState)
    ) {
      return
    }

    setContainerWidthState(width)
    InteractionManager.runAfterInteractions(() => {
      goToPage(currentPage)
    })
  }

  // 渲染组件
  const overlayTabs =
    tabBarPosition === 'overlayTop' || tabBarPosition === 'overlayBottom'
  const tabBarProps = {
    goToPage,
    tabs: getChildrenArray().map((child) => {
      if (React.isValidElement(child)) {
        return child.props.tabLabel
      }
      return ''
    }),
    activeTab: currentPage,
    scrollValue,
    containerWidth: containerWidthState,
    backgroundColor: tabBarBackgroundColor,
    activeTextColor: tabBarActiveTextColor,
    inactiveTextColor: tabBarInactiveTextColor,
    textStyle: tabBarTextStyle,
    underlineStyle: tabBarUnderlineStyle,
  }

  let tabBarStyle
  if (overlayTabs) {
    tabBarStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      [tabBarPosition === 'overlayTop' ? 'top' : 'bottom']: 0,
    }
  }

  return (
    <View style={[styles.container, style]} onLayout={handleLayout}>
      {tabBarPosition === 'top' &&
        renderTabBar1({ ...tabBarProps, style: tabBarStyle })}
      {renderScrollableContent()}
      {(tabBarPosition === 'bottom' || overlayTabs) &&
        renderTabBar1({ ...tabBarProps, style: tabBarStyle })}
    </View>
  )
}

// 添加静态属性
ScrollableTabView.DefaultTabBar = DefaultTabBar
ScrollableTabView.ScrollableTabBar = ScrollableTabBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContentAndroid: {
    flex: 1,
  },
})

export default ScrollableTabView
