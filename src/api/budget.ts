import request from '@/utils/request'

export type BudgetItemProps = {
  id?: number
  type?: number
  user_id?: number
  amount: number
  classify_id?: number | undefined | null
  classify?: any
  isTotal?: number
  createdAt?: any
  updatedAt?: any
  [key: string]: any
}

export type BudgetParams = {
  type: number
  user_id: number
  date: number
}
export const createBudget = (data: BudgetItemProps) => {
  return request.post<BudgetItemProps>('/api/budgets', data)
}
export const getBudgetList = (params: BudgetParams) => {
  return request.get<BudgetItemProps[]>('/api/budgets', { params })
}
export const updateBudget = (data: BudgetItemProps) => {
  return request.put<BudgetItemProps>(`/api/budgets/${data.id}`, data)
}
export const deleteBudget = (id: number) => {
  return request.delete(`/api/budgets/${id}`)
}
