import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'
import { PageView, BounceButton, Toast } from '@/components'
// import { addAssets } from '@/store/modules/assets'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from '@/utils'
import { createAssets, CreateRequset } from '@/api/assets'
import { AppDispatch, RootState } from '@/store'
import { fetchAssetsList } from '@/store/slices/assetsSlice'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

interface RouteParams {
  item?: {
    id?: number
    children?: any
    parent_id?: number
    name?: string
    type?: number
    iconId?: number
    typeName?: string
    color?: string
    [key: string]: any
  }
}

type AddComponentProps = {
  route: RouteProp<{ params: RouteParams }, 'params'>
  navigation: StackNavigationProp<any>
}

const AddComponent: React.FC<AddComponentProps> = ({ route, navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { item } = route.params || {}
  const { user } = useSelector((state: RootState) => state.auth)

  const { id, children, parent_id, name, type, iconId, typeName, color } =
    item || {}
  // {name: "银行卡", type: 2, label: "卡号", iconId: 1, typeName: "银行", …};

  const balanceLabel = useMemo(() => {
    let res = ''
    const condition = parent_id || id
    switch (condition) {
      case 1:
      case 2:
      case 4:
        res = '余额'
        break
      case 5:
      case 6:
        res = '欠款'
        break
      case 3:
      case 7:
      case 8:
        res = '金额'
        break
      default:
        res = '余额'
        break
    }
    return res
  }, [item])

  const label = useMemo(() => {
    let res = '名称'
    const condition = parent_id || id
    switch (condition) {
      case 2:
      case 5:
        res = '所在银行'
        break
      case 3:
        res = '资产名'
        break
      default:
        break
    }
    return res
  }, [item])

  const balanceRef = useRef<TextInput | null>(null)
  const [customeName, setCustomeName] = useState<string>('')
  const [remark, setRemark] = useState<string>('')
  const [cardId, setCardId] = useState<string>('')
  const [balance, setBalance] = useState<string>('')

  const handleSave = useMemo(
    () =>
      debounce(async () => {
        if (!user?.id) {
          Toast.showError('请先登录')
          return
        }
        if (!Number(balance)) {
          Toast.showError('请输入金额')
          return
        }

        const body: CreateRequset = {
          user_id: user.id,
          assets_account_id: id,
          name: customeName || name,
          remark,
          amount: Number(balance) * 100,
          card_number: cardId,
          type,
        }

        try {
          Toast.showLoading()
          await createAssets(body)
          Toast.hide()
          dispatch(fetchAssetsList())
          setTimeout(() => {
            navigation.replace('assetsManager')
          }, 1000)
        } catch (error) {}
      }, 500),
    [balance, user, id, customeName, name, remark, cardId, dispatch, navigation]
  )

  const headerObj = {
    backgroundColor: '#95d475',
    centerComponent: (
      <Text style={{ fontSize: 18, color: '#000' }}>{`添加${name}`}</Text>
    ),
  }

  useEffect(() => {
    setTimeout(() => {
      balanceRef?.current?.focus()
    }, 10)
  }, [])

  const renderName = (): JSX.Element => {
    if (id === 8) {
      return (
        <TextInput
          numberOfLines={1}
          textAlign="right"
          style={styles.formItemInput}
          value={customeName}
          placeholder="(选填)"
          onChangeText={setCustomeName}
        />
      )
    }
    return <Text style={styles.formItemTitle}>{name}</Text>
  }

  return (
    <PageView headerObj={headerObj} style={styles.pageView}>
      <View style={styles.formBox}>
        <View style={styles.formItem}>
          <Text style={styles.formItemLabel}>{label}</Text>
          {renderName()}
        </View>
        {[2, 5].includes(parent_id as number) && (
          <View style={styles.formItem}>
            <Text style={styles.formItemLabel}>卡号（后四位）</Text>
            <TextInput
              numberOfLines={1}
              placeholder={'(选填)'}
              textAlign="right"
              keyboardType="numeric"
              maxLength={4}
              style={styles.formItemInput}
              value={cardId}
              onChangeText={setCardId}
            />
          </View>
        )}
        <View style={styles.formItem}>
          <Text style={styles.formItemLabel}>备注</Text>
          <TextInput
            numberOfLines={1}
            placeholder={'(选填)'}
            textAlign="right"
            style={styles.formItemInput}
            value={remark}
            onChangeText={setRemark}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.formItemLabel}>{balanceLabel}</Text>
          <TextInput
            ref={balanceRef}
            numberOfLines={1}
            keyboardType="numeric"
            textAlign="right"
            style={styles.formItemInput}
            value={balance}
            onChangeText={(value) => {
              const numericRegex = /^\d*\.?\d{0,2}$/
              if (numericRegex.test(value)) {
                setBalance(value)
              }
            }}
          />
        </View>
      </View>
      <View style={styles.formSubmit}>
        <BounceButton style={styles.submitBtn} onPress={handleSave}>
          <Text style={styles.submitBtnText}>保存</Text>
        </BounceButton>
      </View>
    </PageView>
  )
}

export default AddComponent
