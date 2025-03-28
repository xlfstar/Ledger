import React from 'react'
import { View, Text } from 'react-native'
import { ms } from 'react-native-size-matters'
import configs from '@/configs'
import { Image, BounceButton } from '@/components'
import { Icon } from 'react-native-elements'
import { isEmpty, transformMoney } from '@/utils'
import styles from './styles'

const Item = ({
  account,
  label,
  placeholder,
  isOut,
  onPress,
}: {
  account: any
  label: string
  placeholder: string
  isOut: boolean
  onPress: (isOut: boolean) => void
}) => {
  const { amount, name, card_number, account: assetsAccount } = account || {}
  const { icon, parent } = assetsAccount || {}
  const { name: p_name } = parent || {}

  return (
    <View style={styles.itemBox}>
      <Text style={styles.itemLabel}>{label}</Text>
      <BounceButton
        style={styles.itemBtn}
        onPress={() => {
          onPress(isOut)
        }}
      >
        {isEmpty(account) ? (
          <Text style={styles.accountNamePlaceholder}>{placeholder}</Text>
        ) : (
          <View style={styles.itemInfo}>
            <View style={styles.itemInfoLeft}>
              <Image
                src={configs.BASE_URL + icon}
                style={{ width: ms(34), height: ms(34) }}
              />
              <View style={styles.itemInfoLeftContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.accountName}>
                    {name}
                    {card_number && `(${card_number})`}
                  </Text>
                  {p_name && (
                    <View style={styles.pNameView}>
                      <Text style={styles.pName}>{p_name}</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.accountAmount}>
                  余额：{transformMoney(amount)}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View>
          <Icon name="down" type="antdesign" size={ms(12)} color={'#ccc'} />
        </View>
      </BounceButton>
    </View>
  )
}
export default Item
