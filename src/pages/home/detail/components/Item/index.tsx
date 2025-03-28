import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { ms, ScaledSheet } from 'react-native-size-matters'
import { BounceButton, SwipeableView } from '@/components'
import { Image } from '@/components'
import configs from '@/configs'
import { transformMoney } from '@/utils'
import { lineColor, primaryTextColor } from '@/contents/theme'

export type ItemProps = {
  onPress?: () => void
  item: any
  index: number
  onDelete: (item: any) => void
}

const Item = ({ onPress, item, index, onDelete }: ItemProps) => {
  const { classify, remark, amount, type, id } = item || {}
  const { color_icon, label } = classify || {}
  return (
    <SwipeableView
      id={id}
      rightButtons={[
        <BounceButton
          key="delete"
          style={styles.rightAction}
          onPress={onDelete}
        >
          <Text style={styles.rightActionText}>删除</Text>
        </BounceButton>,
      ]}
      threshold={-100}
    >
      <BounceButton onPress={onPress} style={styles.frontItem}>
        <View style={styles.iconOutView}>
          <Image src={configs.BASE_URL + color_icon} style={styles.icon} />
        </View>
        <View style={[styles.itemRight,index===0&&{borderTopColor:'transparent'}]}>
          <Text style={styles.itemLabel} numberOfLines={1} ellipsizeMode="tail">
            {label}
          </Text>
          <Text style={styles.itemBalance}>
            {Number(type) === 1 && '-'}
            {transformMoney(amount)}
          </Text>
        </View>
      </BounceButton>
    </SwipeableView>
  )
}

export default Item

const styles = ScaledSheet.create({
  rightAction: {
    backgroundColor: '#F56C6C',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  rightActionText: {
    color: '#fff',
  },
  frontItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft:ms(16)
    
  },
  iconOutView: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(16),
    backgroundColor: lineColor,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  icon: {
    width: ms(22),
    height: ms(22),
  },
  itemLabel: {
    flex: 1,
    fontSize: ms(13),
    marginLeft: ms(12),
    color: primaryTextColor,
    fontWeight: 300,
  },
  itemBalance: {
    fontSize: ms(13),
    color: '#333',
    marginLeft: ms(8),
    fontWeight: 300,
  },
  itemRight: {
    flex: 1,
    flexDirection: 'row',
    borderTopColor:lineColor,
    borderTopWidth:0.5,
    paddingVertical: ms(16),
    paddingRight:ms(16)
  },
})
