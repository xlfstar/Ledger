import React, { useMemo, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { Image, PageView } from '@/components'
import configs from '@/configs'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getBillListByConditions, transformMoney } from '@/utils'
import {
  pageBg,
  themeGreenColor,
  blockColor9,
  lineColor,
} from '@/contents/theme'
import { BillItemProps } from '@/api/bill'

const ExpenseListByMonth = ({ route }: any) => {
  const { date = undefined } = route.params || {}
  const { allBillList } = useSelector((state: RootState) => state.bill)

  const data = useMemo(
    () =>
      getBillListByConditions(allBillList, dayjs(date).valueOf(), {
        type: 1,
        classify_id: null,
        date_type: 'month',
      }).sort((a,b)=>(b.amount || 0)- (a.amount ||0))
   , [date, allBillList]
  )
  const title = `${dayjs(date).format('YYYY年M月')}支出排行`
  const headerObj = {
    backgroundColor: themeGreenColor,
    centerComponent:<Text style={{fontSize:ms(18),color:'#000'}}>{title}</Text>
  }
  return (
    <PageView headerObj={headerObj}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <Item item={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </PageView>
  )
}

const Item = ({ item }: {item:BillItemProps}) => {
  return (
    <View style={styles.rankItem}>
      <View style={styles.iconCircle}>
        <Image
          style={styles.icon}
          src={configs.BASE_URL + item.classify.color_icon}
        />
      </View>
      <View style={styles.itemInfo}>
        <View style={styles.itemText}>
          <Text style={styles.itemLabel}>{item.classify.label}</Text>
          <Text style={styles.itemDate}>
            {dayjs(item.date).format('MM月D日')}
          </Text>
        </View>
        <Text style={styles.itemAmount}>-{transformMoney(item.amount,2,true,false)}</Text>
      </View>
    </View>
  )
}
const styles = ScaledSheet.create({
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    borderBottomColor: lineColor,
    borderBottomWidth: 0.5,
    paddingRight:ms(16)
  },

  iconCircle: {
    width: ms(30),
    height: ms(30),
    borderRadius: ms(30),
    backgroundColor: lineColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: ms(15),
  },
  icon: {
    width: ms(20),
    height: ms(20),
  },
  itemText: {
    justifyContent: 'center',
    flex: 1,
    paddingVertical: ms(10),
    
  },
  itemLabel: {
    fontSize: ms(12),
  },
  itemDate: {
    fontSize: ms(10),
    color: blockColor9,
  },
  itemAmount: {
    fontSize: ms(12),
    fontWeight: 500,
    color: 'black',
  },
})
export default ExpenseListByMonth
