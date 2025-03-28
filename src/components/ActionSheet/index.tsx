import React, {  ForwardedRef, forwardRef } from 'react'
import { BounceButton, } from '@/components'
import { View, Text } from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { pageBg } from '@/contents/theme'
import ActionSheet, { ActionSheetRef} from 'react-native-actions-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface ItemProps {
  label: string
  value: string | number
  [key: string]: any
}
export interface Props {
  array: ItemProps[]
  onConfirm: (item: ItemProps) => void
  onCancel: () => void
  cancelText?: string
  [key:string]:any
}


const ActionSheetComponent = forwardRef<ActionSheetRef,Props>((
  props,
  ref: ForwardedRef<ActionSheetRef>
):JSX.Element => {
  const insets = useSafeAreaInsets()
  const { array, onConfirm, onCancel, cancelText = '取消',...restProps } = props
  return (
    <ActionSheet
      ref={ref}
      safeAreaInsets={insets}
      containerStyle={{ backgroundColor: 'transparent'}}
      elevation={0}
      {...restProps}
      
    >
      <View style={styles.container}>
        <View style={styles.btnGroup}>
        {array?.map((item:ItemProps, index:number) => {
          return (
            <BounceButton
              style={[styles.itemBtn,index!==0&&{borderTopWidth:0.5,borderTopColor:'#ccc'}]}
              onPress={() => onConfirm(item)}
              key={index}
            >
              <Text style={styles.btnText}>{item.label}</Text>
            </BounceButton>
          )
        })}
        </View>
        
        <BounceButton style={styles.itemBtnCancel} onPress={() => onCancel()}>
          <Text style={styles.cancelText}>{cancelText}</Text>
        </BounceButton>
      </View>
    </ActionSheet>
  )
})
const styles = ScaledSheet.create({
  container: {
    paddingHorizontal:ms(10)
  },
  btnGroup:{
    borderRadius:ms(10),
    backgroundColor:pageBg
  },
  itemBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(52),
    
  },
  btnText: {
    textAlign: 'center',
    color:'#409EFF',
    fontSize:ms(18)
  },
  itemBtnCancel: {
    marginTop: ms(8),
    backgroundColor:pageBg,
    height: ms(52),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:ms(20),
    borderRadius:ms(10)
  },
  cancelText: {
    textAlign: 'center',
    color:'#409EFF',
    fontSize:ms(18),
    fontWeight:600
  },
})

export default ActionSheetComponent
