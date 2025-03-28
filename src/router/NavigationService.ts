/**
 * 导航服务
 * 提供全局导航方法
 */
import * as React from 'react'
import { NavigationContainerRef, ParamListBase } from '@react-navigation/native'
import { RootStackParamList } from '../pageRouter/types'

// 创建导航引用
const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>()

/**
 * 导航到指定页面
 * @param name 路由名称
 * @param params 路由参数
 */
function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
): void {
  if (navigationRef.current) {
    // 使用类型断言确保类型安全
    navigationRef.current.navigate({
      name,
      params,
    } as never)
  }
}

export default {
  navigate,
  navigationRef,
}
