import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from '@/components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import configs from '@/configs'

const createAxiosInstance = (config?: AxiosRequestConfig) => {
  const instance: AxiosInstance = axios.create({
    baseURL: configs.BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  })

  // Request interceptor
  instance.interceptors.request.use(
    async (config) => {
      try {
        // 从 AsyncStorage 获取token
        const token = await AsyncStorage.getItem('token')
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      } catch (error) {
        return Promise.reject(error)
      }
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { code, data, message } = response.data

      // 根据后端约定的状态码处理
      if (code === 200) {
        return data
      }

      // 处理特定错误码
      switch (code) {
        case 401:
          // token过期或未登录
          AsyncStorage.removeItem('token')
          Toast.showError('登录已过期，请重新登录')
          // 可以在这里添加重定向到登录页的逻辑
          break
        case 403:
          Toast.showError('没有权限访问')
          break
        case 409:
          Toast.showError('服务器错误111')
          break
        case 500:
          Toast.showError('服务器错误')
          break
        default:
          Toast.showError(message || '请求失败')
      }

      return Promise.reject(new Error(message || '请求失败'))
    },
    (error) => {
      console.log('error', error)

      if (error.response) {
        const { message } = error.response.data
        console.log('error.response', error.response.status)

        switch (error.response.status) {
          case 404:
            Toast.showError(message || '请求的资源不存在')
            break
          case 408:
            Toast.showError(message || '请求超时')
            break
          case 500:
            console.log('500', message)

            Toast.showError(message || '服务器错误')
            break
          case 502:
            Toast.showError(message || '网关错误')
            break
          case 503:
            Toast.showError(message || '服务不可用')
            break
          default:
            Toast.showError(message || '网络错误')
        }
      } else {
        Toast.showError('服务器出错')
      }
      return Promise.reject(error)
    }
  )

  return {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
      instance.get(url, config),

    post: <T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T> => instance.post(url, data, config),

    put: <T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T> => instance.put(url, data, config),

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
      instance.delete(url, config),
  }
}

const request = createAxiosInstance()
export default request
