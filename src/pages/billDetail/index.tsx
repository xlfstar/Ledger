import React, { useState, useEffect, useRef, useMemo } from 'react'
import styles from './styles'
import { View, Text, TextInput } from 'react-native'
import {
  Image,
  BounceButton,
  PageView,
  ModalConfirm,
  Toast,
  ImagesPanel,
} from '@/components'
import {
  backgroundColor,
  themeGreenColor,
  primaryTextColor,
  lineColor,
} from '@/contents/theme'
import configs from '@/configs'
import { ms } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import { transformMoney, getLocalWeekday, isEmpty, ImageUrl } from '@/utils'
import dayjs from '@/utils/dayjs'
import { getBillById, deleteBill } from '@/api/bill'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { fetchAllBillList } from '@/store/slices/billSlice'

const BillDetailPage = ({ navigation, route }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const insets = useSafeAreaInsets()
  const [info, setInfo] = useState<any>(null)
  const { id } = route.params || {}

  useEffect(() => {
    getBillById(id).then((res) => {
      setInfo(res)
    })
  }, [id])

  const {
    classify,
    type: initType,
    amount: initAmount,
    date: initDate,
    user_id,
    remark,
    images,
    asset,
  } = useMemo(() => info || {}, [info])

  const { color_icon, label } = classify || {}
  const { name: assets_name, account, card_number } = asset || {}
  const { parent } = account || {}
  const { name: p_name } = parent || {}

  const [type, setType] = useState(initType)
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(initDate)
  const [imageList, setImageList] = useState(images && JSON.parse(images))
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    setAmount(initAmount)
  }, [initAmount])
  useEffect(() => {
    setImageList(images && JSON.parse(images))
  }, [images])

  const confirmDeleteItem = async () => {
    Toast.showLoading('删除中...')
    await deleteBill(id)
    Toast.hide()
    dispatch(fetchAllBillList({ user_id }))
    navigation.goBack()
  }
  const handleDelete = async () => {
    ModalConfirm.show({
      title: '确认删除该数据吗？',
      message: '',
      options: [
        {
          text: '取消',
          type: 'middle',
          // textStyle: { color: '#ccc' },
        },
        {
          text: '确定',
          type: 'confirm',
          // textStyle: { color: '#387bff' },
          onPress: () => confirmDeleteItem(),
        },
      ],
    })
  }

  const HeaderComponent = ({}) => {
    return (
      <View style={[styles.header, { paddingTop: insets.top + ms(22) }]}>
        <BounceButton
          style={styles.headerLeft}
          onPress={() => navigation.goBack()}
        >
          <Icon
            type="feather"
            name="chevron-left"
            color={primaryTextColor}
            size={ms(30)}
          />
        </BounceButton>
        <View style={styles.headerCenter}>
          <View style={styles.headerIconCircle}>
            <Image
              src={configs.BASE_URL + color_icon}
              style={styles.headerIcon}
            />
          </View>
          <Text>{label}</Text>
        </View>
        <BounceButton style={styles.headerRight} onPress={handleDelete}>
          <Icon
            type="feather"
            name="trash-2"
            color={primaryTextColor}
            size={ms(16)}
          />
        </BounceButton>
      </View>
    )
  }
  const handleOpenImage = (index: number) => {
    setCurrentIndex(index)
    ImagesPanel.picker({
      list: imageList,
      activeIndex: index,
    })
  }
  return (
    <PageView headerHide>
      <HeaderComponent />
      <View style={styles.formContainer}>
        <View style={styles.formItem}>
          <Text style={styles.formLabel}>类型</Text>
          <Text style={styles.formValue}>{type == 1 ? '支出' : '收入'}</Text>
        </View>
        <View style={styles.formItem}>
          <Text style={styles.formLabel}>金额</Text>
          <Text style={styles.formValue}>{transformMoney(amount)}</Text>
        </View>
        <View style={styles.formItem}>
          <Text style={styles.formLabel}>账户</Text>
          {isEmpty(asset) ? (
            <Text style={styles.formValue}>无关联</Text>
          ) : (
            <View
              style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
            >
              <Text style={styles.formValue1}>
                {assets_name}
                {card_number && `(${card_number})`}
              </Text>
              {p_name && (
                <View
                  style={{
                    backgroundColor: lineColor,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    marginLeft: 5,
                    justifyContent: 'center',
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{ color: '#000', fontSize: 10, fontWeight: 500 }}
                  >
                    {p_name}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={[styles.formItem]}>
          <Text style={styles.formLabel}>日期</Text>
          <Text style={styles.formValue}>
            {dayjs(date).format('YYYY年MM月DD日')} {getLocalWeekday(date)}
          </Text>
        </View>
        <View
          style={[styles.formItem, isEmpty(images) && { borderBottomWidth: 0 }]}
        >
          <Text style={styles.formLabel}>备注</Text>
          <Text style={styles.formValue}>{remark || '...'}</Text>
        </View>
        {!isEmpty(images) && (
          <View style={styles.imagesBox}>
            <Text style={styles.formLabel}>图片</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: ms(-4),
              }}
            >
              {imageList?.map((item: string, index: number) => (
                <BounceButton
                  style={{
                    paddingHorizontal: ms(4),
                    paddingBottom: ms(8),
                  }}
                  onPress={() => handleOpenImage(index)}
                  key={index}
                >
                  <Image
                    src={ImageUrl(item)}
                    style={{ height: ms(90), width: ms(90) }}
                  />
                </BounceButton>
              ))}
            </View>
          </View>
        )}
      </View>
    </PageView>
  )
}
export default BillDetailPage
