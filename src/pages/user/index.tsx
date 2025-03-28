import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  PermissionsAndroid,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {
  PageView,
  BounceButton,
  Image,
  CustomeActionSheet,
  Toast,
  Modal,
} from '@/components'
import { themeGreenColor } from '@/contents/theme'
import { ms } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import configs from '@/configs'
import { RootState, AppDispatch } from '@/store'
import { Icon } from 'react-native-elements'
import { ActionSheetRef } from 'react-native-actions-sheet'
import ImagePicker from 'react-native-image-crop-picker'
import { uploadImage, uploadImages, ResponseData } from '@/api/uploads'
import { UpdateUserRequestProps, updateUser } from '@/api/user'
import { updateUser as updateReduxUser, logout } from '@/store/slices/authSlice'
import styles from './styles'

const UserPage = ({ navigation, route }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isLogin } = useSelector((state: RootState) => state.auth)
  console.log({ user })

  const ActionSheetImageRef = useRef<ActionSheetRef>(null)
  const ActionSheetSexRef = useRef<ActionSheetRef>(null)
  const nicknameRef = useRef<TextInput>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')
  const phoneFormat = (phone: string) => {
    if (!phone) return ''
    return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
  }

  const handleUpdateNickname = () => {
    Keyboard.dismiss()
    if (!user?.id || !nickname) return
    const params: UpdateUserRequestProps = {
      nickname: nickname,
      device_id: user?.device_id,
      id: user.id,
    }
    Toast.showLoading()
    updateUser(user.id, params).then((res) => {
      dispatch(updateReduxUser({ nickname }))
      setIsVisible(false)
      Toast.hide()
    })
  }

  const handleUpdateSex = (item: { label: string; value: number }) => {
    ActionSheetSexRef.current?.hide()
    if (user?.id) {
      const params: UpdateUserRequestProps = {
        sex: item.value,
        device_id: user?.device_id,
        id: user.id,
      }
      Toast.showLoading()
      updateUser(user.id, params).then((res) => {
        dispatch(updateReduxUser({ sex: item.value }))
        Toast.hide()
      })
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigation.goBack()
  }

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        nicknameRef.current?.focus()
      }, 200)
    }
  }, [isVisible])
  //拍照
  const handleLaunchCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        width: 100,
        height: 100,
      })
      const formData = new FormData()
      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
        type: image.mime,
        name: image.path.split('/').pop() || `photo.jpg`,
      })

      const res = await uploadImage(formData)
      setAvatar(res.url)
    } catch (error) {
      console.error('Camera error:', error)
    }
  }
  // //从相机库选择图片
  const handleLaunchImageLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        width: 100,
        height: 100,
        multiple: false,
      })
      const formData = new FormData()

      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
        type: image.mime,
        name: image.path.split('/').pop() || `photo.jpg`,
      })
      const res = await uploadImage(formData)

      setAvatar(res.url)
    } catch (error) {
      console.error('Camera error:', error)
      // Toast.showError('无法访问相机')
    }
  }
  const handleSelectImages = async (item: any) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '相机权限申请',
          message: '需要访问您的相机' + '以便您拍摄照片。',
          buttonNeutral: '稍后再问',
          buttonNegative: '取消',
          buttonPositive: '确定',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera')
      } else {
        console.log('Camera permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
    ActionSheetImageRef.current?.hide()
    if (item.value === 1) {
      handleLaunchCamera()
    } else {
      handleLaunchImageLibrary()
    }
  }

  useEffect(() => {
    if (avatar && user?.id) {
      const params: UpdateUserRequestProps = {
        avatar: avatar,
        device_id: user?.device_id,
        id: user.id,
      }
      updateUser(user.id, params).then((res) => {
        dispatch(updateReduxUser({ avatar }))
      })
    }
  }, [avatar])
  const headerObj = {
    backgroundColor: themeGreenColor,
    title: '账号设置',
  }

  return (
    <PageView headerObj={headerObj}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.pageContainer}>
            <BounceButton
              style={styles.formItem}
              onPress={() => ActionSheetImageRef.current?.show()}
            >
              <Text style={styles.formLabel}>头像</Text>
              <View style={styles.formContent}>
                <Image
                  src={
                    user?.avatar
                      ? `${configs.BASE_URL}${user.avatar}`
                      : require('@/assets/images/avatar.png')
                  }
                  style={styles.formImage}
                />
                <Icon
                  type="feather"
                  name="chevron-right"
                  color="#ccc"
                  size={ms(16)}
                />
              </View>
            </BounceButton>

            <BounceButton
              style={styles.formItem}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Text style={styles.formLabel}>昵称</Text>
              <View style={styles.formContent}>
                {user?.nickname ? (
                  <Text style={styles.fromValue}>{user?.nickname}</Text>
                ) : (
                  <Text style={styles.fromNoValue}>未设置</Text>
                )}

                <Icon
                  type="feather"
                  name="chevron-right"
                  color="#ccc"
                  size={ms(16)}
                />
              </View>
            </BounceButton>
            <BounceButton
              style={styles.formItem}
              onPress={() => ActionSheetSexRef.current?.show()}
            >
              <Text style={styles.formLabel}>性别</Text>
              <View style={styles.formContent}>
                {user?.sex == 1 ? (
                  <Text style={styles.fromValue}>男</Text>
                ) : user?.sex == 2 ? (
                  <Text style={styles.fromValue}>女</Text>
                ) : (
                  <Text style={styles.fromNoValue}>未设置</Text>
                )}
                <Icon
                  type="feather"
                  name="chevron-right"
                  color="#ccc"
                  size={ms(16)}
                />
              </View>
            </BounceButton>
            <View style={[styles.formItem, styles.lastItem]}>
              <Text style={styles.formLabel}>手机号</Text>
              <View style={styles.formContent}>
                <Text style={styles.fromValue}>
                  {phoneFormat(user?.phonenumber)}
                </Text>
                <Icon
                  type="feather"
                  name="chevron-right"
                  color="#ccc"
                  size={ms(16)}
                />
              </View>
            </View>
          </View>
          <View style={styles.pageContainer}>
            <BounceButton onPress={handleLogout} style={styles.logoutBtn}>
              <Text style={styles.logoutBtnText}>退出登录</Text>
            </BounceButton>
          </View>
        </ScrollView>
        <CustomeActionSheet
          ref={ActionSheetSexRef}
          array={[
            { label: '男', value: 1 },
            { label: '女', value: 2 },
          ]}
          onConfirm={handleUpdateSex}
          onCancel={() => ActionSheetSexRef.current?.hide()}
        />
        <CustomeActionSheet
          ref={ActionSheetImageRef}
          array={[
            { label: '拍照', value: 1 },
            { label: '从相机选择', value: 2 },
          ]}
          onConfirm={handleSelectImages}
          onCancel={() => ActionSheetImageRef.current?.hide()}
        />
        <Modal isVisible={isVisible} backdropOpacity={0.2}>
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>昵称</Text>
            <TextInput
              ref={nicknameRef}
              value={nickname}
              style={styles.nicknameInput}
              onChangeText={(text) => setNickname(text)}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="请输入2-12位昵称"
            />
            <View style={styles.btnGroup}>
              <BounceButton
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.cancelBtnText}>取消</Text>
              </BounceButton>
              {nickname ? (
                <BounceButton
                  style={styles.modalBtn}
                  onPress={handleUpdateNickname}
                >
                  <Text style={[styles.confirmBtnText]}>确定</Text>
                </BounceButton>
              ) : (
                <View style={styles.modalBtn}>
                  <Text style={[styles.confirmBtnText, styles.disabledBtn]}>
                    确定
                  </Text>
                </View>
              )}
            </View>
          </View>
          {/* </TouchableWithoutFeedback> */}
        </Modal>
      </KeyboardAvoidingView>
    </PageView>
  )
}

export default UserPage
