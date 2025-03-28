import React, { useState, useEffect, useMemo } from 'react'
import { Text, View, PixelRatio } from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { Modal, BounceButton } from '@/components'
import {
  lineColor,
  gray1,
  themeColor,
  themeBlueColor,
  blockColor3,
} from '@/contents/theme'
import { window, shadow } from '@/contents'

interface Props extends Dialog.ShowOptions {
  isVisible: boolean
  onDestroy?: () => void
}

const Alert: React.FC<Props> = (props): JSX.Element => {
  const {
    isVisible,
    title = '系统提示',
    message,
    options = [],
    onDestroy,
  } = props
  const [visible, setVisible] = useState<boolean>(true)

  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  // TODO: 取消
  const handleCancel = (): void => {
    setVisible(false)
    onDestroy?.()
  }

  // 头部组件
  const renderHeader = useMemo(() => {
    return (
      <View style={[styles.header, styles.center]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }, [title])

  // 身体组件
  const renderBody = useMemo(() => {
    return (
      <View style={[styles.body, styles.center]}>
        <Text style={styles.message}>{message}</Text>
      </View>
    )
  }, [message])

  // 底部默认按钮
  const renderDefaultButtonGroups = () => {
    return (
      <View style={styles.footer}>
        <BounceButton
          onPress={handleCancel}
          style={[styles.button, styles.center]}
        >
          <Text style={[styles.buttonText]}>取消</Text>
        </BounceButton>
        <View style={styles.line} />
        <BounceButton
          onPress={handleCancel}
          style={[styles.button, styles.center]}
        >
          <Text style={[styles.buttonText, { color: themeColor }]}>确定</Text>
        </BounceButton>
      </View>
    )
  }

  // TODO: 数据渲染的按钮点击事件
  const handleButtonToPress = (item: Dialog.ButtonOptions) => {
    if (item?.onPress && typeof item.onPress === 'function') {
      item.onPress()
    }
    handleCancel()
  }

  // 底部组件
  const renderFooter = useMemo(() => {
    if (options.length > 0 && options.length <= 3) {
      return (
        <View style={styles.footer}>
          {options.map((item: Dialog.ButtonOptions, index: number) => (
            <View key={index.toString(30)} style={styles.button}>
              <BounceButton
                onPress={() => handleButtonToPress(item)}
                style={[styles.button, styles.center]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    item.type === 'middle' && { color: themeBlueColor },
                    item.type === 'confirm' && { color: themeColor },
                  ]}
                >
                  {item.text}
                </Text>
              </BounceButton>
              {index < options.length && options.length > 1 ? (
                <View style={styles.line} />
              ) : null}
            </View>
          ))}
        </View>
      )
    }
    return renderDefaultButtonGroups()
  }, [options, onDestroy])

  return (
    <Modal
      avoidKeyboard
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      animationInTiming={200}
      animationOutTiming={200}
      isVisible={visible}
      style={styles.modal}
      backdropOpacity={0}
      onBackButtonPress={handleCancel}
    >
      <View
        style={[styles.content, { width: window.width - ms(80), ...shadow() }]}
      >
        {title && renderHeader}
        {renderBody}
        {renderFooter}
      </View>
    </Modal>
  )
}

const styles = ScaledSheet.create({
  modal: {
    alignItems: 'center',
  },
  message: {
    fontSize: '13@ms',
    color: blockColor3,
    textAlign: 'center',
    lineHeight: '18@ms',
  },
  line: {
    height: '100%',
    width: 1 / PixelRatio.get(),
    backgroundColor: lineColor,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  buttonText: {
    fontSize: '14@ms',
    color: gray1,
  },
  title: {
    fontSize: '16@ms',
    color: blockColor3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    height: '40@vs',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: lineColor,
  },
  body: {
    paddingVertical: '10@ms',
    paddingHorizontal: '15@ms',
    position: 'relative',
  },
  footer: {
    height: '40@vs',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: lineColor,
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4@ms',
  },
})

export default React.memo(Alert)
