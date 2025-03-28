import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  getAssetsAccountList,
  AssetsAccountListRespone,
  AssetsAccountListRequest,
  AssetsAccountItem,
} from '@/api/assets-accounts'
export interface AssetsAccountsState {
  assetsAccountList: AssetsAccountItem[]
}
export const fetchAssetsAccounts = createAsyncThunk(
  'assetsAccounts/getAssetsAccountList',
  async (params: AssetsAccountListRequest) => {
    try {
      const res: AssetsAccountListRespone = await getAssetsAccountList(params)
      return res.list ?? []
    } catch (error) {
      return [] as AssetsAccountItem[]
    }
  }
)

const initialState: AssetsAccountsState = {
  assetsAccountList: [],
}

const assetsAccountsSlice = createSlice({
  name: 'classify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAssetsAccounts.fulfilled,
      (state, action: PayloadAction<AssetsAccountItem[]>) => {
        state.assetsAccountList = action.payload ?? []
      }
    )
  },
})

export default assetsAccountsSlice.reducer
