import React, {
  forwardRef,
  ForwardedRef,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import { View, Text, FlatList, Image as RNImg, TextInput } from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import configs from '@/configs'
import { backgroundColor, lineColor, themeGreenColor } from '@/contents/theme'
import { Image, BounceButton } from '@/components'
import { Icon } from 'react-native-elements'
import CustomeNumberKeyboard, {
  CustomeNumberKeyboardProps,
} from '../CustomeNumberKeyboard'

export type Props = {
  title?: string
  onConfirm: (value: number) => void
  onClose: () => void
  allowZero?: boolean
  placeholder?: string
}

const ActionSheetAmount = (
  {
    title = '',
    onClose,
    onConfirm,
    allowZero = false,
    placeholder = '请输入预算金额',
  }: Props,
  ref: ForwardedRef<ActionSheetRef>
) => {
  const insets = useSafeAreaInsets()
  const [value, setValue] = useState('')
  const isLock = useMemo(() => {
    if (allowZero) {
      return !value
    } else {
      return !value || !Number(value)
    }
  }, [value])
  const amountRef = useRef<TextInput>(null)

  const handleOpen = () => {
    setValue('')
    setTimeout(() => {
      amountRef.current?.focus()
    }, 100)
  }
  return (
    <ActionSheet
      ref={ref}
      safeAreaInsets={insets}
      containerStyle={{
        borderTopLeftRadius: ms(16),
        borderTopRightRadius: ms(16),
        overflow: 'hidden',
      }}
      onOpen={handleOpen}
      onClose={onClose}
    >
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        <BounceButton style={styles.closeBtn} onPress={onClose}>
          <Icon name="close" type="Ionicons" size={ms(15)} />
        </BounceButton>
      </View>
      <View style={styles.form}>
        <TextInput
          showSoftInputOnFocus={false}
          caretHidden={false}
          style={styles.valueInput}
          placeholder={placeholder}
          value={value}
          autoFocus
          ref={amountRef}
        />
        {isLock ? (
          <View style={styles.confirmBtnDisabled}>
            <Text style={styles.confirmBtnDisabledText}>确定</Text>
          </View>
        ) : (
          <BounceButton
            style={styles.confirmBtn}
            onPress={() => onConfirm(Number(value) * 100)}
          >
            <Text style={styles.confirmBtnText}>确定</Text>
          </BounceButton>
        )}
      </View>
      <CustomeNumberKeyboard onChange={setValue} />
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
  titleBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: ms(56),
  },
  closeBtn: {
    zIndex: 1,
    width: ms(20),
    height: ms(20),
    backgroundColor: lineColor,
    borderRadius: ms(15),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: ms(16),
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: ms(16),
  },
  form: {
    // alignItems:'center',
  },
  valueInput: {
    margin: ms(16),
    backgroundColor: 'rgba(0,0,0,0.045)',
    fontSize: ms(15),
    paddingHorizontal: ms(10),
    borderRadius: ms(4),
  },
  confirmBtn: {
    width: ms(200),
    marginVertical: ms(30),
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeGreenColor,
    height: ms(44),
    borderRadius: ms(22),
  },
  confirmBtnText: {
    fontSize: ms(16),
    fontWeight: 300,
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
  },
  confirmBtnDisabled: {
    width: ms(200),
    marginVertical: ms(30),
    backgroundColor: lineColor,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(44),
    borderRadius: ms(22),
  },
  confirmBtnDisabledText: {
    fontSize: ms(16),
    fontWeight: 300,
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
})

export default forwardRef(ActionSheetAmount)
