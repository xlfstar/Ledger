import { transformMoney } from '@/utils'
import React, { useState, useEffect, forwardRef, useRef, useMemo } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native'
import { ms, ScaledSheet } from 'react-native-size-matters'

export interface MoneyInputProps {
  style?: ViewStyle
  value: string | undefined
  onChangeText: (value: string | undefined) => void
}
const MoneyInput = forwardRef((props: MoneyInputProps, ref): JSX.Element => {
  const { style, value, onChangeText, ...restProps } = props
  const height = style?.height || ms(30)
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef(null)
  const valueText = useMemo(() => {
    return transformMoney(Number(inputValue) * 100)
  }, [inputValue])
  useEffect(() => {
    onChangeText(inputValue)
  }, [inputValue])
  return (
    <View style={[styles.contaier, style]}>
      <Text style={[{ lineHeight: ms(height) }, styles.textValue]}>
        {valueText}
      </Text>
      <TextInput
        ref={inputRef}
        value={inputValue}
        keyboardType="numeric"
        style={styles.textInput}
        placeholderTextColor={'transparent'}
        cursorColor={'transparent'}
        onChangeText={(text) => {
          // 只允许数字和小数点
          const regex = /^(\d+(\.\d{0,2})?)?$/

          // 如果输入符合正则，且小数点后小于等于两位，更新输入
          if (regex.test(text)) {
            // 限制小数点后最多两位
            setInputValue(text)
          }
        }}
        {...restProps}
      />
    </View>
  )
})

const styles = ScaledSheet.create({
  contaier: {
    justifyContent: 'center',
  },
  textValue: {
    flex: 1,
  },
  textInput: {
    position: 'absolute',
    fontWeight: 300,
    color: 'transparent',
    backgroundColor: 'transparent',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
})
export default MoneyInput
