import React from 'react'
import { View, Text } from 'react-native'
import { ms } from 'react-native-size-matters'
import configs from '@/configs'
import { themeGreenColor } from '@/contents/theme'
import { Image, BounceButton } from '@/components'
import { Icon } from 'react-native-elements'
import { transformMoney } from '@/utils'
import styles from './styles'

const AssetItem = ({ item, onPress, index, activeId }: any) => {
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
export default AssetItem
