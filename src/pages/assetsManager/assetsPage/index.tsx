import React, { useEffect, useMemo, useRef, useState } from 'react'
import { PageView, Image, Toast } from '@/components'
import styles from './styles.ts'
import {
  Text,
  View,
  LayoutChangeEvent,
  SectionList,
  Pressable,
} from 'react-native'
import { transformMoney } from '@/utils'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import emptyIcon from '@/assets/images/new_empty.png'
import Animated, { runOnJS } from 'react-native-reanimated'
import { ms } from 'react-native-size-matters'
import SwipeableView from '@/components/SwipeableView'
import { backgroundColor, pageBg } from '@/contents/theme.ts'
import { getAssetsList, deleteAssets, AssetsForOneResponse } from '@/api/assets'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { CommonActions } from '@react-navigation/native'
import configs from '@/configs/index.ts'
import { fetchAssetsList } from '@/store/slices/assetsSlice.ts'
import { screen } from '@/contents/index.ts'

const AssetsPage: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const { assetsList, summary } = useSelector(
    (state: RootState) => state.assets
  )
  const { user } = useSelector((state: RootState) => state.auth)

  const [listHeight, setListHeight] = useState<number>(0)
  const [topCardHeight, setTopCardHeight] = useState<number>(0)
  const [footerHeight, setFooterHeight] = useState<number>(0)

  const emptyHeight = useMemo((): number => {
    return listHeight - topCardHeight - footerHeight - 70
  }, [listHeight, topCardHeight, footerHeight])

  const handleAddAssets = (): void => {
    navigation.navigate('addAssets')
  }

  const onDelete = async (item: AssetsForOneResponse) => {
    // ...existing code...
    const { id } = item || {}
    Toast.showLoading('删除中...')
    await deleteAssets(id)
    Toast.hide()
    dispatch(fetchAssetsList())
  }
  const FrontItem = ({ item, index }: any) => {
    const { account, id, name, remark, amount, card_number } = item || {}
    const { type, icon } = account || {}

    return (
      <Pressable
        style={styles.frontItem}
        onPress={() => navigation.push('assetDetail', { id })}
        key={`${id}-${index}`}
      >
        <View style={styles.iconOutView}>
          <Image src={configs.BASE_URL + icon} style={styles.icon} />
        </View>

        <View style={styles.itemLabel}>
          <Text style={styles.itemName}>
            {name}
            {card_number && `(${card_number})`}
          </Text>
          {remark && <Text style={styles.itemRemark}>{remark}</Text>}
        </View>
        <Text style={styles.itemBalance}>
          {Number(type) === 2 && '-'}
          {transformMoney(amount)}
        </Text>
      </Pressable>
    )
  }

  const SectionItem = ({ item, index }: any) => {
    const { name, id, parent_id } = item || {}
    return (
      <SwipeableView
        key={item.id.toString()}
        id={item.id}
        rightButtons={[
          <Pressable
            key="delete"
            style={styles.rightAction}
            onPress={() => onDelete(item)}
          >
            <Text style={styles.rightActionText}>删除</Text>
          </Pressable>,
        ]}
        threshold={-100}
      >
        <FrontItem item={item} index={index} key={name + id + parent_id} />
      </SwipeableView>
    )
  }

  const SectionHeader = ({ section }: any) => {
    const { accountData } = section || {}
    const { label, total, type, parent_name } = accountData || {}
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.headerTypeName}>{parent_name || label}</Text>
        <Text style={styles.headerTotal}>
          {Number(type) === 2 && '-'}
          {transformMoney(total)}
        </Text>
      </View>
    )
  }

  const ListFooterComponent: React.FC = () => {
    const handleLayout = (event: LayoutChangeEvent): void => {
      setFooterHeight(event.nativeEvent.layout.height)
    }

    return (
      <View style={styles.addAssets} onLayout={handleLayout}>
        <Pressable style={styles.addAssetsBtn} onPress={handleAddAssets}>
          <Icon type="antdesign" name={'plus'} color={'#000'} size={ms(18)} />
          <Text style={styles.addAssetsText}>添加账户</Text>
        </Pressable>
      </View>
    )
  }

  const ListHeaderComponent: React.FC = () => {
    const { total, positive, negative } = summary || {}

    const handleLayout = (event: LayoutChangeEvent): void => {
      setTopCardHeight(event.nativeEvent.layout.height)
    }

    return (
      <View style={styles.topCard} onLayout={handleLayout}>
        <Text style={styles.topCardText}>净资产</Text>
        <Text style={styles.balanceText}>{transformMoney(total)}</Text>
        <View style={styles.topCardRight}>
          <Text style={styles.topCardRightText}>
            {'资产 '}
            <Text style={styles.topCardRightTextValue}>
              {transformMoney(positive)}
            </Text>
          </Text>
          <Text style={styles.topCardRightText}>
            {'负债 '}
            <Text style={styles.topCardRightTextValue}>
              {transformMoney(negative)}
            </Text>
          </Text>
        </View>
      </View>
    )
  }

  const handleBack = () => {
    navigation.replace('mainTab', { screen: 'home' })
  }

  const headerObj = {
    backgroundColor: 'white',
    centerComponent: <Text style={styles.pageTitle}>资产管理</Text>,
  }

  return (
    <PageView headerObj={headerObj} style={styles.wrapper} onBack={handleBack}>
      <SectionList
        onLayout={({ nativeEvent }) => {
          setListHeight(nativeEvent.layout.height)
        }}
        contentContainerStyle={styles.containerStyle}
        sections={assetsList}
        renderItem={({ item, index }) => (
          <SectionItem item={item} index={index} />
          // <FrontItem item={item} index={index} />
        )}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderSectionHeader={({ section }) => (
          <SectionHeader section={section} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={null}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={() => (
          <Animated.View style={[styles.emptyData, { height: emptyHeight }]}>
            <Image src={emptyIcon} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>定期更新资产，轻松掌握资产状况</Text>
          </Animated.View>
        )}
      />
    </PageView>
  )
}

export default AssetsPage
