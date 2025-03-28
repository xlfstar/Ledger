import React from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'

interface CustomRefreshControlProps extends RefreshControlProps {
  progressViewOffset?: number
}

const CustomRefreshControl: React.FC<CustomRefreshControlProps> = ({
  progressViewOffset = 50,
  ...props
}) => {
  return (
    <RefreshControl
      progressViewOffset={progressViewOffset}
      colors={['#2089dc']}
      tintColor="#2089dc"
      {...props}
    />
  )
}

export default CustomRefreshControl
