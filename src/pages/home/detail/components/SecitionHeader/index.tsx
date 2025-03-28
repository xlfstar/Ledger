import React, { memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { ms, ScaledSheet } from 'react-native-size-matters'
import { BounceButton } from '@/components'

export type HideItemProps = {
  onPress?: () => void
}

const HideItem = ({ onPress }: HideItemProps) => {
  return (
    <View style={styles.container}>
      <BounceButton style={styles.hideItem} onPress={onPress}>
        <Text style={styles.hideItemText}>删除</Text>
        <Icon name="trash-2" type="feather" size={ms(12)} color="#fff" />
      </BounceButton>
    </View>
  )
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  hideItem: {
    width: ms(75),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F56C6C',
  },
  hideItemText: {
    color: '#fff',
    fontSize: ms(10),
    marginBottom: ms(5),
  },
})
export default memo(HideItem)
