import React, { memo, useRef } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { BounceButton, CustomeActionSheet, Toast } from '@/components'
import { primaryTextColor, themeGreenColor } from '@/contents/theme'
import {
  useNavigation,
  CommonActions,
  StackActions,
} from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ms } from 'react-native-size-matters'
import styles from './styles'
import { ActionSheetRef } from 'react-native-actions-sheet'
import { ItemProps } from '@/components/ActionSheet'
export type TypeHeaderObj = Partial<{
  // TypeHeaderObj is a type that is a partial object of the following properties{
  leftComponent?: React.ReactNode | null
  centerComponent?: React.ReactNode | null
  rightComponent?: React.ReactNode | null
  title?: string
  backgroundColor?: string
  isBackHome?: boolean
}>
type Props = {
  headerObj?: TypeHeaderObj
  headerHide?: boolean
  onBack?: () => void
  getHeaderHeight?: (height: number) => void
}
const actionList = [
  {
    label: '转发',
    value: 1,
  },
  {
    label: '关于资产管家',
    value: 2,
  },
]
const HeaderCom = ({
  headerObj,
  headerHide = false,
  onBack,
  getHeaderHeight = () => {},
}: Props): JSX.Element | null => {
  const {
    leftComponent = null,
    centerComponent = null,
    rightComponent = null,
    title = '',
    backgroundColor = 'white',
    isBackHome = false,
  } = headerObj || {}
  const ActionSheetSelectRef = useRef<ActionSheetRef>(null)
  const navigation = useNavigation()

  const insets = useSafeAreaInsets()
  const DefaultLeftComponent = () => {
    const handleBack = () => {
      onBack ? onBack() : navigation.goBack()
    }
    return (
      <BounceButton onPress={handleBack} style={styles.backButton}>
        <Icon
          type="feather"
          name="chevron-left"
          color={primaryTextColor}
          size={ms(30)}
        />
      </BounceButton>
    )
  }
  if (headerHide) {
    return null
  }
  const goHome = () => {
    navigation.dispatch(
      StackActions.replace('mainTab', {
        screen: 'detail',
        // animation: 'slide_from_top',
      })
    )
    // 如果上面的方法不生效，可以尝试以下替代方案
  }
  const rightCom = () => {
    if (isBackHome) {
      return (
        <View style={styles.goHomeBtn}>
          <BounceButton
            style={styles.pointGroup}
            onPress={() => ActionSheetSelectRef.current?.show()}
          >
            <View style={styles.point}></View>
            <View style={[styles.point, styles.centerPoint]}></View>
            <View style={styles.point}></View>
          </BounceButton>
          <View style={styles.centerLine}></View>
          <BounceButton style={styles.circleGroup} onPress={goHome}>
            <View style={styles.outsideCircle}>
              <View style={styles.insideCircle}></View>
            </View>
          </BounceButton>
        </View>
      )
    } else {
      return rightComponent
    }
  }
  const handleConfirm = ({ label, value }: ItemProps) => {
    ActionSheetSelectRef.current?.hide()
    if (value === 1) {
      Toast.showLoading('转发')
    } else {
      Toast.showLoading('关于资产管家')
    }
  }
  return (
    <View
      style={{ backgroundColor: backgroundColor, paddingTop: insets.top }}
      onLayout={({ nativeEvent }) => {
        getHeaderHeight(nativeEvent.layout.height)
      }}
    >
      <View style={[styles.header]}>
        <View style={styles.leftComponent}>
          {leftComponent || <DefaultLeftComponent />}
        </View>
        <View style={styles.centerComponent}>
          {centerComponent || (
            <Text
              style={styles.headerTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          )}
        </View>
        <View style={styles.rightComponent}>{rightCom()}</View>
      </View>
      <CustomeActionSheet
        ref={ActionSheetSelectRef}
        array={actionList}
        onConfirm={handleConfirm}
        onCancel={() => {
          ActionSheetSelectRef.current?.hide()
        }}
      />
    </View>
  )
}
export default memo(HeaderCom)
