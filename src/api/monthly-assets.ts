import request from '@/utils/request'
export interface AssetsStatistics {
  user_id: number
  total: number
  negative: number
  positive: number
  month: string
}
export const getMonthlyAssets = (params: { user_id: number; year: string }) => {
  return request.get<AssetsStatistics[]>(
    `/api/monthly-assets/year/${params.user_id}/${params.year}`
  )
}
