import React, { useEffect, useState, useMemo } from 'react'
import { ms } from 'react-native-size-matters'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { PageView, BounceButton } from '@/components'
import { Modal, Image } from '@/components'

import styles from './styles'
import Card from './components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootState, AppDispatch } from '@/store'
import { logout } from '@/store/slices/authSlice'
import configs from '@/configs'

const MyPage = ({ navigation }: any) => {
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch<AppDispatch>()
  // const navigation = useNavigation()
  const { user, isLogin } = useSelector((state: RootState) => state.auth)
  console.log({ isLogin })

  const list = [
    { icon: require('@/assets/images/message.png'), label: '消息' },
    { icon: require('@/assets/images/help.png'), label: '使用帮助' },
    { icon: require('@/assets/images/setting1.png'), label: '设置' },
    { icon: require('@/assets/images/about.png'), label: '关于我们' },
  ]
  const handlePressCardItem = (index: number) => {
    switch (index) {
      case 0:
        break
      case 1:
        break
      case 2:
        break
      case 3:
        break
      default:
        break
    }
  }
  const handleEditUserInfo = () => {
    // navigation.navigate('login')
    if (isLogin) {
      navigation.navigate('account')
    } else {
      navigation.navigate('login')
    }
  }

  const nickname = useMemo(() => {
    if (isLogin && user) {
      return user.nickname || user.phonenumber
    } else {
      return '未登录'
    }
  }, [user, isLogin])

  const handleLoginOut = () => {
    dispatch(logout())
    // navigation.navigate('login')
  }

  return (
    <PageView headerHide>
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View
          style={[styles.topContainer, { paddingTop: insets.top + ms(22) }]}
        >
          <View style={styles.userInfo}>
            <BounceButton style={styles.avatarBox} onPress={handleEditUserInfo}>
              <Image
                src={
                  user?.avatar
                    ? `${configs.BASE_URL}${user.avatar}`
                    : require('@/assets/images/avatar.png')
                }
                style={styles.avatar}
              />
              <Text style={styles.userName}>{nickname}</Text>
            </BounceButton>
            <BounceButton
              style={styles.clockInBtn}
              onPress={() => {
                console.log('打卡')
              }}
            >
              <Image
                src={require('@/assets/images/clockIn.png')}
                style={styles.clockIcon}
              />
              <Text style={styles.clockInText}>打卡</Text>
            </BounceButton>
          </View>
          <View style={styles.staticBox}>
            <View style={styles.staticItem}>
              <Text style={styles.staticItemValue}>3</Text>
              <Text style={styles.staticItemTitle}>已经连续打卡</Text>
            </View>
            <View style={styles.staticItem}>
              <Text style={styles.staticItemValue}>365</Text>
              <Text style={styles.staticItemTitle}>记账总天数</Text>
            </View>
            <View style={styles.staticItem}>
              <Text style={styles.staticItemValue}>100</Text>
              <Text style={styles.staticItemTitle}>记账总笔数</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <Card list={list} onPress={handlePressCardItem} />
        </View>
      </ScrollView>
    </PageView>
  )
}
export default MyPage
