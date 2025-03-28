import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getClassifyList, ClassifyItem } from '@/api/classify'

// 定义 state 的接口
export interface ListState {
  classifyList: ClassifyItem[]
}

export const fetchClassifies = createAsyncThunk(
  'classify/getClassifyList',
  async (params: any) => {
    try {
      const res = await getClassifyList(params)
      return res.list
    } catch (error) {
      return [] as ClassifyItem[]
    }
  }
)

const initialState: ListState = {
  classifyList: [],
}

const classifySlice = createSlice({
  name: 'classify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchClassifies.fulfilled,
      (state, action: PayloadAction<ClassifyItem[]>) => {
        state.classifyList = action.payload
      }
    )
  },
})

export default classifySlice.reducer
