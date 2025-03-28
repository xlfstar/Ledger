import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  View,
  Text,
  FlatList,
  ViewProps,
  PixelRatio,
  ScrollView,
} from 'react-native'
import {
  PageView,
  ScrollableTabView,
  BounceButton,
  MoneyText,
} from '@/components'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { TabBarProps } from '@/components/ScrollableTabView/types'
import {
  backgroundColor,
  lineColor,
  pageBg,
  primaryTextColor,
  themeGreenColor,
} from '@/contents/theme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { getBillListByConditions, reBuildBillList } from '@/utils'
import { ms } from 'react-native-size-matters'
import dayjs from 'dayjs'
import {
  fetchBillsForDetailPage,
  BillListForDetailPageData,
  setCurrentDateForIndexPage,
} from '@/store/slices/billSlice'
import {
  createBudget,
  getBudgetList,
  deleteBudget,
  updateBudget,
  BudgetItemProps,
  BudgetParams,
} from '@/api/budget'
import BudgetBox from './components/BudgetBox'
import styles from './styles'
import { Icon } from 'react-native-elements'

const DiscoveryPage = () => {
  const monthFormat = dayjs().format('MM月')
  const [totalBudgetForMonth, setTotalBudgetForMonth] =
    useState<BudgetItemProps>()
  const { allBillList } = useSelector((state: RootState) => state.bill)
  const { summary } = useSelector((state: RootState) => state.assets)

  const list = useMemo(() => {
    const res = getBillListByConditions(allBillList, dayjs().valueOf(), {
      type: null,
      classify_id: null,
      date_type: 'month',
    })
    return reBuildBillList(res, 'day')
  }, [allBillList])
  const { isLogin, user, token } = useSelector((state: RootState) => state.auth)

  const fetchList = () => {
    if (!user?.id) return
    const params: BudgetParams = {
      type: 1,
      user_id: user.id,
      date: dayjs().valueOf(),
    }
    getBudgetList(params).then((res) => {
      const list = res.find((item: BudgetItemProps) => item.isTotal == 1) //总预算
      console.log('list', list)
      setTotalBudgetForMonth(list)
    })
  }

  useEffect(() => {
    fetchList()
  }, [])
  const currentTotal = useMemo(() => {
    const totalIncome = list.reduce(
      (sum: number, item: BillListForDetailPageData) =>
        sum + item.summary.income,
      0
    )
    const totalExpense = list.reduce(
      (sum: number, item: BillListForDetailPageData) =>
        sum + item.summary.expense,
      0
    )
    return { totalIncome, totalExpense }
  }, [list])

  const headerObj = {
    backgroundColor: themeGreenColor,
    leftComponent: <View></View>,
    centerComponent: <Text style={{ fontSize: ms(18) }}>发现</Text>,
  }
  return (
    <PageView headerObj={headerObj}>
      <ScrollView style={styles.pageContainer}>
        <View style={styles.topBg}></View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>账单</Text>
          <View style={styles.detailBox}>
            <View style={styles.detailBoxLeft}>
              <Text style={styles.monthValue}>
                {dayjs().format('MM')}
                <Text style={styles.monthUnit}> 月</Text>
              </Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.detailBoxRight}>
              <View style={styles.incomeBlock}>
                <Text style={styles.rightLabel}>收入</Text>
                <MoneyText
                  number={currentTotal?.totalIncome || 0}
                  integerStyle={{ fontSize: ms(16) }}
                  decimalStyle={{ fontSize: ms(12) }}
                />
              </View>
              <View style={styles.incomeBlock}>
                <Text style={styles.rightLabel}>支出</Text>
                <MoneyText
                  number={currentTotal?.totalExpense || 0}
                  integerStyle={{ fontSize: ms(16) }}
                  decimalStyle={{ fontSize: ms(12) }}
                />
              </View>
              <View style={styles.incomeBlock}>
                <Text style={styles.rightLabel}>结余</Text>
                <MoneyText
                  number={
                    currentTotal?.totalIncome - currentTotal?.totalExpense || 0
                  }
                  integerStyle={{ fontSize: ms(16) }}
                  decimalStyle={{ fontSize: ms(12) }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.titleView}>
            <Text style={styles.sectionTitle}>{monthFormat}总预算</Text>
            <BounceButton onPress={() => {}} style={styles.setBudgetBtn}>
              <Text style={styles.setBudgetBtnText}>+设置预算</Text>
            </BounceButton>
          </View>

          <BudgetBox data={totalBudgetForMonth as BudgetItemProps} />
        </View>
        <View style={styles.section}>
          <View style={styles.titleView}>
            <Text style={styles.sectionTitle}>资产管理</Text>
            <BounceButton>
              <Icon
                type="feather"
                name="chevron-right"
                color="#ccc"
                size={ms(16)}
              />
            </BounceButton>
          </View>
          <View style={styles.assetsContent}>
            <View style={styles.assetsBlock}>
              <Text style={styles.assetsLabel}>净资产</Text>
              <MoneyText
                number={summary?.total || 0}
                integerStyle={{ fontSize: ms(16) }}
                decimalStyle={{ fontSize: ms(12) }}
              />
            </View>
            <View style={styles.assetsBlock}>
              <Text style={styles.assetsLabel}>资产</Text>
              <MoneyText
                number={summary?.positive || 0}
                integerStyle={{ fontSize: ms(16) }}
                decimalStyle={{ fontSize: ms(12) }}
              />
            </View>
            <View style={styles.assetsBlock}>
              <Text style={styles.assetsLabel}>负债</Text>
              <MoneyText
                number={summary?.negative || 0}
                integerStyle={{ fontSize: ms(16) }}
                decimalStyle={{ fontSize: ms(12) }}
              />
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>常用功能</Text>
        </View>
      </ScrollView>
    </PageView>
  )
}

export default DiscoveryPage
