import React, { useEffect, useState, memo } from 'react'
import { View, Image } from 'react-native'
import { ImageUrl } from '@/utils'
import { screen } from '@/contents'
import styles from './styles'

type Props = { item: string; index: number }

const maxWidth = screen.width

const Item: React.FC<Props> = ({ item, index }) => {
  const url = ImageUrl(item)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    Image.getSize(
      url,
      (w, h) => {
        let width, height
        if (!w || !h) {
          width = w
          height = h
        } else {
          if (w > h) {
            width = maxWidth
            height = (h / w) * maxWidth
          } else {
            height = maxWidth
            width = (w / h) * maxWidth
          }
        }
        setDimensions({ width, height })
      },
      (error) => {
        console.error('获取图片尺寸失败:', error)
      }
    )
  }, [url])

  return (
    <View style={[styles.imageContainer, { width: maxWidth }]}>
      <Image
        source={{ uri: url }}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          aspectRatio: dimensions.width / dimensions.height || 1,
        }}
        resizeMode="contain"
      />
    </View>
  )
}
export default memo(Item)
