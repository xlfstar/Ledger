import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from '@/utils/dayjs'
import type { BudgetItemProps, BudgetParams } from '@/api/budget'
import { getBudgetList, deleteBudget, createBudget } from '@/api/budget'

type BudgetState = {
  budgetForMonth: BudgetItemProps[]
  budgetForYear: BudgetItemProps[]
}
const initialState: BudgetState = {
  budgetForMonth: [],
  budgetForYear: [],
}

export const fetchBudgetByMonth = createAsyncThunk(
  'budget/fetchBudgetByMonth',

  async (params: BudgetParams) => {
    try {
      const res: BudgetItemProps[] = await getBudgetList(params)
      return res
    } catch (error) {
      return [] as BudgetItemProps[]
    }
  }
)
export const fetchBudgetByYear = createAsyncThunk(
  'budget/fetchBudgetByYear',

  async (params: BudgetParams) => {
    try {
      const res: BudgetItemProps[] = await getBudgetList(params)
      return res
    } catch (error) {
      return [] as BudgetItemProps[]
    }
  }
)

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addBudgetForMonth: (state, action: PayloadAction<BudgetItemProps>) => {
      state.budgetForMonth.unshift(action.payload)
    },
    addBudgetForYear: (state, action: PayloadAction<BudgetItemProps>) => {
      state.budgetForYear.unshift(action.payload)
    },
    updateBudgetForMonth: (state, action: PayloadAction<BudgetItemProps>) => {
      // 找到并更新对应 id 的账单
      const index = state.budgetForMonth.findIndex(
        (item) => item.id === action.payload.id
      )

      if (index !== -1) {
        // 如果找到了对应 id 的账单，就替换它
        state.budgetForMonth[index] = action.payload
      } else {
        // 如果没找到，就添加到列表开头
        state.budgetForMonth.unshift(action.payload)
      }
    },
    updateBudgetForYear: (state, action: PayloadAction<BudgetItemProps>) => {
      // 找到并更新对应 id 的账单
      const index = state.budgetForYear.findIndex(
        (item) => item.id === action.payload.id
      )

      if (index !== -1) {
        // 如果找到了对应 id 的账单，就替换它
        state.budgetForYear[index] = action.payload
      } else {
        // 如果没找到，就添加到列表开头
        state.budgetForYear.unshift(action.payload)
      }
    },
    deleteBudgetForMonth: (state, action: PayloadAction<number>) => {
      state.budgetForMonth = state.budgetForMonth.filter(
        (i) => i.id !== action.payload
      )
    },
    deleteBudgetForYear: (state, action: PayloadAction<number>) => {
      state.budgetForYear = state.budgetForYear.filter(
        (i) => i.id !== action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchBudgetByMonth.fulfilled,
      (state, action: PayloadAction<BudgetItemProps[]>) => {
        state.budgetForMonth = action.payload
      }
    ),
    builder.addCase(
      fetchBudgetByYear.fulfilled,
      (state, action: PayloadAction<BudgetItemProps[]>) => {
        state.budgetForYear = action.payload
      }
    )
  },
})

export const {
  addBudgetForMonth,
  addBudgetForYear,
  updateBudgetForMonth,
  updateBudgetForYear,
  deleteBudgetForMonth,
  deleteBudgetForYear,
} = budgetSlice.actions
export default budgetSlice.reducer
