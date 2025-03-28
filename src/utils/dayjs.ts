import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
import updateLocale from 'dayjs/plugin/updateLocale'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekday from  'dayjs/plugin/weekday'
import advancedFormat  from 'dayjs/plugin/advancedFormat'
dayjs.extend(updateLocale)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekday)
dayjs.extend(advancedFormat)
dayjs.locale('zh-cn')
dayjs.updateLocale('zh-cn',{
  // weekStart:1
})
export default dayjs