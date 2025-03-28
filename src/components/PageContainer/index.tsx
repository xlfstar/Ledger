import React from 'react'
import { View, Text, ViewProps, ViewStyle, StyleProp } from 'react-native'
import Header, { TypeHeaderObj } from './header'
import { pageBg } from '@/contents/theme'
import styles from './styles'
type Props = Partial<{
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  headerObj?: TypeHeaderObj
  headerHide?: boolean
  onBack?: () => void
  onTouchStart?: () => void
  [key: string]: any
}>
const PageContainer = ({
  style,
  children,
  onTouchStart,
  ...restPros
}: Props): JSX.Element => {
  return (
    <View
      style={[styles.pageContainer, { backgroundColor: pageBg }, style]}
      onTouchStart={onTouchStart}
      {...restPros}
    >
      <Header {...restPros} />
      <View style={styles.pageContent}>{children}</View>
    </View>
  )
}
export default PageContainer
