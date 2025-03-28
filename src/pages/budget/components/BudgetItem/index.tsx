import React, { useMemo, useState } from 'react'
import { View, Text, LayoutChangeEvent } from 'react-native'
import styles from './styles.ts'
import {  Image,BounceButton } from '@/components'
import dayjs from '@/utils/dayjs'
import { ProgressChart } from 'react-native-chart-kit'
import { transformMoney, formatPercentage } from '@/utils'
import { isEmpty, getBillListByConditions } from '@/utils'
import { BillListForDetailPageData } from '@/store/slices/billSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ms } from 'react-native-size-matters'
import configs from '@/configs/index.ts'
import { backgroundColor, lineColor } from '@/contents/theme.ts'
import type{BudgetItemProps} from '@/api/budget.ts'

export interface Item {
  amount: number
  classify: any
  classify_id: number
  createdAt: string
  id: number
  type: string | number
  updatedAt: string
  user_id: number
}


interface Props {
  type?: number
  data: BudgetItemProps
  index?: number
  onPress?: (item:BudgetItemProps) => void
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
const BudgetItem: React.FC<Props> = ({
  type = 1,
  data,
  index,
  onPress = () => {},
}) => {
  const { allBillList } = useSelector((state: RootState) => state.bill)
  const info = useMemo(() => {
    const date_type = type === 1 ? 'month' : 'year'
    const res = getBillListByConditions(allBillList, dayjs().valueOf(), {
      type: 1,
      classify_id: data.classify_id ?? null,
      date_type,
    })
    const totalExpense = res?.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ) //总支出
    const totalBudget = data.amount / 100 //总预算

    const remaining = totalBudget - totalExpense / 100 //剩余
    const decimalFormRemaining: number = Number(
      (remaining / totalBudget).toFixed(2)
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

  return (
    <View style={styles.budgetItem}>
      {index === 0 && (
        <View style={styles.classifyTitle}>
          <Text style={{ fontSize: ms(12) }}>分类预算</Text>
        </View>
      )}
      <BounceButton style={[styles.itemBox,index===0&&{borderTopColor:'transparent'}]} onPress={() => onPress(data)}>
        <View style={styles.itemTop}>
          <View style={styles.classifyInfo}>
            <View style={styles.iconCircle}>
              <Image
                src={configs.BASE_URL + data.classify.color_icon}
                style={styles.icon}
              />
            </View>
            <Text style={styles.itemDate}>{data.classify.label}</Text>
          </View>

          <Text style={styles.itemEditText}>编辑</Text>
        </View>
        <View style={styles.itemMain}>
          <View style={styles.itemContent}>
            <ProgressChart
              data={[Math.max(0,decimalFormRemaining)]}
              width={ms(120)}
              height={ms(120)}
              strokeWidth={7}
              chartConfig={Object.assign(config,decimalFormRemaining<0&&{color:()=>lineColor})}
              radius={32}
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

export default BudgetItem
