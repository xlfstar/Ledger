import request from '@/utils/request'

export interface BillItemProps {
  id?: number
  amount?: number
  type?: number
  date?: number
  classify_id?: number
  user_id?: number | undefined | null
  remark?: string
  assets_id?: number
  status?: number
  images?: string
  [key: string]: any
}
export interface BillListRequest {
  type?: number
  user_id: number | undefined | null
  start_date?: number
  end_date?: number
  keyword?: string
  [key: string]: any
}
// export interface

export const createBill = (data: BillItemProps) => {
  return request.post<BillItemProps>('/api/bills', data)
}
export const updateBill = (id: number, data: BillItemProps) => {
  return request.put<BillItemProps>(`/api/bills/${id}`, data)
}
export const deleteBill = (id: number) => {
  return request.delete(`/api/bills/${id}`)
}
export const getBillList = (params: BillListRequest) => {
  return request.get<BillItemProps[]>('/api/bills', { params })
}
export const getMonthOrYearBillList = (params: BillListRequest) => {
  return request.get('/api/bill/statiscal', { params })
}
export const getBillById = (id: number) => {
  return request.get<BillItemProps>(`/api/bills/${id}`)
}
