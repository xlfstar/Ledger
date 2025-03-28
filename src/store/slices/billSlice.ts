import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { reBuildBillList } from '@/utils'
import dayjs from '@/utils/dayjs'
import {
  createBill,
  getBillList,
  BillItemProps,
  BillListRequest,
} from '@/api/bill'
import { Toast } from '@/components'

interface summaryProps {
  date: string | number
  expense: number
  income: number
}
export interface BillListForDetailPageData {
  id: string
  data: BillItemProps[]
  summary: summaryProps
}
export interface BillState {
  billListForDetailPage: BillListForDetailPageData[]
  // billListForWeek: BillItemProps[]
  // billListForMonth: BillItemProps[]
  // billListForYear: BillItemProps[]
  currentDate:number
  allBillList:BillItemProps[]
  minDate:number | undefined
  maxDate:number | undefined
}
export interface ThuckParams {
  params: BillListRequest
}
const initialState: BillState = {
  // 定义初始状态
  billListForDetailPage: [], //首页数据
  currentDate:dayjs().valueOf(),
  allBillList:[],
  minDate:undefined,
  maxDate:undefined
}

//


export const fetchBillsForDetailPage = createAsyncThunk(
  'bill/fetchBillsForDetailPage',
  async (params : BillListRequest) => {
    try {
      const res: BillItemProps[] = await getBillList(params)
      const list: BillListForDetailPageData[] = reBuildBillList(res,'month')
      return list
    } catch (error) {
      return [] as BillListForDetailPageData[]
    }
  }
)

export const fetchAllBillList = createAsyncThunk(
  'bill/fetchAllBillList',

  async(params:BillListRequest)=>{
    try {
      const res: BillItemProps[] = await getBillList(params)
      return res
    } catch (error) {
      return [] as BillItemProps[]
    }
  }
)

const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
 
    setCurrentDateForIndexPage:(state,action:PayloadAction<number>)=>{
      state.currentDate = action.payload
    },
    updateBill:(state, action: PayloadAction<BillItemProps>)=>{
      // 找到并更新对应 id 的账单
      const index = state.allBillList.findIndex(
        item => item.id === action.payload.id
      )
      
      if (index !== -1) {
        // 如果找到了对应 id 的账单，就替换它
        state.allBillList[index] = action.payload
      } else {
        // 如果没找到，就添加到列表开头
        state.allBillList.unshift(action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchBillsForDetailPage.fulfilled,
      (state, action: PayloadAction<BillListForDetailPageData[]>) => {
        state.billListForDetailPage = action.payload
      }
    ),
    builder.addCase(fetchAllBillList.fulfilled,
      (state,action:PayloadAction<BillItemProps[]>)=>{
        state.allBillList = action.payload
        // Find min and max dates
        if (action.payload.length > 0) {
          const dates = action.payload.map(item => item.date)
          const validDates = dates.filter((date): date is number => date !== undefined)
          state.minDate = Math.min(...validDates) 
          state.maxDate = Math.max(...validDates)
        } 
      }
    )
  },
}) 

export const  {setCurrentDateForIndexPage,updateBill} = billSlice.actions
export default billSlice.reducer
