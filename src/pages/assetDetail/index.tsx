import React, { useEffect, useState } from 'react'
import {
  PageView,
  BounceButton,
  Image,
  ActionSheetAmount,
  Toast,
  ModalDate,
  ActionSheetTransform,
  ActionSheetDate,
  ActionSheetAssets,
  ModalConfirm,
} from '@/components'
import { View, Text, TextInput, SectionList } from 'react-native'
import styles from './styles'
import { backgroundColor, themeGreenColor } from '@/contents/theme'
import { Icon } from 'react-native-elements'
import { screen } from '@/contents'
import configs from '@/configs'
import { transformMoney } from '@/utils'
import dayjs from '@/utils/dayjs'
import { ScaledSheet, ms, vs } from 'react-native-size-matters'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import {
  updateAssets,
  UpdateRequset,
  getAssetById,
  deleteAssets,
} from '@/api/assets'
import { getRecords } from '@/api/assets-record'
import setting1Icon from '@/assets/images/setting1.png'
import settingIcon from '@/assets/images/setting.png'
import transformIcon from '@/assets/images/transform.png'
import deleteIcon from '@/assets/images/delete.png'
import emptyIcon from '@/assets/images/new_empty.png'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { runOnJS } from 'react-native-reanimated'
import { fetchAssetsList } from '@/store/slices/assetsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'

