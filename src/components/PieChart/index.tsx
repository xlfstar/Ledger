import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import PieChart from 'react-native-pie-chart'
import { ms, ScaledSheet } from 'react-native-size-matters'
import { themeGreenColor } from '@/contents/theme'
import { BillItemProps } from '@/api/bill'

interface Props {
  data: BillItemProps[]
  width?: number
}

const generateColor = (index: number): string => {
  const colors = [
    '#A788F0',
    '#8DF088',
    '#F76B00',
    '#F7D700',
    '#6FE1C8',
    '#F70082',
  ]
  return colors[index % colors.length]
}

const PieChartCom: React.FC<Props> = ({ data, width = ms(120) }) => {
  const { chartData, labels } = useMemo(() => {
    // Group by classify_id and sum amounts
    const groupedData = data.reduce((acc, curr) => {
      const classifyId = curr.classify_id || 0
      if (!acc[classifyId]) {
        acc[classifyId] = 0
      }
      acc[classifyId] += Number(curr.amount) || 0
      return acc
    }, {} as Record<number, number>)

    // Convert to array and sort by amount
    let sortedData = Object.entries(groupedData)
      .map(([classifyId, amount]) => ({
        key: Number(classifyId),
        amount: Number(amount),
        color: generateColor(Number(classifyId))
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5) // 只取前5个

    const total = sortedData.reduce((sum, item) => sum + item.amount, 0)
    
    // 准备饼图数据，按照新版本 API 格式
    const chartData = sortedData.map(item => ({
      value: item.amount,
      color: item.color,
      label: {
          text: `第${2}`,
        fontSize: ms(10),
        fill: '#fff'
      }
    }))

    // 准备图例数据
    const labels = sortedData.map(item => ({
      // percent: ((item.amount / total) * 100).toFixed(1),
      amount: item.amount,
      color: item.color
    }))

    return { chartData, labels }
  }, [data])

  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        {labels.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              (¥{item.amount})
            </Text>
          </View>
        ))}
      </View>
    )
  }
  if(Array.isArray(data) && data.length>0){
    return (
      <View style={styles.container}>
        <PieChart
          widthAndHeight={width}
          series={chartData}
          cover={0.45} // 设置环形图的中心空白区域
          style={{ marginVertical: ms(10) }}
        />
        {renderLegend()}
      </View>
    )
  }
  return null
  
}

const styles = ScaledSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal:'16@ms',
    paddingVertical: '20@ms'
  },
  legendContainer: {
    marginTop: '20@ms',
    width: '100%',
    paddingHorizontal: '20@ms'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5@ms'
  },
  legendColor: {
    width: '12@ms',
    height: '12@ms',
    borderRadius: '6@ms',
    marginRight: '8@ms'
  },
  legendText: {
    fontSize: '12@ms',
    color: '#333'
  }
})

export default PieChartCom
