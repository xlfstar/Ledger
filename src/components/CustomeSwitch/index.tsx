import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  runOnJS
} from 'react-native-reanimated'
import React, { useState, useEffect,memo } from 'react'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { View, Text, Pressable } from 'react-native'

interface SwitchProps {
  onChange: (value: number) => void
  width?: number
  height?: number
}
const CustomeSwitch = ({
  onChange = () => {},
  width = 110,
  height = 24,
}: SwitchProps) => {
  const [sortType, setSortType] = useState(0) //0按金额，1按时间
  const maxTranslateX = ms((width-2)/2)
  const maskPosition = useSharedValue(0)
  const maskStyle = useAnimatedStyle(() => {
    const translateX = interpolate(maskPosition.value, [0, 1], [0, (maxTranslateX)])
    return {
      transform: [{ translateX: withTiming(translateX) }],
    }
  })

  useEffect(() => {
    onChange && onChange(sortType)
  }, [sortType])

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      'worklet'
      if (event.translationX > 0) {
        // 向右滑动
        maskPosition.value = 1
        runOnJS(setSortType)(1)
      } else {
        // 向左滑动
        maskPosition.value = 0
        runOnJS(setSortType)(0)
      }
    })
    
    

  return (
    <GestureDetector gesture={panGesture}>
      <View
        style={[
          styles.rankingListTitleRight,
          {
            width: ms(width),
            height: ms(height),
            borderRadius: ms(height / 2),
          },
        ]}
      >
        <Animated.View
          style={[
            styles.mask,
            maskStyle,
            {
              width: ms((width - 2) / 2),
              height: ms((height - 2)),
              borderRadius: ms(height - 2),
            },
          ]}
        ></Animated.View>
        <Pressable
          style={styles.rankingListTitleRightItem}
          onPress={() => {
            if (sortType === 0) return
            setSortType(0)
            maskPosition.value = 0
          }}
        >
          <Text style={styles.rankingListTitleRightItemText}>按金额</Text>
        </Pressable>
        <Pressable
          style={styles.rankingListTitleRightItem}
          onPress={() => {
            if (sortType === 1) return
            setSortType(1)
            maskPosition.value = 1
          }}
        >
          <Text style={styles.rankingListTitleRightItemText}>按时间</Text>
        </Pressable>
      </View>
    </GestureDetector>
  )
}

export default memo(CustomeSwitch)

const styles = ScaledSheet.create({
  rankingListTitleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
    zIndex:999
  },
  mask: {
    position: 'absolute',
    left: ms(1),
    top: ms(1),
    backgroundColor: 'white',
  },
  rankingListTitleRightItem: {
    paddingHorizontal: ms(10),
  },

  rankingListTitleRightItemText: {
    fontSize: ms(11),
  },
})
