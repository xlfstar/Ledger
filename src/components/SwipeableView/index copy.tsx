import React, { useCallback, useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDecay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import {
  backgroundColor,
  primaryTextColor,
  themeGreenColor,
} from '@/contents/theme'
import { ms, ScaledSheet } from 'react-native-size-matters'
export type SwipeableViewProps = {
  // Define props for SwipeableView
  renderHideComponent?: () => JSX.Element
  renderShowComponent: () => JSX.Element
  activeIndex: number
  index: number
  setActiveIndex: (index: number) => void
  swipeThreshold?: number
}
const SwipeableView = ({
  renderShowComponent,
  renderHideComponent,
  activeIndex,
  index,
  setActiveIndex,
  swipeThreshold,
}: SwipeableViewProps) => {
  const SWIPE_THRESHOLD = swipeThreshold || -150
  console.log(activeIndex, index)

  const toggleItem = useCallback(
    (status: boolean) => {
      translateX.value = withTiming(status ? SWIPE_THRESHOLD : 0, {
        duration: 200,
      })
    },
    [activeIndex]
  )
  const translateX = useSharedValue(0)
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const panGesture = Gesture.Pan()
    // .activeOffsetX([-1, 1])
    // .failOffsetY([-1, 1])
    .onStart(() => {
      'worklet'
      runOnJS(setActiveIndex)(index)
      if (activeIndex !== index) {
        runOnJS(toggleItem)(false)
        return
      }
    })
    .onChange((event) => {
      'worklet'
      if (activeIndex !== index) return
      translateX.value = Math.max(
        SWIPE_THRESHOLD,
        Math.min(0, translateX.value + event.changeX)
      )
    })
    .onEnd((event) => {
      'worklet'
      if (activeIndex !== index) {
        runOnJS(toggleItem)(false)
        return
      }
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [SWIPE_THRESHOLD, 0],
      })
      console.log(translateX.value)

      if (activeIndex === index) {
        if (event.translationX >= 0) {
          runOnJS(toggleItem)(false)
        } else {
          runOnJS(toggleItem)(translateX.value < SWIPE_THRESHOLD / 2)
        }
      }
    })
  useEffect(() => {
    if (activeIndex !== index) {
      toggleItem(false)
    }
  }, [activeIndex, index, toggleItem])
  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <View>
          <Animated.View style={[styles.rowFront, rStyle]}>
            {renderShowComponent()}
          </Animated.View>
          {renderHideComponent && (
            <Animated.View
              style={[
                styles.rowBack,
                useAnimatedStyle(() => ({
                  width: Math.abs(translateX.value),
                })),
              ]}
            >
              {renderHideComponent()}
            </Animated.View>
          )}
        </View>
      </GestureDetector>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  rowFront: {},
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  emptyBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImg: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
})
export default SwipeableView
