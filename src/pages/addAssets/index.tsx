import { PageView, BounceButton, Image } from '@/components'
import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'

import { FlatList } from 'react-native-gesture-handler'
import configs from '@/configs'
import { themeGreenColor } from '@/contents/theme'
import { ms } from 'react-native-size-matters'
import { isEmpty } from '@/utils'
import { AppDispatch, RootState } from '@/store'
import { AssetsAccountItem } from '@/api/assets-accounts'
const AddAssets = ({ navigation }: any) => {
  const { assetsAccountList } = useSelector(
    (state: RootState) => state.assetsAccounts
  )

  // const navigation = useNavigation()
  const handlePress = (item: AssetsAccountItem) => {
    const { children } = item || {}
    if (isEmpty(children)) {
      navigation.push('addAssetsInput', {
        item: Object.assign({}, item, { typeName: item.name }),
      })
    } else {
      navigation.push('selectChildren', {
        item: Object.assign({}, item, { typeName: item.name }),
      })
    }
  }

  const headerObj = {
    backgroundColor: themeGreenColor,
    centerComponent: (
      <Text style={{ fontSize: 18, color: '#000' }}>添加账户</Text>
    ),
  }
  return (
    <PageView headerObj={headerObj} style={styles.pageView}>
      <View style={styles.container}>
        <FlatList
          data={assetsAccountList}
          contentContainerStyle={{ backgroundColor: 'white' }}
          renderItem={({ item, index }) => (
            <BounceButton
              style={styles.item}
              onPress={() => handlePress(item)}
              key={index}
            >
              <Image
                src={`${configs.BASE_URL}${item.icon}`}
                style={styles.icon}
              />
              <View style={styles.content}>
                <View style={styles.labelView}>
                  <Text style={styles.label}>{item.name}</Text>
                  {item.remark && (
                    <Text style={styles.caption}>{item.remark}</Text>
                  )}
                </View>
                <Icon
                  type="feather"
                  name="chevron-right"
                  color="#ccc"
                  size={ms(18)}
                />
              </View>
            </BounceButton>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* <ScrollView style={{ flex: 1 }}>
        <View style={styles.list}>
          {assetsTypes.map((item, index) => {
            const { name,  caption,color,iconId } = item || {}
            const iconObj = iconList.find(i=>i.id===iconId)
            const {icon} = iconObj || {}
            return (
              <BounceButton style={styles.item} onPress={()=>handlePress(item)} key={index}>
                <View style={[styles.iconView,{backgroundColor:color}]} >
                  <Image source={icon} style={styles.icon} />
                </View>
                <View style={styles.content}>
                <View style={styles.labelView}>
                  <Text style={styles.label}>{name}</Text>
                  {caption && <Text style={styles.caption}>{caption}</Text>}
                </View>
                <Icon type='antdesign' name="right" color="#ccc" size={12} />
                </View>
              </BounceButton>
            )
          })}
        </View>
      </ScrollView> */}
    </PageView>
  )
}
export default AddAssets
