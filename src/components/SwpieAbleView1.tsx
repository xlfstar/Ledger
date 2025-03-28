import React, { useCallback } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'

// 全局追踪打开的item
interface OpenedItem {
  id: string | number
  close: () => void
}
const openedItemRef: { current: OpenedItem | null } = { current: null }

interface SwipeableViewProps {
  children: React.ReactNode
  rightButtons?: React.ReactNode
  onOpen?: () => void
  onClose?: () => void
  style?: ViewStyle
  id: string | number
  threshold?: number
}

const SwipeableView22: React.FC<SwipeableViewProps> = ({
  children,
  rightButtons,
  onOpen = () => {},
  onClose = () => {},
  style,
  id,
  threshold = -75,
}) => {
  const translateX = useSharedValue(0)
  const isOpen = useSharedValue(false)

  const close = useCallback(() => {
    translateX.value = withTiming(0, { duration: 200 })
    isOpen.value = false
    onClose?.()
  }, [onClose])

  const panGesture = Gesture.Pan()
    .minDistance(5)
    .activeOffsetX([-5, 5])
    .onChange((event) => {
      'worklet'
      // 限制只能向左滑动,且不超过threshold
      if (event.changeX <= 0) {
        translateX.value = Math.max(
          threshold,
          Math.min(0, translateX.value + event.changeX)
        )
      }
    })
    .onEnd((event) => {
      'worklet'
      if (event.velocityX < -500 || translateX.value < threshold / 2) {
        // 打开
        if (!isOpen.value) {
          if (openedItemRef.current && openedItemRef.current.id !== id) {
            runOnJS(openedItemRef.current.close)()
          }
          translateX.value = withTiming(threshold, { duration: 200 })
          isOpen.value = true
          runOnJS(onOpen)?.()
          runOnJS(Object.assign)(openedItemRef, { current: { id, close } })
        }
      } else {
        // 关闭
        translateX.value = withTiming(0, { duration: 200 })
        if (isOpen.value) {
          runOnJS(onClose)?.()
          if (openedItemRef.current?.id === id) {
            runOnJS(Object.assign)(openedItemRef, { current: null })
          }
        }
        isOpen.value = false
      }
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <View style={[styles.container, style]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.mainContent, animatedStyle]}>
          {/* 直接渲染children，让ItemWithSeparator处理自己的key */}
          {children}
          <Animated.View
            style={[
              styles.buttonsContainer,
              { right: threshold },
              useAnimatedStyle(() => ({
                opacity: Math.abs(translateX.value / threshold),
              })),
            ]}
          >
            {rightButtons}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  mainContent: {
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    opacity: 0, // 初始透明
  },
})

export default SwipeableView22
