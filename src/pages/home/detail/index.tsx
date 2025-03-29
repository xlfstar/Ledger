import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import dayjs from '@/utils/dayjs'
import {
  ModalDate,
  Image,
  PageView,
  BounceButton,
  MoneyText,
  Toast,
  SampleSectionList,
  SwipeableView,
} from '@/components'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { themeGreenColor, primaryTextColor } from '@/contents/theme'
import LinearGradient from 'react-native-linear-gradient'
import { shadow } from '@/contents'
import { Logo } from '@/assets/home'
import {
  iconOpenEye,
  iconCloseEye,
  iconBill,
  iconAssetsManager,
  iconMore,
  iconBudget,
} from '@/assets/icon'
import { ms } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import {
  fetchBillsForDetailPage,
  BillListForDetailPageData,
  setCurrentDateForIndexPage,
} from '@/store/slices/billSlice'
import { getBillList, BillListRequest, BillItemProps } from '@/api/bill'
import {
  reBuildBillList,
  getLocalWeekday,
  transformMoney,
  getBillListByConditions,
} from '@/utils'
import SwipeItem from './components/Item'
import { useFocusEffect } from '@react-navigation/native'
import configs from '@/configs'

const barList = [
  {
    label: '账单',
    icon: iconBill,
    path: 'bill',
  },
  {
    label: '预算',
    icon: iconBudget,
    path: 'budget',
  },

  {
    label: '资产管理',
    icon: iconAssetsManager,
    path: 'assetsManager',
  },
  {
    label: '更多',
    icon: iconMore,
    path: 'test',
  },
]
interface SectionProps {
  section: any
  index?: number
}
const ListSectionHeaderComponent = ({ section, index }: SectionProps) => {
  const { summary } = section || {}
  const { date, expense, income } = summary || {}
  return (
    <View
      style={[styles.sectionHeader, index === 0 && styles.firstSectionHeader]}
    >
      <View style={styles.headerLeft}>
        <Text style={styles.headerLabel}>{dayjs(date).format('MM月DD日')}</Text>
        <Text style={[styles.headerLabel, { marginLeft: ms(5) }]}>
          {getLocalWeekday(date)}
        </Text>
      </View>
      <View style={styles.headerLeft}>
        {!!income && (
          <Text style={styles.headerLabel}>收入：{transformMoney(income)}</Text>
        )}
        {!!expense && (
          <Text style={[styles.headerLabel, { marginLeft: ms(10) }]}>
            支出：{transformMoney(expense)}
          </Text>
        )}
      </View>
    </View>
  )
}
const DetailPage = ({ navigation, route }: any) => {
  // const { refresh } = route.params || {}

  const dispatch = useDispatch<AppDispatch>()
  const [showDetail, setShowDetail] = useState<boolean>(true)
  const { isLogin, user, token } = useSelector((state: RootState) => state.auth)
  const {
    allBillList,
    billListForDetailPage: data,
    currentDate: date,
  } = useSelector((state: RootState) => state.bill)

  const list = useMemo(() => {
    const res = getBillListByConditions(allBillList, date, {
      type: null,
      classify_id: null,
      date_type: 'month',
    })
    return reBuildBillList(res, 'day')
  }, [allBillList, date])

  // useEffect(() => {
  //   const params: BillListRequest = {
  //     user_id: user?.id,
  //     start_date: dayjs(date).startOf('month').valueOf(),
  //     end_date: dayjs(date).endOf('month').valueOf(),
  //   }
  //   user?.id && dispatch(fetchBillsForDetailPage(params))
  // }, [date, user])

  const yearAndMonth = useMemo(() => {
    return [dayjs(date).year(), dayjs(date).month() + 1]
  }, [date])
  //统计当前月的支出和收入
  const currentTotal = useMemo(() => {
    const totalIncome = list.reduce(
      (sum: number, item: BillListForDetailPageData) =>
        sum + item.summary.income,
      0
    )
    const totalExpense = list.reduce(
      (sum: number, item: BillListForDetailPageData) =>
        sum + item.summary.expense,
      0
    )
    return { totalIncome, totalExpense }
  }, [list, user])

  const handleChangeDate = () => {
    ModalDate.picker({
      value: date,
      mode: 'month',
      title: '选择日期',
    }).then((res) => {
      dispatch(setCurrentDateForIndexPage(dayjs(res).valueOf()))
    })
  }

  const handleSearch = () => {}
  const handleClickBar = (item: any) => {
    navigation.navigate(item.path)
  }
  const headerObj = {
    backgroundColor: themeGreenColor,
    leftComponent: <View></View>,
    centerComponent: <Image src={Logo} style={styles.logo} />,
    rightComponent: (
      <BounceButton onPress={handleSearch} style={styles.searchButton}>
        <Icon
          type="feather"
          name="search"
          color={primaryTextColor}
          size={ms(24)}
        />
      </BounceButton>
    ),
  }

  const handleChangeMonth = (type: number) => {
    if (type === 1) {
      if (dayjs().isAfter(dayjs(date), 'month')) {
        dispatch(
          setCurrentDateForIndexPage(dayjs(date).add(1, 'month').valueOf())
        )
      } else {
        Toast.showWarn('已经到当前月')
      }
    } else {
      dispatch(
        setCurrentDateForIndexPage(dayjs(date).subtract(1, 'month').valueOf())
      )
    }
  }
  console.log('---configs', configs)

  return (
    <PageView headerObj={headerObj}>
      <View style={styles.pageTop}>
        <BounceButton style={styles.pageTopItemDate} onPress={handleChangeDate}>
          <Text style={styles.topItemLabel}>{yearAndMonth[0]}年</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Text style={styles.topItemValueBig}>{yearAndMonth[1]}</Text>
            <Text style={styles.pageTopItemSmall}>月</Text>
            <Icon
              name={'triangle-down'}
              color={primaryTextColor}
              size={ms(16)}
              type="entypo"
            />
            <View style={styles.diviver}></View>
          </View>
        </BounceButton>
        <BounceButton style={styles.pageTopItem}>
          <Text style={styles.topItemLabel}>收入</Text>
          {showDetail ? (
            <MoneyText number={currentTotal?.totalIncome || 0} />
          ) : (
            <Text>****</Text>
          )}
        </BounceButton>
        <BounceButton style={styles.pageTopItem}>
          <Text style={styles.topItemLabel}>支出</Text>
          {showDetail ? (
            <MoneyText number={currentTotal?.totalExpense || 0} />
          ) : (
            <Text>****</Text>
          )}
        </BounceButton>
        <BounceButton
          style={styles.pageTopItemEye}
          onPress={() => setShowDetail(!showDetail)}
        >
          <Image
            src={showDetail ? iconOpenEye : iconCloseEye}
            style={styles.eyeIcon}
          />
        </BounceButton>
      </View>
      <LinearGradient
        colors={['#95d475', '#f8f8f8']}
        style={styles.linearGradient}
      >
        <View style={styles.topBarContainer}>
          <View style={[styles.topBar, { ...shadow() }]}>
            {barList.map((item, index) => (
              <BounceButton
                onPress={() => handleClickBar(item)}
                style={styles.topBarItem}
                key={index}
              >
                <Image src={item.icon} style={styles.topBarItemIcon} />
                <Text style={styles.topBarItemText}>{item.label}</Text>
              </BounceButton>
            ))}
          </View>
        </View>
      </LinearGradient>
      <View style={{ height: ms(10) }}></View>

      <SampleSectionList
        data={list}
        onRefresh={() => handleChangeMonth(1)}
        onLoadMore={() => handleChangeMonth(2)}
        ListSectionHeaderComponent={({ section, index }) => (
          <ListSectionHeaderComponent section={section} index={index} />
        )}
        renderItem={({ item, index }) => (
          <SwipeItem
            key={item.id}
            item={item}
            index={index}
            onDelete={() => {}}
            onPress={() => {}}
          />
        )}
      />
    </PageView>
  )
}
export default DetailPage
