import React, { useMemo, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import dayjs from '@/utils/dayjs'
import { transformMoney } from '@/utils'
import { BillItemProps } from '@/api/bill'
import { ms } from 'react-native-size-matters'
import styles from './styles'
import RootSiblings from 'react-native-root-siblings'
import { screen } from '@/contents'
import { isEmpty } from '@/utils'
import { Image } from '@/components'
import { themeGreenColor, pageBg } from '@/contents/theme'
import configs from '@/configs'

interface Props {
  data: BillItemProps[]
  dateType: string
  currentDate: number
  type: number
  extraHeight?: number
}

let rootsibling: RootSiblings | null = null

const BillLineChart: React.FC<Props> = ({
  data,
  dateType,
  currentDate,
  type = 1,
  extraHeight,
}) => {

 
  const extraWidth = useMemo(() => {
    if (dateType === 'week') {
      return [75, 20]
    }
    if (dateType === 'month') {
      return [35, 25]
    }
    if (dateType === 'year') {
      return [55, 25]
    }
  }, [dateType])

  const [topLayout, setTopLayout] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [averageAmount, setAverageAmount] = useState(0)
  const chartData = useMemo(() => {
    let labels: string[] = []
    let list: number[] = []
    let array: any[] = []

    if (dateType === 'week') {
      // 获取本周的起止时间
      const startOfWeek = dayjs(currentDate).startOf('week')
      labels = Array.from({ length: 7 }, (_, i) =>
        dayjs(startOfWeek).add(i, 'day').format('MM/DD')
      )

      // 初始化数据数组
      list = new Array(7).fill(0)
      array = new Array(7).fill([])

      // 按日期分组数据
      data.forEach((item) => {
        let dayOfWeek =
          dayjs(item.date).day() - 1 < 0 ? 6 : dayjs(item.date).day() - 1
        list[dayOfWeek] += Number(item.amount)

        if (array[dayOfWeek].length === 0) {
          array[dayOfWeek] = [{ data: [item] }]
        } else {
          array[dayOfWeek][0].data.push(item)
        }
      })
    } else if (dateType === 'month') {
      // 获取当月天数
      const daysInMonth = dayjs(currentDate).daysInMonth()
      labels = Array.from({ length: daysInMonth }, (_, i) => String(i + 1))
      labels = labels.map((item, index) => {
        if (
          index === 0 ||
          index === labels.length - 1 ||
          Number(item) % 5 === 0
        ) {
          return String(item)
        }
        return ''
      })
      if (labels.includes('31')) {
        labels[29] = ''
      }

      // 初始化数据数组
      list = new Array(daysInMonth).fill(0)
      array = new Array(daysInMonth).fill([])

      // 按日期分组数据
      data.forEach((item) => {
        const dayOfMonth = dayjs(item.date).date() - 1
        list[dayOfMonth] += Number(item.amount)

        if (array[dayOfMonth].length === 0) {
          array[dayOfMonth] = [{ data: [item] }]
        } else {
          array[dayOfMonth][0].data.push(item)
        }
      })
    } else if (dateType === 'year') {
      labels = ['1月', '', '3月', '', '', '6月', '', '', '9月', '', '', '12月']

      // 初始化数据数组
      list = new Array(12).fill(0)
      array = new Array(12).fill([])

      // 按月份分组数据
      data.forEach((item) => {
        const month = dayjs(item.date).month()
        list[month] += Number(item.amount)

        if (array[month].length === 0) {
          array[month] = [{ data: [item] }]
        } else {
          array[month][0].data.push(item)
        }
      })
    }

    // 转换金额单位（分->元）
    list = list.map((amount) => Number(transformMoney(amount)))

    // 计算总额和平均值
    const total = list.reduce((sum, item) => sum + item, 0)
    const length = labels.length
    setTotalAmount(total)
    setAverageAmount(total / length)
    const maxAmount = Math.max(...list)
    const absoluteMax = maxAmount
    const datasets = [
      {
        data: list,
      },
    ]

    return {
      labels,
      datasets,
      absoluteMax,
      array, // 添加按日期分组的数据
    }
  }, [data, dateType, currentDate, type])

  const screenWidth = screen.width
  const HORIZONTAL_PADDING = ms(15) // 设置水平边距
  const TOOLTIP_WIDTH = ms(180)

  const renderDotContent = ({ list }: { list: BillItemProps[] }) => {
    if (isEmpty(list)) {
      return <Text style={styles.emptyText}>没有费用</Text>
    }
    const data = list.sort((a, b) => Number(b.amount) - Number(a.amount))
    const totalAmount = data.reduce((sum, item) => sum + Number(item.amount), 0)
    const totalLabel = `当${dateType==='year'?'月':'日'}总${type==1?'支出':'收入'}：${transformMoney(totalAmount)}`
    return (
      <View>
        <Text style={styles.topText}>最大3笔交易</Text>
        {data.slice(0, 3).map((item: BillItemProps, index: number) => {
          const { classify, date, amount } = item || {}
          const { label, color_icon } = classify || {}
          return (
            <View style={styles.dotItem} key={index}>
              <View style={styles.iconView}>
                <Image
                  src={configs.BASE_URL + color_icon}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.itemDate}>
                {dayjs(date).format('YY/MM/DD')}
              </Text>
              <Text style={styles.itemLabel}>{label}</Text>
              <Text style={styles.amount}>{transformMoney(amount)}</Text>
            </View>
          )
        })}
        <Text style={styles.totalLabel}>{totalLabel}</Text>
      </View>
    )
  }

  const handleDataPointClick = ({ x, y, index }: any) => {
    if (rootsibling !== null) {
      rootsibling.destroy()
    }
    const list = chartData.array[index][0]?.data || []
    const top = (extraHeight || 0) + topLayout + y
    const left = Math.min(
      Math.max(0, x - ms(40) - TOOLTIP_WIDTH / 2),
      screenWidth - TOOLTIP_WIDTH
    )
    rootsibling = new RootSiblings(
      (
        <>
          <View
            style={[styles.tooltip,{
              left,
              top,
              width: TOOLTIP_WIDTH,
            }]}
          >
            {renderDotContent({ list })}
          </View>
          <View
            style={[
              styles.triangle,
              { top, left: x - ms(40), marginTop: ms(-47.5) },
            ]}
          ></View>
          <View style={[styles.line, { top, left: x - ms(40) }]}></View>
          <View
            style={[
              styles.circle,
              {
                left: x - ms(40),
                top,
              },
            ]}
          ></View>
        </>
      )
    )
    setTimeout(() => {
      if (rootsibling !== null) {
        rootsibling.destroy()
      }
    }, 3000)
  }
  useEffect(() => {
    return () => {
      if (rootsibling !== null) {
        rootsibling.destroy()
      }
    }
  }, [rootsibling])

  const renderMaxValueLine = () => {
    if (!chartData.absoluteMax) return null

    return (
      <Text
        style={[
          styles.topLine,
          {
            left: HORIZONTAL_PADDING, // 使用相同的边距
            right: HORIZONTAL_PADDING, // 使用相同的边距
          },
        ]}
      >
        {chartData.absoluteMax.toFixed(2)}
      </Text>
    )
  }

  const renderSummary = () => {
    return (
      <View
        style={{ paddingHorizontal: ms(16), paddingTop: ms(12) }}
        onLayout={({ nativeEvent }) => {
          setTopLayout(nativeEvent.layout.height)
        }}
      >
        <Text style={{ fontWeight: 300, fontSize: ms(13) }}>
          {type === 1 ? '总支出：' : '总收入：'}
          {totalAmount.toFixed(2)}
        </Text>
        <Text style={{ fontWeight: 300, fontSize: ms(11) }}>
          平均值：{averageAmount.toFixed(2)}
        </Text>
      </View>
    )
  }
  const chartConfig = useMemo(()=>{
    return {
      backgroundColor: pageBg,
      backgroundGradientFrom: pageBg,
      backgroundGradientTo: pageBg,
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(0, 0, 0, 0.5)`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0,1)`,
      strokeWidth: 0.5,
      useShadowColorFromDataset: true,
      propsForDots: {
        r: '2',
        strokeWidth: '1',
        fill: '#fff',
        stroke: themeGreenColor,
      },
  
      propsForBackgroundLines: {
        strokeDasharray: '',
        strokeWidth: '0.5',
        x1: 64,
        x2: screenWidth + (extraWidth ? extraWidth[1] : 0),
        y1: 151,
        y2: 151,
        stroke: '#ccc',
      },
      propsForLabels: {
        fontWeight: '200',
        fontSize: '10',
      },
    }
  },[screenWidth,extraWidth])

  return (
    <View>
      {renderSummary()}
      <View
        style={{
          position: 'relative',
        }}
      >
        {renderMaxValueLine()}
        <LineChart
          data={chartData}
          width={screenWidth + (extraWidth ? extraWidth[0] : 0)} // 使用计算后的宽度
          height={180}
          chartConfig={chartConfig}
          style={{
            borderRadius: 16,
            transform: [{ translateX: ms(-40) }],
          }}
          withShadow={false}
          withHorizontalLines={true} // 隐藏横向网格线
          withVerticalLines={true} // 显示纵向网格线
          withHorizontalLabels={false} // 隐藏纵坐标标签
          withVerticalLabels={true} // 显示横坐标标签
          withInnerLines={true} // 隐藏内部网格线
          fromZero
          onDataPointClick={handleDataPointClick}
        />
      </View>
    </View>
  )
}

export default BillLineChart
