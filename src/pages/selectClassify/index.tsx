import React, { useState, useEffect, useMemo, useRef } from 'react'
import { View, Text, FlatList } from 'react-native'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import {
  BounceButton,
  Image,
  PageView,
  ActionSheetAmount,
  Toast,
} from '@/components'
import { ActionSheetRef } from 'react-native-actions-sheet'
import {
  lineColor,
  pageBg,
  themeGreenColor,
  backgroundColor,
} from '@/contents/theme'
import configs from '@/configs'
import { ClassifyItem } from '@/api/classify'
import {
  createBudget,
  getBudgetList,
  deleteBudget,
  updateBudget,
  BudgetItemProps,
  BudgetParams,
} from '@/api/budget'
import { ScaledSheet, ms } from 'react-native-size-matters'

const SelectClassifyPage = ({ navigation, route }: any) => {
  const { onBack, type, parent_id } = route.params

  const ActionSheetAmountRef = useRef<ActionSheetRef>(null)
  const { classifyList } = useSelector((state: RootState) => state.classify)
  const { isCreatedDeviceUser, user } = useSelector(
    (state: RootState) => state.auth
  )
  const list = useMemo(
    () => classifyList.filter((item) => item.type == 1),
    [classifyList]
  )

  const [classify, setClassify] = useState<ClassifyItem>()

  const title = useMemo(
    () => `${type === 1 ? '每月' : '年度'}${classify?.label}预算`,
    [type, classify]
  )
  const handleBack = () => {
    onBack && onBack({ refresh: true })
    navigation.goBack()
  }

  const handlSelect = (item: ClassifyItem) => {
    setClassify(item)
    ActionSheetAmountRef.current?.show()
  }

  const handleConfirm = async (amount: number) => {
    const body = {
      parent_id,
      user_id: user?.id,
      type: type,
      classify_id: classify?.id,
      amount,
    }
    Toast.showLoading('请稍后')
    const res = await createBudget(body)
    Toast.hide()
    ActionSheetAmountRef.current?.hide()
    handleBack()
  }

  const handleHide = () => {
    ActionSheetAmountRef.current?.hide()
    setClassify(undefined)
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ClassifyItem
    index: number
  }) => {
    const { icon, id, label } = item || {}
    const active = classify?.id === id
    return (
      <BounceButton style={styles.itemBox} onPress={() => handlSelect(item)}>
        <View
          style={[
            styles.iconBox,
            active && { backgroundColor: themeGreenColor },
          ]}
        >
          <Image src={configs.BASE_URL + icon} style={styles.icon} />
        </View>
        <Text style={styles.itemLabel}>{label}</Text>
      </BounceButton>
    )
  }

  const headerObj = {
    backgroundColor: themeGreenColor,
    leftComponent: <View></View>,
    title: '选择类别',
    rightComponent: (
      <BounceButton onPress={() => navigation.goBack()}>
        <Text>取消</Text>
      </BounceButton>
    ),
  }
  return (
    <PageView headerObj={headerObj}>
      <FlatList
        style={{ flex: 1, backgroundColor: pageBg }}
        data={list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={{ paddingHorizontal: ms(15) }}
      />
      <ActionSheetAmount
        ref={ActionSheetAmountRef}
        onConfirm={handleConfirm}
        onClose={handleHide}
        title={title}
      />
    </PageView>
  )
}
export default SelectClassifyPage
const styles = ScaledSheet.create({
  itemBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ms(16),
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ms(50),
    height: ms(50),
    backgroundColor: lineColor,
    borderRadius: ms(50),
  },
  icon: {
    width: ms(32),
    height: ms(32),
  },
  itemLabel: {
    marginTop: ms(3),
    fontSize: ms(12),
  },
})
