import React, { useState, useMemo, useEffect } from 'react'
import {
  View,
  Text,
  useWindowDimensions,
  Dimensions,
  FlatList,
} from 'react-native'
import styles from './styles'
import { PageView, BounceButton, ModalDate } from '@/components'
import { Icon } from 'react-native-elements'
import { ms, ScaledSheet } from 'react-native-size-matters'
import dayjs from '@/utils/dayjs'
import {
  transformMoney,
  getBillListByConditions,
  reBuildBillList,
  getState,
} from '@/utils'
// import { useNavigation } from '@react-navigation/native'
import {
  backgroundColor,
  blockColor9,
  lineColor,
  primaryTextColor,
} from '@/contents/theme'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { BillListForDetailPageData } from '@/store/slices/billSlice'

interface ItemComponentProps {
  item: BillListForDetailPageData
  index?: number
}
//账单页
const BillPage = ({ navigation }: any) => {
  const [visible, setVisible] = useState(false)
  const { allBillList } = useSelector((state: RootState) => state.bill) //获取所有的账单
  const [date, setDate] = useState<number>(dayjs().valueOf())
  const year = useMemo(() => dayjs(date).year(), [date])
  const [type, setType] = useState('month')
  const list: BillListForDetailPageData[] = useMemo(() => {
    const date_type = type === 'month' ? 'year' : ''
    const res = getBillListByConditions(allBillList, date, {
      type: null,
      date_type,
      classify_id: null,
    })
    const res1 = reBuildBillList(res, type)
    return res1
  }, [allBillList, type, date])

  const incomeTotal = useMemo(() => {
    return list.reduce((acc, item) => acc + item.summary.income, 0)
  }, [list])
  const expenseTotal = useMemo(() => {
    return list.reduce((acc, item) => acc + item.summary.expense, 0)
  }, [list])

  const handleCheckBill = (item: BillListForDetailPageData) => {
    if (type === 'year') return
    navigation.navigate('statisticsByMonth', { item })
  }

  const handleChangeDate = () => {
    ModalDate.picker({
      value: date,
      mode: 'year',
      title: '选择年份',
    }).then((res) => {
      setDate(dayjs(res).valueOf())
    })
  }

  const Item = ({ item, index }: ItemComponentProps) => {
    const { id, summary } = item || {}
    const { date, income, expense } = summary || {}
    return (
      <BounceButton
        style={[styles.billContent, index === 0 && { borderTopWidth: 0 }]}
        key={index}
        onPress={() => handleCheckBill(item)}
      >
        <Text style={styles.billContentText}>
          {type === 'month'
            ? `${dayjs(date).format('MM')}月`
            : `${dayjs(date).format('YYYY')}年`}
        </Text>

        <Text style={styles.billContentText}>
          {transformMoney(income)}
          {/* {item.income} */}
        </Text>
        <Text style={styles.billContentText}>{transformMoney(expense)}</Text>
        <Text style={styles.billContentText}>
          {transformMoney(income - expense)}
        </Text>
        <View style={styles.billContentRight}>
          {type === 'month' && (
            <Icon
              name={'chevron-right'}
              color={'#d9d9d9'}
              size={ms(16)}
              type="feather"
            />
          )}
        </View>
      </BounceButton>
    )
  }

  const ListHeaderComponent = () => {
    return (
      <View style={styles.content}>
        <View style={styles.topCard}>
          <Text style={styles.topCardText}>
            {type === 'month' ? '年结余' : '总结余'}
          </Text>
          <Text style={styles.balanceText}>
            {transformMoney(incomeTotal - expenseTotal)}
          </Text>
          <View style={styles.topCardRight}>
            <Text style={styles.topCardRightText}>
              {type === 'month' ? '年收入' : '总收入'}{' '}
              <Text style={styles.topCardRightTextValue}>
                {transformMoney(incomeTotal)}
              </Text>
            </Text>
            <Text style={styles.topCardRightText}>
              {type === 'month' ? '年支出' : '总支出'}{' '}
              <Text style={styles.topCardRightTextValue}>
                {transformMoney(expenseTotal)}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.billTitle}>
          <Text style={styles.billTitleText}>
            {type === 'month' ? '月份' : '年份'}
          </Text>
          <Text style={styles.billTitleText}>
            {type === 'month' ? '月收入' : '年收入'}
          </Text>
          <Text style={styles.billTitleText}>
            {type === 'month' ? '月支出' : '年支出'}
          </Text>
          <Text style={styles.billTitleText}>
            {type === 'month' ? '月结余' : '年结余'}
          </Text>
        </View>
      </View>
    )
  }

  const ListFooterComponent = () => {
    if (type === 'year') {
      return (
        <Text style={styles.billYearHintText}>年账单为自然年(1月-12月)</Text>
      )
    }
    return null
  }
  const renderCenterComponent = () => {
    return (
      <View style={styles.centerComponent}>
        <BounceButton
          onPress={() => setType('month')}
          style={type === 'month' ? styles.centerBtnActive : styles.centerBtn}
        >
          <Text
            style={
              type === 'month'
                ? styles.centerBtnTextActive
                : styles.centerBtnText
            }
          >
            月账单
          </Text>
        </BounceButton>
        <BounceButton
          onPress={() => setType('year')}
          style={type === 'year' ? styles.centerBtnActive : styles.centerBtn}
        >
          <Text
            style={
              type === 'year'
                ? styles.centerBtnTextActive
                : styles.centerBtnText
            }
          >
            年账单
          </Text>
        </BounceButton>
      </View>
    )
  }

  const renderRightComponent = () => {
    return (
      <BounceButton style={styles.rightComponent} onPress={handleChangeDate}>
        <Text style={styles.rightText}>{`${year}年`}</Text>
        <Icon
          name={'triangle-down'}
          color={primaryTextColor}
          size={ms(16)}
          type="entypo"
        />
      </BounceButton>
    )
  }

  const headerObj = {
    rightComponent: type === 'month' ? renderRightComponent() : null,
    centerComponent: renderCenterComponent(),
  }
  return (
    <PageView headerObj={headerObj}>
      <FlatList
        style={{ flex: 1, backgroundColor: 'white' }}
        data={list}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
      />
    </PageView>
  )
}
export default BillPage
