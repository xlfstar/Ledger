import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import Modal from '../Modal'
import { lineColor } from '@/contents/theme'
import { ms,ScaledSheet } from 'react-native-size-matters'

let messageInstance: RootSiblings | null = null
interface MessageProps {
  content: string
  type?: 'info' | 'success' | 'error'
  autoHide?: boolean
  duration?: number
  [key:string]:any
}
const MessageComponent: React.FC<Partial<MessageProps>> = ({
  content,
  type = 'info',
  autoHide = true,
  ...restProps
}) => {
 const {textStyle={}} = restProps || {}
  return (
    <Modal
      isVisible={true}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
      
      avoidKeyboard
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      animationInTiming={200}
      animationOutTiming={200}
    >
      {/* <View style={styles.messageContainer}> */}
        <View style={styles.messageContainer}>
          <View style={[styles.messageContent, styles[type]]}>
            <Text style={[styles.messageText,textStyle]}>{content}</Text>
          </View>
          
          {!autoHide && (
            <Pressable
              onPress={() => Message.hide()}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>好的</Text>
            </Pressable>
          )}
        </View>
      {/* </View> */}
    </Modal>
  )
}

class Message {
  static hide() {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
  }

  static show({
    content,
    type,
    autoHide = true,
    duration = 2000,
  }: MessageProps) {
    Message.hide()

    const view = (
      <MessageComponent content={content} type={type} autoHide={autoHide} />
    )

    messageInstance = new RootSiblings(view)

    if (autoHide) {
      setTimeout(() => {
        Message.hide()
      }, duration)
    }
  }

  static success(
    content: string,
    options?: { duration?: number; autoHide?: boolean }
  ) {
    Message.show({
      content,
      type: 'success',
      ...options,
    })
  }

  static error(
    content: string,
    options?: { duration?: number; autoHide?: boolean }
  ) {
    Message.show({
      content,
      type: 'error',
      ...options,
    })
  }

  static info(
    content: string,
    options?: { duration?: number; autoHide?: boolean }
  ) {
    Message.show({
      content,
      type: 'info',
      ...options,
    })
  }
}

const styles = ScaledSheet.create({
  messageContainer: {
    backgroundColor:'#fff',
    // alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    borderRadius: ms(10),
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow:'hidden'
  },
  messageContent: {
    paddingHorizontal: ms(16),
    paddingVertical: ms(30),  
    // backgroundColor: '#fff',
  },
  messageText: {
    fontSize: ms(16),
    color: 'rgba(0,0,0,.8)',
    fontWeight:'600'
  },
  closeButton: {
    padding: 4,
    alignItems:'center',
    paddingVertical:ms(15),
    borderTopWidth:0.5,
    borderTopColor:lineColor
  },
  closeText: {
    fontSize: ms(18),
    color: '#409EFF',
    fontWeight:500
  },
  info: {
    // fontSize:16,
    // backgroundColor: '#fff',
    borderColor: '#91d5ff',
  },
  success: {
    backgroundColor: '#f6ffed',
    borderColor: '#b7eb8f',
  },
  error: {
    backgroundColor: '#fff2f0',
    borderColor: '#ffccc7',
  },
})

export default Message
