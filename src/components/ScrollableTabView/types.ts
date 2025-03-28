import { ReactNode } from 'react'
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ScrollViewProps,
  Animated,
  LayoutChangeEvent,
} from 'react-native'

export interface TabBarProps {
  goToPage: (page: number) => void
  tabs: string[]
  activeTab: number
  scrollValue: Animated.Value
  containerWidth: number
  backgroundColor?: string
  activeTextColor?: string
  inactiveTextColor?: string
  textStyle?: StyleProp<TextStyle>
  tabStyle?: StyleProp<ViewStyle>
  renderTab?: (
    name: string,
    page: number,
    isTabActive: boolean,
    onPressHandler: (page: number) => void
  ) => ReactNode
  underlineStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  tabsContainerStyle?: StyleProp<ViewStyle>
  onScroll?: (value: number) => void
}

export interface ScrollableTabViewProps {
  tabBarPosition?: 'top' | 'bottom' | 'overlayTop' | 'overlayBottom'
  initialPage?: number
  page?: number
  onChangeTab?: (tab: { i: number; ref: ReactNode; from: number }) => void
  onScroll?: (value: number) => void
  renderTabBar?: ((props: TabBarProps) => ReactNode) | false
  tabBarUnderlineStyle?: StyleProp<ViewStyle>
  tabBarBackgroundColor?: string
  tabBarActiveTextColor?: string
  tabBarInactiveTextColor?: string
  tabBarTextStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  contentProps?: ScrollViewProps
  scrollWithoutAnimation?: boolean
  locked?: boolean
  prerenderingSiblingsNumber?: number
  children: ReactNode
}

export interface DefaultTabBarProps extends TabBarProps {
  backgroundColor?: string
  activeTextColor?: string
  inactiveTextColor?: string
  textStyle?: StyleProp<TextStyle>
  tabStyle?: StyleProp<ViewStyle>
  renderTab?: (
    name: string,
    page: number,
    isTabActive: boolean,
    onPressHandler: (page: number) => void
  ) => ReactNode
  underlineStyle?: StyleProp<ViewStyle>
  tabBarUnderlineStyle?: StyleProp<ViewStyle>
}

export interface ScrollableTabBarProps extends TabBarProps {
  scrollOffset?: number
  style?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>
  tabsContainerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  underlineStyle?: StyleProp<ViewStyle>
}

export interface SceneComponentProps {
  shouldUpdated: boolean
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export interface StaticContainerProps {
  shouldUpdate: boolean
  children: ReactNode
}

export interface ButtonProps {
  accessible?: boolean
  accessibilityLabel?: string
  accessibilityTraits?: string
  onPress?: () => void
  onLayout?: (event: LayoutChangeEvent) => void
  children: ReactNode
  style?: StyleProp<ViewStyle>
}
