import {
  PageView,
  BounceButton,
  Image,
  Toast,
  ModalCheck,
  ActionSheetAmount,
  CustomeActionSheet,
  Alert,
  Message,
  ModalConfirm,
} from '@/components'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import dayjs from 'dayjs'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { ms } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { isEmpty, getBillListByConditions } from '@/utils'
import emptyImg from '@/assets/images/new_empty.png'
import type { ItemObj } from '@/components/ModalCheck'
import {
  createBudget,
  getBudgetList,
  deleteBudget,
  updateBudget,
  BudgetItemProps,
  BudgetParams,
} from '@/api/budget'
import { ActionSheetRef } from 'react-native-actions-sheet'
import { ClassifyItem } from '@/api/classify'
import BudgetItem from './components/BudgetItem'
import ListHeaderComponent from './components/ListHeaderComponent'
import { getMonthOrYearBillList } from '@/api/bill'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import { lineColor, primaryTextColor } from '@/contents/theme'
import { ItemProps } from '@/components/ActionSheet'
import { logger } from 'react-native-reanimated/lib/typescript/logger'
const typeList = [
  {
    label: '月预算',
    value: 1,
  },
  {
    label: '年预算',
    value: 2,
  },
]
const message = '分类预算之和已超过总预算，将自动更新总预算'
const BudgetPage = ({ navigation }: any) => {
  const insets = useSafeAreaInsets()
  const [type, setType] = useState<ItemObj>(typeList[0])
  const [title, setTitle] = useState('每月总预算')
  const [classify, setClassify] = useState<ClassifyItem | undefined>()
  const [list, setList] = useState<BudgetItemProps[]>()
  const [currentItem, setCurrentItem] = useState<BudgetItemProps>()
  const [flatListHeight, setFlatListHeight] = useState(0)
  const [topHeight, setTopHeight] = useState(0)

  const [actionList, setActionList] = useState<ItemProps[]>([])
  // const [deltail,setDetail] = useState({})
  const ActionSheetAmountRef = useRef<ActionSheetRef>(null)
  const ActionSheetSelectRef = useRef<ActionSheetRef>(null)
  const { isCreatedDeviceUser, user } = useSelector(
    (state: RootState) => state.auth
  )

  const [totalBudgetForType, setTotalBudgetForType] =
    useState<BudgetItemProps>()
  const [listHasClassify, setListHasClassify] = useState<BudgetItemProps[]>()
  const { allBillList } = useSelector((state: RootState) => state.bill)

  const fetchList = () => {
    if (!user?.id) return
    const params: BudgetParams = {
      type: type.value,
      user_id: user.id,
      date: dayjs().valueOf(),
    }
    getBudgetList(params).then((res) => {
      setList(res)
      const res1 = res.find((item: BudgetItemProps) => item.isTotal == 1) //总预算
      const res2 = res.filter((item: BudgetItemProps) => item.classify_id) //分类预算
      setTotalBudgetForType(res1)
      setListHasClassify(res2)
    })
  }

  const isTotal = useMemo(
    () => (isEmpty(totalBudgetForType) ? 1 : 0),
    [totalBudgetForType]
  )

  const updateTotalAmout = async (body: BudgetItemProps) => {
    await updateBudget(body)
    fetchList()
    Message.show({
      content: message,
      type: 'info',
      autoHide: false,
    })
  }

  useEffect(() => {
    fetchList()
  }, [type])

  useEffect(() => {
    if (isEmpty(totalBudgetForType) || isEmpty(listHasClassify)) return
    const listAmount =
      (listHasClassify as BudgetItemProps[]).reduce(
        (sum, item) => sum + item.amount,
        0
      ) || 0
    const totalAmount = totalBudgetForType?.amount || 0
    if (totalAmount > 0 && totalAmount < listAmount && user?.id) {
      //如果总预算小于分类预算的总计,更新总预算
      const body: BudgetItemProps = {
        id: totalBudgetForType?.id,
        amount: listAmount,
      }
      updateTotalAmout(body)
    }
  }, [totalBudgetForType, listHasClassify])

  useEffect(() => {
    if (type.value === 1) {
      if (classify?.label) {
        setTitle(`每月${classify?.label}预算`)
      } else {
        setTitle('每月总预算')
      }
    } else {
      if (classify?.label) {
        setTitle(`年度${classify?.label}预算`)
      } else {
        setTitle('年度总预算')
      }
    }
  }, [type, classify])

  const handleShow = () => {
    ActionSheetAmountRef.current?.show()
  }

  const handleHide = () => {
    ActionSheetAmountRef.current?.hide()
  }

  //增加总预算
  const handleConfirm = async (amount: number) => {
    if (!user?.id || !isTotal) return
    const body = {
      user_id: user.id,
      type: type.value,
      isTotal: 1,
      amount,
    }
    Toast.showLoading('请稍候...')
    await createBudget(body as BudgetItemProps)
    setClassify(undefined)
    Toast.hide()
    ActionSheetAmountRef.current?.hide()
    fetchList()
  }

  //转去
  const handleAddClassifyBudget = () => {
    navigation.navigate('selectClassify', {
      type: type.value,
      parent_id: totalBudgetForType?.id,
      onBack: (data: any) => {
        const { refresh } = data || {}
        refresh && fetchList()
      },
    })
  }

  const handleShowAction = (e: BudgetItemProps) => {
    setCurrentItem(e)
    const { id, classify } = e || {}
    const { label } = classify || {}
    const label1 = `编辑${
      label ? label : type.value === 1 ? '月度总' : '年度总'
    }预算`
    const label2 = `清除${
      label ? label : type.value === 1 ? '月度总' : '年度总'
    }预算`
    const array: ItemProps[] = [
      { label: label1, value: 1 },
      { label: label2, value: 2 },
    ]
    setActionList(array)
    ActionSheetSelectRef.current?.show()
  }

  const handleDelItem = async (id: number) => {
    Toast.showLoading('清除中...')
    const res = await deleteBudget(id)
    Toast.hide()
    ActionSheetSelectRef.current?.hide()
    fetchList()
  }

  const handleOption = ({ label, value }: ItemProps) => {
    ActionSheetSelectRef.current?.hide()
    if (value === 1) {
      ActionSheetAmountRef.current?.show()
    }
    if (value === 2) {
      //删除
      const { id, isTotal } = currentItem || {}
      if (!id) return
      if (isTotal === 1) {
        //清除总预算
        ModalConfirm.show({
          title: '警告',
          message: '清除总预算将同时位您清除所有分类预算',
          options: [
            {
              text: '取消',
              type: 'middle',
            },
            {
              text: '确定',
              type: 'confirm',
              onPress: () => {
                handleDelItem(id)
              },
            },
          ],
        })
      } else {
        handleDelItem(id)
      }

      //
    }
  }

  const renderContent = () => {
    if (isEmpty(list)) {
      return (
        <View style={styles.empty}>
          <Image src={emptyImg} style={styles.emptyImg} />
          <Text style={styles.emptyText}>暂无预算</Text>
          <BounceButton style={styles.addBtn} onPress={handleShow}>
            <Icon name="plus" type="entypo" size={ms(16)} />
            <Text style={{ marginLeft: ms(3) }}>添加预算</Text>
          </BounceButton>
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          onLayout={({ nativeEvent }) => {
            const { height } = nativeEvent.layout
            setFlatListHeight(height)
          }}
          style={{ flex: 1 }}
          data={listHasClassify}
          renderItem={({ item, index }) => (
            <BudgetItem data={item} index={index} onPress={handleShowAction} />
          )}
          ListEmptyComponent={
            <ListEmptyComponent height={flatListHeight - topHeight} />
          }
          ListHeaderComponent={
            totalBudgetForType ? (
              <ListHeaderComponent
                data={totalBudgetForType}
                type={type.value}
                getHeaderHeight={setTopHeight}
                onPress={handleShowAction}
              />
            ) : null
          }
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        <BounceButton
          style={[
            styles.addClassifyBtn,
            { paddingBottom: insets.bottom + ms(30) },
          ]}
          onPress={handleAddClassifyBudget}
        >
          <Icon name="plus" type="entypo" size={ms(12)} />
          <Text style={styles.addClassifyBtnText}>添加分类预算</Text>
        </BounceButton>
      </View>
    )
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <PageView headerHide style={{ backgroundColor: lineColor }}>
      <BounceButton
        onPress={handleBack}
        style={[styles.backButton, { marginTop: insets.top + ms(16) }]}
      >
        <Icon
          type="feather"
          name="chevron-left"
          color={primaryTextColor}
          size={ms(30)}
        />
      </BounceButton>
      <ModalCheck list={typeList} onChange={setType}></ModalCheck>
      {Array.isArray(list) && (
        <View style={styles.content}>{renderContent()}</View>
      )}
      <ActionSheetAmount
        ref={ActionSheetAmountRef}
        onConfirm={handleConfirm}
        onClose={handleHide}
        title={title}
      />
      <CustomeActionSheet
        ref={ActionSheetSelectRef}
        array={actionList}
        onConfirm={handleOption}
        onCancel={() => {
          ActionSheetSelectRef.current?.hide()
        }}
      />
    </PageView>
  )
}

export default BudgetPage

const ListEmptyComponent = ({ height }: { height: number }) => {
  return (
    <View style={[styles.empty, { height }]}>
      <Image src={emptyImg} style={styles.emptyImg} />
      <Text style={styles.emptyText}>未设置分类预算</Text>
    </View>
  )
}
