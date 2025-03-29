import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BounceButton, PageView } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchClassifies } from '@/store/slices/classifySlice'
import { fetchAssetsAccounts } from '@/store/slices/assetsAccountsSlice'
import ActionSheetClassify from '@/components/ActionSheetClassify'
import {
  createDeviceUserAction,
  setCredentials,
} from '@/store/slices/authSlice'
import { useDeviceInfo } from '@/hooks'
import { fetchAssetsList } from '@/store/slices/assetsSlice'
import { fetchAllBillList } from '@/store/slices/billSlice'
import { primaryTextColor } from '@/contents/theme'
import { getUserByDevice } from '@/api/user'
import styles from './styles'

const LaunchPage = ({ navigation }: any) => {
  const ActionSheetClassifyRef = useRef(null)
  const dispatch = useDispatch<AppDispatch>()
  const { deviceId: device_id } = useDeviceInfo()
  const { isCreatedDeviceUser, user, isLogin } = useSelector(
    (state: RootState) => state.auth
  )
  const [isAgreed, setIsAgreed] = useState(true)

  useEffect(() => {
    const checkAgreement = async () => {
      const agreed = await AsyncStorage.getItem('userAgreed')
      setIsAgreed(agreed === 'true')
    }
    checkAgreement()
  }, [])

  const handleAgree = async () => {
    await AsyncStorage.setItem('userAgreed', 'true')
    setIsAgreed(true)
  }
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAgreed && !isLoading) {
      navigation.replace('mainTab')
    }
  }, [isAgreed, isLoading])
  // 处理所有初始化请求
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1. 处理设备用户创建和获取
        if (!isCreatedDeviceUser && device_id) {
          await dispatch(createDeviceUserAction(device_id))
        }
        if (isCreatedDeviceUser && !user && device_id) {
          const res = await getUserByDevice(device_id)
          dispatch(setCredentials({ user: res }))
        }

        // 2. 获取基础数据
        await Promise.all([
          dispatch(fetchClassifies({ pageSize: 999, status: 1 })),
          dispatch(fetchAssetsAccounts({ pageSize: 999, status: 1 })),
        ])

        // 3. 获取用户相关数据
        if (user?.id) {
          await Promise.all([
            dispatch(fetchAssetsList()),
            dispatch(fetchAllBillList({ user_id: user.id })),
          ])
        }

        setIsLoading(false)
        // 完成所有请求后跳转到首页
      } catch (error) {
        console.error('初始化数据失败:', error)
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [device_id, isCreatedDeviceUser, user])

  return (
    <PageView>
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/app_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>小熊记账</Text>

        <Text style={styles.version}>Version 1.0.0</Text>

        <BounceButton
          style={styles.homeButton}
          onPress={() => navigation.replace('mainTab')}
        >
          <Text style={styles.buttonText}>立即开始</Text>
        </BounceButton>
      </View>

      {!isAgreed && (
        <Modal visible transparent={false} animationType="slide">
          <View style={styles.modalContainer}>
            <ScrollView style={styles.termsContainer}>
              <Text style={styles.termsText}>用户协议内容...</Text>
            </ScrollView>
            <BounceButton style={styles.agreeButton} onPress={handleAgree}>
              <Text style={styles.agreeText}>同意并继续</Text>
            </BounceButton>
          </View>
        </Modal>
      )}
    </PageView>
  )
}
export default LaunchPage
