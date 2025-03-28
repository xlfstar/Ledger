import React, { useState } from 'react'
import AppContainer from './router'
// import AppContainer from './pageRouter'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { RootSiblingParent } from 'react-native-root-siblings'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import './configs/reanimatedConfig'
import './configs/reactNativeIgnoreLogs'
const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootSiblingParent>
          {/* <SheetProvider> */}

          <AppContainer />
          {/* </SheetProvider> */}
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  )
}

export default App
