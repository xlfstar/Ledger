import React from 'react'
import { View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native'
import styles from './styles'
import { transformMoney } from '@/utils'
export type MoneyTextProps = {
  number: number
  containerStyle?: StyleProp<ViewStyle>
  integerStyle?: StyleProp<TextStyle>
  decimalStyle?: StyleProp<TextStyle> // StyleProp<TextStyle> is a type that is a style object
}
const MoneyText = ({
  number = 0,
  integerStyle = {},
  decimalStyle = {},
  containerStyle = {},
}: MoneyTextProps): JSX.Element => {
  const money = transformMoney(number)

  const [integer, decimal] = `${money}`.split('.')
  return (
    <View style={[styles.money, containerStyle]}>
      <Text style={[styles.integer, integerStyle]}>
        {integer}.<Text style={[styles.decimal, decimalStyle]}>{decimal}</Text>
      </Text>
    </View>
  )
}
export default MoneyText
