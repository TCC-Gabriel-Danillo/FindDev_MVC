import "_/config/firebaseConfig"

import { View } from "react-native"
import { Provider } from 'react-redux'
import { setupStore } from "_/store"
import { Routes } from '_/view/navigation';
import { useCustomFonts } from "_/hooks/useCustomFont";
import { PersistGate } from 'redux-persist/integration/react'
import { makeAuthService } from "_/helpers/makeAuthService";
import { makeUserService } from "_/helpers";
import { persistStore } from "redux-persist";



const store = setupStore({
  authService: makeAuthService(),
  userService: makeUserService()
})

export const persistedStore = persistStore(store)

export default function App() {

  const [isLoaded] = useCustomFonts()

  if (!isLoaded) return <View />

  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistedStore}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

