import React from 'react'
import { Text, View, ViewStyle } from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import ToastLoad from './LoadContainer'
import FlashMessage, {
  showMessage,
  MessageType,
  FlashMessageProps,
} from 'react-native-flash-message'
import { ms } from 'react-native-size-matters'

interface ToastConfig {
  position: 'top' | 'bottom' | 'center'
  floating: boolean
}

let lastToast: RootSiblings | null = null
let timeOut: NodeJS.Timeout | null = null

class Toast {
  static showLoading(message?: string, options?: FlashMessageProps): void {
    timeOut = setTimeout(() => {
      this.hide()
    }, 5000)
    this.show('loading', message, options)
  }

  static showLongLoading(message: string, options?: FlashMessageProps): void {
    if (timeOut) clearTimeout(timeOut)
    this.show('loading', message, options)
  }

  static showSuccess(message: string, options?: FlashMessageProps): void {
    this.show('success', message, options)
  }

  static showInfo(message: string, options?: FlashMessageProps): void {
    this.show('info', message, options)
  }

  static showWarn(message: string, options?: FlashMessageProps): void {
    this.show('warning', message, options)
  }

  static showError(message: string, options?: FlashMessageProps): void {
    this.show('danger', message, options)
  }

  static hide(): void {
    if (lastToast) {
      lastToast.destroy()
    }
  }

  static show(
    type: MessageType | 'loading',
    message?: string,
    options?: FlashMessageProps
  ): RootSiblings | void {
    if (lastToast) {
      lastToast.destroy()
    }

    switch (type) {
      case 'loading':
        lastToast = new RootSiblings(<ToastLoad message={message} />)
        break
      case 'success':
      case 'info':
      case 'warning':
      case 'danger': {
        const defaultOptions: FlashMessageProps = {
          backgroundColor: 'rgba(0,0,0,0.5)',
        }
        const config: ToastConfig = {
          position: 'center',
          floating: true,
        }
        const mergeOptions = { ...defaultOptions, ...options }

        const callback = (): void => {
          showMessage({
            message: message || '',
            type,
            ...mergeOptions,
          })
        }

        const customMessageComponent = (): JSX.Element | null => {
          if (!message) {
            return null
          }
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                marginHorizontal: ms(20),
                padding: ms(12),
                borderRadius: ms(8),
                zIndex: 999999,
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
              }}
            >
              <Text
                style={{
                  fontSize: ms(15),
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {message}
              </Text>
            </View>
          )
        }

        lastToast = new RootSiblings(
          (
            <FlashMessage
              {...config}
              MessageComponent={customMessageComponent}
            />
          ),
          callback
        )
        break
      }
      default:
        break
    }
    return lastToast || void 0
  }
}

export default Toast
