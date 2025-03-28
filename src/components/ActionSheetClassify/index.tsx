import React, { forwardRef, ForwardedRef, useMemo, useState } from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import { View, Text, FlatList, Image as RNImg } from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import configs from '@/configs'
import { backgroundColor, lineColor, themeGreenColor } from '@/contents/theme'
import { Image, BounceButton } from '@/components'
// import { Icon } from 'react-native-elements'
import { Icon } from 'react-native-elements'

export interface ActionSheetClassifyProps {
  type: number
  activeId?: number
  onConfirm: (value: any) => void
}
const Item = ({ item, onPress, index, activeId }: any) => {
  const isEven = index % 2 === 0

  const handlePress = () => {
    onPress()
  }
  return (
    <BounceButton
      style={[styles.modalItem, !isEven && styles.evenItem]}
      key={item.id}
      onPress={handlePress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <View style={styles.iconCircle}>
          <Image
            src={`${configs.BASE_URL}${item.color_icon}`}
            style={{ width: ms(20), height: ms(20) }}
            cachePolicy="memory-disk"
          />
        </View>

        <Text style={styles.modalText}>{item.label}</Text>
      </View>
      {activeId === item.id && (
        <Icon
          type="feather"
          name="check"
          size={ms(20)}
          color={themeGreenColor}
        />
      )}
    </BounceButton>
  )
}
const ActionSheetClassify = (
  { type, onConfirm, activeId }: ActionSheetClassifyProps,
  ref: ForwardedRef<ActionSheetRef>
) => {
  const insets = useSafeAreaInsets()
  const classifyList = useSelector(
    (state: RootState) => state.classify.classifyList
  )
  const list = useMemo(() => {
    return classifyList.filter((item) => item.type == type)
  }, [classifyList])

  return (
    <ActionSheet
      ref={ref}
      safeAreaInsets={insets}
      containerStyle={{
        borderTopLeftRadius: ms(16),
        borderTopRightRadius: ms(16),
      }}
    >
      <View style={styles.modalContent}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>选择分类</Text>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={list}
          renderItem={({ item, index }) => (
            <Item
              item={item}
              onPress={() => onConfirm(item)}
              index={index}
              activeId={activeId}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          windowSize={2}
        />
      </View>
    </ActionSheet>
  )
}

const styles = ScaledSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: '16@ms',
    borderTopRightRadius: '16@ms',
    overflow: 'hidden',
    height: '500@ms',
  },
  modalItem: {
    height: '48@ms',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '16@ms',
    // borderBottomColor: lineColor,
    // borderBottomWidth: '0.5@ms',
  },
  evenItem: {
    backgroundColor: '#fafbfc',
  },
  modalText: {
    marginLeft: '10@ms',
  },
  contentHeader: {
    height: '50@ms',
    paddingHorizontal: '16@ms',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
  contentTitle: {},
  iconCircle: {
    width: '30@ms',
    height: '30@ms',
    borderRadius: '15@ms',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default forwardRef(ActionSheetClassify)
