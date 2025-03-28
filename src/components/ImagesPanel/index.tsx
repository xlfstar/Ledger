import React from 'react'
import RootSiblings from 'react-native-root-siblings'
import Container from './picker'

let lastToast: RootSiblings | null = null

class Picker {
  static hide = function () {
    if (lastToast != null) {
      lastToast.destroy()
    }
  }

  // raw method
  static picker = (data: any) =>
    new Promise((resolve, reject) => {
      if (lastToast != null) {
        lastToast.destroy()
      }
      const View = (
        <Container
          {...data}
          onClose={() => {
            resolve('close')
            Picker.hide()
          }}
        />
      )
      const toast = new RootSiblings(View)
      lastToast = toast
    })
}

export default Picker
