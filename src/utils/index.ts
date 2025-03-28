import BigNumber from 'bignumber.js'
import dayjs from '@/utils/dayjs'
import { BillItemProps } from '@/api/bill'
import { AssetsResponse } from '@/api/assets'
import { OpUnitType, Dayjs, ManipulateType } from 'dayjs'
import store from '@/store'
import configs from '@/configs'
/**
 * 获取本地化的星期几文本
 * @param date - 日期时间戳或字符串
 * @returns 返回中文星期几
 */
export const getLocalWeekday = (date: number | string) => {
  const weekday = dayjs(date).day()
  let res = ''
  switch (weekday) {
    case 1:
      res = '星期一'
      break
    case 2:
      res = '星期二'
      break
    case 3:
      res = '星期三'
      break
    case 4:
      res = '星期四'
      break
    case 5:
      res = '星期五'
      break
    case 6:
      res = '星期六'
      break
    case 0:
      res = '星期日'
      break
    default:
      break
  }
  return res
}

/**
 * 将数字转换为金额格式（除以100并保留指定小数位）
 * @param number - 要转换的数字（单位：分）
 * @param fixed - 保留的小数位数，默认为2
 * @param isFixed - 是否强制保留固定小数位数，默认为true
 * @param zero - 当结果是整数时是否需要小数点
 * @returns 格式化后的金额字符串
 */
export const transformMoney = (
  number = 0,
  fixed = 2,
  isFixed = true,
  zero = true
) => {
  if (!number) {
    if (zero) {
      return BigNumber(0).toFixed(fixed)
    }
    return 0
  }
  const temp = BigNumber(number).div(BigNumber(100))

  if (!zero && temp.isInteger()) {
    return temp.toString()
  }

  const res = isFixed ? temp.toFixed(fixed) : temp.dp(fixed).toString()
  return res
}

/**
 * 将小数转换为百分比格式
 * @param value - 要转换的小数值（如0.156表示15.6%）
 * @returns 格式化后的百分比字符串
 */
export const formatPercentage = (value: number) => {
  // 将值转换为百分比
  let percentage = value * 100

  // 判断并格式化输出
  if (percentage < 0.1) {
    return '0%'
  } else if (percentage < 1) {
    return percentage.toFixed(1) + '%'
  } else {
    return Math.round(percentage) + '%'
  }
}

// 资产列表分组累加器接口定义
interface assetsAccProps {
  [key: string | number]: AssetsResponse[]
}

/**
 * 重构资产列表，按父账户ID分组并计算总额
 * @param res - 原始资产数据数组
 * @returns 重构后的资产列表，包含账户信息和明细数据
 */
export const rebuildAssetsList = (res: AssetsResponse[]) => {
  // 按父账户ID分组
  const groupByParentId = res.reduce((acc: assetsAccProps, curr) => {
    const key = curr.account.parent_id || curr.account.id
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(curr)
    return acc
  }, {})

  // 处理分组数据，计算每组总额
  const result = Object.entries(groupByParentId).map(([key, items]) => {
    // 计算该组的总金额
    const total = items.reduce((sum, item) => sum + Number(item.amount), 0)
    const label = items[0].account.name
    const type = items[0].account.type
    return {
      accountData: {
        type,
        label,
        total,
      },
      // 提取每个资产项的关键信息
      data: items,
    }
  })
  return result
}

// 账单分组累加器接口定义
interface accProps {
  [key: string]: BillItemProps[]
}

/**
 * 重构账单列表，按日期分组并计算收支总额
 * @param input - 原始账单数据数组
 * @param type - 日期分组类型(year/month/week/day)
 * @returns 重构后的账单列表，包含日期分组和收支统计
 */
export const reBuildBillList = (input: BillItemProps[] = [], type: string) => {
  const result = []

  // 按日期分组
  let i = 0
  const groupedByDate = input.reduce((acc: accProps, item: BillItemProps) => {
    let key = dayjs(item.date).format('YYYY-MM-DD')
    if (type === 'year') {
      key = dayjs(item.date).format('YYYY')
    } else if (type === 'month') {
      key = dayjs(item.date).format('YYYY-MM')
    } else if (type === 'week') {
      key = `${dayjs(item.date).format('YYYY')}_${dayjs(item.date).week()}`
    } else {
      key = dayjs(item.date).format('YYYY-MM-DD')
    }
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    i++
    return acc
  }, {})

  // 遍历分组数据，计算每日收支总额
  for (const [date, items] of Object.entries(groupedByDate)) {
    // 计算支出总额（type=1表示支出）
    const totalExpense = items.reduce((sum, item) => {
      if (item.type == 1) {
        return sum + Number(item.amount)
      }
      return sum
    }, 0)
    // 计算收入总额（type=2表示收入）
    const totalIncome = items.reduce((sum, item) => {
      if (item.type == 2) {
        return sum + Number(item.amount)
      }
      return sum
    }, 0)

    // 构建日期分组数据
    result.push({
      id: `${date}`,
      data: items,
      summary: { date: date, expense: totalExpense, income: totalIncome },
    })

    // 按日期降序排序
    result.sort(
      (a, b) =>
        dayjs(b.summary.date).valueOf() - dayjs(a.summary.date).valueOf()
    )
  }
  return result
}

