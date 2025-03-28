import React from "react";
import {View,Text} from 'react-native'
import { Image } from "@/components";
import styles from '../../styles'
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { transformMoney } from "@/utils";
import {Icon} from 'react-native-elements'
import configs from "@/configs";

const ExpenseContrast = ({date=dayjs().format('YYYY-MM')})=>{

  const currentMonth = dayjs(date).format('M月')
  const prevMonth = dayjs(date).subtract(1,'month').format('M月')
  const {allBillList} = useSelector((state:RootState)=>state.bill)
  const monthlyExpenses = React.useMemo(() => {
    // Get last 6 months including current month
    const months = Array.from({length: 6}, (_, i) => {
      return dayjs(date).subtract(i, 'month').format('YYYY-MM')
    }).reverse()

    // Calculate expenses for each month
    const expenseData = months.map(monthDate => {
      const startOfMonth = dayjs(monthDate).startOf('month').valueOf()
      const endOfMonth = dayjs(monthDate).endOf('month').valueOf()
      
      const monthExpense = allBillList.reduce((sum, bill) => {
        let {date:billDate} = bill || {}
        billDate = billDate || dayjs().valueOf()
        if (billDate >= startOfMonth && 
          billDate <= endOfMonth && 
            Number(bill.type) == 1) {
          return sum + Number(bill.amount)
        }
        return sum
      }, 0)

      return {
        month: dayjs(monthDate).format('M月'),
        expense: monthExpense
      }
    })

    // Find max expense
    const maxExpense = Math.max(...expenseData.map(d => d.expense))

    // Calculate percentages based on max
    return expenseData.map(data => ({
      ...data,
      percentage: maxExpense ? (data.expense / maxExpense) * 100 : 0
    }))

  }, [date, allBillList])

  const expenseByCategory = React.useMemo(() => {
    // Get current and previous month dates
    const currentMonth = dayjs(date)
    const prevMonth = currentMonth.subtract(1, 'month')
    
    // Get date ranges
    const currentStart = currentMonth.startOf('month').valueOf()
    const currentEnd = currentMonth.endOf('month').valueOf()
    const prevStart = prevMonth.startOf('month').valueOf()
    const prevEnd = prevMonth.endOf('month').valueOf()

    // Group expenses by category for current month
    const currentExpenses = allBillList.reduce((acc, bill) => {
      let {date:billDate} = bill || {}
      billDate = billDate || dayjs().valueOf()
      if (billDate >= currentStart && 
        billDate <= currentEnd && 
          Number(bill.type) === 1) {
        const classifyId = bill.classify_id || 0
        acc[classifyId] = {
          amount: (acc[classifyId]?.amount || 0) + Number(bill.amount),
          label: bill.classify?.label || '',
          colorIcon: bill.classify?.color_icon || ''
        }
      }
      return acc
    }, {} as {[key: number]: {amount: number, label: string, colorIcon: string}})

    // Group expenses by category for previous month  
    const prevExpenses = allBillList.reduce((acc, bill) => {
      let {date:billDate} = bill || {}
      billDate = billDate || dayjs().valueOf()
      if (billDate >= prevStart && 
        billDate <= prevEnd && 
          Number(bill.type) === 1) {
        const classifyId = bill.classify_id || 0
        acc[classifyId] = {
          amount: (acc[classifyId]?.amount || 0) + Number(bill.amount),
          label: bill.classify?.label || '',
          colorIcon: bill.classify?.color_icon || ''
        }
      }
      return acc
    }, {} as {[key: number]: {amount: number, label: string, colorIcon: string}})

    // Calculate changes
    const allCategories = [...new Set([
      ...Object.keys(currentExpenses), 
      ...Object.keys(prevExpenses)
    ])]

    const allChanges = allCategories.map(categoryId => {
      const numCategoryId = Number(categoryId)
      const change = (currentExpenses[numCategoryId]?.amount || 0) - (prevExpenses[numCategoryId]?.amount || 0)
      if(change === 0) return null
      
      return {
        categoryId: numCategoryId,
        label: currentExpenses[numCategoryId]?.label || prevExpenses[numCategoryId]?.label || '',
        colorIcon: currentExpenses[numCategoryId]?.colorIcon || prevExpenses[numCategoryId]?.colorIcon || '',
        current: currentExpenses[numCategoryId]?.amount || 0,
        previous: prevExpenses[numCategoryId]?.amount || 0,
        change
      }
    }).filter(Boolean)

    // Sort by absolute change value and get top 3
    return allChanges
      .sort((a, b) => Math.abs(b?.change||0) - Math.abs(a?.change||0))
      .slice(0, 3)

  }, [date, allBillList])

  
  
  return(
    <View style={styles.summaryBox}>
      <Text style={styles.boxTitle}>月支出对比</Text>
      <View style={styles.barChartBox}>
        {monthlyExpenses.map((item,index)=>{
          return (
            <View style={[styles.barChartItem]} key={index}>
              <Text style={styles.barValue}>{transformMoney(item.expense,2,true,false)}</Text>
              <View style={[styles.barChartItemBg,{height:`${item.percentage}%`}]}>
              
              </View>
              <Text style={styles.barLabel}>{item.month}</Text>
            </View>
          )
        })}
      </View>
      <View style={styles.contrastBox}>
        <Text style={styles.contrastBoxTitle}>{`${currentMonth}对比${prevMonth}变化前三的类别`}</Text>
        {expenseByCategory.map((item,index)=>(
          <View style={styles.rankItem} key={index}>
          <Text style={styles.rankId}>{index + 1}</Text>
          <View style={styles.iconCircle}>
            <Image style={styles.icon} src={configs.BASE_URL + item?.colorIcon} />
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemLabel}>{item?.label}</Text>
            
          </View>
          <View style={styles.contrastItemRight}>
            {/* <Icon 
              type='font-awesome-5' 
              name={(item?.change || 0)>0?'arrow-up':'arrow-down'} 
              color={(item?.change || 0)>0?'red':'green'}
              size={14}
            /> */}
            <Image src={(item?.change || 0)>0?require('@/assets/images/arrow-up.png'):require('@/assets/images/arrow-down.png')}
              style={styles.upAndDown}
            />
            <Text style={styles.contrastText}>{(item?.change || 0)>0?'增长':'降低'}</Text>
            <Text style={styles.itemAmount}>{transformMoney(Math.abs(item?.change || 0),2,true,false)}</Text>
          </View>
          
        </View>
        ))}
      </View>
    </View>
  )
}

export default ExpenseContrast