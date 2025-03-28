import React, { useState, useMemo } from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import PieChart, { Slice } from 'react-native-pie-chart'

import styles from '../../styles'
import { transformMoney } from '@/utils'

const colors = [
  '#A788F0',
  '#8DF088',
  '#F76B00',
  '#F7D700',
  '#6FE1C8',
  '#F70082',
]
const PieChartPanel: React.FC<any> = ({ tab }) => {
  const { assetsList } = useSelector((state: RootState) => state.assets)
  const [total, setTotal] = useState(0)
  const series = useMemo(() => {
    let list = []
    if (tab.key === 1) {
      list = assetsList.filter((item) => item.accountData.type == 1)
    } else if (tab.key === 2) {
      list = assetsList.filter((item) => item.accountData.type == 2)
    }
    const total = list.reduce((sum, item) => sum + item.accountData.total, 0)
    setTotal(total)
    let res = list
      .sort((a, b) => b.accountData.total - a.accountData.total)
      .map((item, index) => {
        // 计算每项占总数的百分比
        const percentage =
          total === 0 ? 0 : ((item.accountData.total / total) * 100).toFixed(2)
        return {
          name: item.accountData.parent_name || item.accountData.label,
          value: item.accountData.total,
          percentage: Number(percentage),
          color: colors[index],
          total,
        }
      })
    return res
  }, [assetsList, tab])
  if (tab.key === 3) {
    return null
  }
  if (series.length === 0) {
    return (
      <View style={styles.block}>
        <Text style={styles.blockTitle}>{`当前${tab.label}状况`}</Text>
        <View style={styles.blockContent}>
          <View style={styles.pieChart}>
            <View
              style={{
                width: 150,
                height: 150,
                borderWidth: 25,
                borderRadius: '50%',
                borderColor: 'rgba(0,0,0,.1)',
              }}
            ></View>
            <View style={styles.totalContent}>
              <Text style={styles.totalLabel}>总{tab.label}</Text>
              <Text style={styles.totalValue}>{transformMoney(total)}</Text>
            </View>
          </View>
          <View style={styles.pieInfo}>
            {colors.map((item, index) => {
              return (
                <View key={index} style={styles.pieItem}>
                  <View
                    style={[styles.pieColor, { backgroundColor: item }]}
                  ></View>
                  <View style={styles.pieTextLine}>
                    <Text style={styles.pieText}>--</Text>
                    <Text style={styles.piePercent}>0.0%</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{`当前${tab.label}状况`}</Text>
      <View style={styles.blockContent}>
        <View style={styles.pieChart}>
          <PieChart series={series} widthAndHeight={150} cover={0.65} />
          <View style={styles.totalContent}>
            <Text style={styles.totalLabel}>总{tab.label}</Text>
            <Text style={styles.totalValue}>{transformMoney(total)}</Text>
          </View>
        </View>
        <View style={styles.pieInfo}>
          {series.map((item, index) => {
            return (
              <View key={item.name} style={styles.pieItem}>
                <View
                  style={[styles.pieColor, { backgroundColor: item.color }]}
                ></View>
                <View style={styles.pieTextLine}>
                  <Text style={styles.pieText}>{item.name}</Text>
                  <Text style={styles.piePercent}>{item.percentage}%</Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}
export default PieChartPanel
