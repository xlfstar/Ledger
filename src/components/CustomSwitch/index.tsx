import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Animated,
  PanResponder,
  PanResponderGestureState
} from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'

interface SwitchProps {
  value?: number
  onChange?: (value: number) => void
  width?: number
  height?: number
  options: Array<{
    label: string
    value: number
  }>
}

const CustomSwitch: React.FC<SwitchProps> = ({
  value = 0,
  onChange,
  width = 110,
  height = 24,
  options = [
    { label: '按金额', value: 0 },
    { label: '按时间', value: 1 }
  ]
}) => {
  const itemWidth = (width - 2) / options.length
  const translateX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value * itemWidth,
      useNativeDriver: true,
    }).start()
  }, [value, itemWidth])

  const updateValue = (newValue: number) => {
    if (onChange) {
      onChange(newValue)
    }
    Animated.spring(translateX, {
      toValue: newValue * itemWidth,
      useNativeDriver: true,
    }).start()
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
        const newX = Math.max(
          0,
          Math.min(gestureState.dx + (value * itemWidth), itemWidth)
        )
        translateX.setValue(newX)
      },
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const currentPosition = gestureState.dx + (value * itemWidth)
        const newValue = currentPosition > itemWidth / 2 ? 1 : 0
        updateValue(newValue)
      },
    })
  ).current

  const handlePress = (index: number) => {
  console.log(111);
  
    if (index === value) return
    updateValue(index)
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: ms(width),
          height: ms(height),
          borderRadius: ms(height / 2),
        },
      ]}
    >
      <Animated.View
        style={[
          styles.slider,
          {
            width: ms(itemWidth),
            height: ms(height - 2),
            borderRadius: ms((height - 2) / 2),
            transform: [{ translateX }],
          },
        ]}
      />
      {options.map((option, index) => (
        <Pressable
          key={option.value}
          style={[
            styles.option,
            {
              width: ms(itemWidth),
            },
          ]}
          onPress={() => handlePress(index)}
        >
          <View 
            {...panResponder.panHandlers}
            style={styles.optionInner}
          >
            <Text style={styles.optionText}>{option.label}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: '1@ms',
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    left: '1@ms',
    top: '1@ms',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  optionInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: '11@ms',
    color: '#333',
    fontWeight: '400',
  },
})

export default CustomSwitch 