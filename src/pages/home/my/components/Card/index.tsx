import styles from './styles'
import React from 'react'
import { View, Text, TouchableHighlight, Pressable } from 'react-native'
import { BounceButton, Image } from '@/components'
import {Icon} from 'react-native-elements'

const Item = ({ item, index, onPress }:any) => {
  const { icon, label } = item || {}
  const isFirst = index === 0
  return (
    <View
     
      style={styles.item}
      
    >
      <Image src={icon} style={styles.itemIcon} />
      <BounceButton
        style={[isFirst ? styles.itemContentFirst : styles.itemContent]}
        onPress={()=>onPress(index)}
      >
        <Text style={styles.itemLabel}>{label}</Text>
        <Icon name="right" size={14} color="#ddd" type='antdesign' />
      </BounceButton>
    </View>
  )
}
const Card = ({ list, onPress }:any) => {
  return (
    <View style={styles.card}>
      {list.map((item:any, index:any) => (
        <Item key={index} item={item} index={index} onPress={onPress} />
      ))}
    </View>
  )
}
export default Card
