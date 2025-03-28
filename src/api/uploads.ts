import request from '@/utils/request'
export type ResponseData = {
  url: string
  filename: string
  mimetype: string
  size: number
}
export const uploadImage = (formData: FormData) => {
  console.log('formData', formData)

  return request.post<ResponseData>('/api/uploads/single', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const uploadImages = (formData: FormData) => {
  return request.post<ResponseData[]>('/api/uploads/multiple', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
