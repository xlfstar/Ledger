import { PageView, ModalDate } from '@/components'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getMonthlyAssets, AssetsStatistics } from '@/api/monthly-assets.ts'
import { useFocusEffect } from '@react-navigation/native'
import dayjs from 'dayjs'
import LineChartComponent from './components/LineChartPanel'
import PieChartPanel from './components/PieChartPanel'
import styles from './styles'

const bottonList = [
  {
    label: '资产',
    key: 1,
  },
  {
    label: '负债',
    key: 2,
  },
  {
    label: '净资产',
    key: 3,
  },
]

const ChartPage = ({ navigation, route }: any) => {
  const [tab, setTab] = useState(bottonList[0])
  const [lineChartData, setLineChartData] = useState<AssetsStatistics[]>([])
  const [year, setYear] = useState(dayjs().format('YYYY'))

  const { user } = useSelector((state: RootState) => state.auth)
  useFocusEffect(
    React.useCallback(() => {
      getLineChartData(year)
    }, [year])
  )

  const getLineChartData = (year: string) => {
    if (!user?.id) return
    const params = {
      user_id: user.id,
      year,
    }
    getMonthlyAssets(params).then((res) => {
      setLineChartData(res)
    })
  }
  const handleChangeYear = () => {
    ModalDate.picker({
      value: year,
      mode: 'year',
      title: '选择年份',
    }).then((res) => {
      setYear(res)
    })
  }

  const renderTotal = () => {
    const total = lineChartData.reduce((pre, cur) => {
      return pre + cur.total
    }, 0)
    return total
  }

  const headerObj = {
    title: '图表',
  }
  const handleBack = () => {
    navigation.replace('mainTab', { screen: 'home' })
  }
  return (
    <PageView
      headerObj={headerObj}
      style={styles.pageContainer}
      onBack={handleBack}
    >
      <View style={styles.typesTab}>
        {bottonList.map((item, index) => (
          <Pressable
            key={item.key}
            style={[
              styles.tabItem,
              index === 1 && styles.centerItem,
              tab.key === item.key && styles.activeTab,
            ]}
            onPress={() => {
              setTab(item)
            }}
          >
            <Text
              style={[
                styles.btnText,
                tab.key === item.key && styles.activeText,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <LineChartComponent
        year={year}
        list={lineChartData}
        tab={tab}
        onChange={handleChangeYear}
      />
      <PieChartPanel tab={tab} />

      <View style={styles.block}>
        <Text style={styles.blockTitle}>{`${tab.label}排行榜`}</Text>
        <View style={styles.blockContent}></View>
      </View>
    </PageView>
  )
}
export default ChartPage
