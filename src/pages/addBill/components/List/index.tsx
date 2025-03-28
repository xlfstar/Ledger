import React, { useState, useEffect, useMemo, memo, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native'
import {
  BounceButton,
  ModalDate,
  ActionSheetClassify,
  ActionSheetAssets,
  Toast,
  CustomeActionSheet,
  Image,
  ImagesPanel,
} from '@/components'
import { ms } from 'react-native-size-matters'
import { Icon } from 'react-native-elements'
import { ActionSheetRef } from 'react-native-actions-sheet'
import dayjs from '@/utils/dayjs'
import {
  blockColor9,
  primaryTextColor,
  themeGreenColor,
  themeOrangeColor,
} from '@/contents/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { transformMoney, isEmpty, ImageUrl } from '@/utils'
import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { createBill } from '@/api/bill'
import { updateBill } from '@/store/slices/billSlice'
import { uploadImage, uploadImages, ResponseData } from '@/api/uploads'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker'
import request from '@/utils/request'
import configs from '@/configs'

const list = [
  '/uploads/1742387554686-667661016.jpg',
  '/uploads/1742387589287-502463640.jpg',
  '/uploads/1742387658782-129376774.jpg',
  '/uploads/1742387832931-894997249.jpg',
  '/uploads/1742387833032-340540384.jpg',
  '/uploads/1742387833099-497949696.jpg',
]
interface ListComponentProps {
  type: number
  onCancel?: () => void
  onSave?: (type: string) => void
}

const ListComponent = ({
  type,
  onCancel,
  onSave,
}: ListComponentProps): JSX.Element => {
  const dispath = useDispatch<AppDispatch>()
  const insets = useSafeAreaInsets()
  const { user } = useSelector((state: RootState) => state.auth)
  const [classifyActiveItem, setClassifyActiveItem] = useState<any>(null)
  const [assetsActiveItem, setAssetsActiveItem] = useState<any>(null)
  const [amount, setAmount] = useState<string | undefined>()
  const amountText = useMemo(
    () => transformMoney(Number(amount) * 100),
    [amount]
  )
  const amountRef = useRef(null)
  const [date, setDate] = useState<number>(dayjs().valueOf())

  const [remark, setRemark] = useState<string | undefined>()
  const [images, setImages] = useState<string[]>([])
  const ActionSheetClassifyRef = useRef<ActionSheetRef>(null)
  const ActionSheetAssetsRef = useRef<ActionSheetRef>(null)
  const ActionSheetImageRef = useRef<ActionSheetRef>(null)
  const handleSelect = (type: number) => {
    switch (type) {
      case 1:
        ActionSheetClassifyRef.current?.show()
        break
      case 2:
        ActionSheetAssetsRef.current?.show()
        break
      default:
        break
    }
  }

  const handleSelectDate = () => {
    ModalDate.picker({
      value: date,
      mode: 'day',
      title: '选择日期',
    }).then((res) => {
      setDate(dayjs(res).valueOf())
    })
  }

  const handleConfirmClassify = (item: any) => {
    setClassifyActiveItem(item)
    ActionSheetClassifyRef.current?.hide()
  }

  const handleConfirmAsset = (item: any) => {
    setAssetsActiveItem(item)
    ActionSheetAssetsRef.current?.hide()
  }

  const handleSave = async () => {
    const body = {
      type,
      date,
      amount: Number(amount) * 100,
      remark,
      assets_id: assetsActiveItem?.id,
      classify_id: classifyActiveItem?.id,
      user_id: user?.id,
      images: !isEmpty(images) ? JSON.stringify(images) : '',
    }

    if (!body.amount) {
      Toast.showError('请输入金额')
      return
    }
    if (!body.classify_id) {
      Toast.showError('请选择分类')
      return
    }
    try {
      Toast.showLoading('请稍后...')
      const res = await createBill(body)
      dispath(updateBill(res))
      Toast.hide()
      onSave && onSave('success')
    } catch (error) {
      Toast.showError('保存失败')
    }
  }
  //拍照
  const handleLaunchCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
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
      setImages([...images, res.url])
    } catch (error) {
      console.error('Camera error:', error)
      Toast.showError('无法访问相机')
    }
  }
  // //从相机库选择图片
  const handleLaunchImageLibrary = async () => {
    try {
      const imageList = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: true,
        maxFiles: 4,
      })
      const formData = new FormData()

      imageList.forEach((image, index) => {
        formData.append('images', {
          uri:
            Platform.OS === 'android'
              ? image.path
              : image.path.replace('file://', ''),
          type: image.mime,
          name: image.path.split('/').pop() || `photo${index}.jpg`,
        })
      })
      const res = await uploadImages(formData)
      const list = res?.map((item) => item.url)
      setImages([...images, ...list])
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

  const handleShowImages = () => {
    ImagesPanel.picker({
      list,
      allowEdit: true,
      add: () => {
        console.log(222)

        ActionSheetImageRef.current?.show()
      },
      destroy: (index: number) => {
        console.log({ index })
      },
    })
  }

  const renderImageBtn = useMemo(() => {
    {
      if (isEmpty(images)) {
        return (
          <BounceButton
            style={styles.valueButton}
            onPress={() => ActionSheetImageRef.current?.show()}
          >
            <Icon
              type="feather"
              name="camera"
              size={16}
              color={primaryTextColor}
            />
            <Text style={styles.bottonText}>图片</Text>
          </BounceButton>
        )
      }
      if (images.length === 1) {
        return (
          <BounceButton style={styles.valueButton} onPress={handleShowImages}>
            <Image src={ImageUrl(images[0])} style={styles.btnImage} />
            <View style={styles.imagesLength}>
              <Text style={{ color: '#fff', fontSize: 12 }}>
                {images.length}张
              </Text>
            </View>
          </BounceButton>
        )
      }
      if (images.length > 1) {
        return (
          <BounceButton style={styles.valueButton} onPress={handleShowImages}>
            <Image
              src={ImageUrl(images[images.length - 1])}
              style={styles.btnImage}
            />
            <View style={styles.imagesLength}>
              <Text style={{ color: '#fff', fontSize: 12 }}>
                {images.length}张
              </Text>
            </View>
            <View style={[styles.bgView, styles.bgView1]}></View>
            <View style={[styles.bgView, styles.bgView2]}></View>
          </BounceButton>
        )
      }
    }
  }, [images])

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View
        style={[
          styles.valueView,
          type === 2 && { borderBottomColor: themeOrangeColor },
        ]}
      >
        <View style={styles.inputView}>
          <Text
            style={[
              styles.inputText,
              type === 2 && { color: themeOrangeColor },
            ]}
          >
            {amountText}
          </Text>
          <TextInput
            ref={amountRef}
            keyboardType="numeric"
            value={amount}
            style={styles.valueText}
            placeholderTextColor={'transparent'}
            cursorColor={'transparent'}
            onChangeText={(text) => {
              // 只允许数字和小数点
              const regex = /^(\d+(\.\d{0,2})?)?$/

              // 如果输入符合正则，且小数点后小于等于两位，更新输入
              if (regex.test(text)) {
                setAmount(text)
              }
            }}
          />
        </View>
        {/* <BounceButton
          style={styles.valueButton}
          onPress={() => ActionSheetImageRef.current?.show()}
        >
          <Icon
            type="feather"
            name="camera"
            size={16}
            color={primaryTextColor}
          />
          <Text style={styles.bottonText}>图片</Text>
        </BounceButton> */}
        {renderImageBtn}
      </View>
      <View style={{ flex: 1 }}>
        <BounceButton
          style={[styles.formItem, { marginTop: ms(10) }]}
          onPress={() => handleSelect(1)}
        >
          <Icon type="feather" name="grid" color={blockColor9} size={16} />
          <Text style={styles.formLabel}>分类</Text>
          <Text
            style={[
              styles.formValue,
              !classifyActiveItem?.id && { color: '#ccc' },
            ]}
          >
            {classifyActiveItem?.label || '选择分类'}
          </Text>
        </BounceButton>
        <BounceButton style={styles.formItem} onPress={() => handleSelect(2)}>
          <Icon
            type="feather"
            name="credit-card"
            color={blockColor9}
            size={16}
          />
          <Text style={styles.formLabel}>账户</Text>
          <Text
            style={[
              styles.formValue,
              !assetsActiveItem?.id && { color: '#ccc' },
            ]}
          >
            {assetsActiveItem?.name || '选择账户'}
          </Text>
        </BounceButton>
        <BounceButton
          style={styles.formItem}
          onPress={() => handleSelectDate()}
        >
          <Icon type="feather" name="pie-chart" color={blockColor9} size={16} />
          <Text style={styles.formLabel}>时间</Text>
          <Text style={styles.formValue}>
            {dayjs(date).format('YYYY年MM月DD日')}
          </Text>
        </BounceButton>
        <View style={styles.formItem}>
          <Icon type="feather" name="bookmark" color={blockColor9} size={16} />
          <Text style={styles.formLabel}>备注</Text>
          <TextInput
            style={styles.formValue}
            placeholder="..."
            value={remark}
            cursorColor={themeGreenColor}
            onChangeText={(text) => {
              setRemark(text)
            }}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <BounceButton
          style={[styles.footerButton, styles.footerButtonCancel]}
          onPress={onCancel}
        >
          <Text style={styles.footerButtonCancelText}>取消</Text>
        </BounceButton>
        <BounceButton
          style={[styles.footerButton, styles.footerButtonSave]}
          onPress={handleSave}
        >
          <Text style={styles.footerButtonSaveText}>保存</Text>
        </BounceButton>
      </View>
      <ActionSheetClassify
        type={type}
        onConfirm={handleConfirmClassify}
        activeId={classifyActiveItem?.id}
        ref={ActionSheetClassifyRef}
      />
      <ActionSheetAssets
        type={type}
        onConfirm={handleConfirmAsset}
        activeId={assetsActiveItem?.id}
        ref={ActionSheetAssetsRef}
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
    </View>
  )
}
export default memo(ListComponent)