const AssetDetailPage = ({ navigation, route }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const insets = useSafeAreaInsets()
  const { id } = route.params || {}
  const [info, setInfo] = useState<any>()
  const { account } = info || {}
  const { icon, parent } = account || {}

  const { name: p_name } = parent || {}
  const [date, setDate] = useState(dayjs())
  const [transformDate, setTransformDate] = useState(new Date())
  const ActionSheetAmountRef = React.useRef<ActionSheetRef>(null)
  // const ActionSheetTransformRef = React.useRef<ActionSheetRef>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectAccount, setSelectAccount] = useState<any>(null)
  const ActionSheetAssetsRef = React.useRef<ActionSheetRef>(null)
  const [list, setList] = useState<any>([])
  const [emptyHeight, setEmptyHeight] = useState<number>(0)

  const [showTransformActionSheet, setShowTransformActionSheet] =
    useState<boolean>(false)
  const headerObj = {
    isBackHome: true,
    backgroundColor: themeGreenColor,
    title: '资产详情',
  }

  const handleConfirm = async (e: number) => {
    ActionSheetAmountRef.current?.hide()
    if (Number(info.amount) === e) return
    const data: UpdateRequset = {
      amount: e,
    }
    Toast.showLoading('更新中...')
    await updateAssets(id, data)
    await fetchInfo()
    await fetchList()
    Toast.hide()
  }
  const handleHide = () => {
    ActionSheetAmountRef.current?.hide()
  }

  const fetchList = async () => {
    const params = { assets_id: id, date: dayjs(date).format('YYYY-MM') }
    const res = await getRecords(params)
    setList(res)
  }

  const fetchInfo = async () => {
    const res = await getAssetById(id)
    setInfo(res)
  }

  useEffect(() => {
    fetchInfo()
  }, [])
  useEffect(() => {
    fetchList()
  }, [date])

  const handleChangeDate = () => {
    ModalDate.picker({
      value: date,
      mode: 'month',
      title: '选择月份',
    }).then((res) => {
      setDate(dayjs(res))
      // setDate(res)
    })
  }
  useEffect(() => {
    console.log({
      transformDate,
    })
  }, [transformDate])

  const test = () => {
    setIsVisible(true)
    // CustomDatePicker.show({ mode: 'day', value: new Date(), open: true })
    // CustomDatePicker.hide()
  }

  const handleChangeAccount = async (e: any) => {
    setSelectAccount(e)
    ActionSheetAssetsRef.current?.hide()
  }

  const handleTransferSuccess = () => {
    setShowTransformActionSheet(false)
    fetchInfo()
    fetchList()
    dispatch(fetchAssetsList())
  }

  const handleDelete = () => {
    ModalConfirm.show({
      title: '确认删除该资产？',
      message: '删除后，所有的资产变动记录也将一同被删除',
      options: [
        {
          text: '取消',
          type: 'middle',
        },
        {
          text: '确定',
          type: 'confirm',
          onPress: () => {
            Toast.showLoading('删除中...')
            deleteAssets(id).then(() => {
              Toast.hide()
              dispatch(fetchAssetsList())
              navigation.goBack()
            })
          },
        },
      ],
    })
  }
  return (
    <PageView headerObj={headerObj}>
      <View style={styles.topBackground}></View>
      <View style={styles.topCard}>
        <View style={styles.cardTop}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.infoName}>
                {info?.name}
                {info?.card_number && `(${info.card_number})`}
              </Text>
              {p_name && (
                <View style={styles.pName}>
                  <Text style={styles.pNameText}>{p_name}</Text>
                </View>
              )}
            </View>
            <View>
              <Text style={styles.infoRemark}>{info?.remark}</Text>
            </View>
          </View>
          <Image src={configs.BASE_URL + icon} style={styles.cardTopImg} />
        </View>
        <View style={styles.cardBottom}>
          <View>
            <Text style={styles.amountText}>
              {transformMoney(info?.amount)}
            </Text>
            <Text style={styles.infoRemark}>金额</Text>
          </View>
          <BounceButton
            style={styles.changeBtn}
            onPress={() => ActionSheetAmountRef.current?.show()}
          >
            <Text style={styles.cardBottomText}>调整金额</Text>
          </BounceButton>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.headTitle}>
          <Text style={styles.infoName}>收支明细</Text>
          <BounceButton style={styles.changeMonth} onPress={handleChangeDate}>
            <Text style={styles.headTitleText}>
              {dayjs(date).format('YYYY年MM月')}
            </Text>
            <Icon
              name={'triangle-down'}
              color={'#000'}
              size={ms(16)}
              type="entypo"
            />
          </BounceButton>
        </View>
      </View>
      <SectionList
        style={{ flex: 1 }}
        onLayout={({ nativeEvent }) => {
          setEmptyHeight(nativeEvent.layout.height)
        }}
        sections={list}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item, index, section }) => {
          const { amount, remark, type } = item
          const isFirst = index === 0
          const hint =
            type === '1'
              ? '手动调整'
              : type === '2'
              ? '转入'
              : type === '3'
              ? '转出'
              : type === '4'
              ? '支出'
              : '收入'
          return (
            <View style={[styles.item]}>
              <View style={styles.iconCircle}>
                <Image
                  style={{ width: ms(20), height: ms(20) }}
                  src={setting1Icon}
                />
              </View>
              <View style={[styles.itemRight, isFirst && styles.firstItem]}>
                <View>
                  <Text style={styles.itemLeftLabel}>{hint}</Text>
                  <Text style={styles.itemLeftText}>{remark}</Text>
                </View>
                <View>
                  <Text style={styles.itemRightText}>
                    {amount > 0 && `+`} {transformMoney(amount)}
                  </Text>
                </View>
              </View>
            </View>
          )
        }}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sctionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Animated.View style={[styles.emptyData, { height: emptyHeight }]}>
            <Image src={emptyIcon} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>暂无数据</Text>
          </Animated.View>
        )}
      />
      <View style={[styles.bottomBtnGroup, { paddingBottom: insets.bottom }]}>
        <BounceButton
          style={styles.bottomBtn}
          onPress={() => setShowTransformActionSheet(true)}
        >
          <Image
            style={{ width: ms(18), height: ms(18) }}
            src={transformIcon}
          />
          <Text style={styles.bottomBtnText}>转账</Text>
        </BounceButton>
        <View style={styles.btnLine}></View>
        <BounceButton style={[styles.bottomBtn]} onPress={() => test()}>
          <Image style={{ width: ms(18), height: ms(18) }} src={settingIcon} />
          <Text style={styles.bottomBtnText}>设置</Text>
        </BounceButton>
        <View style={styles.btnLine}></View>
        <BounceButton style={styles.bottomBtn} onPress={handleDelete}>
          <Image style={{ width: ms(18), height: ms(18) }} src={deleteIcon} />
          <Text style={styles.bottomBtnText}>删除资产</Text>
        </BounceButton>
      </View>
      <ActionSheetAmount
        ref={ActionSheetAmountRef}
        onConfirm={handleConfirm}
        onClose={handleHide}
        title={'调整当前余额'}
        allowZero={true}
        placeholder="请输入调整后的金额"
      />
      <ActionSheetTransform
        show={showTransformActionSheet}
        onSuccess={handleTransferSuccess}
        onClose={() => setShowTransformActionSheet(false)}
        account={info}
      />
      <ActionSheetAssets
        type={1}
        ref={ActionSheetAssetsRef}
        onConfirm={handleChangeAccount}
        activeId={selectAccount?.id}
      />

      {/* <CustomDatePicker
        value={transformDate}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onDateChange={(e) => console.log({ e })}
      /> */}
    </PageView>
  )
}

export default AssetDetailPage
