import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  View,
  Platform,
  ScrollViewProps,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { Keyboard, ScrollView, TextInput, StatusBar } from 'react-native'

interface Props extends ScrollViewProps {
  additionalScrollHeight?: number
  children: React.ReactNode
}

const KeyboardScrollView: React.FC<Props> = ({
  children,
  additionalScrollHeight,
  contentContainerStyle,
  ...props
}) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollPositionRef = useRef<number>(0)
  const scrollContentSizeRef = useRef<number>(0)
  const scrollViewSizeRef = useRef<number>(0)

  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false)
  const [additionalPadding, setAdditionalPadding] = useState<number>(0)

  const scrollToPosition = useCallback(
    (toPosition: number, animated: boolean) => {
      scrollViewRef.current?.scrollTo({ y: toPosition, animated })
      scrollPositionRef.current = toPosition
    },
    []
  )

  const additionalScroll = useMemo(
    () => additionalScrollHeight ?? 0,
    [additionalScrollHeight]
  )
  const androidStatusBarOffset = useMemo(() => StatusBar.currentHeight ?? 0, [])

  useEffect(() => {
    const didShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (frames) => {
        const keyboardY = frames.endCoordinates.screenY
        const keyboardHeight = frames.endCoordinates.height
        setAdditionalPadding(Math.ceil(keyboardHeight))

        setTimeout(() => {
          setIsKeyboardVisible(true)
        }, 100)

        const currentlyFocusedInput = TextInput.State.currentlyFocusedInput()
        const currentScrollY = scrollPositionRef.current

        currentlyFocusedInput?.measureInWindow(
          (_x: number, y: number, _width: number, height: number) => {
            const endOfInputY = y + height + androidStatusBarOffset
            const deltaToScroll = endOfInputY - keyboardY

            if (deltaToScroll < 0) {
              return
            }

            const scrollPositionTarget =
              currentScrollY + deltaToScroll + additionalScroll
            scrollToPosition(scrollPositionTarget, true)
          }
        )
      }
    )

    const didHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setAdditionalPadding(0)
      setIsKeyboardVisible(false)
    })

    const willHideListener = Keyboard.addListener(
      'keyboardWillHide',
      (frames) => {
        const keyboardHeight = frames.endCoordinates.height
        const currentScrollY = scrollPositionRef.current

        if (currentScrollY <= 0) {
          return
        }

        const scrollPositionTarget = currentScrollY - keyboardHeight
        scrollToPosition(scrollPositionTarget, true)
      }
    )

    return () => {
      didShowListener.remove()
      didHideListener.remove()
      willHideListener.remove()
    }
  }, [additionalScroll, androidStatusBarOffset, scrollToPosition])

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={contentContainerStyle}
      contentInset={{ bottom: additionalPadding }}
      keyboardShouldPersistTaps="never"
      onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollPositionRef.current = event.nativeEvent.contentOffset.y
      }}
      onScrollEndDrag={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollPositionRef.current = event.nativeEvent.contentOffset.y
      }}
      onLayout={(event: LayoutChangeEvent) => {
        scrollViewSizeRef.current = event.nativeEvent.layout.height
      }}
      onContentSizeChange={(_width: number, height: number) => {
        const currentContentHeight = scrollContentSizeRef.current
        const contentSizeDelta = height - currentContentHeight
        scrollContentSizeRef.current = height
        if (!isKeyboardVisible) {
          return
        }
        const currentScrollY = scrollPositionRef.current
        const scrollPositionTarget = currentScrollY + contentSizeDelta
        scrollToPosition(scrollPositionTarget, true)
      }}
      {...props}
    >
      <View
        style={{ paddingBottom: Platform.OS === 'ios' ? 0 : additionalPadding }}
      >
        {children}
      </View>
    </ScrollView>
  )
}

export default KeyboardScrollView
