import React, { useRef, useCallback } from 'react'
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

// 添加一个全局ref来跟踪当前打开的SwipeableView
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
  id: string | number // 添加id属性
  threshold?: number // 添加 threshold 属性
}

const SwipeableView: React.FC<SwipeableViewProps> = ({
  children,
  rightButtons,
  onOpen,
  onClose,
  style,
  id,
  threshold = -75, // 将 threshold 提取为常量
}) => {
  const pan = useRef(new Animated.Value(0)).current
  const isOpen = useRef(false)
  // const threshold = -75 // 将 threshold 提取为常量

  const close = useCallback(() => {
    Animated.spring(pan, {
      toValue: 0,
      useNativeDriver: false,
    }).start()
    isOpen.current = false
    onClose?.()
  }, [pan, onClose])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5
      },
      onPanResponderMove: (_, gestureState) => {
        // 限制最大滑动距离为 threshold
        const newX = Math.max(threshold, Math.min(0, gestureState.dx))
        pan.setValue(newX)
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < threshold / 2 && !isOpen.current) {
          // 关闭其他打开的项
          if (openedItemRef.current && openedItemRef.current.id !== id) {
            openedItemRef.current.close()
          }
          // 打开当前项，最大打开距离为 threshold
          Animated.spring(pan, {
            toValue: threshold,
            useNativeDriver: false,
          }).start()
          isOpen.current = true
          openedItemRef.current = { id, close }
          onOpen?.()
        } else {
          // Close
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start()
          if (isOpen.current) {
            onClose?.()
            if (openedItemRef.current?.id === id) {
              openedItemRef.current = null
            }
          }
          isOpen.current = false
        }
      },
    })
  ).current

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.mainContent,
          {
            transform: [{ translateX: pan }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {children}
        <View style={[styles.buttonsContainer, { right: threshold }]}>
          {rightButtons}
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  mainContent: {
    // backgroundColor: 'white',
    zIndex: 2,
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default SwipeableView
