import * as React from 'react'

const navigationRef = React.createRef()

function navigate(name, params) {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params)
  }
}
export default {
  navigate,
  navigationRef,
}
