import { PageView, BounceButton, ModalDate } from '@/components'
import React, { useState, useEffect, useMemo } from 'react'
import { Pressable, Text, View, PixelRatio } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { screen } from '@/contents'
import { isEmpty } from '@/utils'
import { Image } from '@/components'
import { Icon } from 'react-native-elements'
import { ms } from 'react-native-size-matters'
import dayjs from 'dayjs'
import { transformMoney } from '@/utils'
import { backgroundColor, themeGreenColor, pageBg } from '@/contents/theme'
import { getMonthlyAssets, AssetsStatistics } from '@/api/monthly-assets.ts'
import styles from '../../styles'
const screenWidth = screen.width
const labels = ['1月', '', '3月', '', '', '6月', '', '', '9月', '', '', '12月']
interface TabProps {
  key: number
  label: string
}
interface LineChartProps {
  tab: TabProps
  list: AssetsStatistics[]
  year: string
  onChange: () => void
}
const LineChartComponent: React.FC<LineChartProps> = ({
  tab,
  list,
  year,
  onChange,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<{
    value: number
    index: number
    x: number
    y: number
  } | null>(null)
  const data = useMemo(() => {
    const key =
      tab.key === 1 ? 'positive' : tab.key === 2 ? 'negative' : 'total'
    const datasets = [
      {
        data: list.map((item) => item[key]),
        color: (opacity = 1) => `rgba(0,0,0,0.8)`, // optional
        strokeWidth: 1 / PixelRatio.get(), // optional
      },
    ]
    return {
      labels,
      datasets,
    }
  }, [tab, list])

  const chartConfig = useMemo(() => {
    return {
      backgroundColor: '#fff',
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(0, 0, 0, 0.5)`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0,1)`,
      strokeWidth: 1 / PixelRatio.get(),
      useShadowColorFromDataset: true,
      propsForDots: {
        r: ms(2),
        strokeWidth: 1 / PixelRatio.get(),
        // fill: '#fff',
        stroke: '#000',
      },

      propsForLabels: {
        fontWeight: 300,
        fontSize: ms(10),
        dy: -10,
      },
      // yAxisLabel: '', // 隐藏 Y 轴标签
      // yLabelsOffset: 1, // 调整 Y 轴标签偏移
      // yLabelsPadding: 1, // 调整 Y 轴标签间距
    }
  }, [])

  const handleDataPointClick = (data: any) => {
    const { value, index, x, y } = data
    setSelectedPoint({ value, index, x, y })

    // 3秒后自动隐藏数值提示
    setTimeout(() => {
      setSelectedPoint(null)
    }, 3000)
  }

  return (
    <View style={styles.lineChart}>
      <View style={styles.lineChartContent}>
        <View style={styles.lineHeader}>
          <Text style={styles.lineChartTitle}>{tab.label}走势图</Text>
          <BounceButton style={styles.changeTabBtn} onPress={onChange}>
            <Text style={styles.changeTabBtnText}>{year}</Text>
            <Icon
              name={'triangle-down'}
              color={'#000'}
              size={ms(16)}
              type="entypo"
            />
          </BounceButton>
        </View>
        <View style={{ position: 'relative' }}>
          <LineChart
            data={data}
            width={screenWidth} // 使用计算后的宽度
            height={130}
            chartConfig={chartConfig}
            style={{
              transform: [{ translateX: ms(-48) }],
            }}
            withShadow={false}
            withHorizontalLines={false} // 隐藏横向网格线
            withVerticalLines={false} // 显示纵向网格线
            withHorizontalLabels={false} // 隐藏纵坐标标签
            withVerticalLabels={true} // 显示横坐标标签
            yAxisInterval={1}
            withInnerLines={true} // 隐藏内部网格线
            fromZero={false}
            bezier={false} // 禁用贝塞尔曲线
            getDotColor={(dataPoint, index) => {
              return dataPoint ? themeGreenColor : '#fff'
            }} // 自定义点颜色
            onDataPointClick={handleDataPointClick}
          />
          {/* 添加数值提示框 */}
          {selectedPoint && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                borderRadius: ms(4),
                padding: ms(3),
                left: selectedPoint.x - ms(79),
                top: selectedPoint.y - ms(32),
                minWidth: ms(60),
                alignItems: 'center',
                justifyContent: 'center',
                // transform: [{ translateY: ms(-10) }],
                zIndex: 1000,
              }}
            >
              <Text
                style={{ color: '#fff', fontSize: ms(12), fontWeight: '500' }}
              >
                {transformMoney(selectedPoint.value)}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  bottom: ms(-6),
                  left: '50%',
                  marginLeft: ms(-4),
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: ms(8),
                  borderRightWidth: ms(8),
                  borderTopWidth: ms(8),
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderTopColor: 'rgba(0, 0, 0, 1)',
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
export default LineChartComponent
