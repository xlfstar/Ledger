import request from '@/utils/request'
export interface ClassifyItem {
  id: number
  label: string
  icon: string
  color_icon: string
  status: number
  type: number | string
  // 根据实际返回数据添加其他属性
}
export interface PaginationProps {
  current: number
  pageSize: number
  total: number
  totalPage: number
}
export interface ClassifyListRespone {
  list: ClassifyItem[]
  pagination: PaginationProps
}
export const getClassifyList = (params?: any) => {
  return request.get<ClassifyListRespone>('/api/classifies', { params })
}
