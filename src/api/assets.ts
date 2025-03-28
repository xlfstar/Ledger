import request from '@/utils/request'
export interface AssetsRequest {
  user_id: number
  assets_account_id?: number
}
export interface AccountsResponse {
  icon: string
  id: number
  name: string
  type: number | string
  parent_id: number | null
  [key: string]: any
}
export interface AssetsForOneResponse {
  amount: number | string
  assets_account_id: number
  id: number
  remark: string
  name: string
  status: number
  user_id: number
  card_number: string
  type: number
  [key: string]: any
}
export interface AssetsResponse extends AssetsForOneResponse {
  account: AccountsResponse
}
export interface SummaryResponse {
  negative?: number
  positive?: number
  total?: number
}
export interface AssetsListResponse {
  assets: AssetsResponse[]
  summary: SummaryResponse
}
export interface CreateRequset {
  assets_account_id?: number
  user_id: number
  amount: number
  name?: string
  remark?: string
  card_number?: string
  type?: number
}
export interface UpdateRequset {
  assets_account_id?: number
  user_id?: number
  amount: number
  name?: string
  remark?: string
  card_number?: string
  type?: number
}
export interface TransferRequest {
  from_asset_id: number
  to_asset_id: number
  amount: number
  createdAt?: Date
}
export const getAssetsList = (params: AssetsRequest) => {
  return request.get<AssetsListResponse>('/api/assets', { params })
}

export const createAssets = (data: CreateRequset) => {
  return request.post<AssetsForOneResponse>('/api/assets', data)
}

export const updateAssets = (id: number, data: UpdateRequset) => {
  return request.put<AssetsForOneResponse>(`/api/assets/${id}`, data)
}
export const deleteAssets = (id: number) => {
  return request.delete(`/api/assets/${id}`)
}
export const getAssetById = (id: number) => {
  return request.get<AssetsResponse>(`/api/assets/${id}`)
}
export const assetTransfer = (data: TransferRequest) => {
  return request.post<any>(`/api/assets/transfer`, data)
}
