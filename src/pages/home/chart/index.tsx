// 导入必要的依赖
import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import {
  BounceButton,
  PageView,
  Image,
  LineChart,
  ListForDateType,
  ModalCheck
} from '@/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {
  getBillListByConditions,
  transformMoney,
  getDateTypeList,
  getRankList
} from '@/utils'
import dayjs from '@/utils/dayjs'
import { themeGreenColor, primaryTextColor } from '@/contents/theme'
import { OpUnitType } from 'dayjs'
import { ms } from 'react-native-size-matters'
import configs from '@/configs'
import type { ItemObj } from '@/components/ModalCheck'
import styles from './styles'

// 账单类型列表
const typeList = [
  {
    label: '支出',
    value: 1,
    icon:require('@/assets/images/expense.png')
  },
  {
    label: '收入',
    value: 2,
    icon:require('@/assets/images/income.png')
  },
]

// 日期类型列表
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

// 排行榜单项组件
const RankItem = ({
  item,
  index,
  onPress = () => {},
}: {
  item: any
  index: number
  onPress: () => void
}) => {
  const { amount, classify, percentage, ratioToMax } = item || {}
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
      </View>
    </BounceButton>
  )
}

// 图表页面主组件
const ChartPage = ({ navigation }: any) => {
  // 状态管理
  // const [visible, setVisible] = useState(false) // 控制类型选择弹窗显示
  // const [headerHeight, setHeaderHeight] = useState(0) // 头部高度
  // const insets = useSafeAreaInsets() // 安全区域
  const [type, setType] = useState<ItemObj>(typeList[0]) // 当前账单类型
  const [dateType, setDateType] = useState(dateTypeList[0]) // 当前日期类型
  const { allBillList, maxDate, minDate } = useSelector(
    (state: RootState) => state.bill
  )

  // 根据最大最小日期生成日期列表
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
  }, [maxDate, minDate, type])

  // 初始化日期列表
  const initDateList = {
    week: dayjs(maxDate).valueOf(),
    month: dayjs(maxDate).valueOf(),
    year: dayjs(maxDate).valueOf(),
  }
  const [dateList, setDateList] = useState<{ [key: string]: number }>(
    initDateList
  )
  const date = useMemo(() => {
    return dateList[dateType.value]
  }, [dateList, dateType])

  // 日期变更处理
  const handleChangeDate = (value: number) => {
    setDateList({ ...dateList, [dateType.value]: value })
  }

  // 根据条件获取账单数据
  const data = useMemo(() => {
    const res = getBillListByConditions(allBillList, dayjs(date).valueOf(), {
      type: type.value,
      classify_id: null,
      date_type: dateType.value,
    })
    return res
  }, [dateType, type, date, allBillList])

  // 计算排行榜数据

  const rankList= useMemo(()=>{
    return getRankList({data,sortType:0})
  },[data])

  // 类型选择确认处理
  // const handleConfirmType = (e: any) => {
  //   if (e.value === type.value) return
  //   setType(e)
  //   setVisible(false)
  // }



  // 渲染类型选择弹窗内容
  // const renderModalTypeChildren = () => {
  //   return (
  //     <View>
  //       {typeList.map((item, index) => {
  //         const { label, value } = item
  //         const isActive = type.value === value
  //         const iconSrc =
  //           index === 0
  //             ? require('@/assets/images/expense.png')
  //             : require('@/assets/images/income.png')
  //         return (
  //           <Pressable
  //             style={styles.typeItem}
  //             onPress={() => handleConfirmType(item)}
  //             key={label}
  //           >
  //             <Image src={iconSrc} style={styles.typeItemIcon} />
  //             <View
  //               style={[
  //                 styles.typeItemText,
  //                 index === 0 && styles.typeItemText1,
  //               ]}
  //             >
  //               <Text>{label}</Text>
  //               {isActive && (
  //                 <Icon
  //                   name={'check'}
  //                   color={'#000'}
  //                   size={ms(18)}
  //                   type="antdesign"
  //                 />
  //               )}
  //             </View>
  //           </Pressable>
  //         )
  //       })}
  //     </View>
  //   )
  // }

  // 控制类型选择弹窗显示/隐藏
  // useEffect(() => {
  //   if (visible) {
  //     ModalType.show({
  //       children: renderModalTypeChildren(),
  //       height: headerHeight,
  //     })
  //   } else {
  //     ModalType.hide()
  //   }
  // }, [visible])

  // 列表相关状态
  const [lineChartExtra, setLineChartExtra] = useState(0)
  const [listHeadHeight, setListHeadHeight] = useState(0)
  const [emptyHeight, setEmptyHeight] = useState(100)

  // 列表头部组件
  const ListHeaderComponent = () => {
    return (
      <View
        onLayout={({ nativeEvent }) => {
          const { height } = nativeEvent.layout
          setListHeadHeight(height)
        }}
      >
        <LineChart
          data={data}
          currentDate={date.valueOf()}
          dateType={dateType.value}
          type={type.value}
          extraHeight={lineChartExtra}
        />
        <Text style={styles.rankLabel}>{type.label}排行榜</Text>
      </View>
    )
  }

  // 空列表组件
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
  
  // 渲染页面
  return (
    <PageView headerHide>
      <View
        onLayout={({ nativeEvent }) => {
          setLineChartExtra(nativeEvent.layout.height)
        }}
      >
        {/* <View
          style={[styles.pageHeader, { paddingTop: insets.top + ms(20) }]}
          onLayout={({ nativeEvent }) => {
            setHeaderHeight(nativeEvent.layout.height)
          }}
        >
          <BounceButton
            style={styles.centerBtn}
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.centerLabel}>{type.label}</Text>
            <Icon
              name={'triangle-down'}
              color={'#000'}
              size={ms(18)}
              type="entypo"
            />
          </BounceButton>
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
                      item.value === dateType.value && {
                        color: themeGreenColor,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View> */}
        <ModalCheck list={typeList} onChange={setType} >
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
                      item.value === dateType.value && {
                        color: themeGreenColor,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalCheck>
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
                  date={dateList[ele.value as keyof typeof dateList].valueOf()}
                />
              </View>
            )
          })}
        </View>
      </View>

      {/* 排行榜列表 */}
      <FlatList
        style={{ flex: 1 }}
        renderItem={({ item, index }) => (
          <RankItem
            item={item}
            index={index}
            onPress={() =>
              navigation.navigate('classifyBill', {
                item,
                dateList,
                dateType,
                type,
              })
            }
          />
        )}
        data={rankList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        onLayout={({ nativeEvent }) => {
          const { height } = nativeEvent.layout
          setEmptyHeight(height)
        }}
      />
    </PageView>
  )
}

export default ChartPage
