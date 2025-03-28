import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDecay,
  runOnJS,
} from 'react-native-reanimated'
import { PageView, Image } from '@/components'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { isEmpty } from '@/utils'

interface RenderItemInfo<T> {
  item: T
  index: number
  key: string
}

interface Props<T> {
  data: T[]
  onRefresh?: () => void
  onLoadMore?: () => void
  ListEmptyComponent?: React.ReactElement | (() => React.ReactElement)
  renderItem: (info: RenderItemInfo<T>) => React.ReactElement
  keyExtractor?: (item: T, index: number) => string
  contentContainerStyle?: ViewStyle
}

function SampleFlatList<T>({
  data,
  onRefresh = () => {},
  onLoadMore = () => {},
  ListEmptyComponent,
  renderItem,
  keyExtractor,
  contentContainerStyle = {},
}: Props<T>): React.ReactElement {
  const [pullRefreshText, setPullRefreshText] = useState('下拉查看下月数据')
  const [pullDownText, setPullDownText] = useState('上拉查看上月数据')
  const [boxHeight, setBoxHeight] = useState(0)
  const [listHeight, setListHeight] = useState(0)

  const clampFirst = useMemo(() => {
    return boxHeight - listHeight
  }, [listHeight, boxHeight])

  const scrollY = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      if (scrollY.value > 0 || scrollY.value < clampFirst) {
        scrollY.value += e.changeY / 4
      } else {
        scrollY.value += e.changeY
      }

      if (scrollY.value > 50) {
        runOnJS(setPullRefreshText)('松开查看下月数据')
      } else {
        runOnJS(setPullRefreshText)('下拉查看下月数据')
      }

      if (scrollY.value < clampFirst - 50) {
        runOnJS(setPullDownText)('松开查看上月数据')
      } else {
        runOnJS(setPullDownText)('上拉查看上月数据')
      }
    })
    .onEnd((e) => {
      if (scrollY.value > 50) {
        runOnJS(onRefresh)()
      }
      if (scrollY.value < clampFirst - 50) {
        runOnJS(onLoadMore)()
      }

      scrollY.value = withDecay({
        velocity: e.velocityY,
        clamp: [clampFirst, 0],
      })

      if (scrollY.value < clampFirst) {
        scrollY.value = clampFirst
      }
      if (scrollY.value > 0) {
        scrollY.value = 0
      }
      if (scrollY.value < clampFirst) {
        runOnJS(setPullDownText)('上拉查看上月数据')
      }
    })

  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value }],
  }))

  const is_empty = useMemo(() => isEmpty(data), [data])

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

  return (
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
            <Text style={styles.hintText}>{pullRefreshText}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.hintText}>{pullDownText}</Text>
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
              {data.map((item, index) =>
                renderItem({
                  item,
                  index,
                  key: keyExtractor?.(item, index) ?? index.toString(),
                })
              )}
            </View>
          )}
        </Animated.View>
      </View>
    </GestureDetector>
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
  },
  header: {
    width: '100%',
    height: 100,
    position: 'absolute',
    top: -100,
    left: 0,
    paddingBottom: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: -100,
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

export default SampleFlatList
