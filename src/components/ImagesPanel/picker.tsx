import React, { useEffect, useRef, useState, memo } from 'react'
import { View, Text, FlatList } from 'react-native'
import { BounceButton, Modal, Image as CusIamge } from '@/components'
import { ImageUrl } from '@/utils'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { screen, StatusBarHeight } from '@/contents'
import { Icon } from 'react-native-elements'
import Item from './Item'
import BottomItem from './BottomItem'
import styles from './styles'
const maxWidth = screen.width
type Props = {
  list: string[]
  onClose: () => void
  activeIndex: number
  allowEdit: boolean
  add?: () => void
  destroy?: (index: number) => void
}
const ImagesPanel = ({
  list,
  onClose,
  activeIndex,
  allowEdit = false,
  add = () => {},
  destroy = () => {},
}: Props): JSX.Element => {
  const flatListRef = useRef<FlatList<string>>(null)
  const flatListBottomRef = useRef<FlatList<string>>(null)
  const [visible, setVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    flatListBottomRef.current?.scrollToIndex({
      index: currentIndex,
    })
  }, [currentIndex])

  const animatedImageItem = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
    })
    flatListBottomRef.current?.scrollToIndex({
      index,
    })
  }
  useEffect(() => {
    if (!visible && onClose) {
      onClose()
    }
  }, [visible])
  return (
    <Modal
      isVisible={visible}
      animationInTiming={300}
      style={{ margin: 0 }}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      backdropOpacity={0}
    >
      <View style={styles.modalContent}>
        <View style={[styles.contentTop, { paddingTop: StatusBarHeight + 22 }]}>
          <BounceButton
            onPress={() => setVisible(false)}
            style={styles.backButton}
          >
            <Icon
              type="feather"
              name="chevron-left"
              color={'#eee'}
              size={ms(30)}
            />
          </BounceButton>
        </View>
        <FlatList
          ref={flatListRef}
          data={list}
          renderItem={({ item, index }) => <Item item={item} index={index} />}
          keyExtractor={(_, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true} // 启用分页滑动
          snapToAlignment="center" // 设置对齐方式为居中
          snapToInterval={maxWidth} // 设置每次滑动的距离为屏幕宽度
          decelerationRate="fast" // 设置减速率为快速，使滑动更加明确
          getItemLayout={(data, index) => ({
            length: maxWidth,
            offset: maxWidth * index,
            index,
          })}
          onScroll={(event) => {
            // 计算当前显示的图片索引
            const offsetX = event.nativeEvent.contentOffset.x
            const currentIndex = Math.round(offsetX / maxWidth)
            setCurrentIndex(currentIndex)
            flatListBottomRef.current?.scrollToIndex({
              index: currentIndex,
            })
          }}
          // 设置滚动监听的频率
          scrollEventThrottle={16}
          initialScrollIndex={activeIndex}
        />
        <View
          style={[
            styles.contentBottom,
            {
              height: ms(130),
              paddingBottom: ms(30),
            },
          ]}
        >
          <FlatList
            ref={flatListBottomRef}
            data={list}
            renderItem={({ item, index }) => (
              <BottomItem
                item={item}
                index={index}
                current={currentIndex}
                onPress={(index) => animatedImageItem(index)}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: ms(60),
              offset: ms(60) * index,
              index,
            })}
            initialScrollIndex={activeIndex}
          />
          {allowEdit && (
            <View style={styles.btnGroup}>
              <BounceButton
                style={styles.optionBtn}
                onPress={() => destroy(currentIndex)}
              >
                <Text style={styles.optionBtnText}>删除</Text>
              </BounceButton>
              <BounceButton style={styles.optionBtn} onPress={add}>
                <Text style={styles.optionBtnText}>添加</Text>
              </BounceButton>
            </View>
          )}
        </View>
      </View>
    </Modal>
  )
}

export default memo(ImagesPanel)
