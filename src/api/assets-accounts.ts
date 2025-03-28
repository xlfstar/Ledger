import request from '@/utils/request'
export interface PaginationProps {
  current: number
  pageSize: number
  total: number
  totalPage: number
}
export interface AssetsAccountListRespone {
  list?: AssetsAccountItem[]
  pagination?: PaginationProps
}
export interface AssetsAccountItem {
  id?: number
  name: string
  parent_id: number | null
  type: number
  status?: number
  icon?: string
  remark?: string
  children?: AssetsAccountItem[]
}

export interface AssetsAccountListRequest {
  status?: 0 | 1
  type?: 1 | 2
  page?: number
  pageSize?: number
  keyword?: string
  parent_id?: number | null
}
export const getAssetsAccountList = (params?: AssetsAccountListRequest) => {
  return request.get<AssetsAccountListRespone>('/api/assets-accounts', {
    params,
  })
}
