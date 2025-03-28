import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  getAssetsList,
  AssetsForOneResponse,
  AssetsResponse,
  SummaryResponse,
} from '@/api/assets'
import { RootState } from '..'

interface AssetGroup {
  data?: AssetsForOneResponse[]
  accountData?: {
    type?: number
    total?: number
    label?: string
  }
}

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
    const parent_name = items[0].account.parent?.name
    return {
      accountData: {
        type,
        label,
        total,
        parent_name,
      },
      // 提取每个资产项的关键信息
      data: items,
    }
  })
  return result
}

export const fetchAssetsList = createAsyncThunk(
  'assets/fetchAssetsList',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState
      const { user } = state.auth
      if (!user?.id) return { list: [], summary: {}, assets: [] }
      const { assets, summary } = await getAssetsList({ user_id: user?.id })
      const list = rebuildAssetsList(assets)
      return { list, summary, assets }
    } catch (error) {
      return { list: [], summary: {}, assets: [] }
    }
  }
)
export interface AssetsState {
  orginalAssetsList: any[]
  assetsList: any[]
  summary: SummaryResponse
}
const initialState: AssetsState = {
  // 资产列表
  orginalAssetsList: [],
  assetsList: [],
  summary: {
    total: 0,
    negative: 0,
    positive: 0,
  },
}
const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAssetsList.fulfilled, (state, action) => {
      state.assetsList = action.payload.list
      state.summary = action.payload.summary
      state.orginalAssetsList = action.payload.assets
    })
  },
})

export default assetsSlice.reducer
