import React, { useState } from 'react'
import { View, Text, FlatList, ViewProps } from 'react-native'

interface Props extends ViewProps {
  tabLabel: string
  children: React.JSX.Element
}
const CusView: React.FC<Props> = (props) => {
  const { tabLabel, children, ...restProps } = props
  return <View {...restProps}>{children}</View>
}
export default CusView