// 账单筛选条件接口定义
export interface BillConditionsProps {
  type: number | null //1支出，2收入
  classify_id: number | null //分类id
  date_type: string
}

/**
 * 根据条件筛选账单列表
 * @param array - 原始账单数组
 * @param date - 日期时间戳
 * @param conditions - 筛选条件
 * @returns 筛选后的账单列表
 */
export const getBillListByConditions = (
  array: BillItemProps[],
  date: number,
  conditions: BillConditionsProps
): BillItemProps[] => {
  let list = array
  const { type, classify_id, date_type } = conditions || {}

  // 每次过滤都基于上一次过滤后的list，而不是原始array
  if (type) {
    list = list.filter((item) => item.type == type)
  }

  if (classify_id) {
    list = list.filter((item) => item.classify_id == classify_id)
  }

  if (date_type) {
    list = list.filter((item) =>
      dayjs(date).isSame(dayjs(item.date), date_type as OpUnitType)
    )
  }

  return list
}

/**
 * 获取账单列表中的最大和最小日期
 * @param array - 账单数组
 * @returns 包含最大和最小日期的对象
 */
export const getMaxAndMinDate = (array: BillItemProps[]) => {
  if (!array || array.length === 0) {
    return {
      maxDate: undefined,
      minDate: undefined,
    }
  }

  const dates = array.map((item) => dayjs(item.date).valueOf())
  return {
    maxDate: Math.max(...dates),
    minDate: Math.min(...dates),
  }
}

/**
 * 获取日期类型列表
 * @param minDate - 最小日期时间戳
 * @param maxDate - 最大日期时间戳
 * @param type - 日期类型(week/month/year)
 * @returns 日期选项列表
 */
export const getDateTypeList = ({
  minDate = undefined,
  maxDate = undefined,
  type = 'week',
}: {
  minDate?: number
  maxDate?: number
  type?: OpUnitType
}): { label: string; value: number }[] => {
  if (!minDate || !maxDate) return []
  const arr = []
  let current = dayjs(minDate)
  const end = dayjs(maxDate)

  // 如果最小和最大日期是同一天，返回单个日期
  if (current.isSame(end, 'day')) {
    return [
      {
        label: formatDateLabel(current, type),
        value: current.startOf(type).valueOf(),
      },
    ]
  }

  // 添加日期直到达到或超过最大日期
  while (current.isSame(end, type) || current.isBefore(end, type)) {
    arr.push(current.startOf(type))
    current = current.add(1, type as ManipulateType)
  }

  const res = arr.map((item) => {
    return {
      label: formatDateLabel(item, type),
      value: dayjs(item).valueOf(),
    }
  })
  return res
}

/**
 * 格式化日期标签
 * @param date - dayjs日期对象
 * @param type - 日期类型(week/month/year)
 * @returns 格式化后的日期标签
 */
function formatDateLabel(date: Dayjs, type: OpUnitType): string {
  const currentYear = dayjs().year()
  const currentMonth = dayjs().month()
  const currentWeek = dayjs().week()
  const year = date.year()
  const yearPrefix = year === currentYear ? '' : `${year}-`

  const weekYear = date.year()
  const monthOfDate = date.month()
  const weekNum = date.week()
  let res = ''
  switch (type) {
    case 'week':
      if (date.week() === currentWeek && year === currentYear) {
        res = '本周'
      } else if (date.week() === currentWeek - 1 && year === currentYear) {
        res = '上周'
      } else {
        // 检查周是否在上一年(第53周)

        // 如果是12月但显示第1周，说明这是跨年周，应显示为上一年的第53周
        if (weekNum === 1 && monthOfDate === 11) {
          if (weekYear + 1 === currentYear) {
            res = `${weekNum < 10 ? '0' : ''}${weekNum}周`
          } else {
            res = `${weekYear + 1}-${weekNum < 10 ? '0' : ''}${weekNum}周`
          }
        } else {
          res = `${yearPrefix}${weekNum < 10 ? '0' : ''}${weekNum}周`
        }
      }
      break
    case 'month':
      if (monthOfDate === currentMonth && year === currentYear) {
        res = '本月'
      } else if (monthOfDate === currentMonth - 1 && year === currentYear) {
        res = '上月'
      } else {
        const month = monthOfDate + 1
        res = `${yearPrefix}${month < 10 ? '0' : ''}${month}月`
      }
      break
    case 'year':
      if (year === currentYear) {
        res = '今年'
      } else if (year === currentYear - 1) {
        res = '去年'
      } else {
        res = `${year}年`
      }
      break
    default:
      // res = date.format('YYYY-MM-DD')
      break
  }
  return res
}

