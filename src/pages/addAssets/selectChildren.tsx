import { PageView, BounceButton, Image } from '@/components'
import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { themeGreenColor } from '@/contents/theme'
import { ms } from 'react-native-size-matters'
import configs from '@/configs'
// import { useNavigation } from '@react-navigation/native'
// import {assetsTypes,iconList} from '@/constant/assetsIcon'
import { AssetsAccountItem } from '@/api/assets-accounts'
const SelectChildrenPage = ({ route, navigation }: any) => {
  const { item } = route.params || {}
  const { children: list, name } = item || {}
  const handlePress = (ele: AssetsAccountItem) => {
    // const obj = { ...ele, ...{ type, label, typeName } }
    navigation.push('addAssetsInput', { item: ele })
  }

  const headerObj = {
    backgroundColor: themeGreenColor,
    centerComponent: (
      <Text style={{ fontSize: 18, color: '#000' }}>添加{name}</Text>
    ),
  }
  return (
    <PageView headerObj={headerObj} style={styles.pageView}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.list}>
          {list.map((ele: AssetsAccountItem, index: number) => {
            const { name, remark, icon } = ele || {}

            return (
              <BounceButton
                style={styles.item}
                onPress={() => handlePress(ele)}
                key={index}
              >
                <Image src={configs.BASE_URL + icon} style={styles.icon} />
                <View style={styles.content}>
                  <View style={styles.labelView}>
                    <Text style={styles.label}>{name}</Text>
                    {remark && <Text style={styles.caption}>{remark}</Text>}
                  </View>
                  <Icon
                    type="feather"
                    name="chevron-right"
                    color="#ccc"
                    size={ms(18)}
                  />
                </View>
              </BounceButton>
            )
          })}
        </View>
      </ScrollView>
    </PageView>
  )
}
export default SelectChildrenPage
