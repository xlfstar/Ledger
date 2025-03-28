import request from '@/utils/request'

export interface RegisterRequestProps {
  phonenumber: number | string
  password?: string
  deviceId?: string
}

export type LoginRequestProps =
  | {
      phonenumber: number | string
      password: string
      deviceId?: string
      // code?: never
      type?: 0 | 1
    }
  | {
      phonenumber: number | string
      // password?: never
      deviceId?: string
      code?: string
      type?: 0 | 1
    }
export type UpdateUserRequestProps = {
  nickname?: string
  avatar?: string
  email?: string
  sex?: number
  level?: 0 | 1
  device_id: string
  id: number
  status?: number
}
export interface CreateDeviceUserRequestProps {
  deviceId: string
}
export interface UserResponse extends UpdateUserRequestProps {
  [key: string]: any // 为其他可能的用户属性添加索引签名
}
export interface TokenResponse {
  token: string
  user: UserResponse
}
export const register = (data: RegisterRequestProps) => {
  return request.post<TokenResponse>('/api/user/register', data)
}
export const login = (data: LoginRequestProps) => {
  return request.post<TokenResponse>('/api/user/login', data)
}
//创建设备用户
export const createDeviceUser = (data: CreateDeviceUserRequestProps) => {
  return request.post<UserResponse>('/api/user/device', data)
}
export const updateUser = (id: number, data: UpdateUserRequestProps) => {
  return request.put<UserResponse>(`/api/user/${id}`, data)
}
export const updateUserPassword = (id: number, data: string) => {
  return request.put(`/api/user/${id}/password`, data)
}
export const getUserByDevice = (deviceId: string) => {
  return request.get<UserResponse>(`/api/user/device/${deviceId}`)
}
