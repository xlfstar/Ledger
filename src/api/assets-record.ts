import request from '@/utils/request'

export const getRecords = (params: { assets_id: number; date: string }) => {
  const { assets_id, date } = params || {}
  return request.get(`/api/assets-change-records/${assets_id}/${date}`)
}
