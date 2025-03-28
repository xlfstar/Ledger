import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDecay,
  runOnJS,
} from 'react-native-reanimated'
import { Image } from '@/components'
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { isEmpty } from '@/utils'

interface Section<T> {
  data: T[]
  [key: string]: any
}

interface RenderItemInfo<T> {
  item: T
  index: number
  // key: string
}

interface SectionHeaderInfo<T> {
  section: Section<T>
  index: number
}

interface Props<T> {
  data: Section<T>[]
  onRefresh?: () => void
  onLoadMore?: () => void
  ListEmptyComponent?: React.ReactElement | (() => React.ReactElement)
  ListSectionHeaderComponent?: (
    info: SectionHeaderInfo<T>
  ) => React.ReactElement
  renderItem: (info: RenderItemInfo<T>) => React.ReactElement
  keyExtractor?: (item: T, index: number) => string
  contentContainerStyle?: ViewStyle
}

function SampleSectionList<T>({
  data,
  onRefresh = () => {},
  onLoadMore = () => {},
  ListEmptyComponent,
  ListSectionHeaderComponent,
  renderItem,
  keyExtractor,
  contentContainerStyle = {},
}: Props<T>): React.ReactElement {
  const [pullDownText, setPullDownText] = useState('下拉查看下月数据')
  const [pullUpText, setPullUpText] = useState('上拉查看上月数据')
  const [boxHeight, setBoxHeight] = useState(0)
  const [listHeight, setListHeight] = useState(0)

  const clampFirst = useMemo(
    () => boxHeight - listHeight,
    [listHeight, boxHeight]
  )

  const scrollY = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .activeOffsetY([-60, 60])

    .onChange((e) => {
      'worklet'
      if (scrollY.value > 0 || scrollY.value < clampFirst) {
        scrollY.value += e.changeY / 4
      } else {
        scrollY.value += e.changeY
      }

      if (scrollY.value > 60) {
        runOnJS(setPullDownText)('松开查看下月数据')
      } else {
        runOnJS(setPullDownText)('下拉查看下月数据')
      }

      if (scrollY.value < clampFirst - 60) {
        runOnJS(setPullUpText)('松开查看上月数据')
      } else {
        runOnJS(setPullUpText)('上拉查看上月数据')
      }
    })
    .onEnd((e) => {
      'worklet'
      if (scrollY.value > 60) {
        runOnJS(onRefresh)()
        scrollY.value = 0
      }
      if (scrollY.value < clampFirst - 60) {
        // runOnJS(setPullUpText)('上拉查看上月数据')
        runOnJS(onLoadMore)()
        scrollY.value = 0
      }
      
      
      if (scrollY.value > 0 ) {
        scrollY.value = 0
      }else if(scrollY.value < clampFirst-10){
          scrollY.value = clampFirst
      }
      
      scrollY.value = withDecay({
        velocity: e.velocityY,
        clamp: [clampFirst, 0],
      })
    })

  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value }],
  }))

  const EmptyComponent = (): React.ReactElement => {
    if (ListEmptyComponent) {
      return typeof ListEmptyComponent === 'function'
        ? ListEmptyComponent()
        : ListEmptyComponent
    }
    return (
      <View style={[styles.emptyContainer, { height: boxHeight }]}>
        <Image
          src={require('@/assets/images/new_empty.png')}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyText}>暂无数据</Text>
      </View>
    )
  }

  const is_empty = useMemo(() => isEmpty(data), [data])

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <View
          style={styles.wrapper}
          onLayout={({ nativeEvent }) => {
            setBoxHeight(nativeEvent.layout.height)
          }}
        >
          <Animated.View
            style={[styles.container, boxStyle]}
            onLayout={({ nativeEvent }) => {
              setListHeight(nativeEvent.layout.height)
            }}
          >
            <View style={styles.header}>
              <Text style={styles.hintText}>{pullDownText}</Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.hintText}>{pullUpText}</Text>
            </View>
            {is_empty ? (
              <EmptyComponent />
            ) : (
              <View
                style={[
                  styles.content,
                  { minHeight: boxHeight },
                  contentContainerStyle,
                ]}
              >
                {data.map((section, sectionIndex) => (
                  <View key={sectionIndex}>
                    {ListSectionHeaderComponent &&
                      ListSectionHeaderComponent({
                        section,
                        index: sectionIndex,
                      })}
                    {section.data.map((item, itemIndex) => (
                      <View
                        key={
                          keyExtractor
                            ? keyExtractor(item, itemIndex)
                            : `${itemIndex}_view`
                        }
                      >
                        {renderItem({
                          item,
                          index: itemIndex,
                        })}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingBottom:10
  },
  header: {
    width: '100%',
    height: 120,
    position: 'absolute',
    top: -120,
    left: 0,
    paddingBottom: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: 120,
    position: 'absolute',
    bottom: -120,
    left: 0,
    paddingTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  hintText: {
    color: 'rgba(0,0,0,0.1)',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 60,
    height: 60,
  },
  emptyText: {
    color: 'rgba(0,0,0,0.1)',
    marginTop: 10,
  },
})

export default SampleSectionList
