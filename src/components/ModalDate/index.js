import React from 'react'
import RootSiblings from 'react-native-root-siblings'
import Container from './picker'

let lastToast = null

class Picker {
  static hide = function () {
    if (lastToast != null) {
      lastToast.destroy()
    }
  }

  // raw method
  static picker = (data) =>
    new Promise((resolve, reject) => {
      if (lastToast != null) {
        lastToast.destroy()
      }
      const View = (
        <Container
          {...data}
          success={(res) => {
            resolve(res)
            Picker.hide()
          }}
          cancel={(res) => {
            reject(res)
            Picker.hide()
          }}
        />
      )
      const toast = new RootSiblings(View)
      lastToast = toast
    })
}

export default Picker
