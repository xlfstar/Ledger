import React, { useState, useEffect } from 'react'
import { View, TextInput, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { PageView, BounceButton, Toast, KeyboardScrollView } from '@/components'
import { register } from '@/api/user'
import { setCredentials } from '@/store/slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDeviceInfo } from '@/hooks'
import styles from './styles'
import { AppDispatch } from '@/store'

const Register = ({ navigation }: any) => {
  const state = navigation.getState()
  const previousRoute = state.routes[state.index - 1]
  const dispatch = useDispatch<AppDispatch>()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { deviceId } = useDeviceInfo()

  const handleRegister = async () => {
    if (!phone || !password || !confirmPassword) {
      Toast.showError('请填写完整信息')
      return
    }
    if (password !== confirmPassword) {
      Toast.showError('两次输入的密码不一致')
      return
    }
    try {
      const body = {
        phonenumber: phone,
        password,
        deviceId,
      }
      Toast.showLoading()
      const response = await register(body)
      const { token, ...userInfo }: any = response
      dispatch(setCredentials({ user: userInfo, token }))
      await AsyncStorage.setItem('token', token)
      await AsyncStorage.setItem('user', JSON.stringify(userInfo))
      Toast.hide()
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PageView
      style={styles.container}
      headerObj={{
        title: '注册',
        backgroundColor: 'white',
      }}
    >
      <KeyboardScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.title}>欢迎加入</Text>
          <Text style={styles.subtitle}>创建一个新账号开始体验</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              {/* <Text style={styles.label}>手机号</Text> */}
              <TextInput
                style={styles.input}
                placeholder="请输入手机号"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={11}
              />
            </View>

            <View style={styles.inputWrapper}>
              {/* <Text style={styles.label}>密码</Text> */}
              <TextInput
                style={styles.input}
                placeholder="请输入密码"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputWrapper}>
              {/* <Text style={styles.label}>确认密码</Text> */}
              <TextInput
                style={styles.input}
                placeholder="请再次输入密码"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          <BounceButton style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>立即注册</Text>
          </BounceButton>

          <BounceButton
            style={styles.loginButton}
            onPress={() => {
              if (previousRoute.name === 'login') {
                navigation.goBack()
              } else {
                navigation.navigate('login')
              }
            }}
          >
            <Text style={styles.loginButtonText}>已有账号？立即登录</Text>
          </BounceButton>

          <View style={styles.agreement}>
            <Text style={styles.agreementText}>
              注册即代表同意
              <Text style={styles.agreementLink}>《用户协议》</Text>和
              <Text style={styles.agreementLink}>《隐私政策》</Text>
            </Text>
          </View>
        </View>
      </KeyboardScrollView>
    </PageView>
  )
}

export default Register
