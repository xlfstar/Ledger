import React, { useMemo, useState, memo, useCallback, useEffect } from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import {
  BounceButton,
  PageView,
  Image,
  LineChart,
  ListForDateType,
  CustomeSwitch,
} from '@/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {
  getBillListByConditions,
  transformMoney,
  getMaxAndMinDate,
  getDateTypeList,
  getRankList,
} from '@/utils'
import dayjs from '@/utils/dayjs'
import { themeGreenColor, primaryTextColor } from '@/contents/theme'
import { OpUnitType } from 'dayjs'
import { ms } from 'react-native-size-matters'
import configs from '@/configs'
import styles from './styles'

const dateTypeList = [
  {
    label: '周',
    value: 'week',
  },
  {
    label: '月',
    value: 'month',
  },
  {
    label: '年',
    value: 'year',
  },
]

const ClassifyBillChartPage = memo(({ navigation, route }: any) => {
  const { item, dateType: initDateType } = route.params || {}
  const { classify, type, date: itemDate } = item || {}
  const { id: classify_id } = classify || {}
  const { label } = classify || {}
  const [dateType, setDateType] = useState(initDateType)
  const { allBillList } = useSelector((state: RootState) => state.bill)
  const [sortType, setSortType] = useState(0)
  const initDateList = {
    week: dayjs(itemDate).valueOf(),
    month: dayjs(itemDate).valueOf(),
    year: dayjs(itemDate).valueOf(),
  }
  const [dateList, setDateList] = useState<{ [key: string]: number }>(
    initDateList
  )
  const date = useMemo(() => {
    return dateList[dateType.value]
  }, [dateList, dateType])

  const { maxDate, minDate } = useMemo(
    () =>
      getMaxAndMinDate(allBillList.filter((i) => i.classify_id == classify_id)),
    [allBillList]
  )
  const list = useMemo(() => {
    const weekList = getDateTypeList({
      maxDate,
      minDate,
      type: 'week' as OpUnitType,
    })
    const monthList = getDateTypeList({
      maxDate,
      minDate,
      type: 'month' as OpUnitType,
    })
    const yearList = getDateTypeList({
      maxDate,
      minDate,
      type: 'year' as OpUnitType,
    })

    return { week: weekList, month: monthList, year: yearList }
  }, [maxDate, minDate])

  const handleChangeDate = (value: number) => {
    setDateList({ ...dateList, [dateType.value]: value })
  }
  const data = useMemo(() => {
    const res = getBillListByConditions(allBillList, date, {
      type: Number(type),
      classify_id: classify_id,
      date_type: dateType.value,
    })

    return res
  }, [dateType, type, date, allBillList])

  const rankList = useMemo(
    () => getRankList({ data, sortType }),
    [data, sortType]
  )

  const [headerHeight, setHeaderHeight] = useState(0)
  const [lineChartExtra, setLineChartExtra] = useState(0)
  const [emptyHeight, setEmptyHeight] = useState(100)
  const [listHeadHeight, setListHeadHeight] = useState(0)
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          height: emptyHeight - listHeadHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={require('@/assets/images/new_empty.png')}
          style={{ width: ms(60), height: ms(60) }}
        />
        <Text style={{ color: '#ccc', marginTop: ms(10) }}>暂无数据</Text>
      </View>
    )
  }

  const handleSortTypeChange = useCallback((value: number) => {
    setSortType(value)
  }, [])

  const handleItemPress = useCallback(
    (id: number) => {
      navigation.navigate('billDetail', { id })
    },
    [navigation]
  )

  const handleListLayout = useCallback(({ nativeEvent }: any) => {
    const { height } = nativeEvent.layout
    setEmptyHeight(height)
  }, [])

  const handleHeaderLayout = useCallback(({ nativeEvent }: any) => {
    const { height } = nativeEvent.layout
    setListHeadHeight(height)
  }, [])

  const headerComponent = useMemo(
    () => (
      <ListHeader
        data={data}
        date={date}
        dateType={dateType}
        type={type}
        sortType={sortType}
        onSortTypeChange={handleSortTypeChange}
        onLayout={handleHeaderLayout}
        lineChartExtra={lineChartExtra + headerHeight}
      />
    ),
    [
      data,
      date,
      dateType,
      type,
      handleSortTypeChange,
      handleHeaderLayout,
      lineChartExtra,
      headerHeight,
    ]
  )

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <RankItem
        item={item}
        index={index}
        onPress={() => handleItemPress(item.id)}
      />
    ),
    [handleItemPress]
  )

  const headerObj = {
    backgroundColor: themeGreenColor,
    title: label,
  }
  // useEffect(() => {
  //   navigation.setOptions({
  //     gestureEnabled: false
  //   });
  // }, [navigation])
  return (
    <PageView headerObj={headerObj} getHeaderHeight={setHeaderHeight}>
      <View
        onLayout={({ nativeEvent }) => {
          setLineChartExtra(nativeEvent.layout.height)
        }}
      >
        <View style={[styles.topContainer]}>
          <View style={styles.dateTypeBtnGroup}>
            {dateTypeList.map((item, index) => (
              <Pressable
                key={item.label}
                style={[
                  styles.dateTypeBtn,
                  index === 1 && styles.dateTypeBtn1,
                  item.value === dateType.value && {
                    backgroundColor: primaryTextColor,
                  },
                ]}
                onPress={() => setDateType(item)}
              >
                <Text
                  style={[
                    styles.dateTypeBtnText,
                    item.value === dateType.value && { color: themeGreenColor },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.listBox}>
          {dateTypeList.map((ele, i) => {
            const isActive = ele.value === dateType.value
            return (
              <View
                key={ele.label}
                style={[styles.dateList, isActive && { zIndex: 2 }]}
              >
                <ListForDateType
                  list={list[ele.value as keyof typeof list]}
                  onChange={handleChangeDate}
                  dateType={ele.value as OpUnitType}
                  date={dateList[ele.value as keyof typeof dateList]}
                />
              </View>
            )
          })}
        </View>
      </View>

      <FlatList
        style={{ flex: 1 }}
        renderItem={renderItem}
        data={rankList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={headerComponent}
        ListEmptyComponent={ListEmptyComponent}
        onLayout={handleListLayout}
      />
    </PageView>
  )
})

const RankItem = memo(({ item, index, onPress }: any) => {
  const { amount, classify, percentage, ratioToMax, date } = item || {}
  const { color_icon, label } = classify || {}
  return (
    <BounceButton style={styles.rankItem} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Image src={configs.BASE_URL + color_icon} style={styles.icon} />
      </View>
      <View style={[styles.reankContent, index === 0 && { borderTopWidth: 0 }]}>
        <View style={styles.rankContentTop}>
          <Text style={styles.classifyLabel}>
            {label}
            <Text style={styles.percentage}>
              {'   '}
              {percentage}
            </Text>
          </Text>
          <Text style={styles.classifyValue}>{transformMoney(amount)}</Text>
        </View>
        <View style={[styles.proportionLine, { width: ratioToMax }]}></View>
        <Text style={styles.dateFormat}>
          {dayjs(date).format('YYYY年MM月DD日')}
        </Text>
      </View>
    </BounceButton>
  )
})

const ListHeader = memo(
  ({
    data,
    date,
    dateType,
    type,
    onSortTypeChange,
    onLayout,
    lineChartExtra,
  }: any) => {
    return (
      <View onLayout={onLayout}>
        <LineChart
          data={data}
          currentDate={date}
          dateType={dateType.value}
          type={type}
          extraHeight={lineChartExtra}
        />
        <View style={styles.rankTitle}>
          <Text style={styles.rankLabel}>
            {Number(type) === 1 ? '支出' : '收入'}排行榜
          </Text>
          <CustomeSwitch onChange={onSortTypeChange} />
        </View>
      </View>
    )
  }
)

export default ClassifyBillChartPage
