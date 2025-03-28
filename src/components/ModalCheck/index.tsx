import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { BounceButton, Image, ModalType } from '@/components'
import { Icon } from 'react-native-elements'
import { ms } from 'react-native-size-matters'
import { isEmpty } from '@/utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
export type ItemObj = {
  label: string
  value: number
  icon?: any
}
export type Props = {
  list: ItemObj[]
  onChange: (item: ItemObj) => void,
  children?:JSX.Element
}
const ModalCheck = ({ list, onChange,children=<View></View> }: Props) => {
  const insets = useSafeAreaInsets() // 安全区域
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [visible, setVisible] = useState(false)
  const [topHeight, setTopHeight] = useState(0)
  const handleChange = (item: ItemObj, index: number) => {
    if(tabIndex===index) return
    setVisible(false)
    setTabIndex(index)
    onChange(item)
  }

  useEffect(() => {
    if (visible) {
      ModalType.show({
        children: renderCheck(),
        height: topHeight,
      })
    } else {
      ModalType.hide()
    }
  }, [visible])

  const renderCheck = () => {
    return (
      <View style={styles.listView}>
        {list.map((item, index) => {
          const { label, icon } = item
          const isActive = tabIndex === index
          return (
            <Pressable
              style={styles.typeItem}
              onPress={() => handleChange(item, index)}
              key={label}
            >
              {icon && <Image src={icon} style={styles.typeItemIcon} />}
              <View
                style={[
                  styles.typeItemText,
                  index===0 &&{borderTopColor:'transparent'}
                ]}
              >
                <Text>{label}</Text>
                {isActive && (
                  <Icon
                    name={'check'}
                    color={'#000'}
                    size={ms(18)}
                    type="antdesign"
                  />
                )}
              </View>
            </Pressable>
          )
        })}
      </View>
    )
  }
  return (
    <View
      style={[styles.pageHeader, { paddingTop: insets.top + ms(20) }]}
      onLayout={({ nativeEvent }) => {
        setTopHeight(nativeEvent.layout.height)
      }}
    > 
      <BounceButton
        style={styles.centerBtn}
        onPress={() => setVisible(!visible)}
      >
        <Text style={styles.centerLabel}>{list[tabIndex].label}</Text>
        <Icon
          name={'triangle-down'}
          color={'#000'}
          size={ms(18)}
          type="entypo"
        />
      </BounceButton>
      {children}
    </View>
  )
}
export default ModalCheck
