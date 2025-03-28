import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import authReducer from './slices/authSlice'
import classifyReducer from './slices/classifySlice'
import assetsAccountsReducer from './slices/assetsAccountsSlice'
import billReducer from './slices/billSlice'
import assetsReducer from './slices/assetsSlice'
import budgetReducer from './slices/budgetSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  classify: classifyReducer,
  assetsAccounts: assetsAccountsReducer,
  bill: billReducer,
  assets: assetsReducer,
  budget: budgetReducer,
})
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth', 'classify', 'assetsAccounts'], // 只持久化 auth reducer
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
// 推导出 RootState 类型，表示整个 Redux store 的状态结构
export type RootState = ReturnType<typeof store.getState>

// 导出 store 和 dispatch 类型
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export default store
