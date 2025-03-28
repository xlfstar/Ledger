import React, { useMemo, useState } from 'react'
import { View, Text, LayoutChangeEvent } from 'react-native'
import styles from './styles.ts'
import dayjs from '@/utils/dayjs'
import { Image, BounceButton } from '@/components'
import { ProgressChart } from 'react-native-chart-kit'
import { transformMoney, formatPercentage } from '@/utils'
import { isEmpty, getBillListByConditions } from '@/utils'
import { BillListForDetailPageData } from '@/store/slices/billSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ms } from 'react-native-size-matters'
import type { BudgetItemProps } from '@/api/budget.ts'
import { lineColor } from '@/contents/theme.ts'

export interface Item {
  amount: number
  classify: any
  classify_id: number | null
  createdAt: string
  id?: number
  type: string | number
  updatedAt: string
  user_id: number
}

interface Props {
  type?: number
  data: BudgetItemProps
  onPress?: (item: BudgetItemProps) => void
  getHeaderHeight?: (height: number) => void
}
const config = {
  backgroundColor: '#f8f8f8',
  backgroundGradientFrom: '#f8f8f8',
  backgroundGradientTo: '#f8f8f8',

  color: (opacity = 1) => `rgba(95, 213, 75, ${opacity})`,
  style: {
    borderRadius: 16,
  },
}
const ListHeaderComponent: React.FC<Props> = ({
  type = 1,
  data,
  onPress = () => {},
  getHeaderHeight = () => {},
}) => {
  const { allBillList } = useSelector((state: RootState) => state.bill)
  const info = useMemo(() => {
    const date_type = type === 1 ? 'month' : 'year'
    const res = getBillListByConditions(allBillList, dayjs().valueOf(), {
      type: 1,
      classify_id: null,
      date_type,
    })

    const totalExpense = res?.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ) //总支出
    const totalBudget = data.amount / 100 //总预算
    const remaining = totalBudget - totalExpense / 100 //剩余
    const decimalFormRemaining: number = Math.max(
      0,
      Number((remaining / totalBudget).toFixed(2))
    )
    const percent = `${decimalFormRemaining * 100}%`
    const obj = {
      remaining,
      totalBudget,
      totalExpense,
      decimalFormRemaining,
      percent,
    }
    return obj
  }, [data, type])
  const {
    remaining,
    totalBudget,
    totalExpense,
    decimalFormRemaining,
    percent,
  } = info || {}

  const render = () => {
    if (isEmpty(data)) {
      return null
    } else {
      return (
        <View
          onLayout={({ nativeEvent }: LayoutChangeEvent) => {
            const { height } = nativeEvent.layout || {}
            getHeaderHeight(height)
          }}
        >
          <BounceButton style={styles.itemBox} onPress={() => onPress(data)}>
            <View style={styles.itemTop}>
              {type === 1 ? (
                <Text style={styles.itemDate}>
                  {dayjs().format('MM月') + '总预算'}
                </Text>
              ) : (
                <Text style={styles.itemDate}>
                  {dayjs().format('YYYY年') + '总预算'}
                </Text>
              )}

              <Text style={styles.itemEditText}>编辑</Text>
            </View>
            <View style={styles.itemMain}>
              <View style={styles.itemContent}>
                <ProgressChart
                  data={[decimalFormRemaining]}
                  width={ms(120)}
                  height={ms(120)}
                  strokeWidth={10}
                  chartConfig={Object.assign(
                    config,
                    decimalFormRemaining < 0 && { color: () => lineColor }
                  )}
                  radius={40}
                  hideLegend={true}
                  // style={{ marginLeft: -15 }}
                />
                {remaining >= 0 ? (
                  <View style={styles.hint}>
                    <Text style={styles.hintText}>剩余</Text>
                    <Text style={styles.hintPercent}>{percent}</Text>
                  </View>
                ) : (
                  <View style={styles.hint}>
                    <Text style={styles.overspended}>已超支</Text>
                  </View>
                )}
              </View>
              <View style={styles.valueInfo}>
                <View style={styles.infoTop}>
                  <Text style={styles.topText}>剩余预算:</Text>
                  <Text style={styles.topText}>
                    {transformMoney(remaining * 100)}
                  </Text>
                </View>
                <View style={styles.infoBottom}>
                  <Text style={styles.bottomText}>
                    {type === 1 ? '本月' : '年度'}预算:
                  </Text>
                  <Text style={styles.bottomText}>
                    {transformMoney(totalBudget * 100)}
                  </Text>
                </View>
                <View style={styles.infoBottom}>
                  <Text style={styles.bottomText}>
                    {type === 1 ? '本月' : '年度'}支出:
                  </Text>
                  <Text style={styles.bottomText}>
                    {transformMoney(totalExpense)}
                  </Text>
                </View>
              </View>
            </View>
          </BounceButton>
        </View>
      )
    }
  }

  return render()
}

export default ListHeaderComponent
