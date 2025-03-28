import React, { memo } from 'react'
import { BounceButton, Image } from '@/components'
import { ImageUrl } from '@/utils'
import styles from './styles'

type BottomItemProps = {
  item: string
  index: number
  current: number
  onPress: (index: number) => void
}

const BottomItem: React.FC<BottomItemProps> = ({
  item,
  index,
  current,
  onPress,
}) => {
  return (
    <BounceButton
      style={[styles.bottomImageBtn, index === current && styles.currentBtn]}
      onPress={() => onPress(index)}
    >
      <Image
        src={ImageUrl(item)}
        style={styles.bottomImage}
        resizeMode="cover"
      />
    </BounceButton>
  )
}
export default memo(BottomItem)
