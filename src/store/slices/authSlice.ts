import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createDeviceUser,
  login,
  register,
  updateUser as updateUserApi,
  updateUserPassword,
  UserResponse,
} from '@/api/user'

// 定义用户接口

// 定义状态接口
interface AuthState {
  user: UserResponse | null
  token: string | null
  isLogin: boolean
  isCreatedDeviceUser: boolean
}

//用户进入app，自动创建设备用户
export const createDeviceUserAction = createAsyncThunk(
  'auth/createDeviceUser',
  async (deviceId: string) => {
    try {
      const res = await createDeviceUser({ deviceId })

      return res
    } catch (error) {
      throw error
    }
  }
)

const initialState: AuthState = {
  user: null,
  token: null,
  isLogin: false,
  isCreatedDeviceUser: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserResponse; token?: string }>
    ) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token || ''
      state.isLogin = Boolean(token)
    },
    logout: (state) => {
      state.token = null
      state.isLogin = false
    },
    updateUser: (state, action: PayloadAction<Partial<UserResponse>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(createDeviceUserAction.fulfilled, (state, action) => {
      state.isCreatedDeviceUser = true
      state.user = action.payload
    })
  },
})

export const { setCredentials, logout, updateUser } = authSlice.actions
export default authSlice.reducer

// 选择器添加类型
export const selectCurrentUser = (state: {
  auth: AuthState
}): UserResponse | null => state.auth.user
export const selectCurrentToken = (state: { auth: AuthState }): string | null =>
  state.auth.token
export const selectIsAuthenticated = (state: { auth: AuthState }): boolean =>
  state.auth.isLogin
