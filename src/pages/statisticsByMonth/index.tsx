import React, { useState,useMemo } from 'react'
import styles from './styles'
import { View, Text, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { PageView, BounceButton, Image } from '@/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ms } from 'react-native-size-matters'
import dayjs from '@/utils/dayjs'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getBillListByConditions, transformMoney } from '@/utils'

import { BillListForDetailPageData } from '@/store/slices/billSlice'
import ExpenseBox from './componets/ExpenseBox'
import ExpenseTrend from './componets/ExpenseTrend'
import ExpenseContrast from './componets/ExpenseContrast'



const StatisticsByMonth = ({ navigation, route }: any) => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { allBillList } = useSelector((state: RootState) => state.bill)
  //获取上月数据

  const daysInApp = useMemo(() => {
    if (user?.createdAt) {
      return dayjs().diff(user?.createdAt, 'day') + 1
    }
    return 1
  }, [user])
  const { item } = route.params || {}

  const { data, id: date, summary }: BillListForDetailPageData = item || {}
  const prevMonthBalance = useMemo(() => {
    const prevMonthDate = dayjs(date).subtract(1, 'month').valueOf()
    const array = getBillListByConditions(allBillList, prevMonthDate, {
      type: null,
      classify_id: null,
      date_type: 'month',
    })
    const balance = array.reduce((sum, item) => {
      if (Number(item.type) === 1) {
        sum -= Number(item.amount)
      } else {
        sum += Number(item.amount)
      }
      return sum
    }, 0)
    return balance
  }, [date])

  const { expense = 0, income = 0 } = summary || {}
  const [title, setTitle] = useState('')
  const pageTitle = dayjs(date).format('YYYY年MM月账单')
  const insets = useSafeAreaInsets()
  const scrollY = useSharedValue(0)
  const handleScroll = ({
    nativeEvent,
  }: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
    const { contentOffset } = nativeEvent || {}
    scrollY.value = contentOffset.y
    if (contentOffset.y > 80) {
      setTitle(pageTitle)
    } else {
      setTitle('')
    }
  }
  const expenseAndIncomeWidth = useMemo(() => {
    const maxWidth = ms(150)
    if (expense >= income && expense > 0) {
      const w = maxWidth * (income / expense)
      return [maxWidth, w]
    } else {
      const w = maxWidth * (expense / income)
      return [w, maxWidth]
    }
  }, [item])

  const handleShowMore = ()=>{
    navigation.navigate('expenseListByMonth',{date})
  }

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [0, 1])
    return { opacity }
  })
  const PageHeader = () => {
    return (
      <View
        style={[
          styles.pageHeader,
          { paddingTop: insets.top + ms(11), height: ms(55) + insets.top },
        ]}
      >
        <BounceButton
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon
            type="feather"
            name="chevron-left"
            size={ms(30)}
            color={'black'}
          />
        </BounceButton>
        <View style={[styles.pageTitle, { top: ms(11) + insets.top }]}>
          <Text style={styles.pageTitleText}>{title}</Text>
        </View>

        <Animated.View style={[styles.headerBg, headerStyle]}></Animated.View>
      </View>
    )
  }

  return (
    <PageView headerHide style={{ backgroundColor: '#F2F6FC' }}>
      <PageHeader />
      <ScrollView
        style={{ flex: 1, paddingHorizontal: ms(16) }}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topContainer}>
          <View style={styles.userInfo}>
            <Image
              style={styles.avatar}
              src={user?.avatar || require('@/assets/images/avatar.png')}
            />
            <Text>{user?.nickname || '游客'}</Text>
          </View>
          <Text style={styles.billDate}>{dayjs(date).format('MM月账单')}</Text>
          <Text style={styles.slog}>
            这是我和小熊记账相识的第
            <Text
              style={{
                fontSize: ms(16),
                fontWeight: 600,
                color: '#000',
                marginHorizontal: ms(5),
              }}
            >
              {` ${daysInApp} `}
            </Text>
            天
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <View style={styles.summarTop}>
            <View style={styles.summaryTopView}>
              <Text style={styles.summaryTopLabel}>本月结余</Text>
              <Text style={styles.summaryTopLabel}>上月结余</Text>
            </View>
            <View style={styles.summaryTopView}>
              <Text style={styles.summaryTopValue}>
                {transformMoney(income - expense)}
              </Text>
              <Text style={[styles.summaryTopValue, { color: '#Afafaf' }]}>
                {transformMoney(prevMonthBalance)}
              </Text>
            </View>
          </View>
          <View style={styles.summarContent}>
            <View style={styles.suammryInfo}>
              <Text style={styles.summaryLabel}>支出</Text>
              <View style={styles.summaryLineView}>
                <View
                  style={[
                    styles.summaryLine,
                    { width: expenseAndIncomeWidth[0] },
                  ]}
                ></View>
                <Text style={styles.summaryAmount}>
                  {transformMoney(expense)}
                </Text>
              </View>
            </View>
            <View style={styles.suammryInfo}>
              <Text style={styles.summaryLabel}>收入</Text>
              <View style={styles.summaryLineView}>
                <View
                  style={[
                    styles.summaryLine,
                    { width: expenseAndIncomeWidth[1] },
                  ]}
                ></View>
                <Text style={styles.summaryAmount}>
                  {transformMoney(income)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ExpenseBox data={data} onPress={handleShowMore} />
        <ExpenseTrend data={item} />
        <ExpenseContrast date={date}/>
        <View style={[styles.summaryBox,{marginBottom:ms(60)}]}>
          <Text style={styles.boxTitle}>记账成就</Text>
          <View style={styles.achievement}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementItemValue}>
                1
                <Text style={{fontSize:ms(10)}}>天</Text>
              </Text>
              <Text style={styles.achievementItemLabel}>已连续打卡</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementItemValue}>
                {daysInApp}
              <Text style={{fontSize:ms(10)}}>天</Text>
              </Text>
              <Text style={styles.achievementItemLabel}>记账总天数</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementItemValue}>{allBillList.length}
                <Text style={{fontSize:ms(10)}}>笔</Text>
              </Text>
              <Text style={styles.achievementItemLabel}>记账总笔数</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </PageView>
  )
}
export default StatisticsByMonth
