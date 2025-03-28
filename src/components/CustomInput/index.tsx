import React, { useRef } from 'react'
import { TextInput, Keyboard, TextInputProps } from 'react-native'

interface CustomInputProps extends TextInputProps {
  // 自定义属性
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const inputRef = useRef<TextInput>(null)

  const handleFocus = () => {
    // 确保输入框保持焦点状态但键盘不会弹出
    Keyboard.dismiss()
    inputRef.current?.focus()
  }

  return (
    <TextInput
      {...props}
      ref={inputRef}
      showSoftInputOnFocus={false}
      onFocus={handleFocus}
      caretHidden={false}
    />
  )
}

export default CustomInput 