/**
 * 获取排行榜列表
 * @param data - 账单数据数组
 * @param sortType - 排序类型(0:按金额/1:按日期)
 * @returns 处理后的排行榜列表
 */
export const getRankList = ({
  data,
  sortType = 0,
}: {
  data: BillItemProps[]
  sortType?: number
}) => {
  // 计算总金额
  const total = data.reduce((sum, item) => sum + Number(item.amount), 0)

  // 转换为数组，添加百分比并按金额降序排序
  const sortKey = sortType === 0 ? 'amount' : 'date'
  const sortedData = data
    .map((item) => ({
      ...item,
      percentage:
        total > 0
          ? ((Number(item.amount) / total) * 100).toFixed(2) + '%'
          : '0%',
    }))
    .sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0))

  // 计算相对于最大金额的比例
  const maxAmount = sortedData.reduce(
    (max, item) => Math.max(max, Number(item.amount)),
    0
  )

  return sortedData.map((item) => ({
    ...item,
    ratioToMax:
      maxAmount > 0
        ? ((Number(item.amount) / maxAmount) * 100).toFixed(2) + '%'
        : '0%',
  }))
}
/**
 * 检查一个值是否为空
 * @param value - 要检查的值
 * @returns 如果值为空则返回true，否则返回false
 * @example
 * isEmpty(null) // => true
 * isEmpty(undefined) // => true
 * isEmpty('') // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * isEmpty(0) // => false
 * isEmpty(false) // => false
 */
export const isEmpty = (value: any): boolean => {
  // null 或 undefined
  if (value == null) return true

  // 数组
  if (Array.isArray(value)) return value.length === 0

  // 字符串
  if (typeof value === 'string') return value.length === 0

  // 对象
  if (typeof value === 'object') return Object.keys(value).length === 0

  // 数字类型，判断是否为0或0.00等
  if (typeof value === 'number') return value === 0

  // 其他类型(布尔值等)
  return false
}

/**
 * 检查一个值是否为对象
 * @param value - 要检查的值
 * @returns 如果值是对象则返回true，否则返回false
 * @example
 * isObject({}) // => true
 * isObject([1, 2, 3]) // => true
 * isObject(Function) // => true
 * isObject(null) // => false
 * isObject(undefined) // => false
 * isObject('') // => false
 * isObject(123) // => false
 * isObject(true) // => false
 */
export const isObject = (value: any): boolean => {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
/**
 * 创建一个防抖函数，该函数会延迟调用 func 直到距离上次调用过去了 wait 毫秒
 * @param func - 要防抖的函数
 * @param wait - 需要延迟的毫秒数，默认为0
 * @param immediate - 是否在延迟开始前调用函数，默认为false
 * @returns 返回新的防抖函数
 * @example
 * // 避免窗口在调整大小时过于频繁地更新
 * window.addEventListener('resize', debounce(() => {
 *   console.log('窗口大小改变了!');
 * }, 250));
 *
 * // 立即执行防抖函数，然后等待冷却时间
 * const clickHandler = debounce(() => {
 *   console.log('点击了!');
 * }, 250, true);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  let result: ReturnType<T>

  return function (this: any, ...args: Parameters<T>): void {
    const context = this

    const later = function () {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
      }
    }

    const callNow = immediate && !timeout

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)

    if (callNow) {
      result = func.apply(context, args)
    }
  }
}
/**
 * 创建一个节流函数，该函数在指定的时间间隔内最多执行一次
 * @param func - 要节流的函数
 * @param wait - 需要等待的毫秒数，默认为0
 * @param options - 配置选项
 * @param options.leading - 是否在开始时立即执行，默认为true
 * @param options.trailing - 是否在结束时执行，默认为true
 * @returns 返回新的节流函数
 * @example
 * // 处理滚动事件
 * window.addEventListener('scroll', throttle(() => {
 *   console.log('滚动中...');
 * }, 100));
 *
 * // 禁用前缘执行
 * const clickHandler = throttle(() => {
 *   console.log('点击了!');
 * }, 250, { leading: false });
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  options = { leading: true, trailing: true }
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  let previous = 0
  let result: ReturnType<T>

  return function (this: any, ...args: Parameters<T>): void {
    const now = Date.now()
    const context = this

    if (!previous && !options.leading) {
      previous = now
    }

    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(() => {
        previous = options.leading ? Date.now() : 0
        timeout = null
        result = func.apply(context, args)
      }, remaining)
    }
  }
}

/**
 * 获取 Redux store 中的状态
 * @param selector 可选的选择器函数，用于获取特定状态
 * @returns store 中的状态或通过选择器获取的特定状态
 */
export function getState<T = any>(selector?: (state: any) => T): any {
  // 导入 store

  // 获取完整状态
  const state = store.getState()

  // 如果提供了选择器函数，则返回选择器处理后的结果
  if (selector && typeof selector === 'function') {
    return selector(state)
  }

  // 否则返回完整状态
  return state
}
export const ImageUrl = (url: string) => {
  if (!url) return ''
  return configs.BASE_URL + url
}
