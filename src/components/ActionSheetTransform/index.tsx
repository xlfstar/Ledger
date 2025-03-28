import React, { useMemo, useState, useRef, useEffect } from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import { View, Text, FlatList } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { ms } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { BounceButton, DatePicker, Modal, ModalDate, Toast } from '@/components'
import { Icon } from 'react-native-elements'
import CustomeNumberKeyboard, {
  CustomeNumberKeyboardProps,
} from '../CustomeNumberKeyboard'
import dayjs from 'dayjs'
import TransformItem from './TransformItem'
import AssetItem from './AssetItem'
import styles from './styles'
import { BooleanProp } from 'react-native-svg'
import { isEmpty } from '@/utils'
import { assetTransfer, TransferRequest } from '@/api/assets'

type objItemProps = {
  value: any
  label: string | undefined
  placeholder: string | undefined
  isOut: boolean
}
type objProps = {
  out?: objItemProps
  in?: objItemProps
}
export type Props = {
  title?: string
  onSuccess: () => void
  onClose: () => void
  allowZero?: boolean
  placeholder?: string
  account?: any
  show?: BooleanProp
}

const ActionSheetTransform = ({
  title = '转账',
  onClose,
  onSuccess,
  allowZero = false,
  placeholder = '请输入金额',
  account,
  show = false,
}: // selectAccount,
Props) => {
  const { orginalAssetsList } = useSelector((state: RootState) => state.assets)
  const ref = useRef<ActionSheetRef>(null)
  const assetsData = useMemo(() => {
    return orginalAssetsList.filter((item: any) => item.id !== account?.id)
  }, [orginalAssetsList, account])
  const [selectedAccount, setSelectedAccount] = useState<any>(null)
  const [date, setDate] = useState(new Date())
  const insets = useSafeAreaInsets()
  const [value, setValue] = useState('')
  const [isOut, setIsOut] = useState<boolean>(true)
  const [showAssets, setShowAssets] = useState<boolean>(false)

  const [isVisible, setIsVisible] = useState(false)
  const onChangeDate = (date: Date) => {
    ModalDate.picker({
      mode: 'day',
      value: date,
    }).then((res) => {
      setDate(new Date(res))
    })
    // setIsVisible(true)
  }
  const handleOpen = () => {
    setValue('')
  }
  const opacity = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })
  useEffect(() => {
    // 创建一个定时器，每0.5秒执行一次
    const interval = setInterval(() => {
      opacity.value = opacity.value === 1 ? 0 : 1
    }, 500)

    // 组件卸载时清除定时器
    return () => clearInterval(interval)
  }, [])

  const onCompleted = async () => {
    if (isEmpty(selectedAccount)) {
      const message = isOut ? '请选择转入账户' : '请选择转出账户'
      Toast.showError(message)
      return
    }
    if (Number(value) === 0) return Toast.showError('请输入转账金额')
    const body: TransferRequest = {
      from_asset_id: isOut ? account?.id : selectedAccount?.id,
      to_asset_id: isOut ? selectedAccount?.id : account?.id,
      amount: Number(value) * 100,
      createdAt: new Date(date),
    }
    Toast.showLoading('正在转账...')
    const res = await assetTransfer(body)
    Toast.hide()
    onSuccess()
    console.log(res)
  }

  const transformObj: objProps = useMemo(() => {
    let res = {}
    if (isOut) {
      res = {
        out: {
          value: account,
          label: '转出账户',
          placeholder: '请选择转出账户',
          isOut: true,
        },
        in: {
          value: selectedAccount,
          label: '转入账户',
          placeholder: '请选择转入账户',
          isOut: false,
        },
      }
    } else {
      res = {
        out: {
          value: selectedAccount,
          label: '转出账户',
          placeholder: '请选择转出账户',
          isOut: false,
        },
        in: {
          value: account,
          label: '转入账户',
          placeholder: '请选择转入账户',
          isOut: true,
        },
      }
    }
    return res
  }, [isOut, account, selectedAccount])

  const changeAccount = (e: boolean) => {
    if (e) return
    setShowAssets(true)
  }

  const handleConfirmSelectedItem = (item: any) => {
    setSelectedAccount(item)
    setShowAssets(false)
  }

  const closeActionSheet = () => {
    if (showAssets || isVisible) {
      setShowAssets(false)
      setIsVisible(false)
    } else {
      onClose()
    }
  }
  useEffect(() => {
    if (show) {
      ref.current?.show()
    } else {
      ref.current?.hide()
    }
  }, [show])
  return (
    <>
      <ActionSheet
        ref={ref}
        safeAreaInsets={insets}
        containerStyle={{
          borderTopLeftRadius: ms(16),
          borderTopRightRadius: ms(16),
          overflow: 'hidden',
        }}
        zIndex={20}
        onOpen={handleOpen}
        onClose={closeActionSheet}
        onTouchBackdrop={closeActionSheet}
        closeOnTouchBackdrop={false}
        isModal={false}
      >
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
          <BounceButton style={styles.closeBtn} onPress={closeActionSheet}>
            <Icon name="close" type="ionicon" size={ms(15)} />
          </BounceButton>
        </View>
        <View style={[styles.form]}>
          <TransformItem
            account={transformObj?.out?.value}
            label={transformObj?.out?.label as string}
            placeholder={transformObj?.out?.placeholder as string}
            isOut={transformObj?.out?.isOut as boolean}
            onPress={changeAccount}
          />
          <View style={styles.transformLine}>
            <View style={styles.line}></View>
            <BounceButton
              style={styles.transformCircle}
              onPress={() => setIsOut(!isOut)}
            >
              <Icon name="swap" type="antdesign" size={ms(16)} color={'#000'} />
            </BounceButton>
            <View style={styles.line}></View>
          </View>
          <TransformItem
            account={transformObj?.in?.value}
            label={transformObj?.in?.label as string}
            placeholder={transformObj?.in?.placeholder as string}
            isOut={transformObj?.in?.isOut as boolean}
            onPress={changeAccount}
          />
        </View>
        <View style={styles.transformAmount}>
          <Text
            style={{
              fontSize: ms(16),
              marginVertical: ms(8),
              color: '#000',
              marginLeft: ms(16),
            }}
          >
            转账金额
          </Text>

          <View
            style={{
              flexDirection: 'row',
              height: ms(40),
              alignItems: 'center',
              marginLeft: ms(12),
            }}
          >
            <Text style={styles.accountAmountValue}>{value}</Text>
            <Animated.View
              style={[styles.flashingLine, animatedStyle]}
            ></Animated.View>
            {!value && (
              <Text style={styles.accountNamePlaceholder}>请输入金额</Text>
            )}
          </View>
        </View>

        <CustomeNumberKeyboard
          onChange={setValue}
          isCalendar
          onChangeDate={onChangeDate}
          onCompleted={onCompleted}
          date={date}
        />
        {/* <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
          onBackButtonPress={() => setIsVisible(false)}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              height: ms(300),
              backgroundColor: '#fff',
              borderTopLeftRadius: ms(16),
              borderTopRightRadius: ms(16),
            }}
          >
            <DatePicker
              mode="day"
              value={date}
              onPickerCancel={() => setIsVisible(false)}
              onPickerConfirm={(date) => {
                setDate(dayjs(date).toDate())
                setIsVisible(false)
              }}
            />
          </View>
        </Modal> */}
        <Modal
          isVisible={showAssets}
          onBackdropPress={() => setShowAssets(false)}
          onBackButtonPress={() => setShowAssets(false)}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              height: ms(400),
              backgroundColor: '#fff',
              borderTopLeftRadius: ms(16),
              borderTopRightRadius: ms(16),
              overflow: 'hidden',
            }}
          >
            <View style={styles.contentHeader}>
              <Text style={styles.contentTitle}>选择账户</Text>
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={assetsData}
              renderItem={({ item, index }) => (
                <AssetItem
                  item={item}
                  onPress={() => handleConfirmSelectedItem(item)}
                  index={index}
                  activeId={selectedAccount?.id}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
            />
          </View>
        </Modal>
      </ActionSheet>
    </>
  )
}

export default ActionSheetTransform
