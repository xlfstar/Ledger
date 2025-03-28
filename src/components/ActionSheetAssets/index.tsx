import React, {
  forwardRef,
  ForwardedRef,
  useMemo,
  useState,
  useEffect,
} from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import { View, Text, FlatList, Image as RNImg } from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import configs from '@/configs'
import {
  backgroundColor,
  blockColor9,
  lineColor,
  themeGreenColor,
} from '@/contents/theme'
import { Image, BounceButton } from '@/components'
// import { Icon } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { getAssetsList } from '@/api/assets'
import { transformMoney } from '@/utils'

export interface ActionSheetClassifyProps {
  type?: number
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
        <Image
          src={`${configs.BASE_URL}${item.account.icon}`}
          style={{ width: ms(30), height: ms(30) }}
          cachePolicy="memory-disk"
        />
        <View style={styles.assetContent}>
          <View style={styles.assetLabel}>
            <Text style={styles.modalTextLabel}>
              {item.name}
              {item.card_number && `(${item.card_number})`}
            </Text>
            {item.remark && (
              <Text style={styles.modalTextRemark}>{item.remark}</Text>
            )}
          </View>
          <Text style={styles.balanceText}>
            余额：{transformMoney(item.amount)}
          </Text>
        </View>
      </View>
      <Icon
        type="feather"
        name="check"
        size={ms(20)}
        color={activeId === item.id ? themeGreenColor : 'transparent'}
      />
    </BounceButton>
  )
}
const ActionSheetAssets = (
  { type, onConfirm, activeId }: ActionSheetClassifyProps,
  ref: ForwardedRef<ActionSheetRef>
) => {
  const insets = useSafeAreaInsets()
  const [list, setList] = useState<any[]>([])
  const { user } = useSelector((state: RootState) => state.auth)
  const getAssetsData = (user_id: number) => {
    getAssetsList({ user_id }).then((res) => {
      const { assets } = res || {}
      setList(assets)
    })
  }

  useEffect(() => {
    const { id } = user || {}
    id && getAssetsData(id)
  }, [])

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
          <Text style={styles.contentTitle}>选择账户</Text>
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
    width: '34@ms',
    height: '34@ms',
    borderRadius: '8@ms',
    backgroundColor: '#f6f7f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetLabel: {
    marginLeft: '10@ms',
    justifyContent: 'center',
  },
  modalTextLabel: {
    fontWeight: 'bold',
    fontSize: '13@ms',
  },
  modalTextRemark: {
    color: '#9d9e9f',
    fontSize: '11@ms',
  },
  assetContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: '12@ms',
    marginRight: '16@ms',
    color: blockColor9,
  },
})

export default forwardRef(ActionSheetAssets)
