import React, { useEffect, useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { PageView, BounceButton, KeyboardScrollView, Toast } from '@/components'
import { login } from '@/api/user'
import { setCredentials } from '@/store/slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/navigation'
import styles from './styles'

type LoginProps = NativeStackScreenProps<RootStackParamList, 'login'>

interface UserData {
  token: string
  [key: string]: any
}

const Login = ({ navigation, route }: any) => {
  const state = navigation.getState()
  const previousRoute = state.routes[state.index - 1] // 获取上一个页面
  const { redirectRoute, redirectParams } = route.params || {}

  const dispatch = useDispatch()
  const [loginType, setLoginType] = useState<0 | 1>(0) // password or code
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const maskPosition = useSharedValue(0)
  const maskStyle = useAnimatedStyle(() => {
    const translateX = interpolate(maskPosition.value, [0, 1], [0, 74])
    return {
      transform: [{ translateX: withTiming(translateX) }],
    }
  })

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0) {
        // 向右滑动
        maskPosition.value = 1
        setLoginType(1)
      } else {
        // 向左滑动
        maskPosition.value = 0
        setLoginType(0)
      }
    })
    .runOnJS(true)

  const handleSendCode = async () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      Toast.showError('请输入正确的手机号')
      return
    }
    // try {
    //   await userApi.sendVerifyCode(phone)
    //   setCountdown(60)
    //   const timer = setInterval(() => {
    //     setCountdown((prev) => {
    //       if (prev <= 1) {
    //         clearInterval(timer)
    //         return 0
    //       }
    //       return prev - 1
    //     })
    //   }, 1000)
    // } catch (error) {
    //   console.error(error)
    // }
  }

  const handleLogin = async () => {
    if (!phone) {
      Toast.showError('请输入手机号')
      return
    }
    if (loginType === 0 && !password) {
      Toast.showError('请输入密码')
      return
    }
    if (loginType === 1 && !code) {
      Toast.showError('请输入验证码')
      return
    }

    try {
      const response = await login({
        phonenumber: phone,
        password: loginType === 0 ? password : undefined,
        code: loginType === 1 ? code : undefined,
        type: loginType,
      })

      const { token, ...userData }: any = response

      dispatch(
        setCredentials({
          user: userData,
          token: token,
        })
      )

      await Promise.all([
        AsyncStorage.setItem('token', token),
        AsyncStorage.setItem('user', JSON.stringify(userData)),
      ])

      // 登录成功后，如果有重定向路由，则跳转到该路由
      if (redirectRoute) {
        navigation.replace(redirectRoute, redirectParams)
      } else {
        navigation.replace('mainTab', { screen: 'home' })
      }
    } catch (error: any) {
      console.error('Login error:', error)
      Toast.showError(error?.message || '登录失败')
    }
  }

  return (
    <PageView style={styles.container} headerObj={{ title: '登录' }}>
      <KeyboardScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.title}>欢迎回来</Text>
          <Text style={styles.subtitle}>请登录您的账号</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="请输入手机号"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={11}
              />
            </View>

            {loginType === 0 ? (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="请输入密码"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            ) : (
              <View style={styles.inputWrapper}>
                <View style={styles.codeInputGroup}>
                  <TextInput
                    style={[styles.input, styles.codeInput]}
                    placeholder="请输入验证码"
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                  <BounceButton
                    style={[
                      styles.codeButton,
                      countdown > 0 && styles.codeButtonDisabled,
                    ]}
                    onPress={handleSendCode}
                    disabled={countdown > 0}
                  >
                    <Text style={styles.codeButtonText}>
                      {countdown > 0 ? `${countdown}s` : '获取验证码'}
                    </Text>
                  </BounceButton>
                </View>
              </View>
            )}
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <GestureDetector gesture={panGesture}>
              <View style={styles.rankingListTitleRight}>
                <Animated.View style={[styles.mask, maskStyle]}></Animated.View>
                <BounceButton
                  style={styles.rankingListTitleRightItem}
                  onPress={() => {
                    if (loginType === 0) return
                    setLoginType(0)
                    maskPosition.value = 0
                  }}
                >
                  <Text
                    style={[
                      styles.rankingListTitleRightItemText,
                      loginType === 0 && { color: 'white' },
                    ]}
                  >
                    密码登录
                  </Text>
                </BounceButton>
                <BounceButton
                  style={styles.rankingListTitleRightItem}
                  onPress={() => {
                    if (loginType === 1) return
                    setLoginType(1)
                    maskPosition.value = 1
                  }}
                >
                  <Text
                    style={[
                      styles.rankingListTitleRightItemText,
                      loginType === 1 && { color: 'white' },
                    ]}
                  >
                    验证码登录
                  </Text>
                </BounceButton>
              </View>
            </GestureDetector>
          </View>

          <BounceButton style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>登录</Text>
          </BounceButton>

          <BounceButton
            style={styles.registerButton}
            onPress={() => {
              if (previousRoute.name === 'register') {
                navigation.goBack()
              } else {
                navigation.navigate('register')
              }
            }}
          >
            <Text style={styles.registerButtonText}>还没有账号？立即注册</Text>
          </BounceButton>
        </View>
      </KeyboardScrollView>
    </PageView>
  )
}

export default Login
