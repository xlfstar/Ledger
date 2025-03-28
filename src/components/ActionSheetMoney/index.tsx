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
import { Icon } from 'react-native-elements'
import CustomeNumberKeyboard,{CustomeNumberKeyboardProps} from '../CustomeNumberKeyboard'



const ActionSheetClassify = (
  { onChange}:CustomeNumberKeyboardProps,
  ref: ForwardedRef<ActionSheetRef>
) => {
  const insets = useSafeAreaInsets()
 
  return (
    <ActionSheet
      ref={ref}
      safeAreaInsets={insets}
      containerStyle={{
        borderTopLeftRadius: ms(16),
        borderTopRightRadius: ms(16),
        overflow:'hidden'
      }}
    >
      <CustomeNumberKeyboard onChange={onChange} />
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
