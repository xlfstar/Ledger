import React, { useMemo } from 'react'
import styles from '../../styles'
import { View, Text } from 'react-native'
import { Image, BounceButton } from '@/components'
import { ms } from 'react-native-size-matters'
import PieChart, { Slice } from 'react-native-pie-chart'
import { BillItemProps } from '@/api/bill'
import configs from '@/configs'
import { transformMoney } from '@/utils'
import dayjs from '@/utils/dayjs'
import { Icon } from 'react-native-elements'
import { blockColor9 } from '@/contents/theme'

const colors = [
  '#A788F0',
  '#8DF088',
  '#F76B00',
  '#F7D700',
  '#6FE1C8',
  '#F70082',
]

export type Props = {
  data: BillItemProps[]
  onPress: () => void
}
const ExpenseBox = ({ data, onPress = () => {} }: Props) => {
  const series = useMemo(() => {
    const list = data.filter((i) => Number(i.type) === 1)
    const groupedData = list.reduce((acc, item) => {
      const classifyId = item.classify.id
      if (!acc[classifyId]) {
        acc[classifyId] = {
          classify: item.classify,
          amount: 0,
          date: item.date,
        }
      }
      acc[classifyId].amount += Number(item.amount)
      return acc
    }, {})
    const total: number = Object.values(groupedData).reduce(
      (sum, item: any) => sum + Number(item.amount),
      0
    )
    const sortedData = Object.values(groupedData)
      .map((item: any, index: number) => ({
        // ...item,
        percentage:
          total > 0 ? ((item.amount / total) * 100).toFixed(1) + '%' : '0%',
        value: Number(item.amount),
        name: item.classify.label,
        color: colors[index % 6],
        icon: item.classify.color_icon,
        date: item.date,
      }))
      .sort((a, b) => b.value - a.value)
    let res = []

    if (sortedData.length > 6) {
      let otherTotal = 0
      let percentage = '0%'
      sortedData.forEach((item, i) => {
        if (i < 5) {
          res.push({ ...item, ...{ color: colors[i] } })
        } else {
          otherTotal += item.value
        }
      })
      percentage =
        total > 0 ? ((otherTotal / total) * 100).toFixed(1) + '%' : '0%'
      res.push({
        value: otherTotal,
        name: '其他',
        color: colors[5],
        percentage,
        date: '',
        icon: '',
      })
    } else {
      res = sortedData
    }

    return res
  }, [data])
  if (series.length <= 0) {
    return null
  }
  return (
    <View style={styles.summaryBox}>
      <Text style={styles.boxTitle}>支出类别</Text>
      <View style={styles.pieBox}>
        <PieChart series={series} widthAndHeight={ms(120)} cover={0.65} />
        <View style={styles.pieInfo}>
          <View style={styles.pieLine}>
            <Text style={[styles.pieLineItem1, styles.pieInfoTitle]}>类别</Text>
            <Text style={[styles.pieLineItem2, styles.pieInfoTitle]}>占比</Text>
            <Text style={[styles.pieLineItem3, styles.pieInfoTitle]}>金额</Text>
          </View>
          {series.map((item, index) => (
            <View style={styles.pieLine} key={index}>
              <View style={[styles.pieLineItem1, styles.pieLineClassify]}>
                <View
                  style={{
                    backgroundColor: item.color,
                    height: ms(10),
                    width: ms(10),
                    borderRadius: ms(2),
                    marginRight: ms(8),
                  }}
                ></View>
                <Text style={styles.pieInfoTitle}>{item.name}</Text>
              </View>
              <Text style={[styles.pieLineItem2, styles.pieInfoTitle]}>
                {item.percentage}
              </Text>
              <Text style={[styles.pieLineItem3, styles.pieInfoTitle]}>
                {transformMoney(item.value)}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.rankTop}>
        <Text style={styles.subTitle}>支出排行</Text>
        {series.length>3 && (<BounceButton style={styles.showMoreBtn} onPress={onPress}>
          <Text style={styles.showMoreBtnText}>查看更多</Text>
          <Icon
            type="feather"
            name="chevron-right"
            size={ms(16)}
            color={blockColor9}
          />
        </BounceButton>)}
        
      </View>

      <View style={styles.rankBox}>
        {series.slice(0, 3).map((item, index) => (
          <View style={styles.rankItem} key={index}>
            <Text style={styles.rankId}>{index + 1}</Text>
            <View style={styles.iconCircle}>
              <Image style={styles.icon} src={configs.BASE_URL + item.icon} />
            </View>
            <View style={styles.itemText}>
              <Text style={styles.itemLabel}>{item.name}</Text>
              <Text style={styles.itemDate}>
                {dayjs(item.date).format('MM月D日')}
              </Text>
            </View>
            <Text style={styles.itemAmount}>-{transformMoney(item.value)}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
export default ExpenseBox
