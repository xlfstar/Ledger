import React, { useEffect, useState, useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Image as ElImage } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { isObject } from '@/utils'
import { pageBg } from '@/contents/theme'

const FastImageComponent = ({ testID, ...attr }) => <FastImage {...attr} />
const loadingErrorImg = require('@/assets/bg/loading-error.jpg')
const loadingImg = require('@/assets/bg/loading.jpg')

function Component({
  src,
  isPreload = true,
  style = {},
  priority = FastImage.priority.high,
  cache = FastImage.cacheControl.immutable,
  loadingAnimated = true,
  onError = () => null,
  ...restProps
}) {
  const isRemoteImage = typeof src === 'string'
  const isLocalImage = typeof src === 'number'

  const handleSrc = (src) => {
    if (isRemoteImage) {
      if (src.indexOf('file:///') > -1) {
        return { uri: src }
      }
      if (src.indexOf('http') === -1) {
        return { uri: `https:${src}`, cache, priority }
      }
      return { uri: src, cache, priority }
    }
    return src
  }

  const [isError, setError] = useState(false)
  const [uri, setUri] = useState(handleSrc(src))

  useEffect(() => {
    const currentSrc = handleSrc(src)
    setUri(currentSrc)
    if (isObject(currentSrc) && isPreload) {
      // 开启图片预加载
      FastImage.preload([currentSrc])
    }
  }, [src, isPreload])

  const handleOnError = (err) => {
    setError(true)
    onError && onError()
  }

  const renderLoading = () => {
    if (loadingAnimated) {
      return (
        <Image
          source={loadingImg}
          style={{ width: style.width, height: style.height }}
          resizeMode={restProps?.resizeMode || 'cover'}
        />
      )
    }
    return null
  }

  const renderLoadingError = () => {
    return (
      <Image
        source={loadingErrorImg}
        style={{ width: style.width, height: style.height }}
        resizeMode={restProps?.resizeMode || 'cover'}
      />
    )
  }

  const renderPlaceholderContent = useMemo(() => {
    return (
      <View
        style={{
          width: style.width,
          height: style.height,
          backgroundColor: '#f2f6f7',
        }}
      />
    )
  }, [style.width, style.height])

  if (isLocalImage) {
    return (
      <Image
        style={style}
        onError={handleOnError}
        {...restProps}
        source={uri}
      />
    )
  }

  return (
    <ElImage
      source={uri}
      style={{ width: style.width, height: style.height }}
      containerStyle={StyleSheet.flatten([style, { overflow: 'hidden' }])}
      onError={handleOnError}
      PlaceholderContent={renderPlaceholderContent}
      placeholderStyle={{ flex: 1, backgroundColor: pageBg }}
      ImageComponent={FastImageComponent}
      transition={false}
      {...restProps}
    />
  )
}

export default React.memo(Component)
