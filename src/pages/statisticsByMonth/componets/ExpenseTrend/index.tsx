import React, { useState, useEffect, useMemo } from 'react'
import { View, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { transformMoney,reBuildBillList } from '@/utils'
import dayjs from '@/utils/dayjs'
import { BillListForDetailPageData } from '@/store/slices/billSlice'
import { themeGreenColor } from '@/contents/theme'
import { ms } from 'react-native-size-matters'
import styles from '../../styles'

type Props = {
  data: BillListForDetailPageData
}

const ExpenseTrend = ({ data }: Props) => {
  const [width, setWidth] = useState(0)
  const { data: array, summary, id: date } = data || {}
  const expenseList = array.filter(i=>i.type==1)
  const expenseArray = reBuildBillList(expenseList,'day')
  const sortArray = expenseArray.sort((a,b)=>b.summary.expense-a.summary.expense)
  const maxItem = sortArray[0]
  
  const [totalAmount, setTotalAmount] = useState(0)
  const [averageAmount, setAverageAmount] = useState(0)
  const [maxAmount,setMaxAmount] = useState(0)
  const chartData = useMemo(() => {
    let labels: string[] = []
    let list: number[] = []

    // 获取当月天数
    const daysInMonth = dayjs(date).daysInMonth()
    labels = Array.from({ length: daysInMonth }, (_, i) => String(i + 1))

    labels = labels.map((item, index) => {
      if (
        index === 0 ||
        index === labels.length - 1 ||
        Number(item) % 5 === 0
      ) {
        return String(item)
      } else {
        return ''
      }
    })
    if (labels.includes('31')) {
      labels[29] = ''
    }

    // 初始化数据数组

    list = new Array(daysInMonth).fill(0)
    // 填充数据
    expenseList.forEach((item) => {
      const dayOfMonth = dayjs(item.date).date() - 1
      list[dayOfMonth] += Number(item.amount)
    })

    // // 转换金额单位（分->元）

    list = list.map((amount) => Number(transformMoney(amount)))
    // 找出收入和支出的最大值
    const total = list.reduce((sum, item) => sum + item, 0)
    const length = labels.length
    setTotalAmount(total)
    setAverageAmount(total / length)
    const maxAmount = Math.max(...list)
    const absoluteMax = maxAmount
    setMaxAmount(maxAmount)
    const datasets = [
      {
        data: list,
      },
    ]
    return {
      labels,
      datasets,
      absoluteMax,
    }
  }, [data])


  // const maxExpenseItem = Math.max()
  return (
    <View
      style={styles.summaryBox}
      onLayout={({ nativeEvent }) => {
        const { width } = nativeEvent.layout
        setWidth(width)
      }}
    >
      <Text style={styles.boxTitle}>支出趋势</Text>
      <View style={styles.infoBox}>
        <View style={styles.leftView}>
          <Text style={styles.infoLabel}>单日支出最高</Text>
          <Text style={styles.infoValue}>{transformMoney(maxItem.summary.expense)}</Text>
          <Text style={styles.infoDate}>{dayjs(maxItem.summary.date).format('M月D日')}</Text>
        </View>
        <View style={styles.leftView}>
          <Text style={styles.infoLabel}>日均支出</Text>
          <Text style={styles.infoValue}>{transformMoney(averageAmount*100)}</Text>
        </View>
        <View style={styles.leftView}>
          <Text style={styles.infoLabel}>本月支出</Text>
          <Text style={styles.infoValue}>{transformMoney(totalAmount*100)}</Text>
        </View>
      </View>
      <View
        style={[
          styles.lineChartBox,
          { position: 'relative', marginLeft: ms(-60) },
        ]}
      >
        <LineChart
          data={chartData}
          width={width + 35}
          height={180}
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 2,
            color: (opacity = 1) => themeGreenColor,
            labelColor: (opacity = 1) => `rgba(0, 0, 0,1)`,
            strokeWidth: 2.5,
            useShadowColorFromDataset: true,
            propsForDots: {
              r: '2.5',
              strokeWidth: '1',
              fill: '#fff',
              stroke: themeGreenColor,
            },

            propsForBackgroundLines: {
              strokeDasharray: '',
              strokeWidth: '0.5',
              x1: 64,
              x2: width + 25,
              y1: 151,
              y2: 151,
              stroke: '#ccc',
            },
            propsForLabels: {
              fontWeight: '300',
              fontSize: '10',
            },
          }}
          style={{
            marginVertical: 8,
          }}
          bezier
          withShadow={true}
          withHorizontalLines={true} // 隐藏横向网格线
          withVerticalLines={true} // 显示纵向网格线
          withHorizontalLabels={false} // 隐藏纵坐标标签
          withVerticalLabels={true} // 显示横坐标标签
          withInnerLines={true} // 隐藏内部网格线
          fromZero
          // onDataPointClick={handleDataPointClick}
        />
      </View>
    </View>
  )
}
export default ExpenseTrend
